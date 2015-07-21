'use strict';

angular.module('yoGitViewerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Search',
        'link': '/search'
      }, {
        'title': 'User',
        'link': '/user/:user'
      },{
        'title': 'Repo',
        'link': '/repo/:repo'
      }
    ];

    $scope.user = 'scottnakada';
    $scope.repo = 'scottnakada';

    $scope.isCollapsed = true;

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
