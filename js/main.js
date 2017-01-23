(() => {
    var app = angular.module('app', []);

    app.controller("MainCtrl", function($scope, $http) {
        $http.get("data/data.json").then(
            function(response) {
                $scope.product = response.data[0];
                $scope.product.sales.forEach(function(week) {
                    week.weekEnding = Date.parse(week.weekEnding);
                });
            }
        )
    });
})();
