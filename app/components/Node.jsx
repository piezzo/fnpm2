import React from 'react';
import moment from 'moment';
import Chart from './Chart';

export default class Node extends React.Component {
  render() {

    var trafficData = [
    {
        value: (this.props.data.bytessent / 1024 / 1024).toFixed(2),
        color:"#603C92",
        highlight: "#47207E",
        label: "MB sent"
    },
    {
        value: (this.props.data.bytesrecv / 1024 / 1024).toFixed(2),
        color: "#90C546",
        highlight: "#A4D660",
        label: "MB received"
    },
    {
        value: 0,
        color: "#D78A4D",
        highlight: "#FEC08F",
        label: "Yellow"
    }
];
// console.log(this.props);
    var classString = "Node";
    if (this.props.data.addr.indexOf('[') > -1) {
      classString += " ipv6";
    }

    if (this.props.data.addr.indexOf('192.168.') > -1) {
      classString += " localNet";
    }

    return(
      <div className={classString}>
        {this.props.data.id}: {this.props.data.addr}, up: {(this.props.data.bytessent /1024 /1024).toFixed(2)} MB, down: {(this.props.data.bytesrecv /1024 /1024).toFixed(2)} MB, since {moment(this.props.data.conntime * 1000).fromNow()}
        <Chart data={trafficData}/>
      </div>
    );
  }}
