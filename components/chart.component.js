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
                var date = new Date();
                for (var i = 0; i < product.sales.length; i++) {
                  var weekDate = new Date(product.sales[i].weekEnding);
                    if (weekDate.getYear() == date.getYear() - 1){
                          data.push({
                              "sale": product.sales[i]["retailSales"],
                              "week": product.sales[i].weekEnding
                          });
                        }
                }

                var svg = d3.select(".chart-container").append("svg");
                var margin = {top: 20, right: 20, bottom: 30, left: 50};
                var width = 600;
                var height = 600;

                svg.attr("width", "100%");
                svg.attr("height", 1000);

                var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                var x = d3.scaleTime()
                    .rangeRound([0, width]);

                var y = d3.scaleLinear()
                    .rangeRound([height, 0]);

                var line = d3.line()
                    .x(function(d) { return x(d.week); })
                    .y(function(d) { return y(d.sale); });

                x.domain(d3.extent(data, function(d) { return new Date(d.week); }));
                y.domain(d3.extent(data, function(d) { return d.sale; }));

                g.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                  .select(".domain")
                    .remove();

                g.append("g")
                    .call(d3.axisLeft(y))
                  .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Price ($)");

                g.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);

              });
            }
        }
    });
