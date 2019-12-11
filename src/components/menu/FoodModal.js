import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import styles from './menu.module.css'

export default function FoodModal({ onRemove, onAccept, food = {}, visible, onCancel, editing }) {
    let [quantity, setQuantity] = useState(food.quantity || 1)
    let [options, setOptions] = useState(food.extras || {})
    let [unitary, setUnitary] = useState(food.price || 0)
    let [total, setTotal] = useState(food.price || 0)


    useEffect(() => {
        setOptions({ ...food.extras })
    }, [food.extras])
    useEffect(() => {
        // console.log(food.options)
        if (editing) {
            setQuantity(food.quantity)
        } else {
            setQuantity(1)
        }
    }, [food])

    useEffect(() => {
        getTotal()
    }, [options, quantity, food])



    function placeOrder() {
        let format = {
            ...food,
            price: unitary,
            optionsSelected: Object.values(options).filter(o => Boolean(o)),
            extras: { ...options },
            quantity,
            total
        }
        console.log(format)
        onAccept(format)
        onCancel()
    }

    function getTotal() {
        let t = Object.values(options).reduce((acc, item) => {
            if (item) return acc + Number(item.price)
            else return Number(acc)
        }, 0)
        let u = t + Number(food.price)
        let tot = u * Number(quantity)
        setUnitary(u)
        setTotal(tot)
    }

    function changeQuantity(add) {
        if (add && quantity < 50) {
            setQuantity(++quantity)
            return
        }
        if (quantity > 1) setQuantity(--quantity)
    }

    function optionClicked(item) {
        if (options[item.text]) {
            let ops = { ...options }
            ops[item.text] = false
            setOptions({ ...options, ...ops })
        }
        else setOptions({ ...options, [item.text]: { ...item } })
    }

    function renderOption(item, i) {
        return (
            <div onClick={() => optionClicked(item)} key={i} className={styles.optionCard}>
                <input checked={options[item.text]} type="checkbox" />
                <span>{item.text} {item.price && `+ $ ${item.price}`}</span>
            </div>
        )
    }

    function removeItem() {
        onRemove(food)
    }

    return (
        <Modal
            onCancel={onCancel}
            visible={visible}
            footer={null}
        >
            <div className={styles.modalContainer}>
                <div className={styles.modalCover}>
                    <div style={{ backgroundImage: `url('${food.pic}')` }} className={styles.modalPic} src={food.pic} />
                    <div className={styles.changes}>
                        <div >
                            <h3>{food.name}</h3>
                            <div className={styles.modalTotal}>
                                <p>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MXN</p>
                            </div>
                        </div>



                        <div className={styles.qButtons}>
                            <button
                                onClick={() => changeQuantity(false)}
                            >
                                -
                        </button>
                            <h2>{quantity}</h2>
                            <button
                                onClick={() => changeQuantity(true)}
                            >
                                +
                        </button>
                            <div className={styles.options}>
                                {food.options && food.options.map(renderOption)}
                            </div>


                        </div>

                    </div>

                </div>
                <hr className={styles.line} />
                <div className={styles.modalFooter}>
                    {editing && <button
                        style={{ color: "orange" }}
                        onClick={removeItem}
                    >
                        ELIMINAR
                    </button>}
                    <button
                        onClick={onCancel}
                    >
                        CANCELAR
                    </button>
                    <button
                        onClick={placeOrder}
                        style={{ backgroundColor: "#3a90df", color: "white" }}>
                        {editing ? "ACTUALIZAR" : "AGREGAR"}
                    </button>
                </div>

            </div>
        </Modal>
    )
}