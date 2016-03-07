import React from 'react'
import styles from './button.css'

export default class Button extends React.PureComponent {
  render() {
    return <div className={styles.default} {...this.props} />
  }
}
