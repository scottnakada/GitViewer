'use strict';

angular.module('yoGitViewerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('repo', {
        url: '/repo/:user/:repo',
        templateUrl: 'app/repo/repo.html',
        controller: 'RepoCtrl'
      });
  });
