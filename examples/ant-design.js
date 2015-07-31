'use strict';

import 'rc-tabs/assets/index.less';
import React from 'react';
import Tabs, {TabPane} from 'rc-tabs';

class PanelContent extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.id, 'constructor');
  }

  componentWillReceiveProps() {
    //console.log(this.props.id, 'componentWillReceiveProps');
  }

  render() {
    var length = parseInt(10 * (Math.random())+4);
    var count = new Array(length);// new Array(4) skip forEach ....
    for (var i = 0; i < length; i++) {
      count[i] = 1;
    }
    var content = new Array(parseInt(100 * (Math.random()))+4).join(' ' + this.props.id);
    var els = count.map((c, i)=> {
      return <p key={i}>{content}</p>
    });
    return <div>{els}</div>;
  }
}

function construct(start, num) {
  var ends = [];
  var index = 1;
  for (var i = start; i < start + num; i++) {
    ends.push(<TabPane tab={`tab ${i}`}
      disabled={!!(i % 2)}
      key={index + ""}>
      <PanelContent id={i}/>
    </TabPane>);
    index++;
  }
  return ends;
}


var Component = React.createClass({
  getInitialState() {
    return {
      tabPosition: 'top',
      start: 0
    }
  },

  onChange(key) {
    //console.log(`onChange ${key}`);
  },

  onTabClick(key) {
    //console.log(`onTabClick ${key}`);
  },

  tick() {
    this.setState({
      start: this.state.start + 10
    })
  },

  changeTabPosition(e) {
    this.setState({
      tabPosition: e.target.value
    });
  },

  render() {
    var start = this.state.start;
    var ends = construct(start, 9);
    var ends2 = construct(start, 3);
    var tabPosition = this.state.tabPosition;
    var navStyle = {};
    var animation = "slide-horizontal";

    var tabStyle={
      width:500
    };

    if (tabPosition === 'left' || tabPosition === 'right') {
      navStyle = {
        height: 400
      };
      animation = "slide-vertical";
      tabStyle={
        height:500
      };
    }




    return <div style={{margin: 20}}>
      <h2>Simple Tabs</h2>
      <p>
        tabPosition:
        <select value={this.state.tabPosition} onChange={this.changeTabPosition}>
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </p>
      <div style={tabStyle}>
        <Tabs defaultActiveKey='3'
          navStyle={navStyle}
          tabPosition={this.state.tabPosition}
          animation={animation}
          onTabClick={this.onTabClick}
          onChange={this.onChange}>
        {ends2}
        </Tabs>
      </div>
      <h2>Scroll Tabs</h2>
      <div style={tabStyle}>
        <Tabs defaultActiveKey='3'
          navStyle={navStyle}
          tabPosition={this.state.tabPosition}
          animation={animation}
          onTabClick={this.onTabClick}
          onChange={this.onChange}>
        {ends}
        </Tabs>
      </div>
      <button onClick={this.tick}>rerender</button>
    </div>
  }
});

React.render(<Component />, document.getElementById('__react-content'));
