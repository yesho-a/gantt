var parseDate = d3.timeParse("%d-%b-%y");

d3.json("data.json", function (data) {
  let color = ["gray", "white"];
  var margin = {top: 50, right: 0, bottom: 50, left: 100};
  var width = 900 - margin.left - margin.right;
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

  // Create the tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 100);

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
    .attr("transform", "translate(0,5)")
    .on("mouseover", function (event, d) {
      console.log(d);
      tooltip.transition().duration(200).style("opacity", 0.7);
      tooltip
        .html(
          "<b>Task:</b> " +
            d.name +
            "<br>" +
            "<b>From: </b>" +
            d.from.toDateString() +
            "<br>" +
            "<b>To: </b>" +
            d.to.toDateString(),
        )
        .style("left", event.pageX + 3 + "px")
        .style("top", event.pageY + 10 + "px");
    })
    .on("mouseout", function (d) {
      //d3.select(this).classed("selected", false);
      tooltip.transition().duration(400).style("opacity", 0);
    });

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

  let date = "1-May-17";
  date = parseDate(date);
  let today = x(date);
  svg
    .append("line")
    .style("stroke", "red")
    .style("stroke-width", 2)
    .style("stroke-dasharray", "3, 3")
    .attr("x1", today)
    .attr("y1", -35)
    .attr("x2", today)
    .attr("y2", h);
});
