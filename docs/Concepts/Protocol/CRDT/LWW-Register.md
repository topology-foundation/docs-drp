---
sidebar_position: 6
---

# LWW-Register (Last-Write-Wins Register)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

The **LWW-Register** stores an element with a timestamp associated with each update. The timestamps are used to check if a write happened before or after the current timestamp stored in the register. So when performing an update, the LWW-Register checks if the update's timestamp is greater than the stored timestamp, and if it is the LWW-Register is updated, else it is not.

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)

- Shapiro, Marc; Preguiça, Nuno; Baquero, Carlos; Zawirski, Marek. *A Comprehensive Study of Convergent and Commutative Replicated Data Types*. 2011