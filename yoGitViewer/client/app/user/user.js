'use strict';

angular.module('yoGitViewerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/:user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });
