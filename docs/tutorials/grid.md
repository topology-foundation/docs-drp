---
sidebar_label: "Grid"
sidebar_position: 2
---

# Grid

A simple multiplayer 2D Grid where players can move on the grid one space at a time.

## What you'll be building?

We'll attempt to build a 2D Grid space using topology where users appears to be circle on a grid and can move around one space at a time.

Our end result should look something like this:

![grid example gif](imgs/grid-2d-example.gif)

## Setup for the tutorial

First we'll have to setup our dev environment. I'll be using vite here with typescript.

```bash
npm create vite@latest grid-2d -- --template vanilla-ts
```

This should create a simple typescript project with typescript. You should be able to see a project structure similar to what's shown below.

![project structure](imgs/grid_project_structure.png)

> Note: While we're using vanilla TypeScript here, you could adapt this tutorial to work with frameworks like React or Vue!

Now, let's get the dependencies we need for building a CRO and connecting to the topology network.

```bash
npm i @topology-foundation/object @topology-foundation/node
```

In order to make sure that the dependency would build successfully we will also need some changes to the vite configurations.

```bash
npm i -D vite-plugin-node-polyfills
```

And then add a new file called `vite.config.mts` at the root of the application, with the following content.

```ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [nodePolyfills()],
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
});
```

Let's remove some files in the projects that we don't need. Remove `src/counter.ts`, `src/style.css` and `src/typescript.svg`, and delete the contents of `src/main.ts`.

With that, you should have most if not all of what we need for this project!

## Building the Grid logic

First off, let's try to define clearly what we want to build. 

- 2D grid
- Users can move one space at a time on the grid
- Movement is possible in four directions: `UP`, `DOWN`, `LEFT`, and `RIGHT`
- Multiple users should be able to interact with the grid

With this idea in mind, let's start with a basic object-oriented approach. Create a new file at `src/grid.ts` and with the below code:

```ts
export class Grid {
  positions: Map<string, { x: number; y: number }>;

  constructor() {
    this.positions = new Map<string, { x: number; y: number }>();
  }

  addUser(userId: string) {
    // User all start at 0,0
    this.positions.set(userId, { x: 0, y: 0 });
  }
  moveUser(userId: string, direction: "UP" | "DOWN" | "LEFT" | "RIGHT") {
    // Check if user exist
    const user = [...this.positions.keys()].find((u) => u === userId);

    if (user) {
      const currentPos = this.getUserPosition(userId);
      if (currentPos) {
        switch (direction) {
          case "UP":
            currentPos.y += 1;
            break;
          case "DOWN":
            currentPos.y -= 1;
            break;
          case "LEFT":
            currentPos.x -= 1;
            break;
          case "RIGHT":
            currentPos.x += 1;
            break;
        }
      }
    }
  }

  getUsers() {
    // Get all users on the grid
    return [...this.positions.keys()];
  }

  getUserPosition(userId: string) {
    // Get where user are on the grid.
    const currentPos = this.positions.get(userId);
    return currentPos ? currentPos : undefined;
  }
}
```

The above definition should be quite straightforward; the Grid can add user, move user, and get some information regarding the user. We can define the position of the user on the Grid as (x,y) coordinate as well.

Now, let's turn this into a `CRO`!

## Implementing the CRO interface.

To build a CRO, we''ll have to implement the `CRO` interface.

```ts
import { CRO } from "@topology-foundation/object";

export class Grid implements CRO {
  // ... code ...
```

When you add this interface, TypeScript will show errors indicating that we haven't fully implemented the `CRO` interface. Let's examine the CRO interface:

```ts
export interface CRO {
  operations: string[];
  semanticsType: SemanticsType;
  resolveConflicts: (vertices: Vertex[]) => ResolveConflictsType;
  mergeCallback: (operations: Operation[]) => void;
}
```

Let's walk over the details of the interface:

- `operations`: Defines the allowed state-changing actions, in our case, `addUser` and `moveUser`
- `semanticsType`: Determines the concurrency semantics of the `CRO`, either handling operations pairwise (`SematicType.pair`) or in groups (`SematicType.multiple`).
- `resolveConflicts`: Specifies how to handle conflicting operations
- `mergeCallback`: Defines how to apply operations to update the local state

Let's add in the implementation! First add the required fields:

```ts
export class Grid {
  positions: Map<string, { x: number; y: number }>;
  operations: string[] = ["addUser", "moveUser"];
  semanticsType: SemanticsType = SemanticsType.pair

  constructor() {
    this.positions = new Map<string, { x: number; y: number }>();
  }

//   ... more code ..
```

Now let's add in the methods:

```ts
	resolveConflicts(vertices: Vertex[]): ResolveConflictsType {
		return { action: ActionType.Nop };
	}

	mergeCallback(operations: Operation[]): void {
		// reset this.positions
		this.positions = new Map<string, { x: number; y: number }>();

		// apply operations to this.positions
		for (const op of operations) {
			if (!op.value) continue;
			switch (op.type) {
				case "addUser": {
					const [userId] = op.value;
					this.addUser(userId);
					break;
				}
				case "moveUser": {
					const [userId, direction] = op.value;
					this.moveUser(userId, direction);
					break;
				}
			}
		}
	}
```

Here, the `mergeCallback` method will update the positions the user have locally on their machine to based on the operation received.

We implement `resolveConflicts` to simply return `ActionType.Nop` which tells the `CRO` not to do anything when a conflict is detected. This is done as we expect each user to only be able to move themselves.


## Setting up our topology node

With our Grid CRO implemented, let's now start to setup the topology node and connect to the network. Open your `src/main.ts` file and add this in:

```ts
import { TopologyNode } from "@topology-foundation/node";
import type { TopologyObject } from "@topology-foundation/object";

const node = new TopologyNode();
let topologyObject: TopologyObject;

async function main() {
	await node.start();

	node.addCustomGroupMessageHandler("", (e) => {
		const peers = node.networkNode.getAllPeers();
		const discoveryPeers = node.networkNode.getGroupPeers(
			"topology::discovery",
		);
		console.log("peers:", peers);
		console.log("discoveryPeers:", discoveryPeers);
	});
}

main();
```

What we essentially are doing here is initialize and start a `TopologyNode` and then add a group message handler to it, which listens to broadcasted messages by its peers, and then when message is received, get all the `peers`, which are all the nodes that our current node has connection to, and `discoveryPeers`, which are the nodes that is interested in the `topology:discovery` topic.

Now we can start the application:

```bash
npm run dev
```

Go to `http://localhost:5173` and you should see something like this in the developer console.

![alt text](imgs/grid-2d-browser-console-node-1.png)

Congratulations! You now have a topology node running!


## Building the Grid itself

Now let's get some visualization up and running!

Remember, what we need is a simple **2D grid that allows users to move one space at a time**. Let's open the `index.html` file and start to add some UI components to it.

```html
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Change the title here -->
    <title>Topology - Grid</title>
  </head>
  <body>
    <div>
      <p>Your Peer ID: <span id="peerId"></span></p>
      <p>Peers on dRAM: <span id="peers"></span></p>
      <p>Discovery Peers: <span id="discoveryPeers"></span></p>

      <button id="createGrid">Spawn a new Grid CRO</button>
      <span style="margin: 0 10px;">|</span>
      <input id="gridInput" type="text" placeholder="Enter Grid CRO ID" />
      <button id="joinGrid">Connect to existing Grid CRO</button>
      <p>
        Connected to Grid CRO ID:
        <span id="gridId" style="text-decoration: underline;"></span>
        <button id="copyGridId" style="margin-left: 10px; display: none;">
          Copy
        </button>
      </p>
      <p>Peers in CRO: <span id="objectPeers"></span></p>
    </div>

    <div
      id="grid"
      style="
        position: relative;
        width: 100%;
        height: 60vh;
        border: 1px solid black;
        overflow: hidden;
      "
    >
      <!-- Users will appear here -->
    </div>

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```


