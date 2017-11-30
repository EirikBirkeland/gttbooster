import React from 'react'
import {Thumbnail} from 'react-bootstrap'


export default function Download(props) {
  return (
    <div className={props.bsClass}>
      <Thumbnail style={{
        backgroundColor: 'teal',
        position: 'absolute',
        top: '0',
        right: '0',
        height: '150',
        width: '150'
      }}
                 src='favicon.ico' alt='242x200'>
        <h4 style={{backgroundColor: 'white'}}
            title="Just install it for a free trial, and then fire up Google Translator Toolkit to try it out. We know you'll appreciate the difference.">
          <a href="https://chrome.google.com/webstore/detail/gtt-booster/pjankaakojbendjaejlcnpgeldmfpjed">
            Download GTT Booster (free trial)</a>
        </h4>
      </Thumbnail>
    </div>
  )
}
