function lifeExpectancy() {
    // Y-axis(lifeExpectancy) vs X-axis(Births per Captia)

    // Set width and padding for svg
    const width = 600;
    const height = 500;
    const padding = 40;

    //Use d3.extent to get min and max for domain
    const yScale = d3.scaleLinear()
        .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
        .range([height - padding, padding]);

    
    const xScale = d3.scaleLinear()
        .domain(d3.extent(birthData2011, d =>  d.births / d.population))
        .range([padding, width - padding]);

    //make new axis passing in the xScale and yScale
    //use ticksize to make a grid(ticks stretch in direction of axis lable)
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-height + 2 * padding)
        .tickSizeOuter(0);
        

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-width + 2 * padding)
        .tickSizeOuter(0);

    const colorScale = d3.scaleLinear()
        .domain(d3.extent(birthData2011, d => d.population / d.area))
        .range(['lightgreen', 'black']);

    const radiusScale = d3.scaleLinear()
        .domain(d3.extent(birthData2011, d => d.births))
        .range([2, 40]);

    // Select the svg with id of life-expectancy
    d3.select("#life-expectancy")
        .attr("width", width )
        .attr("height", height)
        .style("background-color", "#c4c3dc")
    .selectAll("circle")
    .data(birthData2011)
    .enter()
    .append("circle")
        .attr("cx", d =>  xScale(d.births / d.population))
        .attr("cy", d => yScale(d.lifeExpectancy))
        .attr("fill", d=> colorScale(d.population / d.area))
        .attr("r", d => radiusScale(d.births));

    // Add the x-axis and y-axis to the svg
    d3.select("svg")
        .append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis);

    d3.select("svg")
        .append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

    // Add x-axis label
    d3.select("svg")
        .append("text")
            .attr("x", width / 2)
            .attr("y", height - padding)
            .attr("dy", "1.5em")
            .style("text-anchor", "middle")
            .text("Births per Capita");

    // Add the y-axis label
    d3.select("svg")
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", - height / 2 )
            .attr("y",  padding)
            .attr("dy", "-1.1em")
            .style("text-anchor", "middle")
            .text("Life Expectancy");

    // Add title
    d3.select("svg")
        .append("text")
            .attr("x", width / 2)
            .attr("y", 0)
            .attr("dy", "1.5em")
            .style("text-anchor", "middle")
            .style("font-size", "1.5em")
            .text("Births by Country in 2011");
}

// Cellular Subscription vs. Literacy Rate -- Scatter Plot
function plotLiteracyGraph() {
    const width = 600;
    const height = 500;
    const padding = 40;

    // remove data entries with values = null
    function objHasKeys(obj) {
        let keys = [
            "subscribersPer100",
            "adultLiteracyRate",
            "medianAge",
            "urbanPopulationRate"
        ]
        for(let i = 0; i < keys.length; i++) {
            if(obj[keys[i]] === null) return false;
        }
        return true;

    }

    const parsedData = regionData.filter(d => objHasKeys(d));    
    
     //Use d3.extent to get min and max for domain
    const yScale = d3.scaleLinear()
        .domain(d3.extent(parsedData, d => d.subscribersPer100))
        .range([height - padding, padding]);

    
    const xScale = d3.scaleLinear()
        .domain(d3.extent(parsedData, d =>  d.adultLiteracyRate))
        .range([padding, width - padding]);
    
    //make new axis passing in the xScale and yScale
    //use ticksize to make a grid(ticks stretch in direction of axis lable)
    const xAxis = d3.axisBottom(xScale)
        .tickSize(-height + 2 * padding)
        .tickSizeOuter(0);        

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-width + 2 * padding)
        .tickSizeOuter(0);

    const colorScale = d3.scaleLinear()
        .domain(d3.extent(parsedData, d => d.urbanPopulationRate))
        .range(['lightgreen', 'red']);


    const radiusScale = d3.scaleLinear()
        .domain(d3.extent(parsedData, d => d.medianAge))
        .range([5, 30]);

    // Select the svg with id of literacy
    const svg = d3.select("#literacy")
        .attr("width", width )
        .attr("height", height)
        .style("background-color", "#c4c3dc")

    svg        
        .selectAll("circle")
        .data(parsedData)
        .enter()
        .append("circle")
            .attr("cx", d =>  xScale(d.adultLiteracyRate))
            .attr("cy", d => yScale(d.subscribersPer100))
            .attr("fill", d=> colorScale(d.urbanPopulationRate ))           
            .attr("r", d => radiusScale(d.medianAge));

    // Add the x-axis and y-axis to the svg
    svg
        .append("g")
            .attr("transform", `translate(0, ${height - padding})`)
            .call(xAxis);

    svg
        .append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

    // Add x-axis label
    svg
        .append("text")
            .attr("x", width / 2)
            .attr("y", height - padding)
            .attr("dy", "1.5em")
            .style("text-anchor", "middle")
            .text("Literacy Rate, Aged 15 Up");

    // Add the y-axis label
    svg
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", - height / 2 )
            .attr("y",  padding)
            .attr("dy", "-1.1em")
            .style("text-anchor", "middle")
            .text("Cellular Subscriptions per 100 People");

    // Add title
    svg
        .append("text")
            .attr("x", width / 2)
            .attr("y", 0)
            .attr("dy", "1.5em")
            .style("text-anchor", "middle")
            .style("font-size", "1.5em")
            .text("Cellular Subscriptions vs. Literacy Rate");

}
lifeExpectancy();
plotLiteracyGraph();



        

