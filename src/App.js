import React from 'react';
import './App.css';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';


function App() {
  return (
    <>
      <CytoscapeComponent
        className="App-header"
        pan={{ x: 700, y: 200 }}
        elements={[
          {
            'data': { 'id': 'one', 'label': 'Modified Color' },
            'position': { 'x': 75, 'y': 75 },
            'classes': 'red'
          },
          {
            'data': { 'id': 'two', 'label': 'Modified Shape' },
            'position': { 'x': 75, 'y': 200 },
            'classes': 'triangle'
          },
          {
            'data': { 'id': 'three', 'label': 'Both Modified' },
            'position': { 'x': 200, 'y': 75 },
            'classes': 'red triangle'
          },
          {
            'data': { 'id': 'four', 'label': 'Regular' },
            'position': { 'x': 200, 'y': 200 }
          },
          { 'data': { 'source': 'one', 'target': 'two' }, 'classes': 'red',"selected" : false },
          { 'data': { 'source': 'two', 'target': 'three' } },
          { 'data': { 'source': 'three', 'target': 'four' }, 'classes': 'red' },
          { 'data': { 'source': 'two', 'target': 'four' },"selected" : true },
        ]}     
        // layout={{ 'name': 'preset' }}
        style={{ 'width': '100%', 'height': '400px' }}

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
