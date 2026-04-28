<style lang="less">
@import (reference) "../styles/colorsVariables.less";

/* scoped has been removed from style tag, I don't like that
  but it is a mean so that SVG style benefits the style, because it is dynamically generated
  otherwise it is the deep selector and it is annoying to use */
.nck-style.nck-icon {
  display: inline-block;
  line-height: 0;
  vertical-align: middle;

  /* stylelint doesn't infer correctly in vue file it seems, causing each to be unknow
  forcing "less" in config causes a list of errors everywhere (the @import I think) */

  /* stylelint-disable */
  each(@icon-colors, {  /* stylelint-disable-line */
    &.primary-color-@{key} svg .svg-primary-fill {
      fill: @value;
    }

    &.secondary-color-@{key} svg .svg-secondary-fill {
      fill: @value;
    }
  });
  /* stylelint-enable */

  /* browsers at high zoom levels fail to round correctly hence overflowing a bit
  some 3rd party app is hidding svg overflow. Let's display so that icons won't appear cut at
  high zoom levels. */
  svg:not(:root) {
    overflow: visible;
  }

  &.nck-icon-xxs,
  &.nck-icon-xs,
  &.nck-icon-s,
  &.nck-icon-m,
  &.nck-icon-l,
  &.nck-icon-xl {
    &.loadingFailed {
      height: auto;
      width: auto;
    }
  }

  // Computing the size using calc allows circumventing this behavior and getting the exact visual size we actually want.
  &.nck-icon-xxs {
    &,
    svg {
      height: 0.5rem;
      width: 0.5rem;
    }
  }
  &.nck-icon-xs {
    &,
    svg {
      height: 1rem;
      width: 1rem;
    }
  }
  &.nck-icon-s {
    &,
    svg {
      height: 1.25rem;
      width: 1.25rem;
    }
  }
  &.nck-icon-m {
    &,
    svg {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
  &.nck-icon-l {
    &,
    svg {
      height: 2rem;
      width: 2rem;
    }
  }
  &.nck-icon-xl {
    &,
    svg {
      height: 3rem;
      width: 3rem;
    }
  }
}
</style>

<script lang="ts">
import { IconSize } from "../constants/iconSize";
import { IconColors } from "@/constants/iconColors";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";
import { computed, defineComponent, nextTick, PropType, ref, h as createElement, watch } from "vue";

/**
 * @component
 * @displayName nck-icon
 * A component to display an icon of KDS icon set.
 *
 * The icons are provided by the [Neo Icon Kit](https://github.com/GBT-NEO/neo-icon-kit).
 * You need to install this package in your project to use the icons.
 *
 * To ask for new icon ask UX to add them to "neo-icon-kit".
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 * - [Icons URL](#icons)
 */

// use defineComponent as we can't use script setup in this case: https://vuejs.org/guide/extras/render-function.html#declaring-render-functions
export default defineComponent({
  props: {
    /**
     * Name of the icon to render.
     * The name of icons are the one from the [Neo Icon Kit](https://github.com/GBT-NEO/neo-icon-kit)
     */
    iconName: { type: String, required: true },

    /**
     * Size at which the icon should be rendered.
     * Accepted values are the [IconSize](#iconsize) enum values
     * @values IconSize enum values.
     */
    iconSize: {
      type: String as PropType<IconSize>,
      validator: (val: IconSize) => Object.values(IconSize).includes(val),
      required: true,
    },

    /**
     * Alternative text for icon for accessibility.
     * @values "" (when purely illustrative), any non-empty string value otherwise
     */
    iconAltText: { type: String, required: true },

    /**
     * Overrides primary color on the icon when provided.
     * The accepted values are the [IconColors](#iconcolors) enum values
     */
    primaryColor: {
      type: String as PropType<IconColors>,
      validator: (val: string) =>
        Object.values(IconColors).includes(val as IconColors) || val === "" || val === undefined || val === null,
    },

    /**
     * Overrides secondary color on the icon when provided, if icon has a secondary color.
     * The accepted values are the [IconColors](#iconcolors) enum values
     */
    secondaryColor: {
      type: String as PropType<IconColors>,
      validator: (val: string) =>
        Object.values(IconColors).includes(val as IconColors) || val === "" || val === undefined || val === null,
    },
  },

  emits: [
    /**
     * Emitted when the icon content is successfully loaded.
     * (Note that icon content is loaded asynchronously based on the icon name.)
     */
    "iconContentLoaded",
    /**
     * Emitted when the icon content failed loading.
     * (Note that icon content is loaded asynchronously based on the icon name.)
     */
    "iconContentFailed",
  ],

  // eslint-disable-next-line max-lines-per-function
  setup(props, { emit }) {
    const iconContent = ref("");
    const loadingFailed = ref(false);

    const iconStyleClasses = computed(() => {
      const iconClasses = [`nck-icon-${props.iconSize}`];
      if (typeof props.primaryColor === "string" && props.primaryColor.length > 0) {
        iconClasses.push(`primary-color-${props.primaryColor}`);
      }
      if (typeof props.secondaryColor === "string" && props.secondaryColor.length > 0) {
        iconClasses.push(`secondary-color-${props.secondaryColor}`);
      }
      if (loadingFailed.value) {
        iconClasses.push("loadingFailed");
      }
      return iconClasses;
    });

    const iconURL = computed(() => {
      const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
      if (!globalOptions?.urls?.iconsURL) {
        throw new Error("Error: you must provide the iconsURL for NCKIcon to work");
      }

      return `${globalOptions.urls.iconsURL}${props.iconName}.svg`;
    });

    function obtainIconContent() {
      createOrGetIconRetrievalPromise()
        .then((data) => {
          iconContent.value = data;
          void nextTick(() => {
            emit("iconContentLoaded");
          });
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : JSON.stringify(error);
          // eslint-disable-next-line no-console
          console.error(`Icon ${props.iconName} could not be retrieved: ${message}`);
          setIconFailedContext();
        });
    }

    function setIconFailedContext() {
      loadingFailed.value = true;
      iconContent.value = props.iconAltText;
      void nextTick(() => {
        emit("iconContentFailed");
      });
    }

    async function createOrGetIconRetrievalPromise() {
      let promise = window.neoIconsPromiseMap.get(iconURL.value);
      if (!promise) {
        promise = fetch(iconURL.value).then(async (response) => {
          if (response.ok) {
            return await response.text();
          } else {
            if (response.status === 404) {
              return await Promise.reject(new Error(`Icon ${props.iconName} does not exist`));
            } else {
              return await Promise.reject(new Error(`Request failed with status: ${response.status}`));
            }
          }
        });
        window.neoIconsPromiseMap.set(iconURL.value, promise);
      }
      return await promise;
    }

    watch(() => iconURL.value, obtainIconContent, { immediate: true });

    return () => {
      let enrichedContent = iconContent.value;

      if (props.iconAltText) {
        enrichedContent = enrichedContent.replace("<svg ", `<svg role="img" aria-label="${props.iconAltText}" `);
      } else {
        enrichedContent = enrichedContent.replace("<svg ", `<svg aria-hidden="true" `);
      }

      return createElement(
        "div",
        {
          class: "nck-style nck-internal nck-icon " + iconStyleClasses.value.join(" "),
          innerHTML: enrichedContent,
        },
        [],
      );
    };
  },
});
</script>

<docs>
  Here are some examples of icon component declarations.

  An extra-small icon for illustration only (no alternative text):
  ```jsx
  <nck-icon :iconSize="IconSize.XS" iconName="amenity-fitness-grey" iconAltText=""></nck-icon>
  ```

  A small icon for illustration only (no alternative text):
  ```jsx
  <nck-icon :iconSize="IconSize.S" iconName="amenity-fitness-grey" iconAltText=""></nck-icon>
  ```

  A medium icon with a meaningful alternative text:
  ```jsx
  <nck-icon :iconSize="IconSize.M" iconName="close-dark" iconAltText="Close"></nck-icon>
  ```

  An extra large icon in its default color and in 4 other primary colors
  ```jsx
  <div>
    <nck-icon :iconSize="IconSize.XL" iconName="add-plus" iconAltText=""></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="add-plus" iconAltText="" primaryColor="bright-blue-400"></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="add-plus" iconAltText="" primaryColor="yellow-300"></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="add-plus" iconAltText="" primaryColor="orange-300"></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="add-plus" iconAltText="" primaryColor="green-300"></nck-icon>
  </div>
  ```

  An extra large icon in its default color and multiple other primary & secondary colors
  ```jsx
  <div>
    <nck-icon :iconSize="IconSize.XL" iconName="amenity-forward-facing-seat-dark" iconAltText=""></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="amenity-forward-facing-seat-dark" iconAltText="" primaryColor="bright-blue-400" secondaryColor="green-300"></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="amenity-forward-facing-seat-dark" iconAltText="" primaryColor="yellow-300" secondaryColor="orange-300"></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="amenity-forward-facing-seat-dark" iconAltText="" primaryColor="orange-300" secondaryColor="yellow-300"></nck-icon>
    <nck-icon :iconSize="IconSize.XL" iconName="amenity-forward-facing-seat-dark" iconAltText="" primaryColor="green-300" secondaryColor="bright-blue-400"></nck-icon>
  </div>
  ```
</docs>
