import React from 'react';
import moment from 'moment';

export default class Node extends React.Component {
  render() {
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
      </div>
    );
  }}
