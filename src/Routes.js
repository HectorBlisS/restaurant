import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/home/Home'
import MenuPage from './components/menu/MenuPage'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/menu" component={MenuPage} />
        </Switch>
    )
}