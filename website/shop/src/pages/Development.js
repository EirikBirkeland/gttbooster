import React from 'react'

export default function Development() {
    return (
        <div>
            <h2>
                Development
            </h2>
            <p>
                GTT Booster will be in a state of <em>perpetual development</em>.
            </p>
            <p>
                A number of improvements and new features are planned, and we are right now determining our priorities.
            </p>

            <h2>GTT Booster – October update (coming soon)</h2>
            <p>
                <li>Autocomplete insertion fix: The caret used to be positioned incorrectly when inserting the same item
                    more than once in a single caret.
                </li>
                <li>Several improvements for live QA feature. Any changes made to any translated segment, will lead to
                    that segment being QA'ed when in QA mode. Also, segments should not fail to update as expected when
                    navigating errors.
                </li>
                <li>Revamped glossary view on the bottom: When GTT Booster is hiding any duplicate entries, there will
                    be an indication and a button to let you toggle between the old and new view.
                </li>
                <li>When editing a segment with duplicates in the same document, when QA mode is as active, the connected segments will all be checked in real-time - so when you change one, the other ones are checked as well.</li>
            </p>
            <h2>GTT Booster – September update</h2>
            <p>
                <ul>
                    <li>TM entries in Automatic Translation are now sorted according to %. This includes entries with
                        the "Draft" sticker - resulting in increased consistency and less scrolling.
                    </li>
                    <li>You can now lock (and of course unlock) ICE segments to avoid accidental editing.</li>
                    <li>The segment consistency check now works as intended</li>
                    <li>Slight performance optimizations</li>
                    <li>Keyword filtering is faster now</li>
                    <li>Micro-optimizations for Autocomplete.</li>
                    <li>Segments under "HTML ATTRIBUTES" are no longer marked as "identical to source", since, after
                        all,
                        in 99% of cases they are supposed to be left unchanged.
                    </li>
                    <li>Fixed a display bug for the consistency check</li>
                    <li>Improved scrolling in merged mode.</li>
                    <li>The multi-colored highlighting in the TM area has been replaced wih simpler highlighting similar
                        to the original one. We would love your <a href="mailto:gttbooster@gmail.com">feedback</a> on
                        how we can make this feature as effective as possible.
                    </li>
                    <li>Feature improvement: After using keyword filtering, you are now returned to the segment you were
                        last editing :-)
                    </li>
                </ul>
            </p>

            <h2>GTT Booster changes for July / early August.</h2>
            <p>
                <ul>
                    <li>07.07.2017 - FEATURE: auto-resizing of input box while in merged source/target mode has been
                        added. This new tweak
                        improves the usefulness of the merged view (proofreading mode).
                    </li>
                    <li>07.07.2017 - TWEAK: special symbols are now trimmed off autocompletion candidates, resulting in
                        more
                        useful suggestions.
                    </li>
                    <li>
                        10.07.2017 - FIX: The custom search glossary screen was showing incorrect information at times.
                    </li>
                    <li>
                        11.07.2017 - FIX: Autocomplete entries containing a hyphen was causing the entire segment to
                        be
                        replaced by the inserted entry.
                    </li>
                    <li>
                        11.07.2017 - FIX: Sometimes annoying duplicate entries were showing up in Automatic Translation
                        Search; not anymore.
                    </li>
                    <li>
                        11.07.2017 - TWEAK: Previously 2 styles of string highlighting were being used, depending on the
                        % match. This is less than optimal, and from now on the new style will be used for all segments.
                        However, we have also removed the strike-through for red text to ease readability.
                    </li>
                    <li>
                        12.07.2017 - TWEAK: the separate glossary window will now automatically be used if you open
                        several documents at the same time! This way, we don't have to click the icon for every
                        document.
                    </li>
                    <li>
                        18.07.2017 - FIX: Segment filtering should no longer occasionally hide the wrong segments. (This
                        was happening because the tool was in some cases hiding a LI tag, even though some of its
                        descendants were not a target for hiding.
                    </li>
                    <li>
                        20.07.2017 - TWEAK: The SG link redirects to the one-page SG instead of the multi page SG.
                    </li>
                    <li>

                    </li>
                </ul>
            </p>
        </div>
    )
}