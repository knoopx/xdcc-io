import React from 'react'
import VirtualList from 'react-mobx-virtual-list'

import { observable, action, runInAction, autorunAsync } from 'mobx'
import { inject, observer } from 'mobx-react'

import { binaryInsert } from 'stores/support'

import PacketListItem from './packet-list-item'
import Spinner from 'ui/spinner'

function filterPredicates(packet) {
  return {
    channels: channels => channels.length === 0 || packet.bot.channels.some(channel => channels.includes(channel)),
    query: query => query.length === 0 || packet.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  }
}

function isMatch(packet, filter) {
  const predicates = filterPredicates(packet)
  return Object.keys(predicates).reduce((current, name) => {
    const value = filter[name]
    if (value) { return current && predicates[name](value) }
    return current && true
  }, true)
}

@inject('manager')
@observer
export default class extends React.Component {
  @observable isFiltering = false
  @observable matches = []

  addPacketSorted = binaryInsert(this.matches, this.sortOrder)

  componentWillMount() {
    this.disposeFilter = autorunAsync(() => {
      const { query, channels } = this.props.manager.filter
      if (query.length > 0 || channels.length > 0) {
        this.setIsFiltering(true)
        setImmediate(() => {
          runInAction(() => {
            this.matches.replace(this.props.manager.packets.filter(p => isMatch(p, this.props.manager.filter)))
            this.setIsFiltering(false)
          })
        })
      } else {
        runInAction(() => {
          this.matches.replace(this.props.manager.packets)
        })
      }
    }, 200)

    this.disposePackets = this.props.manager.packets.observe((changes) => {
      runInAction(() => {
        changes.added.forEach((p) => {
          if (isMatch(p, this.props.manager.filter)) {
            this.addPacketSorted(p)
          }
        })
        changes.removed.forEach(p => this.matches.remove(p))
      })
    })
  }

  componentWillUnmount() {
    this.disposeFilter()
    this.disposePackets()
  }

  @action setIsFiltering(value) {
    this.isFiltering = value
  }

  renderPacket = (packet, key) => (
    <PacketListItem key={key} packet={packet} onClick={this.props.onClick} />
  )

  render = () => {
    if (this.isFiltering) {
      return <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}><Spinner size={8} /></div>
    }

    return <VirtualList items={this.matches} itemHeight={47} renderItem={this.renderPacket} />
  }
}
