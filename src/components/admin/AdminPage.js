import React, { useState } from 'react'
import { Tabs, Button, Tag, Table, Modal } from 'antd';
import { connect } from 'react-redux'
import FoodForm from './FoodForm';
import { saveFoodAction } from '../../redux/menuDuck'

const { TabPane } = Tabs;
let initial = { categories: {} }

function AdminPage({ saveFoodAction, categories, history, items }) {
    let [food, setFood] = useState({ ...initial })
    let [open, setOpen] = useState(false)

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Detalles',
            dataIndex: 'details',
            key: 'details',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Categorías',
            key: 'categories',
            dataIndex: 'categories',
            render: cats => (
                <div>
                    {Object.keys(cats).map(c => {
                        let color = c === "BREAKFAST" ? 'geekblue' : 'green';
                        if (c === 'DRINKS') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={c}>
                                {c}
                            </Tag>
                        );
                    })}
                </div>
            ),
        },
        {
            title: 'Edición',
            key: 'edit',
            render: (text, record) => (
                <span onClick={() => setEditFood(record)}>
                    <a><strong>Editar</strong> {record.name}</a>
                </span>
            ),
        },
    ];

    function onChange({ target: { name, value } }) {
        if (name === "categories") {
            let o = {}
            for (let c of value) {
                o[c] = true
            }
            setFood({ ...food, categories: o })
            return
        }
        setFood({ ...food, [name]: value })
    }

    function setEditFood(item) {
        setOpen(true)
        setFood(item)
    }

    function onSaveFood() {
        saveFoodAction(food)
        setOpen(false)
        setFood({ ...initial })
    }

    function renderOrder() { }
    return (
        <div>
            <Tabs defaultActiveKey="2" onChange={() => { }}>
                <TabPane tab="Usuarios" key="1">
                    Usuarios
                </TabPane>
                <TabPane tab="Menú" key="2">
                    <div >
                        <Button

                            shape="round"
                            onClick={() => setEditFood(initial)}
                        >
                            Agregar Alimento

                        </Button>
                        <Table columns={columns} dataSource={items} />
                    </div>
                </TabPane>
                <TabPane tab="Historial de ordenes" key="3">
                    Historial de ordenes
                </TabPane>
            </Tabs>


            {/* Modals */}
            <Modal
                footer={[
                    <Button onClick={() => setOpen(false)} key="back" >
                        Volver
                    </Button>,
                    <Button onClick={onSaveFood} key="submit" type="primary">
                        Guardar
                    </Button>
                ]}
                visible={open}
                onCancel={() => setOpen(false)}
                title={food._id ? <h3>Editar {food.name}</h3> : <h3>Agregar Alimento</h3>}
            >
                <FoodForm
                    categories={categories}
                    food={food}
                    onChange={onChange}
                />

            </Modal>
        </div>
    )
}

function mapState({ menu }) {
    return {
        hisotry: menu.history,
        categories: Object.keys(menu.groups),
        items: Object.values(menu.items)
    }
}

export default connect(mapState, { saveFoodAction })(AdminPage)