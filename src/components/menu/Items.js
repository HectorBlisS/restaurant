import React from 'react'
import ItemCard from './ItemCard'
import styles from './menu.module.css'

export default function Items({ onClick, items = [] }) {
    function renderItem(item, i) {
        return <ItemCard
            onClick={onClick}
            key={i}
            item={item}
            {...item}
        />
    }
    return (
        <div className={styles.itemsContainer}>
            {items.map(renderItem)}
        </div>
    )
}