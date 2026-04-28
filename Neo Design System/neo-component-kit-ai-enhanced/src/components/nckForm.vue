<template>
  <form
    :id="id"
    action="javascript:void(0)"
    :aria-labelledby="labelId"
    :autocomplete="autocompleteState"
    @submit="submit($event)"
  >
    <a class="screenreader-only" tabindex="-1" ref="formBeginningAnchor">&nbsp;</a>
    <!-- @slot A container intended for general errors of the form (cross fields errors for instance). This area is aria-live and will tell update to screenreader. -->
    <div aria-live="assertive" aria-atomic="true">
      <slot name="error-container"></slot>
    </div>
    <!-- @slot The content of the form. -->
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref, provide, InjectionKey, onBeforeMount } from "vue";
import { formAddValidationInjectionKey, formRemoveValidationInjectionKey } from "@/constants/internal/injectionKeys";

type ResolveInjectionKeyParameter<T> = T extends InjectionKey<(component: infer U) => void> ? U : never;

/**
 * @component
 * @displayName nck-form
 * A form providing validation to child input components.
 *
 * This component implements the **INckForm** interface, exposing the _validate()_ method.
 *
 * Usage : <div class="as-path-line">import { INckForm } from \'neo-component-kit\';</div>
 *
 */

defineProps<{
  /**
   * ID of an element serving as label for this form.
   */
  labelId: string;

  /**
   * ID for this form.
   *
   * It can be associated with a `<button>` (becoming its form owner) for submitting.
   *
   * The ID should match the FORM attribute of a `<button>` in the same document (see [nck-button](#nckbutton)).
   */
  id?: string;

  /**
   * Allows to precise the "autocomplete" value for the fields inside the form. Possible values: "on" or "off".
   * Note that the autocomplete value can be overridden at the field level.
   * If a browser keeps on making suggestions even after setting autocomplete to "off", then you have to change (where possible) the name attribute of the input element to something which has no correspondent saved in the browser yet for later autocompletion on similar forms.
   */
  autocompleteState?: string;
}>();

defineExpose({
  /**
   * @public
   * Reset form validations
   */
  resetValidation,

  /**
   * @public
   * Focus the beginning of the form, before the error area.
   */
  focusBeginningOfForm,

  /**
   * @public
   * Validate the form.
   * This method is exposed through the **INckForm** interface.
   * @returns Promise resolving to true if the input is valid and to false otherwise.
   */
  validate,

  /**
   * @public
   * Focus the first non-valid element in the form (do nothing if none are invalid).
   *
   * The first element is not guaranteed, as the order taken is the one in which components are registered.
   * If you have component conditionally displaying with v-if, the order can be messed around.
   * However, this would be visible if your user have more than one error, and DOM addition of form fields have occurred,
   * which reduce occurrences.
   *
   * If it becomes a real issue, it could be fixed by checking the order in the DOM, but for now it has been deemed too expensive
   * compared to the supposed occurrences of the issue.
   */
  focusFirstInvalidField,
});

const emit = defineEmits<{
  /**
   * Emitted when the form is submitted.
   *
   * @param {Event} $event The DOM submit event
   */
  (e: "submit", $event: Event): void;
}>();

const formBeginningAnchor = ref<HTMLLinkElement | null>(null);
const form = useForm();

// provide type safety between composable and mixin through injection key
const childrenFields = ref<
  Array<
    ResolveInjectionKeyParameter<typeof formAddValidationInjectionKey> &
      ResolveInjectionKeyParameter<typeof formAddValidationInjectionKey>
  >
>([]);

function submit(event: Event) {
  emit("submit", event);
}

function resetValidation() {
  const previousValues = { ...form.values };
  form.resetForm({ values: previousValues });
}

function focusBeginningOfForm() {
  if (formBeginningAnchor.value) {
    formBeginningAnchor.value.focus();
  }
}

async function validate() {
  try {
    return (await form.validate()).valid;
  } catch {
    return false;
  }
}

function focusFirstInvalidField() {
  // we do a standard loop for breaking
  for (const formField of childrenFields.value) {
    // no need to check for readonly/disabled, components should
    if (formField.isValidationEnabled() && !formField.isValid()) {
      formField.focus();
      break;
    }
  }
}

function nckFormAddFieldWithValidation(component: ResolveInjectionKeyParameter<typeof formAddValidationInjectionKey>) {
  // I have absolutely no guarantee about the order which is a problem, if component move around (v-if for instance) chances are we won't focus the first
  childrenFields.value.push(component);
}

function nckFormRemoveFieldWithValidation(
  component: ResolveInjectionKeyParameter<typeof formRemoveValidationInjectionKey>,
) {
  const idx = childrenFields.value.indexOf(component);
  if (idx > -1) {
    childrenFields.value.splice(idx, 1);
  }
}

onBeforeMount(() => {
  provide(formAddValidationInjectionKey, nckFormAddFieldWithValidation);
  provide(formRemoveValidationInjectionKey, nckFormRemoveFieldWithValidation);
});
</script>

<docs>
To be accessible, the form needs to have a label.
It is set through the _labelId_ property, which references an html element providing this label.

The form exposes a _validate()_ method, through which you can programmatically validate your form.
In the parent you'd need to get a reference to your form instance, most often through a _ref_ attribute.
The _validate()_ method is a promise which resolves with a boolean, depending on whether the form is valid.
In typescript, you can type guard the form variable with the INckForm interface, which declares such a _validate()_ method.

Here is a simple example with a form containing a single required text input, with a submit button outside the form.

Notes:
- The user can submit the form by pressing the “Enter” key on the keyboard, within the focused text input.
- An [nck-button](#nckbutton) with `controlType=submit` prop might be necessary for the form to be submitted.
  - It should **always** be added to provide the user with an accessible control for submitting their input, though it might *not be necessary* when the form have a single text input as content (it can be submitted by pressing the “Enter” key within the focused text input).
  - It can be added within the [nck-form](#nckform), but also outside it. In the latter case, the `nck-form:id` prop should match the `nck-button:form` prop.

```jsx
let value = "";
let validity = "";

function validateForm() {
  let form = this.$refs.formRef;
  if (form) {
    form.validate().then((result) => {
      this.validity = result ? 'valid' : 'invalid';
    });
  }
}

<div id="example">
  <p id="formLabelId">A simple form example</p>
  <nck-form ref="formRef" labelId="formLabelId" id="formId" @submit="validateForm()">
    <nck-text-input label="Required input" name="formName" required v-model="value" />
  </nck-form>
  <p><nck-button form="formId" controlType="submit" label="Validate"></nck-button></p>
  <p>The form is : {{ validity }}</p>
</div>
```

To enable or disable autocompletion in forms, you can set the autocomplete attribute to "on" or "off".
```jsx
const autocompleteState = "off";
const value = "I am required";

<nck-form ref="formRef" labelId="formLabelId" :autocompleteState="autocompleteState">
  <div>
    <nck-text-input label="Required input" name="fieldName" required v-model="value" />
  </div>
</nck-form>
```
</docs>
