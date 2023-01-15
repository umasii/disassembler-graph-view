import { useCallback, useEffect, useState } from 'react'
import ReactFlow, { Node, useNodesState, useEdgesState, addEdge, Connection, Edge, ConnectionLineType, Background, Controls } from 'reactflow'
import { BranchBlock, FunctionBlock } from './CustomNode'
import styles from './Flow.module.css'
import { getFunctionNodes } from './getNodes'

const nodeTypes = {
  branch: BranchBlock,
  function: FunctionBlock
}

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep'
}

interface IFlow {
  selectedPointer: string
}

function Flow({ selectedPointer }: IFlow) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  useEffect(() => {
    if (!selectedPointer) return
    var graph = getFunctionNodes(selectedPointer)
    const initialNodes = graph[0]
    const initialEdges = graph[1]
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [selectedPointer])

  return (
    <div className="grow">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <Background color="#aaaaaa5e" gap={16} />
      </ReactFlow>
    </div>
  )
}

export default Flow
