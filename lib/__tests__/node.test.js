const Node = require("../node");
const Tree = require("../tree");

describe("Node", () => {
  let tree;

  beforeEach(() => {
    tree = new Tree({
      "/lorem": "ipsum",
      "/lorem/ipsum": "dolor",
    });
  });

  test("should return an existent node", () => {
    expect(new Node(tree, "/lorem")).toMatchSnapshot();
  });

  test("should return an non-existent node", () => {
    expect(new Node(tree, "/ipsum")).toMatchSnapshot();
  });

  test("should return the name of the root node", () => {
    expect(new Node(tree, "/").name).toMatchSnapshot();
  });

  test("should return the name of a child node", () => {
    expect(new Node(tree, "/lorem").name).toMatchSnapshot();
  });

  test("should return the parent of the root node", () => {
    expect(new Node(tree, "/").parent).toMatchSnapshot();
  });

  test("should return the node parent", () => {
    expect(new Node(tree, "/lorem/ipsum").parent).toMatchSnapshot();
  });

  test("should return the child nodes", () => {
    expect(new Node(tree, "/lorem").children).toMatchSnapshot();
  });

  test("should return a child node", () => {
    expect(new Node(tree, "/lorem").get("ipsum")).toMatchSnapshot();
  });

  test("should update the value of the node", () => {
    const node = new Node(tree, "/lorem");

    node.value = "dolor";

    expect(node).toMatchSnapshot();
  });

  test("should update a child node", () => {
    expect(new Node(tree, "/lorem").set("ipsum", "dolor")).toMatchSnapshot();
  });

  test("should delete a child node", () => {
    expect(new Node(tree, "/lorem").delete("ipsum")).toMatchSnapshot();
  });

  test("should return the string representation of the node", () => {
    expect(new Node(tree, "/").toString()).toMatchSnapshot();
  });
});
