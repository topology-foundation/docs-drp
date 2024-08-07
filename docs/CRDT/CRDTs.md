---
sidebar_position: 1
---

# Conflict-free Replicated Data Type (CRDT)

## Overview

Conflict-free Replicated Data Types (CRDTs) are data structures that are replicated across multiple nodes in a network, allowing multiple replicas to be updated independently and concurrently without synchronization but guaranteeing an eventual convergence of the replicas, providing `eventual consistency`.
There are two aproaches to CRDTs:

- **Operation-based CRDT**: also called **Commutative Replicated Data Types** (`CmRDT`), this replicas propagate state by transmiting the update operations, ensuring that these updates are delivered to all the other replicas.

- **State-based CRDT**: also called **Convergent Replicated Data Types** (`CmRDT`), this replicas propagate their full local state to other replicas, where those states are merged.

The Topology Protocol uses both approaches for each CRDT implementation.
- Explain what CRDTs are and how they work
- Explain how we use CRDTs in our project

## CRDTs Implementations
- [x] G-Counter
- [x] PN-Counter
- [x] G-Set
- [x] 2P-Set
- [x] LWW-Register
- [x] LWW-Element-Set
- [x] Infinite-Phase Set
- [ ] OR-Set
- [ ] RGA
- [ ] LSeq

## Usage

This package is intended to be used as a dependency for the Topology Protocol. However, you can use it as a standalone package. For that, you can install it using:

```bash
# yarn
yarn add @topology-foundation/crdt

# npm
npm install @topology-foundation/crdt
```

### Build

To build the package, you can run:

```bash
yarn build
```

### Tests

To run the tests, you can run:

```bash
yarn test
```
