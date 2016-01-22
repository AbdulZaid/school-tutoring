myApp.controller('SignupCtrl', ['$scope','Auth','$location','$firebaseAuth', function ($scope, Auth, $location, $firebaseAuth) {
		var ref = new Firebase("https://homeworkmarket.firebaseio.com");
		var isNewUser = true
		$scope.authObj = $firebaseAuth(ref);

		// assign values for ng-repeat and ng-model for the html selector options
		$scope.userTypes = [{
			value: 'user_1',
		   	label: 'Student'
		  }, {
		    value: 'user_2',
		    label: 'Tutor'
		}],

		$scope.create = function() {

			$scope.authObj.$createUser({
			  "handle": $scope.handle,	
			  "email": $scope.email,
			  "password": $scope.password,
			  "type": $scope.userLists.label
			}).then(function(userData) {
			  console.log("User " + userData.uid + " created successfully!");

			  return $scope.authObj.$authWithPassword({
					    email: $scope.email,
					    password: $scope.password
			  		});
			  
			}).then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			}).catch(function(error) {
			  console.error("Error: ", error);
			});

			ref.onAuth(function(authData) {
			    if (authData && isNewUser) {
				    // save the user's profile into the database so we can list users,
				    // use them in Security and Firebase Rules, and show profiles
				    ref.child("users").child(authData.uid).set({
				      provider: authData.provider,
				      name: getName(authData),
				      handle: $scope.handle,
				      type: $scope.userLists.label //from the ng-model and ng-repeat in html file.
				    });
			    }
			})
	    }

		// find a suitable name based on the meta info given by each provider
		function getName(authData) {
		  switch(authData.provider) {
		     case 'password':
		       return authData.password.email.replace(/@.*/, '');
		     case 'twitter':
		       return authData.twitter.displayName;
		     case 'facebook':
		       return authData.facebook.displayName;
		  }
		}
}]);