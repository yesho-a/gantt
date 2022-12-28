var parseDate = d3.timeParse("%d-%b-%y");

var data = [
  {
    category: "Weed Eucalyptus",
    from: "1-Jan-17",
    to: "15-Jan-17",
    progress: 100,
  },
  {category: "Task 2", from: "13-Jan-17", to: "1-Feb-17", progress: 60},
  {category: "Task 3", from: "1-Feb-17", to: "15-Feb-17", progress: 70},
  {category: "Task 4", from: "10-Feb-17", to: "1-Mar-17", progress: 10},
  {category: "Task 5", from: "1-Mar-17", to: "30-Mar-17", progress: 90},
];

var margin = {top: 50, right: 50, bottom: 50, left: 100},
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
h = height - 50;
var svg = d3
  .select("#gantt")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

data.forEach(function (d) {
  d.from = parseDate(d.from);
  d.to = parseDate(d.to);
});
var x = d3.scaleTime().range([0, width]);
x.domain([
  d3.min(data, function (d) {
    return d.from;
  }),
  d3.max(data, function (d) {
    return d.to;
  }),
]);

let y = d3
  .scaleBand()
  .domain(data.map((task) => task.category))
  .range([0, height - margin.bottom]);

let xAxis = d3
  .axisBottom(x)
  .tickFormat(d3.timeFormat("%b-%d"))
  .tickSize(0)
  .tickPadding(15);
var yAxis = d3.axisLeft(y).ticks(data.length).tickSize(0).tickPadding(20);
let color = d3.scaleLinear().domain([0, data]).range(["red", "blue"]);

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
svg
  .append("g")
  .attr("class", "axis1")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);
svg.append("g").attr("class", "axis2").call(yAxis);

let bars = svg
  .append("g")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("y", function (d) {
    return y(d.category);
  })
  .attr("height", height / data.length - 40)
  .attr("x", function (d) {
    return x(d.from);
  })
  .attr("width", function (d) {
    return x(d.to) - x(d.from);
  })
  .attr("fill", function (d) {
    return getRandomColor();
  });

bars.attr("transform", "translate(0,20)");
