var parseDate = d3.timeParse("%d-%b-%y");

var data = [
  {
    category: "Weed Eucalyptus in chepterit",
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
  {
    category: "Testing",
    from: "1-Mar-17",
    to: "30-May-17",
    progress: 90,
  },
  {
    category: "Admin Lte",
    from: "1-May-17",
    to: "20-Jul-17",
    progress: 90,
  },
  {
    category: "Admin Lte",
    from: "1-May-17",
    to: "20-Jul-17",
    progress: 90,
  },
];
let color = ["gray", "white"];
var margin = {top: 50, right: 0, bottom: 50, left: 100},
  width = 900 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;
h = data.length * 30 + 50;
barH = 30;

// Randomize colors
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

// x - axes
var x = d3.scaleTime().range([40, width]);
x.domain([
  d3.min(data, function (d) {
    return d.from;
  }),
  d3.max(data, function (d) {
    return d.to;
  }),
]);

// y-axes
let y = d3
  .scaleBand()
  .domain(data.map((task) => task.category))
  .range([0, h]);
// x-axes ticks
let xAxis = d3
  .axisBottom(x)
  .tickFormat(d3.timeFormat("%b-%d"))
  .tickSize(3)
  .ticks(d3.timeWeek.every(2));

var yAxis = d3.axisLeft(y).ticks(data.length).tickSize(0);
// initialize svg
var svg = d3
  .select("#gantt")
  .append("svg")
  .attr("class", "gantt")
  .attr("width", width + margin.left + margin.right)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .append("g")
  .attr("class", "axis1")

  .attr("transform", "translate(0,-35)")
  .call(xAxis);

let rect = svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("g")
  .append("rect")
  .attr("width", width + 100)
  .attr("height", 30)
  .attr("x", -100)
  .attr("y", function (d, i) {
    return i * 30;
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
    return i * 30;
  })
  .attr("width", function (d) {
    return x(d.to) - x(d.from);
  })
  .attr("height", 20)
  .attr("fill", "red")
  .attr("class", "rect")
  .attr("rx", 15)
  .attr("ry", 15)
  .attr("fill", function (d) {
    return getRandomColor();
  })
  .attr("transform", "translate(0,5)");

svg.append("g").selectAll("rect");

svg
  .append("rect")
  .attr("x", -100)
  .attr("y", 0)
  .attr("width", 140)
  .attr("height", h - 52)
  .attr("stroke", "black")
  .attr("stroke-width", 0.1)
  .attr("fill", "transparent");

let tasks = svg
  .append("g")
  .append("rect")
  .attr("x", -100)
  .attr("y", -35)
  .attr("width", 140)
  .attr("height", 35)
  .attr("stroke", "black")
  .attr("stroke-width", 0.1)
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
  .attr("x", 40)
  .attr("y", -35)
  .attr("width", width - 40)
  .attr("height", 35)
  .attr("stroke", "black")
  .attr("stroke-width", 0.1)
  .attr("fill", "transparent");

var line = svg
  .append("g")
  .selectAll("text.value")
  .data(data)
  .enter()
  .append("text")
  .attr("x", -100)
  .attr("y", function (d, i) {
    return i * 30;
  })
  .text(function (d) {
    return d.category;
  })
  .style("fill", "rgb(32, 32, 32)")
  .style("font-size", "11px")
  .attr("transform", "translate(5,20)");

// line
svg
  .append("line")
  .style("stroke", "red")
  .style("stroke-width", 3)
  .attr("x1", 200)
  .attr("y1", 0)
  .attr("x2", 200)
  .attr("y2", 200);
