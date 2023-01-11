# Disassembler Graph View

Fork of `https://github.com/wbkd/react-flow-example-apps/tree/main/reactflow-nextjs` for the purpose of viewing the control flow of bytecode functions.

Doesn't really have code to read files right now as I can't figure out how that works with Next.JS. For the time being, create `functions.js` and `branches.js` in the src directory and export the output of my disassembler. I plan on fixing this soon.

Graphs can be very messy due to branch redundancy. A lot of the branch blocks have repeated instructions, and I'll be looking to cut down on this in the near future.

Just as a disclaimer, I have no frontend experience so please don't judge this code too hard. Pull requests welcome.

## Installation

```sh
npm install
```

### Start Dev Server

```sh
npm run dev
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
