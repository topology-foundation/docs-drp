---
sidebar_label: '5. DRP program'
sidebar_position: 5
---

# DRP program

DRP programs enable real-time decentralized applications.

## Object

A DRP program is a programmable object with two core capabilities:

1. **Real-time Multiplayer**: concurrently writeable in real time.
2. **P2P Propagation**: each object is identifiable and joinable as a [PubSub group](https://docs.libp2p.io/concepts/pubsub/overview/) on an open P2P network. Each object has its own [P2P overlay](https://docs.libp2p.io/concepts/appendix/glossary/#overlay).

## Structure

Here is a pseudocode snippet defining a DRP program:

```Javascript
type DRPObject {
    operations: string[];
    semanticsType: SemanticsType = {pair-wise or group-wise};
    resolveConflicts: (vertices: Vertex[]) returns Action;
}
```
Let's break it down.

### operations

We need to define what `operations` can be applied to the program. Each operation is identified by its name, which is a string.

### semanticsType

We need to specify `semanticsType`, the **type of its concurrency semantics** ([conflict resolution rules](./conflict.md)).

Currently there are two types of conflict resolution: **pair-wise** & **group-wise**.

- The pair-wise type always analyzes two conflicting operations at a time.
- The group-wise type analyzes all conflicting operations at once.

The choice here depends on the application requirements.

### resolveConflicts

The `resolveConflicts` function implements the program's conflict resolution rules.

The function
- takes a **vertex array**, each vertex containing one operation
- returns an **Action** to be performed on the vertex array

What exactly is an Action? An Action either drops some operations or changes the order of them.

The example section below demonstrates the use of Action.

## Example

Let's revisit our single-number program that accepts addition and multiplication from [the previous section](./conflict.md).

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

## Further Reading
- [Documentation of the DRP program interface](https://topology-foundation.github.io/ts-topology/interfaces/_topology_foundation_object.CRO.html)

---

Page last updated: November 28, 2024