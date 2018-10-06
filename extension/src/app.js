// Copyright © 2016 Eirik Birkeland. All rights reserved.
import $ from 'jquery';

const debug = require('cth-debug')(__dirname);

const pathname = window.location.pathname.toLowerCase();
const fullHref = window.location.href;

const pathnames = {
   "workbench": /toolkit\/(.*?\/)?workbench/,
   "list": /toolkit\/(.*?\/)?list/,
   "lqe": 'gloc-lqe-tool.appspot.com',
   "tc": 'google.com/transconsole'
};

debug.log('Entry point App.js loaded...');

$(document).ready(() => {
   if (pathname.match(pathnames.workbench)) {
      require('./workbench/5_init/init').initWorkbench();
   } else if (pathname.match(pathnames.list)) {
      require('./otherPages/inbox').initListModules();
   } else if (fullHref.match(pathnames.lqe)) {
      window.Lqe = require('./otherPages/LQE').default;
      window.Lqe.init();
      window.Lqe.run();
   } else if (fullHref.match(pathname.tc)) {
      if (localStorage['cth-dev-mode']) {
         require('./otherPages/tc').default();
      }
   }
});
