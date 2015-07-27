import React from 'react';

export default class Node extends React.Component {
  render() {
    // console.log(this.props);
    return(
      <div className="Node">
        {this.props.data.id}: {this.props.data.addr}, up: {(this.props.data.bytessent /1024).toFixed(2)} kB, down: {(this.props.data.bytesrecv /1024).toFixed(2)} kB
      </div>
    );
  }}
