import { signIn, signOut } from '../services/firebase'

let initial = {
    isLoggedIn: false
}


export default function reducer(state = initial, action) {
    switch (action.type) {
        case LOGOUT:
            return { ...initial }
        case LOGIN:
            return { ...state, fetching: true }
        case LOGIN_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, fetching: false, isLoggedIn: true, ...action.payload }
        default:
            return { ...state }
    }
}

let LOGIN = "LOGIN"
let LOGIN_SUCCESS = "LOGIN_SUCCESS"
let LOGIN_ERROR = "LOGIN_ERROR"
let LOGOUT = "LOGOUT"

export function logOutAction() {
    return dispatch => {
        localStorage.removeItem('token')
        signOut()
        dispatch({ type: LOGOUT })
        return Promise.resolve(true)
    }
}

export function loginAction(form) {
    return dispatch => {
        dispatch({ type: LOGIN })
        return signIn(form.email, form.password)
            .then(res => {
                console.log(res)
                localStorage.token = res.user.access_token
                dispatch({ type: LOGIN_SUCCESS, payload: res.user })
                return true
            })
            .catch(e => {
                console.log(e)
                dispatch({ type: LOGIN_ERROR, payload: e.message })
                return false
            })
    }
}

