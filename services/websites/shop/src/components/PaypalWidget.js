import React from "react"
import {Col, ControlLabel, FormControl, FormGroup, InputGroup} from "react-bootstrap"
import PropTypes from 'prop-types'

export default class PaypalWidget extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            buttonGreyedOut: true,
            buttonDisabled: true,
            validation: ''
        }
    }

    handleChange = (e) => {
        const theInput = e.target.value
        const emailRe = /^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\s*$/i // supports 99% of e-mails

        if (theInput.match(emailRe)) {
            this.setState({
                buttonGreyedOut: false,
                buttonDisabled: false,
                validation: "success"
            })
        } else {
            this.setState({
                buttonGreyedOut: true,
                validation: "warning"
            })
        }
    }

    handleClick = (e) => {
        if (this.state.validation !== "success") {
            e.preventDefault()
            this.setState({
                validation: "error"
            })
        }
    }

    render() {

        const classy = this.state.buttonGreyedOut ? "img-gray" : ""
        const disabled = this.state.buttonDisabled
        const title = "Please enter a valid e-mail address"
        const validation = this.state.validation
        const desc = "Please enter your GTT email account"
        const storeDesc = "GTT/Sesame email account"
        // const descOld = "Your GTT email account:"
        const hoverTitle = disabled ? title : ""

        const formActionUrl = window.mode === "DEVELOPMENT"
            ? "https://www.sandbox.paypal.com/cgi-bin/webscr"
            : "https://www.paypal.com/cgi-bin/webscr"

        const paypalUrl = window.mode === "DEVELOPMENT"
            ? "https://www.sandbox.paypal.com/en_US/NO/i/btn/btn_" + this.props.type + "CC_LG.gif"
            : "https://www.paypalobjects.com/en_US/NO/i/btn/btn_" + this.props.type + "CC_LG.gif"

        const pixelUrl = window.mode === "DEVELOPMENT"
            ? "https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif"
            : "https://www.paypalobjects.com/en_US/i/scr/pixel.gif"

        return (
            <form ref="form" action={formActionUrl}
                  method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick"/>
                <input type="hidden" name="hosted_button_id" value={this.props.code}/>

                <FormGroup ref="FormGroup" controlId="formValidationSuccess4" validationState={validation}>
                    <Col xs={11} componentClass={ControlLabel}>
                        <input type="hidden" name="on0" value={storeDesc}/>
                        {desc}
                    </Col>
                    <Col xs={11}>
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl onChange={this.handleChange} type="text" name="os0" maxLength="200"/>
                            <FormControl.Feedback />
                        </InputGroup>
                    </Col>
                    <input style={{marginTop: "5px", marginLeft: "10px"}} onClick={this.handleClick} title={hoverTitle}
                           className={classy} type="image" src={paypalUrl}
                           name="submit" alt="PayPal – en trygg og enkel betalingsmetode på nettet!"/>
                    <img alt="" src={pixelUrl} width="1" height="1"/>
                </FormGroup>

            </form>
        )
    }

    static propTypes = {
        type: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired
    }
}