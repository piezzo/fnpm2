import React from 'react';
import moment from 'moment';
import Chart from './Chart';
import Highlightable from 'react-highlightable';
import mui from 'material-ui';
  // let ThemeManager = new mui.Styles.ThemeManager();
  let Paper = mui.Paper;
  let Card = mui.Card;
  let CardHeader = mui.CardHeader;
  let CardText = mui.CardText;
  let Avatar = mui.Avatar;


      // if (this.state) {
      //   let kbpsIn = this.state.kbpsIn;
      //   let kbpsOut = this.state.kbpsOut;
      // } else {
      //   let kbpsIn = 0;
      //   let kbpsOut = 0;
      // }

export default class Node extends React.Component {
  constructor() {
    super();
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.state = {kbpsIn: 0, kbpsOut: 0};
  }

  render() {

    var trafficData = [
      {
        value: Math.max((this.props.data.bytessent / 1024 / 1024).toFixed(2), 0.01),
        color:"#CC69DA",
        highlight: "#F0BBF7",
        label: "MB sent"
      },
      {
        value: Math.max((this.props.data.bytesrecv / 1024 / 1024).toFixed(2), 0.01),
        color: "#8678DE",
        highlight: "#CAC2F8",
        label: "MB received"
      }
    ];

    var ringSize = - Math.round(Math.min(0.25, (this.props.data.bytesrecv +this.props.data.bytessent) / this.props.maxTransferred) * 100) +95;
    // console.log('ringSize:',ringSize);

    var subtitleString = this.props.data.subver.slice(0, 20);
    var avatarColor = 'black';
    var avatarString = '--';

    var classString = "Node";
    if (this.props.data.addr.indexOf('[') > -1) {
      classString += " ipv6";
      subtitleString += " ipv6";
      avatarColor = 'orange';
      avatarString = 'v6';
      // Dirty hack to shorten ipv6-adresses
      var addr;
      if (this.props.data.addr.length > 30) {
        addr = this.props.data.addr.slice(0,30) + "...";
      } else {
        addr = this.props.data.addr;
      }

    } else
    if ((this.props.data.addr.indexOf('.onion') > -1) || (this.props.data.addrlocal.indexOf('.onion') > -1)) {
      classString += " onion";
      subtitleString += " onion";
      avatarColor = 'red';
      avatarString = 'on';
    } else
    if (this.props.data.addr.indexOf('192.168.') > -1) {
      classString += " localNet";
      subtitleString += " local";
      avatarColor = 'blue';
      avatarString = 'l';
    }
    else {
      classString += " ipv4";
      subtitleString += " ipv4";
      avatarString = 'v4';
    }

    if (this.props.data.inbound) {
      subtitleString += " inbound";
    }

    subtitleString += " " + this.state.kbpsIn + "/" + this.state.kbpsOut;
    // subtitleString = "<div class=\'right\'>" + subtitleString+ "</div>";

    return(
      <div className={classString}>
        <Card initiallyExpanded={false}>
          <CardHeader
            title={addr || this.props.data.addr}
            subtitle={subtitleString}
            avatar={<Avatar style={{color:avatarColor}}>{avatarString}</Avatar>}
            showExpandableButton={true}>
          </CardHeader>
          <CardText expandable={true}>
            <div className="container">
                <div className="child">
                  <span>Id: {this.props.data.id} </span><br/>
                    <span>{this.props.data.subver} </span><br/>
                    <span><b>{this.props.data.addr}</b> </span><br/>
                    <span>received: <Highlightable background={'yellow'}>{(this.props.data.bytesrecv /1024 /1024).toFixed(2)}</Highlightable> MB </span><br/>
                    <span>sent: <Highlightable background={'yellow'}>{(this.props.data.bytessent /1024 /1024).toFixed(2)}</Highlightable> MB </span><br/>
                    <span>timeoffset: {this.props.data.timeoffset} </span><br/>
                    <span>banscore: {this.props.data.banscore} </span><br/>
                    {/* // <span>startingheight {this.props.data.startingheight}, </span><br/>
                    // <span>synced_headers: {this.props.data.synced_headers}, </span><br/>
                    // <span>synced_blocks: {this.props.data.synced_blocks} </span><br/>
                    // <span>inflight: {this.props.data.inflight.toString()} </span><br/>
                    // <span>whitelisted: {this.props.data.whitelisted.toString()} </span><br/> */}
                    <span>kB/s in: {this.state.kbpsIn} </span><br/>
                    <span>kB/s out: {this.state.kbpsOut} </span><br/>
                    <span>connected {moment(this.props.data.conntime * 1000).fromNow()} </span><br/>

                </div>
              <Chart className="child" data={trafficData} ringSize={ringSize}/>
          </div>
          </CardText>
          </Card>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {

      var kbpsIn = ((nextProps.data.bytesrecv - this.props.data.bytesrecv) /1024 /3);
      // console.log('id:', this.props.data.id, 'kbpsIn:',kbpsIn.toFixed(2));
      var kbpsOut = ((nextProps.data.bytessent - this.props.data.bytessent) /1024 /3);
      // console.log('kbpsOut:',kbpsOut.toFixed(2));
      this.setState({
        kbpsIn: kbpsIn.toFixed(2), kbpsOut: kbpsOut.toFixed(2)
      });

  }

}
