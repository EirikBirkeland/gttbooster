import React from 'react'
import PropTypes from 'prop-types'
import {icons} from '../../../icons'

export default class Button extends React.Component {
   render () {
      const id = this.props.id

      return (
         <button
            className="btn btn-sm btn-default"
            id={id}
            title={this.props.title}
            role="button"
            data-toggle="tooltip"
            onClick={this.props.onClick}
            style={this.props.style}
         >
            <img className="cth_buttonImage" src={icons[this.props.iconName]}/>
         </button>
      )
   }
}

Button.propTypes = {
   "id": PropTypes.string.isRequired,
   "title": PropTypes.string.isRequired,
   "onClick": PropTypes.func.isRequired,
   "iconName": PropTypes.string.isRequired
}
