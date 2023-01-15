import { Node, Edge } from 'reactflow'
import dagre from 'dagre'

import branches from '../../constants/branches.json'
import functions from '../../constants/functions.json'

const className = 'border-[1px] border-[#555] p-4 rounded'

export function getFunctionNodes(id: string): [Node[], Edge[]] {
  let code = functions[id as keyof typeof functions]

  let functionNode: Node = {
    id, data: { id, code },
    position: { x: 0, y: 200 },
    type: 'function',
    className
  }

  let lastElement = code[code?.length - 1]

  if (!lastElement.includes('JUMP IF')) {
    return [[functionNode], []]
  }

  let branch1 = lastElement.split(':')[1].split('|')[0].trim()
  let branch2 = lastElement.split(':')[1].split('|')[1].trim()

  let scannedBranches: Set<string> = new Set()
  let pointers: string[][] = []

  let branch1Nodes = getBranchNodes(branch1, id, scannedBranches, pointers)
  let branch2Nodes = getBranchNodes(branch2, id, scannedBranches, pointers)

  let nodes = [functionNode].concat(branch1Nodes[0]).concat(branch2Nodes[0])
  let edges = branch1Nodes[1].concat(branch2Nodes[1])

  // I think this is something like O(3n^3) roughly
  for (let i = 0; i < nodes.length; i++) {
    // check if any of the pointer arrays have that node as a subset
    for (let j = 0; j < pointers.length; j++) {
      if (pointers[j].includes(nodes[i].id) && pointers[j][0] !== nodes[i].id) {
        // the node that created pointers[j] needs to be split, ie. nodes[j+1]
        let index = pointers[j].indexOf(nodes[i].id)
        // new node goes from start of superset, to begining of subset
        let branchNode = {
          id: pointers[j][0],
          data: branches[pointers[j][0] as keyof typeof branches].slice(0, index),
          position: { x: 300, y: 500 },
          type: 'branch',
          className
        }

        nodes.splice(j + 1, 1)
        nodes.splice(j + 1, 0, branchNode)
        // loop over edges

        for (let k = 0; k < edges.length; k++) {
          if (edges[k].source == pointers[j][0]) {
            let edge = edges[k]
            edges.splice(k, 1)
            edges.splice(k, 0, {
              id: nodes[i].id + '-' + edge.target, // here two children with same key
              source: nodes[i].id,
              sourceHandle: 'a',
              target: edge.target
            })
          }
        }
        // connect the new node with the sub node
        edges.push({
          id: pointers[j][0] + '-' + nodes[i].id, // here
          source: pointers[j][0],
          sourceHandle: 'a',
          target: nodes[i].id
        })
      }
    }
  }

  edges = edges.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.id === value.id
    ))
  )

  return [nodes, edges]
}

function getBranchNodes(id: string, source: string, scannedBranches: Set<string>, pointers: string[][]): [Node[], Edge[]] {
  let branchEdge = {
    id: source + '-' + id,
    source,
    sourceHandle: 'a',
    target: id
  }
  if (scannedBranches.has(id)) {
    return [[], [branchEdge]]
  }
  scannedBranches.add(id)
  let branchCode = branches[id as keyof typeof branches]

  let branchNode = {
    id,
    data: branchCode,
    position: { x: 300, y: 500 },
    type: 'branch',
    className
  }
  let scannedPointers = []

  for (let i = 0; i < branchCode.length; i++) {
    scannedPointers.push(branchCode[i].split(' ')[0])
  }

  pointers.push(scannedPointers)

  let lastElement = branchCode[branchCode?.length - 1]

  if (!lastElement.includes('JUMP IF')) { return [[branchNode], [branchEdge]] }

  let branch1 = lastElement.split(':')[1].split('|')[0].trim()
  let branch2 = lastElement.split(':')[1].split('|')[1].trim()

  let branch1Nodes = getBranchNodes(branch1, id, scannedBranches, pointers)
  let branch2Nodes = getBranchNodes(branch2, id, scannedBranches, pointers)

  let nodes = [branchNode].concat(branch1Nodes[0] as any).concat(branch2Nodes[0] as any)

  let edges = [branchEdge].concat(branch1Nodes[1] as any).concat(branch2Nodes[1] as any)

  return [nodes, edges]
}
