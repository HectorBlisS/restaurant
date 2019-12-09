import React from 'react'
import styles from './menu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid'

export default function FinishOrder({ onClick, className, order }) {
    let total = order.reduce((acc, item) => acc + item.total, 0)
    return (
        <div className={className}>
            <p>Orden: ${total}</p>
            <button onClick={onClick} className={styles.finishButton}>
                Ordenar
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </div>
    )
}