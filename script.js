const colors = d3.schemeCategory10;

function updateChart(data) {
    const svgWidth = 500;
    const svgHeight = 300;
    const barHeight = 30;
    const parsedData = data.map(Number);

    d3.select("#chart").selectAll("*").remove();

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", parsedData.length * barHeight);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(parsedData)])
        .range([0, svgWidth - 20]);

    svg.selectAll("rect")
        .data(parsedData)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * barHeight)
        .attr("width", d => xScale(d))
        .attr("height", barHeight - 5)
        .attr("fill", (d, i) => colors[i % colors.length]);

    svg.selectAll("text")
        .data(parsedData)
        .enter()
        .append("text")
        .attr("x", d => xScale(d) + 5)
        .attr("y", (d, i) => i * barHeight + barHeight / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text(d => d)
        .attr("fill", "black")
        .style("font-size", "12px");
}

document.getElementById("updateButton").addEventListener("click", () => {
    const input = document.getElementById("dataInput").value;
    try {
        const data = input.split(",").map(Number);
        console.log('data: ', data);
        if(data.some(n => isNaN(n))){
            throw new Error("Error");  
        } else updateChart(data);
    } catch (error) {
        alert("Please enter valid numbers separated by commas.");
    }

});