import React from 'react'
import {Panel} from 'react-bootstrap'

export default function Item(props) {
    const {header} = props

    return (
        <Panel bsStyle="primary" header={<strong>{header}</strong>}
               footer={props.footer}>
               {props.children}
        </Panel>
    )
}
