/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results === null ? null : results[1];
}

$(function () {
    
    var topicTitleRaw = gup("title", window.location.href);
    var topicTitle = decodeURI(topicTitleRaw);

    console.log("current topic " +topicTitle);

});


