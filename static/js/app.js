// use the D3 library to read in sample.json from the url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Create a horizontal bar chart with a dropdown menu to display
// the top 10 OTUs found in that individual
d3.json(url).then(function(data){
    console.log(data.samples);
});
//console.log(samples);

let samples = url.samples;

function barGraph(){
    data = [{
        x: samples.map(sample => sample.sample_values),
        y: samples.map(sample => sample.otu_labels),
        type: 'bar',
        orientation: 'h'
    }];

    Plotly.newPlot('plot', data);
};

// Create a bubble chart that displays each sample
function bubbleChart(){

};

// Display the sample metadata, i.e., an individual's demographic information.
function metaData(){
    data = [{
        type: 'table',
        values: samples.map(sample => sample.metadata)
    }];
};

metaData();

// Update all the plots when a new sample is selected. 
// Additionally, you are welcome to create any layout that you would like for your dashboard
function updatePlotly(){
    let dropDown = d3.select('#selDataset');

    let dataSet = dropDown.property('value');
}