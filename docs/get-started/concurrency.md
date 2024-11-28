---
sidebar_label: '2. Concurrency'
sidebar_position: 2
---

# Concurrency

Concurrency is the key capability DRP unlocks.

Concurrency means "at the same time". Multiple computations are happening at the same time? They are concurrent. Multiple events occurred at the same time? They are concurrent.

To understand concurrency more precisely, we must first understand **causality** from the distributed systems standpoint.

## Causally dependent (A → B)

In distributed systems, we can understand causality as a kind of *relation* between operations.

If operation B was performed *with the knowledge of* operation A, we say:
1. A and B are causally related.
2. B is causally dependent on A.

We use **A → B** to describe this relation.

The simplest example happens in a single-threaded machine. The machine performs operation A, then operation B. B *happened after* A. B is causally dependent on A.

Another example: Alice and Bob each runs a machine connected by the Internet. Alice's machine performs operation A, which travels through the wire to Bob's machine. Bob's machine sees A and performs operation B. In this case, B is also causally dependent on A.

## Causally independent (A // B)

What happens if operation B was performed *without the knowledge of* A?

We say A and B are causally independent. They are **concurrent**.

We use **A // B** to describe this relation.

Going back to Alice and Bob, imagine Alice's machine performs operation A. At roughly the same time, Bob's machine performs operation B with no knowledge of A.

## Concurrency

With concurrency, DRP applications process operations independently and simultaneously, making these applications highly responsive.

Take multiplayer games as an example. In such a game, one player can move around while another player picks up an item concurrently. The game handles these operations independently, completely avoiding global synchronization. As a result, the game feels much more alive.

## Further Reading
- [Time, Clocks, and the Ordering of Events in a Distributed System](https://lamport.azurewebsites.net/pubs/time-clocks.pdf)

---

Page last updated: November 28, 2024