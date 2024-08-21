---
sidebar_position: 7
---

# LWW-Element-Set (Last-Write-Wins-Element-Set)

The **LWW-Element-Set** consists on an *add set* and a *remove set* like **2P-Set**, but attaches a **timestamp** to each element.  The timestamp refers to the time the element was inserted in a set. For an element to be a member of the LWW-Element-Set it must be in the *add set* and not the *remove set* or in the *remove set* but with a earlier timestamp than the timestamp in the *add set*. If an element has equal timestamps in the *add set* and in the *remove set*, the *bias* determines if the element belongs to the set or not, so a LWW-Element-Set can be *biased* towards adds or removals. This features make the LWW-Element-Set allowing elements to be re-inserted after they are removed.

// Diagram

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)
