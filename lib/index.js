const Tree = require("./tree");

/**
 * Resolvable tree path.
 * @typedef {(String|Array<String>)} ResolvableTreePath
 */

/**
 * Resolvable tree values.
 * @typedef {(Object|Array<[String, *]>)} ResolvableTreeValues
 */

/**
 * A change event.
 * @typedef {Object} ChangeEvent
 * @property {String} path the path
 * @property {*} oldValue the old value
 * @property {*} newValue the new value
 */

module.exports = {
  Tree,
};
