const helpers = require("../helpers");

describe("toPath()", () => {
  test("should handle arrays", () => {
    expect(helpers.toPath(["lorem", "ipsum"])).toMatchSnapshot();
  });

  test("should handle dot strings", () => {
    expect(helpers.toPath("lorem.ipsum")).toMatchSnapshot();
  });

  test("should handle slash strings", () => {
    expect(helpers.toPath("/lorem/ipsum")).toMatchSnapshot();
  });

  test("should convert other types into arrays", () => {
    expect(helpers.toPath({})).toMatchSnapshot();
  });
});

describe("mergePaths()", () => {
  test("should merge paths", () => {
    expect(helpers.mergePaths("/lorem", "ipsum")).toMatchSnapshot();
  });
});

describe("normalizePath()", () => {
  test("should normalize input", () => {
    expect(helpers.normalizePath("lorem.ipsum")).toMatchSnapshot();
  });
});

describe("ensureTrailingSlash()", () => {
  test("should add a trailing slash", () => {
    expect(helpers.ensureTrailingSlash("/lorem/ipsum")).toMatchSnapshot();
  });

  test("should not add a trailing slash", () => {
    expect(helpers.ensureTrailingSlash("/lorem/ipsum/")).toMatchSnapshot();
  });
});

describe("mapNodeValues()", () => {
  test("should fallback to an empty array", () => {
    expect(helpers.mapNodeValues(null)).toMatchSnapshot();
  });

  test("should handle objects", () => {
    expect(helpers.mapNodeValues({ "/lorem": "ipsum" })).toMatchSnapshot();
  });

  test("should handle array pairs", () => {
    expect(helpers.mapNodeValues([["/lorem", "ipsum"]])).toMatchSnapshot();
  });
});
