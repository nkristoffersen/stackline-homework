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
                var curDate = new Date();
                for (var i = 0; i < product.sales.length; i++) {
                  var weekDate = new Date(product.sales[i].weekEnding);
                    if (weekDate.getYear() == curDate.getYear() - 1){
                          data.push({
                              "sale": product.sales[i]["retailSales"],
                              "week": product.sales[i].weekEnding
                          });
                        }
                }

                console.log(data);

                var svg = d3.select(".chart-container").append("svg");
                var margin = {top: 20, right: 0, bottom: 30, left: 0};
                var height = 400;
                svg.attr("width", "100%");
                svg.attr("height", height + margin.top + margin.bottom + 30);

                var width = svg.node().getBoundingClientRect().width - 40;


                var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                var x = d3.scaleTime()
                    .rangeRound([0, width]);

                var y = d3.scaleLinear()
                    .rangeRound([height, 0]);

                var lineCur = d3.line()
                    .x(function(d) { return x(d.week); })
                    .y(function(d) { return y(d.sale); })
                    .curve(d3.curveCardinal);

                var linePast = d3.line()
                    .x(function(d) { return x(d.week); })
                    .y(function(d) { return y(d.sale - (Math.random() * 100000)); })
                    .curve(d3.curveCardinal);

                /*
                If you want to show the whole year, though I prefer the small dataset like I have
                it.
                */
                //var startX = new Date(curDate.getFullYear() - 1 + "-01-01");
                //var endX = new Date(curDate.getFullYear() - 1 + "-12-31");
                //x.domain([startX, endX]);

                x.domain(d3.extent(data, function(d) {return new Date(d.week); }));
                y.domain([0, d3.extent(data, function(d) { return d.sale; })[1]]);

                g.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .attr("class", "xAxis")
                    .select(".domain")
                    .remove();

                g.select(".xAxis")
                    .selectAll("text")
                    .style("font-size", "1.3rem");

                g.append("g")
                    .call(d3.axisLeft(y))
                    .attr("class", "yAxis");

                g.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "rgb(65, 166, 246)")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", lineCur);

                g.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "rgb(160, 160, 160)")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", linePast);

              });
            }
        }
    });
