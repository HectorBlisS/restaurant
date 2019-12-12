import React, { useState, useEffect } from 'react'
import { Modal, Input, Switch } from 'antd'

export default function TableForm({ table = {}, onSave, onCancel, visible }) {
    let [form, setForm] = useState({ ...table })

    useEffect(() => {
        setForm({ ...table })
    }, [table])

    function onChange({ target: { name, value } }) {
        setForm({ ...form, [name]: value })
    }

    function saveTable() {
        onSave(form)
    }

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title="Editar mesa"
            onOk={saveTable}
        >
            <div>
                Abrir mesa?
                <Switch
                    onChange={(value) => onChange({ target: { name: "active", value } })}
                    checked={form.active} />
            </div>
            <div>
                <p>Cantdad de personas</p>
                <Input
                    type="number"
                    onChange={onChange}
                    placeholder="Cantidad de personas"
                    name="people"
                    value={form.people}
                />
            </div>
            <div>
                <div>
                    <p>A nombre de:</p>
                    <Input
                        onChange={onChange}
                        placeholder="Nombre"
                        name="name"
                        value={form.name}
                    />
                </div>
                <p> Mesero:</p>
                <Input
                    disabled
                    value={"BlisS"}
                />
            </div>

        </Modal>
    )
}