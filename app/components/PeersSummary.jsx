import React from 'react';
import Highlightable from 'react-highlightable';

export default class PeersSummary extends React.Component {
  render() {
    // console.log(this.props);
    if (this.props.data) {
    return(
      <div className="PeersSummaryDetails">
        <h3>Connected to <Highlightable background={'yellow'}>{this.props.data.length}</Highlightable> peers.</h3>
      </div>
    );
  } else {
    return(
      <div className="PeersSummaryDetails">
        <h3>No data available yet...</h3>
      </div>
    );
  }
  }
}
