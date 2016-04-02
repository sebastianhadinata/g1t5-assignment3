var myApp = angular.module("myApp", ["firebase"]);

myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

myApp.controller('topicController', ['$scope', '$firebase', function($scope, $firebase) { 
  var theFirebaseURL = "https://g1t5-assignment-3.firebaseio.com/";
  var ref = new Firebase(theFirebaseURL);
  $scope.topics = $firebase(ref.child("topics").limitToLast(5)).$asArray(); 
}]);