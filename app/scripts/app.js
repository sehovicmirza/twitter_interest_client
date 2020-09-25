'use strict';

/**
 * @ngdoc overview
 * @name twitterInterestClientApp
 * @description
 * # twitterInterestClientApp
 *
 * Main module of the application.
 */
angular
  .module('twitterInterestClientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/timeline.html',
        controller: 'TimelineCtrl',
        controllerAs: 'timeline'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
