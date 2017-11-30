<div class="alert alert-info">
    <h1>Under construction <span class="glyphicon glyphicon-alert"></span></h1>
    <p>The below documentation for optional custom QA checks is under construction. Please check back soon for a simplified procedure!</p>
</div>

This page gives an overview of the supported syntax for creating tests.

<br>
<h4>Search inversion</h4>
Sometimes you want to say _do not match_ rather than just _match_, in other words you want to set a match condition when the specified ocntent does _not_ match.

This can be done simply by enclosing the search term in quotation marks and prefixing a minus symbol.

This would trigger a segment match if Google is found:
`Google`
This would trigger a segment match if Google is NOT found.
`-"Google"`

<h4>Regular expressions</h4>
Regular expressions, which you may have heard of and may recognize as a collection of mostly unseemly squiggles, is a very powerful standard for text matching. About 95% of the time, you should not be in want of making regular expression tests, but sometimes you may be tempted.

GTT Booster comes with full support for Unicode property names. These augment the standard JavaScript regular expression syntax with a number of powerful facilities.