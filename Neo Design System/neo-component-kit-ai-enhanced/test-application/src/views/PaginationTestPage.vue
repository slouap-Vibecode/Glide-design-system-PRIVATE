<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link> |
      <router-link class="test-app-style" to="/pagination-errors">Pagination breaking test cases</router-link>
    </nav>

    <h1 class="test-app-style">Working test cases :</h1>
    <div data-test-case="0">
      <b>Test case 0:</b> total number of items: 1, number of items per page: 1, current page: 1.
      <div>
        <nck-pagination :totalNumberOfItems="1" :numberOfItemsPerPage="1" :currentPage="currentPages[0]" footerWording="paginationFooter" pageNumberWording="paginationPageNumber"></nck-pagination>
      </div>
    </div>
    <div data-test-case="1" class="light-background">
      <b>Test case 1:</b> total number of items: 50, number of items per page: 25, current page: 1.
      <div>
        <nck-pagination :totalNumberOfItems="50" :numberOfItemsPerPage="25" :currentPage="currentPages[1]" footerWording="paginationFooter" pageNumberWording="paginationPageNumber" @page-changed="displayFeedback(1, $event);updateComponent(1, $event, false)"></nck-pagination>
        <div v-if="typeof feedbacks[1] === 'number'">Event name : page-changed, Event value : {{feedbacks[1]}}</div>
      </div>
    </div>
    <div data-test-case="2">
      <b>Test case 2:</b> total number of items: 50, number of items per page: 25, current page: 2.
      <div>
        <nck-pagination :totalNumberOfItems="50" :numberOfItemsPerPage="25" :currentPage="currentPages[2]" footerWording="paginationFooter" pageNumberWording="paginationPageNumber" @page-changed="displayFeedback(2, $event);updateComponent(2, $event, false)"></nck-pagination>
        <div v-if="typeof feedbacks[2] === 'number'">Event name : page-changed, Event value : {{feedbacks[2]}}</div>
      </div>
    </div>
    <div v-for="(currentPage, index) in loopCurrentPages" :key="index" :data-test-case="getIndex(index)">
      <b>Test case {{getIndex(index)}}:</b> total number of items: 90, number of items per page: 10, current page: {{currentPage}}.
      <nck-pagination :totalNumberOfItems="90" :numberOfItemsPerPage="10" :currentPage="currentPage" footerWording="paginationFooter" pageNumberWording="paginationPageNumber" @page-changed="displayFeedback(getIndex(index), $event);updateComponent(index, $event, true)"></nck-pagination>
      <div v-if="typeof feedbacks[getIndex(index)] === 'number'">Event name : page-changed, Event value : {{feedbacks[getIndex(index)]}}</div>
    </div>
    <div data-test-case="12">
      <b>Test case 12:</b> total number of items: 5000, number of items per page: 2, current page: 1500.
      <div>
        <nck-pagination :totalNumberOfItems="5000" :numberOfItemsPerPage="2" :currentPage="currentPages[3]" footerWording="paginationFooter" pageNumberWording="paginationPageNumber" @page-changed="displayFeedback(12, $event);updateComponent(3, $event, false)"></nck-pagination>
        <div v-if="typeof feedbacks[12] === 'number'">Event name : page-changed, Event value : {{feedbacks[12]}}</div>
      </div>
    </div>
    <div data-test-case="13">
      <b>Test case 13:</b> total number of items: 5, number of items per page: 50, current page: 1.
      <div>
        <nck-pagination :totalNumberOfItems="5" :numberOfItemsPerPage="50" :currentPage="currentPages[4]" footerWording="paginationFooter" pageNumberWording="paginationPageNumber" @page-changed="displayFeedback(13, $event);updateComponent(4, $event, false)"></nck-pagination>
        <div v-if="typeof feedbacks[13] === 'number'">Event name : page-changed, Event value : {{feedbacks[13]}}</div>
      </div>
    </div>
    <div data-test-case="14">
      <b>Test case 14:</b> total number of items: 500, number of items per page: 5, menu postion: bottom-left (default), current page: 10.
      <div>
        <nck-pagination
          :totalNumberOfItems="500"
          v-model:numberOfItemsPerPage="paginationPageLengths[0]"
          :currentPage="currentPages[5]"
          footerWording="paginationFooterTrips"
          pageNumberWording="paginationPageNumber"
          :withItemsPerPageDropdown="[5, 10, 20, 30]"
          :withItemsPerPageLabel="local === 'fr' ? 'voyages par page' : 'trips per page'"
          @page-changed="displayFeedback(14, $event);updateComponent(5, $event, false)"
          @update:numberOfItemsPerPage="displayFeedback(14, currentPages[5]);"
        />

        <div v-if="typeof feedbacks[14] === 'number'">
          <div>Event name : page-changed, Event value : {{feedbacks[14]}}</div>
          <div>Event name : update:numberOfItemsPerPage, Event value : {{paginationPageLengths[0]}}</div>
        </div>
      </div>
    </div>
    <div data-test-case="15">
      <b>Test case 15:</b> total number of items: 500, number of items per page: 5, menu postion: top-left, current page: 10.
      <div>
        <nck-pagination
          :totalNumberOfItems="500"
          v-model:numberOfItemsPerPage="paginationPageLengths[1]"
          :currentPage="currentPages[6]"
          footerWording="paginationFooterTrips"
          pageNumberWording="paginationPageNumber"
          :withItemsPerPageDropdown="[5, 10, 20, 30]"
          :withItemsPerPageLabel="local === 'fr' ? 'voyages par page' : 'trips per page'"
          :withItemsMenuPosition="MenuPosition.TOP_LEFT"
          @page-changed="displayFeedback(15, $event);updateComponent(6, $event, false)"
          @update:numberOfItemsPerPage="displayFeedback(15, currentPages[6]);"
        />

        <div v-if="typeof feedbacks[15] === 'number'">
          <div>Event name : page-changed, Event value : {{feedbacks[15]}}</div>
          <div>Event name : update:numberOfItemsPerPage, Event value : {{paginationPageLengths[1]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NckPagination, MenuPosition } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const currentPages = ref([ 1, 1, 2, 1500, 1, 10, 10 ]);
const loopCurrentPages = ref([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
const feedbacks = ref<string[]>([]);
const paginationPageLengths = ref([ 5, 5 ]);

function getIndex(index: number): number {
  return index + 3;
}

function displayFeedback(index: number, entry: unknown): void {
  const nextFeedbacks = [ ...feedbacks.value ];
  nextFeedbacks[index] = entry as string;
  feedbacks.value = nextFeedbacks;
}

function updateComponent(index: number, entry: unknown, isLoop: boolean) {
  if (isLoop) {
    loopCurrentPages.value[index] = entry as number;
  } else {
    currentPages.value[index] = entry as number;
  }
  if (document?.activeElement) {
    (document.activeElement as HTMLElement).blur();
  }
}

let local = "en";
if (window.location.hash.includes("lang=fr")) {
  local = "fr";
}
</script>

<style scoped>
[data-test-case] {
  margin-top: 20px;
}

.light-background {
  background: lightgray;
}
</style>
