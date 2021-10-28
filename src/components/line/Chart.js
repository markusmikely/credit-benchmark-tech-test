import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import * as d3 from 'd3'
import * as moment from 'moment'

const LineChart = styled.div`
  width: 100vw;
  height: 500px;
  position: relative;
  /* .area {
    fill: red
  } */
  .line {
    stroke: #545454;
    fill: none;
    stroke-width: 2px;
  }
  .dot {
    fill: #545454;
  }
  .tooltip {
    background: white;
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
    position: absolute;
    text-align: center;
    h4, p {
      margin: 0;
      font-size: 15px;
      line-height: 1.4;
    }
    h4 {
      margin-bottom: 5px;
      font-weight: normal;
    }

  }
`


const Chart = props => {
  const { data } = props
  const svgRef = useRef(null)
  const divRef = useRef(null)

  useEffect(() => {
    if(data && svgRef.current) {
      drawChart(data)
    }
  }, [data])

  const getDate = date => {
    return moment(date).format('MMM YY')
  }

  const drawChart = data => {

    var margin = {top: 20, right: 200, bottom: 30, left: 200},
      width = 1400 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0])

    // define the area
    var area = d3.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.value); });

    // define the line
    var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });

    var div = d3.select(divRef.current)
      .attr("class", "tooltip")
      .style("opacity", 0);

    var svg = d3.select(svgRef.current)

    svg.selectAll('*').remove()

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    var container = svg.append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    // scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, 100]);

    // Define gradient
    var defs = container.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    defs.append("stop")
      .attr("offset", "33%")
      .attr("style", "stop-color:rgb(223 248 232);stop-opacity:.5");

    defs.append("stop")
      .attr("offset", "66%")
      .attr("style", "stop-color:rgb(217 233 253);stop-opacity:.5");

    defs.append("stop")
      .attr("offset", "100%")
      .attr("style", "stop-color:rgb(253 221 239);stop-opacity:.5");

    // add the area
    container.append("path")
      .data([data])
        .attr("class", "area")
        .attr("fill", "url(#gradient)")
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

    // add the dots with tooltips
    container.selectAll("dot")
      .data(data)
     .enter().append("circle")
       .attr("r", 5)
       .attr("class", "dot")
       .attr("cx", function(d) { return x(d.date); })
       .attr("cy", function(d) { return y(d.value); })
       .on("mouseover", function(event, d) {
         div.transition()
           .duration(200)
           .style("opacity", .9);
         div.html("<h4>Date: <b>"+getDate(d.date) + "</b></h4><p>Value: <b>" + d.value + "</b></p>")
           .style("left", (event.pageX - 85) + "px")
           .style("top", (event.pageY - 180) + "px");
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
    <LineChart>
      <svg ref={svgRef} />
      <div ref={divRef} />
    </LineChart>
  )
}

export default Chart
