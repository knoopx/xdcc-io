import React from 'react'

import theme from '../theme'

export default class Badge extends React.PureComponent {
  render() {
    return (
      <div
        style={{ textAlign: 'center', minWidth: 32, backgroundColor: theme.colors.gray[6], padding: '2px 8px', fontSize: 14, borderRadius: 999999, color: 'white' }}
        {...this.props}
      >
        {this.props.children}
      </div>
    )
  }
}
