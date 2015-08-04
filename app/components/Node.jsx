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
        color: "#F6D496",
        highlight: "#FFDB9A",
        label: "MB received"
      }
    ];

    var ringSize = - Math.round(Math.min(0.25, (this.props.data.bytesrecv +this.props.data.bytessent) / this.props.maxTransferred) * 100) +95;

    var classString = "Node";
    if (this.props.data.addr.indexOf('[') > -1) {
      classString += " ipv6";
    }

    if (this.props.data.addr.indexOf('192.168.') > -1) {
      classString += " localNet";
    }

    return(
      <div className={classString}>
        <li>
          {this.props.data.subver}, sent: {(this.props.data.bytessent /1024 /1024).toFixed(2)} MB, received: {(this.props.data.bytesrecv /1024 /1024).toFixed(2)} MB, connected {moment(this.props.data.conntime * 1000).fromNow()}
          <Chart data={trafficData} ringSize={ringSize}/>
        </li>
      </div>
    );
  }}
