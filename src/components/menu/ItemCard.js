import React from 'react'
import styles from './menu.module.css'

export default function ItemCard({ onClick, item, name, details, pic }) {
    return (
        <div onClick={() => onClick(item)} className={styles.card}>
            <img src={pic} alt={name} />
            <div>
                <p> {name}</p>
                <span>{details}</span>
            </div>

        </div>
    )
}