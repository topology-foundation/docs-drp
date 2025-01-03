---
sidebar_label: '3. Hashgraph'
sidebar_position: 3
---

# Hashgraph

**Hashgraph** is the data structure underlying every DRP program.

## Purpose

Hashgraph serves as the *operation log* of a DRP program. It records:
- the **operations** occurred
- the **causal relationship** among them.
An operation is an update (write) on the program state.

Every user in a DRP program keeps a copy (replica) of the program's hashgraph. The client application running on the user's machine:
- **reads** this hashgraph for the state of the DRP program;
- **writes** to the DRP program by adding new operations to its hashgraph.

## Structure

Hashgraph is a *directed acyclic graph* (DAG), where:
- **Vertices** contain both the operations and the hashes of the vertices they causally depend on. Formally, each vertex *v* can be defined as a tuple *v = (u, D)*:
    - *u* is an update operation
    - *D* is the set of hashed vertices that are *v*'s causal dependencies
- **Edges** represent causal dependencies among the operations. An edge points from cause to effect: *v -> u* means *u* is causally dependent on *v*.

**Frontier** is the set of vertices that has no children. They are the ones most recently added.

> ⚠️ Note: the directionality of edges here is chosen to be _opposite_ of the one used in [the whitepaper](https://paper.topology.gg/drp-whitepaper.pdf), on purpose. The directionality used in the whitepaper refers to causality reporting: *u* reports *v* as its dependency, so an edge points from *u* to *v*. See figure 5 of [this paper](https://arxiv.org/pdf/2012.00472) to learn more. Whereas the directionality used here follows the event graph convention, where edges point in the same direction as time, which we consider to be more intuitive. For example, see [this paper](https://arxiv.org/pdf/2409.14252).

## Example

A hasgraph may look like this:

```mermaid
flowchart LR
    id1((A)):::large --> id2((B)):::large --> id3((C)):::large --> id4((D)):::frontier
	id2((B)):::large --> id5((J)):::large --> id6((K)):::large --> id7((L)):::frontier
    classDef frontier fill:#f96, padding:10px
	classDef large padding:15px
```

We notice:
- Orange vertices are the frontier: `{D, L}`
- A = (`some operation`, `{}`)
- B = (`some operation`, `{hash(A)}`)
- C = (`some operation`, `{hash(B)}`) ...

Now we add a new vertex E, which happens to depend on both D and J:

```mermaid
flowchart LR
    id1((A)):::large --> id2((B)):::large --> id3((C)):::large --> id4((D))
	id2((B)):::large --> id5((J)):::large --> id6((K)):::large --> id7((L)):::frontier
	id4((D)):::large --> id8((E)):::frontier
	id5((J)):::large --> id8((E)):::frontier
    classDef frontier fill:#f96, padding:10px
	classDef large padding:15px
```

We notice:
- The frontier became `{E, L}`
- E = (`some operation`, `{hash(D), hash(J)}`)

## Merging

Picture Alice and Bob in the same DRP program. Each of them has a copy of the program's hashgraph. Each of them is updating their own copy locally.

When Alice and Bob synchronize with each other, their hashgraphs are **merged**. In math language, the merging of two hashgraphs is their union.

For example, merging:

```mermaid
flowchart LR
    id1((A)):::large --> id2((B)):::large --> id3((C)):::large --> id4((D))
	id2((B)):::large --> id5((J)):::large --> id6((K)):::large --> id7((L)):::frontier
	id4((D)):::large --> id8((E)):::frontier
	id5((J)):::large --> id8((E)):::frontier
    classDef frontier fill:#f96, padding:10px
	classDef large padding:15px
```

and

```mermaid
flowchart LR
    id1((A)):::large --> id2((B)):::large --> id3((F)):::large --> id4((G)):::frontier
	id2((B)):::large --> id5((J)):::large --> id6((K)):::frontier
    classDef frontier fill:#f96, padding:10px
	classDef large padding:15px
```

yields

```mermaid
flowchart LR
    id1((A)):::large --> id2((B)):::large --> id3((C)):::large --> id4((D))
	id2((B)):::large --> id5((J)):::large --> id6((K)):::large --> id7((L)):::frontier
	id2((B)):::large --> id9((F)):::large --> id10((G)):::frontier
	id4((D)):::large --> id8((E)):::frontier
	id5((J)):::large --> id8((E)):::frontier
    classDef frontier fill:#f96, padding:10px
	classDef large padding:15px
```

---

Page last updated: January 2, 2025
