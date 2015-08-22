import './stylesheets/main.css';

//Material UI

// var injectTapEventPlugin = require("react-tap-event-plugin");
import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let WebFontConfig = {
    google: { families: [ 'Roboto:400,300,500:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();


import React from 'react';


import App from './components/App';

main();

function main() {
    var app = document.createElement('div');
    document.body.appendChild(app);

    React.render(<App />, app);
}
