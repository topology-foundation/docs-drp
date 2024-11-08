---
sidebar_label: '2. Concurrency'
sidebar_position: 2
---

# Concurrency

## Causal Ordering

In a distributed system, **causality** refers to how operations on different machines are related, where one operation
leads directly to another.

In simple terms, if one operation needs to happen before another, we say there is a causal relationship between them.

For example, imagine Machine A sends a message to Machine B using a CRO. Here, sending the message on Machine A (Operation A) causes Machine B to receive it (Operation B), creating a causal link between the two operations. Causality in this context helps maintain the correct order of operations, ensuring that machines communicate consistently and achieve the same results.

Notably, this ordering only guarantees operations with causal dependency, making it a partial ordering. But what about operations that don’t have such relationships? Let’s explore that next.

## Concurrency

When two operations are not causally related, we say they are indepedent or **concurrent**.

Two operations are concurrent if neither can causally affect the other, meaning they occur independently without any cause-and-effect relationship. This can be visualized as two parallel lines that never intersect, representing operations that proceed without influencing each other’s states.

For instance, if Machine A sends message X and Machine B sends message Y independently in a CRO, these operations are concurrent as long as neither message relies on the receipt of the other. Machines handle such concurrent operations through their own partial ordering.

Concurrency is crucial in the topology protocol because it allows for greater scalability and efficiency in distributed systems. By allowing independent operations, it reduces communication overhead without requiring global synchronization. This approach allows systems to process more operations simultaneously, significantly improving performance and responsiveness.

A real-world example is a multiplayer game, where Player A’s movement and Player B’s item collection occur concurrently, as neither action depends on the other. This parallel handling ensures faster responses, avoids global ordering delays, and enhances the overall gaming experience.

## Further Reading
- [Time, Clocks, and the Ordering of Events in a Distributed System](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)

---

Page last updated: November 8, 2024