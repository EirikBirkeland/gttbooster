function Dev (fn) {
   if (localStorage['cth-dev-mode']) {
      fn();
   } else {
      return null;
   }
}

export { Dev };
