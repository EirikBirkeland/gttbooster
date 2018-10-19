import $ from 'jquery';

export const bottom = {
   get "tabs" () {
      const bottom = $('#tools').get(0);
      const tabs = $('#gtc-toolbar-tabs').get(0);
      return {
         "itself": tabs,
         get "autoSearch" () {
            const itself = $(bottom).find('.gtc-tools-autosearch').get(0);
            return {
               itself,
               get "left" () {
                  const left = $(itself).find('.gtc-tool-left-floating');
                  return {
                     get "tmItemsContainer" () {
                        const itself = $(left).find('.gtc-tool-content');
                        return { itself };
                     }
                  };
               }
            };
         },
         "customSearch": $(tabs).find('.gtc-tools-customsearch').get(0),
         "validation": $(tabs).find('.gtc-tools-validation').get(0),
         "qm": $(tabs).find('.gtc-tools-qm').get(0)
      };
   },
};