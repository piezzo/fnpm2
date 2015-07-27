import React from 'react';

export default class PeersSummary extends React.Component {
  render() {
    // console.log(this.props);
    if (this.props.data) {
    return(
      <div className="PeersSummaryDetails">
        <h3>Connected to {this.props.data.length} peers.</h3>
      </div>
    );
  } else {
    return(
      <div className="PeersSummaryDetails">
        <h3>No data available yet.</h3>
      </div>
    );
  }
  }
}
