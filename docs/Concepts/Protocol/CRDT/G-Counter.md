---
sidebar_position: 1
---

# G-Counter (Grow-Only Counter)

The G-Counter implements a counter that only **increments**. It has an array ***P*** of **n** nodes, each one identified by their ID, that stores the counter values of each node.

Our G-Counter implementation supports both **operation** and **state** changes. The **merge** function is **commutative**, **associative** and **idempotent** and it will compute the **maximum** of every element in ***P***.

<div align="center">
    <br></br>
    ```mermaid
    flowchart LR;
        A["<b>Node1</b>\n<font color="blue">(node1, 5)</font>"]--<b>inc(</b> 5 <b>)</b>-->C["<b>Node1</b>\n<font color="blue">(node1, 10)</font>"]
        B["<b>Node2</b>\n<font color="brown">(node2, 10)</font>"]--<b>inc(</b> 5 <b>)</b>-->D["<b>Node2</b>\n<font color="brown">(node2, 15)</font>"]
        C--<b>merge(</b> Node2 <b>)</b>-->E["<b>Node1</b>\n<font color="blue">(node1, 10)</font>\n<font color="brown">(node2, 15)<font>"]
        C-.->F
        D--<b>merge(</b> Node1 <b>)</b>-->F["<b>Node2</b>\n<font color="blue">(node1, 10)</font>\n<font color="brown">(node2, 15)<font>"]
        D-.->E
        E--<b>inc(</b> 10 <b>)</b>-->G["<b>Node1</b>\n<font color="blue">(node1, 20)</font>\n<font color="brown">(node2, 15)</font>"]
        F--<b>inc(</b> 10 <b>)</b>-->H["<b>Node2</b>\n<font color="blue">(node1, 10)</font>\n<font color="brown">(node2, 25)</font>"]
        G--<b>merge(</b> Node2 <b>)</b>-->I["<b>Node1</b>\n<font color="blue">(node1, 20)</font>\n<font color="brown">(node2, 25)</font>"]
        G-.->J
        H--<b>merge(</b> Node1 <b>)</b>-->J["<b>Node2</b>\n<font color="blue">(node1, 20)</font>\n<font color="brown">(node2, 25)</font>"]
        H-.->I
    ```
    <br></br>
    **Example 1:** In this example, both Node1 and Node2 have their local replicas of the G-Counter. The increment operation adds the value to the node's local counter. The first merge unions both node's local replicas, achieving an equal state. After the second increment is performed, the merge operation takes the maximum of every element in each node.
</div>

One useful application of a G-Counter is, for example, counting the number of votes on a P2P poll.

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)

- Shapiro, Marc; Preguiça, Nuno; Baquero, Carlos; Zawirski, Marek (13 January 2011). "A Comprehensive Study of Convergent and Commutative Replicated Data Types"