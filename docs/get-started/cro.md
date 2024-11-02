---
sidebar_label: '5. CRO'
sidebar_position: 5
---

# CRO

A **CRO** is a **Conflict-free Replicated Object**. It is a programmable object that can be updated concurrently in real time and subscribed to as a **PubSub** group on an open P2P network.

Here is a snippet from the pseudocode of defining a CRO:
```
type CRO {
    operations: string[];
    semanticsType: SemanticsType = {pair-wise or group-wise};
    resolveConflicts: (vertices: Vertex[]) returns Action;
    mergeCallback: (operations: Operation[])
}
```
Let's break it down.

Firstly, we need to define an array of operations that can be applied to the CRO. Then we need to specify the semantics ([conflict resolution rules](./conflict.md)) of the CRO. Currently there are two types of conflict resolution: pair-wise and group-wise.

Pair-wise conflict resolution always analyzes two conflicting operations at a time. Group-wise conflict resolution analyzes all conflicting operations at once. The choice of conflict resolution type depends on the application requirements. 

The `resolveConflicts` function needs to be implemented and is used as the judge to handle conflicting operations. It takes an array of vertices and returns an _action_. What exactly is an _action_? 
Action involves dropping (removing) some operations or changing the order of operations. The action is defined as a tuple of two elements: the first element is the action type (drop, swap), and the second element is an array of hashes if we want to act on a larger subset of operations. 

If the `semanticsType` is pair-wise, the `vertices` array only has two elements. In this case, an _action_, among others, can be `dropLeft` (the one earlier in the topological sort), `dropRight` or `Swap` (the order of the two conflicting operations).

Lastly, we need to implement the `mergeCallback` function. The underlying data structure is the [hashgraph](./hashgraph.md). All merging is completed automatically by the hashgraph. The `mergeCallback` function is called after the hashgraph has merged the operations. It is used to notify the application that the merge has been completed, and the final state of the CRO has been updated.

Now let's take a look at a tangible example of **conflicting** operations in a CRO.
Let the CRO be a [pile of sand](https://blog.topology.gg/the-origins-of-topology-from-ledgers-to-sandcastles-part-2/). We have Alice and Bob, starting from an identical pile. Then Alice flattens the pile, but Bob molds a sphere. The operations are conflicting, so what do we do? A logical conflict resolution behaviour in this situation would be to mold the pile into a sphere first and then flatten it out for both Alice and Bob. 

Let's imagine a CRO, which is a set of integers. The operations are add(number) and remove(number). If Alice adds 5 and Bob removes 5 [concurrently](./concurrency.md), we can define conflict resolution mechanism as "addition wins". 

```
resolveConflicts(vertices: V1, V2): Action {
    if (V1.operation == "add") {
        return Action(drop, V2);
    } else {
        return Action(drop, V1);
    }
}
```

---
