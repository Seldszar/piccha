const EventEmitter = require("events");
const helpers = require("./helpers");
const Node = require("./node");

/**
 * A tree.
 * @extends {EventEmitter}
 * @param {ResolvableTreeValues} [values] the node values
 */
class Tree extends EventEmitter {
  /**
   * Creates a new tree.
   */
  constructor(values) {
    super();

    /**
     * The root node.
     * @type {Node}
     */
    this.root = new Node(this, "/");

    /**
     * The node values.
     * @private
     * @type {Map<String, *>}
     */
    this._values = new Map(helpers.mapNodeValues(values));
  }

  /**
   * Returns a node.
   * @param {ResolvableTreePath} path the node path
   * @return {Node} the node.
   */
  get(path) {
    return new Node(this, path);
  }

  /**
   * Updates a node.
   * @param {ResolvableTreePath} path the node path
   * @param {*} value the node value
   * @return {Tree} the tree.
   */
  set(path, value) {
    const normalizedPath = helpers.normalizePath(path);
    const oldValue = this._values.get(normalizedPath);

    this._values.set(normalizedPath, value);
    this._emitChangeEvent(normalizedPath, oldValue, value);

    return this;
  }

  /**
   * Deletes a node.
   * @param {ResolvableTreePath} path the node path
   * @return {Boolean} `true` if the node has been deleted, otherwise `false`.
   */
  delete(path) {
    const normalizedPath = helpers.normalizePath(path);
    const oldValue = this._values.get(normalizedPath);
    const isDeleted = this._values.delete(normalizedPath);

    if (isDeleted) {
      this._emitChangeEvent(normalizedPath, oldValue, undefined);
    }

    return isDeleted;
  }

  /**
   * Merges node values into the tree.
   * @param {ResolvableTreeValues} values the node values
   * @return {Tree} the tree.
   */
  merge(values) {
    for (const [path, value] of helpers.mapNodeValues(values)) {
      if (value === undefined) {
        this.delete(path);
      } else {
        this.set(path, value);
      }
    }

    return this;
  }

  /**
   * Returns the JSON object.
   * @return {Object} the JSON object.
   */
  toJSON() {
    return {
      root: this.root,
    };
  }

  /**
   * Returns the identity.
   * @return {String} the identity.
   */
  toString() {
    return "[object Tree]";
  }

  /**
   * Emits a `change` event.
   * @private
   * @param {String} path the path
   * @param {*} oldValue the old value
   * @param {*} newValue the new value
   */
  _emitChangeEvent(path, oldValue, newValue) {
    helpers.defer(() => {
      /**
       * A change event.
       * @event Tree#change
       * @type {ChangeEvent}
       */
      this.emit("change", { path, oldValue, newValue });
    });
  }
}

module.exports = Tree;
