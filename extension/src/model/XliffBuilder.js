import escapeXml from 'xml-escape'
import _ from 'lodash'

// @flow
export type XliffData = {
   docLang?: string,
   date?: string,
   sourceStrings: Array<string>,
   targetStrings: Array<string>,
}

export const XliffBuilder = {
   createDoc (data: XliffData) {
      const {docLang, date, sourceStrings, targetStrings} = data
      const header: string = this._createHeader(docLang, date)
      const xliffUnits: string = _.map(sourceStrings, (x, i) => this._createXliffUnit(docLang, sourceStrings[i], targetStrings[i], i + 1)).join("")
      const footer: string = this._createFooter()
      return header + xliffUnits + footer
   },

   _createHeader (docLang: string, date: string) {
      return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">
<xliff xmlns:EirikXliff="urn:EirikXliff:xliffeditor:xliff-extras:1.0" version="1.0">
<file date="${date || "unspecified"}" source-language="en-us" target-language="${docLang || "unspecified"}" datatype="plaintext" original="Content extracted from GTT">
<header>
<tool tool-version="1.5" tool-name="STPToolbar" tool-id="http://www.stptrans.com">
<EirikXliff:sourceinfo>
<EirikXliff:source-encoding>utf-8</EirikXliff:source-encoding>
</EirikXliff:sourceinfo>
</tool>
</header>
<body>`
   },

   _createXliffUnit (docLang: string, source: string, target: string, id: number) {
      return `
<trans-unit translate="yes" id="${id}">
    <source>${escapeXml(source, '"')}</source>
    <target xml:lang="${docLang}" state="translated">${escapeXml(target, '"')}</target>
</trans-unit>`
   },

   _createFooter () {
      return `</body>
</file>
</xliff>`
   }
}
