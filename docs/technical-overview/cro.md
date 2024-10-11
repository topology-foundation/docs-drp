---
sidebar_label: 'Conflict-free Replicated Objects (CROs)'
sidebar_position: 3
---

# What are CROs?

**CROs** are composable programmable objects that can be updated in real time concurrently and subscribed to as **PubSub** groups on a open P2P network.

### *Blueprint*

A CRO is an instance of a ***blueprint*** that specifies the operations for each CRO. It can be created using built-in CRDTs presented in the protocol or by composing other existing ***blueprints***.

### Operation life cycle

When a node performs an update by generating an operation on a CRO, the operation is added to the node's local copy of the CRO hash graph. So, if a node performs a write and right after a read, the read is guaranteed to observe the right. With this, CROs provide **high availability** and **low latency**.

### References

- Thomas Hsueh. *Topology Protocol: A Distributed System Protocol
For The Open Metaverse*. 2024 