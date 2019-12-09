import React from 'react'
import styles from './menu.module.css'

export default function CategoryCard({ item, onClick, name, pic }) {
    return (
        <div onClick={() => onClick(item)} className={styles.card}>
            <img src={pic} alt={name} />
            <p>{name}</p>
        </div>
    )
}