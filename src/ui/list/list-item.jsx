import React from 'react'

import { Row } from '../layout'
import theme from '../theme'

export default class ListItem extends React.PureComponent {
  render() {
    const { style, ...extraProps } = this.props
    return (
      <Row style={{ alignItems: 'center', padding: '8px 16px', borderBottom: `1px solid ${theme.borderColor}`, ...style }} {...extraProps} />
    )
  }
}
