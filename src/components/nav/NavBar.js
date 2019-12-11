import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClipboardList, faBeer, faUtensils, faDoorClosed, faUserCog } from '@fortawesome/fontawesome-free-solid'
import styles from './nav.module.css'
import { Drawer } from 'antd';
import { withRouter } from 'react-router-dom'





function NavBar({ history, total = 5000 }) {
    let [open, setOpen] = useState(false)

    function navigate(route) {
        setOpen(false)
        history.push(route)
    }

    return (
        <div className={styles.container}>
            <FontAwesomeIcon onClick={() => setOpen(true)} className={styles.icon} icon={faBars} />
            <h2>Burguer Queen</h2>
            {/* <p>Total de la orden: <strong>
                ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}MXN
                </strong> </p> */}

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
                <span className={styles.navButton} >
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
                    <span className={styles.navButton} >
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

export default withRouter(NavBar)