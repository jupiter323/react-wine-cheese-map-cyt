import React from 'react';
import './App.css';
import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import data from './assets/data.json'
import _ from 'lodash'
import Information from './components/Information'
import Search from './components/Search';
const stylesheet = [
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
]
class App extends React.Component {
  elements = []
  nodes = []
  layoutPadding = 50;
  aniDur = 500;
  easing = 'linear';
  allNodes = null;
  allEles = null;
  lastHighlighted = null;
  lastUnhighlighted = null;
  cy = null;


  constructor(props) {
    super(props)
    this.state = {
      infoShow: false,
      node: {}
    }
  }

  componentWillMount() {
    data.elements.nodes.forEach(function (n) {
      var data = n.data;

      data.NodeTypeFormatted = data.NodeType;

      if (data.NodeTypeFormatted === 'RedWine') {
        data.NodeTypeFormatted = 'Red Wine';
      } else if (data.NodeTypeFormatted === 'WhiteWine') {
        data.NodeTypeFormatted = 'White Wine';
      }

      n.data.orgPos = {
        x: n.position.x,
        y: n.position.y
      };
    });
    this.elements = this.nodes = data.elements.nodes
    this.elements = this.elements.concat(data.elements.edges)
  }

  componentDidMount() {
    this.cy.on('free', 'node', (e) => {
      var n = e.cyTarget;
      var p = n.position();

      n.data('orgPos', {
        x: p.x,
        y: p.y
      });
    });

    this.cy.on('select unselect', 'node', _.debounce((e) => {
      const node = this.generateNode(e);
      this.setState({ node })
      if (node.selected) {
        this.showNodeInfo();

        Promise.resolve().then(() => {
          return this.highlight(node);
        });
      } else {
        this.hideNodeInfo();
        this.clear();
      }

    }, 100));

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
    const closedNeighborhood = ele.closedNeighborhood()
    const nonempty = ele.nonempty()
    // Trim down the element objects to only the data contained
    const edgesData = ele.connectedEdges().map(ele => { return ele.data() });
    const childrenData = ele.children().map(ele => { return ele.data() });
    const ancestorsData = ele.ancestors().map(ele => { return ele.data() });
    const descendantsData = ele.descendants().map(ele => { return ele.data() });
    const siblingsData = ele.siblings().map(ele => { return ele.data() });

    const { timeStamp } = event;
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
      style,
      closedNeighborhood,
      nonempty

    };
    return nodeObject;
  }

  restoreElesPositions = (nhood) => {
    return Promise.all(nhood.map((ele) => {
      var p = ele.data('orgPos');

      return ele.animation({
        position: { x: p.x, y: p.y },
        duration: this.aniDur,
        easing: this.easing
      }).play().promise();
    }));
  };

  clear = () => {
    if (!this.isDirty()) { return Promise.resolve(); }
    this.cy.stop();
    this.allNodes.stop();

    var nhood = this.lastHighlighted;
    var others = this.lastUnhighlighted;

    this.lastHighlighted = this.lastUnhighlighted = null;

    var hideOthers = () => {
      return new Promise(resolve => setTimeout(() => {
        others.addClass('hidden');
        return resolve(new Promise(resolve => setTimeout(resolve, 125)))
      }, 125))

    };

    var showOthers = () => {
      this.cy.batch(() => {
        this.allEles.removeClass('hidden').removeClass('faded');
      });

      return new Promise((resolve) => setTimeout(resolve, this.aniDur))
    };

    var restorePositions = () => {
      this.cy.batch(() => {
        others.nodes().forEach((n) => {
          var p = n.data('orgPos');

          n.position({ x: p.x, y: p.y });
        });
      });

      return this.restoreElesPositions(nhood.nodes());
    };

    var resetHighlight = () => {
      nhood.removeClass('highlighted');
    };

    return Promise.resolve()
      .then(resetHighlight)
      .then(hideOthers)
      .then(restorePositions)
      .then(showOthers)
      ;
  }

  showNodeInfo = () => {
    this.setState({ infoShow: true })
  }

  hideNodeInfo = () => {
    this.setState({ infoShow: false })
  }

  isDirty = () => {
    return this.lastHighlighted != null;
  }

  highlight = (node) => {
    var oldNhood = this.lastHighlighted;

    var nhood = this.lastHighlighted = node.closedNeighborhood;
    var others = this.lastUnhighlighted = this.cy.elements().not(nhood);
    var that = this
    var reset = function () {
      that.cy.batch(function () {
        others.addClass('hidden');
        nhood.removeClass('hidden');

        that.allEles.removeClass('faded highlighted');

        nhood.addClass('highlighted');

        others.nodes().forEach((n) => {
          var p = n.data('orgPos');

          n.position({ x: p.x, y: p.y });
        });
      });

      return Promise.resolve().then(function () {
        if (that.isDirty()) {
          return fit();
        } else {
          return Promise.resolve();
        };
      }).then(function () {
        return new Promise(resolve => setTimeout(resolve, that.aniDur))
      });
    };

    var runLayout = () => {
      var p = node.data['orgPos'];
      var l = nhood.filter(':visible').makeLayout({
        name: 'concentric',
        fit: false,
        animate: true,
        animationDuration: that.aniDur,
        animationEasing: that.easing,
        boundingBox: {
          x1: p.x - 1,
          x2: p.x + 1,
          y1: p.y - 1,
          y2: p.y + 1
        },
        avoidOverlap: true,
        concentric: function (ele) {
          if (ele.same(node)) {
            return 2;
          } else {
            return 1;
          }
        },
        levelWidth: function () { return 1; },
        padding: that.layoutPadding
      });

      var promise = this.cy.promiseOn('layoutstop');

      l.run();

      return promise;
    };

    var fit = () => {
      return this.cy.animation({
        fit: {
          eles: nhood.filter(':visible'),
          padding: this.layoutPadding
        },
        easing: this.easing,
        duration: this.aniDur
      }).play().promise();
    };

    var showOthersFaded = () => {
      return setTimeout(() => {
        this.cy.batch(function () {
          others.removeClass('hidden').addClass('faded');
        });
      }, 250);
    };

    return Promise.resolve()
      .then(reset)
      .then(runLayout)
      .then(fit)
      .then(showOthersFaded)
      ;

  }

  handleCy = (cy) => {
    this.allNodes = cy.nodes();
    this.allEles = cy.elements();
    this.cy = cy;
  }

  render() {
    var { infoShow, node } = this.state
    return (
      <>
        <CytoscapeComponent
          className="cy"
          elements={this.elements}
          motionBlur={true}
          selectionType={"single"}
          boxSelectionEnabled={false}
          autoungrabify={true}
          layout={{ 'name': 'preset', 'padding': this.layoutPadding }}
          cy={this.handleCy}
          stylesheet={stylesheet}

        />

        <Search elements={this.nodes} />
        {node.data && <Information className={infoShow ? "info" : "hidden"} data={node.data} />}
      </>
    );
  }

}

export default App;
