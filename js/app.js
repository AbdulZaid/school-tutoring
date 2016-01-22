// Main MODULE... ui.bootstrap is for dropdown menus of bootstrap etc.. router is for states
var myApp = angular.module('myApp', ['ngRoute', 'firebase','ui.bootstrap','ngAnimate','ui.router','ngMaterial','ngAria','ngMessages']);


//CONFIGURATION using Ui.router instead of ngRoute
myApp.config(function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /state1
	// $urlRouterProvider.otherwise('home' )
	// Now set up the states
	$stateProvider
		.state('main', {
	    	url: "/home",
	    	controller: 'mainController',
	    	templateUrl: "views/main.html",
	        data: {
	            requireLogin: true
	        }
	    })
	    .state('signup', {
	    	url: "/signup",
	    	controller: 'SignupCtrl',
	    	templateUrl: "views/signup.html"

	    })
	    .state('login', {
	    	url: "/login",
	    	controller: 'LoginCtrl',
	    	templateUrl: "views/login.html"
	    })
	    .state('editProfile', {
	    	url: "/editProfile",
	    	controller: 'ProfileCtrl',
	    	templateUrl: "views/profile.html"
	    })
})

//FACTORY
myApp.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
	var ref = new Firebase("https://homeworkmarket.firebaseio.com");
	return  $firebaseAuth(ref);
}])

