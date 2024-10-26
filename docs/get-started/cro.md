---
sidebar_label: '5. CRO'
sidebar_position: 5
---

# CRO

A **CRO** is a **Conflict-free Replicated Object**. It is a programmable object that can be updated concurrently in real-time and subscribed to as a **PubSub** group on an open P2P network.

Here is a snippet from the pseudocode of defining a CRO:
```
type CRO {
    operations: string[];
    semanticsType: SemanticsType = {pair-wise or group-wise};
    resolveConflicts: (vertices: Vertex[]) returns ResolveConflictsType;
    mergeCallback: (operations: Operation[])
}
```
Let's break it down.

Firstly, we need to define an array of operations that can be applied to the CRO. Then we need to specify the semantics ([conflict resolution rules](./conflict.md)) of the CRO. Currently there are two types of conflict resolution: pair-wise and group-wise.

Pair-wise conflict resolution always analyzes two conflicting operations at a time. Group-wise conflict resolution analyzes all conflicting operations at once. The choice of conflict resolution type depends on the application requirements. 

The `resolveConflicts` function needs to be implemented and is used as the judge to handle conflicting operations. It takes an array of vertices and returns a `ResolveConflictsType` object. If the `semanticsType` is pair-wise, the array only has two elements. The `ResolveConflictsType` is essensially only useful for the group-wise semantics, as it holds the hashes of conflicting vertices to be reduced (discarded).

Lastly, we need to implement the `mergeCallback` function. The underlying data structure is the [hashgraph](./hashgraph.md). All merging is completed automatically by the hashgraph. The `mergeCallback` function is called after the hashgraph has merged the operations. It is used to notify the application that the merge has been completed, and the final state of the CRO has been updated.

Now let's take a look at a tangible example of **conflicting** operations in a CRO.
Let the CRO be a [pile of sand](https://blog.topology.gg/the-origins-of-topology-from-ledgers-to-sandcastles-part-2/)

## TODO
- explain the structure of a CRO
    - state
    - constructor
    - functions
    - two "system functions": `resolveConflict()` and `mergeCallback()`
- provide pseudocode for a super simple CRO that still has conflict to resolve (i.e. resolveConflict is not empty)

---

## Old text
**CROs** are composable programmable objects that can be updated in real time concurrently and subscribed to as **PubSub** groups on a open P2P network.

A CRO is an instance of a ***blueprint*** that specifies the operations for each CRO. It can be created using built-in CRDTs presented in the protocol or by composing other existing ***blueprints***.

When a node performs an update by generating an operation on a CRO, the operation is added to the node's local copy of the CRO hash graph. So, if a node performs a write and right after a read, the read is guaranteed to observe the right. With this, CROs provide **high availability** and **low latency**.
