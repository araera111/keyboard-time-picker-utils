import * as O from "fp-ts/Option";
import { HHmmLRInputValidateProps } from "../types";
import { getHHmm, toHHmm } from "./HHMMUtils";

export const MLeftInputValidate = ({
	HHmm,
	input,
}: HHmmLRInputValidateProps): string => {
	const HHmmOption = getHHmm(HHmm);
	if (O.isNone(HHmmOption)) return HHmm;
	const { HH, MRight } = HHmmOption.value;
	const numInput = parseInt(input, 10);

	/* inputが-1のとき、左側は5になる */
	if (input === "-1") {
		return toHHmm(HH, `5${MRight}`);
	}

	/* inputが6以上のとき、左側は0になる */
	if (numInput >= 6 || numInput < 0) {
		return toHHmm(HH, `0${MRight}`);
	}

	return toHHmm(HH, input + MRight);
};
