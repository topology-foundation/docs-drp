---
sidebar_label: '1. What is Topology?'
sidebar_position: 1
---

# Intro to Topology

A distributed system protocol enabling the real-time Internet.

## Background
Most applications on the Internet rely on centralized intermediaries to manage user interactions. This limits user autonomy and interoperability across applications.

Programmable blockchains are decentralized platforms where users own the software they deploy, and where software interoperability is a core value. However, blockchains rely on consensus mechanism for strong consistency. Coordination among geo-distributed nodes creates severe limit on speed.

We believe the Internet of the future must be real-time by default and strongly decentralized. The design of Topology Protocol expresses such belief.

## What is Topology?

Topology Protocol is a distributed system protocol. It aims to **make the Internet real-time by default**.

Key properties of the protocol:
- **Low Latency**: Essential for real-time interactions
- **Decentralization**: Reduces single points of failure
- **Scalability**: Handles large amounts of concurrent users, and reduces coupling between independent applications
- **Eventual Consistency**: any change to an application is reflected in all its participants as fast as the network conditions permit
- **Security**: Robust against Byzantine actors - those who deviate from the protocol whether intentionally or not

It is useful for making applications where many users interact in real time. Examples include video games, social media, and collaborative tools.

## Next
The following sections cover the most essential concepts:
- [Concurrency](./concurrency.md)
- [Hash Graph](./hashgraph.md)
- [Conflict](./conflict.md)
- [CRO](./cro.md)

for developers to start building applications with Topology Protocol.

---

Page last updated: November 8, 2024