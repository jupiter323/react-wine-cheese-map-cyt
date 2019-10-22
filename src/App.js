import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';


function App() {
  return (
    <div className="App">
      <CytoscapeComponent
        className="App-header"
        pan={ { x: 100, y: 200 } } 
        elements={CytoscapeComponent.normalizeElements({
          nodes: [
            { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } }
          ],
          edges: [
            {
              data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' }
            }
          ]
        })}
       
        stylesheet={[
          {
            selector: 'node',
            style: {
              width: 20,
              height: 20,
              shape: 'rectangle'
            }
          },
          {
            selector: 'edge',
            style: {
              width: 15
            }
          }
        ]}
      />

    </div>
  );
}

export default App;
