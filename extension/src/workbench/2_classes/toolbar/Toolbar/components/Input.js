import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
   render () {
      return (
         <input
            className={`btn btn-sm btn-default cth_input${this.props.className || ''}`}
            id={this.props.id}
            title={this.props.title}
            defaultValue={this.props.value}
            size="8"
            data-toggle="tooltip"
         />
      );
   }
}

Input.propTypes = {
   "value": PropTypes.string.isRequired,
   "className": PropTypes.string.isRequired,
   "id": PropTypes.string.isRequired,
   "title": PropTypes.string.isRequired,
   "defaultValue": PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
   ])
};
