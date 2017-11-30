// Copyright © 2016 Eirik Birkeland. All rights reserved.
(function (win) {
    if (win.location.pathname == '/toolkit/workbench') {
        // Load the Visualization API and the piechart package.

        cth.modules.pie = function () {
            logger.log('in pie.main')
            google.load('visualization', '1', {
                packages: ['corechart'],
                callback: 'logger.log("lol")'
            })
            function drawPieChart() {
                var existingToolbar = document.getElementsByClassName('goog-toolbar goog-toolbar-horizontal gtc-toolbar')[0]
                var tmp = document.createElement('DIV')
                tmp.id = 'piechart'
                //   tmp.style = 'float:right';
                logger.log(google)
                var targetDoc = document.querySelectorAll('iframe')[1].contentDocument // since this code is injected, it needs to create its own targetDoc and can't use win.cth.dom.targetDoc
                var iceLength = targetDoc.querySelectorAll('.goog-gtc-from-tm-score-100-ice').length
                var tmLength = targetDoc.querySelectorAll('.goog-gtc-from-tm-score-100').length
                var humanLength = targetDoc.querySelectorAll('.goog-gtc-from-human').length
                var fromSourceLength = targetDoc.querySelectorAll('.goog-gtc-from-source').length
                var data = google.visualization.arrayToDataTable([
                    ['Segment types', 'NO# of Segments'],
                    ['ICE', iceLength],
                    ['TM', tmLength],
                    ['Human', humanLength],
                    ['Source', fromSourceLength]
                ])

                var options = {
                    title: 'Segment Types',
                    slices: {
                        0: {color: 'purple'},
                        1: {color: 'blue'},
                        2: {color: 'green'},
                        3: {color: 'black'}
                    }
                }

                existingToolbar.appendChild(tmp)
                var chart = new google.visualization.PieChart(document.getElementById('piechart'))
                var piechart = document.getElementById('piechart')
                // err ok this one dun work:
                if (piechart.style.display == '') piechart.style.display = 'none'
                else if (piechart.style.display == 'none') piechart.style.display = ''
                // "DOM".addEventListener('ondomchange', updateArrays);
                chart.draw(data, options)
            }

            document.querySelector('#\\:1o').setAttribute('onclick', '(function(){   var existingToolbar=document.getElementsByClassName(\'goog-toolbar goog-toolbar-horizontal gtc-toolbar\')[0];var tmp=document.createElement(\'DIV\');tmp.id=\'piechart\';logger.log(google);var targetDoc=document.querySelectorAll(\'iframe\')[1].contentDocument;var iceLength=targetDoc.querySelectorAll(\'.goog-gtc-from-tm-score-100-ice\').length;var tmLength=targetDoc.querySelectorAll(\'.goog-gtc-from-tm-score-100\').length;var humanLength=targetDoc.querySelectorAll(\'.goog-gtc-from-human\').length;var fromSourceLength=targetDoc.querySelectorAll(\'.goog-gtc-from-source\').length;var data=google.visualization.arrayToDataTable([[\'Segment types\',\'NO# of Segments\'],[\'ICE\',iceLength],[\'TM\',tmLength],[\'Human\',humanLength],[\'Source\',fromSourceLength]]);var options={title:\'Segment     Types\',slices:{0:{color:\'purple\'},1:{color:\'blue\'},2:{color:\'green\'},3:{color:\'black\'}}};existingToolbar.appendChild(tmp);var chart=new google.visualization.PieChart(document.getElementById(\'piechart\'));chart.draw(data,options);var piechart=document.getElementById(\'piechart\');if(piechart.style.display=\'\')piechart.style.display=\'none\';if(piechart.style.display=\'none\')piechart.style.display=\'\';   })();')
        }
    }
})(window)

