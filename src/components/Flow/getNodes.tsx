import styles from "./Flow.module.css";
import { Node, Edge } from "reactflow";
import branches from "../../branches.js";
import functions from "../../functions.js";

export function getFunctionNodes(ptr: string): [Node[], Edge[]] {
  let functionCode = functions[ptr as keyof typeof functions];
  let functionNode: Node = {
    id: ptr,
    data: {
      ptr: ptr,
      code: functionCode,
    },
    position: { x: 0, y: 200 },
    type: "function",
    className: styles.BranchNode,
  };

  let lastElement = functionCode[functionCode?.length - 1];
  if (!lastElement.includes("JUMP IF")) {
    return [[functionNode], []];
  }

  let branch1 = lastElement.split(":")[1].split("|")[0].trim();
  let branch2 = lastElement.split(":")[1].split("|")[1].trim();
  let scannedBranches: Set<string> = new Set();
  let pointers: string[][] = [];
  console.log(branch1);
  console.log(branch2);
  let branch1Nodes = getBranchNodes(branch1, ptr, scannedBranches, pointers);
  let branch2Nodes = getBranchNodes(branch2, ptr, scannedBranches, pointers);
  let nodes = [functionNode].concat(branch1Nodes[0]).concat(branch2Nodes[0]);
  let edges = branch1Nodes[1].concat(branch2Nodes[1]);
  console.log(edges);
  // console.log(pointers);
  for (let i = 0; i < nodes.length; i++) {
    // check if any of the pointer arrays have that node as a subset
    for (let j = 0; j < pointers.length; j++) {
      if (pointers[j].includes(nodes[i].id) && pointers[j][0] !== nodes[i].id) {
        // the node that created pointers[j] needs to be split, ie. nodes[j+1]
        let index = pointers[j].indexOf(nodes[i].id);
        // new node goes from start of superset, to begining of subset
        console.log("Problem:");
        console.log(nodes[j + 1]);
        let branchNode = {
          id: pointers[j][0],
          data: branches[pointers[j][0] as keyof typeof branches].slice(
            0,
            index
          ),
          position: { x: 300, y: 500 },
          type: "branch",
          className: styles.BranchNode,
        };
        console.log("New:");
        console.log(branchNode);
        console.log("Sub:");
        console.log(nodes[i]);
        // console.log(branchNode);

        // loop over edges
        let newEdges = [];
        let edgesToSplice = [];
        // for (let k = 0; k < edges.length; k++) {
        //   if (edges[k].source == pointers[j][0]) {
        //     edgesToSplice.push(edges[k]);
        //     newEdges.push({
        //       id: nodes[i].id + "-" + edges[i].target,
        //       source: nodes[i].id,
        //       sourceHandle: "a",
        //       target: edges[i].target,
        //     });
        //   }
        // }
        nodes.splice(j + 1, 1);
        nodes.splice(j + 1, 0, branchNode);
        // connect the new node with the sub node
        console.log("splicing");
        // edges.splice(edgesToSplice[i], 1);
        for (let k = 0; k < edges.length; k++) {
          if (edges[k].source == pointers[j][0]) {
            let edge = edges[k];
            edges.splice(k, 1);
            edges.splice(k, 0, {
              id: nodes[i].id + "-" + edge.target,
              source: nodes[i].id,
              sourceHandle: "a",
              target: edge.target,
            });
            // break;
          }
        }

        edges.push({
          id: pointers[j][0] + "-" + nodes[i].id,
          source: pointers[j][0],
          sourceHandle: "a",
          target: nodes[i].id,
        });
      }
    }
  }
  console.log("done");
  return [nodes, edges];
}

function getBranchNodes(
  ptr: string,
  source: string,
  scannedBranches: Set<string>,
  pointers: string[][]
): [Node[], Edge[]] {
  let branchEdge = {
    id: source + "-" + ptr,
    source: source,
    sourceHandle: "a",
    target: ptr,
  };
  if (scannedBranches.has(ptr)) {
    return [[], [branchEdge]];
  }
  scannedBranches.add(ptr);
  let branchCode = branches[ptr as keyof typeof branches];
  let branchNode = {
    id: ptr,
    data: branchCode,
    position: { x: 300, y: 500 },
    type: "branch",
    className: styles.BranchNode,
  };
  let scannedPointers = [];

  for (let i = 0; i < branchCode.length; i++) {
    scannedPointers.push(branchCode[i].split(" ")[0]);
  }
  pointers.push(scannedPointers);
  let lastElement = branchCode[branchCode?.length - 1];
  if (!lastElement.includes("JUMP IF")) {
    return [[branchNode], [branchEdge]];
  }

  let branch1 = lastElement.split(":")[1].split("|")[0].trim();
  let branch2 = lastElement.split(":")[1].split("|")[1].trim();
  let branch1Nodes = getBranchNodes(branch1, ptr, scannedBranches, pointers);
  let branch2Nodes = getBranchNodes(branch2, ptr, scannedBranches, pointers);
  // @ts-ignore
  let nodes = [branchNode].concat(branch1Nodes[0]).concat(branch2Nodes[0]);
  // @ts-ignore
  let edges = [branchEdge].concat(branch1Nodes[1]).concat(branch2Nodes[1]);

  return [nodes, edges];
}
