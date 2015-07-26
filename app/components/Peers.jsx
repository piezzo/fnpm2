import React from 'react';

export default class Peers extends React.Component {
  render() {
    // console.log(this.props);
    // var data = this.props.data;
    return(
     <div>connected to this many IPs: {this.props.peers.data.length}</div>

   );
  }
}
