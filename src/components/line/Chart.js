import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'
import * as moment from 'moment'

const Chart = props => {
  const { data } = props
  const ref = useRef(null)

  useEffect(() => {
    if(data && ref.current) {
      drawChart(data)
    }
  }, [data])

  const getDate = date => {
    console.log('date', date)
    return moment(date).format('MMM YY')
  }

  const drawChart = data => {

    var margin = {top: 20, right: 50, bottom: 30, left: 50},
      width = 1400 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the area
    var area = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.value); });

    // define the line
    var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    var svg = d3.select(ref.current)

    svg.selectAll('*').remove()

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    var container = svg.append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


    // scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // add the area
    container.append("path")
      .data([data])
        .attr("class", "area")
        .attr("d", area);

    // add the valueline path.
    container.append("path")
      .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // add the X Axis
    container.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat((d) => getDate(d)))


    // add the Y Axis
    container.append("g")
      .call(d3.axisLeft(y));

      svg.selectAll("dot")
       .data(data)
     .enter().append("circle")
       .attr("r", 5)
       .attr("cx", function(d) { return x(d.date); })
       .attr("cy", function(d) { return y(d.value); })
       .on("mouseover", function(d) {
         // div.transition()
         //   .duration(200)
         //   .style("opacity", .9);
         // div.html(formatTime(d.date) + "<br/>" + d.value)
         //   .style("left", "10px")
         //   .style("top",  "10px");
         })
       .on("mouseout", function(d) {
         div.transition()
           .duration(500)
           .style("opacity", 0);
         });

    return() => {
      svg.exit()
        .remove()
    }

  }

  return (
    <div style={{width:'100vw', height: '500px'}}>
    <svg ref={ref}>

    </svg>
    </div>
  )
}

export default Chart
