// Copyright © 2016 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 2016/02/27.
 */

import $ from 'jquery';

export function removeMt () {
   const $rightPart = $('.gtc-tool-right-floating');

   $rightPart.find('.gtc-tool-mt').hide();
   $rightPart.find('.gtc-mt-suggestion-holder').hide();
}
