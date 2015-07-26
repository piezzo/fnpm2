import React from 'react';

export default class Node extends React.Component {
  render() {
    // console.log(this.props);
    return(
      <div className="Node">
        {this.props.data.id}: {this.props.data.addr}
      </div>
    );
  }}
