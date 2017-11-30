  <div class="alert alert-info">
    <h1>Under construction <span class="glyphicon glyphicon-alert"></span></h1>
    <p>The below documentation for optional custom QA checks is under construction. Please check back soon for a simplified procedure!</p>
  </div>

<h4>1. Getting your first Spreadsheet up and running:</h4>
First, ensure that you are currently logged in through Google with your vendor-provided GTT account. Then, pick a standard template you wish to use:
  * Standard template (only one available for now)
1. After opening the spreadsheet in Google Spreadsheets, have a look at the "Help" tab first or proceed directly to _**File > Make a copy...**_
2. You should now have your own editable copy of the spreadsheet! We recommend that you bookmark it and keep it handy for simple editing.
3. <b>UPDATE: Public sharing:</b> Now, you need to make your spreadsheet publicly accessible. This is needed so that GTT Booster can retrieve the data. Technically, anyone will be able to view the public version of your spreadsheet, but without editing capabilities. But in order to view it, people would need to know your URL. Please consider the URL as your secret, and do not share it with people who you don't want to access it.
  <div style="margin: 20px; width:250px;text-align: center">
      <img class="cth-zoom-on-hover cth-separate-image" src="/images/spreadsheet_public.PNG"> ___In Google Spreadsheet, go to <code>File</code> &gt; <code>Publish to the web...</code>. Please use the image for recommended settings.___</img>
  </div>

<em>Please get in touch if you experience any issues while or after following these instructions.</em>

<h4>2. Entering your new spreadsheet URL into GTT Booster</h4>
1. First copy the URL to the clipboard by highlighting it and pressing <kbd>CTRL + C</kbd>.
2. Go to the GTT Booster options screen, <code>chrome-extension://cjoicloomdlpbncchogkibphjpafibed/html/options.html#menu6</code>, and replace any existing URL. Remember to click <kbd>Enter</kbd> to ensure the new URL is saved.
3.

<h4>3. Go for a test run</h4>
1. Open up any document in GTT. If the extension loads correctly, you should see an additional toolbar by the top.
2. Open up the spreadsheet you copied earlier. Now, let's add a new line and enter a dummy test as follows:

TODO: Redo this image and include the top headers; also, do a source match instead since that will work well regardless of language.
![Abc][example_test1]

  * NB! If "a" is not a common symbol in your language, try another common one.

3. Having created the above test, we now head back to GTT. press CTRL-R to reload the page and then click the binoculars to start checking. You should get a result similar to this:

![Abc][example_test2]

You're almost there! Now, you can play with the above and create simple tests. For example, you may enter _Google_ in the source field, and _Google_ in the source field. This would, as you might expect, present the user with a warning if Google was detected in both the source and target fields. For a more useful way of adding custom term checks, let's learn more about the supported syntax. Don't worry, there's not much to learn in order to create powerful custom checks.

[Learn more about the test syntax](/syntax)


[example_test1]: %image_url%/custom_qa_checks/example_test1.PNG "Abc"
[example_test2]: %image_url%/custom_qa_checks/example_test2.PNG "Abc"
