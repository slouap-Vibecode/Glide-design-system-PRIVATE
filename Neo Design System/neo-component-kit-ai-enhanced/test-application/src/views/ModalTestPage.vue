<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <PreloadFontComponent />
    <PreloadIconComponent :iconsToPreload="[
      'close-dark',
      'hotel',
      'trash'
    ]" />
    <div>
      Error test cases have been put on
      <router-link class="test-app-style" to="/modal-errors">another page right here</router-link>
    </div>
    <div class="zindex">
      I have a z-index (of 1)
    </div>
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        <i>A medium size modal with a confirmation on dismissal.</i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger1" @click="launchModal1">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[0] }}</p>
    </div>

    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        <i>
          A more advanced full size modal with two buttons, additional content in footer and
          it should scroll. The content of this modal allows to open a modal on modal.
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger2" @click="launchModal2">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[1] }}</p>
    </div>

    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        <i>
          A small size modal without any footer and no padding for body. The trigger is in ShadowDOM.
        </i>
      </p>
      <p class="test-app-style" data-shadow-dom-anchor>

      </p>
      <p class="test-app-style">{{ messages[2] }}</p>
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        <i>
          A large size modal that takes props. You can customize the props here.
          The modal will tell you you can ride the rollercoaster only if you are more than 12 years old.
        </i>
      </p>
      <p class="test-app-style">
        <label class="test-app-style" for="name">Name</label>
        <input id="name" name="name" type="text" v-model="name" class="test-app-style" />
      </p>
      <p class="test-app-style">
        <label class="test-app-style" for="age">Age</label>
        <input id="age" name="age" type="number" v-model="age" class="test-app-style" />
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger4" @click="launchModal4">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[3] }}</p>
    </div>
    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        <i>
          An extra small size modal with two buttons and a role alertdialog.
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger5" @click="launchModal5">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[4] }}</p>
    </div>
    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        <i>
          A medium size modal with just a tiny bit of content.
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger6" @click="launchModal6">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[5] }}</p>
    </div>
    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        <i>
          A modal integrating some other components
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger7" @click="launchModal7">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[6] }}</p>
    </div>
    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        <i>
          A small size modal with a clickable action icon in mobile & tablet resolutions.
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger8" @click="launchModal8">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[7] }}</p>
    </div>
    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        <i>
          A modal with no footer that is not closable manually.
          It will close after 3 seconds for testing purposes.
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger9" @click="launchModal9">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[8] }}</p>
    </div>
    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        <i>
          A modal with a long list of checkboxes
        </i>
      </p>
      <p class="test-app-style">
        <button class="test-app-style nck-style outside-focus" ref="trigger10" @click="launchModal10">
          Launch modal
        </button>
      </p>
      <p class="test-app-style">{{ messages[9] }}</p>
    </div>

    <div data-test-case>
      <b>Testing the programmatic focus</b>
      <p class="test-app-style">
        <i>In this test page, programmatic focus of an opened modal is associated to the key 'f'.</i><br>
        <i>Open a modal, move the focus, then hit 'f' to forcefully refocus the beginning of the modal.</i><br>
        <i>Hit 'f' while no modal is opened : you should see a console error.</i>
      </p>
    </div>

    <p v-for="i in 25" :key="i" class="test-app-style hide-on-mobile">
      Making sure the page is scrollable, so we can see that when modal is opened and
      you scroll inside it, then background is not scrolling
    </p>
  </div>
</template>

<style lang="less" scoped>
[data-test-case] {
  margin-bottom: 56px;
}

[data-shadow-dom-anchor] {
  display: inline-block;
}

.zindex {
  z-index: 1;
  background: brown;
  position: fixed;
  top: 0;
}

@media screen and (max-width: 45rem) {
  .hide-on-mobile {
    display: none;
  }
}
</style>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, ComponentPublicInstance } from "vue";
import { ModalService } from "@neotechnologygroup/neo-component-kit";
import SimpleModal from "../components/modals/SimpleModal.vue";
import BiggerModal from "../components/modals/BiggerModal.vue";
import NoFooterModal from "../components/modals/NoFooterModal.vue";
import ExtraSmallModal from "../components/modals/ExtraSmallModal.vue";
import PropsModal from "../components/modals/PropsModal.vue";
import NotDismissableModal from "../components/modals/NotDismissableModal.vue";
import MediumModal from "../components/modals/MediumModal.vue";
import IntegrationModal from "../components/modals/IntegrationModal.vue";
import ModalWithAction from "../components/modals/ModalWithAction.vue";
import LongListModal from "../components/modals/LongListModal.vue";
import PreloadFontComponent from "../components/PreloadFontComponent.vue";
import PreloadIconComponent from "../components/PreloadIconComponent.vue";

const messages = ref<string[]>([]);
const name = ref<string>("Joe");
const age = ref<number>(42);
const shadowDomButton = ref<HTMLButtonElement | null>(null);
const trigger1 = ref<HTMLButtonElement | null>(null);
const trigger2 = ref<HTMLButtonElement | null>(null);
const trigger4 = ref<HTMLButtonElement | null>(null);
const trigger5 = ref<HTMLButtonElement | null>(null);
const trigger6 = ref<HTMLButtonElement | null>(null);
const trigger7 = ref<HTMLButtonElement | null>(null);
const trigger8 = ref<HTMLButtonElement | null>(null);
const trigger9 = ref<HTMLButtonElement | null>(null);
const trigger10 = ref<HTMLButtonElement | null>(null);

const currentInstance = getCurrentInstance()?.proxy;

onMounted(() => {
  const shadowDomContent = document.createElement("button");
  shadowDomContent.id = "trigger3";
  shadowDomContent.style.color = "inherit";
  shadowDomContent.style.font = "inherit";
  shadowDomContent.style.margin = "0rem";
  shadowDomContent.textContent = "Launch modal";
  shadowDomContent.onclick = () => {
    launchModal3();
  };
  shadowDomButton.value = shadowDomContent;

  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
      button:focus {
        outline: none;
        box-shadow: 0 0 0 0.1875rem rgba(0, 111, 207, .4);
      }`;

  const shadowDomContainer = document.querySelector("[data-shadow-dom-anchor]");
  const shadowDomRoot = shadowDomContainer?.attachShadow({ mode: "open" });
  if (shadowDomRoot) {
    shadowDomRoot.appendChild(styleElement);
    shadowDomRoot.appendChild(shadowDomContent);
  }
  document.addEventListener("keydown", ($event: KeyboardEvent) => {
    if ($event.key === "f") {
      $event.stopPropagation();
      ModalService.focusLastOpenedModal();
    }
  });
});

function launchModal1() {
  ModalService.showModal(SimpleModal, currentInstance as ComponentPublicInstance, trigger1.value as HTMLElement, { confirmDismissal: true })
    .then(() => {
      messages.value[0] = "Modal has been closed";
    }).catch(() => {
      messages.value[0] = "Modal has been dismissed";
    });
}

function launchModal2() {
  ModalService.showModal(BiggerModal, currentInstance as ComponentPublicInstance, trigger2.value as HTMLElement, undefined, {
    "event-inside": () => {
      ModalService.closeModal();
      if (currentInstance?.$el instanceof HTMLElement) {
        currentInstance.$el.style.background = " rgb(128, 0, 128, 0.4)";
      }
    }
  })
    .then(() => {
      messages.value[1] = "Modal has been closed";
    }).catch(() => {
      messages.value[1] = "Modal has been dismissed";
    });
}

function launchModal3() {
  ModalService.showModal(NoFooterModal, currentInstance as ComponentPublicInstance, shadowDomButton.value ?? undefined)
    .then(() => {
      messages.value[2] = "Modal has been closed";
    }).catch(() => {
      messages.value[2] = "Modal has been dismissed";
    });
}

function launchModal4() {
  ModalService.showModal(PropsModal, currentInstance as ComponentPublicInstance, trigger4.value as HTMLElement, { name: name.value, age: age.value })
    .then(() => {
      messages.value[3] = "Modal has been closed";
    }).catch(() => {
      messages.value[3] = "Modal has been dismissed";
    });
}

function launchModal5() {
  ModalService.showModal(ExtraSmallModal, currentInstance as ComponentPublicInstance, trigger5.value as HTMLElement)
    .then(() => {
      messages.value[4] = "Modal has been closed";
    }).catch(() => {
      messages.value[4] = "Modal has been dismissed";
    });
}

function launchModal6() {
  ModalService.showModal(MediumModal, currentInstance as ComponentPublicInstance, trigger6.value as HTMLElement)
    .then(() => {
      messages.value[5] = "Modal has been closed";
    }).catch(() => {
      messages.value[5] = "Modal has been dismissed";
    });
}

function launchModal7() {
  ModalService.showModal(IntegrationModal, currentInstance as ComponentPublicInstance, trigger7.value as HTMLElement)
    .then(() => {
      messages.value[6] = "Modal has been closed";
    }).catch(() => {
      messages.value[6] = "Modal has been dismissed";
    });
}

function launchModal8() {
  ModalService.showModal(ModalWithAction, currentInstance as ComponentPublicInstance, trigger8.value as HTMLElement, undefined, {
    "event-inside": () => {
      messages.value[7] = "Header action icon has been clicked";
    }
  })
    .then(() => {
      messages.value[7] = "Modal has been closed";
    }).catch(() => {
      messages.value[7] = "Modal has been dismissed";
    });
}

function launchModal9() {
  ModalService.showModal(NotDismissableModal, currentInstance as ComponentPublicInstance, trigger9.value as HTMLElement, { notDismissable: true })
    .then(() => {
      messages.value[8] = "Modal has been closed";
    }).catch(() => {
      messages.value[8] = "Modal has been dismissed";
    });
}
function launchModal10() {
  ModalService.showModal(LongListModal, currentInstance as ComponentPublicInstance, trigger10.value as HTMLElement)
    .then(() => {
      messages.value[9] = "Modal has been closed";
    }).catch(() => {
      messages.value[9] = "Modal has been dismissed";
    });
}
</script>
