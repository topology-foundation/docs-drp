---
sidebar_label: '4. Conflict'
sidebar_position: 4
---

# Conflict

(must explain: semantics)

---

A CRO state can be affected by **concurrent operations** that are not **commutative** (_i.e._ different execution orders produce different results). To avoid this, the CRO must define its behavior in those situations, which we call **_concurrency semantics_**.

Let's considers this hash graph example:

<div align="center">
    ![alt text](/img/concurrency.png)

    **Figure 2:** Hash graph for a register CRO that accepts addition and multiplication.

</div>

Since **addition** and **multiplication** do not commute, and if we define two different execution orders, we will have 2 different results. For example:

1. (1+7)\*3+2=26
2. (1\*3)+7+2=12

To solve this we must define a concurrency semantic, for example, define that addition goes first in case of concurrency. With this, and considering the example above, every honest replica of this hash graph will arrive at 26 as its final state.