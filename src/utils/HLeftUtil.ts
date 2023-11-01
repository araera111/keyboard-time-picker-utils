import * as O from "fp-ts/Option";
import { includes } from "ramda";
import { HHmmLRInputValidateProps } from "../types/keyboardTimePickerType";
import { getHHmm, toHHmm } from "./HHMMUtils";

export const HLeftInputValidate = ({
	HHmm,
	input,
}: HHmmLRInputValidateProps): string => {
	const HHmmOption = getHHmm(HHmm);
	if (O.isNone(HHmmOption)) return HHmm;
	const { HRight, mm } = HHmmOption.value;
	const allowInputList = ["-1", "0", "1", "2"];
	if (input === "-1") {
		const numHR = parseInt(HRight, 10);
		return toHHmm(`2${numHR > 3 ? "3" : HRight}`, mm);
	}

	if (input === "2") {
		const numHR = parseInt(HRight, 10);
		return numHR > 3 ? toHHmm(`${input}3`, mm) : toHHmm(input + HRight, mm);
	}

	const HL = includes(input, allowInputList) ? input : "0";
	return toHHmm(HL + HRight, mm);
};
