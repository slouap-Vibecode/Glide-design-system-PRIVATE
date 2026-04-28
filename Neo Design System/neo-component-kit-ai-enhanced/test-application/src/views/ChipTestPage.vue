<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <h1>Chip test page</h1>

    <p>
      Error test cases have been put on
      <router-link class="test-app-style" to="/chip-errors">
        another page right here
      </router-link>
    </p>

    <div data-test-case="0">
      <div>
        <b>Test case 0:</b>
        Leading icon, trailing icon, disabled, active, and clearable
      </div>
      <NckChip
        label="On hold (42)"
        leftIconName="eco-outline"
        disabled
        active
        rightIconName="fastest"
        @chip-clicked="chipClicked(0)"
        @chip-cleared="chipCleared(0)"
        clearIconAltText="clear"
      />
      <div v-if="chipsClickedStatuses[0]">Chip clicked</div>
      <div v-if="chipsClearedStatuses[0]">Chip cleared</div>
    </div>

    <div data-test-case="1">
      <div>
        <b>Test case 1:</b>
        Leading icon
      </div>
      <NckChip
        leftIconName="dollar"
        label="All users (1)"
        @chip-clicked="chipClicked(1)"
      />
      <div v-if="chipsClickedStatuses[1]">Chip clicked</div>
    </div>

    <div data-test-case="2">
      <div>
        <b>Test case 2:</b>
        Disabled and clearable
      </div>
      <NckChip
        label="Direct flight (10)"
        disabled
        @chip-clicked="chipClicked(2)"
        @chip-cleared="chipCleared(2)"
        clearIconAltText="clear"
      />
      <div v-if="chipsClickedStatuses[2]">Chip clicked</div>
      <div v-if="chipsClearedStatuses[2]">Chip cleared</div>
    </div>

    <div data-test-case="3">
      <div>
        <b>Test case 3:</b>
        Trailing icon and active
      </div>
      <NckChip
        label="Eco-responsible"
        active
        leftIconName="eco-outline"
        @chip-clicked="chipClicked(3)"
      />
      <div v-if="chipsClickedStatuses[3]">Chip clicked</div>
    </div>

    <div data-test-case="4">
      <div>
        <b>Test case 4:</b>
        Leading icon, trailing icon, active, and clearable
      </div>
      <NckChip
        label="Fastest"
        leftIconName="dollar"
        rightIconName="dollar"
        active
        @chip-clicked="chipClicked(4)"
        @chip-cleared="chipCleared(4)"
        clearIconAltText="clear"
      />
      <div v-if="chipsClickedStatuses[4]">Chip clicked</div>
      <div v-if="chipsClearedStatuses[4]">Chip cleared</div>
    </div>

    <div data-test-case="5">
      <div>
        <b>Test case 5:</b>
        Leading icon and non-clickable chip
      </div>
      <NckChip label="Cannot click me" leftIconName="dollar" />
    </div>

    <div data-test-case="6">
      <div>
        <b>Test case 6:</b>
        Active, clearable, and non-clickable chip
      </div>
      <NckChip
        label="Can click only clear"
        active
        @chip-cleared="chipCleared(6)"
        clearIconAltText="clear"
      />
      <div v-if="chipsClearedStatuses[6]">Chip cleared</div>
    </div>

    <div data-test-case="7">
      <div>
        <b>Test case 7:</b>
        Leading icon, trailing icon, non-clickable, and disabled chip
      </div>
      <NckChip
        label="not clickable and disabled"
        leftIconName="dollar"
        rightIconName="dollar"
        disabled
      />
    </div>

    <div data-test-case="8">
      <div>
        <b>Test case 8: </b>
        Active, disabled, clearable, clickable, leading icon, trailing icon, trailing counter value = 10
      </div>

      <nck-chip
        label="Active, disabled, clearable, clickable, leading icon, trailing icon, trailing counter value = 10"
        active
        disabled
        leftIconName="dollar"
        rightIconName="dollar"
        :trailingCounterValue="10"
        clearIconAltText="clear"
        @chip-cleared="chipCleared(8)"
        @chip-clicked="chipClicked(8)"
      />

      <div v-if="chipsClearedStatuses[8]">Chip cleared</div>
      <div v-if="chipsClickedStatuses[8]">Chip clicked</div>
    </div>

    <div data-test-case="9">
      <div>
        <b>Test case 9: </b>
        Not active, not disabled, not clearable, non-clickable, leading icon, trailing counter value = 100
      </div>

      <nck-chip
        label="Not active, not disabled, not clearable, non-clickable, leading icon, trailing counter value = 100"
        leftIconName="dollar"
        :trailingCounterValue="100"
      />
    </div>

    <div data-test-case="10">
      <div>
        <b>Test case 10: </b>
        Not active, disabled, clearable, clickable, no icon,
        trailing counter value = 1e2
      </div>

      <nck-chip
        label="Not active, disabled, clearable, clickable, no icon,
        trailing counter value = 1e2"
        disabled
        :trailingCounterValue="1e2"
        clearIconAltText="clear"
        @chip-cleared="chipCleared(10)"
        @chip-clicked="chipClicked(10)"
      />

      <div v-if="chipsClearedStatuses[10]">Chip cleared</div>
      <div v-if="chipsClickedStatuses[10]">Chip clicked</div>
    </div>

    <div data-test-case="11">
      <div>
        <b>Test case 11: </b>
        Active, not disabled, not clearable, non-clickable, trailing icon, trailing counter value = 0
      </div>

      <nck-chip
        label="Active, not disabled, not clearable, non-clickable, trailing icon, trailing counter value = 0"
        active
        rightIconName="dollar"
        :trailingCounterValue="0"
      />
    </div>

    <div data-test-case="12">
      <div>
        <b>Test case 12: </b>
        Invalid
      </div>

      <nck-chip
        label="Invalid"
        :active="false"
        :invalid="true"
        @chip-clicked="chipClicked(12)"
        :ref="'test_12'"
      />
    </div>

    <div data-test-case="13">
      <div>
        <b>Test case 13: </b>
        Active, not disabled, clearable, clickable, trailing icon
      </div>

      <nck-chip
        label="Active, not disabled, not clearable, non-clickable, trailing icon, trailing counter value = 0"
        :active="chipActive"
        clearIconAltText="clear"
        @chip-clicked="chipActive = true"
        @[chipClearEvent]="chipActive = false"
      />
    </div>

    <div data-test-case="14">
      <div>
        <b>Test case 14: </b>
        Invalid with icon
      </div>

      <nck-chip
        label="Invalid"
        :active="false"
        :invalid="true"
        @chip-clicked="chipClicked(13)"
        :ref="'test_13'"
        leftIconName="dollar"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  padding: 0.1875rem;
}
</style>

<script setup lang="ts">
import { NckChip } from "@neotechnologygroup/neo-component-kit";
import { ref, computed } from "vue";

const chipsClickedStatuses = ref<boolean[]>([]);
const chipsClearedStatuses = ref<boolean[]>([]);
const chipActive = ref(true);

const chipClearEvent = computed((): string | null => {
  return chipActive.value ? "chip-cleared" : null;
});

function chipClicked(index: number) {
  if (chipsClickedStatuses.value[index]) {
    return;
  }
  chipsClickedStatuses.value[index] = !chipsClickedStatuses.value[index];
}

function chipCleared(index: number) {
  if (chipsClearedStatuses.value[index]) {
    return;
  }
  chipsClearedStatuses.value[index] = !chipsClearedStatuses.value[index];
}
</script>
