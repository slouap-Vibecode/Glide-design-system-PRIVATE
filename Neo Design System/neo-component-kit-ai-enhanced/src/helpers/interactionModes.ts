import { FieldContext } from "vee-validate";
import { ValidationMode } from "@/constants/validation/validationMode";

type InteractionEventGetter = (ctx: FieldContext) => string[];

// https://github.com/logaretm/vee-validate/blob/v3/src/modes.ts#L38
const passive = () => [];

// https://github.com/logaretm/vee-validate/blob/v3/src/modes.ts#L22
const lazy: InteractionEventGetter = () => {
  return ["change", "blur"];
};

// https://github.com/logaretm/vee-validate/blob/v3/src/modes.ts#L18
const aggressive: InteractionEventGetter = () => ["input", "blur"];

// https://github.com/logaretm/vee-validate/blob/v3/src/modes.ts#L26
const eager: InteractionEventGetter = ({ errorMessage }) => {
  if (errorMessage.value) {
    return ["input"];
  }

  return ["change", "blur"];
};

export const modes = {
  passive,
  lazy,
  aggressive,
  eager,
} satisfies Record<ValidationMode, unknown>;
