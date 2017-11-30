import logo from '../booster1.png'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: #222;
    height: 150px;
    margin-bottom: 30px;
    color: white;
    text-align: center;
`
const AppLogo = styled.img`
    height: 80px;
`

export default function Header(props) {
    return (

        <Wrapper title={props.title} className={props.className}>
            <AppLogo src={logo} alt="logo"/>
            <p>Google Translator Toolkit Booster is now 100% free<br/>for commercial and private use!</p>
            {props.children}
        </Wrapper>

    )
}
