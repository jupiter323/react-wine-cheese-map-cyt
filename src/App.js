import React from 'react';
import './App.css';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import data from './assets/data.json'

function App() {
  console.log(data)
  return (
    <>
      <CytoscapeComponent
        className="App-header"
        // pan={{ x: 700, y: 200 }}
        elements={data.elements.nodes}
        layout={{ 'name': 'preset' }}
        // style={{ 'width': '100%', 'height': '400px' }}

        stylesheet={[
          {
            'selector': 'node',
            'style': {
              'content': 'data(label)'
            }
          },

          {
            'selector': '.red',
            'style': {
              'background-color': 'red',
              'line-color': 'red'
            }
          },
          {
            'selector': '.triangle',
            'style': {
              'shape': 'triangle'
            }
          }
        ]}
      />
    </>
  );
}

export default App;
