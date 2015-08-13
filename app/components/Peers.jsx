import React from 'react';
import Node from './Node';
import PeersSummary from './PeersSummary';

export default class Peers extends React.Component {
  render() {
    var self = this;
    var maxTransferred = self.props.peers.maxTransferred;
    // console.log(this.props);
    if (this.props.peers.data) {
      var nodes = this.props.peers.data.map(function (node, i) {
        return (
          <Node key={'node' + i} data={node} maxTransferred={maxTransferred}>
            {node.addr}
          </Node>
        );
      })};
      return(<div className="Peers">
      <PeersSummary data={this.props.peers.data} nettotals={this.props.peers.nettotals} />
      <ul>
        <div className="Nodes">
          {nodes}
        </div>
      </ul>
    </div>
  );
}}
