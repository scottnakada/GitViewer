'use strict';

angular.module('gitViewer')
    .factory('github', function ($http, $state) {

        /* Store the default user and repo */
        var gitUser = 'scottnakada';
        var gitRepo = 'ionDb';

        /* Get gitUser */
        var getGitUser = function () {
            return gitUser;
        };
        /* Set the gitUser */
        var setGitUser = function (user) {
            gitUser = user;
        };
        /* Get gitRepo */
        var getGitRepo = function () {
            return gitRepo;
        };
        /* Set gitRepo */
        var setGitRepo = function (repo) {
            gitRepo = repo;
        };

        /* Show the user screen */
        var showUser = function (user, repo) {
            console.log("github.showUser: user=" + user + ", repo=" + repo);
            gitUser = user;
            gitRepo = repo;
            $state.go('tab.user', {user: gitUser});
        };
        /* Show the repo screen */
        var showRepo = function (user, repo) {
            console.log("github.showRepo: user=" + user + ", repo=" + repo);
            gitUser = user;
            gitRepo = repo;
            $state.go('tab.repo', {user: gitUser, repo: gitRepo})
        };

        /* Define the functionality of the service */
        /* getUser info from Github */
        var getUser = function (username) {
            /* Call http.get to retrieve user info, and return the promise */
            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        /* Get the repository data */
        var getRepos = function (user) {
            /* Invoke $http.get to pull the repo data */
            return $http.get(user.repos_url)
                /* When the data is available, return data from the response */
                .then(function (response) {
                    return response.data;
                })
        };

        /* Get the gist data */
        var getGists = function (user) {
            /* Invoke $http.get to pull the gist data */
            return $http.get("https://api.github.com/users/" + user.login +
                "/gists")
                /* When the data is available, return data from the response */
                .then(function (response) {
                    return response.data;
                })
        };

        /* Get the followers data */
        var getFollowers = function (user) {
            /* Invoke $http.get to pull the followers data */
            return $http.get(user.followers_url)
                /* When the data is available, return data from the response */
                .then(function (response) {
                    return response.data;
                })
        };

        /* Get the following data */
        var getFollowing = function (user) {
            /* Invoke $http.get to pull the following data */
            return $http.get("https://api.github.com/users/" + user.login +
                "/following")
                /* When the data is available, return data from the response */
                .then(function (response) {
                    return response.data;
                })
        };

        /* Get the repo details from github */
        var getRepoDetails = function (username, reponame) {
            /* Store all of the repository data */
            var repo;
            /* Repo Url for username and reponame */
            var repoUrl = "https://api.github.com/repos/" + username + "/" +
                reponame;
            /* Return the repo data */
            return $http.get(repoUrl)
                /* Process the response from http.get on repoUrl */
                .then(function (response) {
                    /* Store the repoUrl data in repo */
                    repo = response.data;
                    /* Return the contributors data */
                    return $http.get(repoUrl + "/contributors");
                })
                /* Process the response from the collaborators http.get */
                .then(function (response) {
                    /* Store the collaborator data in repo */
                    repo.contributors = response.data;
                    /* Return the repo object with repo data and collaborator data */
                    return repo;
                });
        };


        /* Return the public API for the service */
        return {
            getGitUser: getGitUser,
            setGitUser: setGitUser,
            getGitRepo: getGitRepo,
            setGitRepo: setGitRepo,
            showUser: showUser,
            showRepo: showRepo,
            getUser: getUser,
            getRepos: getRepos,
            getGists: getGists,
            getFollowers: getFollowers,
            getFollowing: getFollowing,
            getRepoDetails: getRepoDetails
        }

    });
