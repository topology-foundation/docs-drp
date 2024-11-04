---
sidebar_label: '5. CRO'
sidebar_position: 5
---

# CRO

## Overview

A **CRO** is a **Conflict-free Replicated Object**.

It is a programmable object with two core capabilities:

1. **Real-time Multiplayer**: CRO can be updated concurrently in real time.
2. **P2P Propagation**: Each CRO can be identified and joined as a [PubSub group](https://docs.libp2p.io/concepts/pubsub/overview/) on an open P2P network. Each CRO has its own [P2P overlay](https://docs.libp2p.io/concepts/appendix/glossary/#overlay).

## Structure

Here is a pseudocode snippet defining a CRO:
```Javascript
type CRO {
    operations: string[];
    semanticsType: SemanticsType = {pair-wise or group-wise};
    resolveConflicts: (vertices: Vertex[]) returns Action;
    mergeCallback: (operations: Operation[])
}
```
Let's break it down.

### operations

We need to define what `operations` can be applied to the CRO. Each operation is identified by its name, which is a string.

### semanticsType

We need to specify `semanticsType`, the **type** of its **concurrency semantics** ([conflict resolution rules](./conflict.md)).

Currently there are two types of conflict resolution: pair-wise and group-wise.

- The pair-wise type always analyzes two conflicting operations at a time.
- The group-wise type analyzes all conflicting operations at once

The choice here depends on the application requirements.

### resolveConflicts

The `resolveConflicts` function implements the CRO's conflict resolution rules.

The function
- takes a **vertex array**, each vertex containing one operation
- returns an **Action** to be performed on the vertex array

What exactly is an Action? An Action either drops some operations or changes the order of them.

The example section below demonstrates the use of Action.

### mergeCallback

Lastly, we need to implement the `mergeCallback` function.

CRO uses [hashgraph](./hashgraph.md) as its causal log of operations. Hashgraph incorporates new operations by merging them into itself. Every time this happens, `mergeCallback` function is called. Its purpose is to recompute the CRO state using the updated hashgraph.

The function
- takes a sequence of operations
- returns nothing

The sequence of operations came from [topologically sorting](https://en.wikipedia.org/wiki/Topological_sorting) the hashgraph while following the CRO's own conflict resolution rules.

## Example

Let's revisit our single-number CRO that accepts addition and multiplication from [the previous section](./conflict.md).

Its `operations` would be

```Javascript
['addition', 'multiplication']
```

Its `semanticsType` would be

```Javascript
SemanticsType.pair
```

Using "multiplication first" to resolve conflicts, its `resolveConflicts` would look like

```Javascript
resolveConflicts(vertices){
    // if the first vertex is an addition, swap it with the second vertex
    // otherwise, do nothing
    if (vertices[0].operation == 'addition') {
        return Action(ActionType.Swap)
    }
    else {
        return Action(ActionType.Nop)
    }
}
```

Finally, `mergeCallback` would compute the CRO state given its hashgraph:

```Javascript
mergeCallback(operations){
    // reset CRO state
    this.state = 0

    // iterate through operations and apply them
    for (const o of operations) {
        switch (o.type) {
            case "addition": {
                this.state += o.value
                break
            }
            case "multiplication": {
                this.state *= o.value
                break
            }
        }
    }
}
```
