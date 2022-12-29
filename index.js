var parseDate = d3.timeParse("%d-%b-%y");

var data = [
  {
    category: "Weed Eucalyptus",
    from: "1-Jan-17",
    to: "15-Jan-17",
    progress: 100,
  },
  {
    category: "Check on Banana",
    from: "13-Jan-17",
    to: "1-Feb-17",
    progress: 60,
  },
  {
    category: "Contact Sande",
    from: "1-Feb-17",
    to: "15-Feb-17",
    progress: 70,
  },
  {
    category: "Meet Ivan",
    from: "10-Feb-17",
    to: "1-Mar-17",
    progress: 10,
  },
  {
    category: "Elephant grass",
    from: "1-Mar-17",
    to: "30-Apr-17",
    progress: 90,
  },
];
let color = ["gray", "white"];
var margin = {top: 50, right: 0, bottom: 50, left: 100},
  width = 900 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;
h = height - 50;

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
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
  .range([0, h - margin.bottom]);

let xAxis = d3
  .axisBottom(x)
  .tickFormat(d3.timeFormat("%b-%d"))
  .tickSize(3)
  .tickPadding(10)
  .tickSizeInner([3]);

var yAxis = d3.axisLeft(y).ticks(data.length).tickSize(0).tickPadding(10);

var svg = d3
  .select("#gantt")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .append("g")
  .attr("class", "axis1")
  .attr("transform", "translate(0,250)")
  .call(xAxis);

svg.append("g").attr("class", "axis2").call(yAxis);

let rect = svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("g")
  .append("rect")
  .attr("width", width)
  .attr("height", 50)
  .attr("x", 0)
  .attr("y", function (d, i) {
    return i * 50;
  })
  .attr("fill", function (d, i) {
    if (i % 2 == 0) {
      return "#ffffff ";
    } else {
      return "#f5f5f5";
    }
  })
  .attr("stroke", "black")
  .attr("stroke-width", 0.2);

var rectangle = svg
  .append("g")
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x(d.from);
  })
  .attr("y", function (d, i) {
    return i * 50;
  })
  .attr("width", function (d) {
    return x(d.to) - x(d.from);
  })
  .attr("height", 30)
  .attr("fill", "red")
  .attr("class", "rect")
  .attr("rx", 15)
  .attr("ry", 15)
  .attr("fill", function (d) {
    return getRandomColor();
  })
  .attr("transform", "translate(0,10)");

svg.append("g").selectAll("rect");

svg
  .append("rect")
  .attr("x", -100)
  .attr("y", 0)
  .attr("width", 100)
  .attr("height", h - 50)
  .attr("stroke", "black")
  .attr("stroke-width", 0.2)
  .attr("fill", "transparent");

let tasks = svg
  .append("g")
  .append("rect")
  .attr("x", -100)
  .attr("y", -35)
  .attr("width", 100)
  .attr("height", 35)
  .attr("stroke", "black")
  .attr("stroke-width", 0.2)
  .attr("fill", "transparent");

svg
  .append("text")
  .attr("class", "tasks")
  .text("Tasks")
  .attr("x", -80)
  .attr("y", -15);

svg
  .append("g")
  .append("rect")
  .attr("x", 0)
  .attr("y", -35)
  .attr("width", width)
  .attr("height", 35)
  .attr("stroke", "black")
  .attr("stroke-width", 0.2)
  .attr("fill", "transparent");

svg
  .append("text")
  .attr("class", "tasks")
  .text("Simple Gantt Chart")
  .attr("x", width / 2 - 100)
  .attr("y", -15);
