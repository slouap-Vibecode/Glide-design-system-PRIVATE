<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>|
      <router-link to="/recommendedBadge">Recommended badge working test cases</router-link>
    </nav>

    <h1>Breaking test cases :</h1>
    <div data-test-case="0">
      <b>Test case 0:</b> Recommendation level = not specified, Show tooltip = not specified, Badge type = not specified
      <div>
        <div>
          <button @click="toggleTestCase(0)">Toggle</button>
        </div>
        <nck-recommended-badge v-if="activeTestCase === 0"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="1">
      <b>Test case 1:</b> Recommendation level = <b>Stuff</b>, Show tooltip = not specified, Badge type = not specified
      <div>
        <div>
          <button @click="toggleTestCase(1)">Toggle</button>
        </div>
        <nck-recommended-badge v-if="activeTestCase === 1" recommendationLevel="Stuff"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="2">
      <b>Test case 2:</b> Recommendation level = recommended, Show tooltip = <b>Stuff</b>, Badge type = not specified
      <div>
        <div>
          <button @click="toggleTestCase(2)">Toggle</button>
        </div>
        <nck-recommended-badge v-if="activeTestCase === 2" :recommendationLevel="RecommendationLevel.RECOMMENDED"
          showTooltip="Stuff"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="3">
      <b>Test case 3:</b> Recommendation level = recommended, Show tooltip = not specified, Badge type = <b>Stuff</b>
      <div>
        <div>
          <button @click="toggleTestCase(3)">Toggle</button>
        </div>
        <nck-recommended-badge v-if="activeTestCase === 3" :recommendationLevel="RecommendationLevel.RECOMMENDED"
          type="Stuff"></nck-recommended-badge>
      </div>
    </div>
  </div>
</template>

<style scoped>
[data-test-case] {
  margin-top: 1rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import {
  NckRecommendedBadge,
  RecommendationLevel
} from "@neotechnologygroup/neo-component-kit";

const activeTestCase = ref<number>(-1);

function toggleTestCase(caseIndex: number) {
  if (activeTestCase.value === caseIndex) {
    activeTestCase.value = -1;
  } else {
    activeTestCase.value = caseIndex;
  }
}

</script>
