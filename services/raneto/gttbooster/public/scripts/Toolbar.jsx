"use strict"
// import React from 'React'

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Main toolbar:
                <div className="cth-horizontal-images">
                    <a href="/features/search_and_filter.md">
                        <img className="cth-input" src="/images/toolbar/search_source.png"
                             title="Highlight source key words (text input)" data-toggle="tooltip"/></a>
                    <a href="/features/qa_checks.md">
                        <img className="cth-icon" src="/icons/upper/binocular--plus.png" title="QA"
                             data-toggle="tooltip"/></a>
                    <a href="/features/merged_view.md">
                        <img className="cth-icon" src="/icons/upper/arrow-curve.png" title="Combined segments view"
                             data-toggle="tooltip"/></a>
                    <a href="/features/insert_source.md">
                        <img className="cth-icon" src="/icons/upper/cheque--plus.png" title="Insert segment"
                             data-toggle="tooltip"/></a>
                    <a href="/features/hide_meta.md">
                        <img className="cth-icon" src="/icons/upper/desc_compress.png"
                             title="Hide metadata – compressed view"
                             data-toggle="tooltip"/></a>
                    <a href="/features/glossaries_window.md">
                        <img className="cth-icon" src="/icons/upper/application--plus.png"
                             title="Open separate glossaries window"
                             data-toggle="tooltip"/></a>
                    <img className="cth-icon" src="/icons/upper/plus.png"
                         title="Increase document font size (no article)"
                         data-toggle="tooltip"/>
                    <img className="cth-icon" src="/icons/upper/minus.png"
                         title="Reduce document font size (no article)"
                         data-toggle="tooltip"/>
                    <a href="/features/typing_prediction.md">
                        <img className="cth-icon" src="/icons/upper/autocompletionGreen.png"
                             title="Toggle typing prediction" data-toggle="tooltip"/></a>
                    <a href="/features/search_and_filter.md">
                        <img className="cth-input" src="/images/toolbar/search_target.png"
                             title="Highlight target key words (text input)" data-toggle="tooltip"/></a>
                    <a href="/features/reload_spreadsheet.md">
                        <img className="cth-input" src="/icons/upper/arrow-circle-default.png"
                             title="Reload any attached Google Spreadsheet" data-toggle="tooltip"/></a>
                    <a href="/features/settings.md">
                        <img className="cth-input" src="/icons/settings32.png"
                             title="Highlight target key words (text input)" data-toggle="tooltip"/></a>
                    <img className="cth-input" src="/icons/upper/question-button.png"
                         title="Leads to this website" data-toggle="tooltip"/>
                </div>
            </div>
        )
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ToolbarPage
}