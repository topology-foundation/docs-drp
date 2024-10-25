---
sidebar_label: '4. Conflict'
sidebar_position: 4
---

# Conflict

The [**CRO**](./cro.md) state can be affected by [**concurrent**](./concurrency.md) **operations**. If applying these operations in any order produces the same state of the object we do not have to worry about conflicts. Think about a CRO which accepts addition and multiplication as opartions. If the initial state is _1_, and we have two **concurrent** operations as below, the order of execution matters.

<div align="center">
    ![alt text](/img/concurrency.png)

    **Figure 1:** Hash graph for a single number register CRO that accepts addition and multiplication.
</div>
Different execution orders yield:
1. (1+7)\*3+2=26
2. (1\*3)+7+2=12

This means these operations are not commutative, and they cause a **conflict**. We must define the behavior of the CRO in those situations to make sure every honest replica will arrive at the same state after applying conflicting operations. 
We need rules to determine in which order the **conflicting** operations are applied. This is what we call **_conflict resolution_**. In the above example we could define conflict resolution as "multiplication wins". This way, the final state will always be 12. 

---