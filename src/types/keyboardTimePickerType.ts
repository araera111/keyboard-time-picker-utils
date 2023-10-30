import { z } from "zod";
export type HHmmLRProps = {
  HHmm: string;
  setHHmm: (hhmm: string) => void;
  option: KeyboardTimePickerOption;
};

export type HHmmLRState = "HLeft" | "HRight" | "MLeft" | "MRight";

export type HHmmLRHandlerProps = {
  input: string;
  shiftKey: boolean;
  HHmm: string;
  id: string;
  type: HHmmLRState;
  option: KeyboardTimePickerOption;
};

export type HHmmLRInputValidateProps = {
  input: string;
  HHmm: string;
};

const moveOptionSchema = z.object({
  moveToNextInputOnKeyPress: z.boolean().default(true),
  idList: z.array(z.string()).default([]),
  /* 一番左からさらに戻ったときのエレメント */
  beforeElement: z.string().optional(),
  /* 一番右からさらに進んだときのエレメント */
  afterElement: z.string().optional(),
});
// type
export type MoveOption = z.infer<typeof moveOptionSchema>;

export const keyboardTimePickerOptionSchema = z.object({
  move: moveOptionSchema,
  step: z.object({
    useStep: z.boolean().default(true),
    timeStep: z.number().default(15),
  }),
});
// type
export type KeyboardTimePickerOption = z.infer<
  typeof keyboardTimePickerOptionSchema
>;

export const basicKeyboardTimePickerOption: KeyboardTimePickerOption = {
  move: {
    moveToNextInputOnKeyPress: false,
    idList: [],
  },
  step: {
    timeStep: 0,
    useStep: false,
  },
};
