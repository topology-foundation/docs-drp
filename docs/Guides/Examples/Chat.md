---
sidebar_label: 'Chat'
sidebar_position: 1
---

# Chat System Example

# Overview

- Explain what's the example

This is an example of Topology Protocol usage in a chat system where a user can create or connect to a chat room, send and read the messages sent in the group chat.

## How it Works

- Explain the example in more detail
- Maybe using some images to show the example flow

## How to Run

After cloning the repository, run the following commands:

```bash
cd ts-topology/examples/chat
yarn
yarn build
yarn dev
```

## Debugging

Debugging is made easier by setting the mode in `webpack.config.js` to "development":

```js
module.exports = {
  mode: "development",
  ...
}
```