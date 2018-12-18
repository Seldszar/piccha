const Tree = require("../tree");

describe("Tree", () => {
  let tree;

  test("should create an empty tree", () => {
    tree = new Tree();

    expect(tree).toMatchSnapshot();
  });

  test("should return a node", () => {
    tree = new Tree({
      "/lorem": "ipsum",
    });

    expect(tree.get("/lorem")).toMatchSnapshot();
  });

  test("should add a node", () => {
    tree = new Tree();

    tree.set("/ipsum", "dolor");

    expect(tree).toMatchSnapshot();
  });

  test("should delete an existent node", () => {
    tree = new Tree({
      "/lorem": "ipsum",
    });

    expect(tree.delete("/lorem")).toMatchSnapshot();
  });

  test("should delete a non-existent node", () => {
    tree = new Tree();

    expect(tree.delete("/lorem")).toMatchSnapshot();
  });

  test("should merge values into the tree", () => {
    tree = new Tree({
      "/lorem": "ipsum",
    });

    tree.merge({
      "/lorem": undefined,
      "/ipsum": "dolor",
    });

    expect(tree).toMatchSnapshot();
  });

  test("should emit a change event", async () => {
    tree = new Tree();

    const promise = new Promise(resolve => {
      tree.on("change", resolve);
    });

    tree.set("/lorem", "ipsum");

    await expect(promise).resolves.toMatchSnapshot();
  });

  test("should return the string representation of the tree", () => {
    expect(tree.toString()).toMatchSnapshot();
  });
});
