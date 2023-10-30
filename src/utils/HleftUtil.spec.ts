import { HLeftInputValidate } from "./HLeftUtil";

describe("HLeftInputValidate", () => {
	it("case1 1 -> 1", () => {
		const input = "1";
		const HHmm = "00:00";
		const result = "10:00";
		expect(HLeftInputValidate({ input, HHmm })).toBe(result);
	});

	it("case2 5 -> 0", () => {
		const input = "5";
		const HHmm = "00:00";
		const result = "00:00";
		expect(HLeftInputValidate({ input, HHmm })).toBe(result);
	});

	it("case3 HRL 05 -> 2 => 23", () => {
		const input = "2";
		const HHmm = "05:00";
		const result = "23:00";
		expect(HLeftInputValidate({ input, HHmm })).toBe(result);
	});

	it("case4 HRL 01 -> 2 => 23", () => {
		const input = "2";
		const HHmm = "01:00";
		const result = "21:00";
		expect(HLeftInputValidate({ input, HHmm })).toBe(result);
	});

	it("case5 -1", () => {
		const input = "-1";
		const HHmm = "00:00";
		const result = "20:00";
		expect(HLeftInputValidate({ input, HHmm })).toBe(result);
	});

	it("case5 -1", () => {
		const input = "-1";
		const HHmm = "05:00";
		const result = "23:00";
		expect(HLeftInputValidate({ input, HHmm })).toBe(result);
	});
});
