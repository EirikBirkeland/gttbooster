"use strict"
// import React from 'React'

class TitleIcons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Browser tab title icons:
                <div className="cth-horizontal-images">
                    <img className="cth-input" src="/icons/title/red.ico"
                         title="Indicates that the document is in translation" data-toggle="tooltip"/>
                    <img className="cth-input" src="/icons/title/yellow.ico"
                         title="Indicates that the document is in copy edit" data-toggle="tooltip"/>
                    <img className="cth-input" src="/icons/title/green.ico"
                         title="Indicates that the document has been delivered" data-toggle="tooltip"/>
                </div>
            </div>
        )
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ToolbarPage
}