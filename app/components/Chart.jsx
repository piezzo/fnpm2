// Chart.js
import React from 'react';
var PieChart = require("react-chartjs").Pie;

export default class Chart extends React.Component {

  render() {
    var chartData = this.props.data;
    var chartOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,
      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",
      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,
      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : this.props.ringSize, // This is 0 for Pie charts
      //Number - Amount of animation steps
      animationSteps : 10,
      //String - Animation easing effect
      animationEasing : "linear",
      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,
      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : false,
      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };

// console.log("ringSize:", (this.props.ringSize));

    return (
      <div className="Chart">
        <PieChart data={chartData} options={chartOptions} width="175" height="175"/>
      </div>
    );
  }
}
