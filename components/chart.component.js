angular.module('app')
    .component('chartComponent', {
        templateUrl: '../templates/chart.component.html',
        bindings: {
            product: '='
        },
        controllerAs: "vm",
        controller: function(d3Factory, $element) {
            var vm = this;
            vm.createChart = createChart;
            createChart(vm.product);

            function createChart(product) {
              d3Factory.d3().then(function(d3) {

                var color   = d3.scale.category10(),
                    data    = [10, 20, 30],
                    width   = 100,
                    height  = 100,
                    min     = Math.min(width, height),
                    svg     = d3.select('.chart-container').append('svg'),
                    pie     = d3.layout.pie().sort(null),
                    arc     = d3.svg.arc()
                                .outerRadius(min / 2 * 0.9)
                                .innerRadius(min / 2 * 0.5);

                svg.attr({width: '100%', height: '100%'})
                    .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
                    .attr('preserveAspectRatio','xMinYMin');

                var g = svg.append('g')
                    .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

                g.selectAll('path').data(pie(data))
                  .enter().append('path')
                    .style('stroke', 'white')
                    .attr('d', arc)
                    .attr('fill', function(d, i) { return color(i); });

              });
            }
        }
    });
