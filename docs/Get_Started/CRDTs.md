# What are CRDTs?

Conflict-free Replicated Data Types (CRDTs) are data structures that are replicated across multiple nodes in a network. CRDTs key features are:

- **Eventual Consistency**: replicas can have different state at any time, but they're guaranteed to eventually converge, achieving a consistent state.
- **Concurrency**: a replica can be updated independently, concurrently and without coordination with other replicas.
- **Conflict-free**: replicas can be merged without conflicts or inconsistencies.

CRDTs are popular in collaborative real-time editing and in distributed systems, providing high availability and scalability. They're also useful in distributed systems where network latency or partitions make constant communication impratical.

### Types of CRDTs

There are two aproaches to CRDTs:

- **Operation-based CRDT**: also called **Commutative Replicated Data Types** (`CmRDT`), this replicas propagate state by transmiting the updated operations, ensuring that these updates are delivered to all the other replicas.

- **State-based CRDT**: also called **Convergent Replicated Data Types** (`CmRDT`), this replicas propagate their full local state to other replicas. Their state is then merged in other replicas, achieving consistency.

### CRDT Designs

There are several different CRDT implementations. To know more about each other, check out the next page.

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)
- [CRDT.tech, *https://crdt.tech/*](https://crdt.tech/)
- [dremio, *https://www.dremio.com/wiki/conflict-free-replicated-data-type/*](https://www.dremio.com/wiki/conflict-free-replicated-data-type/)