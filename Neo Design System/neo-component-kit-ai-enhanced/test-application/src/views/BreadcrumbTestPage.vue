<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/breadcrumb-errors">another page right here</router-link>
    </div>
    <div v-for="i in [0, 1, 2]" :key="i" :data-test-case="i">
      <b>Test case {{ i }}</b>
      <p class="test-app-style">
        <i>A breadcrumb with 3 elements, the active one is the element n°{{ i + 1 }} (index is {{ i }})</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 3" :key="j" @click="setActiveStep(i, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[i] }}</p>
      <nck-breadcrumb :options="testDataArray[i]" :activeStep="currentActiveSteps[i]"
        aria-label="A breadcrumb"></nck-breadcrumb>
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        <i>A breadcrumb with the all elements in "error" display</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 3" :key="j" @click="setActiveStep(3, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[3] }}</p>
      <nck-breadcrumb :options="testDataError" :activeStep="currentActiveSteps[3]"
        aria-label="A breadcrumb"></nck-breadcrumb>
    </div>

    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        <i>A breadcrumb with first element disabled and a lot of elements so that it wraps</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 12" :key="j" @click="setActiveStep(4, j + 1)">
          Go to step {{ j }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[4] }}</p>
      <nck-breadcrumb :options="testDataVeryLong" :activeStep="currentActiveSteps[4]"
        aria-label="A breadcrumb"></nck-breadcrumb>
    </div>

    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        <i>
          A breadcrumb with second element errored and all with images as graphic element.
          Also it is labeled by its title
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 3" :key="j" @click="setActiveStep(5, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[5] }}</p>
      <h1 class="test-app-style" id="orderTitle">Orders</h1>
      <nck-breadcrumb :options="testDataWithErrorInMiddle" :activeStep="currentActiveSteps[5]" aria-label="A breadcrumb"
        labeledByTitleId="orderTitle"></nck-breadcrumb>
    </div>

    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        <i>A breadcrumb with</i>
      <ul class="test-app-style">
        <li>First element with a counter (counter has no alternative text), it will read only "1" on tablet and mobile
        </li>
        <li>Second element with image as graphic element, one line of text, and alternative different (should read both on
          desktop, only alternative on mobile/tablet)</li>
        <li>Third element with image as graphic element, two lines of text, and alternative different (should read both on
          desktop, only alternative on mobile/tablet)</li>
        <li>Fourth element with image as graphic element, one line of text, and alternative text being exactly the same
          (should read it only once)</li>
        <li>Fifth element with image as graphic element, one line of text, and alternative text being textually the same
          but case is not (should read it only once)</li>
        <li>Sixth element with image as graphic element, two lines of text, and alternative text being eaxctly the same
          but case is not (should read it only once)</li>
      </ul>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 6" :key="j" @click="setActiveStep(6, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[6] }}</p>
      <nck-breadcrumb :options="testDataForAccessibility" :activeStep="currentActiveSteps[6]"
        aria-label="A breadcrumb"></nck-breadcrumb>
    </div>

    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        <i>
          A breadcrumb where most steps have a tooltip attached
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 6" :key="j" @click="setActiveStep(7, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[7] }}</p>
      <nck-breadcrumb :options="testDataForTooltips" :activeStep="currentActiveSteps[7]" aria-label="A breadcrumb"
        labeledByTitleId="orderTitle"></nck-breadcrumb>
    </div>

    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        <i>
          A breadcrumb with icons only to show how icon color is impacted by step state & user interactions
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 3" :key="j" @click="setActiveStep(8, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[8] }}</p>
      <nck-breadcrumb :options="testDataForIcons" :activeStep="currentActiveSteps[8]" aria-label="A breadcrumb"
        labeledByTitleId="orderTitle"></nck-breadcrumb>
    </div>

    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        <i>
          A breadcrumb as a stepper with tooltip
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 5" :key="j" @click="setActiveStep(9, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[9] }}</p>
      <NckBreadcrumb
        :options="testDataForStepper"
        :activeStep="currentActiveSteps[9]"
        aria-label="A breadcrumb"
        labeledByTitleId="orderTitle"
        stepperMode
      />
    </div>

    <div data-test-case="10">
      <b>Test case 10</b>
      <p class="test-app-style">
        <i>
          A breadcrumb as a stepper without tooltip
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style" v-for="j in 2" :key="j" @click="setActiveStep(10, j - 1)">
          Go to step {{ j - 1 }}
        </button>
      </p>
      <p class="test-app-style">Current active index is {{ currentActiveSteps[10] }}</p>
      <NckBreadcrumb
        :options="testDataForStepperWithoutTooltips"
        :activeStep="currentActiveSteps[10]"
        aria-label="A breadcrumb"
        labeledByTitleId="orderTitle"
        stepperMode
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  margin-bottom: 56px;
}
</style>

<script setup lang="ts">
import { NckBreadcrumb, IBreadcrumbOption } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const testDataArray = ref<IBreadcrumbOption[][]>([]);
const testDataError = ref<IBreadcrumbOption[]>([
  {
    text: "Orders",
    onClick: () => {
      setActiveStep(3, 0);
    },
    counter: true,
    errorState: true
  },
  {
    text: "Order n°12345",
    textSecondLine: "Pending",
    onClick: () => {
      setActiveStep(3, 1);
    },
    icon: "cheapest",
    iconOrImageAlternative: "Order step",
    errorState: true
  },
  {
    text: "Shipment info",
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Shipment info",
    onClick: () => {
      setActiveStep(3, 2);
    },
    errorState: true
  }
]);
const testDataVeryLong = ref<IBreadcrumbOption[]>([
  {
    text: "Holdings",
    onClick: () => {
      setActiveStep(4, 0);
    },
    counter: true,
    disabled: true
  },
  {
    text: "Companies",
    onClick: () => {
      setActiveStep(4, 1);
    },
    counter: true
  },
  {
    text: "Business Units",
    onClick: () => {
      setActiveStep(4, 2);
    },
    counter: true
  },
  {
    text: "Departments",
    onClick: () => {
      setActiveStep(4, 3);
    },
    counter: true,
    disabled: true
  },
  {
    text: "Teams",
    onClick: () => {
      setActiveStep(4, 4);
    },
    counter: true
  },
  {
    text: "Category",
    onClick: () => {
      setActiveStep(4, 5);
    },
    counter: true
  },
  {
    text: "Projects",
    onClick: () => {
      setActiveStep(4, 6);
    },
    counter: true
  },
  {
    text: "Stories",
    onClick: () => {
      setActiveStep(4, 7);
    },
    counter: true
  },
  {
    text: "Employee",
    onClick: () => {
      setActiveStep(4, 8);
    },
    counter: true
  },
  {
    text: "Tasks",
    onClick: () => {
      setActiveStep(4, 9);
    },
    counter: true
  },
  {
    text: "Sub-tasks",
    onClick: () => {
      setActiveStep(4, 10);
    },
    counter: true
  },
  {
    text: "Time log",
    onClick: () => {
      setActiveStep(4, 11);
    },
    counter: true
  },
  {
    text: "Details",
    onClick: () => {
      setActiveStep(4, 12);
    },
    counter: true
  }
]);
const testDataWithErrorInMiddle = ref<IBreadcrumbOption[]>([
  {
    text: "Orders",
    onClick: () => {
      setActiveStep(5, 0);
    },
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Orders"
  },
  {
    text: "Order n°12345",
    textSecondLine: "Pending",
    onClick: () => {
      setActiveStep(5, 1);
    },
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Order step",
    errorState: true
  },
  {
    text: "Shipment info",
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Shipment info",
    onClick: () => {
      setActiveStep(5, 2);
    }
  }
]);
const testDataForAccessibility = ref<IBreadcrumbOption[]>([
  {
    text: "Orders",
    onClick: () => {
      setActiveStep(6, 0);
    },
    counter: true
  },
  {
    text: "Order n°12345",
    onClick: () => {
      setActiveStep(6, 1);
    },
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Order step",
    errorState: true
  },
  {
    text: "Order n°12345",
    textSecondLine: "Pending",
    onClick: () => {
      setActiveStep(6, 2);
    },
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Order step",
    errorState: true
  },
  {
    text: "Shipment info",
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Shipment info",
    onClick: () => {
      setActiveStep(6, 3);
    }
  },
  {
    text: "shipment info",
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Shipment info",
    onClick: () => {
      setActiveStep(6, 4);
    }
  },
  {
    text: "Package tracking",
    textSecondLine: "Transport",
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "Package tracking Transport",
    onClick: () => {
      setActiveStep(6, 5);
    }
  }
]);
const testDataForTooltips = ref<IBreadcrumbOption[]>([
  {
    text: "Step 1",
    onClick: () => {
      setActiveStep(7, 0);
    },
    tooltipContent: "Very long tooltip content which is very interesting but still very long",
    counter: true
  },
  {
    text: "Step 2",
    textSecondLine: "Error",
    onClick: () => {
      setActiveStep(7, 1);
    },
    errorState: true,
    tooltipContent: "Tooltip content",
    counter: true
  },
  {
    text: "Step 3",
    onClick: () => {
      setActiveStep(7, 2);
    },
    tooltipHeading: "Tooltip heading",
    icon: "amenity-bar-dark",
    iconOrImageAlternative: "beverage"
  },
  {
    text: "Step 4",
    onClick: () => {
      setActiveStep(7, 3);
    },
    imageUrl: "Neo_Core_System.svg",
    iconOrImageAlternative: "NCK logo",
    tooltipHeading: "Tooltip heading",
    disabled: true
  },
  {
    text: "Step 5 (no tooltip)",
    onClick: () => {
      setActiveStep(7, 4);
    },
    counter: true
  },
  {
    text: "Step 6",
    onClick: () => {
      setActiveStep(7, 5);
    },
    tooltipHeading: "Tooltip heading",
    tooltipContent: "Tooltip content",
    icon: "change",
    iconOrImageAlternative: "change flight"
  }
]);
const testDataForIcons = ref<IBreadcrumbOption[]>([
  {
    text: "Orders",
    onClick: () => {
      setActiveStep(8, 0);
    },
    icon: "generic-ground",
    iconOrImageAlternative: "ground transport"
  },
  {
    text: "Order n°12345",
    textSecondLine: "Pending",
    onClick: () => {
      setActiveStep(8, 1);
    },
    icon: "generic-ground",
    iconOrImageAlternative: "ground transport",
    disabled: true
  },
  {
    text: "Shipment info",
    icon: "generic-ground",
    iconOrImageAlternative: "ground transport",
    onClick: () => {
      setActiveStep(8, 2);
    }
  }
]);

const testDataForStepper = ref<IBreadcrumbOption[]>([
  {
    text: "First step icon",
    onClick: () => {
      setActiveStep(9, 0);
    },
    icon: "plane",
    iconOrImageAlternative: "plane"
  },
  {
    text: "Orders",
    tooltipContent: "Tooltip content",
    onClick: () => {
      setActiveStep(9, 1);
    },
    counter: true
  },
  { text: "Outbound", counter: true, onClick: () => { setActiveStep(9, 2); }, tooltipHeading: "Tooltip heading", tooltipContent: "Tooltip content" },
  { text: "Inbound", counter: true, icon: "generic-ground", iconOrImageAlternative: "ground transport", disabled: true, onClick: () => { setActiveStep(9, 3); } },
  { text: "Final", counter: true, onClick: () => { setActiveStep(9, 4); } }
]);

const testDataForStepperWithoutTooltips = ref<IBreadcrumbOption[]>([
  {
    text: "Orders",
    onClick: () => {
      setActiveStep(10, 0);
    },
    icon: "help",
    iconOrImageAlternative: "help"

  },
  { text: "Outbound", counter: true, onClick: () => { setActiveStep(10, 1); } },
  { text: "Inbound", counter: true, disabled: true, onClick: () => { setActiveStep(10, 2); } }
]);

const currentActiveSteps = ref<number[]>([ 2, 1, 0, 2, testDataVeryLong.value.length - 1, 2,
  testDataForAccessibility.value.length - 1, testDataForTooltips.value.length - 1, testDataForIcons.value.length - 1, 2, 0 ]);

for (let i = 0; i < 3; i++) {
  testDataArray.value.push([
    {
      text: "Orders",
      onClick: () => {
        setActiveStep(i, 0);
      },
      counter: true
    },
    {
      text: "Order n°12345",
      textSecondLine: "Pending",
      onClick: () => {
        setActiveStep(i, 1);
      },
      icon: "cheapest",
      iconOrImageAlternative: "Order step"
    },
    {
      text: "Shipment info",
      imageUrl: "Neo_Core_System.svg",
      iconOrImageAlternative: "Shipment info",
      onClick: () => {
        setActiveStep(i, 2);
      }
    }
  ]);
}

function setActiveStep(index: number, value: number) {
  const nextActiveStep = [ ...currentActiveSteps.value ];
  nextActiveStep[index] = value;
  currentActiveSteps.value = nextActiveStep;
}
</script>
