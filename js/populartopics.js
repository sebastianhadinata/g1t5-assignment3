/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module("myApp", ["firebase"]);

myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

myApp.controller('topicController', ['$scope', '$firebase',
    function($scope, $firebase) { 
    
        var theFirebaseURL = "https://g1t5-assignment-3.firebaseio.com/";
        
        var ref = new Firebase(theFirebaseURL);
        $scope.topics = $firebase(ref.child("topics").limitToLast(10)).$asArray(); 
        
        /*$scope.currentUser = null;
        //Check to see if the users is already logged in to Firebase and update currentUser if yes. 
        var authData = ref.getAuth();
          if (authData && authData !=={}) {
              $scope.currentUser = $firebase(ref.child("user").child(authData.uid)).$asObject();
          } else {
              console.log("User is logged out");
          }*/
        
    
    }]);



