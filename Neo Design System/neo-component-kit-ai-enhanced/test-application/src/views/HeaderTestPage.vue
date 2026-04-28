<template>
  <div class="light-grey-background">
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/header-errors">another page right here</router-link>
    </div>
    <h1 class="test-app-style">Working test cases:</h1>

    <h2 class="test-app-style">Default value test cases:</h2>

    <div :data-test-case="1">
      <b>Test case 1 (Default position of subtitle is under): </b>
      <span>title: "Title", subtitle: "Subtitle"</span>
      <nck-header
        title="Title"
        subtitle="Subtitle"
      ></nck-header>
    </div>

    <div :data-test-case="2">
      <b>Test case 2 (left icon, button not wired): </b>
      <span>leftIconName: "chevron-left-s", leftIconAltText: "icon alt text"</span>
      <nck-header
        leftIconName="chevron-left-s"
        leftIconAltText="icon alt text"
        leftIconAriaRole="link"
      ></nck-header>
    </div>

    <div :data-test-case="3">
      <b>Test case 3 (default type of header is standard): </b>
      <span>title: "Title""</span>
      <nck-header title="Title"></nck-header>
    </div>

    <div :data-test-case="4">
      <b>Test case 4 (divider is shown by default):</b>
      <span>title: "Title""</span>
      <nck-header title="Title"></nck-header>
    </div>

    <h2 class="test-app-style">Corner case test cases:</h2>

    <div :data-test-case="5">
      <b>Test case 5 (very long title and subtitle, button not wired): </b>
      <span>title: Very long, subtitle: Very long</span>
      <nck-header
        title="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum."
        subtitle="Title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum. Phasellus aliquet et nulla maximus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet et nulla maximus rutrum."
        leftIconName="chevron-left-s"
        leftIconAltText="left icon alt text"
        leftIconAriaRole="link"
        rightIconName="close-dark"
        rightIconAltText="right icon alt text"
        rightIconAriaRole="button"
      ></nck-header>
    </div>

    <div class="test-info">
      <h2 class="test-app-style">General test cases:</h2>
      <div>
        For these test cases, I have used the icon CHEVRON_LEFT_S for leftIconName,
        and the icon CLOSE_DARK for rightIconName.
      </div>
      <div>
        The icons have the same alt text which is: "Some alt text".
      </div>
    </div>

    <div :data-test-case="6">
      <b>Test case 6 :</b>
      <span>showDivider: false, title: not empty, subtitle: not empty, leftIconName, leftIconAriaRole: link, headerType: Condensed</span>
      <nck-header
        title="Title goes here"
        subtitle="Subtitle goes there"
        subtitlePitlePosition="under"
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="link"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
        @page-header-left-icon-clicked="toggleTestValue(6)"
      ></nck-header>
      <div v-if="testValueDisplayed[6]">Hello tests!!!</div>
    </div>

    <div :data-test-case="7">
      <b>Test case 7 :</b>
      <span>showDivider: false, title: not empty, subtitle: not empty, leftIconName, leftIconAriaRole: link, rightIconName, rightIconAriaRole: link, headerType: Condensed</span>
      <nck-header
        title="Title goes here"
        subtitle="Subtitle goes there"
        subtitlePosition="under"
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="link"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="link"
        @page-header-left-icon-clicked="toggleTestValue(7)"
        @page-header-right-icon-clicked="toggleTestValue(7)"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
      ></nck-header>
      <div v-if="testValueDisplayed[7]">Hello tests!!!</div>
    </div>

    <div :data-test-case="8">
      <b>Test case 8 :</b>
      <span>showDivider: true, title: not empty, subtitle: empty, headerType: Standard</span>
      <nck-header
        title="Title goes here"
        :headerType=HeaderType.STANDARD
        :showDivider="true"
      ></nck-header>
    </div>

    <div :data-test-case="9">
      <b>Test case 9 :</b>
      <span>showDivider: false, title: empty, subtitle: empty, leftIconName, leftIconAriaRole: link, rightIconName, rightIconAriaRole: button, headerType: Standard</span>
      <nck-header
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="link"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="button"
        :headerType=HeaderType.STANDARD
        :showDivider="false"
        @page-header-left-icon-clicked="toggleTestValue(9)"
        @page-header-right-icon-clicked="toggleTestValue(9)"
      ></nck-header>
      <div v-if="testValueDisplayed[9]">Hello tests!!!</div>
    </div>

    <div :data-test-case="10">
      <b>Test case 10 :</b>
      <span>showDivider: false, title: not empty, subtitle: empty, headerType: Condensed</span>
      <nck-header
        title="Title goes here"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
      ></nck-header>
    </div>

    <div :data-test-case="11">
      <b>Test case 11 :</b>
      <span>showDivider: false, title: empty, subtitle: empty, leftIconName, leftIconAriaRole: button, headerType: Condensed</span>
      <nck-header
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="button"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
        @page-header-left-icon-clicked="toggleTestValue(11)"
      ></nck-header>
      <div v-if="testValueDisplayed[11]">Hello tests!!!</div>
    </div>

    <div :data-test-case="12">
      <b>Test case 12 :</b>
      <span>showDivider: false, title: not empty, subtitle: not empty, rightIconName, rightIconAriaRole: link, headerType: Standard</span>
      <nck-header
        title="Title goes here"
        subtitlePosition="under"
        subtitle="Subtitle goes there"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="link"
        :headerType=HeaderType.STANDARD
        :showDivider="false"
        @page-header-right-icon-clicked="toggleTestValue(12)"
      ></nck-header>
      <div v-if="testValueDisplayed[12]">Hello tests!!!</div>
    </div>

    <div :data-test-case="13">
      <b>Test case 13 :</b>
      <span>showDivider: true, title: not empty, subtitle: not empty, rightIconName, rightIconAriaRole: button, headerType: Standard</span>
      <nck-header
        title="Title goes here"
        subtitle="Subtitle goes there"
        subtitlePosition="under"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="button"
        :headerType=HeaderType.STANDARD
        :showDivider="true"
        @page-header-right-icon-clicked="toggleTestValue(13)"
      ></nck-header>
      <div v-if="testValueDisplayed[13]">Hello tests!!!</div>
    </div>

    <div :data-test-case="14">
      <b>Test case 14 :</b>
      <span>showDivider: true, title: empty, subtitle: empty, leftIconName, leftIconAriaRole: button, rightIconName, rightIconAriaRole: link, headerType: Condensed</span>
      <nck-header
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="button"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="link"
        :headerType=HeaderType.CONDENSED
        :showDivider="true"
        @page-header-left-icon-clicked="toggleTestValue(14)"
        @page-header-right-icon-clicked="toggleTestValue(14)"
      ></nck-header>
      <div v-if="testValueDisplayed[14]">Hello tests!!!</div>
    </div>

    <div :data-test-case="15">
      <b>Test case 15 :</b>
      <span>showDivider: true, title: empty, subtitle: empty, leftIconName, leftIconAriaRole: button, headerType: Standard</span>
      <nck-header
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="button"
        :headerType=HeaderType.STANDARD
        :showDivider="true"
        @page-header-left-icon-clicked="toggleTestValue(15)"
      ></nck-header>
      <div v-if="testValueDisplayed[15]">Hello tests!!!</div>
    </div>

    <div :data-test-case="16">
      <b>Test case 16 :</b>
      <span>showDivider: false, title: empty, subtitle: empty, rightIconName, rightIconAriaRole: button, headerType: Condensed</span>
      <nck-header
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="button"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
        @page-header-right-icon-clicked="toggleTestValue(16)"
      ></nck-header>
      <div v-if="testValueDisplayed[16]">Hello tests!!!</div>
    </div>

    <div :data-test-case="17">
      <b>Test case 17 :</b>
      <span>showDivider: false, title: not empty, subtitle: empty, leftIconName, leftIconAriaRole: button, rightIconName, rightIconAriaRole: button, headerType: Standard</span>
      <nck-header
        title="Title goes here"
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="button"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="button"
        :headerType=HeaderType.STANDARD
        :showDivider="false"
        @page-header-left-icon-clicked="toggleTestValue(17)"
        @page-header-right-icon-clicked="toggleTestValue(17)"
      ></nck-header>
      <div v-if="testValueDisplayed[17]">Hello tests!!!</div>
    </div>

    <div :data-test-case="18">
      <b>Test case 18 :</b>
      <span>showDivider: false, title: not empty, subtitle: empty, headerType: Standard</span>
      <nck-header
        title="Title goes here"
        :headerType=HeaderType.STANDARD
        :showDivider="false"
      ></nck-header>
    </div>

    <div :data-test-case="19">
      <b>Test case 19 :</b>
      <span>showDivider: true, title: not empty, subtitle: not empty, headerType: Standard, backlink, rightButtonLabel, rightButtonAriaRole: button</span>
      <nck-header
        title="Title goes here"
        subtitle="Subtitle goes here"
        subtitlePosition="under"
        backlink="Itinerary trip"
        rightButtonLabel="Right button"
        rightButtonIconName="add-plus"
        rightButtonAriaRole="button"
        :headerType=HeaderType.STANDARD
        :showDivider="true"
        @page-header-backlink-clicked="toggleTestValue(19)"
        @page-header-right-button-clicked="toggleTestValue(19)"
      ></nck-header>
      <div v-if="testValueDisplayed[19]">Hello tests!!!</div>
    </div>
    <div :data-test-case="20">
      <b>Test case 20 :</b>
      <span>showDivider: false, title: not empty, subtitle: not empty, subtitlePosition: inline, headerType: Condensed, backlink, rightButtonLabel, rightButtonAriaRole: link</span>
      <nck-header
        title="Title goes here and let's define a very long text with some lorem ipsum dolor sit amet consectetur adipiscing elit in it, hoping that it would wrap when reaching the right edge"
        subtitle="Subtitle goes here and let's define a very long text with some lorem ipsum dolor sit amet consectetur adipiscing elit in it, hoping that it would wrap when reaching the right edge"
        subtitlePosition="inline"
        backlink="Create trip"
        rightButtonLabel="Right link"
        rightButtonIconName="add-plus"
        rightButtonAriaRole="link"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
        @page-header-backlink-clicked="toggleTestValue(20)"
        @page-header-right-button-clicked="toggleTestValue(20)"
      ></nck-header>
      <div v-if="testValueDisplayed[20]">Hello tests!!!</div>
    </div>

    <div :data-test-case="21">
      <b>Test case 21 :</b>
      <span>showDivider: true, title: not empty, subtitle: empty, headerType: Standard, backlink</span>
      <nck-header
        title="Title goes here and let's define a very long text with some lorem ipsum dolor sit amet consectetur adipiscing elit in it, hoping that it would wrap when reaching the right edge"
        backlink="Itinerary trip"
        :headerType=HeaderType.STANDARD
        :showDivider="true"
        @page-header-backlink-clicked="toggleTestValue(21)"
        @page-header-right-button-clicked="toggleTestValue(21)"
      ></nck-header>
      <div v-if="testValueDisplayed[21]">Hello tests!!!</div>
    </div>

    <div :data-test-case="22">
      <b>Test case 22 :</b>
      <span>showDivider: false, title: not empty, subtitle: not empty, subtitlePosition: inline, rightIconName, rightIconAriaRole: link, headerType: Condensed, backlink</span>
      <nck-header
        title="Title goes here"
        subtitle="Subtitle goes here and let's define a very long text with some lorem ipsum dolor sit amet consectetur adipiscing elit in it, hoping that it would wrap when reaching the right edge"
        subtitlePosition="inline"
        backlink="Create trip"
        rightIconName="close-dark"
        rightIconAltText="Some alt text"
        rightIconAriaRole="link"
        :headerType=HeaderType.CONDENSED
        :showDivider="false"
        @page-header-backlink-clicked="toggleTestValue(22)"
        @page-header-right-icon-clicked="toggleTestValue(22)"
      ></nck-header>
      <div v-if="testValueDisplayed[22]">Hello tests!!!</div>
    </div>
    <div :data-test-case="23">
      <b>Test case 23 :</b>
      <span>showDivider: false, title: not empty, subtitle: empty, headerType: Standard, rightButtonLabel, rightButtonAriaRole: button</span>
      <nck-header
        title="Title goes here"
        :headerType=HeaderType.STANDARD
        :showDivider="false"
        rightButtonLabel="Right button"
        rightButtonIconName="add-plus"
        rightButtonAriaRole="button"
        @page-header-right-button-clicked="toggleTestValue(23)"
      ></nck-header>
      <div v-if="testValueDisplayed[23]">Hello tests!!!</div>
    </div>
    <div :data-test-case="24">
      <b>Test case 24 : </b>
      <span>showDivider: false, title: not empty, subtitle: not empty, subtitlePosition: inline, leftIconName, leftIconAriaRole: link, headerType: Standard, rightButtonLabel, rightButtonAriaRole: link</span>
      <nck-header
        title="Title goes here"
        subtitle="Subtitle goes here"
        subtitlePosition="inline"
        leftIconName="chevron-left-s"
        leftIconAltText="Some alt text"
        leftIconAriaRole="link"
        rightButtonLabel="Right link"
        rightButtonIconName="add-plus"
        rightButtonAriaRole="link"
        :headerType=HeaderType.STANDARD
        :showDivider="false"
        @page-header-left-icon-clicked="toggleTestValue(24)"
        @page-header-right-button-clicked="toggleTestValue(24)"
      ></nck-header>
      <div v-if="testValueDisplayed[24]">Hello tests!!!</div>
    </div>
    <div :data-test-case="25">
      <b>Test case 25 : </b>
      <span>title: not empty, leftIconName: luggage, leftIconAltText: Luggage, leftIconAriaRole: button, rightButtonLabel: Have a drink, rightButtonIconName: lounge, rightButtonAriaRole: link</span>
      <nck-header
        title="Title"
        leftIconName="luggage"
        leftIconAltText="Luggage"
        leftIconAriaRole="button"
        rightButtonLabel="Have a drink"
        rightButtonIconName="lounge"
        rightButtonAriaRole="link"
      ></nck-header>
    </div>
    <div :data-test-case="26">
      <b>Test case 26 : </b>
      <span>title: not empty, leftIconName: plane-outbound-blue, leftIconAltText: Plane take off, leftIconAriaRole: link, rightIconName: plus-circle-filled, rightIconAltText: Plus, rightButtonAriaRole: button</span>
      <nck-header
        title="Title"
        leftIconName="plane-outbound-blue"
        leftIconAltText="Plane take off"
        leftIconAriaRole="link"
        rightIconName="plus-circle-filled"
        rightIconAltText="Plus"
        rightIconAriaRole="button"
      ></nck-header>
    </div>
    <div :data-test-case="27">
      <b>Test case 27 : </b>
      <span>title: not empty, slot: buttons</span>
      <nck-header
        title="Title"
        subtitle="Subtitle"
      >
        <template v-slot:trailing-content>
          <nck-button label="action 1" @click="toggleTestValue(27)" />
          <nck-button label="action 2" @click="toggleTestValue(27)" class="trailing-content-middle-button" />
          <nck-button label="action 3" @click="toggleTestValue(27)" />
        </template>
      </nck-header>
      <div v-if="testValueDisplayed[27]">Hello tests!!!</div>
    </div>
    <div :data-test-case="28">
      <b>Test case 28 : </b>
      <span>title: not empty, subtitle: not empty, slot: search input, backlink</span>
      <nck-header
        title="This title is a bit longer"
        subtitle="Subtitle"
        backlink="Create trip"
        @page-header-backlink-clicked="toggleTestValue(28)"
      >
        <template v-slot:trailing-content>
          <nck-text-input label="action 1" leadingIcon="search" modelValue="your search" />
        </template>
      </nck-header>
      <div v-if="testValueDisplayed[28]">Hello tests!!!</div>
    </div>
    <div :data-test-case="29">
      <b>Test case 29 : </b>
      <span>title: slot, subtitle: not empty, subtitlePosition: inline, backlink, rightIconName: close-dark, rightIconAltText: Some alt text, rightIconAriaRole: link</span>
      <nck-header
        backlink="Create trip"
        subtitle="Subtitle inline"
        subtitlePosition="inline"
        :showDivider="false"
        @page-header-backlink-clicked="toggleTestValue(29)"
      >
        <template v-slot:title-content>
          <span>Some text of my choosing</span>
        </template>
      </nck-header>
      <div v-if="testValueDisplayed[29]">Hello tests!!!</div>
    </div>
    <div :data-test-case="30">
      <b>Test case 30 : </b>
      <span>title: slot, subtitle: not empty, subtitlePosition: under, trailing slot: search input, leftIconName: luggage, leftIconAltText: Luggage, leftIconAriaRole: link</span>
      <nck-header
        leftIconName="luggage"
        leftIconAltText="Luggage"
        leftIconAriaRole="link"
        subtitle="Subtitle under"
        @page-header-backlink-clicked="toggleTestValue(30)"
      >
        <template v-slot:title-content>
          <div v-if="editingTitle" style="display: flex; align-items: center">
            <nck-text-input v-model="editedTitle" label="Editable title" />
            <nck-button style="margin-left: 1rem" leftIcon="tick" iconAltText="OK" :color="ButtonColor.POSITIVE" @click="editableTitle = editedTitle; editingTitle = false" />
            <nck-button style="margin-left: 1rem" leftIcon="close" iconAltText="OK" :color="ButtonColor.NEGATIVE" @click="editingTitle = false; editedTitle = editableTitle" />
          </div>
          <div v-else>
            <span>{{ editableTitle }}</span>
            <nck-button style="margin-left: 1rem" leftIcon="edit-pencil" iconAltText="Edit" @click="editingTitle = true" />
          </div>
        </template>
      </nck-header>
      <div v-if="testValueDisplayed[30]">Hello tests!!!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckHeader, HeaderType, NckButton, ButtonColor, NckTextInput } from "@neotechnologygroup/neo-component-kit";

const editableTitle = ref("Editable title");
const editedTitle = ref("Editable title");
const editingTitle = ref(false);

const testValueDisplayed = ref<boolean[]>([]);

function toggleTestValue(idx: number) {
  testValueDisplayed.value[idx] = !testValueDisplayed.value[idx];
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

.nck-header {
  /* ensures we can see the divider when present */
  padding-bottom: 3px;
}

.trailing-content-middle-button {
  margin-inline: 0.5rem;
}
</style>
