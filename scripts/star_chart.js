import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

var width = document.body.clientWidth;
var height = document.body.clientHeight;
var cx = width / 2;
var cy = height / 2;

const radius = d3.scaleLinear([7, -2], [0, 2]);

const data = await d3.csv("/data/stars.csv", function(d) {
    if(d.dec >= 0 && d.proper != "Sol" && d.mag <= 7){
        d3.autoType(d);
        d[0] = d.ra * 15; // longitude
        d[1] = d.dec; // latitude
        return {lon: d[0], lat: d[1], name: d.proper, mag: d.mag, ra: d.ra, dec: d.dec, greek_letter: d.bayer, constellation: d.con, variable: d.var_min};
    }
});

console.log(data);

const star_chart = document.getElementById("star-chart");
const outline = d3.geoCircle().radius(90).center([0, 90])();
const graticule = d3.geoGraticule()
    .stepMinor([30, 10])
    .extent([[-180, -90],[180, 90]])();

const projection = d3.geoStereographic()
    .reflectY(false)
    .scale((width) * 0.2)
    .clipExtent([[0, 0], [width, height]])
    .rotate([0, -90])
    .translate([cx, cy])
    .precision(.001);

const path = d3.geoPath(projection);

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

svg.append("path")
      .attr("d", path(graticule))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-opacity", .5)
      .attr("stroke-width", .5);

svg.append("path")
      .attr("d", path(outline))
      .attr("fill", "none")
      .attr("stroke", "black");

// minute ticks
  svg.append("g")
      .attr("stroke", "black")
    .selectAll()
    .data(d3.range(0, 1440, 5)) // every x minutes
    .join("line")
      .datum(d => [
        projection([d / 4, 0]),
        projection([d / 4, d % 60 ? -1 : -2])
      ])
      .attr("x1", ([[x1]]) => x1)
      .attr("x2", ([, [x2]]) => x2)
      .attr("y1", ([[, y1]]) => y1)
      .attr("y2", ([, [, y2]]) => y2);

// hourly ticks and labels
  svg.append("g")
    .selectAll()
    .data(d3.range(0, 1440, 60)) // every hour
    .join("text")
      .attr("dy", ".35em")
      .text(d => `${d / 60}`)
      .attr("font-size", d => d % 360 ? 20 : 24)
      .attr("font-weight", d => d % 360 ? null : "bold")
      .datum(d => projection([d / 4, -5]))
      .attr("x", ([x]) => x-7)
      .attr("y", ([, y]) => y-2)
      .attr("text-align", "center");

// 10° labels
  svg.append("g")
    .selectAll()
    .data(d3.range(10, 90, 20))
    .join("text")
      .attr("dy", ".35em")
      .text(d => `${d}°`)
      .datum(d => projection([0, d]))
      .attr("x", ([x]) => x+4)
      .attr("y", ([, y]) => y);

svg.append("g")
    .attr("stroke", "black")
    .selectAll()
    .data(data, function(d) {return 1 ? d.mag > 3 : null})
    .join("circle")
    .attr("r", d => radius(d.mag))
    .attr("transform", d => `translate(${projection([d.lon, d.lat])})`);

star_chart.append(svg.node());