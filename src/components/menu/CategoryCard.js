import React from 'react'
import styles from './menu.module.css'

export default function CategoryCard({ item, onClick, name, pic }) {
    return (
        <div onClick={() => onClick(item)} className={styles.cardcategory} style={{backgroundImage:`url(${pic})`}}>
            <div className={styles.cover}>
                <h2>{name}</h2>
            </div>
        </div>
    )
}