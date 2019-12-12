import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClipboardList, faBeer, faUtensils, faDoorClosed, faUserCog } from '@fortawesome/fontawesome-free-solid'
import styles from './nav.module.css'
import { Drawer, Select } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutAction } from '../../redux/userDuck'
import { selectTableAction } from '../../redux/menuDuck'

let { Option } = Select




function NavBar({ isLoggedIn, table, tables, selectTableAction, logOutAction, history, total = 5000 }) {
    let [open, setOpen] = useState(false)

    function navigate(route) {
        setOpen(false)
        history.push(route)
    }

    function onLogout() {
        logOutAction()
            .then(r => {
                setOpen(false)
                history.push('/')
            })
    }

    function onSelectTable(value) {
        selectTableAction(value)
    }

    return (
        <div className={styles.container}>
            {isLoggedIn && <FontAwesomeIcon onClick={() => setOpen(true)} className={styles.icon} icon={faBars} />}
            <h2>Burguer Queen</h2>
            {isLoggedIn && <Select
                value={table._id}
                onChange={onSelectTable}
                style={{ width: 100, marginLeft: 130 }}
            >
                {tables.map((t, i) => <Option value={t._id} >{t._id} - {t.name}</Option>)}
            </Select>}

            <Drawer
                title="Burguer Queen"
                placement={"left"}
                closable={false}
                onClose={() => setOpen(false)}
                visible={open}
            >

                <span onClick={() => navigate('/menu')} className={styles.navButton} >
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faBeer} />
                    <p>Menu</p>

                </span>
                <span onClick={() => navigate('/mesas')} className={styles.navButton} >
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faUtensils} />
                    <p>Clientes</p>
                </span>
                <span onClick={() => navigate('/comandas')} className={styles.navButton} >
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faClipboardList} />
                    <p>Comandas</p>
                </span>
                <div className={styles.footerButton}>
                    <span onClick={() => navigate('/admin')} className={styles.navButton} >
                        <FontAwesomeIcon
                            className={styles.icon}
                            icon={faUserCog} />
                        <p>Admin</p>
                    </span>
                    <span
                        onClick={onLogout}
                        className={styles.navButton} >
                        <FontAwesomeIcon
                            className={styles.icon}
                            icon={faDoorClosed} />
                        <p>Cerrar Sesión</p>
                    </span>
                </div>


            </Drawer>
        </div>
    )
}

function mapState({ menu, user }) {
    let tables = Object.values(menu.tables).filter(t => t.active)
    return {
        tables,
        table: menu.table,
        isLoggedIn: user.isLoggedIn
    }
}

export default connect(mapState, { selectTableAction, logOutAction })(withRouter(NavBar))