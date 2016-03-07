import React from 'react'

import theme from '../theme'

export default class ProgressBar extends React.PureComponent {
  static defaultProps = {
    progress: 0,
    color: theme.primaryColor,
  }

  render() {
    const { progress } = this.props

    return (
      <div style={{ border: `1px solid ${theme.borderColor}`, flex: 1, padding: 2, minWidth: 100, height: 20, borderRadius: 3 }}>
        <div style={{ display: 'flex', width: `${progress * 100}%`, height: '100%', backgroundColor: theme.primaryColor, borderRadius: 2, color: 'white', fontSize: 12 }} />
      </div>
    )
  }
}
