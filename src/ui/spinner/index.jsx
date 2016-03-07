import React from 'react'
import classNames from 'classnames/bind'

import theme from '../theme'
import styles from './spinner.css'

const ctx = classNames.bind(styles)

export default function Spinner({ size = 3, color = theme.colors.gray[5] }) {
  const style = {
    width: size,
    height: size,
    margin: size / 3,
    backgroundColor: color,
  }

  return (
    <div>
      <div className={ctx('base', 'first')} style={style} />
      <div className={ctx('base', 'second')} style={style} />
      <div className={ctx('base', 'third')} style={style} />
    </div>
  )
}
