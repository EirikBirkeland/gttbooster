// Copyright © 2016 Eirik Birkeland. All rights reserved.
export default [{
    'Flags': 'high',
    'Source': /^/,
    'Target': /(?:et [mds]ine?|ene? [mds]itt|ene [mds]in|en [mds]ine)\b/gi,
    'Desc': 'Possible concordance error – corrupted word ending',
    'Error': '0.166666666666667',
    'Todo': 'add exception for *utEN MITT*'
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /Når[^,]*?(?:\. [A-Z]|[^:]$)/,
    'Desc': 'Missing comma in Når sentence.',
    'Error': ''
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /Hvis[^,]*?(?:\. [A-Z]|[^:]$)/,
    'Desc': 'Missing comma in Hvis sentence.',
    'Error': ''
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /logge? (?:seg|deg|inn) på|logge? deg inn på|logge? inn/i,
    'Desc': 'Please simply use "logg på" for economy of language (0012 et al.)',
    'Error': ''
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /[0-9]+(?:W|cm[23²³]?|m[²³]?|mm[23²³]?|kg|W|MW|GW|J)\s/,
    'Desc': 'Space missing between number and unit.',
    'Error': ''
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /oppstod/,
    'Desc': 'oppstod → oppsto (Don\'t use \'Danish\' spelling)',
    'Error': ''
}, {
    'Flags': 'low',
    'Source': /^/,
    'Target': /^(?:Dine?|Ditt|Våre?)|(?!ne)(?!en)(?!et).. (?:dine?|ditt|våre?)[^.]/gi,
    'Desc': 'Avoid foranstilt pronoun (Danish syntax)',
    'Error': ''
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /[0-9]*[.,]?[0-9]+ (?=[A-Z])(?:AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTN|BWP|BYR|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UZS|VEF|VND|VUV|WST|XCD|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWL)\b/gi,
    'Desc': 'Currency acronyms should go in front of the sum',
    'Error': ''
}, {
    'Flags': '',
    'Source': /^/,
    'Target': /[$£€¥][0-9]+/g,
    'Desc': 'Currency symbol should be converted to 3 digit ISO code, if possible.',
    'Error': ''
}
]