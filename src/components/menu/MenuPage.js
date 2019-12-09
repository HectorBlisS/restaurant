import React from 'react'
import Categories from './Categories'
import { connect } from 'react-redux'

function MenuPage({ categories }) {
    return (
        <div className="container">
            <Categories categories={categories} />
        </div>
    )
}

function mapState({ menu }) {
    return {
        categories: menu.groups,
        items: menu.items
    }
}

export default connect(mapState, {})(MenuPage)