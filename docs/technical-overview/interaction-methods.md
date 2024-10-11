---
sidebar_label: "Interaction Methods"
sidebar_position: 5
---

# Interaction Methods

Nodes interact with a given CRO through **_verbs_**, which are a set of methods definded by the Topology Protocol. CROs are identified as **PubSub** groups where nodes only subscribe and publish on CROs they are interested in and all the nodes are connected peer-to-peer, as shown above.

<div align="center">
  ![alt text](/img/cro.png)
  <br/>
  **Figure 1:** Alice, Bob and Charlie are subscribed to CRO D, receiving all updates performed on that CRO.
</div>

There is a set of core methods for CROs:

1. **CREATE:** creates a new CRO as well as a new PubSub group.
2. **UPDATE:** perform an update (publish) on a given CRO.
3. **SUBSCRIBE:** subscribe to receive the updates performed on a given CRO.
4. **UNSUBSCRIBE:** unsubscribe and stop receiving updates on a given CRO.
5. **SYNC:** reconcile the operations histories on a given CRO between the local one and the remote one.

### References

- Thomas Hsueh. _Topology Protocol: A Distributed System Protocol
  For The Open Metaverse_. 2024
