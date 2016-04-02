
var myApp = angular.module("postApp", ["firebase"]);

function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results === null ? null : results[1];
}

myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

var topicTitleRaw = gup("title", window.location.href);
var topicTitle = decodeURI(topicTitleRaw);

console.log("current topic " +topicTitle);

myApp
.controller('PostController', function($scope,$firebase,$window) {
    
   document.getElementById("complainTitle").innerHTML = "What Other People are Saying About " +topicTitle;
 
  //connectiong to firebase
    var myDataRef = new Firebase('https://g1t5-assignment-3.firebaseio.com');

    $scope.post = function(event) {
    event.preventDefault();  // To prevent form refreshn
    var d = new Date();
    var text = $scope.data.message;

    var date = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
d.getHours() + ":" + d.getMinutes();
      
     // console.log("comment capture");  
     // console.log(date);
       myDataRef.child(topicTitle).push({date: date, content: text});
       $('#messageInput').val('');
    };


    // Get a database reference to our posts and displaying 
    var ref = new Firebase("https://g1t5-assignment-3.firebaseio.com/" + topicTitle);

      var sync = $firebase(ref);
      $scope.articles = sync.$asArray();

});
 