---
sidebar_position: 2
---

# PN-Counter

The **PN-Counter** combines **two G-Counters**, one for **increment** and another one for **decrement**. The value of the PN-Counter is the increment counter minus the decrement counter. This might lead to having large vectors, so to avoid this only **super-peers** should replicate the counter.

A PN-Counter might be useful to track the number of users logged in to an P2P application.

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)

- Shapiro, Marc; Preguiça, Nuno; Baquero, Carlos; Zawirski, Marek. *A Comprehensive Study of Convergent and Commutative Replicated Data Types*. 2011