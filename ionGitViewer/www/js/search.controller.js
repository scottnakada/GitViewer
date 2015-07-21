'use strict';

angular.module('gitViewer')
    .controller('SearchCtrl', function ($scope, github) {
        console.log("SearchCtrl");
        $scope.user = github.getGitUser();
        $scope.repo = github.getGitRepo();
        $scope.showUser = github.showUser;
        $scope.showRepo = github.showRepo;
    });
