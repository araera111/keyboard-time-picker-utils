import { sum } from "./sum";

describe("sum", () => {
  it("case1 2 + 3 = 5", () => {
    const num1 = 2;
    const num2 = 3;
    const result = 5;
    expect(sum(num1, num2)).toBe(result);
  });
});
