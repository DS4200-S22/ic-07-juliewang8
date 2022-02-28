

d3.csv("data/scatter.csv").then((data) => {

  // Set dimensions and margins for plots 
  const width1 = 900; 
  const height1 = 450; 
  const margin1 = {left:50, right:50, bottom:50, top:50}; 
  // const yTooltipOffset1 = 15; 


    const svg1 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width1-margin.left-margin.right)
  .attr("height", height1 - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width1,  height1]);

  // Finding the max score
  let maxY1 = d3.max(data, function(d) { return d.score; });
  let maxX1 = d3.max(data, function(d) { return d.day; });

  // Define scale functions to map our data to for the y axis (domain, range)
  let yScale1 = d3.scaleLinear()
              .domain([0,maxY1])
              .range([height1-margin1.bottom,margin1.top]); 

  // Define scale functions to map our data to for the y axis (domain, range)
  let xScale1 = d3.scaleLinear()
              .domain([0, maxX1])
              .range([margin1.left, width1 - margin1.right]);
              // .padding(0.1); 

    // Adds the y axis to the svg
    svg1.append("g")
    .attr("transform", `translate(${margin1.left}, 0)`) 
    .call(d3.axisLeft(yScale1)) 
    .attr("font-size", '20px'); 

    // Adds the x axis to the svg
    svg1.append("g")
    .attr("transform", `translate(0,${height1 - margin1.bottom})`) 
    .call(d3.axisBottom(xScale1))  
    .attr("font-size", '20px'); 

    const tooltip1 = d3.select("#hard-coded-bar") 
    .append("div") 
    .attr('id', "tooltip1") 
    .style("opacity", 0) 
    .attr("class", "tooltip"); 

  // sets the functionality for mousing over the tooltip
  const mouseover1 = function(event, d) {
  tooltip1.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
  .style("opacity", 1);  
  }

  // sets the functionality for moving the mouse in the tooltip
  const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
  .style("top", (event.pageY + yTooltipOffset) +"px"); 
  }

  // sets the functionality for the mouse leaving the div
  const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
  }


  svg1.selectAll(".bar") 
   .data(data) 
   .enter()  
   .append("circle") 
     .attr("class", "bar") 
     .attr("cx", (d,i) => xScale1(d.day)) 
     .attr("cy", (d) => yScale1(d.score)) 
     .attr('r','10px')
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);
})


