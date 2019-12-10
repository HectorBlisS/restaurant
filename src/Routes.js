import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './components/home/Home'
import MenuPage from './components/menu/MenuPage'
import Kitchen from './components/kitchen/Kitchen'
import AdminPage from './components/admin/AdminPage'
import toastr from 'toastr'

function PrivateRoute({ redirect, path, component, ...rest }) {
    let isAdmin = localStorage.getItem('admin') || true
    if (!isAdmin) toastr.error("No tienes suficientes permisos")
    return isAdmin ? <Route path={path} component={component} {...rest} /> : <Redirect to={redirect} {...rest} />
}

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/menu" component={MenuPage} />
            <Route path="/comandas" component={Kitchen} />
            <PrivateRoute path="/admin" component={AdminPage} redirect="/menu" />
        </Switch>
    )
}