<template>
  <div v-if="displayed" class="nck-banner nck-style nck-internal" :class="bannerStyleClasses">
    <nck-icon
      :iconSize="IconSize.XS"
      :iconName="icon.name"
      :iconAltText="alternativeText"
      :primaryColor="icon.color"
      :secondaryColor="icon.color"
      class="nck-banner-icon"
    />
    <div class="nck-banner-content" :class="bannerContentClasses">
      <p class="nck-banner-heading text-s-semibold">
        {{ heading }}
        <nck-clickable-label
          context="NckBanner"
          ref="link"
          :label="linkLabel"
          :ariaRole="linkAriaRole"
          @click="emitClick"
        />
      </p>
      <!-- @slot If needed, one (and only one) NckBannerItemGroup component can go there. -->
      <slot></slot>
    </div>
    <nck-button
      v-if="dismissable"
      class="nck-banner-dismiss"
      leftIcon="close"
      :iconAltText="dismissTitle"
      :type="ButtonType.GHOST"
      :color="ButtonColor.LIGHT"
      :size="ButtonSize.S"
      @click="dismiss"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import NckClickableLabel from "./internal/nckClickableLabel.vue";
import NckIcon from "./nckIcon.vue";
import { BannerType } from "../constants/bannerType";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";
import { IconSize } from "../constants/iconSize";
import { IconColors } from "../constants/iconColors";
import { useReactiveAttrs } from "@/composables/useReactiveAttrs";
import { ButtonType } from "@/constants/buttonType";
import { ButtonColor } from "@/constants/buttonColor";
import { ButtonSize } from "@/constants/buttonSize";
import NckButton from "@/components/nckButton.vue";

/**
 * @component
 * @displayName nck-banner
 * A component to display a piece of text in an highlighted fashion.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - information
 *  - success
 *  - warning
 *  - error
 * - [Icons URL](#icons)
 *
 * @requires ./nckBannerItemGroup.vue
 * @requires ./nckBannerItem.vue
 */

const props = defineProps({
  /**
   * The heading of the banner, only accepts text, no HTML!
   */
  heading: {
    type: String,
    required: true,
  },

  /**
   * The type of banner.
   *
   * Possible value are contained in enum [BannerType](#bannertype)
   * @default BannerType.NEUTRAL
   */
  type: {
    default: BannerType.NEUTRAL,
    validator: (val: BannerType) => Object.values(BannerType).includes(val),
  },

  /**
   * Whether the banner is dismissable (through the cross icon).
   */
  dismissable: {
    type: Boolean,
    default: false,
  },

  /**
   * Whether the banner does not have a border-radius (false by default).
   * @default false
   */
  noRadius: {
    type: Boolean,
    default: false,
  },

  /**
   * The label for the optional link provided in the heading.
   * When provided, you must also provide linkAriaRole, and handle the linkClicked event.
   */
  linkLabel: String,

  /**
   * The aria-role (link|button) for the optional link provided in the heading.
   * When provided, you must also provide linkLabel, and handle the linkClicked event.
   * @values "button", "link"
   */
  linkAriaRole: {
    type: String,
    validator: (val: string) => ["link", "button"].includes(val),
  },

  /**
   * Name of the optional specific icon to be displayed in the banner before the text (from [Neo Icon Kit](https://github.com/GBT-NEO/neo-icon-kit)).
   * If provided, it will replace the default icon associated with the banner type.
   */
  leadingIcon: String,

  /**
   * Optional alternative text for the leading icon (if any), for accessibility purposes.
   * If provided, it will replace the default, which is the configured translation associated with the banner type.
   */
  leadingIconAltText: String,
});

const emits = defineEmits<{
  /**
   * Emitted when the cross icon is clicked (thus dismissing the banner).
   * @param {Event} $event the DOM click event
   */
  (e: "banner-dismissed", event: Event): void;

  /**
   * Emitted when the heading link is clicked.
   * @param {Event} $event the DOM click event
   */
  (e: "link-clicked", event: Event): void;
}>();

const displayed = ref<boolean>(true);
const link = ref<InstanceType<typeof NckClickableLabel> | null>(null);
const attributes = useReactiveAttrs();

const bannerStyleClasses = computed(() => {
  let classes = `nck-banner-${props.type}`;

  if (props.noRadius) {
    classes += " no-radius";
  }

  return classes;
});

const bannerContentClasses = computed(() => {
  return props.dismissable ? ["nck-dismissable"] : [];
});

const icon = computed((): { color: IconColors; name: string } => {
  switch (props.type) {
    case BannerType.INFORMATION:
      return { color: IconColors.BRIGHT_BLUE_300, name: props.leadingIcon ?? "info-support" };
    case BannerType.SUCCESS:
      return { color: IconColors.GREEN_300, name: props.leadingIcon ?? "success" };
    case BannerType.WARNING:
      return { color: IconColors.ORANGE_300, name: props.leadingIcon ?? "warning" };
    case BannerType.ERROR:
      return { color: IconColors.RED_300, name: props.leadingIcon ?? "cancel-circle" };
    default:
      return { color: IconColors.BLUE_GREY_600, name: props.leadingIcon ?? "flag-circle" };
  }
});

// eslint-disable-next-line complexity
const alternativeText = computed((): string => {
  if (props.leadingIconAltText !== undefined) {
    return props.leadingIconAltText;
  }

  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();

  switch (props.type) {
    case BannerType.NEUTRAL || BannerType.INFORMATION:
      return globalOptions?.translations?.information ?? "";
    case BannerType.SUCCESS:
      return globalOptions?.translations?.success ?? "";
    case BannerType.WARNING:
      return globalOptions?.translations?.warning ?? "";
    case BannerType.ERROR:
      return globalOptions?.translations?.error ?? "";
    default:
      return globalOptions?.translations?.information ?? "";
  }
});

const dismissTitle = computed((): string | undefined => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  return globalOptions?.translations?.close;
});

function dismiss($event: Event) {
  displayed.value = false;
  emits("banner-dismissed", $event);
}

function emitClick($event: Event) {
  emits("link-clicked", $event);
}

// eslint-disable-next-line complexity
onMounted(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (
    !globalOptions?.translations?.information ||
    !globalOptions?.translations?.success ||
    !globalOptions?.translations?.warning ||
    !globalOptions?.translations?.error
  ) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the banner component." +
        " Requires 'information', 'success', 'warning','error' ",
    );
  }

  if (!globalOptions?.translations?.close) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the banner component." +
        " Requires 'close' ",
    );
  }

  if (link.value?.isDefined && !attributes.value.onLinkClicked) {
    throw new Error(
      `Error in NckBanner: you provided a link (linkLabel=${props.linkLabel}, linkAriaRole=${props.linkAriaRole}) but no 'link-clicked' event is handled.`,
    );
  }

  if (props.leadingIconAltText !== undefined && !props.leadingIcon) {
    throw new Error("Error in NckBanner: leadingIconAltText can only be used alongside leadingIcon.");
  }
});
</script>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";

.nck-banner.nck-style {
  position: relative;
  display: flex; // when not contained in a flex container, this will make the banner 100% wide
  flex-basis: 100%; // when contained in a flex container, this will ensure it spans 100% of the container (minus side margins).
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--nck-spacing-s) var(--nck-spacing-l);
  border-radius: var(--nck-radius-s);
  background-color: var(--nck-border-neutral);
  &.nck-banner-default {
    background-color: var(--nck-surface-secondary);
  }
  &.nck-banner-success {
    background-color: var(--nck-surface-success-subtle);
  }
  &.nck-banner-info {
    background-color: var(--nck-surface-info-subtle);
  }
  &.nck-banner-warning {
    background-color: var(--nck-surface-warning-subtle);
  }
  &.nck-banner-critical {
    background-color: var(--nck-surface-negative-subtle);
  }
  &.no-radius {
    border-radius: 0;
  }
  .nck-banner-icon {
    display: block;
    flex-shrink: 0;
    margin: 0 var(--nck-spacing-s) 0 0;
    padding: 0.0625rem 0 0.0625rem 0;
  }
  .nck-banner-content {
    flex-grow: 1;
    & .nck-banner-heading {
      display: block;
      position: relative;
      width: 100%;
      margin: 0;
      padding: 0;
      color: var(--nck-text-default);
      text-align: left; /* to force the content on left whatever the parent context define */
    }
    &.nck-dismissable {
      margin-right: 1.75rem;
    }
  }
  .nck-banner-dismiss {
    position: absolute;
    top: 0;
    right: 0.6875rem;
    width: 2.125rem;
    height: 2.125rem;
  }
}
</style>

<docs>
The basic usage requires only the _heading_ property : this will give you the default banner type.
Or you can precise the banner type, with the _type_ property.

```jsx
<div style="display:flex; flex-direction:column; gap:0.5rem">
  <nck-banner heading="Default banner"></nck-banner>
  <nck-banner :type="BannerType.INFO" heading="Information banner."></nck-banner>
  <nck-banner :type="BannerType.SUCCESS" heading="Success banner."></nck-banner>
  <nck-banner :type="BannerType.WARNING" heading="Warning banner."></nck-banner>
</div>
```

_Default_ banner.

```js
<nck-banner heading="This is a default banner."></nck-banner>
```

_Information_ banner.

```js
<nck-banner type="info" heading="This is just a piece of information."></nck-banner>
```

_Success_ banner.

```js
<nck-banner type="success" heading="Good news, everything went well!"></nck-banner>
```

_Warning_ banner.

```js
<nck-banner type="warning" heading="Careful there..."></nck-banner>
```

_Error_ banner.

```js
<nck-banner type="critical" heading="Everything utterly failed :("></nck-banner>
```

It is possible have a cross icon to dismiss a banner : use the _dismissable_ property.

```js
<nck-banner type="success" heading="If you click on the cross, this will dismiss me..." dismissable></nck-banner>
```

In that case, it is also possible to listen to the dismissal.

```js
function dismiss() { alert('You couldn\'t help it, could you?')}
<nck-banner type="success" heading="No no, don't click that cross..." dismissable @banner-dismissed="dismiss"></nck-banner>
```

It is possible have a banner without a border radius : use the _noRadius_ property.

```js
<nck-banner type="critical" heading="I have no radius." noRadius></nck-banner>
```

A banner can have additional lines of text.
To achieve that you must use the sub-components <a href="#nckbanneritemgroup">NckBannerItemGroup</a> and <a href="#nckbanneritem">NckBannerItem</a>.
The items are rendered as a bulleted list.

```js
<nck-banner type="success" heading="This is the heading.">
  <nck-banner-item-group>
    <nck-banner-item text="This is line 1..." />
    <nck-banner-item text="and line 2..." />
    <nck-banner-item text="and line 3." />
  </nck-banner-item-group>
 </nck-banner>
```

The heading, as well as each body item, can end with a link.
Either on the Nckbanner or the NckBannerItem you then provide together :
- the property _linkLabel_, the label which will be clickable,
- the property _linkAriaRole_ (link|button), the behavior of this link regarding accessibility,
- and an event clik handler, _link-clicked_.

```js
function linkClicked() { alert('Thanks for clicking!'); }

<nck-banner type="success" heading="This heading ends with a link label." linkLabel="Click here." linkAriaRole="link" @link-clicked="linkClicked()">
  <nck-banner-item-group>
    <nck-banner-item text="This item has no link..." />
    <nck-banner-item text="but this one has one behaving like a button. Side note, don't mix up translations. Define two clear sentences, one for the text, one for the button." linkLabel="Clear and separate button label." linkAriaRole="button" @link-clicked="linkClicked()" />
  </nck-banner-item-group>
 </nck-banner>
```

The default icon for the banner type can be overridden by providing a specific icon name.
In that case, you can also provide an alternative text for accessibility (otherwise the translated text configured for this banner type will be used).

```js
<nck-banner type="success" heading="Your coffee is ready." leading-icon="breakfast" leading-icon-alt-text="Coffee cup"></nck-banner>
```
</docs>
