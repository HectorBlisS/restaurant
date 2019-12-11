import React, { useState, useEffect } from 'react'
import styles from './home.module.css'
import { Input, Divider, Button, Modal } from 'antd'
import { connect } from 'react-redux'
import { loginAction } from '../../redux/userDuck'
import { passwordRecovery } from '../../services/firebase'
import toastr from 'toastr'
import { Spin } from 'antd'

function Home({ fetching, history, loginAction, error }) {
    let [form, setForm] = useState({ email: null, password: null })
    let [open, setOpen] = useState(false)
    let [email, setEmail] = useState(null)

    useEffect(() => {
        if (error) toastr.warning(error)
    }, [error])

    function onChange({ target: { name, value } }) {
        setForm({ ...form, [name]: value })
    }
    function onLogin() {
        loginAction(form)
            .then(r => {
                if (r) history.push('/menu')

            })
    }
    function onRecoverPassword() {
        passwordRecovery(email)
        toastr.info("para recuperar tu contraseña")
        toastr.info("te hemos enviado las instrucciones")
        toastr.info("Revisa tu correo electrónico")


        setOpen(false)
    }
    return (
        <div className={styles.container}>
            <h1>Burguer Queen</h1>

            <div className={styles.form}>
                <Divider />
                <Input value={form.email} onChange={onChange} size="large" name="email" placeholder="Email" />
                <br />
                <Input type="password" value={form.password} onChange={onChange} size="large" name="password" placeholder="Contraseña" />
                <br />
                <Button
                    onClick={onLogin}
                    size="large">
                    {fetching ? <Spin /> : "Entrar"}
                </Button>
                <Divider />
                <a onClick={() => setOpen(true)} >¿Olvidaste tu contraseña?</a>
            </div>

            <Modal
                onOk={onRecoverPassword}
                visible={open}
                onCancel={() => setOpen(false)}
                title="Recuperar contraseña"
            >
                <h2>Escribe el correo electrónico relacionado a tu cuenta:</h2>
                <Input onChange={({ target: { value } }) => {
                    setEmail(value)
                }} placeholder="tu@email.com" />

            </Modal>
        </div>
    )
}

function mapState({ user }) {
    return {
        error: user.error,
        fetching: user.fetching
    }
}

export default connect(mapState, { loginAction })(Home)