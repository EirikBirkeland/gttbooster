// Not sure what this thing is ... capture thing.
function capturify (thing) {
   return thing instanceof RegExp
      ? new RegExp(`(${thing.source})`, thing.flags)
      : new RegExp(`(${thing})`);
}
