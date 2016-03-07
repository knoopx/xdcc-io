import React from 'react'

export default class Row extends React.PureComponent {
  render() {
    const { style, ...extraProps } = this.props
    return (
      <div {...extraProps} style={{ display: 'flex', flexDirection: 'row', minWidth: 0, ...style }} />
    )
  }
}
