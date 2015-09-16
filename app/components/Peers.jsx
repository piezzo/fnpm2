import React from 'react';
import Node from './Node';
import PeersSummary from './PeersSummary';

import $ from 'jquery'; // load JQuery as long as there is no flux...

export default class Peers extends React.Component {
  constructor() {
    super();

    this.state = {data: [], pollInterval: 3000};
    this.loadPeersFromServer = this.loadPeersFromServer.bind(this);
    // this.loadPeersFromServer();
    // this.loadPeersFromServer = this.loadPeersFromServer.bind(this);
  }

  componentDidMount() {
    this.loadPeersFromServer();
    setInterval(this.loadPeersFromServer, this.state.pollInterval);
  }

  loadPeersFromServer() {
    $.ajax({
      url: "http://shuttle:3000/getpeerinfo",
      dataType: 'json',
      cache: true,
      success: function(data) {
        console.log("successful xmlhttprequest.");
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    var self = this;
    var maxTransferred = this.state.maxTransferred;
    // console.log(this.props);
    if (this.state.data) {
      var nodes = this.state.data.map(function (node, i) {
        return (
          <Node key={'node_' + node.id} data={node} maxTransferred={maxTransferred}>
            {node.addr}
          </Node>
        );
      })};
      return(<div className="Peers">
      <ul>
        <div className="Nodes">
          {nodes}
        </div>
      </ul>
      <PeersSummary data={this.state.data} nettotals={this.state.data.nettotals} />
    </div>
  );
}
}
