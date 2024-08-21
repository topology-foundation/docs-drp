---
sidebar_position: 4
---

# 2P-Set (Two-Phase Set)

The **2P-Set** consists on combining two **G-Sets**, where on of these is going to work as a remove set (also called *tombstone* set). This way, the 2P-Set allows elements to be removed. When an element is removed, its added to the *tombstone* set and once an element is in the *tombstone* set, it cannot be re-added. To avoid anomalies, it is not possible to remove an element that it is not present in the 2P-Set.

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)

- Shapiro, Marc; Preguiça, Nuno; Baquero, Carlos; Zawirski, Marek. *A Comprehensive Study of Convergent and Commutative Replicated Data Types*. 2011