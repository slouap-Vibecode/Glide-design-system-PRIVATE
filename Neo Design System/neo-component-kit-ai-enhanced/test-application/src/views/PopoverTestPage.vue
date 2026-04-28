<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        no header, no footer, a body, no title, width: medium (20rem), max height: 10rem, no handler on hide-popover event
      </p>
      <button
        class="outside-focus"
        @click="showPopover(0)"
        :aria-expanded="popoverVisibleStatuses[0]"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(0)">Hide popover</button>
      <p class="test-app-style">{{messages[0]}}</p>
      <div>
        <NckPopover
          title="popover"
          :size="PopoverSize.M"
          :displayed="popoverVisibleStatuses[0]"
          :maxHeight="10"
        >
          <template v-slot:popover-body>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum inventore architecto quisquam aspernatur a iusto distinctio blanditiis quia? Alias quibusdam doloremque vel id necessitatibus dolore pariatur, nam veniam in. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum inventore architecto quisquam aspernatur a iusto distinctio blanditiis quia? Alias quibusdam doloremque vel id necessitatibus dolore pariatur, nam veniam in.</div>
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        no header, a footer, no body, no title, width: default (full-width), max height: default (20.75rem), no handler on hide-popover event
      </p>
      <button
        class="outside-focus"
        @click="showPopover(1)"
        :aria-expanded="popoverVisibleStatuses[1]"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(1)">Hide popover</button>
      <p class="test-app-style">{{messages[1]}}</p>
      <div>
        <NckPopover
          :displayed="popoverVisibleStatuses[1]"
        >
          <template v-slot:popover-footer>
            this is the footer
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        a header, a footer, a body, no title, width: x-large (32rem), max height: 10rem
      </p>
      <button
        class="outside-focus"
        @click="showPopover(2)"
        :aria-expanded="popoverVisibleStatuses[2]"
        ref="triggerButton2"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(2)">Hide popover</button>
      <p class="test-app-style">{{messages[2]}}</p>
      <div>
        <NckPopover
          headerVisible
          :displayed="popoverVisibleStatuses[2]"
          :maxHeight="10"
          @hide-popover="hidePopover(2)"
          :triggerElement="$refs.triggerButton2"
          :size="PopoverSize.XL"
        >
          <template v-slot:popover-body>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatem excepturi magnam iure omnis eos, saepe aliquid assumenda voluptas non, magni quae, delectus aliquam expedita ad hic provident. Quia, assumenda.</p>
          </template>
          <template v-slot:popover-footer>
            footer slot
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        a header, a footer, no body, a long title, width: medium (20rem), max height: default (20.75rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(3)"
        :aria-expanded="popoverVisibleStatuses[3]"
        ref="triggerButton3"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(3)">Hide popover</button>
      <p class="test-app-style">{{messages[3]}}</p>
      <div>
        <NckPopover
          headerVisible
          title="As you can see this is a really really reeeeaaaaaaalllllyyyy really really reeeeaaaaaaalllllyyyy really really reeeeaaaaaaalllllyyyy really really reeeeaaaaaaalllllyyyy really really reeeeaaaaaaalllllyyyy long title"
          :displayed="popoverVisibleStatuses[3]"
          @hide-popover="hidePopover(3)"
          :triggerElement="$refs.triggerButton3"
          :size="PopoverSize.M"
        >
          <template v-slot:popover-footer>
            The footer
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        a header, no footer, a body, a short title, width: large (25rem), max height: default (20.75rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(4)"
        :aria-expanded="popoverVisibleStatuses[4]"
        ref="triggerButton4"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(4)">Hide popover</button>
      <p class="test-app-style">{{messages[4]}}</p>
      <div>
        <NckPopover
          headerVisible
          title="Short title"
          :displayed="popoverVisibleStatuses[4]"
          @hide-popover="hidePopover(4)"
          :triggerElement="$refs.triggerButton4"
          :size="PopoverSize.L"
        >
        <template v-slot:popover-body>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatem excepturi magnam iure omnis eos.</p>
        </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        no header, a footer, a body, no title, width: default (full width), max height: custom (7rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(5)"
        :aria-expanded="popoverVisibleStatuses[5]"
        ref="triggerButton5"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(5)">Hide popover</button>
      <p class="test-app-style">{{messages[5]}}</p>
      <div>
        <NckPopover
          :displayed="popoverVisibleStatuses[5]"
          @hide-popover="hidePopover(5)"
          :triggerElement="$refs.triggerButton5"
          :maxHeight="7"
        >
        <template v-slot:popover-body>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<a href="#">link</a></p>
        </template>
        <template v-slot:popover-footer>
            The footer
        </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        a header, no footer, no body, a long title, width: medium (20rem), max height: default (20.75rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(6)"
        :aria-expanded="popoverVisibleStatuses[6]"
        ref="triggerButton6"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(6)">Hide popover</button>
      <p class="test-app-style">{{messages[6]}}</p>
      <div>
        <NckPopover
          headerVisible
          :displayed="popoverVisibleStatuses[6]"
          @hide-popover="hidePopover(6)"
          :size="PopoverSize.M"
          title="This is a long title, because I like long titles, you know, long titles are good, beautiful, and so on"
          :triggerElement="$refs.triggerButton6"
        >
        </NckPopover>
      </div>
    </div>
    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        Focus popover at opening
      </p>
      <button
        class="outside-focus"
        @click="showFocusablePopover()"
        :aria-expanded="focusablePopoverDisplayed"
        ref="triggerButtonForFocusablePopover">
        Show and focus popover
      </button>
      <div v-if="focusablePopoverDisplayed">
        Active (focused) element classes are: {{activeElement}}
      </div>
      <p class="test-app-style">{{messages[7]}}</p>
      <div>
        <NckPopover
          title="Select entities"
          :displayed="focusablePopoverDisplayed"
          @hide-popover="hideFocusablePopover()"
          :triggerElement="$refs.triggerButtonForFocusablePopover"
          ref="focusablePopover">
          <template v-slot:popover-body>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptatem excepturi magnam iure omnis eos, saepe aliquid assumenda voluptas non, magni quae, delectus aliquam expedita ad hic provident. Quia, assumenda.</p>
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        a header, no footer, no body, a short title, width: fluid, max height: default (20.75rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(8)"
        :aria-expanded="popoverVisibleStatuses[8]"
        ref="triggerButton8"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(8)">Hide popover</button>
      <p class="test-app-style">{{messages[8]}}</p>
      <div>
        <NckPopover
          headerVisible
          :displayed="popoverVisibleStatuses[8]"
          @hide-popover="hidePopover(8)"
          :size="PopoverSize.FLUID_WIDTH"
          title="Short title"
          :triggerElement="$refs.triggerButton8"
        >
        </NckPopover>
      </div>
    </div>
    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        a header, a footer, a body, no title, width: fluid, max height: custom (10rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(9)"
        :aria-expanded="popoverVisibleStatuses[9]"
        ref="triggerButton9"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(9)">Hide popover</button>
      <p class="test-app-style">{{messages[9]}}</p>
      <div>
        <NckPopover
          headerVisible
          :displayed="popoverVisibleStatuses[9]"
          @hide-popover="hidePopover(9)"
          :size="PopoverSize.FLUID_WIDTH"
          :triggerElement="$refs.triggerButton9"
          :maxHeight="10"
        >
          <template v-slot:popover-body>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<a href="#">link</a></p>
          </template>
          <template v-slot:popover-footer>
            The footer
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="10">
      <b>Test case 10</b>
      <p class="test-app-style">
        a header, no footer, a body, a long title, width: fluid, max height: default (20.75rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(10)"
        :aria-expanded="popoverVisibleStatuses[10]"
        ref="triggerButton10"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(10)">Hide popover</button>
      <p class="test-app-style">{{messages[10]}}</p>
      <div>
        <NckPopover
          headerVisible
          :displayed="popoverVisibleStatuses[10]"
          @hide-popover="hidePopover(10)"
          :size="PopoverSize.FLUID_WIDTH"
          :triggerElement="$refs.triggerButton10"
          title="This is a long title, because I like long titles, you know, long titles are good, beautiful, and so on"
        >
          <template v-slot:popover-body>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<a href="#">link</a></p>
          </template>
        </NckPopover>
      </div>
    </div>
    <div data-test-case="11">
      <b>Test case 11</b>
      <p class="test-app-style">
        no header, a footer, a body, no title, width: fluid, max height: custom (7rem)
      </p>
      <button
        class="outside-focus"
        @click="showPopover(11)"
        :aria-expanded="popoverVisibleStatuses[11]"
        ref="triggerButton11"
      >
        Show popover
      </button>
      <button class="outside-focus" @click="hidePopover(11)">Hide popover</button>
      <p class="test-app-style">{{messages[11]}}</p>
      <div>
        <NckPopover
          :displayed="popoverVisibleStatuses[11]"
          @hide-popover="hidePopover(11)"
          :size="PopoverSize.FLUID_WIDTH"
          :triggerElement="$refs.triggerButton11"
          :maxHeight="7"
        >
          <template v-slot:popover-body>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.<a href="#">link</a></p>
          </template>
          <template v-slot:popover-footer>
            The footer
          </template>
        </NckPopover>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  // position relative needed for the popover wrapper wich is absolute
  // otherwise the full width popover go outside of the window/container
  position: relative;
  padding: .5rem 0 20rem;
}
</style>

<script setup lang="ts">
import { NckPopover, PopoverSize } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const activeElement = ref("");
const messages = ref<string[]>([]);
const focusablePopoverDisplayed = ref<boolean>(false);
const focusablePopover = ref<InstanceType<typeof NckPopover> | null>();
const popoverVisibleStatuses = ref<boolean[]>([ false, false, false, false, false, false, false ]);

// from https://stackoverflow.com/questions/57326066
document.addEventListener("focusin", focusChanged);

function focusChanged() {
  if (document.activeElement?.className) {
    activeElement.value = document.activeElement.className;
  }
}

function showPopover(popoverId: number) {
  const nextPopoverVisibleStatuses = [ ...popoverVisibleStatuses.value ];
  nextPopoverVisibleStatuses[popoverId] = true;
  popoverVisibleStatuses.value = nextPopoverVisibleStatuses;
}

function hidePopover(popoverId: number) {
  const nextPopoverVisibleStatuses = [ ...popoverVisibleStatuses.value ];
  nextPopoverVisibleStatuses[popoverId] = false;
  popoverVisibleStatuses.value = nextPopoverVisibleStatuses;
  messages.value[popoverId] = "Popover has been dismissed";
}

function showFocusablePopover() {
  focusablePopoverDisplayed.value = true;
  focusablePopover.value?.focus();
}

function hideFocusablePopover() {
  focusablePopoverDisplayed.value = false;
  messages.value[7] = "Popover has been dismissed";
}
</script>
