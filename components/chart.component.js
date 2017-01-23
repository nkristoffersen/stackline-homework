angular.module('app')
    .component('chartComponent', {
        templateUrl: '../templates/chart.component.html',
        bindings: {
            product: '<'
        },
        controllerAs: "vm",
        controller: function(d3Factory, $element, $scope) {
            var vm = this;
            vm.createChart = createChart;
            vm.$onChanges = function (changesObj) {
                if (changesObj.product && vm.product) {
                    createChart(vm.product);
                }
            };

            function createChart(product) {
              d3Factory.d3().then(function(d3) {

                var data = [];
                for (var i = 0; i < product.sales.length; i++) {
                    data.push({
                        "sale": product.sales[i]["retailSales"],
                        "week": product.sales[i].weekEnding
                    });
                }

                var color   = d3.scale.category10(),
                    width   = 100,
                    height  = 100,
                    min     = Math.min(width, height),
                    svg     = d3.select('.chart-container').append('svg'),
                    xScale  = d3.time.scale().domain();

                svg.attr({width: '100%', height: '100%'})
                    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
                    .attr('preserveAspectRatio','xMinYMin');

                var g = svg.append('g')
                    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

                g.selectAll('path').data(data)
                  .enter().append('path')
                    .style('stroke', 'white')
                    .attr('fill', function(d, i) { return color(i); });

              });
            }
        }
    });
