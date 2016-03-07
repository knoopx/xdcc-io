import React from 'react'

import theme from '../theme'

const styles = {
  horizontal: { height: 1 },
  vertical: { width: 1 },
}

export default class Divider extends React.PureComponent {
  static propTypes = {
    direction: React.PropTypes.oneOf(Object.keys(styles)).isRequired,
  }

  static defaultProps = {
    direction: 'horizontal',
  }

  render() {
    return (
      <div style={{ backgroundColor: theme.borderColor, ...styles[this.props.direction], ...this.props.style }} />
    )
  }
}
