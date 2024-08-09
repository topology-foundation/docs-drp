---
sidebar_label: 'What is Topology?'
sidebar_position: 1
---

# What is Topology?

**Topology** is a distributed system protocol designed for the Open Metaverse. It introduces a new abstraction called [**Conflict-free Replicated Objects (CRO)**](docs/Concepts/CRO.md), designed to build multiplayer programs and making them accessible to PubSub groups on the P2P network, taking advantage from the properties of [**Conflict-free Replicated Data Types (CRDT)**](docs/Concepts/CRDT/CRDTs.md).

To make Topology **Byzantine Fault Tolerance (BTF)** resistant, [**Hash Graphs**](docs/Concepts/Hash_Graphs.md) are used to provide **causal ordering** for CROs, creating immunity to **Sybil attacks**.


Nodes that implement the Topology Protocol form a P2P network that we refer to as [**decentralized Random Access Memory (dRAM)**](docs/Concepts/dRAM.md), a new decentralized network that powers lock-free asynchronous decentralized applications.

### Access Control

### Security