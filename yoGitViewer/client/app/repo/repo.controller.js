/* IIFE to isolate the scope of this function */
(function () {

  'use strict';

  angular.module('yoGitViewerApp')
    .controller('RepoCtrl', function ($scope, github, $stateParams) {

      /* Read the username and reponame from route parameters */
      var user = $stateParams.user;
      var repo = $stateParams.repo;

      /* Process data on getRepoDetails complete */
      var onRepo = function (data) {
        $scope.repo = data;
        if ($scope.repo.contributors.length > 0) {
          $scope.contributorsTableShow = true;
        } else {
          $scope.contributorsTableShow = false;
        }
      };

      /* Process error messages on getRepoDetails errors */
      var onError = function (reason) {
        $scope.error = reason;
      };

      /* Read the repo details from github */
      github.getRepoDetails(user, repo)
        .then(onRepo, onError);

    });

}());
