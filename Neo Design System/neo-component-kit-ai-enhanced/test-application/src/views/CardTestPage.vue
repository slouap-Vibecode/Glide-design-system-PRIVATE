<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>

    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/card-errors">another page right here</router-link>
    </div>

    <div data-test-case="0">
      <div class="test-case-description">
        <b>Test case 0</b>
        <div>
          isHoverable: <b>false</b>, isSelected: <b>false</b>, ariaRole:
          <b>undefined</b>, click event: <b>no</b>, long content
        </div>
      </div>
      <NckCard>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="1">
      <div class="test-case-description">
        <b>Test case 1</b>
        <div>
          isHoverable: <b>true</b>, isSelected: <b>true</b>, ariaRole:
          <b>undefined</b>, click event: <b>no</b>, card styled from outside
        </div>
      </div>
      <NckCard class="card-style" :isHoverable="true" :isSelected="true">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="2">
      <div class="test-case-description">
        <b>Test case 2</b>
        <div>
          isHoverable: <b>false</b>, isSelected: <b>false</b>, ariaRole:
          <b>undefined</b>, click event: <b>no</b>, card styled from outside
          containing an image
        </div>
      </div>
      <NckCard class="card-with-image-style">
        <img src="../assets/HotelRoom.jpg" alt="Hotel room" />
      </NckCard>
    </div>

    <strong>Here starts the pairwise matrix</strong>
    <div data-test-case="3">
      <div class="test-case-description">
        <b>Test case 3</b>
        <div>
          isHoverable: <b>true</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>button</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard
        isHoverable
        isActive
        ariaRole="button"
        isSelected
        @click="toggleTestValue(3)"
      >
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[3]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="4">
      <div class="test-case-description">
        <b>Test case 4</b>
        <div>
          isHoverable: <b>false</b>, isActive: <b>false</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>false</b>
          , bareOnSmallResolution: <b>true</b>
        </div>
      </div>
      <NckCard bareOnSmallResolution>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="5">
      <div class="test-case-description">
        <b>Test case 5</b>
        <div>
          isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>button</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard isActive ariaRole="button" @click="toggleTestValue(5)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[5]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="6">
      <div class="test-case-description">
        <b>Test case 6</b>
        <div>
          isHoverable: <b>true</b>, isActive: <b>true</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard isHoverable isActive isSelected>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="7">
      <div class="test-case-description">
        <b>Test case 7</b>
        <div>
          isHoverable: <b>true</b>, isActive: <b>false</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard isHoverable ariaRole="link" @click="toggleTestValue(7)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[7]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="8">
      <div class="test-case-description">
        <b>Test case 8</b>
        <div>
          isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard isActive isSelected ariaRole="link" @click="toggleTestValue(8)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[8]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="9">
      <div class="test-case-description">
        <b>Test case 9</b>
        <div>
          isHoverable: <b>false</b>, isActive: <b>false</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard isSelected ariaRole="link" @click="toggleTestValue(9)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[9]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="10">
      <div class="test-case-description">
        <b>Test case 10</b>
        <div>
          isHoverable: <b>true</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard
        isHoverable
        isActive
        ariaRole="link"
        @click="toggleTestValue(10)"
      >
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[10]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="11">
      <div class="test-case-description">
        <b>Test case 11</b>
        <div>
          isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>button</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard isActive ariaRole="button" @click="toggleTestValue(11)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[11]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="12">
      <div class="test-case-description">
        <b>Test case 12</b>
        <div>
          backgroundColor: <b>White</b>, type: <b>Outlined</b>
          , isHoverable: <b>true</b>, isActive: <b>false</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.OUTLINED" isHoverable isSelected>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="13">
      <div class="test-case-description">
        <b>Test case 13</b>
        <div>
          backgroundColor: <b>White</b>, type: <b>Flat</b>
          , isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>button</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.FLAT" isActive ariaRole="button" @click="toggleTestValue(13)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[13]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="14">
      <div class="test-case-description">
        <b>Test case 14</b>
        <div>
          backgroundColor: <b>Orange</b>, type: <b>Elevated</b>
          , isHoverable: <b>true</b>, isActive: <b>false</b>, click event:
          <b>yes</b>, ariaRole: <b>button</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.ORANGE" :type="CardType.ELEVATED" isHoverable isSelected ariaRole="button" @click="toggleTestValue(14)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[14]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="15">
      <div class="test-case-description">
        <b>Test case 15</b>
        <div>
          backgroundColor: <b>Red</b>, type: <b>Flat</b>
          , isHoverable: <b>false</b>, isActive: <b>false</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>false</b>
          , bareOnSmallResolution: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.RED" :type="CardType.FLAT" bareOnSmallResolution>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="16">
      <div class="test-case-description">
        <b>Test case 16</b>
        <div>
          backgroundColor: <b>White</b>, type: <b>Outlined</b>
          , isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.OUTLINED" isActive isSelected ariaRole="link" @click="toggleTestValue(16)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[16]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="17">
      <div class="test-case-description">
        <b>Test case 17</b>
        <div>
          backgroundColor: <b>Green</b>, type: <b>Elevated</b>
          , isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.GREEN" :type="CardType.ELEVATED" isActive>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="18">
      <div class="test-case-description">
        <b>Test case 18</b>
        <div>
          backgroundColor: <b>White</b>, type: <b>OUTLINED</b>
          , isHoverable: <b>true</b>, isActive: <b>true</b>, click event:
          <b>yes</b>, ariaRole: <b>button</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.OUTLINED" isHoverable isActive ariaRole="button" @click="toggleTestValue(18)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[18]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="19">
      <div class="test-case-description">
        <b>Test case 19</b>
        <div>
          backgroundColor: <b>Bright blue</b>, type: <b>Flat</b>
          , isHoverable: <b>true</b>, isActive: <b>false</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.BRIGHT_BLUE" :type="CardType.FLAT" isHoverable isSelected ariaRole="link" @click="toggleTestValue(19)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[19]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="20">
      <div class="test-case-description">
        <b>Test case 20</b>
        <div>
          backgroundColor: <b>Blue grey</b>, type: <b>Elevated</b>
          , isHoverable: <b>false</b>, isActive: <b>false</b>, click event:
          <b>yes</b>, ariaRole: <b>link</b>, isSelected: <b>false</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.BLUE_GREY" :type="CardType.ELEVATED" ariaRole="link" @click="toggleTestValue(20)">
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
      <div v-if="testValueDisplayed[20]">Hello test! Card has been clicked.</div>
    </div>

    <div data-test-case="21">
      <div class="test-case-description">
        <b>Test case 21</b>
        <div>
          backgroundColor: <b>White</b>, type: <b>Outlined</b>
          , isHoverable: <b>false</b>, isActive: <b>false</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>false</b>
          , bareOnSmallResolution: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.OUTLINED" bareOnSmallResolution>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="22">
      <div class="test-case-description">
        <b>Test case 22</b>
        <div>
          backgroundColor: <b>White</b>, type: <b>Flat</b>
          , isHoverable: <b>true</b>, isActive: <b>true</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.WHITE" :type="CardType.FLAT" isHoverable isActive isSelected>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>

    <div data-test-case="23">
      <div class="test-case-description">
        <b>Test case 23</b>
        <div>
          backgroundColor: <b>Red</b>, type: <b>Elevated</b>
          , isHoverable: <b>false</b>, isActive: <b>true</b>, click event:
          <b>no</b>, ariaRole: <b>undefined</b>, isSelected: <b>true</b>
        </div>
      </div>
      <NckCard :backgroundColor="CardBackgroundColor.RED" :type="CardType.ELEVATED" isActive isSelected>
        <h3 class="test-app-style">Card title</h3>
        <p class="test-app-style">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </NckCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NckCard, CardBackgroundColor, CardType } from "@neotechnologygroup/neo-component-kit";

const testValueDisplayed = ref<boolean[]>([]);

function toggleTestValue(index: number) {
  testValueDisplayed.value[index] = !testValueDisplayed.value[index];
}
</script>

<style lang="less" scoped>
[data-test-case] {
  padding: 20px 15px 30px;

  .test-case-description {
    margin-bottom: 10px;
  }
}

.card-style {
  width: 30%;
  padding: 1.5rem;
  margin: 2rem auto;
}

.card-with-image-style {
  max-width: 45rem;
  overflow: hidden;
  margin: auto;
}
</style>
