import React from 'react'
import { connect } from 'react-redux'
import styles from './kitchen.module.css'
import moment from 'moment'
import 'moment/locale/es'
import Swal from 'sweetalert2'
import { closeOrderAction } from '../../redux/menuDuck'

function Kitchen({ closeOrderAction, orders }) {

    function close(order) {
        Swal.fire({
            title: '¿Cerrar esta comanda?',
            text: "Al cerrar esta camanda notificarás al mesero",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar'
        }).then((result) => {

            if (result.value) {
                closeOrderAction(order)
                Swal.fire(
                    '¡Cerrada!',
                    'El mesero ha sido notificado',
                    'success'
                )
            }
        })
    }

    function renderOrder(order, i) {
        let color = (Date.now() - Number(order.date)) / 1000 / 60
        color = color < 5 ? styles.green : color < 10 ? styles.orange : styles.red
        return <div onClick={() => close(order)} className={`${styles.card} ${color}`} key={i}>
            <div className={styles.header}>
                <h3>{moment(order.date).fromNow()}</h3>
                <p>Mesa: 1</p>
            </div>
            {order.items.map((item, index) => {
                return (
                    <div key={index}>
                        <h3 key={index}>{item.name}</h3>
                        {item.options.map((op, ind) => <p key={ind} >{op.text}</p>)}
                    </div>
                )
            })}
        </div>
    }
    return (
        <div>
            <h2>Comandas</h2>
            <div className={styles.container}>
                {orders.reverse().map(renderOrder)}
            </div>
        </div>
    )
}

function mapState({ menu }) {
    console.log(menu.orders)
    return {
        orders: menu.orders
    }
}

export default connect(mapState, { closeOrderAction })(Kitchen)