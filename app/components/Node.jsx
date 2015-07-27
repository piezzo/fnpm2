import React from 'react';
import moment from 'moment';

export default class Node extends React.Component {
  render() {
    // console.log(this.props);
    return(
      <div className="Node">
        {this.props.data.id}: {this.props.data.addr}, up: {(this.props.data.bytessent /1024 /1024).toFixed(2)} MB, down: {(this.props.data.bytesrecv /1024 /1024).toFixed(2)} MB, since {moment(this.props.data.conntime * 1000).fromNow()}
      </div>
    );
  }}
