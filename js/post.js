'use strict';
 
angular.module('postApp', ['firebase'])
.controller('PostController', function($scope,$firebase,$window) {
 
  //connectiong to firebase
    var myDataRef = new Firebase('https://g1t5-assignment-3.firebaseio.com/');

    $scope.post = function(event) {
    event.preventDefault();  // To prevent form refreshn
    var d = new Date();
    var text = $scope.data.message;

    var date = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
d.getHours() + ":" + d.getMinutes();
      
     // console.log("comment capture");  
     // console.log(date);
       myDataRef.child('haze').push({date: date, content: text});
       $('#messageInput').val('');
    };


    // Get a database reference to our posts and displaying 
var ref = new Firebase("https://g1t5-assignment-3.firebaseio.com/haze");

      var sync = $firebase(ref);
      $scope.articles = sync.$asArray();

});
 