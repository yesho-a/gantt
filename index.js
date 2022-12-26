var data = [
  {date: "01/01/2016", pizzas: 10000},
  {date: "01/02/2016", pizzas: 20000},
  {date: "01/03/2016", pizzas: 40000},
  {date: "01/04/2016", pizzas: 30000},
  {date: "01/05/2016", pizzas: 30000},
  {date: "01/06/2016", pizzas: 50000},
  {date: "01/07/2016", pizzas: 30000},
  {date: "01/08/2016", pizzas: 50000},
  {date: "01/09/2016", pizzas: 60000},
  {date: "01/10/2016", pizzas: 20000},
  {date: "01/11/2016", pizzas: 10000},
  {date: "01/12/2016", pizzas: 90000},
];
// Calculate Margins and canvas dimensions
var margin = {top: 40, right: 40, bottom: 40, left: 60},
  width = 700 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

//Parsers and Formaters
var parseTime = d3.timeParse("%d/%m/%Y");
var formatTime = d3.timeFormat("%a/%b/%Y");
// Scales
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var svg = d3
  .select("body")
  .append("svg")
  .style("background-color", "#888")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//Arguments for axes : Ranges for X, y
x.domain(
  d3.extent(data, function (d) {
    return parseTime(d.date);
  }),
);
y.domain(
  d3.extent(data, function (d) {
    return d.pizzas / 1000;
  }),
);
// Axes
svg
  .append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
svg.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y));
// Labels
svg
  .append("text")
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .attr(
    "transform",
    "translate(" + (margin.left - 94) + "," + height / 2 + ")rotate(-90)",
  )
  .text("Pizzas ( Thousands ) ");

svg
  .append("text")
  .style("font-size", "14px")
  .attr("text-anchor", "middle")
  .attr(
    "transform",
    "translate(" + width / 2 + "," + (height - (margin.bottom - 74)) + ")",
  )
  .text("Date");
//  Chart Title
svg
  .append("text")
  .attr("x", width / 2)
  .attr("y", 20 - margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Pizza consumption");
