

var cheerio = require('cheerio');
var request = require('request');
var Firebase = require('firebase');
var Kronkite = new Firebase('https://kronkite.firebaseio.com/');

var todayStories = Kronkite.child('stories/today');

var webAddress = "http://hosted.ap.org/dynamic/stories/1/10_THINGS_TO_KNOW_TODAY?SITE=AP";


request(webAddress, function(err, resp, body) {
    if(err) {
        console.log(err);
    }
    $ = cheerio.load(body);
    var storyData = [];
    $(".entry-content .ap-story-p").each(function(){
        storyData.push({
                text: $(this).text()
            });
    });
    $(".entry-content img").each(function(){
        console.log($(this).attr("src"));
    });
    todayStories.set(storyData);
});
