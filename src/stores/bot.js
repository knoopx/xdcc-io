import fs from 'fs'
import net from 'net'
import path from 'path'
import homeDir from 'home-dir'
import { queue } from 'async'
import { observable, computed, map, action } from 'mobx'

import Packet from './packet'
import Transfer from './transfer'

export default class Bot {
  @observable packetMap = map()
  @observable channels = []
  @observable transfers = []
  @observable requests = map()

  queue = queue((number, callback) => {
    const transfer = this.requests.get(number)

    if (transfer) {
      transfer.update({ status: `Requesting #${number} from ${this.name}` })
      this.network.client.msg(this.name, `XDCC SEND #${number}`)
      this.getAwaitingTransfer = () => {
        this.requests.delete(number)
        callback()
        return transfer
      }
    }
  }, 1)

  constructor(props) {
    Object.assign(this, props)
    this.key = props.name
  }

  @computed get packets() {
    return this.packetMap.values()
  }

  @action addChannel(channel) {
    if (!this.channels.includes(channel)) {
      this.channels.push(channel)
    }
  }

  @action upsertPacket(number, name, downloadCount, size) {
    let packet = this.packetMap.get(number)
    if (!packet) {
      packet = new Packet({ number, name, downloadCount, size, bot: this })
      this.packetMap.set(number, packet)
    }
    return packet
  }

  @action requestPacket(number) {
    const packet = this.packetMap.get(number)
    if (packet) {
      if (!this.requests.has(number)) {
        const transfer = new Transfer({ file: packet.name, size: packet.size, status: `Waiting for ${this.name}...` })
        this.requests.set(number, transfer)
        this.transfers.push(transfer)
        this.queue.push(number)
      }
    }
  }

  @action onDCCSend(dccOffer) {
    if (this.requests.length === 0) {
      console.debug('Ignoring unknown dcc send offer')
    }

    const transfer = this.getAwaitingTransfer()

    const { ip, port, file, size } = dccOffer

    transfer.update({ file, size, status: `Connecting to ${ip}:${port}` })

    const targetPath = homeDir('Downloads')
    const stream = fs.createWriteStream(path.join(targetPath, file))

    stream.on('open', () => {
      const connection = net.connect(port, ip, () => {
        transfer.update({ status: `Connected to ${ip}:${port}` })
      }).on('data', (data) => {
        if (transfer.isAborted) {
          transfer.update({ status: 'Aborting...' })
          connection.end()
        }

        stream.write(data)
        transfer.update({ status: `Downloading from ${this.name}...`, received: transfer.received + data.length })
        if (transfer.received >= size) {
          transfer.update({ status: 'Download complete' })
          connection.end()
        }
      }).on('end', () => {
        console.debug('connection ended')
        stream.end()
        this.removeTransfer(transfer)
      }).on('error', (err) => {
        stream.end()
        transfer.update({ status: `Error: ${err.message}` })
      })
    })
  }

  @action removeTransfer(transfer) {
    this.transfers.remove(transfer)
  }
}
