import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

const shopModeSetting = require('@eirikbirkeland/ob-config').SHOP_MODE

window.mode = shopModeSetting || 'PRODUCTION'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
