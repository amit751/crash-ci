var expect = require("chai").expect;
var addTwoNumbersAmit = require("../my-math-lib");

describe("addTwoNumbers()", function () {
  it("should add two numbers", function () {
    // 1. ARRANGE
    var x = 5;
    var y = 1;
    var sum1 = x + y;

    // 2. ACT
    var sum2 = addTwoNumbersAmit(x, y);

    // 3. ASSERT
    expect(sum2).to.be.equal(sum1);
  });
});
