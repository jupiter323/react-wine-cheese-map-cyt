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
      }).catch(err => {
        console.log(err)
      })
  }
  
  generateNode = event => {
    const ele = event.target;

    const isParent = ele.isParent();
    const isChildless = ele.isChildless();
    const isChild = ele.isChild();
    const isOrphan = ele.isOrphan();
    const renderedPosition = ele.renderedPosition();
    const relativePosition = ele.relativePosition();
    const parent = ele.parent();
    const style = ele.style();
    // Trim down the element objects to only the data contained
    const edgesData = ele.connectedEdges().map(ele => {return ele.data()});
    const childrenData = ele.children().map(ele => {return ele.data()});
    const ancestorsData = ele.ancestors().map(ele => {return ele.data()});
    const descendantsData = ele.descendants().map(ele => {return ele.data()});
    const siblingsData = ele.siblings().map(ele => {return ele.data()});

    const {timeStamp} = event;
    const {
      classes,
      data,
      grabbable,
      group,
      locked,
      position,
      selected,
      selectable
    } = ele.json();

    let parentData;
    if (parent) {
      parentData = parent.data();
    } else {
      parentData = null;
    }

    const nodeObject = {
      // Nodes attributes
      edgesData,
      renderedPosition,
      timeStamp,
      // From ele.json()
      classes,
      data,
      grabbable,
      group,
      locked,
      position,
      selectable,
      selected,
      // Compound Nodes additional attributes
      ancestorsData,
      childrenData,
      descendantsData,
      parentData,
      siblingsData,
      isParent,
      isChildless,
      isChild,
      isOrphan,
      relativePosition,
      // Styling
      style
    };
    return nodeObject;
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
          layout={{ 'name': 'preset', 'padding': 50 }}
          cy={(cy) => {
            cy.on('tap', 'node', event => {
              const nodeObject = this.generateNode(event);
              console.log('nodeObject:', nodeObject);           
            })
          }}
          stylesheet={[
            {
              selector: "core",
              style: {
                "active-bg-color": "#fff",
                "active-bg-opacity": 0.333
              }
            },
            {
              selector: "edge",
              style: {
                "curve-style": "haystack",
                "haystack-radius": 0,
                "opacity": 0.333,
                "width": 2,
                "z-index": 0,
                "overlay-opacity": 0,
                "events": "no"
              }
            },
            {
              selector: "node",
              style: {
                "width": 40,
                "height": 40,
                "font-size": 10,
                "font-weight": "bold",
                "min-zoomed-font-size": 4,
                "content": "data(name)",
                "text-valign": "center",
                "text-halign": "center",
                "color": "#000",
                "text-outline-width": 2,
                "text-outline-color": "#fff",
                "text-outline-opacity": 1,
                "overlay-color": "#fff"
              }
            },
            {
              selector: 'edge[interaction = "cc"]',
              style: {
                "line-color": "#FACD37",
                "opacity": 0.666,
                "z-index": 9,
                "width": 4,
              }
            },
            {
              selector: 'node[NodeType = "Cheese"],node[NodeType = "CheeseType"]',
              style: {
                "background-color": "#FACD37",
                "text-outline-color": "#FACD37",
                "width": "mapData(Quality, 70, 100, 20, 50)",
                "height": "mapData(Quality, 70, 100, 20, 50)",
              }
            },
            {
              selector: 'node[NodeType = "WhiteWine"]',
              style: {
                "background-color": "white",
                "text-outline-color": "white"
              }
            },
            {
              selector: 'edge[interaction = "cw"]',
              style: {
                "line-color": "white"
              }
            },
            {
              selector: 'node[NodeType = "RedWine"]',
              style: {
                "background-color": "#DE3128",
                "text-outline-color": "#DE3128"
              }
            },
            {
              selector: 'edge[interaction = "cr"]',
              style: {
                'line-color': '#DE3128'
              }
            },
            {
              selector: 'node[NodeType = "Cider"]',
              style: {
                'background-color': '#A4EB34',
                'text-outline-color': '#A4EB34'
              }
            },
            {
              selector: 'node.highlighted',
              style: {
                'min-zoomed-font-size': 0,
                'z-index': 9999
              }
            },
            {
              selector: 'edge.highlighted',
              style: {
                "opacity": 0.8,
                "width": 4,
                "z-index": 9999
              }
            },
            {
              selector: '.faded',
              style: {
                "events": "no"
              }
            },
            {
              selector: 'node.faded',
              style: {
                'opacity': 0.08
              }
            },
            {
              selector: 'edge.faded',
              style: {
                'opacity': 0.06
              }
            },
            {
              selector: '.hidden',
              style: {
                'display': 'none'
              }
            },
            {
              selector: '.highlighted',
              style: {

              }
            },
            {
              selector: 'node:selected',
              style: {
                'width': 40,
                'height': 40,
                'border-color': 'rgb(187, 219, 247)',
                'border-opacity': 0.5,
                'border-width': 10
              }
            },
            {
              selector: '.filtered',
              style: {
                'display': 'none'
              }
            }
          ]}

        />
      </>
    );
  }

}

export default App;
