import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames/bind'

import style from './list-item.css'

const className = classNames.bind(style)

@observer
export default class ListItem extends React.Component {
  render() {
    const { isActive, ...extraProps } = this.props
    return (
      <div className={className('default', { isActive })} {...extraProps} />
    )
  }
}
