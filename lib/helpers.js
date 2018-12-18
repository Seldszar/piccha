/**
 * Returns the path segments.
 * @ignore
 * @param {ResolvableTreePath} value the value
 * @return {Array} the path segments.
 */
function toPath(value) {
  if (typeof value === "string") {
    if (value.startsWith("/")) {
      return value.split("/").slice(1);
    }

    return value.split(".");
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

/**
 * Merges path parts into a single array.
 * @ignore
 * @param {...ResolvableTreePath} paths the paths
 * @return {Array<String>} the merged path.
 */
function mergePaths(...paths) {
  return Array.prototype.concat.apply([], paths.map(path => toPath(path)));
}

/**
 * Normalize a property path.
 * @ignore
 * @param {ResolvableTreePath} value the path to normalize
 * @return {String} the new property path string.
 */
function normalizePath(value) {
  return `/${toPath(value).join("/")}`;
}

/**
 * Ensures the path contains a trailing slash.
 * @ignore
 * @param {String} value the value
 * @return {String} the normalized string.
 */
function ensureTrailingSlash(value) {
  if (value.endsWith("/")) {
    return value;
  }

  return `${value}/`;
}

/**
 * Map the node values.
 * @ignore
 * @param {ResolvableTreeValues} values the values
 * @return {Array<[String, *]>} the node values.
 */
function mapNodeValues(values) {
  if (values != null && typeof values === "object") {
    const pairs = Array.isArray(values) ? values : Object.entries(values);
    return pairs.map(pair => [normalizePath(pair[0]), pair[1]]);
  }

  return [];
}

exports.toPath = toPath;
exports.mergePaths = mergePaths;
exports.normalizePath = normalizePath;
exports.ensureTrailingSlash = ensureTrailingSlash;
exports.mapNodeValues = mapNodeValues;
