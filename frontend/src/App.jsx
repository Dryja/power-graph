import React from 'react';
import Graph from "react-graph-vis";
import HourRange from './HourRange.jsx';
import { buildGraph } from './graph';
import 'vis-network/dist/vis-network.min.css';


const options = {
  layout: {
    hierarchical: false,
    randomSeed: 10
  },
  physics: false,
  nodes: {
    shape: 'dot',
  }

};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHour: 1,
      graph: {
        nodes: [],
        edges: []
      }
    }
    this.updateHour = this.updateHour.bind(this);

  }
  componentDidMount() {
    buildGraph(this.state.currentHour).then((elements) => this.network.setData(elements));
  }
  updateHour(val) {
    this.setState({ currentHour: val });
    buildGraph(this.state.currentHour).then((elements) => this.network.setData(elements));
  }
  render() {
    return (<div><Graph graph={{ nodes: [], edges: [] }} options={options} style={{ height: "700px", width: '100%', background: '#eee' }} getNetwork={network => {
      this.network = network
    }} /><HourRange updateHour={this.updateHour} /></div>);
  }
}


export default App;