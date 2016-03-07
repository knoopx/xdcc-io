import React from 'react'
import theme from 'ui/theme'

export default class StatusIndicator extends React.Component {
  static defaultProps = {
    active: false,
    size: 8,
  }

  render() {
    return (
      <div style={{ borderRadius: 99999, width: this.props.size, height: this.props.size, backgroundColor: this.props.active ? theme.colors.green[5] : theme.colors.red[5] }} />
    )
  }
}
