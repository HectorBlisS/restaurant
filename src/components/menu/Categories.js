import React from 'react'
import CategoryCard from './CategoryCard'

export default function Categories({ categories = {} }) {
    function renderCategory(item, i) {
        return (
            <CategoryCard
                key={i}
                {...item}
            />
        )
    }
    return (
        <div className="scroll">
            {Object.values(categories).map(renderCategory)}
        </div>
    )
}