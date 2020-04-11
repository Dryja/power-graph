import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import HourRange from './HourRange';
import { buildGraph } from './graph';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elements: [], currentHour: 1 }

    this.updateHour = this.updateHour.bind(this);

  }

  componentDidMount() {
    this.cy.on('add', 'node', _evt => {
      this.cy.layout({ name: 'breadthfirst', spacingFactor: 1.2 }).run()
      this.cy.center()
      this.cy.fit()
    })

    const elements = buildGraph(this.state.currentHour);
    this.setState({ elements: elements, currentHour: 1 },
      function () { console.log("setState completed", this.state) }
    )
  }

  updateHour(val) {
    this.setState({ currentHour: val });
  }
  render() {
    return <div><CytoscapeComponent cy={(cy) => { this.cy = cy }} autoungrabify={true} autounselectify={true} panningEnabled={false} elements={[...this.state.elements]}
      style={
        {
          width: '100%',
          height: '600px',
          background: '#eee',
        }
      }
    /><HourRange updateHour={this.updateHour} /></div>;
  }
}


export default App;