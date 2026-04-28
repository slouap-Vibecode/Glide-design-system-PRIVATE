<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>|
      <router-link class="test-app-style" to="/pagination">Pagination working test cases</router-link>
    </nav>

    <h1 class="test-app-style">Breaking test cases :</h1>
    <div data-test-case="0">
      <b>Test case 0:</b> Erroneous parameter(s) means error(s) in the console.
      <div>
        <div>
          <button class="test-app-style" @click="activeTestCases[0] = !activeTestCases[0]">Toggle</button>
        </div>
        <nck-pagination
          v-if="activeTestCases[0]"
          totalNumberOfItems="369"
          :numberOfItemsPerPage="true"
          :currentPage="null"
          :footerWording="123"
          :pageNumberWording="321"
        ></nck-pagination>
      </div>
    </div>
    <div data-test-case="1">
      <b>Test case 1:</b> Forgetting either the total number of items, the number of items per page or the wordings will trigger an error in the console.
      <div>
        <div>
          <button class="test-app-style" @click="activeTestCases[1] = !activeTestCases[1]">Toggle</button>
        </div>
        <nck-pagination v-if="activeTestCases[1]" :currentPage="0"></nck-pagination>
      </div>
    </div>
    <div data-test-case="2">
      <b>Test case 2:</b> If there is no match found for the wordings, an error will be triggered in the console.
      <div>
        <div>
          <button class="test-app-style" @click="activeTestCases[2] = !activeTestCases[2]">Toggle</button>
        </div>
        <nck-pagination
          v-if="activeTestCases[2]"
          :totalNumberOfItems="100"
          :numberOfItemsPerPage="25"
          :currentPage="4"
          footerWording="footerWording"
          pageNumberWording="pageNumberWording"
        ></nck-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NckPagination } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const activeTestCases = ref([ false, false, false, false ]);
</script>

<style scoped>
[data-test-case] {
  margin-top: 20px;
}
</style>
