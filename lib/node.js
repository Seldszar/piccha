const helpers = require("./helpers");

/**
 * A node.
 * @param {Tree} tree the tree
 * @param {String} path the path
 */
class Node {
  /**
   * Gets the node name.
   * @type {String}
   */
  get name() {
    if (this.path === "/") {
      return Symbol.for("root");
    }

    return helpers.toPath(this.path).pop();
  }

  /**
   * Gets the node value.
   * @type {*}
   */
  get value() {
    return this.tree._values.get(this.path);
  }

  /**
   * Sets the node value.
   * @param {*} value the node value
   */
  set value(value) {
    this.tree.set(this.path, value);
  }

  /**
   * Gets the parent node.
   * @type {?Node}
   */
  get parent() {
    if (this.path === "/") {
      return null;
    }

    return this.tree.get(helpers.toPath(this.path).slice(0, -1));
  }

  /**
   * Gets the node childrens.
   * @type {Map<String, Node>}
   */
  get children() {
    const pattern = new RegExp(`^${helpers.ensureTrailingSlash(this.path)}([^/]+)`);
    const nodes = new Map();

    for (const nodePath of this.tree._values.keys()) {
      const result = pattern.exec(nodePath);

      if (result && !nodes.has(result[1])) {
        nodes.set(result[1], this.tree.get(result[0]));
      }
    }

    return nodes;
  }

  /**
   * Creates a new node.
   */
  constructor(tree, path) {
    /**
     * The tree.
     * @type {Tree}
     */
    this.tree = tree;

    /**
     * The path.
     * @type {String}
     */
    this.path = helpers.normalizePath(path);
  }

  /**
   * Returns a relative node.
   * @param {ResolvablePath} path the node path
   * @return {Node} the node.
   */
  get(path) {
    return this.tree.get(helpers.mergePaths(this.path, path));
  }

  /**
   * Updates a relative node.
   * @param {ResolvablePath} path the node path
   * @param {*} value the node value
   * @return {Node} the node.
   */
  set(path, value) {
    this.tree.set(helpers.mergePaths(this.path, path), value);
    return this;
  }

  /**
   * Deletes a relative node.
   * @param {ResolvablePath} path the node path
   * @return {Boolean} `true` if the node has been deleted, otherwise `false`.
   */
  delete(path) {
    return this.tree.delete(helpers.mergePaths(this.path, path));
  }

  /**
   * Returns the JSON object.
   * @return {Object} the JSON object.
   */
  toJSON() {
    return {
      path: this.path,
      value: this.value,
      children: this.children,
    };
  }

  /**
   * Returns the identity.
   * @return {Object} the identity.
   */
  toString() {
    return "[object Node]";
  }
}

module.exports = Node;
