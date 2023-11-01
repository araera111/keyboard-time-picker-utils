import { basicKeyboardTimePickerOption } from "../types";
import { HHmmLRHandler } from "./HHMMUtils";

describe("HRightHandler", () => {
	it("case1 10:00 -> arrow up -> 11:00", () => {
		const input = "ArrowUp";
		const HHmm = "10:00";
		const result = "11:00";
		expect(
			HHmmLRHandler({
				input,
				HHmm,
				type: "HRight",
				id: "",
				option: basicKeyboardTimePickerOption,
				shiftKey: false,
			}),
		).toBe(result);
	});

	it("case2 19:00 -> arrow up -> 20:00", () => {
		const input = "ArrowUp";
		const HHmm = "19:00";
		const result = "20:00";
		expect(
			HHmmLRHandler({
				input,
				HHmm,
				type: "HRight",
				option: basicKeyboardTimePickerOption,
				id: "",
				shiftKey: false,
			}),
		).toBe(result);
	});

	it("case3 23:00 -> arrow up -> 00:00", () => {
		const input = "ArrowUp";
		const HHmm = "23:00";
		const result = "00:00";
		expect(
			HHmmLRHandler({
				input,
				HHmm,
				type: "HRight",
				option: basicKeyboardTimePickerOption,
				id: "",
				shiftKey: false,
			}),
		).toBe(result);
	});

	it("case4 20:00 -> arrow down -> 19:00", () => {
		const input = "ArrowDown";
		const HHmm = "20:00";
		const result = "19:00";
		expect(
			HHmmLRHandler({
				input,
				HHmm,
				type: "HRight",
				option: basicKeyboardTimePickerOption,
				id: "",
				shiftKey: false,
			}),
		).toBe(result);
	});

	it("case5 00:00 -> arrow down -> 23:00", () => {
		const input = "ArrowDown";
		const HHmm = "00:00";
		const result = "23:00";
		expect(
			HHmmLRHandler({
				input,
				HHmm,
				type: "HRight",
				id: "",
				option: basicKeyboardTimePickerOption,
				shiftKey: false,
			}),
		).toBe(result);
	});
});
