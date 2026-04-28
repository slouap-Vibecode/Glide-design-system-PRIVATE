<template>
  <div
    class="nck-base-badge nck-recommended-badge nck-style outside-focus"
    :class="badgeBackgroundColorClass"
    :aria-label="ariaLabel"
    v-nck-info-tooltip.right="{
      heading: recommendedPartnerTooltipHeader,
      content: recommendedPartnerTooltipBody,
      disable: !showTooltip,
    }"
  >
    <nck-icon
      class="preferred-icon"
      v-for="i in recommendationLevel"
      :key="i"
      iconName="heart-preferred"
      :iconSize="IconSize.XXS"
      iconAltText=""
      :primaryColor="iconsPrimaryColor"
    />
  </div>
</template>

<style lang="less" scoped>
.nck-base-badge.nck-recommended-badge {
  .preferred-icon + .preferred-icon {
    margin-left: 0.1rem;
  }

  overflow: visible;

  @recommendedBadgeIconSize: 0.625rem;

  & /deep/ .nck-icon,
  & /deep/ .nck-icon svg {
    width: @recommendedBadgeIconSize;
    height: @recommendedBadgeIconSize;
  }
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { IconSize } from "../constants/iconSize";
import vNckInfoTooltip from "../directives/nckInfoTooltip";
import NckIcon from "./nckIcon.vue";
import { RecommendedBadgeType } from "../constants/recommendedBadgeType";
import { RecommendationLevel } from "../constants/recommendationLevel";
import { IconColors } from "../constants/iconColors";
import { GlobalOptionsProvider } from "../controllers/globalOptionsProvider";

/**
 * @component
 * @displayName nck-recommended-badge
 *
 * A component to visually tag Recommended partners and their level of recommendation.
 *
 * PREREQUISITES:
 *
 * - [Required translations](#translations):
 *  - recommendedPartnerTooltipHeader (the tooltip header)
 *  - recommendedPartnerTooltipBody (the tooltip body)
 *  - recommendedPartnerBadgeAltText (lowest recommendation level badge accessible text)
 *  - moreRecommendedPartnerBadgeAltText (medium recommendation level badge accessible text)
 *  - mostRecommendedPartnerBadgeAltText (highest recommendation level badge accessible text)
 * - [Icons URL](#icons)
 */
const props = defineProps({
  /**
   * The type of badge to display among [RecommendedBadgeType](#recommendedbadgetype) to fill your color.
   */
  type: {
    default: RecommendedBadgeType.FILLED,
    validator: (val: RecommendedBadgeType) => Object.values(RecommendedBadgeType).includes(val),
  },

  /**
   * The level of recommendation among [RecommendationLevel](#recommendationlevel).
   */
  recommendationLevel: {
    required: true,
    validator: (val: RecommendationLevel) => Object.values(RecommendationLevel).includes(val),
  },

  /**
   * Attaches a basic [Info Tooltip](#nck-info-tooltip) to the badge to trigger it by hovering/focusing the badge.
   * This tooltip will be displayed on the right of the badge by default.
   * Tooltip display/hide are not bubbled up by this component.
   * The tooltip header & tooltip body text must be provided by the consuming application through the global options
   * and are not per-instance specific but app-wide instead
   * (recommendedPartnerBadgeAltText, moreRecommendedPartnerBadgeAltText, mostRecommendedPartnerBadgeAltText).
   */
  showTooltip: {
    default: false,
    type: Boolean,
  },
});

const badgeBackgroundColorClass = computed(() => {
  switch (props.type) {
    case RecommendedBadgeType.FILLED:
      return "background-color-bright-blue-300";
  }
  return "";
});

const iconsPrimaryColor = computed(() => {
  switch (props.type) {
    case RecommendedBadgeType.NO_BACKGROUND:
      return IconColors.BRIGHT_BLUE_300;
    case RecommendedBadgeType.FILLED:
      return IconColors.WHITE;
  }
  return undefined;
});

const recommendedPartnerTooltipHeader = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.recommendedPartnerTooltipHeader) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the recommended badge component. Requires 'recommendedPartnerTooltipHeader'",
    );
  }
  return globalOptions.translations.recommendedPartnerTooltipHeader;
});

const recommendedPartnerTooltipBody = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.recommendedPartnerTooltipBody) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the recommended badge component. Requires 'recommendedPartnerTooltipBody'",
    );
  }
  return globalOptions.translations.recommendedPartnerTooltipBody;
});

const recommendedPartnerBadgeAltText = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.recommendedPartnerBadgeAltText) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the recommended badge component. Requires 'recommendedPartnerBadgeAltText'",
    );
  }
  return globalOptions.translations.recommendedPartnerBadgeAltText;
});

const moreRecommendedPartnerBadgeAltText = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.moreRecommendedPartnerBadgeAltText) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the recommended badge component. Requires 'moreRecommendedPartnerBadgeAltText'",
    );
  }
  return globalOptions.translations.moreRecommendedPartnerBadgeAltText;
});

const mostRecommendedPartnerBadgeAltText = computed(() => {
  const globalOptions = GlobalOptionsProvider.getInstance().getOptions();
  if (!globalOptions?.translations?.mostRecommendedPartnerBadgeAltText) {
    throw new Error(
      "Error: you must provide translations options to the neo-component-kit library to use the recommended badge component. Requires 'mostRecommendedPartnerBadgeAltText'",
    );
  }
  return globalOptions.translations.mostRecommendedPartnerBadgeAltText;
});

const ariaLabel = computed<string | undefined>(() => {
  switch (props.recommendationLevel) {
    case RecommendationLevel.RECOMMENDED:
      return recommendedPartnerBadgeAltText.value;
    case RecommendationLevel.MORE_RECOMMENDED:
      return moreRecommendedPartnerBadgeAltText.value;
    case RecommendationLevel.MOST_RECOMMENDED:
      return mostRecommendedPartnerBadgeAltText.value;
  }
  return undefined;
});
</script>

<docs>
  Recommended badge for low recommendation level:
  ```js
  <nck-recommended-badge :recommendationLevel="RecommendationLevel.RECOMMENDED" />
  ```

  Recommended badge of "filled" badge type with tooltip for medium recommendation level:
  ```js
  <nck-recommended-badge type="filled" :recommendationLevel="RecommendationLevel.MORE_RECOMMENDED" :showTooltip=true />
  ```

  Recommended badge without background and tooltip for highest recommendation level.
  The grey background is not part of the component. It was placed behind to clearly show that this version has a transparent background.
  ```js
  <div class="background-color-blue-grey-200">
    <nck-recommended-badge :showTooltip=false :recommendationLevel="RecommendationLevel.MOST_RECOMMENDED" type="no-background"/>
  </div>
  ```
</docs>
