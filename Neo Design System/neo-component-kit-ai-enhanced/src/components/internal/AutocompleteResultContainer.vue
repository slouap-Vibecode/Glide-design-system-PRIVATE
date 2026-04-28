<template>
  <div
    class="autocomplete-result-container"
    :class="{ flat, 'has-proposals': hasProposals, 'full-height': fullHeight }"
  >
    <NckLoader
      data-test-autocomplete-results-loader
      :id="loaderId"
      :class="{ 'hidden-loader': !loaderDisplayed }"
      :loadingText="loadingText"
    />

    <!-- It's important to keep the 2 status divs below beside the nck-loader.
          If we don't, nck-loader is only announced by NVDA screen reader only the first time it happens. Reason is unclear...
          Also, we need to keep both even if it seems they could be merged because it allows ensuring assistive technology announcement
          after each retrieval of results even if number of results did not change. -->
    <div
      class="screenreader-only"
      role="status"
      aria-atomic="true"
      aria-live="polite"
      v-text="secondAnnouncer ? '' : matchingResultsAmountMessage"
    />
    <div
      class="screenreader-only"
      role="status"
      aria-atomic="true"
      aria-live="polite"
      v-text="secondAnnouncer ? matchingResultsAmountMessage : ''"
    />

    <NckMenu
      v-if="proposalsMenuDisplayed"
      ref="proposalsMenu"
      :id="menuId"
      class="proposals-menu"
      :items="matchingResultsWithLabelOverrideForMenu"
      :selectedValue="selectedValue ?? undefined"
      :autoSelect="autoSelect"
      :navigateToFirstElementIfNoSelection="autoSelect"
      forceFocusAspectOnNavigatedMenuItem
      @current-option-changed="updateActiveProposal"
      v-bind="attrs"
      :maxHeight="maxHeight"
      :fullHeight="fullHeight"
    />

    <div
      data-test-no-match-text
      v-if="noMatchesDisplayed"
      :id="noMatchesId"
      class="text-m font-color-ink-70"
      v-text="noMatchesFoundText"
    />

    <div
      data-test-error-retrieval-text
      v-if="proposalsRetrievalFailed"
      :id="proposalsRetrievalErrorId"
      class="text-m font-color-ink-70"
      v-text="errorRetrievingProposalsText"
    />
  </div>
</template>

<style lang="less" scoped>
.autocomplete-result-container {
  text-align: center;
  width: 100%;
  padding: 1rem;

  &.full-height {
    height: 100%;
  }

  .nck-style.nck-internal.nck-loader.hidden-loader {
    // This is a trick to hide the loader after loading is finished while still allowing NVDA screenreader to read the list of results and allow keyboard navigation in the list
    height: 0;
    display: block;
    opacity: 0;
  }

  &.flat {
    padding: 0.5rem 0 1.5rem 0;

    .proposals-menu {
      padding-top: 0;
    }
  }

  &.has-proposals {
    padding: 0;
  }
}
</style>

<script setup lang="ts" generic="Data">
import { ref, useTemplateRef, watch, computed, useAttrs } from "vue";

import NckLoader from "@/components/nckLoader.vue";
import NckMenu from "@/components/nckMenu.vue";

import { GlobalOptionsProvider } from "@/controllers/globalOptionsProvider";

import { AccessibilityHelper } from "@/helpers/accessibilityHelper";

import { IAutocompleteItem } from "@/models/iAutocompleteItem";
import { IMenuItem } from "@/models/iMenuItem";

const props = withDefaults(
  defineProps<{
    errorRetrievingProposalsText: string;
    isLoading: boolean;
    loadingText: string;
    matchingResults: IAutocompleteItem<Data>[];
    noMatchesFoundText: string;
    numberOfMatchingResultsWording: string;
    proposalsRetrievalFailed: boolean;
    resultContainerDisplayed: boolean;
    flat?: boolean;
    selectedValue: Data | null;
    autoSelect?: boolean;
    maxHeight?: number;
    fullHeight?: boolean; // not compat with maxHeight
  }>(),
  {
    flat: false,
    autoSelect: true,
  },
);

if (typeof GlobalOptionsProvider.getInstance().getOptions()?.utils?.translateAndFormat !== "function") {
  throw new Error(
    "Error: you must provide the formatting function to the neo-component-kit library to use the autocomplete component. Requires 'translateAndFormat'",
  );
}

const emit = defineEmits<{
  (e: "active-descendant-id-updated", activeDescendantId: string | undefined): void;
  (e: "active-proposal-value-changed", value: Data | null): void;
}>();

// type should be using Ref and not the internal of ref due to generic type, see https://github.com/vuejs/language-tools/discussions/3677
const activeProposalId = ref<string | undefined>("");
const secondAnnouncer = ref(false);
const loaderId = AccessibilityHelper.generateId();
const menuId = AccessibilityHelper.generateId();
const noMatchesId = AccessibilityHelper.generateId();
const proposalsRetrievalErrorId = AccessibilityHelper.generateId();
const proposalsMenu = useTemplateRef("proposalsMenu");
const attrs = useAttrs();

function selectNextProposal(event: KeyboardEvent, reverse = false): void {
  if (proposalsMenuDisplayed.value) {
    // When proposals menu is shown, up & down keys should only navigate between proposals and not move the cursor within the text input field
    event.preventDefault();

    if (hasProposals.value && proposalsMenu.value) {
      if (reverse) {
        proposalsMenu.value.selectPreviousElement();
      } else {
        proposalsMenu.value.selectNextElement();
      }
    }
  }
}

defineExpose({
  selectNextProposal,
  proposalsMenu,
  navigateToProposalAtIndex,
});

const activeDescendantId = computed<string | undefined>(() => {
  if (loaderDisplayed.value) {
    return loaderId;
  }

  if (proposalsMenuDisplayed.value) {
    return activeProposalId.value;
  }

  if (noMatchesDisplayed.value) {
    return noMatchesId;
  }

  if (props.proposalsRetrievalFailed) {
    return proposalsRetrievalErrorId;
  }

  return "";
});

const hasProposals = computed<boolean>(() => {
  return !props.isLoading && props.matchingResults.length > 0;
});

const loaderDisplayed = computed<boolean>(() => {
  return props.resultContainerDisplayed && props.isLoading && !props.proposalsRetrievalFailed;
});

const proposalsMenuDisplayed = computed<boolean>(() => {
  return props.resultContainerDisplayed && !props.proposalsRetrievalFailed && hasProposals.value;
});

const noMatchesDisplayed = computed(() => {
  return (
    props.resultContainerDisplayed &&
    !props.isLoading &&
    !props.proposalsRetrievalFailed &&
    !props.matchingResults.length
  );
});

const matchingResultsAmountMessage = computed<string>(() => {
  if (props.matchingResults?.length) {
    const translateAndFormat = GlobalOptionsProvider.getInstance().getOptions()?.utils?.translateAndFormat;

    if (translateAndFormat) {
      return translateAndFormat(props.numberOfMatchingResultsWording, {
        number: props.matchingResults.length,
      });
    }
  }

  return "";
});

const matchingResultsWithLabelOverrideForMenu = computed<IMenuItem<Data>[]>(() => {
  return props.matchingResults.map((result: IAutocompleteItem<Data>) => {
    const menuItem: IMenuItem<Data> = { ...result };
    if (result.labelOverrideForMenu) {
      menuItem.label = result.labelOverrideForMenu;
      delete (menuItem as IAutocompleteItem).labelOverrideForMenu;
    }
    return menuItem;
  });
});

watch(activeDescendantId, () => activeDescendantIdChanged(activeDescendantId.value));
function activeDescendantIdChanged(newValue: string | undefined) {
  emit("active-descendant-id-updated", newValue);
}

watch(() => props.matchingResults, matchingResultsChanged);
function matchingResultsChanged(): void {
  secondAnnouncer.value = !secondAnnouncer.value;
}

function updateActiveProposal(currentOption: { id: string | undefined; value: Data | null }) {
  activeProposalId.value = currentOption.id;
  emit("active-proposal-value-changed", currentOption.value);
}

function navigateToProposalAtIndex(index: number) {
  if (proposalsMenuDisplayed.value && hasProposals.value && proposalsMenu.value) {
    proposalsMenu.value.navigateToIndex(index);
  }
}
</script>
