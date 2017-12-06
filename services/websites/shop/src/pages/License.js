import React from 'react'

const file = atob(require('../../../../../extension/LICENSE.txt')
    .replace(/^data:text\/plain;base64,/, ''))
    .split(/\r?\n/)
    .map(ele => ele.replace(/^(\s*[0-9].*)/g, '<b>$1</b>'))
    .join('\n').replace(/\n/g, '<p/>')

export default class License extends React.Component {

    componentDidMount() {
        this.refs.a.innerHTML = file
    }

    render() {
        return (
            <div ref="a">
            </div>
        )
    }
}