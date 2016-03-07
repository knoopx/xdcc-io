import React from 'react'

export default class List extends React.PureComponent {
  render() {
    const { style, ...extraProps } = this.props
    return (
      <div style={{ flex: 1, ...style }} {...extraProps} />
    )
  }
}
