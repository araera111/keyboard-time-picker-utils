import * as O from "fp-ts/Option";
import { HHmmLRInputValidateProps } from "../types";
import { calcArrowDown, calcArrowUp, getHHmm, toHHmm } from "./HHMMUtils";

export const HRightInputValidate = ({
	HHmm,
	input,
}: HHmmLRInputValidateProps): string => {
	const HHmmOption = getHHmm(HHmm);
	if (O.isNone(HHmmOption)) return HHmm;
	const { HLeft, mm, HH } = HHmmOption.value;

	// 繰り上げ
	if (HLeft === "2" && input === "4") {
		return toHHmm("00", mm);
	}

	if (input === "10") {
		const nextHLeft = calcArrowUp(HLeft);
		return toHHmm(`${nextHLeft}0`, mm);
	}

	/* 繰り下げ処理 */
	/* 00:00のとき */
	if (input === "-1" && HH === "00") {
		return toHHmm("23", mm);
	}

	/* 00:00以外の繰り下げ */
	if (input === "-1") {
		const nextHLeft = calcArrowDown(HLeft);
		return toHHmm(`${nextHLeft}9`, mm);
	}

	/* HHの左側が2ではないときは、 */
	if (HLeft !== "2") {
		return toHHmm(HLeft + input, mm);
	}

	/* HRが2のときは上限が3になる */
	const numHR = parseInt(input, 10);
	return numHR > 3 ? toHHmm(`${HLeft}3`, mm) : toHHmm(HLeft + input, mm);
};
