import React from 'react';
import Highlightable from 'react-highlightable';

export default class PeersSummary extends React.Component {
  render() {
    // console.log(this.props);
    if (this.props.data) {
    return(
      <div className="PeersSummaryDetails rotate-left">
        <h3>fnpm2: Connected to
          <Highlightable background={'yellow'}>{this.props.data.length}
          </Highlightable> peers --- in:
          <Highlightable background={'yellow'}>{(this.props.nettotals.totalbytesrecv /1024 /1024 /1024).toFixed(2)}
          </Highlightable>GB, out:
          <Highlightable background={'yellow'}>{(this.props.nettotals.totalbytessent /1024 /1024 /1024).toFixed(2)}
          </Highlightable>GB
        </h3>
      </div>
    );
  } else {
    return(
      <div className="PeersSummaryDetails rotate-left">
        <h3>fnmp2: No data available yet...</h3>
      </div>
    );
  }
  }
}
