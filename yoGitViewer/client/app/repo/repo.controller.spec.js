'use strict';

describe('Controller: RepoCtrl', function () {

  // load the controller's module
  beforeEach(module('yoGitViewerApp'));

  var RepoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RepoCtrl = $controller('RepoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
