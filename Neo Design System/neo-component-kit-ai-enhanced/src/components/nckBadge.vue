<template>
  <div
    class="nck-base-badge nck-badge outside-focus nck-style"
    :class="computedClasses"
    :role="hasClickListener ? ariaRole : undefined"
    :tabindex="hasClickListener ? '0' : undefined"
    @[clickEvent]="emitClickWithMouseEvent"
    @[keyDownEvent]="emitClickWithKeydownEvent"
  >
    <nck-icon
      v-if="leadingIcon"
      :iconName="leadingIcon"
      :iconAltText="leadingIconAltText"
      :iconSize="IconSize.XS"
      :primaryColor="badgeColorSet.iconColor"
      :secondaryColor="badgeColorSet.iconColor"
      class="badge-leading-icon"
      :class="{ 'has-label': label }"
    />
    <span v-if="label" v-text="label" />
    <nck-icon
      v-if="trailingIcon"
      :iconName="trailingIcon"
      :iconAltText="trailingIconAltText"
      :iconSize="IconSize.XS"
      :primaryColor="badgeColorSet.iconColor"
      :secondaryColor="badgeColorSet.iconColor"
      class="badge-trailing-icon"
    />
  </div>
</template>

<style lang="less" scoped>
.nck-base-badge.nck-badge {
  .badge-leading-icon {
    margin: -0.1875rem 0;

    &.has-label {
      margin-right: 0.25rem;
    }
  }

  .badge-trailing-icon {
    margin: -0.1875rem 0 -0.1875rem 0.25rem;
  }

  &.nck-interactive {
    cursor: pointer;
  }
}
</style>

<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeMount, ref, watch } from "vue";
import NckIcon from "@/components/nckIcon.vue";
import { BackgroundColors } from "../constants/backgroundColors"; // Deprecated
import { BadgeColor } from "@/constants/badgeColor";
import { BadgeType } from "@/constants/badgeType";
import { Colors } from "@/constants/colors";
import { IconSize } from "@/constants/iconSize";
import { badgeColorSets, type IBadgeColorsProperties } from "@/constants/internal/badgeColorSets";
import { runtimePropValidator } from "@/helpers/runtimePropValidator";
import { useReactiveAttrs } from "@/composables/useReactiveAttrs";

/**
 * @component
 * @displayName nck-badge
 *
 * A component to display text in an highlighted fashion.
 *
 * Prerequisites:
 *
 * - Required translations: none
 */

const props = withDefaults(
  defineProps<{
    /**
     * The aria role of the badge when it is clickable.
     */
    ariaRole?: "button" | "link";

    /**
     * The label to display in the badge.
     * Note: it will overflow if it cannot be fully displayed.
     */
    label?: string;

    /**
     * THIS PROP IS DEPRECATED. Style is now defined by "color" and "type".
     *
     * The font color of the badge text.
     * Use enum "[Colors](#colors)" to fill your color.
     * @deprecated
     */
    fontColor?: Colors;

    /**
     * THIS PROP IS DEPRECATED. Style is now defined by "`color`" and "`type`".
     *
     * The background color for the badge.
     * Use enum "[BackgroundColors](#backgroundcolors)" to fill your color.
     * @deprecated
     */
    backgroundColor?: BackgroundColors;

    /**
     * THIS PROP IS DEPRECATED. Style is now defined by "`color`" and "`type`".
     *
     * The color for the border. Putting no color will remove the border (default).
     * Use enum "[BackgroundColors](#backgroundcolors)" to fill your color.
     * @deprecated
     */
    borderColor?: BackgroundColors;

    /**
     * Color of the badge ([BadgeColor](#badgecolor))
     */
    color?: BadgeColor;

    /**
     * Make the badge hoverable so user have hints they can interact with it.
     * Note this gives no interaction whatsoever and it is up to you to implement your interaction.
     */
    interactive?: boolean;

    /**
     * Name of the icon to be displayed on the left (from [Neo Icon Kit](https://github.com/GBT-NEO/neo-icon-kit)).
     *
     * Colors of the icon will be defined by "`color`" and "`type`".
     */
    leadingIcon?: string;

    /**
     * Alternative text for leading icon for accessibility. This is required if label is not provided.
     */
    leadingIconAltText?: string;

    /**
     * Name of the icon to be displayed on the right (from [Neo Icon Kit](https://github.com/GBT-NEO/neo-icon-kit)).
     * Must be used alongside label.
     *
     * Colors of the icon will be defined by "`color`" and "`type`".
     */
    trailingIcon?: string;

    /**
     * Alternative text for trailing icon for accessibility.
     */
    trailingIconAltText?: string;

    /**
     * Type of the badge ([BadgeType](#badgetype))
     */
    type?: BadgeType;
  }>(),
  {
    label: "",
    fontColor: Colors.WHITE,
    backgroundColor: BackgroundColors.BRIGHT_BLUE_300,
    color: BadgeColor.BRIGHT_BLUE,
    leadingIconAltText: "",
    trailingIconAltText: "",
    type: BadgeType.SUBTLE,
    interactive: false,
  },
);

const emits = defineEmits<{
  /**
   * Emitted when the badge is clicked (or click is emulated with keyboard).
   *
   * If defined, the badge must have a _trailingIcon_ and an _ariaRole_.
   */
  (e: "click", $event: MouseEvent | KeyboardEvent): void;
}>();

const instance = getCurrentInstance()?.proxy;
const attributes = useReactiveAttrs();
const hasClickListener = ref(false);

onBeforeMount(() => {
  const $vnode = instance?.$.vnode;

  if (!props.label.length && props.trailingIcon) {
    throw new Error(
      "Error in NckBadge: Trailing icon is only used alongside label. For an icon-only badge, please use leadingIcon.",
    );
  }
  if (!props.label.length && (!props.leadingIcon || !props.leadingIconAltText.length)) {
    throw new Error(
      "Error in NckBadge: Badge must contain label or icon. For badge with icon only, you need to provide a non-empty leadingIconAltText.",
    );
  }
  if (hasClickListener.value && (!props.trailingIcon || !props.ariaRole)) {
    throw new Error(
      "Error in NckBadge: When a click listener is set, the badge must have both a trailing icon and an aria role defined.",
    );
  }
  if (
    $vnode?.props &&
    ("backgroundColor" in $vnode.props || "borderColor" in $vnode.props || "fontColor" in $vnode.props)
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning in NckBadge: 'backgroundColor', 'borderColor' and 'fontColor' are deprecated. Please use the 'color' and 'type' to define the style of the badge.",
    );
  }
});

runtimePropValidator(
  props,
  "fontColor",
  (val: BackgroundColors) => Object.values(BackgroundColors).includes(val) || val === undefined,
);
runtimePropValidator(
  props,
  "backgroundColor",
  (val: BackgroundColors) => Object.values(BackgroundColors).includes(val) || val === undefined,
);
runtimePropValidator(
  props,
  "borderColor",
  (val: BackgroundColors) => Object.values(BackgroundColors).includes(val) || val === undefined,
);
runtimePropValidator(props, "color", (val: BadgeColor) => Object.values(BadgeColor).includes(val) || val === undefined);
runtimePropValidator(props, "type", (val: BadgeType) => Object.values(BadgeType).includes(val) || val === undefined);

const badgeColorSet = computed<IBadgeColorsProperties>(() => {
  return badgeColorSets[props.color][props.type];
});

// TO BE REMOVED: Backward compatibility for deprecated backgroundColor, borderColor, fontColor
const computedClasses = computed<string[]>(() => {
  const $vnode = instance?.$.vnode;
  // TO BE REMOVED: Backward compatibility for deprecated backgroundColor, borderColor, fontColor
  if (
    $vnode?.props &&
    !("color" in $vnode.props) &&
    !("type" in $vnode.props) &&
    ("backgroundColor" in $vnode.props || "borderColor" in $vnode.props || "fontColor" in $vnode.props)
  ) {
    const classes = [`font-color-${props.fontColor}`, `background-color-${props.backgroundColor}`];

    if (props.borderColor) {
      classes.push("with-border");
      classes.push(`border-color-${props.borderColor}`);
    }

    if (props.interactive || hasClickListener.value) {
      classes.push("nck-interactive");
      classes.push(`background-color-hover-${props.backgroundColor}`);
    }

    return classes;
  }

  const classes = [
    `font-color-${badgeColorSet.value.labelColor}`,
    `background-color-${badgeColorSet.value.backgroundColor}`,
  ];

  if (badgeColorSet.value.borderColor) {
    classes.push("with-border");
    classes.push(`border-color-${badgeColorSet.value.borderColor}`);
  }

  if (props.interactive || hasClickListener.value) {
    classes.push("nck-interactive");
    classes.push(`background-color-hover-${badgeColorSet.value.backgroundColor}`);
  }

  return classes;
});

const clickEvent = computed(() => {
  return hasClickListener.value ? "click" : null;
});

const keyDownEvent = computed(() => {
  return hasClickListener.value ? "keydown" : null;
});

function emitClickWithMouseEvent($event: MouseEvent) {
  emits("click", $event);
}

function emitClickWithKeydownEvent($event: KeyboardEvent) {
  if ($event.key === "Enter" || (props.ariaRole === "button" && $event.key === " ")) {
    $event.preventDefault();
    $event.stopPropagation();
    emits("click", $event);
  }
}

watch(
  attributes,
  () => {
    hasClickListener.value = !!attributes.value.onClick;
  },
  { immediate: true, deep: true },
);
</script>

<docs>
Badge with default values.
```js
<nck-badge label="Badge with default parameter" />
```

SUBTLE badges
```js
<div class="background-color-ink-100">
  <p>
    <nck-badge label="Bright blue" :type="BadgeType.SUBTLE" :color="BadgeColor.BRIGHT_BLUE" />
    <nck-badge label="Blue grey" :type="BadgeType.SUBTLE" :color="BadgeColor.BLUE_GREY" />
    <nck-badge label="Deep blue" :type="BadgeType.SUBTLE" :color="BadgeColor.DEEP_BLUE" />
    <nck-badge label="Green" :type="BadgeType.SUBTLE" :color="BadgeColor.GREEN" />
    <nck-badge label="Orange" :type="BadgeType.SUBTLE" :color="BadgeColor.ORANGE" />
    <nck-badge label="Red" :type="BadgeType.SUBTLE" :color="BadgeColor.RED" />
    <nck-badge label="White" :type="BadgeType.SUBTLE" :color="BadgeColor.WHITE" />
    <nck-badge label="Yellow" :type="BadgeType.SUBTLE" :color="BadgeColor.YELLOW" />
  </p>
  <p>
    <nck-badge label="Bright blue" :type="BadgeType.SUBTLE" :color="BadgeColor.BRIGHT_BLUE" leading-icon="dollar" />
    <nck-badge label="Blue grey" :type="BadgeType.SUBTLE" :color="BadgeColor.BLUE_GREY" leading-icon="dollar" />
    <nck-badge label="Deep blue" :type="BadgeType.SUBTLE" :color="BadgeColor.DEEP_BLUE" leading-icon="dollar" />
    <nck-badge label="Green" :type="BadgeType.SUBTLE" :color="BadgeColor.GREEN" leading-icon="dollar" />
    <nck-badge label="Orange" :type="BadgeType.SUBTLE" :color="BadgeColor.ORANGE" leading-icon="dollar" />
    <nck-badge label="Red" :type="BadgeType.SUBTLE" :color="BadgeColor.RED" leading-icon="dollar" />
    <nck-badge label="White" :type="BadgeType.SUBTLE" :color="BadgeColor.WHITE" leading-icon="dollar" />
    <nck-badge label="Yellow" :type="BadgeType.SUBTLE" :color="BadgeColor.YELLOW" leading-icon="dollar" />
  </p>
</div>
```

OUTLINE badges.
```js
<div>
  <p>
    <nck-badge label="Bright blue" :type="BadgeType.OUTLINE" :color="BadgeColor.BRIGHT_BLUE" />
    <nck-badge label="Blue grey" :type="BadgeType.OUTLINE" :color="BadgeColor.BLUE_GREY" />
    <nck-badge label="Deep blue" :type="BadgeType.OUTLINE" :color="BadgeColor.DEEP_BLUE" />
    <nck-badge label="Green" :type="BadgeType.OUTLINE" :color="BadgeColor.GREEN" />
    <nck-badge label="Orange" :type="BadgeType.OUTLINE" :color="BadgeColor.ORANGE" />
    <nck-badge label="Red" :type="BadgeType.OUTLINE" :color="BadgeColor.RED" />
    <nck-badge label="White" :type="BadgeType.OUTLINE" :color="BadgeColor.WHITE" />
    <nck-badge label="Yellow" :type="BadgeType.OUTLINE" :color="BadgeColor.YELLOW" />
</p>
  <p>
    <nck-badge label="Bright blue" :type="BadgeType.OUTLINE" :color="BadgeColor.BRIGHT_BLUE" leading-icon="dollar" />
    <nck-badge label="Blue grey" :type="BadgeType.OUTLINE" :color="BadgeColor.BLUE_GREY" leading-icon="dollar" />
    <nck-badge label="Deep blue" :type="BadgeType.OUTLINE" :color="BadgeColor.DEEP_BLUE" leading-icon="dollar" />
    <nck-badge label="Green" :type="BadgeType.OUTLINE" :color="BadgeColor.GREEN" leading-icon="dollar" />
    <nck-badge label="Orange" :type="BadgeType.OUTLINE" :color="BadgeColor.ORANGE" leading-icon="dollar" />
    <nck-badge label="Red" :type="BadgeType.OUTLINE" :color="BadgeColor.RED" leading-icon="dollar" />
    <nck-badge label="White" :type="BadgeType.OUTLINE" :color="BadgeColor.WHITE" leading-icon="dollar" />
    <nck-badge label="Yellow" :type="BadgeType.OUTLINE" :color="BadgeColor.YELLOW" leading-icon="dollar" />
  </p>
</div>
```

SOLID badges.
```js
<div class="background-color-ink-40">
  <p>
    <nck-badge label="Bright blue" :type="BadgeType.SOLID" :color="BadgeColor.BRIGHT_BLUE" />
    <nck-badge label="Blue grey" :type="BadgeType.SOLID" :color="BadgeColor.BLUE_GREY" />
    <nck-badge label="Deep blue" :type="BadgeType.SOLID" :color="BadgeColor.DEEP_BLUE" />
    <nck-badge label="Green" :type="BadgeType.SOLID" :color="BadgeColor.GREEN" />
    <nck-badge label="Orange" :type="BadgeType.SOLID" :color="BadgeColor.ORANGE" />
    <nck-badge label="Red" :type="BadgeType.SOLID" :color="BadgeColor.RED" />
    <nck-badge label="White" :type="BadgeType.SOLID" :color="BadgeColor.WHITE" />
    <nck-badge label="Yellow" :type="BadgeType.SOLID" :color="BadgeColor.YELLOW" />
  </p>
  <p>
    <nck-badge label="Bright blue" :type="BadgeType.SOLID" :color="BadgeColor.BRIGHT_BLUE" leading-icon="dollar" />
    <nck-badge label="Blue grey" :type="BadgeType.SOLID" :color="BadgeColor.BLUE_GREY" leading-icon="dollar" />
    <nck-badge label="Deep blue" :type="BadgeType.SOLID" :color="BadgeColor.DEEP_BLUE" leading-icon="dollar" />
    <nck-badge label="Green" :type="BadgeType.SOLID" :color="BadgeColor.GREEN" leading-icon="dollar" />
    <nck-badge label="Orange" :type="BadgeType.SOLID" :color="BadgeColor.ORANGE" leading-icon="dollar" />
    <nck-badge label="Red" :type="BadgeType.SOLID" :color="BadgeColor.RED" leading-icon="dollar" />
    <nck-badge label="White" :type="BadgeType.SOLID" :color="BadgeColor.WHITE" leading-icon="dollar" />
    <nck-badge label="Yellow" :type="BadgeType.SOLID" :color="BadgeColor.YELLOW" leading-icon="dollar" />
  </p>
</div>
```

With trailing icon. An alternative text can be provided.
```js
<nck-badge label="Bright blue" :type="BadgeType.SOLID" :color="BadgeColor.BRIGHT_BLUE" trailing-icon="dollar" />
<nck-badge label="Orange" :type="BadgeType.SUBTLE" :color="BadgeColor.ORANGE" trailing-icon="dollar" />
<nck-badge label="White" :type="BadgeType.OUTLINE" :color="BadgeColor.WHITE" trailing-icon="dollar" trailing-icon-alt-text="Dollar sign"/>
```

Icon only (use the leading icon). Please note that the alternative text is mandatory in this case.
```js
<nck-badge leading-icon="dollar" leading-icon-alt-text="Dollar sign" />
```

If your badge has some interaction associated to it (e.g. showing a tooltip), then add the "interactive" prop to show
your user hints that it can be interacted with.
```js
<nck-badge label="interactive badge. Hover me!" interactive
  v-nck-info-tooltip="'I\'m a tooltip put on a badge. Don\'t forget interactive to have hover style'" />
```

You can add a click event as the desired interaction for the badge.
In that case you must provide a trailing icon and an aria role.
```js
function badgeClicked() { alert('Thanks for clicking!'); };
<nck-badge label="Click me" aria-role="button" trailing-icon="dollar" @click="badgeClicked()" />
```
</docs>
