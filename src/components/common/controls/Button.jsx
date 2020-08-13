import React from 'react'
import styles from './Button.module.css'

const Button = (props) => {
    const color = {
        borderColor: props.color,
        color: props.color,
        fontColor: props.color

    }

    return <button {...props} className={styles.button} style={color} >{props.label}</button>
}
export default Button