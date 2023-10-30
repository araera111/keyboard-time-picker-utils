import { includes, isNil, range, reverse } from "ramda";

const validInputList = [
  "-1",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
export const isValidInput = (input: string): boolean =>
  includes(input, validInputList);
export const isInvalidInput = (input: string): boolean => !isValidInput(input);
import dayjs from "dayjs";
import * as O from "fp-ts/Option";
import { match } from "ts-pattern";
import {
  HHmmLRHandlerProps,
  MoveOption,
} from "../types/keyboardTimePickerType";
import { HLeftInputValidate } from "./HLeftUtil";
import { HRightInputValidate } from "./HRightUtil";
import { MLeftInputValidate } from "./MLeftUtil";
import { MRightInputValidate } from "./MRightUtil";

type GetHHmmResult = {
  HRight: string;
  HLeft: string;
  MRight: string;
  MLeft: string;
  HH: string;
  mm: string;
};
export const getHHmm = (HHmm: string): O.Option<GetHHmmResult> => {
  const HLeft = HHmm[0];
  const HRight = HHmm[1];
  const MLeft = HHmm[3];
  const MRight = HHmm[4];

  if (isNil(HRight) || isNil(HLeft) || isNil(MRight) || isNil(MLeft))
    return O.none;

  const HH = `${HLeft}${HRight}`;
  const mm = `${MLeft}${MRight}`;

  return O.some({ HRight, HLeft, MRight, MLeft, HH, mm });
};

export const calcArrowUp = (beforeNum: string) =>
  (parseInt(beforeNum, 10) + 1).toString();
export const calcArrowDown = (beforeNum: string) =>
  (parseInt(beforeNum, 10) - 1).toString();

export const toHHmm = (HH: string, mm: string) => `${HH}:${mm}`;

type GetIdProps = {
  id: string;
  moveOption: MoveOption;
};

export const getNextId = ({ moveOption, id }: GetIdProps) => {
  const { idList, moveToNextInputOnKeyPress } = moveOption;
  /* moveToがfalseのときは""" */
  if (!moveToNextInputOnKeyPress) return "";

  /* 自分が最後で、かつnextElementがあるとき */
  if (idList[idList.length - 1] === id && moveOption.afterElement !== "") {
    return moveOption.afterElement;
  }
  const index = idList.findIndex((v) => v === id);
  const nextIndex = index + 1;
  if (nextIndex >= idList.length) return idList[0];
  return idList[nextIndex];
};

export const getBeforeId = ({ moveOption, id }: GetIdProps) => {
  const { idList, moveToNextInputOnKeyPress } = moveOption;
  if (!moveToNextInputOnKeyPress) return "";

  /* 自分が最初で、かつbeforeElementがあるとき */
  if (idList[0] === id && moveOption.beforeElement !== "") {
    return moveOption.beforeElement;
  }

  const index = idList.findIndex((v) => v === id);
  const beforeIndex = index - 1;
  if (beforeIndex < 0) return idList[idList.length - 1];
  return idList[beforeIndex];
};

export const getNextElement = (id: string) => {
  if (typeof document === "undefined") return null;
  const element = document.getElementById(id);
  if (isNil(element)) return null;
  return element;
};

export const focusElement = (id: string) => {
  const element = getNextElement(id);
  if (isNil(element)) return;
  element.focus();
};
export const getHHmmOld = (
  time: string,
): {
  mm: string;
  HH: string;
} => {
  const timeDayjs = dayjs(`1000-01-01 ${time}`);
  const mm = timeDayjs.format("mm");
  const HH = timeDayjs.format("HH");
  return { mm, HH };
};

type TimeStepProps = {
  time: string;
  step: number;
};
export const floorTime = ({ time, step }: TimeStepProps) => {
  const { HH, mm } = getHHmmOld(time);
  const parsedMinutes = parseInt(mm, 10);

  /* step 30 -> 2 */
  const timeStepRange = 60 / step;

  /* 30, 0 (reversed) */
  const times = reverse(range(0, timeStepRange).map((x) => step * x));

  /* 31 -> 30, 45 -> 30 */
  const beforeStep = times.find((x) => x <= parsedMinutes);

  const result = dayjs(`1000-01-01 ${HH}:${beforeStep}`).format("HH:mm");
  return result;
};

export const ceilTime = ({ time, step }: TimeStepProps) => {
  const flooredTime = floorTime({ time, step });
  if (time >= flooredTime) return flooredTime;
  const result = dayjs(`1000-01-01 ${flooredTime}`)
    .add(step, "minute")
    .format("HH:mm");
  return result;
};
export const addTimeStep = ({ time, step }: TimeStepProps) => {
  const { mm, HH } = getHHmmOld(time);

  if (parseInt(mm, 10) < step) {
    const add30Minutes = dayjs(`1000-01-01 ${HH}:00`)
      .add(step, "minute")
      .format("mm");
    return toHHmm(HH, add30Minutes);
  }

  const flooredTime = floorTime({ time: HH + mm, step });
  const result = dayjs(`1000-01-01 ${flooredTime}`)
    .add(step, "minutes")
    .format("mm");
  return toHHmm(HH, result);
};

export const subTimeStep = ({ time, step }: TimeStepProps) => {
  const { HH } = getHHmmOld(time);
  const ceiledTime = ceilTime({ time, step });
  if (time === ceiledTime) {
    const minusedTime = dayjs(`1000-01-01 ${ceiledTime}`)
      .subtract(step, "minutes")
      .format("mm");
    return toHHmm(HH, minusedTime);
  }
  return ceiledTime;
};

type HHmmProps = {
  HHmm: string;
};
export const addHH = ({ HHmm }: HHmmProps) => {
  const { HH, mm } = getHHmmOld(HHmm);
  const nextHH = parseInt(HH, 10) + 1;
  if (nextHH === 24) return toHHmm("00", mm);
  const result = toHHmm(nextHH.toString().padStart(2, "0"), mm);
  return result;
};

export const subHH = ({ HHmm }: HHmmProps) => {
  const { HH, mm } = getHHmmOld(HHmm);
  const nextHH = parseInt(HH, 10) - 1;

  if (nextHH === -1) return toHHmm("23", mm);
  const result = toHHmm(nextHH.toString().padStart(2, "0"), mm);
  return result;
};

export const HHmmLRHandler = ({
  input,
  HHmm,
  id,
  type,
  option,
  shiftKey,
}: HHmmLRHandlerProps) => {
  const HHmmOption = getHHmm(HHmm);
  if (O.isNone(HHmmOption)) return HHmm;
  const { step } = option;

  const nextId = getNextId({ moveOption: option.move, id });
  const beforeId = getBeforeId({ moveOption: option.move, id });

  /* stepが設定されており、MMで、ArrowUpとArrowDownのときは次の時間を返す */
  if (type === "MLeft" || type === "MRight") {
    if (input === "ArrowUp")
      return addTimeStep({ time: HHmm, step: step.timeStep });
    if (input === "ArrowDown")
      return subTimeStep({ time: HHmm, step: step.timeStep });
  }

  /* HHのほうで上、下を押されたら1増やす、減らすを行う */
  if (type === "HLeft" || type === "HRight") {
    if (input === "ArrowUp") return addHH({ HHmm });
    if (input === "ArrowDown") return subHH({ HHmm });
  }

  const { fun, value } = match(type)
    .with("HLeft", () => ({
      value: HHmmOption.value.HLeft,
      fun: HLeftInputValidate,
    }))
    .with("HRight", () => ({
      value: HHmmOption.value.HRight,
      fun: HRightInputValidate,
    }))
    .with("MLeft", () => ({
      value: HHmmOption.value.MLeft,
      fun: MLeftInputValidate,
    }))
    .with("MRight", () => ({
      value: HHmmOption.value.MRight,
      fun: MRightInputValidate,
    }))
    .exhaustive();

  const parsedInput = match(input)
    .with("ArrowUp", () => calcArrowUp(value))
    .with("ArrowDown", () => calcArrowDown(value))
    .with("ArrowLeft", () => {
      focusElement(beforeId ?? "");
      return "";
    })
    .with("ArrowRight", () => {
      focusElement(nextId ?? "");
      return "";
    })
    .with("Tab", () => {
      if (!shiftKey) {
        focusElement(nextId ?? "");
      } else {
        focusElement(beforeId ?? "");
      }
      return "";
    })
    .otherwise(() => input);
  if (isInvalidInput(parsedInput)) return HHmm;
  const result = fun({ HHmm, input: parsedInput });

  /* 上下による選択ではない場合は、次のエレメントにFocusする */
  if (input !== "ArrowUp" && input !== "ArrowDown") {
    focusElement(nextId ?? "");
  }
  return result;
};
