/* IIFE to isolate the scope of this function */
(function () {
    'use strict';

    angular.module('gitViewer')
        .controller('UserCtrl', function ($scope, github, $stateParams) {
            console.log("UserCtrl: " + $stateParams.user);
            /* onUserComplete - process user data from http request */
            var onUserComplete = function (data) {
                /* Pull user data from response and put into model as user */
                $scope.user = data;

                /* Read the user repository data */
                github.getRepos($scope.user)
                    .then(onRepos, onError);

                /* Read the user gist data */
                github.getGists($scope.user)
                    .then(onGists, onError);

                /* Read the user followers data */
                github.getFollowers($scope.user)
                    .then(onFollowers, onError);

                /* Read the user following data */
                github.getFollowing($scope.user)
                    .then(onFollowing, onError);

                $scope.error = "";
            };

            /* Process the data from the repos url */
            var onRepos = function (data) {
                /* Store the repo data in the repos array */
                $scope.repos = data;
                if ($scope.repos.length > 0) {
                    $scope.reposTableShow = true;
                } else {
                    $scope.reposTableShow = false;
                }
            };

            /* Process the data from the gists url */
            var onGists = function (data) {
                /* Store the gist data in the gists array */
                $scope.gists = data;
                if ($scope.gists.length > 0) {
                    $scope.gistsTableShow = true;
                } else {
                    $scope.gistsTableShow = false;
                }
            };

            /* Process the data from the followers url */
            var onFollowers = function (data) {
                /* Store the followers data in the followers array */
                $scope.followers = data;
                if ($scope.followers.length > 0) {
                    $scope.followersTableShow = true;
                } else {
                    $scope.followersTableShow = false;
                }
            };

            /* Process the data from the following url */
            var onFollowing = function (data) {
                /* Store the following data in the following array */
                $scope.following = data;
                if ($scope.following.length > 0) {
                    $scope.followingTableShow = true;
                } else {
                    $scope.followingTableShow = false;
                }
            };

            /* onError function handles any errors */
            /* reading data from the http service */
            var onError = function (reason) {
                /* Set an error message if there is an error */
                $scope.error = "Could not fetch the data!";
            };

            /* Get the username from the url */
            $scope.user = $stateParams.user;
            /* Default search order for the repo search */
            $scope.repoSortOrder = "-stargazers_count";

            /* Bring in the show user and repo functions from github service */
            $scope.showUser = github.showUser;
            $scope.showRepo = github.showRepo;

            /* Get the user info */
            github.getUser($scope.user)
                .then(onUserComplete, onError);

        });

}());
