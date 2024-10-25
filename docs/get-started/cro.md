---
sidebar_label: '5. CRO'
sidebar_position: 5
---

# CRO

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
