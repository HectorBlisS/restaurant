import React, { useState } from 'react'
import styles from './menu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { Button } from 'antd'
import FoodModal from './FoodModal'

export default function Resumen({ order }) {
    let [open, setOpen] = useState(false)
    let [food, setFood] = useState(undefined)

    function renderOption(item, i) {
        return (
            <span key={i}>
                {item.text + `, `}
            </span>
        )
    }

    function editFood(item) {
        console.log(item)
        setOpen(true)
        setFood({ ...item })
    }

    function renderCard(item, i) {
        return (
            <div className={styles.resumenCard}>
                <div key={i} className={styles.cardContent}>
                    <h2>{item.quantity}</h2>
                    <p>{item.name}</p>
                    {/* <img src={item.pic} alt={item.name} /> */}
                    <p style={{ position: "absolute", right: 0, marginRight: 50 }} >$ {item.total} MXN</p>
                    <Button
                        onClick={() => editFood(item)}
                        className={styles.icon}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>
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
            {/* Modal */}
            <FoodModal
                onAccept={(value) => console.log(value)}
                editing={true}
                food={food}
                onCancel={() => setOpen(false)}
                visible={open} />
        </div>
    )
}