<template>
  <main>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <h1>Autocomplete</h1>
    <div>
      Valid test cases have been put on
      <router-link class="test-app-style" to="/autocomplete">another page right here</router-link>
    </div>

    <div data-test-case="0">
      <div>
        <h2>Test case 0</h2>
        Error case : autocomplete without clearButtonAltText
      </div>
      <button class="test-app-style" @click="displayedTestCases[0] = !displayedTestCases[0]">Toggle test case 0 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[0]" label="Choose your destination"
          :proposalsRetriever="getProposalsRetriever" loadingText="Loading the matching destinations"
          invalidSelectionErrorText="Select a valid destination" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="1">
      <div>
        <h2>Test case 1</h2>
        Error case : autocomplete without loadingText
      </div>
      <button class="test-app-style" @click="displayedTestCases[1] = !displayedTestCases[1]">Toggle test case 1 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[1]" clearButtonAltText="Clear destination"
          label="Choose your destination" :proposalsRetriever="getProposalsRetriever"
          invalidSelectionErrorText="Select a valid destination" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="2">
      <div>
        <h2>Test case 2</h2>
        Error case : autocomplete without numberOfMatchingResultsWording
      </div>
      <button class="test-app-style" @click="displayedTestCases[2] = !displayedTestCases[2]">Toggle test case 2 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[2]" clearButtonAltText="Clear destination"
          label="Choose your destination" :proposalsRetriever="getProposalsRetriever"
          loadingText="Loading the matching destinations" invalidSelectionErrorText="Select a valid destination"
          noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="3">
      <div>
        <h2>Test case 3</h2>
        Error case : autocomplete without invalidSelectionErrorText
      </div>
      <button class="test-app-style" @click="displayedTestCases[3] = !displayedTestCases[3]">Toggle test case 3 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[3]" clearButtonAltText="Clear destination"
          label="Choose your destination" :proposalsRetriever="getProposalsRetriever"
          loadingText="Loading the matching destinations" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="4">
      <div>
        <h2>Test case 4</h2>
        Error case : autocomplete without noMatchesFoundText
      </div>
      <button class="test-app-style" @click="displayedTestCases[4] = !displayedTestCases[4]">Toggle test case 4 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[4]" clearButtonAltText="Clear destination"
          label="Choose your destination" :proposalsRetriever="getProposalsRetriever"
          loadingText="Loading the matching destinations" invalidSelectionErrorText="Select a valid destination"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="5">
      <div>
        <h2>Test case 5</h2>
        Error case : autocomplete without errorRetrievingProposalsText
      </div>
      <button class="test-app-style" @click="displayedTestCases[5] = !displayedTestCases[5]">Toggle test case 5 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[5]" clearButtonAltText="Clear destination"
          label="Choose your destination" :proposalsRetriever="getProposalsRetriever"
          loadingText="Loading the matching destinations" invalidSelectionErrorText="Select a valid destination"
          noMatchesFoundText="No matching destination found"
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="6">
      <div>
        <h2>Test case 6</h2>
        Error case : autocomplete without label
      </div>
      <button class="test-app-style" @click="displayedTestCases[6] = !displayedTestCases[6]">Toggle test case 6 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[6]" clearButtonAltText="Clear destination"
          :proposalsRetriever="getProposalsRetriever" loadingText="Loading the matching destinations"
          invalidSelectionErrorText="Select a valid destination" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="7">
      <div>
        <h2>Test case 7</h2>
        Error case : autocomplete without proposalsRetriever
      </div>
      <button class="test-app-style" @click="displayedTestCases[7] = !displayedTestCases[7]">Toggle test case 7 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[7]" clearButtonAltText="Clear destination"
          label="Choose your destination" loadingText="Loading the matching destinations"
          invalidSelectionErrorText="Select a valid destination" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="8">
      <div>
        <h2>Test case 8</h2>
        Error case : autocomplete with autoSelect set to false cannot have property inlineAutocomplete set to true
      </div>
      <button class="test-app-style" @click="displayedTestCases[8] = !displayedTestCases[8]">Toggle test case 8 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[8]" :autoSelect="false" :inlineAutocomplete="true"
          :proposalsRetriever="getProposalsRetriever" clearButtonAltText="Clear destination"
          label="Choose your destination" loadingText="Loading the matching destinations"
          invalidSelectionErrorText="Select a valid destination" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>

    <div data-test-case="9">
      <div>
        <h2>Test case 9</h2>
        Error case : autocomplete with autoSelect set to true (default value) cannot have property acceptArbitraryInput
        also set to true
      </div>
      <button class="test-app-style" @click="displayedTestCases[9] = !displayedTestCases[9]">Toggle test case 9 to
        display error</button>
      <div class="autocomplete-wrapper">
        <nck-autocomplete v-if="displayedTestCases[9]" :acceptArbitraryInput="true"
          :proposalsRetriever="getProposalsRetriever" clearButtonAltText="Clear destination"
          label="Choose your destination" loadingText="Loading the matching destinations"
          invalidSelectionErrorText="Select a valid destination" noMatchesFoundText="No matching destination found"
          errorRetrievingProposalsText="Unable to find destinations at the moment. Please try again after few minutes."
          numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
      </div>
    </div>
  </main>
</template>
<style scoped lang="less">
[data-test-case] {
  padding: .5rem;
}

.autocomplete-wrapper {
  padding: 1rem;
}
</style>
<script setup lang="ts">
import { ref } from "vue";
import { NckAutocomplete, IAutocompleteItem } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);
const allAddresses = ref<IAutocompleteItem[]>([
  {
    label: "Paris, France",
    subLabel: "The city of lights",
    value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "Gare de Lyon, Paris",
    value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "location"
  },
  {
    label: "Aéroport Paris CDG",
    value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
    leadingIcon: "time"
  },
  {
    label: "London",
    subLabel: "United Kingdom",
    value: { displayAddress: "London", cityCode: "LON", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "London Gatwick international airport at 25km of London city center",
    value: { displayAddress: "London Gatwick international", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "plane"
  },
  {
    label: "London Saint Pancras",
    value: { displayAddress: "London Saint Pancras", cityCode: "SPC", lat: -33.145, lon: 42.34 },
    leadingIcon: "train"
  },
  {
    label: "Koh Lanta",
    value: { displayAddress: "Koh Lanta", cityCode: "KLT", lat: 3.145, lon: 2.34 }
  },
  {
    label: "Koh Tao",
    value: { displayAddress: "Koh Tao", cityCode: "KTA", lat: 34.145, lon: 12.34 }
  },
  {
    label: "Koh Samui",
    value: { displayAddress: "Koh Samui", cityCode: "KSA", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Rok",
    value: { displayAddress: "Koh Rok", cityCode: "KRO", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Rok Nuy",
    value: { displayAddress: "Koh Rok Nuy", cityCode: "KRN", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Phiphi",
    value: { displayAddress: "Koh Phiphi", cityCode: "KPP", lat: -33.145, lon: 42.34 }
  }
]);

async function getProposalsRetriever(input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((resolve, _reject) => {
    setTimeout(() => {
      const result = allAddresses.value.filter(
        (address) => address.label.toLowerCase().includes(input.toLowerCase()));
      resolve(result);
    }, 300);
  });
}
</script>
