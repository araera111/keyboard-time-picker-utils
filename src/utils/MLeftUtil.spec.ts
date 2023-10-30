import { HHmmLRHandler } from "./HHMMUtils";

describe("MLeftHandler", () => {
	it("case1 10:00 -> -1 -> 10:50", () => {
		const input = "-1";
		const HHmm = "10:00";
		const result = "10:50";

		expect(
			HHmmLRHandler({
				input,
				HHmm,
				type: "MLeft",
				id: "",
				option: {
					step: {
						timeStep: 0,
						useStep: false,
					},
					move: {
						idList: [],
						moveToNextInputOnKeyPress: false,
					},
				},
				shiftKey: false,
			}),
		).toBe(result);
	});
});
