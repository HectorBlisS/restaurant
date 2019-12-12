import { createUser, addOrder, updatOrder, saveFood } from '../services/firebase'
import toastr from 'toastr'

let initial = {
    table: { _id: 4, active: true, people: 4, name: "hectitor" },
    tables: {
        1: { _id: 1, active: false, people: 0, name: "Nicole", waiter: "BlisS" },
        2: { _id: 2, active: false, people: 0, name: "Katia", waiter: "BlisS" },
        3: { _id: 3, active: false, people: 0, name: "Luis", waiter: "BlisS" },
        4: { _id: 4, active: true, people: 4, name: "Hectitor", waiter: "BlisS" }
    },
    groups: {
        BREAKFAST: {
            _id: "BREAKFAST",
            name: "Desayunos",
            pic: "https://i.cbc.ca/1.5192919.1561664247!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/great-canadian-breakfast-sandwich.jpg"
        },
        DINNER: {
            _id: "DINNER",
            name: "Resto del  día",
            pic: "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner.jpg"
        },
        DRINKS: {
            _id: "DRINKS",
            name: "Bebidas",
            pic: "https://www.sustagen.com.au/sites/site.prod1.sustagen.com.au/files/2019-03/chocolate-drink-mocha-delight.jpg"
        }
    },
    items: {
        "ñs334dkf": {
            name: "Café Americano",
            _id: "ñsdkf",
            price: 5,
            categories: { BREAKFAST: true },
            subCategory: "BREAKFAST",
            details: "Café colombiano con agua",
            pic: "https://www.cubaneandoconmario.com/wp-content/uploads/2017/01/Caf%C3%A9-americano.jpg"
        },
        "ofpmdf432": {
            name: "Hamburguesa Simple",
            _id: "ofpmdf432",
            price: 10,
            categories: { DINNER: true },
            subCategory: "Hamburguesas",
            details: "La mejor top sirloin de la zona",
            pic: "https://www.seekpng.com/png/detail/408-4084388_1-modelos-de-banner-de-hamburguers.png",
            options: [{
                text: "SIN CEBOLLA",
                price: 0
            },
            {
                text: "SIN MAYONESA",
                price: 0
            },
            {
                text: "SIN MOSTAZA",
                price: 0
            },
            {
                text: "CON QUESO",
                price: 1
            },
            {
                text: "CON HUEVO",
                price: 1
            }
            ]
        },
        "8d8f8hf8": {
            name: "Onion Rings",
            _id: "8d8f8hf8",
            price: 0,
            categories: { DINNER: true },
            subCategory: "Acompañamientos",
            details: "Grasosos y deliciosos",
            pic: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/7f539fc41a5543aebfe03afed73a0b48/BFV9112_MozzarellaStickOnionRings.jpg"
        },
        "99d9jjgj": {
            _id: "99d9jjgj",
            name: "Agua",
            price: 5,
            categories: { DRINKS: true, DINNER: true },
            details: "Sin olor, sin sabor, simplemente perfecta",
            pic: "https://5.imimg.com/data5/GV/DP/MY-3831378/500ml-plastic-water-bottle-500x500.jpg",
            sizes: [
                {
                    size: "500ml",
                    price: 5
                },
                {
                    size: "750ml",
                    price: 8
                }
            ]
        },
    },
    order: [],
    orders: [],
    history: [],
    category: {
        _id: "BREAKFAST",
        name: "Desayunos",
        pic: "https://i.cbc.ca/1.5192919.1561664247!/fileImage/httpImage/image.jpg_gen/derivatives/original_780/great-canadian-breakfast-sandwich.jpg"
    },
    users: []
}

export default function reducer(state = initial, action) {
    switch (action.type) {
        case "GET_INITIAL_DATA":
            let m = JSON.parse(localStorage.getItem('menu'))
            if (m) return { ...state, ...m }
            else return { ...state }


        case UPDATE_TABLE:
            return { ...state, tables: { ...action.payload } }
        case SELECT_TABLE:
            return { ...state, table: { ...action.payload } }
        case UPDATE_FROM_FIREBASE:
            return { ...state, ...action.payload }
        case CREATE_ADMIN_USER_SUCCESS:
            return { ...state, users: { ...action.payload } }
        case SAVE_FOOD:
            return { ...state, items: { ...action.payload } }
        case CLOSE_ORDER:
            return { ...state, orders: [...action.payload.orders], history: [...action.payload.history] }
        case RESET_ORDER:
            return { ...state, order: [] }
        case ADD_ORDER:
            return { ...state, orders: [...action.payload] }
        case ADD_TO_ORDER:
            return { ...state, order: [...action.payload] }
        case REMOVE_FROM_ORDER:
            return { ...state, order: [...action.payload] }
        case CATEGORY_SELECTED:
            return { ...state, category: { ...action.payload } }
        default:
            return { ...state }
    }
}

let CATEGORY_SELECTED = "CATEGORY_SELECTED"
let ADD_TO_ORDER = "ADD_TO_ORDER"
let ADD_ORDER = "ADD_ORDER"
let REMOVE_FROM_ORDER = "REMOVE_FROM_ORDER"
let RESET_ORDER = "RESET_ORDER"
let CLOSE_ORDER = "CLOSE_ORDER"
let SAVE_FOOD = "SAVE_FOOD"
let CREATE_ADMIN_USER = "CREATE_ADMIN_USER"
let CREATE_ADMIN_USER_SUCCESS = "CREATE_ADMIN_USER_SUCCESS"
let CREATE_ADMIN_USER_ERROR = "CREATE_ADMIN_USER_ERROR"
let UPDATE_FROM_FIREBASE = "UPDATE_FROM_FIREBASE"
let SELECT_TABLE = "SELECT_TABLE"
let UPDATE_TABLE = "UPDATE_TABLE"

export function upateTableAction(table) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let { tables } = menu
        tables[table._id] = { ...table }
        let m = { ...menu, tables }
        localStorage.menu = JSON.stringify(m)
        dispatch({ type: UPDATE_TABLE, payload: tables })
    }
}

export function selectTableAction(id) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let { tables, table } = menu
        table = { ...tables[id] }
        dispatch({ type: SELECT_TABLE, payload: { ...table } })
    }
}

export function createUserAction(user) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let { users } = menu
        dispatch({ type: CREATE_ADMIN_USER })
        return createUser(user)
            .then(data => {
                console.log(data)
                users.unshift(data)
                let m = { ...menu, users }
                localStorage.menu = JSON.stringify(m)
                dispatch({ type: CREATE_ADMIN_USER_SUCCESS, payload: users })
            })
            .catch(e => toastr.error(e.message))
    }
}

export function saveFoodAction(food) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let { items } = menu
        if (!food._id) {
            food._id = Date.now()
        }
        items[food._id] = food
        let m = { ...menu, items }
        localStorage.menu = JSON.stringify(m)
        // firebase
        saveFood(food)
        dispatch({ type: SAVE_FOOD, payload: { ...items } })
    }
}

export function closeOrderAction(order) {
    return (dispatch, getState) => {
        let { orders, history } = getState().menu
        let { menu } = getState()
        orders.splice(orders.indexOf(order), 1)
        order.finished = true
        history.push(order)
        let m = { ...menu, orders, history }
        localStorage.menu = JSON.stringify(m)
        // to firebase
        updatOrder(order)
        dispatch({ type: CLOSE_ORDER, payload: { history, orders } })
    }
}

export function addOrderAction(array) {
    return (dispatch, getState) => {
        let { orders, table } = getState().menu
        let { menu } = getState()
        let order = {
            date: Date.now(),
            items: [...array],
            finished: false,
            table
        }
        orders.push(order)
        let m = { ...menu, orders, order: [] }
        //save
        localStorage.menu = JSON.stringify(m)
        //DB
        addOrder(order)
        //
        dispatch({ type: ADD_ORDER, payload: [...orders] })
        dispatch({ type: RESET_ORDER })
    }
}

export function addToOrderAction(item) {
    return (dispatch, getState) => {
        let { order } = getState().menu
        let o = []
        if (item.key) {
            o = order.map(it => {
                if (it.key === item.key) return item
                return it
            })
        } else {
            item.key = Date.now()
            o = [...order, item]
        }
        dispatch({ type: ADD_TO_ORDER, payload: [...o] })
    }
}

export function removeItemFromOrderAction(item) {
    return (dispatch, getState) => {
        let { order } = getState().menu
        order.splice(item.index, 1)
        dispatch({ type: REMOVE_FROM_ORDER, payload: [...order] })
    }
}

export function selectCategoryAction(category) {
    return dispatch => {
        dispatch({ type: CATEGORY_SELECTED, payload: category })
    }
}


/// inception stuff

export function updateUsersFromDBAction(array) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let m = { ...menu, users: [...array] }
        localStorage.menu = JSON.stringify(m)
        dispatch({ type: UPDATE_FROM_FIREBASE, payload: { ...m } })
    }
}
export function updateOrdersFromDBAction(array) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let m = { ...menu, orders: [...array] }
        localStorage.menu = JSON.stringify(m)
        dispatch({ type: UPDATE_FROM_FIREBASE, payload: { ...m } })
    }
}
export function updateAllOrdersAction(array) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let m = { ...menu, history: [...array] }
        localStorage.menu = JSON.stringify(m)
        dispatch({ type: UPDATE_FROM_FIREBASE, payload: { ...m } })
    }
}
export function updateFoodFromDBAction(object) {
    return (dispatch, getState) => {
        let { menu } = getState()
        let m = { ...menu, items: { ...object } }
        localStorage.menu = JSON.stringify(m)
        dispatch({ type: UPDATE_FROM_FIREBASE, payload: { ...m } })
    }
}