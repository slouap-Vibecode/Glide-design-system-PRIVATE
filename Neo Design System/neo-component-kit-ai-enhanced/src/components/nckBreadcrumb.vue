<template>
  <nav
    class="nck-style nck-internal nck-breadcrumb"
    :aria-labelledby="labeledByTitleId"
    :aria-label="displayedAriaLabel"
  >
    <ol>
      <template v-for="(crumb, index) in options">
        <li v-if="stepperMode || index <= activeStep" :key="index">
          <Component
            :is="isPreviousAndEnabledStep(index, crumb) ? 'a' : 'span'"
            :href="isPreviousAndEnabledStep(index, crumb) ? 'javascript:void(0)' : null"
            v-nck-info-tooltip.global.bottom="{
              heading: crumb.tooltipHeading,
              content: crumb.tooltipContent,
              disable: !(crumb.tooltipHeading || crumb.tooltipContent),
            }"
            class="crumb outside-focus"
            :class="{ active: activeStep === index, 'error-state': crumb.errorState, disabled: crumb.disabled }"
            :aria-current="activeStep === index ? 'step' : null"
            :aria-disabled="crumb.disabled ? 'true' : null"
            v-on="isPreviousAndEnabledStep(index, crumb) ? { click: crumb.onClick } : {}"
            @mouseover="hoverredStepIndex = index"
            @mousedown="hoverredStepIndex = -1"
            @mouseup="hoverredStepIndex = index"
            @mouseleave="hoverredStepIndex = -1"
          >
            <div class="prepend-area">
              <div v-if="isBeforeActiveStepInStepperMode(index) && !crumb.disabled" class="crumb-completed">
                <NckIcon
                  iconName="check"
                  :iconAltText="crumb.iconOrImageAlternative || crumb.text"
                  :iconSize="IconSize.XS"
                  :primaryColor="getIconColor(index, crumb)"
                  :secondaryColor="getIconColor(index, crumb)"
                />
              </div>
              <div v-else-if="crumb.errorState" class="crumb-error">
                <NckIcon
                  class="error-icon"
                  iconName="close"
                  :primaryColor="getIconColor(index, crumb)"
                  :secondaryColor="getIconColor(index, crumb)"
                  :iconAltText="errorWording ?? ''"
                  :iconSize="IconSize.XS"
                />
              </div>
              <NckIcon
                v-else-if="crumb.icon"
                :iconName="crumb.icon"
                :iconAltText="crumb.iconOrImageAlternative ?? ''"
                :iconSize="IconSize.M"
                :primaryColor="getIconColor(index, crumb)"
                :secondaryColor="getIconColor(index, crumb)"
              />
              <img
                class="crumb-image"
                v-else-if="crumb.imageUrl"
                :src="crumb.imageUrl"
                :alt="crumb.iconOrImageAlternative"
              />
              <div v-else-if="crumb.counter" class="text-m crumb-counter">
                {{ index + 1 }}
              </div>
            </div>
            <span class="text-area" :aria-hidden="isAlternativeTextDuplicated(crumb)">
              <p :class="getCrumbTextClasses(index, crumb)">
                {{ crumb.text }}
              </p>
              <p v-if="crumb.textSecondLine" :class="getCrumbTextClasses(index, crumb)">
                {{ crumb.textSecondLine }}
              </p>
            </span>
          </Component>
          <NckIcon
            v-if="index < options.length - 1 && (index < activeStep || stepperMode)"
            class="separator"
            iconName="chevron-right-s"
            :iconSize="IconSize.M"
            iconAltText=""
          />
        </li>
      </template>
    </ol>
  </nav>
</template>

<style lang="less" scoped>
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";

.nck-style.nck-breadcrumb {
  .desktop-alt-text,
  .tablet-mobile-alt-text {
    display: none;
  }

  @media @desktop {
    .desktop-alt-text {
      display: inline-block;
    }
  }

  @media @tablet, @phone {
    .tablet-mobile-alt-text {
      display: inline-block;
    }
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
    margin-left: var(--nck-spacing-s);
  }

  li {
    display: inline-flex;
    padding: var(--nck-spacing-2xs) 0;
    margin-left: var(--nck-spacing-s);
    &:first-of-type {
      margin-left: 0;
    }
    @media @tablet, @phone {
      margin-left: 0;
    }
    vertical-align: middle;

    .separator {
      flex-shrink: 0;
      align-self: center;
    }

    .crumb {
      padding: var(--nck-spacing-s);
      padding-left: 0;
      padding-right: 0;
      display: flex;
      color: var(--nck-text-default);
      text-decoration: none;
      border-radius: var(--nck-radius-s); // for the focus ring, they want rounded borders

      .crumb-image {
        max-height: 1.5rem;
        max-width: 5rem;
      }

      .crumb-counter,
      .crumb-completed,
      .crumb-error {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: var(--nck-radius-pill);
      }

      .crumb-completed,
      .crumb-error {
        align-items: center;
        justify-content: center;
      }

      .crumb-counter {
        text-align: center;
        border: var(--nck-border-width-s) solid var(--nck-text-default);
        color: var(--nck-text-default);
        background: var(--nck-surface-primary);
      }

      .crumb-completed {
        border: var(--nck-border-width-s) solid var(--nck-border-active);
        display: inline-flex;
        flex-shrink: 0;
      }

      .crumb-error {
        text-align: center;
        border: var(--nck-border-width-s) solid var(--nck-border-negative);
        background: var(--nck-surface-primary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .prepend-area,
      .text-area {
        display: inline-block;
        vertical-align: middle;
      }

      .prepend-area {
        padding-left: var(--nck-spacing-s);
        padding-right: var(--nck-spacing-s);
        align-self: center;
        display: inline-flex;
        height: 100%;
        align-items: center;
      }

      .text-area {
        padding-right: var(--nck-spacing-s);
        p {
          margin: 0;
        }
      }

      @media @tablet, @phone {
        &:not(.active) {
          .text-area {
            display: none;
          }
        }
      }

      &:hover:not(.active):not(.disabled):not(:active) {
        &:not(.error-state) {
          color: var(--nck-text-brand);
          .crumb-counter {
            border: var(--nck-border-width-s) solid var(--nck-border-active);
            color: var(--nck-text-brand);
          }
        }
        &.error-state {
          .crumb-error {
            background: var(--nck-surface-negative-subtle);
          }
        }
        .text-area {
          text-decoration: underline;
        }
      }

      &.active {
        color: var(--nck-text-brand);
        .crumb-counter {
          border: var(--nck-border-width-s) solid var(--nck-border-active);
          background: var(--nck-surface-info-solid);
          color: var(--nck-text-reverse);
        }
        .crumb-error {
          background: var(--nck-surface-negative-solid);
        }
      }

      &.error-state {
        color: var(--nck-text-negative);
        .crumb-counter {
          border: var(--nck-border-width-s) solid var(--nck-border-negative);
          background: var(--nck-surface-negative-solid);
          color: var(--nck-text-reverse);
        }
      }

      &.disabled {
        color: var(--nck-text-disabled);
        .crumb-counter {
          border: none; /* this border glitches (is darker) so I put none */
          background: var(--nck-text-disabled);
          color: var(--nck-text-reverse);
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { IBreadcrumbOption } from "../models/iBreadcrumbOption";
import { IconSize } from "../constants/iconSize";
import NckIcon from "./nckIcon.vue";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";
import vNckInfoTooltip from "../directives/nckInfoTooltip";
import { IconColors } from "@/constants/iconColors";
import { computed, onMounted, ref } from "vue";

/**
 * @component
 * @displayName nck-breadcrumb
 *
 * Component to display navigation hierarchy.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - error
 * - [Icons URL](#icons) (when using icons)
 *
 * /!\: There is a user experience/accessibility issue on breadcrumbs when
 * using images as graphic element on mobile.
 * The disabled state is not visible (it looks the same as standard step)
 * Refer to https://kdsjira.atlassian.net/browse/TRV3-1572
 */

const props = defineProps<{
  /**
   * Option to pass to configure each step
   *
   * Option object is as follow:
   *
   *  - text (string, mandatory): text displayed
   *  - textSecondLine (string, optionnal): text to display as a second line
   *  - icon (string, optionnal): name of the icon to display on the left
   *  - imageUrl (string, optionnal): url of image to display on the left
   *  - iconOrImageAlternative (string, optionnal): alternative text to icon or image.
   * Required and must not be empty if you have an image or an icon because on phone,
   * the image or icon is the only thing displayed for previous steps.
   *  - counter (boolean, optionnal): to display number of current step on left
   *  - errorState (boolean, optionnal): to display the current step in error style
   *  - disabled (boolean, optionnal): to disable the step. It will render it not clickable
   *  - onClick (function, required): function called when user clicked on a step.
   *  - tooltipHeading (string, optionnal): if provided, displays an
   *  [information tooltip](#nck-info-tooltip) with tooltipHeading as a header value
   *  - tooltipContent (string, optionnal): if provided, displays an
   *  [information tooltip](#nck-info-tooltip) with tooltipContent as a content value
   *
   * Note that both disabled and current step are not clickable
   * (except when an information tooltip is attached to them).
   *
   * Note that it is required to have one of the graphical element (icon, image or counter).
   * You can have only one, if you define several, icon will win over image and counter, and
   * image will win over counter.
   */
  options: IBreadcrumbOption[];

  /**
   * The current active step of the breadcrumb. First step is 0.
   * You need to update it manually.
   * It will hide all steps after active step.
   */
  activeStep: number;

  /**
   * ID of title element for the breadcrumb. It is required
   * if no ariaLabel is provided. It wins over
   * ariaLabel.
   */
  labeledByTitleId?: string;

  /**
   * aria label for the breadcrumb. It is required if
   * no labeledByTitleId is provided.
   */
  ariaLabel?: string;

  /**
   * In stepperMode, all steps are displayed, even those after the `activeStep`.
   * The steps prior to active step are marked as "completed", overriding disabled or error state.
   */
  stepperMode?: boolean;
}>();

const hoverredStepIndex = ref<number>(-1);

const displayedAriaLabel = computed(() => {
  if (!props.labeledByTitleId) {
    return props.ariaLabel;
  }
  return undefined;
});

const errorWording = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().options;
  return globalOptions?.translations ? globalOptions.translations.error : "";
});

function isAlternativeTextDuplicated(crumbOption: IBreadcrumbOption) {
  const aggregatedContent = crumbOption.text + (crumbOption.textSecondLine ? " " + crumbOption.textSecondLine : "");
  return !!(
    crumbOption.iconOrImageAlternative &&
    crumbOption.iconOrImageAlternative.toLowerCase() === aggregatedContent.toLowerCase() &&
    (!!crumbOption.icon || !!crumbOption.imageUrl) &&
    !crumbOption.errorState
  );
}

function getIconColor(index: number, crumbOptions: IBreadcrumbOption) {
  if (isBeforeActiveStepInStepperMode(index) && !crumbOptions.disabled) {
    return IconColors.BRIGHT_BLUE_300;
  }

  if (crumbOptions.errorState) {
    if (props.activeStep === index) {
      return IconColors.WHITE;
    }
    return IconColors.RED_300;
  }

  if (crumbOptions.disabled) {
    return IconColors.BLUE_GREY_400;
  }
  if (hoverredStepIndex.value === index || props.activeStep === index) {
    return IconColors.BRIGHT_BLUE_300;
  }
  return IconColors.BLUE_GREY_500;
}

function isPreviousAndEnabledStep(index: number, crumbOptions: IBreadcrumbOption) {
  return !crumbOptions.disabled && props.activeStep !== index;
}

function getCrumbTextClasses(index: number, crumbOptions: IBreadcrumbOption) {
  let textClass = crumbOptions.textSecondLine ? "text-m" : "text-l";
  if (props.activeStep === index) {
    textClass += "-600";
  }
  return [textClass];
}

function isBeforeActiveStepInStepperMode(index: number) {
  return props.stepperMode && index < props.activeStep;
}

onMounted(() => {
  const missGraphic =
    props.options.filter((crumbOption) => {
      return !crumbOption.icon && !crumbOption.imageUrl && !crumbOption.counter;
    }).length > 0;
  if (missGraphic) {
    throw new Error(
      "Fatal error in NckBreadcrumb: every element of breadcrumb require a graphical element (an icon, an image, or a counter)",
    );
  }

  const missAlternative =
    props.options.filter((crumbOption) => {
      return (
        (crumbOption.icon ?? crumbOption.imageUrl) &&
        (typeof crumbOption.iconOrImageAlternative !== "string" || crumbOption.iconOrImageAlternative.length === 0)
      );
    }).length > 0;
  if (missAlternative) {
    throw new Error(
      "Fatal error in NckBreadcrumb: you need to provide an alternative text when using an icon or an image, because text can be hidden.",
    );
  }

  if (!props.ariaLabel && !props.labeledByTitleId) {
    throw new Error("Fatal error in NckBreadcrumb: ariaLabel or labeledByTitleId should be provided.");
  }
  const globalOptions = GlobalOptionsProvider.getInstance().options;
  if (!globalOptions?.translations?.error) {
    throw new Error("Fatal error in NckBreadcrumb: you need to provide translation for error in the global options.");
  }
});
</script>

<docs>

A basic breadcrumb

```jsx
var testData = {
  currentStep: 2,
  crumbsOptions: [
    { text: "Orders", counter: true, onClick: () => { setStep(0);} },
    { text: "Order n°42", counter: true, onClick: () => { setStep(1); } },
    { text: "Product n°123", counter: true, onClick: () => { setStep(2); } }
  ]
};

function setStep(newStep) {
  testData.currentStep = newStep;
}
<div>
  <button @click="testData.currentStep = 0">Go to Step 0</button>
  <button @click="testData.currentStep = 1">Go to Step 1</button>
  <button @click="testData.currentStep = 2">Go to Step 2</button>

  <p> Current step is: {{testData.currentStep}} </p>

  <nck-breadcrumb :options="testData.crumbsOptions" :activeStep="testData.currentStep" ariaLabel="My breadcrumb label"/>
</div>
```

You can choose what type of graphic element you put in prefix of the text.
There are three possibilities: Icon, image and counter.
At least having one of them is required, and you will have only with the following
order of priority: icon > image > counter.
Note that, having an icon or animage will force you to enter an alternative
for the icon/image (it could be empty is image is not meaningful or text is self explainatory)

```jsx
var testData = {
  currentStep: 2,
  crumbsOptions: [
    { text: "icon", icon: "amenity-more-grey", iconOrImageAlternative: "this is an alt", onClick: () => { setStep(0); } },
    { text: "image", imageUrl: "7-de-coeur.jpg", iconOrImageAlternative: "And another one", onClick: () => { setStep(1); } },
    { text: "counter", counter: true, onClick: () => { setStep(2); } }
  ]
}

function setStep(newStep) {
  testData.currentStep = newStep;
}

<div>
  <button @click="testData.currentStep = 0">Go to Step 0</button>
  <button @click="testData.currentStep = 1">Go to Step 1</button>
  <button @click="testData.currentStep = 2">Go to Step 2</button>

  <nck-breadcrumb :options="testData.crumbsOptions" :activeStep="testData.currentStep" ariaLabel="My breadcrumb label"/>
</div>
```

You can add a second line of text to a step

```jsx
var testData = {
  currentStep: 2,
  crumbsOptions: [
    { text: "Orders", counter: true, onClick: () => { setStep(0); } },
    { text: "Order n°42", textSecondLine: "pending", counter: true, onClick: () => { setStep(1); } },
    { text: "Product n°123", textSecondLine: "sold out", counter: true, onClick: () => { setStep(2); } }
  ]
};

function setStep(newStep) {
  testData.currentStep = newStep;
}

<div>
  <button @click="testData.currentStep = 0">Go to Step 0</button>
  <button @click="testData.currentStep = 1">Go to Step 1</button>
  <button @click="testData.currentStep = 2">Go to Step 2</button>

  <nck-breadcrumb :options="testData.crumbsOptions" :activeStep="testData.currentStep" ariaLabel="My breadcrumb label"/>
</div>
```

You can put an "error" display to your step.
You can also disable them it will render them unclickable.

```jsx
var testData = {
  currentStep: 2,
  crumbsOptions: [
    { text: "Orders", counter: true, disabled: true, onClick: () => { setStep(0); } },
    { text: "Order n°42", textSecondLine: "pending", counter: true, onClick: () => { setStep(1); } },
    { text: "Product n°123", textSecondLine: "sold out", errorState: true, counter: true, onClick: () => { setStep(2); } }
  ]
};

function setStep(newStep) {
  testData.currentStep = newStep;
}

<div>
  <button @click="testData.currentStep = 0">Go to Step 0</button>
  <button @click="testData.currentStep = 1">Go to Step 1</button>
  <button @click="testData.currentStep = 2">Go to Step 2</button>

  <nck-breadcrumb :options="testData.crumbsOptions" :activeStep="testData.currentStep" ariaLabel="My breadcrumb label"/>
</div>
```

Breadcrumb step can optionally trigger a text-only [information tooltip](#nck-info-tooltip) below the step.

```jsx
var testData = {
  currentStep: 3,
  crumbsOptions: [
    { text: "Outbounds", textSecondLine: "Paris-NYC", counter: true, disabled: true, onClick: () => { setStep(0); }, tooltipHeading: "Tooltip heading" },
    { text: "Returns", textSecondLine: "NYC-SFO", icon: "plane-return", iconOrImageAlternative: "this is an alt", onClick: () => { setStep(1); }, tooltipHeading: "Tooltip heading", tooltipContent: "Tooltip content" },
    { text: "Fares", errorState: true, counter: true, onClick: () => { setStep(2); }, tooltipContent: "Tooltip content" },
    { text: "Seats", counter: true, onClick: () => { setStep(3); }, tooltipHeading: "Tue 19 Jun 1:24 AM - 3:55PM", tooltipContent: "Direct・1 h 25 min" }
  ]
};

function setStep(newStep) {
  testData.currentStep = newStep;
}

<div>
  <button @click="testData.currentStep = 0">Go to Step 0</button>
  <button @click="testData.currentStep = 1">Go to Step 1</button>
  <button @click="testData.currentStep = 2">Go to Step 2</button>
  <button @click="testData.currentStep = 3">Go to Step 3</button>

  <nck-breadcrumb :options="testData.crumbsOptions" :activeStep="testData.currentStep" ariaLabel="My breadcrumb label"/>
</div>
```

You can also set the breadcrumb in "stepperMode". In this mode all steps are visible (previous, current and next) and the past one will display with a checkmark".

```jsx
var testData = {
  currentStep: 1,
  crumbsOptions: [
    { text: "Orders", counter: true, onClick: () => { setStep(0); }, tooltipHeading: "Tooltip heading 1" },
    { text: "Outbound", counter: true, disabled: true, icon: "plane", iconOrImageAlternative: "this is a plane", onClick: () => { setStep(1); }, tooltipHeading: "Tooltip heading 2" },
    { text: "Inbound", counter: true, disabled: false, onClick: () => { setStep(2); },  tooltipHeading: "Tooltip heading 3" },
  ]
};

function setStep(newStep) {
  testData.currentStep = newStep;
}

<div>
  <nck-breadcrumb :options="testData.crumbsOptions" :activeStep="testData.currentStep" ariaLabel="My breadcrumb label" stepperMode />
</div>
```
</docs>
