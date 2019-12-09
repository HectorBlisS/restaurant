import React from 'react'
import styles from './menu.module.css'

export default function CategoryCard({ name, pic }) {
    return (
        <div className={styles.card}>
            <img src={pic} alt={name} />
            <p>{name}</p>
        </div>
    )
}