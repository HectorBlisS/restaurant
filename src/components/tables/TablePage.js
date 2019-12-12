import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Tag, Button } from 'antd'
import styles from './table.module.css'
import TableForm from './TableForm'
import { upateTableAction } from '../../redux/menuDuck'

let tab = "https://cdn3.iconfinder.com/data/icons/furniture-177/64/table-dinner-restaurant-furniture-chair-512.png"

function TablePage({ upateTableAction, tables }) {
    let [table, setTable] = useState(null)
    let [open, setOpen] = useState(false)

    function renderTable(table, i) {
        return (
            <div onClick={() => editTable(table)} className={styles.card}>
                <h2>Mesa {table._id}</h2>
                <Tag style={{ width: "100%", textAlign: "center" }}
                    color={table.active ? "green" : "red"}
                >{table.active ? "ACTIVA" : "CERRADA"}</Tag>
                <img width="200" src={tab} alt="table" />
                <p>Personas: {table.people}</p>
                <span>A nombre de: <strong>{table.name}</strong></span>
                <span>Mesero: {table.waiter}</span>
            </div>
        )
    }

    function editTable(t) {
        setTable(t)
        setOpen(true)
    }

    function updateTable(t) {
        upateTableAction(t)
        setOpen(false)
    }

    return (
        <div>
            <br />
            <Button>Agregar mesa</Button>
            <div className={styles.container}>
                {tables.map(renderTable)}
            </div>
            <TableForm
                visible={open}
                table={table}
                onCancel={() => setOpen(false)}
                onSave={updateTable}
            />
        </div>

    )
}

function mapState({ menu }) {
    let tables = Object.values(menu.tables)
    return {
        tables
    }
}

export default connect(mapState, { upateTableAction })(TablePage)