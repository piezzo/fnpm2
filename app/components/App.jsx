import React from 'react';
import { RouteHandler } from 'react-router';
// import Peers from './Peers';

import mui from 'material-ui';
  let ThemeManager = new mui.Styles.ThemeManager();
  // require ('../stylesheets/muiTheme');
  ThemeManager.setTheme(ThemeManager.types.LIGHT);

  let RaisedButton = mui.RaisedButton;
  let AppBar = mui.AppBar;
  let Papaer = mui.Paper;
  let MenuItem = mui.MenuItem;
  let LeftNav = mui.LeftNav;

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

let menuItems = [
  { route: '/', text: 'Home' },
  { route: 'peers', text: 'Peers' },
  { route: 'about', text: 'About' },
  { route: 'contact', text: 'Contact' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/piezzo/fnpm2',
     text: 'GitHub'
  },
  // {
  //    text: 'Disabled',
  //    disabled: true
  // },
  // {
  //    type: MenuItem.Types.LINK,
  //    payload: 'https://www.google.com',
  //    text: 'Disabled Link',
  //    disabled: true
  // },
];

// var $ = require('jquery');


export default class App extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
  }

  _handleClick(e) {
    e.preventDefault();

    // Show/Hide the LeftMenu
    this.refs.leftNav.toggle();
  }

  // Get the selected item in LeftMenu
  _getSelectedIndex() {
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) {
        return i;
      }
    }
  }

  _onLeftNavChange(e, key, payload) {
    // Do DOM Diff refresh
    this.context.router.transitionTo(payload.route);
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <div className="fnmp">
        <header>
        <AppBar title="fnpm2" onLeftIconButtonTouchTap={this._handleClick}/>
        </header>
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems}
          selectedIndex={this._getSelectedIndex()}
          onChange={this._onLeftNavChange} />
          <section className="content">
            <RouteHandler />
          </section>
      </div>
    );
  }
};
//         <Peers peers={this.state.data}/>

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

App.contextTypes = {
  router: React.PropTypes.func
};
// React.render(<Fnpm url="/getpeerinfo" pollInterval={3000} />, document.body);
