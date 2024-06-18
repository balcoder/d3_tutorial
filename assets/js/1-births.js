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
    
    // create a div for our tooltip
    const tooltip = d3.select("body")
        .append("div")
          .classed("tooltip-life", true); 

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
        .attr("r", d => radiusScale(d.births))
        .on("mousemove", showTooltip)
        .on("touchstart", showTooltip)        
        .on("mouseout", hideTooltip)
        .on("touchend", hideTooltip);

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
    
    function showTooltip(d) {        
        tooltip
            .style("opacity", 1)
            .style("left", `${d3.event.x - tooltip.node().offsetWidth / 2 - 5}px`)
            .style("top", `${d3.event.y +10}px`)
            .html(`
            <p>Region: ${d.region}</p>
            <p>Births: ${d.births.toLocaleString()}</p>
            <p>Populatio: ${d.population.toLocaleString()}</p>`)        
    }

    function hideTooltip() {
        tooltip
            . style("opacity", 0);
    }
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
    const xScale = d3.scaleLinear()
    .domain(d3.extent(parsedData, d =>  d.adultLiteracyRate))
    .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(parsedData, d => d.subscribersPer100))
        .range([height - padding, padding]);

    
    
    
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

function plotBirtshHistogram() {
    const width =  600;
    const height = 500;
    const barPadding = 1;
    const padding = 20;

    // get the min and max year 
    const minYear = d3.min(birthData, d => d.year);
    const maxYear = d3.max(birthData, d => d.year);    

    // gather all the objects with that min year in an array
    let yearData = birthData.filter(d => d.year === minYear);    
    
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(yearData, d => d.births)])
        .rangeRound([padding, width - padding]);

    //d3.histogram returns a function that creates bins from our values
    // .domain specifies the domain of values to use generating the bins
    //these values are specified by the .value(callback)
    const histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks())
        .value(d => d.births);
    
    // pass the data into the histogram generator and call it bins
    let bins = histogram(yearData);   

    
    const yScale = d3.scaleLinear()
        // from 0 to the length of largest bin
        .domain([0, d3.max(bins, d => d.length)])
        .range([height, 0]);
    
    //select the svg
    let bars = d3.select("#births")
        .attr("width", width)
        .attr("height", height)
      .selectAll(".bar")
      .data(bins)
      .enter()
      .append("g")
        .classed("bar", true)

    bars
        .append("rect")
          .attr("x", (d, i) => xScale(d.x0))
          .attr("y", d => yScale(d.length))
          .attr("height", d => height - yScale(d.length))
          .attr("width", d => xScale(d.x1) - xScale(d.x0)- barPadding) 
          .attr("fill", "teal");
    
    bars
        .append("text")
          .text(d => `${d.x0}-${d.x1} (bar height: ${d.length})`)
          .attr("transform", "rotate(-90)")
          .attr("y", d => (xScale(d.x1) + xScale(d.x0)) / 2)
          .attr("x", -height + 10)
          .style("alignment-baseline", "middle");
    

    d3.select("#birthsInput")
        .property("min", minYear)
        .property("max", maxYear)        
        .property("name", "birthsInput")
        .property("value", minYear)
        .on("input", function() {
            let year = +d3.event.target.value;
            console.log(year);            
            // update the data, xScale, yScale and histgram from input
            yearData = birthData.filter(d => d.year === year);
            xScale.domain([0, d3.max(yearData, d => d.births)]);
            histogram.domain(xScale.domain())
                .thresholds(xScale.ticks());
            bins = histogram(yearData);
            yScale.domain([0, d3.max(bins, d => d.length)]);

            bars = d3.select("#births")
                .selectAll(".bar")
                .data(bins);

            // remove and elements in the exit selection
            bars
                .exit()
                .remove();
            // append a group for each enter selection
            const g = bars
                .enter()
                .append("g")
                  .classed("bar", true);
            
            g.append("rect");
            g.append("text");

            //merge enter selection with our update selection
            g.merge(bars)
                .select("rect")
                .attr("x", (d, i) => xScale(d.x0))
                .attr("y", d => yScale(d.length))
                .attr("height", d => height - yScale(d.length))
                .attr("width", d => {
                    let width = xScale(d.x1) - xScale(d.x0)- barPadding;
                    return width < 0 ? 0 : width;
                }) 
                .attr("fill", "teal");
            
            g.merge(bars)
                .select("text")
                .text(d => `${d.x0}-${d.x1} (bar height: ${d.length})`)
                .attr("transform", "rotate(-90)")
                .attr("y", d => (xScale(d.x1) + xScale(d.x0)) / 2)
                .attr("x", -height + 10)
                .style("alignment-baseline", "middle");
        })


}

function plotMedianAge() {
    const width =  600;
    const height = 500;
    const barPadding = 1;
    const padding = 40;

    // remove all regions with null median age
    const parsedData = regionData.filter(d => d.medianAge);    
   

    //Use d3.extent to get min and max for domain
    const xScale = d3.scaleLinear()
    .domain(d3.extent(parsedData, d =>  d.medianAge))
    .rangeRound([padding, width - padding]);

    // we can't set the yScale till we know how high the bins will be
    // so we first use the histogram fn to set the bins
    
    
     //d3.histogram returns a function that creates bins from our values
    // .domain specifies the domain of values to use generating the bins
    //these values are specified by the .value(callback)
    const histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks())
        .value(d => d.medianAge);
    
    // pass the data into the histogram generator and call it bins
    let bins = histogram(parsedData);
    

    const yScale = d3.scaleLinear()
        // from 0 to the length of largest bin
        .domain([0, d3.max(bins, d => d.length)])
        .range([height - padding, padding]);


    //make new axis passing in the xScale and yScale
    //use ticksize to make a grid(ticks stretch in direction of axis lable)
    const xAxis = d3.axisBottom(xScale)
        // .tickSize(-height + 2 * padding)
        .tickSizeOuter(0);        

    const yAxis = d3.axisLeft(yScale)
        // .tickSize(-width + 2 * padding)
        .tickSizeOuter(0);
    
    // Add the x-axis and y-axis to the svg
    d3.select("#median-age")
        .append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

    d3.select("#median-age")
        .append("g")
        .classed("y-axis", true)
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

    
    //select the svg
    let bars = d3.select("#median-age")
        .attr("width", width + padding)
        .attr("height", height + padding)    
      .selectAll(".bar")
      .data(bins)
      .enter()
      .append("g")
        .classed("bar", true)

    //select the input and add an event listener
    d3.select("#medianInput")
        .property("value", bins.length)
      .on("input", function() {
        let binCount = d3.event.target.value;
        histogram.thresholds(xScale.ticks(binCount))
        // update the bins variable and the y-scale
        bins = histogram(parsedData)
        yScale.domain([0, d3.max(bins, d => d.length)])
        
        
        d3.select(".y-axis")
        .call(d3.axisLeft(yScale))

        d3.select(".x-axis")
            .call(d3.axisBottom(xScale)
                .ticks(binCount));

        let rect = d3.select("#median-age")
            .selectAll("rect")
            .data(bins);

        rect
            .exit()
            .remove();
        
        rect
            .enter()
                .append("rect")
            .merge(rect)
                .attr("x", (d, i) => xScale(d.x0))
                .attr("y", d => yScale(d.length))
                .attr("height", d => height - yScale(d.length))
                .attr("width", d => {
                    let width = xScale(d.x1) - xScale(d.x0)- barPadding;
                    return width >= 0 ? width : 0; 
                } ) 
                .attr("fill", "teal");
        
        d3.select(".bin-count")
            .text(`Number of bins: ${bins.length}`)
      })

    bars
        .append("rect")
          .attr("x", (d, i) => xScale(d.x0))
          .attr("y", d => yScale(d.length))
          .attr("height", d => height - yScale(d.length))
          .attr("width", d => xScale(d.x1) - xScale(d.x0)- barPadding) 
          .attr("fill", "teal");
    
    bars
        .append("text")
        //   .text(d => `${d.length} :regions`)
          .attr("transform", "rotate(-90)")
          .attr("y", d => (xScale(d.x1) + xScale(d.x0)) / 2)
          .attr("x", -height + 10)
          .style("alignment-baseline", "middle");
    
    // Add x-axis label
    d3.select("#median-age")
        .append("text")
            .attr("x", width / 2)
            .attr("y", height )
            .attr("dy", "1.8em")
            .style("text-anchor", "middle")
            .text("Median Age");

    // Add the y-axis label
    d3.select("#median-age")
        .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", - height / 2 )
            .attr("y",  padding)
            .attr("dy", "-1.2em")
            .style("text-anchor", "middle")
            .text("Number of Country Regions");    
}

function plotPieBirths() {
    // Pie Chart showing births per continent and change input
    // between min and max year
    const width = 600;
    const height = 600;
    const minYear = d3.min(birthDataPie, d => d.year);
    const maxYear = d3.max(birthDataPie, d => d.year);

    
    // get a list of continent names from the data set
    const continents = birthDataPie.reduce((acc, cur) => {       
        if (!acc.includes(cur.continent)) {
            acc.push(cur.continent);
        }
        return acc;
    }, []);    

    // use d3.scaleOrdinal to create a color scale
    const colorScale = d3.scaleOrdinal()
        .domain(continents)
        .range(d3.schemeCategory10);
    
    // select the svg    
    d3.select("#pieBirths")
        .attr("width", width)
        .attr("height", height)
      .append('g')
      // center the g in the middle of the svg
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .classed("chart", true);
    
    
    
    // select the input and give min and max vlaues
    d3.select("#pieBirthsInput")
        .property("min", minYear)
        .property("max", maxYear)
        .property("value", minYear)
        .on("input", function() {            
            makeGraph(+d3.event.target.value)
        });  
    
    
    makeGraph(minYear);
           
    
    // helper function to render graph on each update
    function makeGraph(year) {
        // get array of regions for that year
        let yearData = birthDataPie.filter(d => d.year === year);
        

        let arcs = d3.pie()
            .value(d => d.births)
            (yearData);            
        

        let path = d3.arc()
            .outerRadius(width / 2 - 10)
            .innerRadius(width / 4)
            .padAngle(0.02)
            // .cornerRadius(20);

        let update = d3.select(".chart")
            .selectAll(".arc")
            .data(arcs)
        // remove any unnecessary arcs
        update
            .exit()
            .remove();
        
        update
            .enter()
            .append("path")
                .classed("arc", true)
            .merge(update)
                .attr("fill", d => colorScale(d.data.continent))
                .attr("stroke", "black")
                .attr("d", path);
    }
}

function plotBirthsPerMonth() {
    const width = 600;
    const height = 600;
    const minYear = d3.min(birthDataMonths, d => d.year);
    const maxYear = d3.max(birthDataMonths, d => d.year);

    // get a list of months from the data set
    const months = birthDataMonths.reduce((acc, cur) => {       
    if (!acc.includes(cur.month)) {
        acc.push(cur.month);
    }
    return acc;
    }, []);
    
    
    const colorScale = d3.scaleOrdinal()
        .domain(months)
        .range(d3.schemeCategory20);
    
    const quarterColors = ["#1f77b4", "#2ca02c", "#d62728", "#ff7f0e"]
    
    let svg = d3.select("#pie-births-per-month")
        .attr("width", width)
        .attr("height", height)
    
    svg
      .append("g")
        // center the g in the middle of the svg
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .classed("births-per-month", true);
    
    // add new group for the quarter
    svg
        .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`)
          .classed("inner-chart", true);
    
    /// add title
    svg
        .append("text")
            .classed("births-per-month-title", true)
            .attr("x", width / 2)
            .attr("y", 30)
            .style("font-size", "2em")
            .style("text-anchor", "middle")

    // select the input and give min and max vlaues
    d3.select("#births-months-input")
        .property("min", minYear)
        .property("max", maxYear)
        .property("value", minYear)
        .on("input", function() {            
            drawGraph(+d3.event.target.value)
        });   
   
    drawGraph(minYear)


    // helper function to render graph on each update
    function drawGraph(year) {
        // get array of months for that year
        let yearData = birthDataMonths.filter(d => d.year === year);       
        
        let arcs = d3.pie()
            .value(d => d.births)
            .sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
            // (yearData);
        let innerArcs = d3.pie()
            .value(d => d.births)
            .sort((a, b) => a.quarter -b.quarter);       

        let path = d3.arc()
            .outerRadius(width / 2 - 40)
            .innerRadius(width / 4)
            .padAngle(0.02);
            
        let innerPath = d3.arc()
            .outerRadius(width / 4)
            .innerRadius(0)
            .padAngle(0.02);

        let inner = d3.select(".inner-chart")
            .selectAll(".inner-arc")
            .data(innerArcs(getDataByQuarter(yearData)))
        

        let update = d3.select(".births-per-month")
            .selectAll(".arc")
            .data(arcs(yearData))

        // no need to update exit as there are always 12 arcs
        // update
        //     .exit()
        //     .remove();
        inner
            .enter()
            .append("path")
              .classed("inner-arc", true)
              .attr("fill", (d, i) => quarterColors[i])
            .merge(inner)
              .attr("d", innerPath)        
        update
            .enter()
            .append("path")
                .classed("arc", true)                
            .merge(update)
                .attr("fill", d => colorScale(d.data.month))
                .attr("stroke", "black")
                .attr("d", path);
        
        d3.select(".births-per-month-title")
            .text("Births by months for " + year)
    }

    function getDataByQuarter(data) {
        let quarterTallies = [0, 1, 2, 3].map(n => ({quarter: n, births: 0}));
        for(let i = 1; i < data.length; i++) {
            let row = data[i]
            // check which quarter it belongs to
            let quarter = Math.floor(months.indexOf(row.month) / 3)
            quarterTallies[quarter].births += row.births;
        }
        return quarterTallies;
    }
}

function jsonCsvDemo() {
    // getting data from apis using d3.json and d3.csv
    d3.json('./countries.json', function(error,data) {
        if(error) throw error;

        d3.select("body")
          .selectAll("h3")
          .data(data.geonames)
          .enter()
          .append("h3")
          .text(d => d.countryName);
    })

    d3.csv('./simplemaps-worldcities-basic.csv', function(row) {
        if(+row.pop < 10000) return;
        return {
            cityName: row.city,
            countryCode: row.iso2,
            population: +row.pop
        }        
    }, function(error, data) {
        if(error, data) throw error;

        console.log(data);
    })
}

function d3QueueDemo() {
    // managing async code with d3.queue
    d3.queue()
    .defer(d3.json, '../../countries.json')
    .defer(d3.csv, '../../simplemaps-worldcities-basic.csv', function(row) {
        if(+row.pop < 10000) return;
        return {
            cityName: row.city,
            countryCode: row.iso2,
            population: +row.pop
            }
        })
        // using awaitAll to return an array of returned data
        // .awaitAll(function(error, allData) {
        //     if(error) throw error;
        //     // map over countries and give each one a cities array
        //     const data = allData[0].geonames.map(country => {
        //         country.cities = allData[1].filter(city => {
        //             return city.countryCode === country.countryCode;                    
        //         });
        //         return country;
        //     });
        .await(function(error, countries, cities) {
            if(error) throw error;
            // map over countries and give each one a cities array
            const data = countries.geonames.map(country => {
                country.cities = cities.filter(city => {
                    return city.countryCode === country.countryCode;                    
                });
                return country;
            });
            
            d3.select("#city-population")             
              .append("h2")
              .text("Countries & % population in each city");
            
            const countrySelection = d3.select('body')
              .selectAll("div")
              .data(data)
              .enter()
              .append("div");

            countrySelection
              .append("h3")
              .text(d => d.countryName);
            
            countrySelection
              .append("ul")
              .html(d => d.cities.map(city => {                
                let percentage = city.population / d.population * 100;
                return `<li>${city.cityName} - ${percentage.toFixed(2)}%</li>`
              }).join(''));
        })
}

function plotMethane() {
    d3.queue()
      .defer(d3.csv, "../data/co2/API_EN.ATM.CO2E.KT_DS2_en_csv_v2.csv", formatter)
      .defer(d3.csv, "../data/methane/API_EN.ATM.METH.KT.CE_DS2_en_csv_v2.csv", formatter)
      .defer(d3.csv, "../data/population/API_SP.POP.TOTL_DS2_en_csv_v2.csv", formatter)
      .defer(d3.csv, "../data/renewable/API_EG.FEC.RNEW.ZS_DS2_en_csv_v2.csv", formatter)
      .defer(d3.csv, "../data/urban_population/API_SP.URB.TOTL_DS2_en_csv_v2.csv", formatter)
      .awaitAll(function(error, data) {
        if(error) throw error;
        
        const yearObj =  formatAllData(data);      

        const width = 700;
        const height = 700;
        const padding = 100;
        const yearRange = d3.extent(Object.keys(yearObj).map(year => +year));        
            
        const svg = d3.select('#scatter-methane-chart')
        .attr('width', width)
        .attr('height', height);

        svg.append('g')
        .attr('transform', 'translate(0, ' + (width - padding + 30) + ')')
        .classed('x-axis-methane', true);

        svg.append('g')
        .attr('transform', 'translate(' + (padding - 30) + ',0)')
        .classed('y-axis-methane', true);

        svg.append('text')
        .text('CO2 Emissions (kt per person)')
        .attr('x', width / 2)
        .attr('y', height)
        .attr('dy', '-1.5em')
        .attr('text-anchor', 'middle');

        svg.append('text')
        .text('Methane Emissions (kt of CO2 equivalent per person)')
        .attr('transform', 'rotate(-90)')
        .attr('x', - width / 2)
        .attr('y', '1.5em')
        .attr('text-anchor', 'middle');

        svg.append('text')
        .attr('x', width / 2)
        .attr('y', '2em')
        .attr('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .classed('title', true);

        d3.select('#scatter-methane-input')
        .property('min', yearRange[0])
        .property('max', yearRange[1])
        .property('value', yearRange[0])
        .on('input', () => drawPlot(+d3.event.target.value));

        drawPlot(yearRange[0]);

        function drawPlot(year) {
        var data = yearObj[year];
        var xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.co2 / d.population))
                .range([padding, width - padding]);

        var yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.methane / d.population))
                .range([height - padding, padding]);

        var fScale = d3.scaleLinear()
                .domain([0, 100])
                .range(['black', 'green']);

        var rScale = d3.scaleLinear()
                .domain([0, 1])
                .range([5, 30]);

        d3.select('.x-axis-methane')
        .call(d3.axisBottom(xScale));

        d3.select('.y-axis-methane')
        .call(d3.axisLeft(yScale));

        d3.select('.title')
        .text('Methane vs. CO2 emissions per capita (' + year + ')');

        var update = svg.selectAll('circle')
                .data(data, d => d.region);
                
        update
        .exit()
        .transition()
        .duration(500)
        .attr('r', 0)
        .remove();

        update
        .enter()
        .append('circle')
        .on('mousemove touchmove', showTooltip)
        .on('mouseout touchend', hideTooltip)
        .attr('cx', d => xScale(d.co2 / d.population))
        .attr('cy', d => yScale(d.methane / d.population))
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .merge(update)
        .transition()
        .duration(500)
        .delay((d, i) => i * 5)
        .attr('cx', d => xScale(d.co2 / d.population))
        .attr('cy', d => yScale(d.methane / d.population))
        .attr('fill', d => fScale(d.renewable))
        .attr('r', d => rScale(d.urban / d.population));
        }

        function showTooltip(d) {
        var tooltip = d3.select('.methane-tooltip');
        console.log("Tip")
        tooltip
        .style('opacity', 1)
        .style('left', ( d3.event.pageX - tooltip.node().offsetWidth / 2 ) + 'px' )
        .style('top', ( d3.event.pageY - tooltip.node().offsetHeight + 100 ) + 'px')
        .html(`
        <p>Region: ${d.region}</p>
        <p>Methane per capita: ${(d.methane / d.population).toFixed(4)}</p>
        <p>CO2 per capita: ${(d.co2 / d.population).toFixed(4)}</p>
        <p>Renewable energy: ${d.renewable.toFixed(2)}%</p>
        <p>Urban population: ${(d.urban / d.population * 100).toFixed(2)}%</p>
        `)
        }

        function hideTooltip(d) {
        d3.select('.methane-tooltip')
        .style('opacity', 0);
        }
            

        


    });

    function formatAllData(data) {
        let yearObj = {};
        data.forEach(function(arr) {
          // get the indicator and format the key
          let indicator = arr[0].indicator.split(" ")[0].replace(",","").toLowerCase();
          arr.forEach(function(obj) {
            // get current region
            let region = obj.region;
            // parse through every year, add that region's data to that year array
            for (let year in obj) {
              if (parseInt(year)) {
                if (!yearObj[year]) yearObj[year] = [];
                let yearArr = yearObj[year];
                let regionObj = yearArr.find(el => el.region === region);
                if (regionObj) regionObj[indicator] = obj[year];
                else {
                  let newObj = {region: region};
                  newObj[indicator] = obj[year];
                  yearArr.push(newObj);
                }
              }
            }
          })
        });
        
        // remove years that don't have complete data sets for any region
        for (var year in yearObj) {
          yearObj[year] = yearObj[year].filter(validRegion);
          if (yearObj[year].length === 0) delete yearObj[year];
        }
        return yearObj;
      }
      function validRegion(d) {
        for (let key in d) {
          if (d[key] === null) return false;
        }
        return true;
      }

    function formatter(row) {
        // remove non-countries
        var invalidRows = [
            "Arab World", 
            "Central Europe and the Baltics",
            "Caribbean small states",
            "East Asia & Pacific (excluding high income)",
            "Early-demographic dividend",
            "East Asia & Pacific",
            "Europe & Central Asia (excluding high income)",
            "Europe & Central Asia",
            "Euro area",
            "European Union",
            "Fragile and conflict affected situations",
            "High income",
            "Heavily indebted poor countries (HIPC)",
            "IBRD only",
            "IDA & IBRD total",
            "IDA total",
            "IDA blend",
            "IDA only",
            "Not classified",
            "Latin America & Caribbean (excluding high income)",
            "Latin America & Caribbean",
            "Least developed countries: UN classification",
            "Low income",
            "Lower middle income",
            "Low & middle income",
            "Late-demographic dividend",
            "Middle East & North Africa",
            "Middle income",
            "Middle East & North Africa (excluding high income)",
            "North America",
            "OECD members",
            "Other small states",
            "Pre-demographic dividend",
            "Pacific island small states",
            "Post-demographic dividend",
            "Sub-Saharan Africa (excluding high income)",
            "Sub-Saharan Africa",
            "Small states",
            "East Asia & Pacific (IDA & IBRD countries)",
            "Europe & Central Asia (IDA & IBRD countries)",
            "Latin America & the Caribbean (IDA & IBRD countries)",
            "Middle East & North Africa (IDA & IBRD countries)",
            "South Asia (IDA & IBRD)",
            "Sub-Saharan Africa (IDA & IBRD countries)",
            "Upper middle income",
            "World"
        ];
        let obj = {
            region: row["Country Name"],
            indicator: row["Indicator Name"]
        }
        // if in the invalid array don't add it
        if (invalidRows.indexOf(obj.region) > -1) return;
        for (let key in row) {        
            if (parseInt(key)) obj[key] = +row[key] || null;
        }
        return obj;
        }
}

function worldMapPopulation() {
    d3.queue()
      .defer(d3.json, '../world_50m.json')
      .defer(d3.csv, '../country_data.csv', function(row) {
       
        return {
            country: row.country,
            countryCode: row.countryCode,
            population: +row.population,
            medianAge: +row.medianAge,
            fertilityRate: +row.fertilityRate,
            populationDensity: +row.population / +row.landArea
        }
      })
      .await(function(error, mapData, populationData) {
            if (error)  throw error;
            
            // convert map data into valid geojson format 
            var geoData = topojson.feature(mapData, mapData.objects.
                countries).features;
            // geoData properties obj is empty so find matching population
            // data using county code id and combine the two sets
            populationData.forEach(row => {               
                var countries = geoData.filter(d => d.id === row.countryCode);                
                countries.forEach(country => country.properties = row);
            }) 
            const width = 960;
            const height = 600;

            // as world is on a globe we need to use a projection
            const projection = d3.geoMercator()
                                .scale(125)
                                .translate([width / 2, height / 1.4]);

            const path = d3.geoPath()
                           .projection(projection);
                           
        

            d3.select("#world-map-svg")
                .attr("width", width)
                .attr("height", height)
              .selectAll(".country")
              .data(geoData)
              .enter() 
                .append("path")
                .classed("country", true)
                .attr("d", path); 
            
            let select = d3.select("#world-select")

            select.on("change", d => setColor(d3.event.target.value));

            setColor(select.property("value"));

            function setColor(val) {

                const colorRanges = {
                    population: ["white", "purple"],
                    populationDensity: ["white", "red"],
                    medianAge: ["white", "black"],
                    fertilityRate: ["black", "orange"]
                }
    
                const scale = d3.scaleLinear()
                                .domain([0, d3.max(populationData, d => d[val])])
                                .range(colorRanges[val]);

                d3.selectAll(".country")
                    .transition()
                    .duration(700)
                    .ease(d3.easeBackIn)
                    .attr("fill", d =>{ 
                        let data = d.properties[val];
                        return data ? scale(data) : "#ccc"; 
                    });
            }
      })
}



lifeExpectancy();
plotLiteracyGraph();
plotBirtshHistogram();
plotMedianAge();
plotPieBirths();
plotBirthsPerMonth();
plotMethane();
worldMapPopulation();
d3QueueDemo();


        

