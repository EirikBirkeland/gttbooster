import $ from 'jquery';

const Mt = {
   init () {
      this.$node = $('.gtc-mt-suggestion');
   },
   get "content" () {
      return this.$node.html();
   },
   set "content" (newVal) {
      this.$node.html(newVal);
   }
};

export function cleanupMt () {
   Mt.init();
   if (Mt.content) {
      Mt.content = Mt.content.replace(/&lt;a x="/g, '{')
         .replace(/"\/&gt;/g, '}')
         .replace(/&lt;\/a&gt;/g, '');
   }
}