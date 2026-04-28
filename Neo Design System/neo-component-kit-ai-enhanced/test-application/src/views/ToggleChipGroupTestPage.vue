<template>
  <main>

    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>Horizontal (default) Checkbox group with a long label</div>
      </div>

      <div class="medium-container">
        <NckToggleChipGroup
          label="my very very very very very very very very very very very very very very long label"
          name="checkbox0"
          :options="options.values[0]"
          v-model="models.values[0]"
        />
      </div>
    </div>

    <div data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>Vertical Checkbox group with external label with focus</div>
      </div>

      <div class="small-container">
        <i id="otherLabel">The external label</i>

        <NckToggleChipGroup
          :direction="GroupDirection.VERTICAL"
          helpMessage="helpMessage"
          name="checkbox1"
          :options="options.values[1]"
          v-model="models.values[1]"
          aria-labelledby="otherLabel"
        />
      </div>
    </div>

    <div data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>Checkbox group, required, with a big chip, horizontal warp, icons on error, helpMessage</div>
      </div>

      <div class="small-container">
        <NckToggleChipGroup
          ref="requiredRef"
          label="required group"
          :options="options.values[2]"
          v-model="models.values[2]"
          required
          name="checkbox2"
          helpMessage="help message before error"
        />
        <p v-if="requiredRef">validity: {{ requiredRef.isValid() }}</p>
      </div>
    </div>

    <div data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>Checkbox group required, vertical,  with only one disabled checkbox</div>
      </div>

      <div class="small-container">
        <NckToggleChipGroup
          ref="mixedRefError"
          label="required mixed group with error"
          :options="options.values[3]"
          v-model="models.values[3]"
          name="checkbox3"
          :direction="GroupDirection.VERTICAL"
          required
        />
        <p v-if="mixedRefError">validity: {{ mixedRefError.isValid() }}</p>
      </div>
    </div>

    <div data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>Checkbox group required with only disabled checkboxes</div>
      </div>

      <div class="small-container">
        <NckToggleChipGroup
          ref="disabledRef"
          label="disabled group with validation"
          :options="options.values[4]"
          v-model="models.values[4]"
          required
          name="checkbox4"
          hideLabel
      />
        <p v-if="disabledRef">validity: {{ disabledRef.isValid() }}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { GroupDirection, NckToggleChipGroup } from "@neotechnologygroup/neo-component-kit";
import { onMounted, reactive, ref } from "vue";

function makeDisabled(label: string) {
  return { label, value: label, disabled: true };
};

function makeChecked(label: string) {
  return { label, value: label };
}

function makeUnchecked(label: string) {
  return { label, value: label };
}

const options = reactive({
  values: [
    [ makeUnchecked("chip1"), makeUnchecked("chip2"), makeUnchecked("chip3") ],
    [ { ...makeChecked("checked"), iconName: "seat" }, { ...makeUnchecked("unchecked"), iconName: "seat-position" }, { ...makeDisabled("disabled"), iconName: "plane" } ],
    [ makeDisabled("checkboxcheckboxcheckboxcheckboxcheckboxcheckboxcheckbox 1"), { ...makeUnchecked("chip4"), iconName: "seat" }, { ...makeUnchecked("chip3"), iconName: "seat-position" } ],
    [ makeUnchecked("checkbox 1"), makeDisabled("checkbox 2") ],
    [ makeDisabled("checkbox 1"), makeDisabled("checkbox 2") ]
  ] as const
});

const models = reactive({
  values: [
    [],
    [ "checked" ],
    [],
    [],
    []
  ] as const
});

const requiredRef = ref<InstanceType<typeof NckToggleChipGroup>>();
const disabledRef = ref<InstanceType<typeof NckToggleChipGroup>>();
const mixedRefError = ref<InstanceType<typeof NckToggleChipGroup>>();

onMounted(() => {
  void requiredRef.value?.validate();
  void disabledRef.value?.validate();
  void mixedRefError.value?.validate();
});
</script>

<style lang="less" scoped>

[data-test-case] {
  margin: 3rem auto;
  padding: 0.125rem;
  border-bottom: 1px solid lightgrey;
}
.small-container {
  max-width: 15rem;
  margin: 1rem auto;
}

.medium-container {
  max-width: 30rem;
  margin: 1rem auto;
}
</style>
