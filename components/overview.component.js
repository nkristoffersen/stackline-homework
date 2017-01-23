angular.module('app')
    .component('overviewComponent', {
        templateUrl: '../templates/overview.component.html',
        bindings: {
            product: '='
        },
        controllerAs: "vm",
        controller: function() {
            var vm = this;
        }
    });
