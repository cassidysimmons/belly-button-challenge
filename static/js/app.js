// use the D3 library to read in sample.json from the url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Create a horizontal bar chart with a dropdown menu to display
// the top 10 OTUs found in that individual


function barGraph(samples){
    d3.json(url).then(function(response){
        samples = response.samples;

        let resultArray = samples.filter(sampleObj => sampleObj.id == response);
        let result = resultArray[0];

        data = [{
            x:result.sample_values.slice(0, 10).reverse(),
            y: result.otu_labels,
            type: 'bar',
            orientation: 'h'
        }];
 
     Plotly.newPlot('bar', data);
 });
 };

barGraph();

// d3.select('#bar').append(barGraph);

// Create a bubble chart that displays each sample
function bubbleChart(samples){
    d3.json(url).then(function(response){

        samples = response.samples;

        let resultArray = samples.filter(sampleObj => sampleObj.id == response);
        let result = resultArray[0];

    data = [{
        x: result.otu_ids,
        y: result.sample_values,
        text: result.otu_labels,
        marker: {
            color: [result.otu_ids],
            size: [result.sample_values]
        }
    
    }];

    Plotly.newPlot('bubble', data);
    });
};

bubbleChart();


// Display the sample metadata, i.e., an individual's demographic information.
function metaData(){
    d3.json(url).then(function(response){

        metadata = response.metadata;

        let resultArray = metadata.filter(sampleObj => sampleObj.id == response);
        let result = resultArray[0];

    data = [{
        type: 'table',
        values: result.map(data => data.metadata),
    }];

    Plotly.newPlot('sample-metadata', data);
});
};

metaData();

// Update all the plots when a new sample is selected. 
// Additionally, you are welcome to create any layout that you would like for your dashboard
function updatePlotly(){
    let dropDown = d3.select('#selDataset');

    let dataSet = dropDown.property('value');

    d3.json(url).then(function(data) {

    let sampleNames = data.names;

    for (let i=0; i < sampleNames.length; i++){

    }
    });
};