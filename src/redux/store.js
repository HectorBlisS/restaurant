import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import menuReducer from './menuDuck'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    menu: menuReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(thunk)
    ));
    // initialize data getter
    store.dispatch({ type: "GET_INITIAL_DATA" })
    return store
}