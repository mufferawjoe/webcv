angular.module('bkApp', ['ngRoute','ngAnimate'])

.config(function($routeProvider,$locationProvider) {
  $routeProvider

    .when('/', {
      templateUrl : 'app/pages/landing.jade',
    })

    .when('/main', {
      templateUrl : 'app/pages/main.jade',
      controller  : 'mainCtrl'
    })

  $locationProvider.html5Mode(true);
})
