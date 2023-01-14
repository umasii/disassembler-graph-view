import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';


class LayoutFlow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: []
    }
  }

  componentDidMount() {
    const position = { x: 0, y: 0 };
    const edgeType = 'smoothstep';
    const array = [{ id: "1", data: "node 1", output: ["2", "3"] }, { id: "2", data: "node 2", output: ["2a", "2b", "2c"] }, { id: "3", data: "node 3" },
    { id: "2a", data: "node 2a" }, { id: "2b", data: "node 2b" }, { id: "2c", data: "node 2c", output: ["2d"] }, { id: "2d", data: "node 2d" }
    ]
    const newArray = []
    const k = 0
    array.map((ele, i) => {
      newArray.push({ id: ele.id, data: { label: <div><h3>{ele.data}</h3><h4>This is a node</h4></div> }, position, connectable: false })
    })
    array.map((ele, i) => {
      if (ele.output !== undefined && ele.output !== null) {
        ele.output.map((element, p) => {
          newArray.push({ id: "e" + ele.id + element, source: ele.id, target: element, type: edgeType })
        })
      }
    })
    this.setState({ elements: newArray }, () => {

      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));
      const getLayoutedElements = (elements, direction = 'TB') => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });
        elements.forEach((el) => {
          if (isNode(el)) {
            dagreGraph.setNode(el.id, { width: 300, height: 150 });
          } else {
            dagreGraph.setEdge(el.source, el.target);
          }
        });
        dagre.layout(dagreGraph);
        return elements.map((el) => {
          if (isNode(el)) {
            const nodeWithPosition = dagreGraph.node(el.id);
            el.targetPosition = isHorizontal ? 'left' : 'top';
            el.sourcePosition = isHorizontal ? 'right' : 'bottom';
            el.position = {
              x: nodeWithPosition.x + Math.random() / 1000,
              y: nodeWithPosition.y,
            };
          }
          return el;
        });
      };
      const layoutedElements = getLayoutedElements(this.state.elements);

    })
  }

  onConnect = (params) => {
    this.setState((els) =>
      addEdge({ ...params, type: 'smoothstep' }, els))
  }

  render() {
    return (
      <div className="layoutflow" style={{ width: 10000, height: 10000 }}>
        <ReactFlowProvider>
          <ReactFlow
            elements={this.state.elements}
            onConnect={this.onConnect}
            connectionLineType="smoothstep"
          />
        </ReactFlowProvider>
      </div>
    );
  }

}
export default LayoutFlow;