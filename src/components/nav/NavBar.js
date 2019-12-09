import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import styles from './nav.module.css'




export default function NavBar({ total = 5000 }) {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon className={styles.icon} icon={faBars} />
            <h2>Burguer Queen</h2>
            <p>Total de la orden: <strong>
                ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}MXN
                </strong> </p>
        </div>
    )
}