import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './components/home/Home'
import MenuPage from './components/menu/MenuPage'
import Kitchen from './components/kitchen/Kitchen'
import AdminPage from './components/admin/AdminPage'
import toastr from 'toastr'

function PublicRoute({ redirect, path, component, ...rest }) {
    let isLogged = localStorage.getItem('token')
    return !isLogged ? <Route path={path} component={component} {...rest} /> : <Redirect to={redirect} {...rest} />
}

function PrivateRoute({ redirect, path, component, ...rest }) {
    let isAdmin = localStorage.getItem('token')
    if (!isAdmin) toastr.error("No tienes suficientes permisos")
    return isAdmin ? <Route path={path} component={component} {...rest} /> : <Redirect to={redirect} {...rest} />
}

function AdminRoute({ redirect, path, component, ...rest }) {
    let isAdmin = localStorage.getItem('token')
    if (!isAdmin) toastr.error("No tienes suficientes permisos")
    return isAdmin ? <Route path={path} component={component} {...rest} /> : <Redirect to={redirect} {...rest} />
}

export default function Routes() {
    return (
        <Switch>
            <PublicRoute exact path="/" component={Home} redirect="/menu" />
            <PrivateRoute path="/menu" component={MenuPage} redirect="/" />
            <PrivateRoute path="/comandas" component={Kitchen} redirect="/" />
            <AdminRoute path="/admin" component={AdminPage} redirect="/" />
        </Switch>
    )
}