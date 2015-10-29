import {default as React, Component} from "react";
import mui from 'material-ui';
  let Paper = mui.Paper;
  let Card = mui.Card;
  let CardHeader = mui.CardHeader;
  let CardText = mui.CardText;
  let Avatar = mui.Avatar;

import {default as GoogleMap} from "../../node_modules/react-google-maps/src/GoogleMap";
// import {default as Marker} from "../../node_modules/react-google-maps/src/Marker";
// const {update} = addons;

var $ = require('jquery');
// window.google = $.getScript('https://maps.googleapis.com/maps/api/js');
// $.getScript( "https://maps.googleapis.com/maps/api/js", function( data, textStatus, jqxhr ) {
//   console.log( data ); // Data returned
//   console.log( textStatus ); // Success
//   console.log( jqxhr.status ); // 200
//   console.log( "Load was performed." );
// });


export default class Home extends Component {
  constructor () {
    super();

    console.log('google:', window.google);
  }
  /*
   * 1. Create a component that wraps all your map sub-components.
   */
  render () {
    /*
     * 2. Render GoogleMap component with containerProps
     */
    return (

      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        /*
         * 3. config <GoogleMap> instance by properties
         */
        defaultZoom={8}
        defaultCenter={{lat: -34.397, lng: 150.644}} />
    );
  }
}
