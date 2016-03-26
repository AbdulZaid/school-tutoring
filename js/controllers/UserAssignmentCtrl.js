myApp.controller('UserAssignmentCtrl', ['$scope','Auth','Users','$firebaseObject','$firebaseArray','$mdDialog', function ($scope, Auth, Users, $firebaseObject, $firebaseArray, $mdDialog) {
  var userRef = new Firebase("https://homeworkmarket.firebaseio.com/users");
  var postRef = new Firebase("https://homeworkmarket.firebaseio.com/messages/posts");
  $scope.userAuth = Auth.$getAuth()
  $scope.userID = $scope.userAuth.uid
  $scope.userAssignment = $firebaseArray(userRef.child($scope.userID).child("posts"));
  $scope.imagePath = 'images/abdul_img.png';


  //the below code is useless.
  $scope.myAssignments
  $scope.userAssignment.$loaded().then(function(assignmentsRef){
    $scope.myAssignments = $scope.userAssignment
    //this needs to be changed to order data correctly.
    userRef.child($scope.userID).child("posts").orderByKey().on('child_added', function(snapshot) {
      var key = snapshot.key()  //get a snapshot of the post's key

    });
  })

  $scope.deletePost = function(postID, authorID) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your Job?')
          .textContent('If you delete your job you will not be able to see it again')
          .ariaLabel('Lucky day')
          .targetEvent(postID)
          .ok('Please do it!')
          .cancel('Aoh no');
    $mdDialog.show(confirm).then(function() {
      console.log("deleted")
      userRef.child(authorID).child("posts").child(postID).remove()
      postRef.child(postID).remove()
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };


}])

.filter('reverse', function() {
  return function(userAssignment) {
    return userAssignment.slice().reverse();
  };
})
