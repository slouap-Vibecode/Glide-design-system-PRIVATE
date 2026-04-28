<template>
  <div class="nck-style nck-status-indicator">
    <div class="align">
      <NckIcon
        class="icon"
        :iconSize="IconSize.XS"
        :iconName="statusIconMapping[status]"
        :primaryColor="statusIconColorMapping[status]"
        iconAltText=""
      />
      <span class="text-m font-color-ink-100">{{ label }}</span>
    </div>
    <div class="information" v-if="informationText">
      <span class="text-m font-color-ink-70">{{ informationText }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.nck-style.nck-status-indicator {
  text-align: left;

  .align {
    display: flex;
  }

  .icon {
    margin-top: 0.125rem;
    margin-right: 0.5rem;
  }
  .information {
    margin-top: 0.125rem;
    margin-left: 1.5rem;
    // remove unwanted height
    display: flex;
  }
}
</style>

<script setup lang="ts">
import { Status } from "@/constants/status";
import NckIcon from "@/components/nckIcon.vue";
import { IconColors } from "@/constants/iconColors";
import { IconSize } from "@/constants/iconSize";

/**
 * @component
 * @displayName nck-status-indicator
 *
 * The status indicator component is used to display the status/step of a process for a required item.
 */

defineProps<{
  /**
   * [Status](#status) of a process, it determines which icon appears.
   */
  status: Status;
  /**
   * Text describing the status of a process.
   * Accessibility note: this text must convey, at least, the same functional meaning as the icon preceding it. Reason being that the icon alt text is always empty. Only providing supplemental information to the icon's meaning in this label would breach https://www.w3.org/TR/WCAG21/#non-text-content .
   */
  label: string;
  /**
   * The status indicators can also display additional status information.
   */
  informationText?: string;
}>();

const statusIconMapping: Record<Status, string> = {
  [Status.WARNING]: "status-warning",
  [Status.DRAFT]: "status-draft",
  [Status.SUCCESS]: "status-success",
  [Status.ERROR]: "status-critical",
  [Status.PENDING]: "status-pending",
  [Status.CANCELLED]: "status-cancel",
};

const statusIconColorMapping: Record<Status, IconColors> = {
  [Status.WARNING]: IconColors.ORANGE_300,
  [Status.DRAFT]: IconColors.BLUE_GREY_500,
  [Status.SUCCESS]: IconColors.GREEN_300,
  [Status.ERROR]: IconColors.RED_300,
  [Status.PENDING]: IconColors.BRIGHT_BLUE_300,
  [Status.CANCELLED]: IconColors.BLUE_GREY_700,
};
</script>

<docs>
Icon and label :
```jsx
<nck-status-indicator :status="Status.PENDING" label="I'm a status" />
```

Icon, label and information :
```jsx
<nck-status-indicator
  :status="Status.WARNING"
  label="I'm a status"
  informationText="from another approver"
/>
```
</docs>
