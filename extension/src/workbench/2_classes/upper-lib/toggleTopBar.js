/**
 * Created by Eirik on 14.07.2017.
 */
import $ from 'jquery';

export default function toggleTopBar () {
   $('#wbheader').toggle(250);
   $('#gtc-gaiabar').toggle(250);
   $('#gtc-top-bar').toggle(250);
   $('.gtc-document-upper').toggle(250);
}
