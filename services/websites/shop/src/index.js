const shopModeSetting = require('@eirikbirkeland/ob-config').SHOP_MODE

window.mode = shopModeSetting || 'PRODUCTION'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)