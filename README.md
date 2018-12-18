# Piccha

Piccha is another library for tree data structure manipulation.
The main difference is about the source data, a key-value map instead of a tree object, which can be useful in some cases.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Author](#author)
- [License](#license)

## Installation

```bash
npm install piccha --save
```

## Usage

```javascript
const piccha = require("piccha");

// Creates a new tree
const tree = new piccha.Tree({
  "/": "This is the root node",
  "/lorem": "Lorem ipsum dolor sit amet",
  "/lorem/ipsum": "Consectetur adipisicing elit",
});

// Gets a node from the tree
const node = tree.get("/lorem");

// Gets its parent
const parent = node.parent;

// Gets a children
const children = node.children.get("ipsum");

// Outputs: "lorem: Lorem ipsum dolor sit amet"
console.log("%s: %s", node.name, node.value);

// Outputs: "Symbol(root): This is the root node"
console.log("%s: %s", parent.name, parent.value);

// Outputs: "ipsum: Consectetur adipisicing elit"
console.log("%s: %s", children.name, children.value);

// Watches for tree changes
tree.on("change", event => {
  console.log("%s: %s -> %s", event.path, event.oldValue, event.newValue);
});
```

# API

See the detailed [API Reference](API.md).

## Author

Alexandre Breteau - [@0xSeldszar](https://twitter.com/0xSeldszar)

## License

MIT © [Alexandre Breteau](https://seldszar.fr)
