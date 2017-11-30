<body>
When reporting a bug, we would greatly appreciate if you could include the following:

- Screenshot(s) of the console output
- Your GTT user name

None of these are necessary, and please do get in touch even if you are not able to provide such information. We are
always curious to learn more about our users' experience.

**How to take a screenshot of console output**

1. Open a GTT document or click <code>F5</code> to refresh the document.
2. Do whatever actions neeed to reproduce the error.
3. Press <code href="#" id="shortcut" class="btn large primary" rel="popover">ctrl-shift-j</code>. You should now see a
screen similar to this.
<div style="margin: 20px; width:250px;text-align: center">
    <img class="cth-zoom-on-hover cth-separate-image" src="/images/reporting_bugs/reporting_bugs.png">
</div>

4. Now just take a screenshot of any text in the console with a program of your choice, such as Microsoft's <a href="https://support.microsoft.com/en-us/help/13776/windows-use-snipping-tool-to-capture-screenshots">Snipping
    Tool</a>, which is built into most version of Windows.


</body>
<script>
    const img = '<img src="/images/keyboard_shortcuts/ctrl-shift-j.png" />';

    $(document).ready(function () {
        $("#shortcut").popover({title: 'Keys to press', content: img, html: true, trigger: 'hover'})
            .on("show.bs.popover", function () {
                $(this).data("bs.popover").tip().css("max-width", "600px")
            })
    })
</script>