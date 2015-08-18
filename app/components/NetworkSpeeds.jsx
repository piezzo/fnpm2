import React from 'react';
// import Highlightable from 'react-highlightable';

export default class NetworkSpeeds extends React.Component {

  render() {
    if (this.state) {
    return(
        <div className="PeersSummarySpeeds">
          Speeds: in: {this.state.kbpsIn.toFixed(2)} out: {this.state.kbpsOut.toFixed(2)}
        </div>
    );
  } else {
    return(
      false
    );
  }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.nettotals) {
      var kbpsIn = ((nextProps.nettotals.totalbytesrecv - this.props.nettotals.totalbytesrecv) /1024 /3);
      // console.log('kbpsIn:',kbpsIn.toFixed(2));
      var kbpsOut = (nextProps.nettotals.totalbytessent - this.props.nettotals.totalbytessent) /1024 /3;
      // console.log('kbpsOut:',kbpsOut.toFixed(2));
      this.setState({
        kbpsIn: kbpsIn, kbpsOut: kbpsOut
      });
    }
  }
}
