---
sidebar_label: 'Introduction'
sidebar_position: 1
---

# Topology Protocol

# Overview

This is the official TypeScript implementation of the Topology Protocol. The Topology Protocol is a local-first decentralized protocol for real-time applications. It introduces a new concept for Conflict-free Replicated Objects (CRO), that are built on top of libp2p and composed of CRDTs.

# Specifications

The specifications of the Topology Protocol are shared across different client implementations and can be found in the [specs repository](https://github.com/topology-foundation/specs). Currently the specifications are starting to be written based on this implementation.

# Packages

This repository is a monorepo that contains the following packages:

| Package | Description                                      |
|---------|--------------------------------------------------|
| crdt    | CRDT implementations intended to use as builtins |
| network | Network middleware to abstract libp2p            |
| node    | Topology Node library and CLI                    |
| object  | CRO objects structure implementation             |

# Examples

All the examples are located in the `examples` directory. Currently, there is two example, a simple canvas where you can paint pixels and a chat application. You can also look into the [counter-splash](https://github.com/topology-foundation/counter-splash) (demo for EthCC 2024) repository for a more complex example.
