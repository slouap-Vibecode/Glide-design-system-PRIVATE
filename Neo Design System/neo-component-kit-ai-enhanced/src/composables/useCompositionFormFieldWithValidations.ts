import { IFocusable } from "@/components/interfaces/iFocusable";
import { IFormFieldWithValidation } from "@/components/interfaces/iFormFieldWithValidation";
import { IFormFieldWithValidationProps } from "@/components/interfaces/internal/iFormFieldWithValidationProps";
import { formAddValidationInjectionKey, formRemoveValidationInjectionKey } from "@/constants/internal/injectionKeys";
import { ValidationMode } from "@/constants/validation/validationMode";
import { ValidationKeyManager } from "@/controllers/validationKeyManager";
import { ValidationManager } from "@/controllers/validationManager";
import { modes } from "@/helpers/interactionModes";
import { ValidationRule } from "@/models/validationRule";
import { FieldContext, FieldOptions, FormContext, useField } from "vee-validate";
import { computed, inject, onBeforeUnmount, ToRefs, ToRef, watch, ref, onBeforeMount, onMounted } from "vue";

// eslint-disable-next-line max-lines-per-function
export function useCompositionFormFieldWithValidation(
  props: ToRefs<IFormFieldWithValidationProps & { name: string } & { modelValue: unknown }>,
  focus: IFocusable["focus"],
  customRules: ToRef<ValidationRule[] | string> = ref([]),
  mode?: ToRef<ValidationMode | undefined>,
  formContext?: FormContext,
) {
  // #region create vee-validate rules
  const ruleKeys = ref<string[]>([]);

  const ruleNames = computed<string>(() => {
    if (typeof customRules.value === "string") {
      return customRules.value;
    }
    /* the "disabled" prop of ValidationProvider doesn't prevent rule to be executed just parent to check this input
    So in case of readonly/disabled, it should return no rule to avoid field validation
    on field where user cannot interact */
    if (!!props.disabled?.value || !!props.readonly?.value) {
      return "";
    }

    return ValidationManager.getRuleNames(customRules.value, ruleKeys.value, props.required?.value ?? false);
  });

  /**
   * Will implicitly set ruleKeys only if customRules is an array.
   */
  function createRulesKeysFromCustomRules(): void {
    if (Array.isArray(customRules.value)) {
      ruleKeys.value = ValidationManager.createRules(customRules.value);
    }
  }
  // #endregion

  // #region vee-field with interaction mode
  const optionsWithInteractiveMode: Partial<FieldOptions> = {
    form: formContext,
    validateOnValueUpdate: false,
  };
  const field = useField(props.name, ruleNames, optionsWithInteractiveMode);
  const handlers = computed(() => createValidationModesEventsFromField(field, mode?.value));
  const { errors, validate: validateField, setValue, meta } = field;
  // #endregion

  /**
   * Return validity of the current input.
   * Be careful if the input has been modified programmatically then you need to validate again.
   * Use 'validate' method
   */
  function isValid(): boolean {
    return ruleNames.value.length === 0 || meta.valid;
  }

  /**
   * Returns whether or not the field was validated
   * @returns validated status
   */
  function hasBeenValidated() {
    return meta.validated;
  }

  /**
   * Validate the current input value.
   * @returns {Promise<boolean>} Promise resolving to true if the input is valid and to false otherwise
   */
  async function validate(): Promise<boolean> {
    return (await validateField()).valid;
  }

  function isValidationEnabled() {
    return !props.readonly?.value && !props.disabled?.value;
  }

  /**
   * handle nck-form children injection here
   */
  const validations: IFormFieldWithValidation = {
    isValid,
    validate,
    isValidationEnabled,
  };

  const validationHandler = { ...validations, focus };

  onBeforeMount(() => {
    ValidationManager.createRequiredRuleIfDoesntExist();
    setValue(props.modelValue.value, false);
  });

  onMounted(() => {
    const addToFormValidation = inject(formAddValidationInjectionKey, undefined);
    addToFormValidation?.(validationHandler);
  });

  onBeforeUnmount(() => {
    const removeFromFormValidation = inject(formRemoveValidationInjectionKey, undefined);
    removeFromFormValidation?.(validationHandler);
    ruleKeys.value.forEach((key) => {
      ValidationKeyManager.releaseKey(key);
    });
  });

  // #region watchers
  watch(() => customRules.value.length, createRulesKeysFromCustomRules, { immediate: true });
  // sync v-model with vee-validate field without validating
  watch(props.modelValue, () => setValue(props.modelValue.value, false));
  // #endregion

  return {
    handlers,
    errors,
    ...validations,
    ruleNames,
    hasBeenValidated,
  };
}

function createValidationModesEventsFromField(field: FieldContext, mode: ValidationMode = ValidationMode.EAGER) {
  const { handleBlur, handleChange, errorMessage, meta } = field;
  // generates the listeners
  const on = {
    blur: handleBlur,
    // default input event to sync the value
    // the `false` here prevents validation
    input: [(e: unknown) => handleChange(e, false)],
  };

  // Get list of validation events based on the current mode
  // @ts-expect-error https://stackblitz.com/edit/vee-validate-v4-dynamic-validation-triggers
  const triggers = modes[mode]({
    errorMessage,
    meta,
  });

  // add them to the "on" handlers object
  triggers.forEach((t) => {
    // @ts-expect-error https://stackblitz.com/edit/vee-validate-v4-dynamic-validation-triggers
    if (Array.isArray(on[t])) {
      // @ts-expect-error https://stackblitz.com/edit/vee-validate-v4-dynamic-validation-triggers
      on[t].push(handleChange);
    } else {
      // @ts-expect-error https://stackblitz.com/edit/vee-validate-v4-dynamic-validation-triggers
      on[t] = handleChange;
    }
  });

  return on;
}
