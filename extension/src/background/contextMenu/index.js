/* global chrome */
import {handleTcRequest} from '../handleTcRequest';

const debug = require('cth-debug')(__filename);

const title = "Look up phrase in Translation Console";
const contexts = ["selection"];

chrome.contextMenus.create({
   title,
   contexts,
   "onclick": handleTcRequest
});