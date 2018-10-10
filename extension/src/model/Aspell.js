// Copyright © 2016 Eirik Birkeland. All rights reserved.


const currentLanguages = require('./currentLanguages')
require('cth-prototype')

const aspellLangCodes = Object.freeze('af am ar bg bg-w_english bg-wo_english bn br ca ca-general ca-valencia cs cy da de de-neu de_AT de_AT de_AT-neu de_CH de_CH de_CH-neu de_DE de_DE de_DE-neu el en en-variant_0 en-variant_1 en-variant_2 en-w_accents en-wo_accents en_CA en_CA-variant_0 en_CA-variant_1 en_CA-w_accents en_CA-wo_accents en_GB en_GB-ise en_GB-ise-w_accents en_GB-ise-wo_accents en_GB-ize en_GB-ize-w_accents en_GB-ize-wo_accents en_GB-variant_0 en_GB-variant_1 en_GB-w_accents en_GB-wo_accents en_US en_US-variant_0 en_US-variant_1 en_US-w_accents en_US-wo_accents eo es et eu fa fa-common fa-generic fa-scientific fo fr-40 fr fr-60 fr-80 fr-lrg fr-med fr-sml fr_CH-40 fr_CH-60 fr_CH fr_CH-80 fr_CH-lrg fr_CH-med fr_CH-sml fr_FR-40 fr_FR fr_FR-60 fr_FR-80 fr_FR-lrg fr_FR-med fr_FR-sml ga gu he hi hr hu hy id is it kk kn ku lt lv ml mr nb nl nn no nr ns or pa pl pt_BR pt_PT ro ru sk sk_SK sl ss st sv ta te tl tl_PH tn tr ts uk uz xh zu'.split(' '))

// All Google language codes:
const accountToAspellCodeConversionTable = {
   "ach": {
      "code": 'ach',
      "language": 'Luo'
   },
   "af": {
      "code": 'af',
      "language": 'Afrikaans'
   },
   "ak": {
      "code": 'ak',
      "language": 'Akan'
   },
   "am": {
      "code": 'am',
      "language": 'Amharic'
   },
   "ar": {
      "code": 'ar',
      "language": 'Arabic'
   },
   "az": {
      "code": 'az',
      "language": 'Azerbaijani'
   },
   "be": {
      "code": 'be',
      "language": 'Belarusian'
   },
   "bem": {
      "code": 'bem',
      "language": 'Bemba'
   },
   "bg": {
      "code": 'bg',
      "language": 'Bulgarian'
   },
   "bh": {
      "code": 'bh',
      "language": 'Bihari'
   },
   "bn": {
      "code": 'bn',
      "language": 'Bengali'
   },
   "br": {
      "code": 'br',
      "language": 'Breton'
   },
   "bs": {
      "code": 'bs',
      "language": 'Bosnian'
   },
   "ca": {
      "code": 'ca',
      "language": 'Catalan'
   },
   "chr": {
      "code": 'chr',
      "language": 'Cherokee'
   },
   "ckb": {
      "code": 'ckb',
      "language": 'Kurdish (Soranî)'
   },
   "co": {
      "code": 'co',
      "language": 'Corsican'
   },
   "crs": {
      "code": 'crs',
      "language": 'Seychellois Creole'
   },
   "cs": {
      "code": 'cs',
      "language": 'Czech'
   },
   "cy": {
      "code": 'cy',
      "language": 'Welsh'
   },
   "da": {
      "code": 'da',
      "language": 'Danish'
   },
   "de": {
      "code": 'de',
      "language": 'German'
   },
   "ee": {
      "code": 'ee',
      "language": 'Ewe'
   },
   "el": {
      "code": 'el',
      "language": 'Greek'
   },
   "en": {
      "code": 'en',
      "language": 'English'
   },
   "eo": {
      "code": 'eo',
      "language": 'Esperanto'
   },
   "es": {
      "code": 'es',
      "language": 'Spanish'
   },
   'es-419': {
      "code": 'es',
      "language": 'Spanish (Latin American)'
   },
   "et": {
      "code": 'et',
      "language": 'Estonian'
   },
   "eu": {
      "code": 'eu',
      "language": 'Basque'
   },
   "fa": {
      "code": 'fa',
      "language": 'Persian'
   },
   "fi": {
      "code": 'fi',
      "language": 'Finnish'
   },
   "fo": {
      "code": 'fo',
      "language": 'Faroese'
   },
   "fr": {
      "code": 'fr',
      "language": 'French'
   },
   'fr-CA': {
      "code": 'fr',
      "language": 'French'
   },
   "fy": {
      "code": 'fy',
      "language": 'Frisian'
   },
   "ga": {
      "code": 'ga',
      "language": 'Irish'
   },
   "gaa": {
      "code": 'gaa',
      "language": 'Ga'
   },
   "gd": {
      "code": 'gd',
      "language": 'Scots Gaelic'
   },
   "gl": {
      "code": 'gl',
      "language": 'Galician'
   },
   "gn": {
      "code": 'gn',
      "language": 'Guarani'
   },
   "gu": {
      "code": 'gu',
      "language": 'Gujarati'
   },
   "ha": {
      "code": 'ha',
      "language": 'Hausa'
   },
   "haw": {
      "code": 'haw',
      "language": 'Hawaiian'
   },
   "he": {
      "code": 'he',
      "language": 'Hebrew'
   },
   "hi": {
      "code": 'hi',
      "language": 'Hindi'
   },
   "hr": {
      "code": 'hr',
      "language": 'Croatian'
   },
   "ht": {
      "code": 'ht',
      "language": 'Haitian Creole'
   },
   "hu": {
      "code": 'hu',
      "language": 'Hungarian'
   },
   "hy": {
      "code": 'hy',
      "language": 'Armenian'
   },
   "ia": {
      "code": 'ia',
      "language": 'Interlingua'
   },
   "id": {
      "code": 'id',
      "language": 'Indonesian'
   },
   "ig": {
      "code": 'ig',
      "language": 'Igbo'
   },
   "is": {
      "code": 'is',
      "language": 'Icelandic'
   },
   "it": {
      "code": 'it',
      "language": 'Italian'
   },
   "iw": {
      "code": 'he',
      "language": 'Hebrew'
   },
   "ja": {
      "code": 'ja',
      "language": 'Japanese'
   },
   "jw": {
      "code": 'jw',
      "language": 'Javanese'
   },
   "ka": {
      "code": 'ka',
      "language": 'Georgian'
   },
   "kg": {
      "code": 'kg',
      "language": 'Kongo'
   },
   "kk": {
      "code": 'kk',
      "language": 'Kazakh'
   },
   "km": {
      "code": 'km',
      "language": 'Cambodian'
   },
   "kn": {
      "code": 'kn',
      "language": 'Kannada'
   },
   "ko": {
      "code": 'ko',
      "language": 'Korean'
   },
   "kri": {
      "code": 'kri',
      "language": 'Krio (Sierra Leone)'
   },
   "ku": {
      "code": 'ku',
      "language": 'Kurdish'
   },
   "ky": {
      "code": 'ky',
      "language": 'Kyrgyz'
   },
   "la": {
      "code": 'la',
      "language": 'Latin'
   },
   "lg": {
      "code": 'lg',
      "language": 'Luganda'
   },
   "ln": {
      "code": 'ln',
      "language": 'Lingala'
   },
   "lo": {
      "code": 'lo',
      "language": 'Laothian'
   },
   "loz": {
      "code": 'loz',
      "language": 'Lozi'
   },
   "lt": {
      "code": 'lt',
      "language": 'Lithuanian'
   },
   "lua": {
      "code": 'lua',
      "language": 'Tshiluba'
   },
   "lv": {
      "code": 'lv',
      "language": 'Latvian'
   },
   "mfe": {
      "code": 'mfe',
      "language": 'Mauritian Creole'
   },
   "mg": {
      "code": 'mg',
      "language": 'Malagasy'
   },
   "mi": {
      "code": 'mi',
      "language": 'Maori'
   },
   "mk": {
      "code": 'mk',
      "language": 'Macedonian'
   },
   "ml": {
      "code": 'ml',
      "language": 'Malayalam'
   },
   "mn": {
      "code": 'mn',
      "language": 'Mongolian'
   },
   "mo": {
      "code": 'mo',
      "language": 'Moldavian'
   },
   "mr": {
      "code": 'mr',
      "language": 'Marathi'
   },
   "ms": {
      "code": 'ms',
      "language": 'Malay'
   },
   "mt": {
      "code": 'mt',
      "language": 'Maltese'
   },
   "ne": {
      "code": 'ne',
      "language": 'Nepali'
   },
   "nl": {
      "code": 'nl',
      "language": 'Dutch'
   },
   "nn": {
      "code": 'nn',
      "language": 'Norwegian (Nynorsk)'
   },
   "no": {
      "code": 'no',
      "language": 'Norwegian'
   },
   "nb": {
      "code": 'no',
      "language": 'Norwegian'
   },
   "nso": {
      "code": 'nso',
      "language": 'Northern Sotho'
   },
   "ny": {
      "code": 'ny',
      "language": 'Chichewa'
   },
   "nyn": {
      "code": 'nyn',
      "language": 'Runyakitara'
   },
   "oc": {
      "code": 'oc',
      "language": 'Occitan'
   },
   "om": {
      "code": 'om',
      "language": 'Oromo'
   },
   "or": {
      "code": 'or',
      "language": 'Oriya'
   },
   "pa": {
      "code": 'pa',
      "language": 'Punjabi'
   },
   "pcm": {
      "code": 'pcm',
      "language": 'Nigerian Pidgin'
   },
   "pl": {
      "code": 'pl',
      "language": 'Polish'
   },
   "ps": {
      "code": 'ps',
      "language": 'Pashto'
   },
   "pt_BR": {
      "code": 'pt_BR',
      "language": 'Portuguese (Brazil)'
   },
   'pt-BR': {
      "code": 'pt_BR',
      "language": 'Portuguese (Brazil)'
   },
   'pt-PT': {
      "code": 'pt_PT',
      "language": 'Portuguese (Portugal)'
   },
   "qu": {
      "code": 'qu',
      "language": 'Quechua'
   },
   "rm": {
      "code": 'rm',
      "language": 'Romansh'
   },
   "rn": {
      "code": 'rn',
      "language": 'Kirundi'
   },
   "ro": {
      "code": 'ro',
      "language": 'Romanian'
   },
   "ru": {
      "code": 'ru',
      "language": 'Russian'
   },
   "rw": {
      "code": 'rw',
      "language": 'Kinyarwanda'
   },
   "sd": {
      "code": 'sd',
      "language": 'Sindhi'
   },
   "sh": {
      "code": 'sh',
      "language": 'Serbo-Croatian'
   },
   "si": {
      "code": 'si',
      "language": 'Sinhalese'
   },
   "sk": {
      "code": 'sk',
      "language": 'Slovak'
   },
   "sl": {
      "code": 'sl',
      "language": 'Slovenian'
   },
   "sn": {
      "code": 'sn',
      "language": 'Shona'
   },
   "so": {
      "code": 'so',
      "language": 'Somali'
   },
   "sq": {
      "code": 'sq',
      "language": 'Albanian'
   },
   "sr": {
      "code": 'sr',
      "language": 'Serbian'
   },
   'sr-ME': {
      "code": 'sr-ME',
      "language": 'Montenegrin'
   },
   "st": {
      "code": 'st',
      "language": 'Sesotho'
   },
   "su": {
      "code": 'su',
      "language": 'Sundanese'
   },
   "sv": {
      "code": 'sv',
      "language": 'Swedish'
   },
   "sw": {
      "code": 'sw',
      "language": 'Swahili'
   },
   "ta": {
      "code": 'ta',
      "language": 'Tamil'
   },
   "te": {
      "code": 'te',
      "language": 'Telugu'
   },
   "tg": {
      "code": 'tg',
      "language": 'Tajik'
   },
   "th": {
      "code": 'th',
      "language": 'Thai'
   },
   "ti": {
      "code": 'ti',
      "language": 'Tigrinya'
   },
   "tk": {
      "code": 'tk',
      "language": 'Turkmen'
   },
   "tl": {
      "code": 'tl',
      "language": 'Filipino'
   },
   "tn": {
      "code": 'tn',
      "language": 'Setswana'
   },
   "to": {
      "code": 'to',
      "language": 'Tonga'
   },
   "tr": {
      "code": 'tr',
      "language": 'Turkish'
   },
   "tt": {
      "code": 'tt',
      "language": 'Tatar'
   },
   "tum": {
      "code": 'tum',
      "language": 'Tumbuka'
   },
   "tw": {
      "code": 'tw',
      "language": 'Twi'
   },
   "ug": {
      "code": 'ug',
      "language": 'Uighur'
   },
   "uk": {
      "code": 'uk',
      "language": 'Ukrainian'
   },
   "ur": {
      "code": 'ur',
      "language": 'Urdu'
   },
   "uz": {
      "code": 'uz',
      "language": 'Uzbek'
   },
   "vi": {
      "code": 'vi',
      "language": 'Vietnamese'
   },
   "wo": {
      "code": 'wo',
      "language": 'Wolof'
   },
   "xh": {
      "code": 'xh',
      "language": 'Xhosa'
   },
   'xx-bork': {
      "code": 'xx-bork',
      "language": 'Bork, bork, bork!'
   },
   'xx-elmer': {
      "code": 'xx-elmer',
      "language": 'Elmer Fudd'
   },
   'xx-hacker': {
      "code": 'xx-hacker',
      "language": 'Hacker'
   },
   'xx-klingon': {
      "code": 'xx-klingon',
      "language": 'Klingon'
   },
   'xx-pirate': {
      "code": 'xx-pirate',
      "language": 'Pirate'
   },
   "yi": {
      "code": 'yi',
      "language": 'Yiddish'
   },
   "yo": {
      "code": 'yo',
      "language": 'Yoruba'
   },
   'zh-CN': {
      "code": 'zh-CN',
      "language": 'Chinese (Simplified)'
   }, // Chinese not applicable ...
   'zh-TW': {
      "code": 'zh-TW',
      "language": 'Chinese (Traditional)'
   }, // Chinese not applicable ...
   "zu": {
      "code": 'zu',
      "language": 'Zulu'
   }
}

const aspellLangCodeReordered = function () {
   const acronyms = currentLanguages

   // Use Set for unique values instead of sort+uniq
   const convertedAccountCodes = acronyms.sort().uniq().map((ele) => accountToAspellCodeConversionTable[ele.code]).truthy()

   // Logger.log(convertedAccountCodes)
   return aspellLangCodes.filter((code) => convertedAccountCodes.some((ele) => ele.match(code)))
}

const reorderedAccordingToAvailableAccounts = function () {
   let arr = aspellLangCodeReordered()
   // Separator for view
   arr.push('---------')
   arr = arr.concat(aspellLangCodes)
   return arr
}

module.exports = {
   aspellLangCodes,
   accountToAspellCodeConversionTable,
   aspellLangCodeReordered,
   reorderedAccordingToAvailableAccounts
}
