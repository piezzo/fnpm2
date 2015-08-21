import React from 'react';
import moment from 'moment';
import Chart from './Chart';
import Highlightable from 'react-highlightable';
import mui from 'material-ui';
  // let ThemeManager = new mui.Styles.ThemeManager();
  let RaisedButton = mui.RaisedButton;
  let Paper = mui.Paper;
  let Card = mui.Card;
  let CardHeader = mui.CardHeader;
  let CardText = mui.CardText;
  let Avatar = mui.Avatar;



export default class Node extends React.Component {

  render() {

    var trafficData = [
      {
        value: Math.max((this.props.data.bytessent / 1024 / 1024).toFixed(2), 0.01),
        color:"#603C92",
        highlight: "#47207E",
        label: "MB sent"
      },
      {
        value: Math.max((this.props.data.bytesrecv / 1024 / 1024).toFixed(2), 0.01),
        color: "#F6D496",
        highlight: "#FFDB9A",
        label: "MB received"
      }
    ];

    var ringSize = - Math.round(Math.min(0.25, (this.props.data.bytesrecv +this.props.data.bytessent) / this.props.maxTransferred) * 100) +95;

    var subtitleString = this.props.data.subver;
    var avatarColor = 'black'



    var classString = "Node";
    if (this.props.data.addr.indexOf('[') > -1) {
      classString += " ipv6";
      subtitleString += " ipv6";
      avatarColor = 'yellow';
    }

    if (this.props.data.addr.indexOf('192.168.') > -1) {
      classString += " localNet";
      subtitleString += " local";
      avatarColor = 'blue';
    }
    if ((this.props.data.addr.indexOf('.onion') > -1) || (this.props.data.addrlocal.indexOf('.onion') > -1)) {
      classString += " onion";
      subtitleString += " onion";
      avatarColor = 'red';
    }
    else {
      classString += " ipv4";
      subtitleString += " ipv4";
    }

    if (this.props.data.inbound) {
      subtitleString += " inbound";
    }

    return(
      <div className={classString}>
        <Card initiallyExpanded={false}>
          <CardHeader
            title={this.props.data.addr}
            subtitle={subtitleString}
            avatar={<Avatar style={{color:{avatarColor}}}>A</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
          {this.props.data.subver}, <b>{this.props.data.addr}</b>, {'\n'}sent: <Highlightable background={'yellow'}>{(this.props.data.bytessent /1024 /1024).toFixed(2)}</Highlightable> MB, received: <Highlightable background={'yellow'}>{(this.props.data.bytesrecv /1024 /1024).toFixed(2)}</Highlightable> MB, connected {moment(this.props.data.conntime * 1000).fromNow()}
          <Chart data={trafficData} ringSize={ringSize}/>
          </CardText>
          </Card>
      </div>
    );
  }}
