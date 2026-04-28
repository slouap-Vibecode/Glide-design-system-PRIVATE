<template>
  <div class="nck-style nck-internal nck-header">
    <div class="header-container" :class="headerContainerClasses">
      <component
        v-if="leftIconName"
        :is="leftIconAriaRole === 'button' ? 'button' : 'a'"
        class="header-icon outside-focus header-icon-alignment-left"
        :href="leftIconAriaRole === 'link' ? 'javascript:void(0)' : null"
        @click="$emit('page-header-left-icon-clicked')"
      >
        <nck-icon
          :iconSize="IconSize.M"
          :iconName="leftIconName"
          :iconAltText="leftIconAltText ?? ''"
          :primaryColor="IconColors.BLUE_GREY_600"
          :secondaryColor="IconColors.BLUE_GREY_600"
        ></nck-icon>
      </component>
      <a
        v-if="backlink"
        href="javascript:void(0)"
        class="header-backlink header-icon outside-focus header-icon-alignment-left"
        @click="emitBacklinkClikedEvent"
      >
        <nck-icon
          :iconSize="IconSize.M"
          iconName="left"
          :iconAltText="backlink"
          :primaryColor="IconColors.BLUE_GREY_600"
          :secondaryColor="IconColors.BLUE_GREY_600"
        ></nck-icon>
      </a>

      <div class="header-text" :class="textContainerClasses">
        <div v-if="backlink" class="header-backlink text-s">
          <a class="outside-focus" href="javascript:void(0)" @click="emitBacklinkClikedEvent">
            <nck-icon
              :iconSize="IconSize.XS"
              iconName="left"
              iconAltText=""
              :primaryColor="IconColors.BRIGHT_BLUE_300"
            ></nck-icon>
            {{ backlink }}
          </a>
        </div>

        <div class="header-text-content" :class="textContentContainerClasses">
          <div class="header-title-and-subtitle">
            <h1 v-show="title || hasTitleContent" class="header-title">
              <template v-if="hasTitleContent">
                <!-- @slot Slot for customizing the title area. -->
                <slot name="title-content"></slot>
              </template>
              <template v-else>
                {{ title }}
              </template>
              <span v-if="subtitle && subtitlePosition === 'inline'" class="header-subtitle inline">{{
                subtitle
              }}</span>
            </h1>
            <p v-if="subtitle && subtitlePosition === 'under'" class="header-subtitle under">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="hasTrailingContent" class="trailing-content">
        <!-- @slot Slot for customizing the right-side area, in place of a right button. -->
        <slot name="trailing-content"></slot>
      </div>

      <component
        v-if="rightIconName"
        :is="rightIconAriaRole === 'button' ? 'button' : 'a'"
        class="header-icon outside-focus header-icon-alignment-right"
        :href="rightIconAriaRole === 'link' ? 'javascript:void(0)' : null"
        @click="$emit('page-header-right-icon-clicked')"
      >
        <nck-icon
          :iconSize="IconSize.M"
          :iconName="rightIconName"
          :iconAltText="rightIconAltText ?? ''"
          :primaryColor="IconColors.BLUE_GREY_600"
          :secondaryColor="IconColors.BLUE_GREY_600"
        ></nck-icon>
      </component>
      <template v-if="rightButtonLabel">
        <nck-button
          class="header-right-button"
          :label="rightButtonLabel"
          :type="ButtonType.OUTLINE"
          :ariaRole="rightButtonAriaRole"
          @click="emitRightButtonClikedEvent"
        />
        <button
          class="header-right-button header-icon outside-focus header-icon-alignment-right"
          @click="emitRightButtonClikedEvent"
        >
          <nck-icon
            v-if="rightButtonIconName"
            :iconSize="IconSize.M"
            :iconName="rightButtonIconName"
            :iconAltText="rightButtonLabel"
            :primaryColor="IconColors.BLUE_GREY_600"
            :secondaryColor="IconColors.BLUE_GREY_600"
          ></nck-icon>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, useSlots } from "vue";
import { IconColors } from "../constants/iconColors";
import { IconSize } from "../constants/iconSize";
import { ButtonType } from "../constants/buttonType";
import NckButton from "./nckButton.vue";
import NckIcon from "./nckIcon.vue";
import { HeaderType } from "../constants/headerType";

/**
 * @component
 * @displayName nck-header
 * A component to display a header.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 * - [Icons URL](#icons)
 */

const props = defineProps({
  /**
   * Label of the backlink (on desktop resolution).
   * Since the backlink appears as a left icon (a chevron) in tablet/mobile resolutions, this label
   * serves then as its alternative text.
   * Cannot be used along with the leftIconXXX properties.
   */
  backlink: String,

  /**
   * Type of header among [HeaderType](#headertype) enum
   */
  headerType: {
    type: String,
    validator: (val: HeaderType) => Object.values(HeaderType).includes(val),
    default: HeaderType.STANDARD,
  },

  /**
   * Alternative text for the left icon (if any) for accessibility.
   * Mandatory if the left icon is present, and must not be empty in that case.
   */
  leftIconAltText: String,

  /**
   * The aria-role, link or button, for the left icon.
   * Mandatory if the left icon is present.
   * @values "button", "link"
   */
  leftIconAriaRole: {
    type: String,
    validator: (val: string) => ["link", "button"].includes(val),
  },

  /**
   * Name of an optional icon to display on the left.
   * Cannot be used along with the backlink property.
   * This icon's primary & secondary colors are overridden to [Colors](#colors).BLUE\_GREY\_600.
   */
  leftIconName: String,

  /**
   * The aria-role, link or button, for the right button.
   * Mandatory if the right button label is present.
   * @values "button", "link"
   */
  rightButtonAriaRole: {
    type: String as PropType<"link" | "button">,
    validator: (val: string) => ["link", "button"].includes(val),
  },

  /**
   * Icon name for the right button since it is displayed as an icon in tablet/mobile resolutions.
   * Mandatory if rightButtonLabel is defined.
   * Cannot be used along with the rightIconXXX properties.
   * This icon's primary & secondary colors are overridden to [Colors](#colors).BLUE\_GREY\_600
   * at lower resolutions when this button turns to an icon.
   */
  rightButtonIconName: String,

  /**
   * Label of an optional button to display on the right.
   * Since the right button appears as a right icon in low resolutions, this label
   * serves then as its alternative text.
   * Cannot be used along with the rightIconXXX properties.
   * The property rightButtonIconName must be defined too.
   */
  rightButtonLabel: String,

  /**
   * Alternative text for the right icon (if any) for accessibility.
   * Mandatory if the right icon is present, and must not be empty in that case.
   */
  rightIconAltText: String,

  /**
   * The aria-role, link or button, for the right icon.
   * Mandatory if the right icon is present.
   * @values "button", "link"
   */
  rightIconAriaRole: {
    type: String,
    validator: (val: string) => ["link", "button"].includes(val),
  },

  /**
   * Name of an optional icon to display on the right.
   * Cannot be used along with the rightButton property.
   * This icon's primary & secondary colors are overridden to [Colors](#colors).BLUE\_GREY\_600.
   */
  rightIconName: String,

  /**
   * Used for showing or hiding the header divider.
   * @default true
   */
  showDivider: {
    type: Boolean,
    default: true,
  },

  /**
   * Subtitle of the header.
   * @default ""
   */
  subtitle: {
    type: String,
    default: "",
  },

  /**
   * Position of the header subtitle. This is only respected at large resolution.
   * @values "inline", "under"
   * @default "under"
   */
  subtitlePosition: {
    type: String,
    validator: (value: string) => ["inline", "under"].includes(value),
    default: "under",
  },

  /**
   * The title of the header. For more complex title content, you can use the `title-content` slot.
   * @default ""
   */
  title: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  /**
   * Emitted when icon on the left of the header is clicked; only if the left icon is present
   */
  (e: "page-header-left-icon-clicked"): void;

  /**
   * Emitted when icon on the right of the header is clicked; only if the right icon is present
   */
  (e: "page-header-right-icon-clicked"): void;

  /**
   * Emitted when the right button is clicked.
   */
  (e: "page-header-right-button-clicked"): void;

  /**
   * Emitted when the backlink is clicked
   */
  (e: "page-header-backlink-clicked"): void;
}>();

/*
 * CSS classes for the header text element.
 */
const textContainerClasses = () => {
  if (props.headerType === HeaderType.CONDENSED) {
    return props.subtitle ? ["header-condensed-with-subtitle"] : ["header-condensed"];
  }
};

const slots = useSlots();

/*
 * CSS classes for the header text element.
 */
const textContentContainerClasses = computed(() => {
  const classes = [];
  classes.push("header-alignment-left");

  const leftIcon = props.leftIconName ?? props.backlink;
  const rightIcon = props.rightIconName ?? props.rightButtonLabel;
  if (leftIcon && !rightIcon) {
    classes.push("header-with-left-icon-only");
    if (!hasTrailingContent.value) {
      classes.push("header-with-left-icon-only-spacer");
    }
  } else if (!leftIcon && rightIcon) {
    classes.push("header-with-right-icon-only");
  } else if (leftIcon && rightIcon) {
    classes.push("header-with-both-icons");
  }

  if (props.backlink) {
    classes.push("header-with-backlink");
  }
  if (props.rightButtonLabel) {
    classes.push("header-with-right-button");
  }
  return classes;
});

/*
 * CSS classes for the header container.
 */
const headerContainerClasses = computed(() => {
  return props.showDivider ? ["header-divider"] : [];
});

const hasTitleContent = computed(() => {
  return Boolean(slots?.["title-content"]);
});

const hasTrailingContent = computed(() => {
  return Boolean(slots?.["trailing-content"]);
});

function checkRightButtonIntegrity() {
  if (props.rightIconName && props.rightButtonLabel) {
    throw new Error("Error in nckHeader: rightButtonLabel and rightIconName are mutually exclusive.");
  }
  if (props.rightButtonLabel && !props.rightButtonIconName) {
    throw new Error("Error in nckHeader: when defining rightButtonLabel, rightButtonIconName is mandatory.");
  }
  if (props.rightButtonLabel && !props.rightButtonAriaRole) {
    throw new Error("Error in nckHeader: when defining rightButtonLabel, rightButtonAriaRole is mandatory.");
  }
  if (props.rightIconName && !props.rightIconAriaRole) {
    throw new Error("Error in nckHeader: rightIconAriaRole is mandatory for the right icon.");
  }
  if (props.rightIconName && !props.rightIconAltText) {
    throw new Error(
      "Error in nckHeader: A non-empty alternative text is mandatory for the right icon when displayed as it's the only content of a button without label.",
    );
  }
}

function checkLeftButtonIntegrity() {
  if (props.leftIconName && !props.leftIconAltText) {
    throw new Error(
      "Error in nckHeader: A non-empty alternative text is mandatory for the left icon when displayed as it's the only content of a button without label.",
    );
  }
  if (props.leftIconName && !props.leftIconAriaRole) {
    throw new Error("Error in nckHeader: leftIconAriaRole is mandatory for the left icon.");
  }
  if (!props.title && !hasTitleContent.value && !props.leftIconName && !props.rightIconName) {
    throw new Error(
      "Error in nckHeader: No title or icon is set. A minimum of either the title, title-content, left icon name or right icon name must be present.",
    );
  }
}

function checkTrailingContentIntegrity() {
  if (hasTrailingContent.value && props.rightIconName) {
    throw new Error("Error in nckHeader: when using slot 'trailing-content', rightIcon should not be set.");
  }
  if (hasTrailingContent.value && props.rightButtonLabel) {
    throw new Error("Error in nckHeader: when using slot 'trailing-content', rightButton should not be set.");
  }
}

function checkTitleIntegrity() {
  if (hasTitleContent.value && props.title) {
    throw new Error("Error in nckHeader: when using slot 'title-content', title should not be set.");
  }
  if (!props.title && !hasTitleContent.value && props.subtitle) {
    throw new Error("Error in nckHeader: Setting a subtitle without setting a title is not an accepted use case.");
  }
}

onMounted(() => {
  if (props.leftIconName && props.backlink) {
    throw new Error(
      "Error in nckHeader: backlink and leftIconName are mutually exclusive, since the backlink turns to an icon on low resolutions.",
    );
  }
  checkRightButtonIntegrity();
  checkLeftButtonIntegrity();
  checkTrailingContentIntegrity();
  checkTitleIntegrity();
});

function emitRightButtonClikedEvent() {
  emits("page-header-right-button-clicked");
}

function emitBacklinkClikedEvent() {
  emits("page-header-backlink-clicked");
}
</script>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/breakpointsVariables.less";
@import (reference) "../styles/animationsVariables.less";
@import (reference) "../styles/typography.less";

.nck-style.nck-header {
  background-color: var(--white);

  .header-container {
    display: flex;
    align-items: center;

    @media @desktop {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .header-icon {
    margin: 0.375rem 0.5rem;
    padding: 0.5rem;
    border: none;
    background-color: transparent;
  }

  .header-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: visible;
    margin: 0.75rem 0;

    @media @desktop {
      margin: 1.5rem 0;
      &.header-condensed {
        margin-bottom: 1rem;
      }
      &.header-condensed-with-subtitle {
        margin-bottom: 0.5rem;
      }
    }

    .header-title-and-subtitle {
      flex-grow: 1;
      text-align: left;
    }

    .header-title {
      color: var(--nck-text-default);
      margin: 0;
      white-space: normal;
      overflow-wrap: break-word;
      .header-2();

      @media @desktop {
        .header-1();
      }
    }

    .header-subtitle {
      margin: 0;
      color: var(--nck-text-secondary);
      .text-m();

      @media @desktop {
        .text-l();
        &.under {
          margin-top: 0.25rem;
        }
        &.inline {
          margin-left: 0.375rem;
        }
      }

      @media @tablet, @phone {
        margin-top: 0.25rem;
        display: block;
      }
    }

    .header-text-content {
      display: flex;
      @media @tablet, @phone {
        margin: 0 1rem;
      }
      @media @desktop {
        margin: 0 0.5rem; /* becomes 1.5rem with header container padding */
      }
      &.header-alignment-left {
        .header-title,
        .header-subtitle {
          text-align: left;
          @media @tablet, @phone {
            text-align: center;
          }
        }
        &.header-with-left-icon-only {
          @media @tablet, @phone {
            margin: 0 1rem 0 0;
          }

          @media @desktop {
            margin: 0 0.5rem 0 0;
          }

          &.header-with-left-icon-only-spacer {
            @media @tablet, @phone {
              margin: 0 3.5rem 0 0;
            }
          }
        }
        &.header-with-right-icon-only {
          @media @tablet, @phone {
            margin: 0 0 0 3.5rem;
          }
          @media @desktop {
            margin: 0 0 0 0.5rem;
          }
        }
      }
      &.header-with-both-icons {
        margin: 0;
      }
      /* specific cases on desktop for the backlink or right button */
      @media @desktop {
        &.header-with-left-icon-only.header-with-backlink {
          margin: 0 0.5rem;
        }
        &.header-alignment-left.header-with-both-icons.header-with-backlink {
          margin-left: 0.5rem;
        }
      }
    }
  }

  .header-divider {
    border-bottom: var(--nck-border-width-s) solid var(--nck-border-neutral);
  }

  .header-backlink {
    margin-left: var(--nck-spacing-s);
    margin-bottom: var(--nck-spacing-s);
    text-align: left;
    &:not(.header-icon) {
      @media @tablet, @phone {
        display: none;
      }
    }
    &.header-icon {
      @media @desktop {
        display: none;
      }
    }
    a {
      display: inline-flex;
      align-items: center;
      border-radius: var(--nck-radius-s);
      color: var(--nck-text-brand);
      text-decoration: none;
      padding-right: 0.25rem;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .header-right-button {
    &.header-icon {
      @media @desktop {
        display: none;
      }
    }
    &:not(.header-icon) {
      margin: 0 0.5rem;
      @media @tablet, @phone {
        display: none;
      }
    }
  }

  .trailing-content {
    display: flex;
    align-items: center;
    padding: 0 1rem 0 0.5rem;
    flex-wrap: wrap;

    @media @desktop {
      padding: 0 0.5rem 0 1rem;
    }
  }
}
</style>

<docs>
Here is an example of a header with both the title and an icon button on the left.
Note that the alternative text and aria role are mandatory for the icon.

```js
<nck-header title="Some title" leftIconName="chevron-left-s" leftIconAltText="Some alternative text" leftIconAriaRole="button"></nck-header>
```

You can have a header with only the title.

```js
<nck-header title="Some title"></nck-header>
```

Conversely, you can omit the title if there is at least one icon button. Here, there is one icon button on the left.

```js
<nck-header leftIconName="chevron-left-s" leftIconAltText="Some alternative text"  leftIconAriaRole="button"></nck-header>
```

Here the icon button is on the right.

```js
<nck-header rightIconName="chevron-right-s" rightIconAltText="Some alternative text" rightIconAriaRole="button"></nck-header>
```

You can have icon buttons on both sides, with or without title.

```js
<nck-header title="Some title" leftIconName="chevron-left-s" leftIconAltText="Some alternative text" leftIconAriaRole="button" rightIconName="close-dark" rightIconAltText="Some other alternative text" rightIconAriaRole="button"></nck-header>
```

An optional subtitle can be set.

```js
<nck-header title="Some title" subtitle="Some subtitle" leftIconName="close-dark" leftIconAltText="Some alternative text" leftIconAriaRole="button"></nck-header>
```

The header can be displayed in condensed mode (smaller paddings/margins). This is particularly indicated when immediately followed by [Tabs](#ncktabs) or Chips.

```js
<nck-header headerType="Condensed" title="Some title" subtitle="Some subtitle"></nck-header>
```

Subtitle horizontal alignment is governed by the title's one.

```js
<nck-header title="Some title" subtitle="Some subtitle" rightIconName="close-dark" rightIconAltText="Some alternative text" rightIconAriaRole="button"></nck-header>
```

By default, the subtitle appears below the title.
It can also be set on the same line as the title, but this setting will apply only when the header is displayed at high resolutions.

```js
<nck-header title="Some title" subtitle="Some subtitle" subtitlePosition="inline"></nck-header>
```

You can also choose not to have a divider under the title and the icon button.

```js
<nck-header title="Some title" leftIconName="chevron-left-s" leftIconAltText="Some alternative text" leftIconAriaRole="button" :showDivider="false"></nck-header>
```

You can have a backlink on the left. On high resolutions it appears as an anchor above the title, on low resolutions as an icon.
The label serves also as the alternative text for the icon.
You cannot have the left icon properties if you already have a backlink.

```js
<nck-header title="Some title" backlink="A backlink" :showDivider="false"></nck-header>
```

You can have a right button on the right. This button will appear as an icon on low resolutions.
The button label serves also as the alternative text for the icon.
You cannot set the right icon properties if you already have a right button.

```js
<nck-header title="Some title" rightButtonLabel="close" rightButtonIconName="close-dark" rightButtonAriaRole="link" :showDivider="false"></nck-header>
```

Using this component without providing a title or an icon name for one the icon buttons will cause an error because the header would otherwise be empty.

Failing to provide a non-empty alternative text for the icon will also cause an error because the icon is the only content of a button.

You can use a slot to customize the part at the right of the title.
However, you can't use this slot with a right icon or a right button

```js
<nck-header title="Some title"><template v-slot:trailing-content>I am a slot!</template></nck-header>
```
You can also use a slot to customize the title area.
In this case, the title property must not be set.

Below is an example with an editable title.
```js
import { ref } from "vue";
const editableTitle = ref("Editable title");
const editedTitle = ref("Editable title");
const editingTitle = ref(false);

<nck-header>
  <template v-slot:title-content>
    <div v-if="editingTitle" style="display: flex; align-items: center">
      <nck-text-input v-model="editedTitle" label="Editable title" />
      <nck-button style="margin-left: 1rem" leftIcon="tick" iconAltText="OK" :color="ButtonColor.POSITIVE" @click="editableTitle = editedTitle; editingTitle = false" />
      <nck-button style="margin-left: 1rem" leftIcon="close" iconAltText="OK" :color="ButtonColor.NEGATIVE" @click="editingTitle = false; editedTitle = editableTitle" />
    </div>
    <div v-else>
      <span>{{ editableTitle }}</span>
      <nck-button style="margin-left: 1rem" leftIcon="edit-pencil" iconAltText="Edit" @click="editingTitle = true" />
    </div>
  </template>
</nck-header>
```
</docs>
