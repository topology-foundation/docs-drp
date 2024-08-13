---
sidebar_label: 'Conflict-free Replicated Objects (CROs)'
sidebar_position: 3
---

# What are CROs?

**CROs** are composable programmable objects that can be updated in real time concurrently and subscribed to as **PubSub** groups on a open P2P network.

### *Blueprint*

A CRO is an instance of a ***blueprint*** that specifies the operations for each CRO. It can be created using built-in CRDTs presented in the protocol or by composing other existing ***blueprints***.

### Signaling

***Signaling*** is a CRO-level term to designate the way CROs interact with each other. A **signal** is originated from an operations at the sender CRO which is then tranformed into an operation at the receiver CRO.

A node that wants to send a cross-object signal needs to have the hash graphs of both the sender and receiver CROs locally. This is crucial for causality to work, where the signal needs to specify its causal dependencies in both sender and receiver CROs hash graphs.


### Interaction

Nodes interact with a given CRO through ***verbs***, which are a set of methods definded by the Topology Protocol. CROs are identified as **PubSub** groups where nodes only subscribe and publish on CROs they are interested in and all the nodes are connected peer-to-peer, as shown above.

<div align="center">
  ![alt text](../../static/img/cro.png)
  <br/>
  **Fig. 1:** Alice, Bob and Charlie are subscribed to CRO D, receiving all updates performed on that CRO.  
</div>

There is a set of core methods for CROs: 

1. **CREATE:** creates a new CRO as well as a new PubSub group.
2. **UPDATE:** perform an update (publish) on a given CRO.
3. **SUBSCRIBE:** subscribe to receive the updates performed on a given CRO.
4. **UNSUBSCRIBE:** unsubscribe and stop receiving updates on a given CRO.
5. **SYNC:** reconcile the operations histories on a given CRO between the local one and the remote one.


### Operation life cycle

When a node performs an update by generating an operation on a CRO, the operation is added to the node's local copy of the CRO hash graph. So, if a node performs a write and right after a read, the read is guaranteed to observe the right. With this, CROs provide **high availability** and **low latency**.