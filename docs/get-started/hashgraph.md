---
sidebar_label: '3. Hash Graph'
sidebar_position: 3
---

# Hash Graph

## TODO
- Explain the high-level role of hash graph (a history of everything that happens to a CRO)
- Give one simple, friendly example of a hash graph
- Explain graph merges
- Explain eventual consistency
- Optional: explain light-cone

---
# Overview

Hashgraph is the secret sauce in CROs. It allows replicas to progress independently without needing to coordinate with each other at every step, which is a requirement in traditional consensus systems. Despite this independence, Hashgraph ensures that all replicas ultimately achieve the same final state. At its core, hashgraph encodes the operation history in a directed acyclic graph (DAG) where:
- Edges represent causal dependency relationships between operations
- Vertices contain both the operations and the hashes of their causal dependencies

More formally, each vertex can be defined as a tuple (u, D), where:
- u is the operation
- D is the set of hashed vertices that are its causal dependencies

This structure ensures that if operation u2 reports u1 as its causal dependency, then u2 must have happened after u1. By using a deterministic conflict resolution heuristic defined in the CRO, the union (or merging in topology's parlance) of hashgraphs is order-agnostic -- meaning the final state is the same even if different replicas merge hashgraphs from their replica peers in different orders.

<div align="center">
  
![Hash graph of a CRO](/img/hashgraph_new.png)

**Figure 1:** Hash graph of a CRO.
</div>


# HashGraph Merge
When two nodes synchronize their operation histories of the same CRO, they effectively merge their hash graphs. The merge operation performs the union of hashgraphs.

<div align="center">

![Merging hashgraphs](/img/hashgraph_merge.png)

**Figure 2:** Merging hashgraphs from CRO replicas P and Q.
</div>

# Eventual Consistency

Eventual consistency is a fundamental property of CROs that guarantees all replicas will eventually reach the same state, regardless of the order in which they receive and process operations. This is achieved through several key mechanisms:

1. **Causal History Preservation**: The hashgraph structure maintains the complete causal history of operations through its (u, D) vertex structure, ensuring that causally related operations are always processed in the correct order across all replicas.

2. **Deterministic Conflict Resolution**: When [concurrent](./concurrency.md) operations occur, the CRO's [conflict](./conflict.md) resolution rules ensure that all replicas resolve conflicts in exactly the same way, regardless of the order in which they receive the operations.

3. **Commutative Merging**: The merge operation is designed to be commutative, meaning that merging hashgraph A with B produces the same result as merging B with A. This property, combined with the sybil-resistant nature of the hashgraph structure, ensures that replicas converge to the same state regardless of the order of synchronization or the presence of malicious actors.

For example, consider three replicas (R1, R2, and R3) that receive operations in different orders:
- R1 receives operations in order: A -> B -> C
- R2 receives operations in order: B -> C -> A
- R3 receives operations in order: C -> A -> B

Despite these different orderings, after all replicas have synchronized with each other, they will all converge to the same final state. This convergence is guaranteed by the mathematical properties of the hashgraph structure, the deterministic nature of the conflict resolution mechanisms, and the robust causal dependency tracking built into the vertex structure.