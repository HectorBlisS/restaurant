import React from 'react'
import styles from './menu.module.css'

export default function Resumen({ order }) {

    function renderOption(item, i) {
        console.log(item)
        return (
            <span key={i}>
                {item.text + `, `}
            </span>
        )
    }

    function renderCard(item, i) {
        return (
            <div className={styles.resumenCard}>
                <div key={i} className={styles.cardContent}>
                    <h2>{item.quantity}</h2>
                    <p>{item.name}</p>
                    {/* <img src={item.pic} alt={item.name} /> */}
                    <p style={{ position: "absolute", right: 0, marginRight: 10 }} >$ {item.total} MXN</p>
                </div>
                <div>
                    {item.options.map(renderOption)}
                </div>
            </div>

        )
    }

    return (
        <div>
            {order.map(renderCard)}
        </div>
    )
}