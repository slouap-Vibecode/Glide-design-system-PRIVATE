<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <p class="test-app-style">
      Note: there is a bug caused by how the Test Application import the Neo Component Kit library.
      It forces to click twice on clickable element, after the first time, in order for them to work.
      See <a href="https://kdsjira.atlassian.net/browse/TRV3-1048">TRV3-1048</a>
      For now no solution have been found, but the bug is not critical as it is only links to test application
      and works currently in a standard import context.
    </p>
    <div data-test-case="0">
      <b>Test case 0</b>
      Standard, 3 elements, warning on 3rd element
      <NckList :data="testData[0]" rowUniqueKey="name"
        :hasWarningSource="hasWarning" warningAlternative="Oh this is a warning!">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      Standard, 3 elements, warning on 3rd element, no left/right border
      <NckList :data="testData[1]" rowUniqueKey="name"
        :hasWarningSource="hasWarning" hideSideBorders warningAlternative="Oh this is a warning!">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="2">
      <b>Test case 2</b>
      Standard, 0 elements
      <NckList :data="emptyData" rowUniqueKey="name">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="3">
      <b>Test case 3</b>
      Standard, 3 elements, warning on 3rd element, with action when
      row clicked, role is "button" (pressing Enter AND Space should trigger it)
      <NckList :data="testData[3]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        rowAriaRole="button"
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="4">
      <b>Test case 4</b>
      Standard, 3 elements, warning on 3rd element, with action when
      row clicked, role is link (only pressing Enter should trigger it)
      <NckList :data="testData[4]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        rowAriaRole="link"
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="5">
      <b>Test case 5</b>
      Standard, 3 elements, no warning
      <NckList :data="testData[5]" rowUniqueKey="name">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="6">
      <b>Test case 6</b>
      Standard, 3 elements, no warning, no side border
      <NckList :data="testData[6]" rowUniqueKey="name" hideSideBorders>
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="7">
      <b>Test case 7</b>
      Standard, 3 elements, warning on 3rd element, with action when
      row clicked, role is "button" (pressing Enter AND Space should trigger it), no side border
      <NckList :data="testData[7]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        rowAriaRole="button" hideSideBorders
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="8">
      <b>Test case 8</b>
      Standard, 3 elements, warning on 3rd element, with action when
      row clicked, role is link (only pressing Enter should trigger it), no side border
      <NckList :data="testData[8]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        rowAriaRole="link" hideSideBorders
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="9">
      <b>Test case 9</b>
      Standard, 3 elements, warning on 3rd element, no top border on first element
      <NckList :data="testData[9]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideFirstTopBorder :hasWarningSource="hasWarning">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="10">
      <b>Test case 10</b>
      Standard, 3 elements, warning on 3rd element, no side border, no top border on first element
      <NckList :data="testData[10]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideSideBorders hideFirstTopBorder
        :hasWarningSource="hasWarning">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="11">
      <b>Test case 11</b>
      Standard, 3 elements, warning on 3rd element, no top border on first element,
      with action when row clicked, role is link (only pressing Enter should trigger it)
      <NckList :data="testData[11]" rowUniqueKey="name" warningAlternative="Oh this is a warning!" rowAriaRole="link"
        hideFirstTopBorder :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="12">
      <b>Test case 12</b>
      Standard, 3 elements, warning on 3rd element, no side border, no top border on first element,
      with action when row clicked, role is link (only pressing Enter should trigger it)
      <NckList :data="testData[12]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideSideBorders hideFirstTopBorder rowAriaRole="link"
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="13">
      <b>Test case 13</b>
      Standard, 3 elements, warning on 3rd element, no bottom border on last element
      <NckList :data="testData[13]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideLastBottomBorder :hasWarningSource="hasWarning">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="14">
      <b>Test case 14</b>
      Standard, 3 elements, warning on 3rd element, no side border, no bottom border on last element
      <NckList :data="testData[14]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideSideBorders hideLastBottomBorder
        :hasWarningSource="hasWarning">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="15">
      <b>Test case 15</b>
      Standard, 3 elements, warning on 3rd element, no bottom border on last element,
      with action when row clicked, role is link (only pressing Enter should trigger it)
      <NckList :data="testData[15]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideLastBottomBorder :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup" rowAriaRole="link">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="16">
      <b>Test case 16</b>
      Standard, 3 elements, warning on 3rd element, no side border, no bottom border on last element,
      with action when row clicked, role is link (only pressing Enter should trigger it)
      <NckList :data="testData[16]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideSideBorders hideLastBottomBorder
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup" rowAriaRole="link">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="17">
      <b>Test case 17</b>
      Standard, 3 elements, warning on 3rd element, no top border on first element,
      no bottom border on last element
      <NckList :data="testData[17]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideLastBottomBorder hideFirstTopBorder :hasWarningSource="hasWarning">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="18">
      <b>Test case 18</b>
      Standard, 3 elements, warning on 3rd element, no side border, no bottom border on last element,
      no top border on first element
      <NckList :data="testData[18]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideSideBorders hideLastBottomBorder hideFirstTopBorder
        :hasWarningSource="hasWarning">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="19">
      <b>Test case 19</b>
      Standard, 3 elements, warning on 3rd element, no bottom border on last element,
      with action when row clicked, role is link (only pressing Enter should trigger it),
      no top border on first element
      <NckList :data="testData[19]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideLastBottomBorder hideFirstTopBorder :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup" rowAriaRole="link">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="20">
      <b>Test case 20</b>
      Standard, 3 elements, warning on 3rd element, no side border, no bottom border on last element,
      no top border on first element,
      with action when row clicked, role is button (only pressing Enter and Space should trigger it)
      <NckList :data="testData[20]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hideSideBorders hideLastBottomBorder hideFirstTopBorder
        :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup" rowAriaRole="button">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>

    <div data-test-case="21">
      <b>Test case 21</b>
      Standard, 3 elements, warning on 3rd element, rounded corners
      <NckList :data="testData[21]" rowUniqueKey="name" warningAlternative="Oh this is a warning!"
        hasRoundedCorners :hasWarningSource="hasWarning" @row-clicked="displayNameInPopup" rowAriaRole="button">
        <template v-slot="$row">
          <div class="test-row" >
            <h1 class="test-app-style">{{$row.name}}</h1>
            <h2 class="test-app-style">{{$row.value}}</h2>
            <p class="test-app-style" v-if="$row.clicked">I have been clicked</p>
          </div>
        </template>
      </NckList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckList } from "@neotechnologygroup/neo-component-kit";

interface TestData {
  name: string;
  value: number;
  isInDanger: boolean;
  clicked: boolean;
}

const numberOfTestCases = 22;
const emptyData = ref<TestData[]>([]);
const testData = ref<TestData[][]>([]);

for (let i = 0; i < numberOfTestCases; i++) {
  testData.value.push([
    { name: "test1", value: 42, isInDanger: true, clicked: false },
    { name: "someOtherTest", value: 123, isInDanger: false, clicked: false },
    { name: "aTestAgain", value: 666, isInDanger: true, clicked: false }
  ]);
}

function hasWarning(entry: TestData) {
  return entry && entry.isInDanger && entry.value !== 42;
}

function displayNameInPopup(entry: TestData) {
  entry.clicked = true;
}
</script>

<style scoped>
.test-row {
  background: purple;
  color: white;
}

[data-test-case] {
  margin-bottom: 55px;
}
</style>
