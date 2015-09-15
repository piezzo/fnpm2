import React from 'react';
import Peers from './Peers';
import JQuery from 'jquery';

import mui from 'material-ui';
  let ThemeManager = new mui.Styles.ThemeManager();
  // require ('../stylesheets/muiTheme');
  ThemeManager.setTheme(ThemeManager.types.LIGHT);

  let RaisedButton = mui.RaisedButton;
  let AppBar = mui.AppBar;
  let Papaer = mui.Paper;

let appPalette = {
primary1Color: "#FFF479",
primary2Color: "#8678DE",
primary3Color: "#CC69DA",
accent1Color: "#FFF045",
accent2Color: "#CAC2F8",
accent3Color: "#F0BBF7"

// rest of the palette is set from Theme Manager
// colors from http://paletton.com/#uid=41G0o0kgONn00++7WXYniwVs6hg
};
ThemeManager.setPalette(appPalette);

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
React.render(<Fnpm url="/getpeerinfo" pollInterval={3000} />, document.body);
