// use the D3 library to read in sample.json from the url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// create a function to initialize the plots
function init(){

    let dropDown = d3.select('#selDataset');

    d3.json(url).then(function(data) {

        let sampleNames = data.names;

        sampleNames.forEach(element =>{
            dropDown.append("option").text(element).property("value",element);
        });

        let sampleOne = sampleNames[0];

        metaData(sampleOne);
        barGraph(sampleOne);
        bubbleChart(sampleOne);

    });
};

// Create a horizontal bar chart with a dropdown menu to display
// the top 10 OTUs found in that individual
function barGraph(sample){
    d3.json(url).then(function(response){

        samples = response.samples;

        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        let data = [{
            x: result.sample_values.slice(0, 10).reverse(),
            y: result.otu_labels.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            labels: result.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
 
        let layout = {
            title: 'top ten OTUs'
        };

     Plotly.newPlot('bar', data, layout);
 });
 };

// Create a bubble chart that displays each sample
function bubbleChart(sample){
    d3.json(url).then(function(response){

        samples = response.samples;

        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

    let data = [{
        x: result.otu_ids,
        y: result.sample_values,
        text: result.otu_labels,
        mode: "markers",
        marker: {
            color: result.otu_ids,
            size: result.sample_values,
            colorscale: "Earth"
        }
    }];

    let layout = {
        title: 'bacteria per sample',
        hovermode: 'closest',
        xaxis: {title: "OTU ID"}
    }

    Plotly.newPlot('bubble', data, layout);
    });
};

// Display the sample metadata, i.e., an individual's demographic information.
function metaData(sample){
    d3.json(url).then(function(response){

        metadata = response.metadata;

        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        d3.select('#sample-metadata').html("");

        Object.entries(result).forEach(([key, value])=>{
            
            d3.select('#sample-metadata').append("h5").text(`${key}: ${value}`);

        });
});
};

// Update all the plots when a new sample is selected. 
// Additionally, you are welcome to create any layout that you would like for your dashboard
function optionChanged(value){

    console.log(value);

    metaData(value);
    barGraph(value);
    bubbleChart(value);
};

// call the function to initialize the data
init();
