---
sidebar_label: '2. Concurrency'
sidebar_position: 2
---

# Concurrency

## TODO
- explain things can happen concurrently
- explain causality
- don't involve math

## A Simple Example

After explaining the topology protocol and defining the CRO, this section aims to provide a detailed description of concurrency. Let’s start with a simple example: consider a CRO term, "Topology". Alice wants to make it bold, resulting in **"Topology"**. Bob wants to italicize it, resulting in *"Topology"*. If Alice's and Bob's operations occur concurrently, the term "Topology" is processed simultaneously, resulting in ***"Topology"***.

In the topology protocol, **concurrency** means that two operations on the same CRO occur at the same time. These operations are represented as two new vertices connected to the current vertex of the CRO. After propagation, they merge into a single new vertex, reflecting both changes.

## Revisiting the Example

Now, let’s dive deeper into the previous example. While Alice's and Bob's operations occur concurrently, they must be **serialized** during execution to reach the new state of the CRO. If Alice's operation is executed first, followed by Bob's, the state transitions as:

- "Topology" → **"Topology"** → ***"Topology"***

Conversely, if Bob's operation is executed first, followed by Alice's, the state transitions as:

- "Topology" → *"Topology"* → ***"Topology"***

Regardless of the execution order, the final state of the CRO is ***"Topology"***. This indicates that the two operations are **commutative**—they yield the same final result regardless of execution order.

However, the **intermediate states** differ depending on the execution order. To ensure consistent intermediate states across replicas, we need to introduce **causal ordering**.

## Causal Ordering

**Causal ordering** ensures that operations are applied according to their causal relationships. This means that if one operation logically depends on another, it will be applied afterward. In distributed systems, causality is maintained by tracking dependencies between operations, often using techniques like vector clocks. Causal ordering establishes a **partial order** that can be enforced without global coordination, helping maintain consistent states across replicas.

For example, if making the term bold must happen before italicizing it, causal ordering guarantees that the operations are applied in the correct sequence, resulting in the state transitions:

- "Topology" → **"Topology"** → ***"Topology"***

Without causal ordering, operations might be applied in an arbitrary order, potentially leading to inconsistent states across replicas.
