import React, { useState } from 'react'
import styles from './home.module.css'
import { Input, Divider, Button, Modal } from 'antd'

export default function Home() {
    let [form, setForm] = useState({ email: null, password: null })
    let [open, setOpen] = useState(false)

    function onChange({ target: { name, value } }) {
        setForm({ ...form, [name]: value })
    }
    return (
        <div className={styles.container}>
            <h1>Burguer Queen</h1>

            <div className={styles.form}>
                <Divider />
                <Input value={form.email} onChange={onChange} name="email" placeholder="Email" />
                <Input type="password" value={form.password} onChange={onChange} name="password" placeholder="Contraseña" />
                <br />
                <Button size="large">
                    Entrar
                </Button>
                <Divider />
                <a onClick={() => setOpen(true)} >¿Olvidaste tu contraseña?</a>
            </div>

            <Modal
                visible={open}
                onCancel={() => setOpen(false)}
                title="Recuperar contraseña"
            >
                <h2>Escribe el correo electrónico relacionado a tu cuenta:</h2>
                <Input placeholder="tu@email.com" />

            </Modal>
        </div>
    )
}