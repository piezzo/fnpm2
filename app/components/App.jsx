import React from 'react';
import Peers from './Peers';
import JQuery from 'jquery';

import mui from 'material-ui';
  let ThemeManager = new mui.Styles.ThemeManager();
  let RaisedButton = mui.RaisedButton;
  let AppBar = mui.AppBar;
  let Papaer = mui.Paper;

var $ = require('jquery');


var Fnpm = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeersFromServer();
    setInterval(this.loadPeersFromServer, this.props.pollInterval);
  },
  loadPeersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        // console.log("successful xmlhttprequest.");
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="fnmp">
        <header>
        <AppBar
  title="fnpm2"
  iconClassNameRight="muidocs-icon-navigation-expand-more"/>
</header>
        <Peers peers={this.state.data}/>
      </div>
    );
  },
});
React.render(<Fnpm url="http://shuttle:3000/getpeerinfo" pollInterval={5000} />, document.body);
