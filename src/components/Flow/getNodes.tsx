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
  let branch1Nodes = getBranchNodes(branch1, ptr, scannedBranches);
  let branch2Nodes = getBranchNodes(branch2, ptr, scannedBranches);
  let nodes = [functionNode].concat(branch1Nodes[0]).concat(branch2Nodes[0]);
  let edges = branch1Nodes[1].concat(branch2Nodes[1]);
  return [nodes, edges];
}

function getBranchNodes(
  ptr: string,
  source: string,
  scannedBranches: Set<string>
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
  let lastElement = branchCode[branchCode?.length - 1];
  if (!lastElement.includes("JUMP IF")) {
    return [[branchNode], [branchEdge]];
  }
  let branch1 = lastElement.split(":")[1].split("|")[0].trim();
  let branch2 = lastElement.split(":")[1].split("|")[1].trim();
  let branch1Nodes = getBranchNodes(branch1, ptr, scannedBranches);
  let branch2Nodes = getBranchNodes(branch2, ptr, scannedBranches);
  // @ts-ignore
  let nodes = [branchNode].concat(branch1Nodes[0]).concat(branch2Nodes[0]);
  // @ts-ignore
  let edges = [branchEdge].concat(branch1Nodes[1]).concat(branch2Nodes[1]);
  return [nodes, edges];
}
