// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by Eirik on 12.07.2017.
 */

/*
 * TODO: Change the numbers 1, 2, 3 - they are not needed.
 * TODO: Create a new view where items are listed according to product first!
 * e.g.
 * AdWordsUpdated
 * --------------
 * eligible - kvalifisert (noun)
 * IF - HVIS other
 */

export const getHead = function () {

   return `<head>
    <title>Detached Glossaries</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <style>
        body {
            font-size: 14px
        }

        .cth-spacious {
            margin: 5px
        }

        .gtc-glossary-pos {
            font-family: monospace
        }

        .gtc-glossary-sourceterm {
            display: inline-block
            *zoom: 1
            *display: inline
            width: 20%
            vertical-align: top
            color: red
        }

        .gtc-glossary-source {
            color: #666
            vertical-align: top
        }

        .gtc-glossary-terms {
            clear: both
            display: block
            padding-bottom: 0.5em
        }

        .gtc-glossary-translation, .gtc-glossary-pos {
            font-family: monospace
        }

        .gtc-glossary-translation {
            font-size: larger
            display: inline-block
            vertical-align: top
            font-weight: bold
        }

        .gtc-glossary-pos, .gtc-glossary-language {
            font-style: italic
            display: inline-block
            vertical-align: top
            font-size: smaller
            color: #666
        }

        .gtc-glossary-description {
            vertical-align: top
            clear: both
            display: block
        }
    </style>
</head>`

}

export const getBody = function (content) {

   return `<body>
                    <div style="margin:3px" class="btn-group" role="group">
                        <button type="button" title="Increae font size" class="btn btn-default" id="cth-incr">
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </button>
                        <button type="button" title="Decrease font size" class="btn btn-default" id="cth-decr">
                            <span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
                        </button>
                        <button type="button" title="Toggle descriptions" class="btn btn-default" id="cth-compress">
                            <span class="glyphicon glyphicon-compressed" aria-hidden="true"></span>
                        </button>
                    </div>
                    ${content || 'No glossary matches available.'}
                </body>`

}
