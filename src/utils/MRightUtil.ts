import * as O from "fp-ts/Option";
import { HHmmLRInputValidateProps } from "../types";
import { getHHmm, toHHmm } from "./HHMMUtils";

export const MRightInputValidate = ({
	HHmm,
	input,
}: HHmmLRInputValidateProps): string => {
	const HHmmOption = getHHmm(HHmm);
	if (O.isNone(HHmmOption)) return HHmm;
	const { MLeft, HH } = HHmmOption.value;
	const plus = input === "10" ? 1 : parseInt(input, 10);

	if (input === "10") {
		const nextML = parseInt(MLeft, 10) + 1;
		return nextML > 5 ? toHHmm(HH, "00") : toHHmm(HH, `${nextML}0`);
	}

	if (input === "-1") {
		const nextML = parseInt(MLeft, 10) - 1;
		if (nextML < 0) return toHHmm(HH, "59");
		return toHHmm(HH, `${nextML}9`);
	}
	const calced = MLeft + plus;
	return toHHmm(HH, calced);
};
