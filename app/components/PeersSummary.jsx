import React from 'react';
import Highlightable from 'react-highlightable';
import NetworkSpeeds from './NetworkSpeeds';

export default class PeersSummary extends React.Component {
  // let kbpsIn = 0;

  render() {
    // console.log(this.props);
    if (this.props.data && this.props.nettotals) {
    return(
      <div className="PeersSummaryDetails rotate-left">
        <h3><i>fnpm2</i>: Connected to
          <Highlightable background={'yellow'}>{this.props.data.length}
          </Highlightable> peers --- in:
          <Highlightable background={'yellow'}>{(this.props.nettotals.totalbytesrecv /1024 /1024 /1024).toFixed(2)}
          </Highlightable>GB, out:
          <Highlightable background={'yellow'}>{(this.props.nettotals.totalbytessent /1024 /1024 /1024).toFixed(2)}
          </Highlightable>GB
        </h3>
        <NetworkSpeeds nettotals={this.props.nettotals} peers={this.props.data} />

      </div>

    );
  } else {
    return(
      <div className="PeersSummaryDetails">
        <h3><i>fnpm2</i>: No data available yet...</h3>
      </div>
    );
  }
  }
}
