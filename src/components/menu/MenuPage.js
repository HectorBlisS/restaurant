import React, { useState } from 'react'
import Categories from './Categories'
import { connect } from 'react-redux'
import Items from './Items'
import styles from './menu.module.css'
import Resumen from './Resumen'
import { selectCategoryAction, addOrderAction, addToOrderAction } from '../../redux/menuDuck'
import FoodModal from './FoodModal'
import FinishOrder from './FinishOrder'


function MenuPage({ addOrderAction, order, addToOrderAction, selectCategoryAction, categories, items }) {
    let [open, setOpen] = useState(true)
    let [food, setFood] = useState(null)

    function onClickCategory(categoryItem) {
        selectCategoryAction(categoryItem)
    }

    function itemSelected(item) {
        setOpen(true)
        setFood({ ...item })
    }

    function addOrder() {
        addOrderAction(order)
    }

    return (
        <div >
            <div className={styles.container}>
                <Categories onClick={onClickCategory} categories={categories} />
                <Items onClick={itemSelected} items={items} />
                <Resumen order={order} />

                {food && <FoodModal
                    onAccept={addToOrderAction}
                    food={food}
                    visible={open}
                    onCancel={() => setOpen(false)}
                />}
            </div>
            <FinishOrder onClick={addOrder} order={order} className={styles.finish} />
        </div>

    )
}

function mapState({ menu }) {
    let categoryName = menu.category._id
    let items = Object.values(menu.items).filter(i => i.categories[categoryName])
    return {
        categories: menu.groups,
        items,
        order: menu.order
    }
}

export default connect(mapState, { addOrderAction, addToOrderAction, selectCategoryAction })(MenuPage)