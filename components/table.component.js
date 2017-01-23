angular.module('app')
    .component('tableComponent', {
        templateUrl: '../templates/table.component.html',
        bindings: {
            product: '='
        },
        controllerAs: "vm",
        controller: function() {
            var vm = this;
        }
    });
