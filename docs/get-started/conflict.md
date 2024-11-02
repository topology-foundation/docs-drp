---
sidebar_label: '4. Conflict'
sidebar_position: 4
---

# Conflict

The [**CRO**](./cro.md) state can be affected by [**concurrent**](./concurrency.md) **operations**. If applying these operations in any possible order produces the same state of the object, we do not have to worry about conflicts. Think about a CRO which accepts addition and multiplication as operations. If the initial state is _1_, and we have two **concurrent** operations as below, what is the state of the CRO after applying these operations?

<div align="center">
    ![](/img/concurrency.png)

    **Figure 1:** Hash graph for a single number register CRO that accepts addition and multiplication.
</div>
Different execution orders yield:
- ![](https://latex.codecogs.com/svg.latex?(1+7)\cdot3+2=26)
- ![](https://latex.codecogs.com/svg.latex?(1\cdot3)+7+2=12) 

This means these operations are not commutative, and they cause a **conflict**. We must define the behavior of the CRO in those situations to make sure every honest replica will arrive at the same state after applying conflicting operations. 
We need rules to determine what to do with the **conflicting** operations. Some of the operations might be dropped, the rest needs to be ordered in a replicable manner. This is what we call **_conflict resolution_**. In the above example we could define conflict resolution as "multiplication first". No operations are dropped, and multiplication is calculated first. This way, the final state will always be _12_. 

---