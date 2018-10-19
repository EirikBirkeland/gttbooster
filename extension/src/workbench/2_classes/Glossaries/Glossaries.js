// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 24.07.2016.
 */


import { alphabetizeAndHighlight, sendToBackground } from './lib/organizeGlossaries';
import { buildObject } from './lib/buildObject';
import { extractDbFormatEntries } from './lib/extractDbFormatEntries';
import { getUniqueTranslationsArray } from './lib/getUniqueTranslationsArray';

const debug = require('cth-debug')(__filename.replace(/^src\//, ''));

const Glossaries = {
    getUniqueTranslationsArray,
    alphabetizeAndHighlight,
    sendToBackground,
    extractDbFormatEntries
};

export { Glossaries, buildObject };