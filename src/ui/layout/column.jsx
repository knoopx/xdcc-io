import React from 'react'

export default class Column extends React.PureComponent {
  render() {
    const { style, ...extraProps } = this.props
    return (
      <div {...extraProps} style={{ display: 'flex', flexDirection: 'column', minWidth: 0, ...style }} />
    )
  }
}
