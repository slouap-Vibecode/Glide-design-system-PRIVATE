<template>
  <div class="nck-style nck-internal" :class="{ 'external-label': labelOutside, 'no-label': !label }">
    <label
      v-if="label && labelOutside && !Boolean(ariaLabelledby)"
      :for="inputId"
      :id="labelId"
      class="text-m label-outside"
      :class="{
        'font-color-ink-70': !disabled,
        'font-color-ink-40': disabled,
      }"
      @mouseover="$emit('update:label-hover', true)"
      @mouseleave="$emit('update:label-hover', false)"
    >
      <span class="leading-icon-outside" v-if="labelOutside"><slot name="leading-icon" /></span>
      <span v-if="label">{{ label }}</span>
      <span v-if="required" aria-hidden="true" :class="{ 'font-color-red-300': !disabled }" class="required-sign"
        >*</span
      >
      <!-- it is hidden to screen reader because it will say it is required with aria-required -->
    </label>
    <div
      class="nck-input-container nck-style nck-internal"
      :class="{
        'with-leading-icon': hasLeadingIcon,
        'with-leading-content': hasLeadingContent,
        'with-trailing-content': !!hasTrailingContent,
        'font-color-ink-70': !disabled,
        'font-color-ink-40': disabled,
      }"
    >
      <div ref="inputControlContainer" class="input-control-container">
        <div v-if="hasLeadingIcon" class="leading-icon">
          <slot name="leading-icon" />
        </div>

        <div v-if="hasLeadingContent" class="leading-content">
          <slot name="leading-content" />
        </div>

        <div class="main-content">
          <label
            v-if="label && !labelOutside && !Boolean(ariaLabelledby)"
            :for="inputId"
            :id="labelId"
            :class="{
              'mini-label text-s': isMiniLabel,
              'text-l': !isMiniLabel,
              'background-color-yellow-50': highlight,
              'background-color-white': !readonly && inputFocused,
              'no-left-space': readonly && !hasLeadingIcon && !hasLeadingContent,
              'background-color-blue-grey-100': labelStyleVariant === 'floating' && !readonly && !inputFocused,
              'label-floating': labelStyleVariant === 'floating',
              'label-above text-m': labelStyleVariant === 'above',
              'screenreader-only': labelStyleVariant === 'hidden',
            }"
          >
            <span v-if="labelStyleVariant === 'floating'" aria-hidden="true">&nbsp;</span>
            <div class="label-content">
              {{ label
              }}<span
                v-if="required"
                aria-hidden="true"
                :class="{ 'font-color-red-300': !disabled }"
                class="required-sign"
                >*</span
              >
              <!-- it is hidden to screen reader because it will say it is required with aria-required -->
            </div>
          </label>

          <slot />
        </div>

        <div
          v-if="hasTrailingContent"
          class="trailing-content"
          :class="{ 'trailing-content-inactive': trailingContentInactive }"
        >
          <slot name="trailing-content" />
        </div>
      </div>

      <div class="messages-area text-s" v-show="helpMessage" :id="helpMessageId">
        <span>{{ helpMessage }}</span>
      </div>
      <div class="messages-area text-s" v-show="highlight && highlightText" :id="hightlightTextId">
        <span>{{ highlightText }}</span>
      </div>
      <div class="messages-area error text-s" v-show="errorMessage" :id="errorMessageId">
        <nck-icon
          v-if="errorMessage"
          class="error-icon"
          iconName="glyphs-warning-filled"
          :iconAltText="errorText"
          :iconSize="IconSize.XS"
          :primaryColor="IconColors.RED_300"
        />
        <span data-test-error-message-text>{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import (reference) "../../styles/colorsVariables.less";
@import (reference) "../../styles/typography.less";

.nck-style.nck-internal {
  label .required-sign {
    margin-left: var(--nck-spacing-3xs);
  }
}

.nck-style.nck-internal {
  &.external-label {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    label {
      margin: 0.5625rem 1rem 0.5rem 0;
      // avoid unwanted whitespaces
      display: inline-flex;
    }

    .leading-icon-outside {
      margin-right: var(--nck-spacing-s);
      align-self: center;
    }
  }

  &.no-label {
    .input-control-container {
      .leading-icon,
      .trailing-content {
        padding: 0.55rem 0.75rem;
      }
    }
  }
}

.nck-input-container.nck-style {
  position: relative;
  text-align: left;

  .external-label & {
    flex-grow: 1;
    max-width: 100%;
  }

  label.label-floating {
    position: absolute;
    padding-top: 0.6875rem;
    margin: 0;
    /* because label has a background we play around between padding and margins */
    margin-left: 1rem;
    transition:
      padding var(--nck-duration-200) var(--nck-easing-out),
      font-size var(--nck-duration-200) var(--nck-easing-out);
    pointer-events: none;
    // to compensate for border
    top: 0.125rem; // zoom makes it compute improperly sometime let's take an additional safe pixel
    left: var(--nck-border-width-s);
    width: calc(100% - 2.5rem); // full width minus scrollbar to avoid going over it
    z-index: 1;
    box-sizing: border-box;
    &.mini-label {
      padding-top: 0.3125rem;
    }
    &.no-left-space {
      margin-left: 0;
    }

    .label-content {
      position: absolute;
      bottom: 0;
    }

    .required-sign {
      margin-left: var(--nck-spacing-3xs);
    }
  }

  &.with-trailing-content {
    .trailing-content {
      position: absolute;
      top: 0;
      right: 0;
      /* UX specs are missing border, so I add 1px on top and bottom to compensate for
      border */
      padding: 0.9375rem 1rem 0.9375rem 0.75rem;
      line-height: 0;
      z-index: 2;

      &.trailing-content-inactive {
        pointer-events: none;
      }

      .external-label & {
        padding: 0.5625rem 0.5rem;
      }
    }

    label {
      padding-right: 3rem;
    }
  }

  &.with-leading-icon {
    .leading-icon {
      position: absolute;
      top: 0;
      left: 0;
      /* UX specs are missing border, so I add 1px on top and bottom to compensate for
      border */
      padding: 0.9375rem 0.75rem 0.9375rem 1rem;
      line-height: 0;
      z-index: 2;
      pointer-events: none;
    }

    label {
      margin-left: 3rem;
      width: calc(100% - 5.5rem); // full width minus scrollbar to avoid going over it + space due to left icon
    }
  }

  &.with-leading-content {
    .input-control-container {
      display: flex;

      .main-content {
        flex: 1;
        position: relative;
      }
    }
  }

  .messages-area {
    margin-top: var(--nck-spacing-2xs);
    display: flex;
    color: var(--nck-text-secondary);
    &.error {
      color: var(--nck-text-negative);
    }
    .error-icon {
      margin-right: var(--nck-spacing-s);
    }
  }
}
</style>

<script setup lang="ts">
import NckIcon from "../nckIcon.vue";
import { IconSize } from "../../constants/iconSize";
import { IconColors } from "../../constants/iconColors";
import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";
import { computed, PropType, ref, useSlots } from "vue";

const props = defineProps({
  parentComponent: { required: true, type: String },

  label: { type: String },

  required: { type: Boolean, default: false },

  readonly: { type: Boolean, default: false },

  disabled: { type: Boolean, default: false },

  inputFocused: { type: Boolean, default: false },

  errorMessage: { type: String },

  helpMessage: { type: String },

  labelId: { type: String },

  inputId: { type: String, required: true },

  helpMessageId: { type: String, required: true },

  errorMessageId: { type: String, required: true },

  isMiniLabel: { required: true, type: Boolean },

  trailingContentInactive: { type: Boolean, default: false },

  highlight: { type: Boolean, default: false },

  highlightText: { type: String },

  hightlightTextId: { type: String },

  /*
   * should be avoided whenever possible
   */
  ariaLabelledby: {
    type: String,
    validator: (value) => typeof value === "string" && value.trim() !== "",
  },

  labelStyleVariant: {
    type: String as PropType<"floating" | "above" | "outside" | "hidden">,
    default: "floating",
  },
});

defineEmits<{
  (event: "update:label-hover", isHovering: boolean): void;
}>();

const inputControlContainer = ref<HTMLDivElement | null>(null);

defineExpose({
  /**
   * WARNING: do not use, internal use by NckPhoneNumberInput
   */
  inputControlContainer,
});

const errorText = computed<string>(() => {
  const errorText = GlobalOptionsProvider.getInstance().getOptions()?.translations?.error;
  if (!errorText) {
    throw new Error(`Error in ${props.parentComponent}: you must provide 'error' translation`);
  }
  return errorText;
});

const slots = useSlots();

const labelOutside = computed(() => props.labelStyleVariant === "outside");

const hasLeadingIcon = computed<boolean>(() => {
  return Boolean(!labelOutside.value && slots?.["leading-icon"]);
});

const hasLeadingContent = computed<boolean>(() => {
  return Boolean(!labelOutside.value && slots?.["leading-content"]);
});

const hasTrailingContent = computed<boolean>(() => {
  const targetSlot = slots?.["trailing-content"];
  return targetSlot ? Boolean(targetSlot()) : false;
});
</script>
