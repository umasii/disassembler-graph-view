# Disassembler Graph View

Fork of https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-nextjs for the purpose of viewing the control flow of bytecode functions. All the code I wrote is in `src/components/Flow/getNodes.tsx`.

for the disassembler, see https://github.com/umasii/ips-disassembler.

To see the graph of a function, change the argument to `getFunctionNodes()`in `src/components/Flow/index.tsx`.

Doesn't really have code to read files right now as I can't figure out how that works with Next.JS. For the time being, edit `functions.js` and `branches.js` in the src directory and export the output of my disassembler. I plan on fixing this soon.

Just as a disclaimer, I have no frontend experience so please don't judge this code too hard. Pull requests welcome.

Doesn't yet include branches that are indicated by `N` and `I` values, and the redundant branch block splitting algorithm is not as optimal as it could be. Specifically, there are certain ignorable cases based on the length of each block.

## Installation

```sh
npm install
```

### Start Dev Server

```sh
npm run dev
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
![alt text](https://github.com/umasii/disassembler-graph-view/blob/main/example.jpeg?raw=true)
