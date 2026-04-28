<template>
  <div class="light-grey-background">
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <h1 class="test-app-style">Breaking test cases :</h1>
    <div class="test-info">
      We'll still have the divider because it is present by default.
      The containers of the header and icon are present too.
    </div>
    <div v-bind:data-test-case="0">
       <b>Test case 0:</b> Erroneous parameter(s) means error(s) in console.
      <div>
        <button class="test-app-style" @click="setError(0)">Toggle test case 0 to display error</button>
        <nck-header v-if="displayedTestCases[0]" :leftIconName="369" :leftIconAltText="true" leftIconAriaRole="link"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="1">
      <b>Test case 1:</b> Left icon with no alternative text will trigger an error in console.
      <div>
        <button class="test-app-style" @click="setError(1)">Toggle test case 1 to display error</button>
        <nck-header v-if="displayedTestCases[1]" leftIconName="chevron-left-s" leftIconAriaRole="link"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="2">
      <b>Test case 2:</b> No icon and no title will trigger an error in console.
      <div>
        <button class="test-app-style" @click="setError(2)">Toggle test case 2 to display error</button>
        <nck-header v-if="displayedTestCases[2]" :showDivider="false"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="3">
      <b>Test case 3:</b> Subtitle but no title will trigger an error in console.
      <div>
        <button class="test-app-style" @click="setError(3)">Toggle test case 3 to display error</button>
        <nck-header v-if="displayedTestCases[3]" leftIconName="chevron-left-s" leftIconAltText="Some alt text" leftIconAriaRole="button" subtitle="Subtitle"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="4">
      <b>Test case 4:</b> Right icon with no alternative text will trigger an error in console.
      <div>
        <button class="test-app-style" @click="setError(4)">Toggle test case 4 to display error</button>
        <nck-header v-if="displayedTestCases[4]" rightIconName="chevron-right-s" rightIconAriaRole="button"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="5">
      <b>Test case 5:</b> A left icon without its corresponding aria role will trigger an error in console.
      <div>
        <button @click="setError(5)">Toggle test case 5 to display error</button>
        <nck-header v-if="displayedTestCases[5]" leftIconName="chevron-left-s" leftIconAltText="Some alt text"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="6">
      <b>Test case 6:</b> A right icon without its corresponding aria role will trigger an error in console.
      <div>
        <button @click="setError(6)">Toggle test case 6 to display error</button>
        <nck-header v-if="displayedTestCases[6]" rightIconName="close-dark" rightIconAltText="Some alt text"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="7">
      <b>Test case 7:</b> Left icon along with backlink will trigger an error in console.
      <div>
        <button @click="setError(7)">Toggle test case 7 to display error</button>
        <nck-header v-if="displayedTestCases[7]" leftIconName="close-dark" backlink="Go back"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="8">
      <b>Test case 8:</b> Right button label without right button icon name, will trigger an error in console.
      <div>
        <button @click="setError(8)">Toggle test case 8 to display error</button>
        <nck-header v-if="displayedTestCases[8]" rightButtonLabel="Some button label" rightButtonAriaRole="button"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="9">
      <b>Test case 9:</b> Right button label without right button aria role, will trigger an error in console.
      <div>
        <button @click="setError(9)">Toggle test case 9 to display error</button>
        <nck-header v-if="displayedTestCases[9]" rightButtonLabel="Some button label" rightButtonIconName="close-dark"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="10">
      <b>Test case 10:</b> Right icon along with right button will trigger an error in console.
      <div>
        <button @click="setError(10)">Toggle test case 10 to display error</button>
        <nck-header v-if="displayedTestCases[10]" rightIconName="close-dark" rightButtonLabel="Some button label" rightButtonIconName="close-dark"></nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="11">
      <b>Test case 11:</b> Right icon and slot trailing-content will trigger an error in console.
      <div>
        <button @click="setError(11)">Toggle test case 11 to display error</button>
        <nck-header v-if="displayedTestCases[11]" title="Some title" rightIconAriaRole="button" rightIconAltText="alt" rightIconName="close-dark">
          <template v-slot:trailing-content>slot here</template>
        </nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="12">
      <b>Test case 12:</b> Right button and slot trailing-content will trigger an error in console.
      <div>
        <button @click="setError(12)">Toggle test case 12 to display error</button>
        <nck-header v-if="displayedTestCases[12]" title="Some title" rightButtonLabel="Some button label" rightButtonIconName="close-dark" rightButtonAriaRole="button">
          <template v-slot:trailing-content>slot here</template>
        </nck-header>
      </div>
    </div>
    <div v-bind:data-test-case="13">
      <b>Test case 13:</b> Title and slot title-content will trigger an error in console.
      <div>
        <button @click="setError(13)">Toggle test case 13 to display error</button>
        <nck-header v-if="displayedTestCases[13]" title="Some title">
          <template v-slot:title-content>slot here</template>
        </nck-header>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckHeader } from "@neotechnologygroup/neo-component-kit";

const displayedTestCases = ref<boolean[]>([]);

function setError(index: number) {
  // @todo - on vue3 we need to update this code to change the index directly
  const nextDisplayedTestCases = [ ...displayedTestCases.value ];
  nextDisplayedTestCases[index] = !nextDisplayedTestCases[index];
  displayedTestCases.value = nextDisplayedTestCases;
}
</script>

<style scoped>
[data-test-case] {
  margin-top: 20px;
}
.test-info {
  margin: 10px 0 30px 0;
}

.light-grey-background {
  background-color: lightgray;
}
</style>
