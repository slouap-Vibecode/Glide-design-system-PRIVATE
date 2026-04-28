<template>
  <div
    class="nck-style nck-internal nck-pagination text-m"
    :class="{
      'nck-pagination-with-dropdown': withItemsPerPageDropdown.length > 0,
    }"
  >
    <div v-if="withItemsPerPageDropdown.length > 0" class="pagination-recap pagination-recap-dropdown">
      {{ footerLabel }}
    </div>
    <nav class="pagination-nav" role="navigation" :aria-label="paginationLabel">
      <ol class="pagination-container">
        <li v-if="hasPreviousPage" class="pagination-item with-link text-m-semibold">
          <a class="outside-focus" href="javascript:void(0)" @click="emitClickEvent(currentPage - 1)">
            <nck-icon :iconSize="IconSize.S" iconName="chevron-left-s" :iconAltText="previousPageLabel"></nck-icon>
          </a>
        </li>
        <li
          v-for="(page, index) in paginationContent"
          :key="index"
          class="pagination-item text-m-semibold"
          :class="{
            'current-page': page.isCurrent,
            ellipsis: page.isEllipsis,
            'with-link': !page.isCurrent && !page.isEllipsis,
          }"
          :aria-current="page.isCurrent ? 'page' : false"
        >
          <a
            class="outside-focus"
            v-if="!page.isCurrent && !page.isEllipsis"
            href="javascript:void(0)"
            :aria-label="pageNumberLabel(parseInt(page.content))"
            @click="emitClickEvent(parseInt(page.content))"
            >{{ page.content }}</a
          >
          <template v-else>{{ page.content }}</template>
        </li>
        <li v-if="hasNextPage" class="pagination-item with-link text-m-semibold">
          <a class="outside-focus" href="javascript:void(0)" @click="emitClickEvent(currentPage + 1)">
            <nck-icon :iconSize="IconSize.S" iconName="chevron-right-s" :iconAltText="nextPageLabel"></nck-icon>
          </a>
        </li>
      </ol>
    </nav>
    <div class="pagination-recap pagination-recap-default">
      {{ footerLabel }}
    </div>
    <div v-if="withItemsPerPageDropdown.length > 0" class="pagination-dropdown-container">
      <NckDropdown
        labelOutside
        class="pagination-dropdown"
        :label="paginationDropdownLabel"
        :options="dropdownOptions"
        :modelValue="numberOfItemsPerPage"
        name="numberOfItemsPerPage"
        :menuPosition="withItemsMenuPosition"
        :autoSelect="false"
        @update:model-value="$emit('update:numberOfItemsPerPage', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType } from "vue";
import { IconSize } from "../constants/iconSize";
import NckIcon from "./nckIcon.vue";
import NckDropdown from "./nckDropdown.vue";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";
import { MenuPosition } from "@/constants/menuPosition";

/**
 * @component
 * @displayName nck-pagination
 * Display pagination to navigate through pages.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - pagination
 *  - previousPage
 *  - nextPage
 * - [Icons URL](#icons)
 */

const props = defineProps({
  /**
   * Optional label for dropdown (when used with `withItemsPerPageDropdown` prop).
   */
  withItemsPerPageLabel: String,

  /**
   * The list of possible values for `numberOfItemsPerPage.
   * These values will be accessible in a dropdown
   */
  withItemsPerPageDropdown: {
    default: () => [],
    type: Array as PropType<number[]>,
  },

  /**
   * Position of `numberOfItemsPerPage` dropdown menu.
   * Accepts one of the [MenuPosition](#menuposition)
   */
  withItemsMenuPosition: {
    type: String as PropType<MenuPosition>,
    validator: (value: MenuPosition) => Object.values(MenuPosition).includes(value),
  },

  /**
   * The total number of items to be paginated.
   * Must be a strictly positive integer.
   */
  totalNumberOfItems: {
    required: true,
    type: Number,
    validator: (val: number) => val > 0 && Number.isInteger(val),
  },

  /**
   * The number of items per page.
   * Must be a strictly positive integer.
   */
  numberOfItemsPerPage: {
    required: true,
    type: Number,
    validator: (val: number) => val > 0 && Number.isInteger(val),
  },

  /**
   * The number of the current page.
   * Must be a strictly positive integer (0 is invalid).
   *
   * Note that index are starting at 1.
   * @default 1
   */
  currentPage: {
    type: Number,
    validator: (val: number) => val > 0 && Number.isInteger(val),
    default: 1,
  },

  /**
   * The wording corresponding to the footer of the component.
   *
   * This wording will be passed through the "translateAndFormat" function
   * (see [translations section](#translations))
   *
   * The following properties will be passed in the second argument:
   *
   *  - min: the first index (starting at 1 and relative to the complete list) within the range of the current page
   *  - max: the last index (starting at 1 and relative to the complete list) within the range of the current page
   *  - total: the total number of items
   */
  footerWording: {
    required: true,
    type: String,
  },

  /**
   * The wording corresponding to the page number.
   * It is used for screenreader to give more context to the user than just the index of the page.
   *
   * This wording will be passed through the "translateAndFormat" function
   * (see [translations section](#translations))
   *
   * The following properties will be passed in the second argument:
   *
   *  - pageNumber: index of a page.
   */
  pageNumberWording: {
    required: true,
    type: String,
  },
});

const emits = defineEmits<{
  /**
   * Event emitted when a specific page or the next or previous buttons are clicked.
   * @param {number} pageIndex the index of the new page. Note that the index starts at 1, and not at 0.
   */
  (e: "page-changed", pageIndex: number): void;
  /**
   * Event emitted when the number of items per page is changed via the dropdown
   * @param {number} numberOfItemsPerPage the new number of items per page
   */
  (e: "update:numberOfItemsPerPage", numberOfItemsPerPage: number): void;
}>();

const ellipsisElement = ref({
  content: "...",
  isCurrent: false,
  isEllipsis: true,
});

const dropdownOptions = computed((): Array<{ label: string; value: number }> => {
  return props.withItemsPerPageDropdown.map((value) => ({
    label: value.toString(),
    value,
  }));
});

const totalNumberOfPages = computed(() => {
  return Math.ceil(props.totalNumberOfItems / props.numberOfItemsPerPage);
});

const hasPreviousPage = computed(() => {
  return props.currentPage > 1;
});

const hasNextPage = computed(() => {
  return props.currentPage < totalNumberOfPages.value;
});

const paginationDropdownLabel = computed(() => {
  if (props.withItemsPerPageDropdown.length === 0) {
    // skip validation
    return "" as never;
  }

  if (!props.withItemsPerPageLabel) {
    throw new Error("Error: withItemsPerPageLabel is required when used with withItemsPerPageDropdown");
  }

  return props.withItemsPerPageLabel;
});

const paginationLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.pagination) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the pagination component. Requires 'pagination'",
    );
  }
  return globalOptions.translations.pagination;
});

const previousPageLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.previousPage) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the pagination component. Requires 'previousPage'",
    );
  }
  return globalOptions.translations.previousPage;
});

const nextPageLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.nextPage) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the pagination component. Requires 'nextPage'",
    );
  }
  return globalOptions.translations.nextPage;
});

const footerLabel = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.utils?.translateAndFormat || typeof globalOptions.utils.translateAndFormat !== "function") {
    throw new Error(
      "Error: you must provide the formatting function to the neo-component-kit library to use the pagination component. Requires 'translateAndFormat'",
    );
  }
  return globalOptions.utils.translateAndFormat(props.footerWording, {
    min: lowestRankOnPage(props.currentPage),
    max: highestRankOnPage(props.currentPage),
    total: props.totalNumberOfItems,
  });
});

const paginationContent = computed(() => {
  const pages = [
    {
      content: "1",
      isCurrent: props.currentPage === 1,
      isEllipsis: false,
    },
  ];
  let i = 2;
  while (i <= totalNumberOfPages.value) {
    if (i < props.currentPage && props.currentPage - i - 1 > 1) {
      pages.push(ellipsisElement.value);
      i = props.currentPage === totalNumberOfPages.value ? props.currentPage - 2 : props.currentPage - 1;
    }
    if (i > props.currentPage && i !== totalNumberOfPages.value && requireEllipsisAtTheEnd(i)) {
      pages.push(ellipsisElement.value);
      i = totalNumberOfPages.value;
    }
    pages.push({
      content: i.toString(),
      isCurrent: props.currentPage === i,
      isEllipsis: false,
    });
    i++;
  }
  return pages;
});

function requireEllipsisAtTheEnd(index: number) {
  return (
    index - props.currentPage - 1 > 1 ||
    (props.currentPage !== 1 &&
      index - props.currentPage > 1 &&
      index !== totalNumberOfPages.value &&
      index !== totalNumberOfPages.value - 1)
  );
}

function pageNumberLabel(pageNumber: number) {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.utils?.translateAndFormat || typeof globalOptions.utils.translateAndFormat !== "function") {
    throw new Error(
      "Error: you must provide the formatting function to the neo-component-kit library to use the pagination component. Requires 'translateAndFormat'",
    );
  }
  return globalOptions.utils.translateAndFormat(props.pageNumberWording, {
    pageNumber,
  });
}

function lowestRankOnPage(page: number) {
  return (page - 1) * props.numberOfItemsPerPage + 1;
}

function highestRankOnPage(page: number) {
  return Math.min(page * props.numberOfItemsPerPage, props.totalNumberOfItems);
}

function emitClickEvent(pageIndex: number) {
  emits("page-changed", pageIndex);
}

onMounted(() => {
  if (props.currentPage > totalNumberOfPages.value) {
    throw new Error("Error in nckPagination: The current page cannot be greater than the total number of pages.");
  }
});
</script>

<style scoped lang="less">
@import (reference) "../styles/colorsVariables.less";
@import (reference) "../styles/radiusVariables.less";
@import (reference) "../styles/breakpointsVariables.less";

@pagination-item-size: 2.25rem;

.nck-style.nck-pagination {
  margin: 0;
  color: var(--nck-text-default);

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin-top: 1rem;
    margin-bottom: 0;
    padding: 0;

    .pagination-item {
      height: @pagination-item-size;
      width: @pagination-item-size;
      background-color: transparent;
      border-radius: var(--nck-radius-s);
      box-sizing: border-box;
      cursor: pointer;
      margin-right: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;

      & > a {
        text-decoration: none;
        color: var(--nck-text-default);
        border-radius: var(--nck-radius-s);

        &:hover {
          background-color: var(--nck-surface-info-subtle);
        }

        &:focus {
          border: var(--nck-border-width-s) solid var(--nck-border-active);
          background-color: var(--nck-surface-primary);
        }

        &:focus:active {
          border: 0;
          box-shadow: none;
          background-color: var(--nck-surface-info-subtle);
          outline: none;
        }
      }

      &:last-child {
        margin-right: 0;
      }

      &.current-page {
        background-color: var(--nck-surface-info-solid);
        cursor: default;
        color: var(--nck-text-reverse);
      }

      &.ellipsis {
        cursor: default;
      }

      &.with-link > a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .pagination-recap {
    margin-top: 1rem;
    text-align: center;
  }
}

.nck-style.nck-pagination.nck-pagination-with-dropdown {
  .pagination-dropdown-container {
    display: none;
  }

  .pagination-recap-dropdown {
    display: none;
  }

  @media @tablet, @desktop {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .pagination-recap-default {
      display: none;
    }

    .pagination-recap-dropdown {
      display: flex;
    }

    .pagination-container,
    .pagination-recap {
      margin-top: 0;
    }
  }

  @media @desktop {
    .pagination-dropdown-container {
      display: block;
    }

    // set fixed width to match design and center the nav evenly
    .pagination-dropdown,
    .pagination-recap {
      width: 16rem;
    }
  }
}
</style>

<docs>
Pagination component with only one page :

```js
<nck-pagination :totalNumberOfItems="1" :numberOfItemsPerPage="1" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
```

Here an example of the component with two pages, the first one as current page :

```js
<nck-pagination :totalNumberOfItems="50" :numberOfItemsPerPage="25" :currentPage="1" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
```

Same example but this time with the current page as the second one :

```js
<nck-pagination :totalNumberOfItems="50" :numberOfItemsPerPage="25" :currentPage="2" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
```

Here an example of the component when the provided number of items per page is greater than the total number of items :

```js
<nck-pagination :totalNumberOfItems="5" :numberOfItemsPerPage="50" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
```

Here you have an example of the component with long numbers :

```js
<nck-pagination :totalNumberOfItems="5000" :numberOfItemsPerPage="2" :currentPage="1500" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
```

Here you have an example of the component with horizontal layout :

```js
const paginationPageLength = 5;
const paginationLengths = [5, 10, 20, 30];

<nck-pagination
  :totalNumberOfItems="5000"
  v-model:numberOfItemsPerPage="paginationPageLength"
  :currentPage="500"
  footerWording="paginationFooterTrips"
  pageNumberWording="paginationPageNumber"
  :withItemsPerPageDropdown="paginationLengths"
  withItemsPerPageLabel="trips per page"
  :withItemsMenuPosition="MenuPosition.TOP_LEFT"
/>
```

Here you have all the other possible cases for this component :

```js
const currentPages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
<div>
  <div v-for="(currentPage, index) in currentPages" :key="index" style="margin-bottom: calc(20/16 * 1rem);">
    <nck-pagination :totalNumberOfItems="90" :numberOfItemsPerPage="10" :currentPage="currentPage" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
  </div>
</div>
```

### Focus management
It is up to the consuming application to handle the focus after the user changes page.

Indeed based on the HTML structure of the pagination, the focus may stay on the current page. However, changing a page is supposed to change the content of the page,
by loading new data or changing the context. For accessibility reasons, it's expected from the consumer to handle its own logic (because the
pagination is unaware of what is happening) to set the focus in the right place after the page changes. Failing to do so will result in inconsistent behavior.

The rule of thumb is to set focus at the beginning of the loaded area so that screenreaders won't miss the new content, or at the body level in case the whole page
has changed.

### Errors
Using this component without providing the total number of items or the number of items per page will cause an error.

If the provided current page is greater than the total number of pages, an error will be triggered.

Of course, the three parameters of this component must be provided with strictly positive integers, otherwise, an error will be triggered.

Using this component without providing the wordings for the footer and the page number will also cause an error.

</docs>
