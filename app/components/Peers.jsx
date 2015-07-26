import React from 'react';
import Node from './Node';

export default class Peers extends React.Component {
  render() {
    // console.log(this.props);
    if (this.props.peers.data) {
    var nodes = this.props.peers.data.map(function (node) {
      return (
        <Node data={node}>
          {node.addr}
        </Node>
      );
    })};
    return(
      <div className="Nodes">
        {nodes}
      </div>
    );
  }}
