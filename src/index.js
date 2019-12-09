import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


let store = generateStore()
let WithRouter = () => <BrowserRouter><App /></BrowserRouter>
let WithRedux = () => <Provider store={store}><WithRouter /></Provider>

ReactDOM.render(<WithRedux />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
