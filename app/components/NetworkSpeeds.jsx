import React from 'react';
// import Highlightable from 'react-highlightable';

export default class NetworkSpeeds extends React.Component {

  render() {
    if (this.state) {
    return(
        <div className="PeersSummarySpeeds">
          Speeds: in: {this.state.kbpsIn.toFixed(2)}kbps out: {this.state.kbpsOut.toFixed(2)}kbps
        </div>
    );
  } else {
    return(
      false
    );
  }
  }

  componentWillReceiveProps(nextProps) {

    //overall traffic
    if (this.props.nettotals) {
      var kbpsIn = ((nextProps.nettotals.totalbytesrecv - this.props.nettotals.totalbytesrecv) /1024 /3);
      // console.log('kbpsIn:',kbpsIn.toFixed(2));
      var kbpsOut = (nextProps.nettotals.totalbytessent - this.props.nettotals.totalbytessent) /1024 /3;
      // console.log('kbpsOut:',kbpsOut.toFixed(2));
      this.setState({
        kbpsIn: kbpsIn, kbpsOut: kbpsOut
      });
    }

    //summary by connection Types
    // console.log(this.props.peers);
    if (this.props.peers) {
      var peers = nextProps.peers;
      var onion = {in: 0, out: 0}, ipv4 = {in: 0, out: 0}, ipv6 = {in: 0, out: 0};
      onion.kbps = {in: 0, out: 0}, ipv4.kbps = {in: 0, out: 0}, ipv6.kbps = {in: 0, out: 0};
      peers.forEach(function(peer){
        if ((peer.addr.indexOf('.onion') > -1) || (peer.addrlocal.indexOf('.onion') > -1)) {
          onion.in = onion.in + peer.bytesrecv;
          onion.out = onion.out + peer.bytessent;
        } else if (peer.addr.indexOf('[') > -1) {
          ipv6.in = ipv6.in + peer.bytesrecv;
          ipv6.out = ipv6.out + peer.bytessent;
        } else {
          ipv4.in = ipv4.in + peer.bytesrecv;
          ipv4.out = ipv4.out + peer.bytessent;
        }
      });
      if (this.state.ipv4) {
        var onionKbpsIn = ((onion.in - this.state.onion.in) /1024 /3).toFixed(2);
        this.setState({ onionKbpsIn: onionKbpsIn});
        var onionKbpsOut = ((onion.out - this.state.onion.out) /1024 /3).toFixed(2);
        this.setState({ onionKbpsOut: onionKbpsOut});

        var ipv6KbpsIn = ((ipv6.in - this.state.ipv6.in) /1024 /3).toFixed(2);
        this.setState({ ipv6KbpsIn: ipv6KbpsIn});
        var ipv6KbpsOut = ((ipv6.out - this.state.ipv6.out) /1024 /3).toFixed(2);
        this.setState({ ipv6KbpsOut: ipv6KbpsOut});

        var ipv4KbpsIn = ((ipv4.in - this.state.ipv4.in) /1024 /3).toFixed(2);
        this.setState({ ipv4KbpsIn: ipv4KbpsIn});
        var ipv4KbpsOut = ((ipv4.out - this.state.ipv4.out) /1024 /3).toFixed(2);
        this.setState({ ipv4KbpsOut: ipv4KbpsOut});
      }

      this.setState({
        onion: onion, ipv4: ipv4, ipv6: ipv6
      });
    }

  }
}
