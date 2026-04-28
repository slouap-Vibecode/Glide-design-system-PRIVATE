<template>
  <div role="region">
    <div class="loader-area" aria-live="polite">
      <!-- @slot The content to display when loading. Note that if you don't use it it will display the loader but if you put a "loading-placeholder" slot then the loader will be hidden. Note that your content must contain text (actual text content, alt of an image, or aria-label) to have an announce of the loading to the user. Failing to do so is an accessibility issue. -->
      <slot v-if="loaderDisplayed && loadingPlaceholder" name="loading-placeholder" />
      <nck-loader
        v-else-if="loaderDisplayed && !loadingPlaceholder"
        :id="loaderId"
        :loadingText="loadingText ?? ''"
        :size="size"
        :displayContext="loaderDisplayContext"
        :type="type"
        :modelValue="modelValue"
      />
      <span v-else-if="loadingFinished" class="nck-style screenreader-only">{{ loadingFinishedText }}</span>
    </div>

    <a ref="focusTrap" tabindex="-1" class="nck-style screenreader-only">&nbsp;</a>

    <div
      :aria-busy="loadingStarted && loading"
      :aria-describedby="loaderDisplayed ? loaderId : undefined"
      :class="contentClasses"
    >
      <!-- @slot The place where you will put the loaded content. -->
      <slot v-if="loadingStarted && !loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, useSlots } from "vue";
import { AccessibilityHelper } from "@/helpers/accessibilityHelper";
import { DisplayContext } from "../constants/displayContext";
import { LoaderSize } from "../constants/loaderSize";
import { LoaderType } from "../constants/loaderType";
import NckLoader from "./nckLoader.vue";

/**
 * @component
 * @displayName nck-loading-area
 *
 * A component to handle loading along with accessibility.
 *
 * It will display the loader, manage focus when content is loaded (by default) and announce loading status for you.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations): none
 */

const props = defineProps({
  /**
   * Set the loading area into loading state if true.
   *
   * Setting it back to false when it was previously true considers the loading to be done.
   */
  loading: { required: true, type: Boolean },

  /**
   * Text announced to user when the content is loaded.
   */
  loadingFinishedText: { required: true, type: String },

  /**
   * CSS classes to be applied to the container of the loaded content.
   *
   * Be careful, the classes declaration should NOT be in a "scoped" block.
   */
  contentClasses: { type: [String, Array] },

  /**
   * Adapt the style of the loader displayed based on its background.
   *
   * Values are the one [DisplayContext](#displaycontext) which
   * are here to described the background color.
   */
  loaderDisplayContext: {
    default: DisplayContext.WHITE_BACKGROUND,
    validator: (value: DisplayContext) => Object.values(DisplayContext).includes(value),
  },

  /**
   * Text announced to user when the content is loading.
   *
   * It is mandatory if the loader is displayed.
   *
   * It won't be used if you used the slot "loading-placeholder".
   */
  loadingText: { type: String },

  /**
   * Size of the loader. Only for circular loader. It will be ignored for linear loader.
   *
   * Takes values from [LoaderSize](#loadersize) enum.
   */
  size: {
    type: String,
    default: LoaderSize.M,
    validator: (value: LoaderSize) => Object.values(LoaderSize).includes(value),
  },

  /**
   * Type of loader.
   *
   * Takes values from [LoaderType](#loadertype) enum.
   */
  type: {
    type: String,
    default: LoaderType.CIRCULAR,
    validator: (value: LoaderType) => Object.values(LoaderType).includes(value),
  },

  /**
   * Percentage of the progression (between 0 and 100 inclusive).
   *
   * If omitted, the loader is indeterminate.
   *
   * NOTE: This property works only for linear loader at the moment.
   * Circular loader will ignore it and stay indeterminate.
   */
  modelValue: {
    type: Number,
    validator: (value: number) => value >= 0 && value <= 100,
  },

  /**
   * Move focus to the beginning of the loaded content when loading completes.
   * If choosing to go against this behavior, please make sure you carefully analyze where the focus
   * should be set in the page instead for proper usability & accessibility.
   */
  moveFocusToContentAfterLoading: {
    type: Boolean,
    default: true,
  },
});

const slots = useSlots();

const loadingStarted = ref<boolean>(false);
const loaderDisplayed = ref<boolean>(false);
const loaderId = ref<string>(AccessibilityHelper.generateId());
const loaderTimeoutId = ref<number | null>(null);
const focusTrap = ref<HTMLElement | null>(null);

const loadingFinished = computed(() => {
  return !props.loading && loadingStarted.value;
});

const loadingPlaceholder = computed(() => {
  return !!slots["loading-placeholder"];
});

function focusBeginningOfContent() {
  const elementToFocus = focusTrap.value;
  if (elementToFocus instanceof HTMLElement) {
    elementToFocus.focus();
  }
}

function updateLoadingStatus() {
  if (props.loading) {
    loadingStarted.value = true;
    loaderTimeoutId.value = window.setTimeout(() => {
      loaderDisplayed.value = true;
      loaderTimeoutId.value = null;
    }, 100);
  } else if (loadingStarted.value && !props.loading) {
    loaderDisplayed.value = false;
    if (loaderTimeoutId.value) {
      window.clearTimeout(loaderTimeoutId.value);
      loaderTimeoutId.value = null;
    }
    if (props.moveFocusToContentAfterLoading) {
      focusBeginningOfContent();
    }
  }
}

watch(() => props.loading, updateLoadingStatus);

onMounted(() => {
  if (props.loading) {
    loadingStarted.value = true;
    loaderTimeoutId.value = window.setTimeout(() => {
      loaderDisplayed.value = true;
      loaderTimeoutId.value = null;
    }, 100);
  }

  if (!loadingPlaceholder.value && (!props.loadingText || props.loadingText.length === 0)) {
    throw new Error(
      "Error in NckLoadingArea: 'loadingText' is mandatory if you do not provide content in the slot 'loading-placeholder'",
    );
  }

  if (loadingPlaceholder.value && props.loadingText && props.loadingText.length > 0) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning in NckLoadingArea: 'loadingText' will be ignored because you are using the 'loading-placeholder'." +
        " Only text content of 'loading-placeholder' slot will be rendered to screenreaders",
    );
  }
});
</script>

<docs>
The loading area manages a lot of things for you regarding accessibility and display:
  - Displays loader and announces loading has started to user.
  - Hides loader and announces loading has ended to user.
  - Sets focus at the beginning of the loaded content when loading has ended (by default). It's possible to go against this default behavior when appropriate.

Note: while it works fine with Firefox, Chrome doesn't announce loading. Chrome only announces when the
loading has finished.

Loading is considered started when:
 - 'loading' prop is set to true.
 - 'loading' prop was never set to true before.

Loading is considered ended when:
 - 'loading' prop is set to false after it has been set to true.

The content should be set in the loading area slot, so that the focus is correctly set before it after loading completes.

The loading can be started as soon the page is created
```jsx
const loading = true;

<div>
  <nck-loading-area :loading="loading" loading-text="This area is loading at the display of the page" loading-finished-text="The first example has finished loading">
    Here goes <b>your</b> <i>own</i> content.
  </nck-loading-area>

  <button @click="loading = false">Finish loading</button>
</div>
```

Or it can be started later with a click on a button.
```jsx
const loading = false;

<div>
  <nck-loading-area :loading="loading"  loading-text="This area is loading when you click on the button" loading-finished-text="The second example has finished loading" :size="LoaderSize.XS">
    Here goes <sup>your</sup> <sub>own</sub> content.
  </nck-loading-area>

  <button @click="loading = true">Start loading</button>
  <button @click="loading = false">Finish loading</button>
</div>
```

Focus is moved to the content after loading by default. This behavior can be disabled.

Please carefully determine where the focus should be in the page for proper accessibility & usability when doing so.
```jsx
const loading = false;

<div>
  <nck-loading-area
    :loading="loading"
    loading-text="This area is loading when you click on the button"
    loading-finished-text="The third example has finished loading and did not move focus to its content"
    :size="LoaderSize.XS"
    :moveFocusToContentAfterLoading=false>
    Loaded content
    <button>This button will not get focused when you tab once after loading</button>
  </nck-loading-area>

  <button @click="loading = true">Start loading</button>
  <button @click="loading = false">Finish loading</button>
</div>
```

By default the loading area displays a loader when it is loading, but you can customize the content.

There is a slot 'loading-placeholder' that allows you to customize the content displayed when loading.
```jsx
const loading = false;

<div>
  <nck-loading-area :loading="loading" loading-finished-text="The third example has finished loading">
    Here goes the content when it is loaded.
    <template v-slot:loading-placeholder>
      This content replaces the loader. And you can put <b>whatever</b> you <i>want</i>.
      Please make sure your content contains text that is readable to screen reader.
      <blockquote>
        Because this is the content read by screenreader to announce loading to user.
      </blockquote>
    </template>
  </nck-loading-area>

  <button @click="loading = true">Start loading</button>
  <button @click="loading = false">Finish loading</button>
</div>
```

Sometimes you will need to apply specific style to the container of the loaded content.

You can use the prop "contentClasses" which will apply CSS class to the container of the loaded content.

Be careful though, the class declaration shouldn't be under a "scoped" css block.
So if you happen to have some "scoped css/less" (which is highly recommended), create a new style block which is not
scoped and put the style there.

```jsx
const loading = false;

<div>
  <nck-loading-area :loading="loading"
    loading-text="Loading"
    loading-finished-text="The fourth example has finished loading"
    content-classes="red-background">
    Here goes the content when it is loaded.
  </nck-loading-area>

  <button @click="loading = true">Start loading</button>
  <button @click="loading = false">Finish loading</button>
</div>
```

You can also put several classes on the content with an array.

```jsx
const loading = false;

<div>
  <nck-loading-area :loading="loading"
    loading-text="Loading"
    loading-finished-text="The fifth example has finished loading"
    :content-classes="['red-background', 'border-green']">
    Here goes the content when it is loaded.
  </nck-loading-area>

  <button @click="loading = true">Start loading</button>
  <button @click="loading = false">Finish loading</button>
</div>
```

With linear loader
```jsx
const loading = false;

<div>
  <nck-loading-area :loading="loading" loading-text="Loading"
    loading-finished-text="Loading finished" :type="LoaderType.LINEAR">
    Tada!
  </nck-loading-area>

  <button @click="loading = true">Start loading</button>
  <button @click="loading = false">Finish loading</button>
</div>
```

Linear loader with percentage
```vue
const testData = {
  value: undefined
}

function load() {
  testData.value = 0;
  const interval = setInterval(() => {
    if (testData.value >= 100) {
      clearInterval(interval);
      testData.value = undefined;
    } else {
      testData.value++;
    }
  }, 1);
}

<div>
  <nck-loading-area :loading="testData.value !== undefined" :loading-text="`Loading ${testData.value}%`" loading-finished-text="Loading finished" :type="LoaderType.LINEAR" :modelValue="testData.value">
    Tada!
  </nck-loading-area>

  <button @click="load">Start loading</button>
  <span v-if="testData.value !== undefined" v-text="`${testData.value}%`"/>
</div>
```
</docs>
