import { watch } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type vueValidatorFnType = (args?: any) => boolean;

export const runtimePropValidator = <T extends Record<string, unknown>>(
  props: T,
  propName: keyof typeof props,
  validator: vueValidatorFnType,
): void => {
  const validate = () => {
    const validation = validator();
    if (!validation) {
      throw new Error(`prop validation failed for prop: ${propName.toString()}`);
    }
  };

  watch(() => props[propName], validate, { immediate: true });
};
