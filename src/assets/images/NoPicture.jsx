import React from 'react'
import styles from './NoPicture.module.css'

const NoPicture = (props) => {

    const colors = [
        '#EC5858',
        '#49E591',
        '#F0B928',
        '#88A7F7',
        '#E25ABC'
    ]

    const letter = `${props.name}`.toUpperCase()[0]

    const filler = {
        backgroundColor: colors[props.id % 5],
    }


    return <div className={styles.background} style={filler}>
        <div className={!props.large ? styles.letter : styles.largeLetter}>{letter}</div>
    </div>
}
export default NoPicture