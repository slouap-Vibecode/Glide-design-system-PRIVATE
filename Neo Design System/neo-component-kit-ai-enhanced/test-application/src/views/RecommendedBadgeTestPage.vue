<template>
  <div class="light-background">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/recommendedBadge-errors">Recommended badge breaking test cases</router-link>
    </nav>

    <h1>Working test cases :</h1>

    <div data-test-case="1">
      <b>Test case 1:</b> Recommendation level = recommended, Show tooltip = true, Badge type = filled
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.RECOMMENDED"
          :showTooltip="true"
          :type="RecommendedBadgeType.FILLED"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="2">
      <b>Test case 2:</b> Recommendation level = recommended, Show tooltip = false, Badge type = noBackground
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.RECOMMENDED"
          :showTooltip="false"
          :type="RecommendedBadgeType.NO_BACKGROUND"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="3">
      <b>Test case 3:</b> Recommendation level = recommended, Show tooltip = not specified, Badge type = not specified
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.RECOMMENDED"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="4">
      <b>Test case 4:</b> Recommendation level = more recommended, Show tooltip = false, Badge type = not specified
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.MORE_RECOMMENDED"
          :showTooltip="false"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="5">
      <b>Test case 5:</b> Recommendation level = more recommended, Show tooltip = not specified, Badge type = filled
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.MORE_RECOMMENDED"
          :type="RecommendedBadgeType.FILLED"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="6">
      <b>Test case 6:</b> Recommendation level = more recommended, Show tooltip = true, Badge type = noBackground
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.MORE_RECOMMENDED"
          :showTooltip="true"
          :type="RecommendedBadgeType.NO_BACKGROUND"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="7">
      <b>Test case 7:</b> Recommendation level = most recommended, Show tooltip = not specified, Badge type = filled
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.MOST_RECOMMENDED"
          :type="RecommendedBadgeType.FILLED"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="8">
      <b>Test case 8:</b> Recommendation level = most recommended, Show tooltip = true, Badge type = noBackground
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.MOST_RECOMMENDED"
          :showTooltip="true"
          :type="RecommendedBadgeType.NO_BACKGROUND"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="9">
      <b>Test case 9:</b> Recommendation level = most recommended, Show tooltip = true, Badge type = not specified
      <div>
        <nck-recommended-badge
          :recommendationLevel="RecommendationLevel.MOST_RECOMMENDED"
          :showTooltip="true"></nck-recommended-badge>
      </div>
    </div>

    <div data-test-case="10">
      <b>Test case 10:</b> Recommendation level = most recommended, Show tooltip = false, Badge type = filled
      in a very narrow container
      <div>
        <nck-recommended-badge class="small-width"
          :recommendationLevel="RecommendationLevel.MOST_RECOMMENDED"
          :showTooltip="false"
          :type="RecommendedBadgeType.FILLED"></nck-recommended-badge>
      </div>
    </div>
  </div>
</template>

<style scoped>
.light-background {
  background: lightgray;
}

[data-test-case] {
  margin-top: 1rem;
  padding-bottom: 2rem;
}
[data-test-case="10"] .small-width {
  width: 3rem;
}
</style>

<script setup lang="ts">
import {
  NckRecommendedBadge,
  RecommendedBadgeType,
  RecommendationLevel
} from "@neotechnologygroup/neo-component-kit";
</script>
