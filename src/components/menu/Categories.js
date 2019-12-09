import React from 'react'
import CategoryCard from './CategoryCard'
import styles from './menu.module.css'

export default function Categories({ onClick, categories = {} }) {
    function renderCategory(item, i) {
        return (
            <CategoryCard
                item={item}
                onClick={onClick}
                key={i}
                {...item}
            />
        )
    }
    return (
        <div className={styles.firstChild}>
            {Object.values(categories).map(renderCategory)}
        </div>
    )
}