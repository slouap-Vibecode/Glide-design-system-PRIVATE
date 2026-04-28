<template>
  <div id="testPageContainer">
    <PreloadIconComponent :iconsToPreload="[
      'cheapest',
      'earliest',
      'edit-pencil',
      'close-dark',
      'train-outbound',
      'plane-outbound',
      'plane-return',
      'train-outbound-no-circle',
      'plane-outbound-no-circle',
      'add-plus',
      'airport-rail'
    ]" />
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/tabs-errors">another page right here</router-link>
    </div>

    <div data-test-case="2">
      <b>Test case 2</b>
      1 tab, type: {{ TabsType.UNIFORM_FULL }}
      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="hello tab!">
          Tab content
        </nck-tab>
      </nck-tabs>
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      4 tabs with one very very long tab, type: {{ TabsType.UNIFORM_FULL }}
      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="I am not that long!">
          Tab content 1
        </nck-tab>
        <nck-tab heading="me neither!">
          Tab content 2
        </nck-tab>
        <nck-tab heading="but i am very very very very very
          very very very very very very very very very very
          very very very very very very very very very very
          very very very very very very very long!">
          Tab content 3
        </nck-tab>
        <nck-tab heading="not me!">
          Tab content 4
        </nck-tab>
      </nck-tabs>
    </div>
    <div data-test-case="4">
      <b>Test case 4</b>
      3 tabs with counter badge on second tab, type: {{ TabsType.UNIFORM_FULL }}
      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="test">
          Tab content
        </nck-tab>
        <nck-tab heading="some other tab" trailingCounterValue=42>
          Some Tab content also
        </nck-tab>
        <nck-tab :heading="dynamicHeading">
          {{ dynamicContent }}
        </nck-tab>
      </nck-tabs>
    </div>
    <div data-test-case="5">
      <b>Test case 5</b>
      4 tabs with one very very long tab that has a counter, the counter being over 99 (125), type:
      {{ TabsType.UNIFORM_FULL }}
      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="I am not that long!">
          Tab content 1
        </nck-tab>
        <nck-tab heading="me neither!">
          Tab content 2
        </nck-tab>
        <nck-tab heading="but i am very very very very very
          very very very very very very very very very very
          very very very very very very very very very very
          very very very very very very very long!" trailingCounterValue=125>
          Tab content 3
        </nck-tab>
        <nck-tab heading="not me!">
          Tab content 4
        </nck-tab>
      </nck-tabs>
    </div>
    <div data-test-case="6">
      <b>Test case 6</b>
      3 tabs and the second one has a click handler, that will display a message below, type: {{ TabsType.UNIFORM_FULL }}
      <div class="container-with-border">
        <nck-tabs :type="TabsType.UNIFORM_FULL">
          <nck-tab heading="hola">
            Tab content 1
          </nck-tab>
          <nck-tab heading="click!" @click="makeMessageAppear">
            Tab content 2
          </nck-tab>
          <nck-tab heading="tabs with some HTML in the content, not in the title">
            <p class="test-app-style">
              Tab content 3 is in a paragraph
            </p>
            <p class="test-app-style">
              and this <strong>bold</strong> is put with HTML
            </p>
          </nck-tab>
        </nck-tabs>
      </div>
      <div class="click-message" v-if="messageShouldAppear">
        I appear because the second tab has a click handler that makes me appear!
      </div>
    </div>
    <div data-test-case="7">
      <b>Test case 7</b>
      2 tabs with option scrollableContent that are too long to fit and their content (so we should see a scrollbar),
      type: {{ TabsType.UNIFORM_FULL }}
      <div class="restricted-area">
        <nck-tabs :type="TabsType.UNIFORM_FULL" scrollableContent>
          <nck-tab heading="tabitab">
            Hello reader. Prepare yourself for a very long text because this needs to wrap. We
            want to test that the tab content is overflowing when it is too big and we set the appropriate options.
            This is not the default behavior, but there are some cases where we want the tabs to be on top and
            the content to scroll. So I have to write some text so that it scroll also. So I am not done yet
            because it still doesn't scroll. But now should be fine, as the width is very restricted. Otherwise
            I would have to write a novel.
          </nck-tab>
          <nck-tab heading="test with long tab content">
            Tab content
          </nck-tab>
        </nck-tabs>
      </div>
    </div>
    <div data-test-case="8">
      <b>Test case 8</b>
      4 tabs with icons at various positions and with one very very long tab that has a counter and an icon, type:
      {{ TabsType.UNIFORM_FULL }}
      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="I am not that long!" leadingIcon="edit-pencil">
          Tab content 1
        </nck-tab>
        <nck-tab heading="me neither!" trailingIcon="close-dark">
          Tab content 2
        </nck-tab>
        <nck-tab heading="but i am very very very very very
          very very very very very very very very very very
          very very very very very very very very very very
          very very very very very very very long!" leadingIcon="train-outbound" trailingCounterValue=12>
          Tab content 3
        </nck-tab>
        <nck-tab heading="not me!" leadingIcon="cheapest" trailingIcon="earliest">
          Tab content 4
        </nck-tab>
      </nck-tabs>
    </div>

    <div data-test-case="9">
      <b>Test case 9</b>
      5 tabs, with compact display and icons at various position and one with an icon + counter
      Last tab has an action when you click on it.
      <nck-tabs :type="TabsType.COMPACT">
        <nck-tab heading="for now I'm ok" leadingIcon="train-outbound" trailingCounterValue=25>
          Tab content 1
        </nck-tab>
        <nck-tab heading="mee too" leadingIcon="cheapest">
          Tab content 2
        </nck-tab>
        <nck-tab heading="bilabalou" leadingIcon="plane-outbound" trailingIcon="plane-return">
          Tab content 3
        </nck-tab>
        <nck-tab heading="yes yes the yellow taxi" trailingIcon="earliest">
          Tab content 4
        </nck-tab>
        <nck-tab heading="abcde" @click="executeActionForTestCase9">
          Tab content 5
        </nck-tab>
      </nck-tabs>
      <div class="click-message" v-if="messageShouldAppearInTc9">
        I appear because the fifth tab has a click handler that makes me appear!
      </div>
    </div>

    <div data-test-case="10">
      <b>Test case 10</b>
      5 tabs, with compact side display and icons at various position and one with an icon + counter
      <nck-tabs :type="TabsType.COMPACT_SIDE">
        <nck-tab heading="for now I'm ok" leadingIcon="train-outbound-no-circle" trailingCounterValue=12>
          Tab content 1
        </nck-tab>
        <nck-tab heading="mee too" leadingIcon="cheapest">
          Tab content 2
        </nck-tab>
        <nck-tab heading="bilabalou">
          Tab content 3
        </nck-tab>
        <nck-tab heading="yes yes the yellow taxi" trailingIcon="earliest">
          Tab content 4
        </nck-tab>
        <nck-tab heading="Antidisestablishmentarianism" leadingIcon="plane-outbound-no-circle"
          trailingIcon="plane-return-no-circle">
          Tab content 5
        </nck-tab>
      </nck-tabs>
    </div>

    <div data-test-case="11">
      <b>Test case 11</b>
      3 tabs with counter badge on second tab, type: {{ TabsType.UNIFORM_FULL }} and no divider
      <nck-tabs :type="TabsType.UNIFORM_FULL" hideDivider>
        <nck-tab heading="test">
          Tab content
        </nck-tab>
        <nck-tab heading="some other tab" trailingCounterValue=42>
          Some Tab content also
        </nck-tab>
        <nck-tab :heading="dynamicHeading">
          {{ dynamicContent }}
        </nck-tab>
      </nck-tabs>
    </div>

    <div data-test-case="12">
      <b>Test case 12</b>
      5 tabs, with compact display with no divider
      <nck-tabs :type="TabsType.COMPACT" hideDivider>
        <nck-tab heading="for now I'm ok">
          Tab content 1
        </nck-tab>
        <nck-tab heading="mee too" leadingIcon="cheapest">
          Tab content 2
        </nck-tab>
        <nck-tab heading="bilabalou">
          Tab content 3
        </nck-tab>
        <nck-tab heading="yes yes the yellow taxi" trailingIcon="earliest">
          Tab content 4
        </nck-tab>
        <nck-tab heading="abcde">
          Tab content 5
        </nck-tab>
      </nck-tabs>
    </div>

    <div data-test-case="13">
      <b>Test case 13</b>
      3 tabs with counter badge on second tab, type: {{ TabsType.UNIFORM_FULL }}
      <p class="test-app-style">
        We can change couter value by clicking here.
        <button class="test-app-style" data-test-modifier="counter" @click="dynamicCounter++">Increment counter
          value</button>
      </p>
      <p class="test-app-style">
        Counter value should be: {{ dynamicCounter }}
      </p>
      <p class="test-app-style">
        We can change the third tab heading by click here.
        <button class="test-app-style" data-test-modifier="heading"
          @click="dynamicHeading2 = 'Yes I\'ve been modified'">Change third tab heading to "Yes I've been
          modified"</button>
      </p>
      <p class="test-app-style">
        Title should be: {{ dynamicHeading2 }}
      </p>
      <p class="test-app-style">
        We can change the content of the third tab heading by click here.
        <button class="test-app-style" data-test-modifier="content" @click="dynamicContent2 = 'Content modified'">Change
          third tab content to "Content modified"</button>
      </p>
      <p class="test-app-style">
        Content should be: {{ dynamicContent2 }}
      </p>
      <p class="test-app-style">
        We can change leading icon of first tab to a "plus" by clicking here.
        <button class="test-app-style" data-test-modifier="leadingIcon" @click="dynamicLeadingIcon = 'add-plus'">Change
          leading icon</button>
      </p>

      <p class="test-app-style">
        We can change trailing icon of the first tab to a "airport/rail" icon by clicking here.
        <button class="test-app-style" data-test-modifier="trailingIcon"
          @click="dynamicTrailingIcon = 'airport-rail'">change trailing icon</button>
      </p>

      <nck-tabs :type="TabsType.UNIFORM_FULL">
        <nck-tab heading="test" :leadingIcon="dynamicLeadingIcon" :trailingIcon="dynamicTrailingIcon">
          Tab content
        </nck-tab>
        <nck-tab heading="some other tab" :trailingCounterValue="dynamicCounter">
          Some Tab content also
        </nck-tab>
        <nck-tab :heading="dynamicHeading2">
          {{ dynamicContent2 }}
        </nck-tab>
      </nck-tabs>
    </div>

    <div data-test-case="14">
      <b>Test case 14</b>
      5 tabs, the second tab is selected by default.
      <p class="test-app-style">
        You can click on this <button class="test-app-style select-third-tab" @click="preselectedTabIndex = 2">button to
          change the default to the third tab</button>
      </p>
      <nck-tabs :type="TabsType.COMPACT" :preselectedTabIndex="preselectedTabIndex">
        <nck-tab heading="for now I'm ok">
          Tab content 1
        </nck-tab>
        <nck-tab heading="mee too" leadingIcon="cheapest">
          Tab content 2
        </nck-tab>
        <nck-tab heading="bilabalou">
          Tab content 3
        </nck-tab>
        <nck-tab heading="yes yes the yellow taxi" trailingIcon="earliest">
          Tab content 4
        </nck-tab>
        <nck-tab heading="abcde">
          Tab content 5
        </nck-tab>
      </nck-tabs>
    </div>

    <div data-test-case="15">
      <b>Test case 15</b>
      5 tabs, tdisplayed in a modal.
      <p class="test-app-style">
        You can click on this <button data-test-tabs-modal-trigger ref="modalButton" class="test-app-style" @click="openTabsModal">button to open the modal</button>
      </p>

    </div>
  </div>
</template>

<style scoped>
[data-test-case] {
  margin-bottom: 55px;
}

[data-test-case]:last-child {
  margin-bottom: 250px;
}

.container-with-border {
  border: 0.0625rem solid rgba(0, 0, 0, 0.33);
}

.click-message {
  margin-top: 1rem;
  border: 0.0625rem solid rgba(0, 0, 255, 0.14);
}

.restricted-area {
  height: 10rem;
  max-width: 40rem;
  margin: auto;
}
</style>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { ModalService, NckTabs, TabsType } from "@neotechnologygroup/neo-component-kit";
import PreloadIconComponent from "@/components/PreloadIconComponent.vue";
import TabsInModalComponent from "@/components/tabs/TabsInModalComponent.vue";
import { getCurrentInstance } from "vue";
import { ComponentPublicInstance } from "vue";

const currentInstance = getCurrentInstance()?.proxy;

const dynamicHeading = ref<string>("Hello dynamic!");
const dynamicContent = ref<string>("this content comes from a variable");
const messageShouldAppear = ref<boolean>(false);
const messageShouldAppearInTc9 = ref<boolean>(false);
const dynamicCounter = ref<number>(10);
const dynamicHeading2 = ref<string>("Can I be modified?");
const dynamicContent2 = ref<string>("I will be changed if you click the button");
const dynamicLeadingIcon = ref<string>("cheapest");
const dynamicTrailingIcon = ref<string>("earliest");
const preselectedTabIndex = ref<number>(1);

const modalButton = useTemplateRef("modalButton");

function makeMessageAppear() {
  messageShouldAppear.value = true;
}

function executeActionForTestCase9() {
  messageShouldAppearInTc9.value = true;
}

function openTabsModal() {
  ModalService.showModal(TabsInModalComponent, currentInstance as ComponentPublicInstance, modalButton.value ?? undefined)
    .catch((err) => {
      // Modal was closed by the user
    });
}
</script>
