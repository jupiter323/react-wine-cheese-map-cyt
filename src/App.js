import React from 'react';
import './App.css';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import data from './assets/data.json'
import cycssString from './assets/style.cycss'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styleJson: null
    }
  }
  componentDidMount() {
    fetch(cycssString)
      .then((r) => r.text())
      .then(styleJson => {
        console.log(styleJson)
        this.setState({ styleJson })
      }).catch(err=>{
        console.log(err)
      })
  }
  render() {
    var { styleJson } = this.state
    var elements = data.elements.nodes
    elements = elements.concat(data.elements.edges)
    return (
      <>
        <CytoscapeComponent
          className="App-header"
          elements={elements}
          motionBlur
          selectionType={"single"}
          boxSelectionEnabled={false}
          autoungrabify={true}
          layout={{ 'name': 'preset','padding':50 }}
          // style={{ 'width': '100%', 'height': '400px' }}
          stylesheet={[
            {
              selector:'node[NodeType = "WhiteWine"]',
              style:{
                "background-color": "white",
                "text-outline-color": "white"
              }
            }       
          ]}
          // stylesheet={[
          //   {
          //     'selector': 'node',
          //     'style': {
          //       'content': 'data(label)'
          //     }
          //   },

          //   {
          //     'selector': '.red',
          //     'style': {
          //       'background-color': 'red',
          //       'line-color': 'red'
          //     }
          //   },
          //   {
          //     'selector': '.triangle',
          //     'style': {
          //       'shape': 'triangle'
          //     }
          //   }
          // ]}
        />
      </>
    );
  }

}

export default App;
