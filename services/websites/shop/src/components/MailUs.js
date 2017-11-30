import React from 'react'

export default function MailUs (props) {
    return (
        <a href="mailto: gttbooster@gmail.com?subject=Custom order">{props.children}</a>
    )
}