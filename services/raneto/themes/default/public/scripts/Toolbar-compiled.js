"use strict";
// import React from 'React'

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
    _inherits(Toolbar, _React$Component);

    function Toolbar(props) {
        _classCallCheck(this, Toolbar);

        return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));
    }

    _createClass(Toolbar, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "Main toolbar:",
                React.createElement(
                    "div",
                    { className: "cth-horizontal-images" },
                    React.createElement(
                        "a",
                        { href: "/features/search_and_filter.md" },
                        React.createElement("img", { className: "cth-input", src: "/images/toolbar/search_source.png",
                            title: "Highlight source key words (text input)", "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/qa_checks.md" },
                        React.createElement("img", { className: "cth-icon", src: "/icons/upper/binocular--plus.png", title: "QA",
                            "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/merged_view.md" },
                        React.createElement("img", { className: "cth-icon", src: "/icons/upper/arrow-curve.png", title: "Combined segments view",
                            "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/insert_source.md" },
                        React.createElement("img", { className: "cth-icon", src: "/icons/upper/cheque--plus.png", title: "Insert segment",
                            "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/hide_meta.md" },
                        React.createElement("img", { className: "cth-icon", src: "/icons/upper/desc_compress.png",
                            title: "Hide metadata \u2013 compressed view",
                            "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/glossaries_window.md" },
                        React.createElement("img", { className: "cth-icon", src: "/icons/upper/application--plus.png",
                            title: "Open separate glossaries window",
                            "data-toggle": "tooltip" })
                    ),
                    React.createElement("img", { className: "cth-icon", src: "/icons/upper/plus.png",
                        title: "Increase document font size (no article)",
                        "data-toggle": "tooltip" }),
                    React.createElement("img", { className: "cth-icon", src: "/icons/upper/minus.png",
                        title: "Reduce document font size (no article)",
                        "data-toggle": "tooltip" }),
                    React.createElement(
                        "a",
                        { href: "/features/typing_prediction.md" },
                        React.createElement("img", { className: "cth-icon", src: "/icons/upper/autocompletionGreen.png",
                            title: "Toggle typing prediction", "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/search_and_filter.md" },
                        React.createElement("img", { className: "cth-input", src: "/images/toolbar/search_target.png",
                            title: "Highlight target key words (text input)", "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/reload_spreadsheet.md" },
                        React.createElement("img", { className: "cth-input", src: "/icons/upper/arrow-circle-default.png",
                            title: "Reload any attached Google Spreadsheet", "data-toggle": "tooltip" })
                    ),
                    React.createElement(
                        "a",
                        { href: "/features/settings.md" },
                        React.createElement("img", { className: "cth-input", src: "/icons/settings32.png",
                            title: "Highlight target key words (text input)", "data-toggle": "tooltip" })
                    ),
                    React.createElement("img", { className: "cth-input", src: "/icons/upper/question-button.png",
                        title: "Leads to this website", "data-toggle": "tooltip" })
                )
            );
        }
    }]);

    return Toolbar;
}(React.Component);

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ToolbarPage;
}

//# sourceMappingURL=Toolbar-compiled.js.map