<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <PreloadIconComponent :iconsToPreload="[
      'info-support-filled',
      'success-filled',
      'warning-filled',
      'cancel-circle-filled',
      'flag-circle-filled',
      'clear'
    ]" />
    <div data-test-case="0">
      <b>Test case 0</b>
      <p class="test-app-style">
        A simple toast
      </p>
      <button @click="launchToast1()">Add toast</button>
      <p class="test-app-style">{{messages[0]}}</p>
    </div>
    <div data-test-case="1">
      <b>Test case 1</b>
      <p class="test-app-style">
        Another one
      </p>
      <button @click="launchToast2()">Add toast</button>
      <p class="test-app-style">{{messages[1]}}</p>
    </div>
    <div data-test-case="2">
      <b>Test case 2</b>
      <p class="test-app-style">
        A toast with more text
      </p>
      <button @click="launchToast3()">Add toast</button>
      <p class="test-app-style">{{messages[2]}}</p>
    </div>
    <div data-test-case="3">
      <b>Test case 3</b>
      <p class="test-app-style">
        A toast that shows after 5 seconds
      </p>
      <button @click="launchToast4()">Add toast</button>
      <p class="test-app-style">{{messages[3]}}</p>
    </div>
    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        A toast with type error
      </p>
      <button @click="launchToast5()">Add toast</button>
      <p class="test-app-style">{{messages[4]}}</p>
    </div>
    <div data-test-case="5">
      <b>Test case 5</b>
      <p class="test-app-style">
        A toast with type warning
      </p>
      <button @click="launchToast6()">Add toast</button>
      <p class="test-app-style">{{messages[5]}}</p>
    </div>
    <div data-test-case="6">
      <b>Test case 6</b>
      <p class="test-app-style">
        A toast with type success
      </p>
      <button @click="launchToast7()">Add toast</button>
      <p class="test-app-style">{{messages[6]}}</p>
    </div>
    <div data-test-case="7">
      <b>Test case 7</b>
      <p class="test-app-style">
        A toast with type info
      </p>
      <button @click="launchToast8()">Add toast</button>
      <p class="test-app-style">{{messages[7]}}</p>
    </div>
    <div data-test-case="8">
      <b>Test case 8</b>
      <p class="test-app-style">
        A toast with neutral type, with action button
      </p>
      <button @click="launchToast9()">Add toast</button>
      <p class="test-app-style">{{messages[8]}}</p>
      <p v-if="isActionClicked" class="test-app-style">The toast action button has been clicked</p>
    </div>
    <div data-test-case="9">
      <b>Test case 9</b>
      <p class="test-app-style">
        A toast with neutral type, with action link , which returns 404
      </p>
      <button @click="launchToast10()">Add toast</button>
      <p class="test-app-style">{{messages[9]}}</p>
    </div>
    <div data-test-case="10">
      <b>Test case 10</b>
      <p class="test-app-style">
        A toast with type info, with action button
      </p>
      <button @click="launchToast11()">Add toast</button>
      <p class="test-app-style">{{messages[10]}}</p>
      <p v-if="isFirstActionClicked" class="test-app-style">The toast action button has been clicked</p>
    </div>
    <div data-test-case="11">
      <b>Test case 11</b>
      <p class="test-app-style">
        A toast with type warning, with action button
      </p>
      <button @click="launchToast12()">Add toast</button>
      <p class="test-app-style">{{messages[11]}}</p>
      <p v-if="isSecondActionClicked" class="test-app-style">The toast action button has been clicked</p>
    </div>
    <div data-test-case="12">
      <b>Test case 12</b>
      <p class="test-app-style">
        A toast with type error, with action button
      </p>
      <button @click="launchToast13()">Add toast</button>
      <p class="test-app-style">{{messages[12]}}</p>
      <p v-if="isThirdActionClicked" class="test-app-style">The toast action button has been clicked</p>
    </div>
    <div data-test-case="13">
      <b>Test case 13</b>
      <p class="test-app-style">
        A toast with type success, with action button
      </p>
      <button @click="launchToast14()">Add toast</button>
      <p class="test-app-style">{{messages[13]}}</p>
      <p v-if="isFourthActionClicked" class="test-app-style">The toast action button has been clicked</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { ToastService } from "@neotechnologygroup/neo-component-kit";
import SimpleToast from "@/components/toasts/SimpleToast.vue";
import AnotherSimpleToast from "@/components/toasts/AnotherSimpleToast.vue";
import MoreTextToast from "@/components/toasts/MoreTextToast.vue";
import TimeoutToast from "@/components/toasts/TimeoutToast.vue";
import PreloadIconComponent from "@/components/PreloadIconComponent.vue";
import PropsToast from "@/components/toasts/PropsToast.vue";
import ActionButtonToast from "@/components/toasts/ActionButtonToast.vue";
import ActionLinkToast from "@/components/toasts/ActionLinkToast.vue";

const currentComponent = getCurrentInstance()?.proxy;
const messages = ref<string[]>([]);
const isActionClicked = ref<boolean>(false);
const isFirstActionClicked = ref<boolean>(false);
const isSecondActionClicked = ref<boolean>(false);
const isThirdActionClicked = ref<boolean>(false);
const isFourthActionClicked = ref<boolean>(false);

function launchToast1() {
  void ToastService.addToast(SimpleToast, currentComponent)
    .then(() => {
      messages.value[0] = "Toast has been dismissed";
    });
}
function launchToast2() {
  void ToastService.addToast(AnotherSimpleToast, currentComponent)
    .then(() => {
      messages.value[1] = "Toast has been dismissed";
    });
}
function launchToast3() {
  void ToastService.addToast(MoreTextToast, currentComponent)
    .then(() => {
      messages.value[2] = "Toast has been dismissed";
    });
}
function launchToast4() {
  setTimeout(() => {
    void ToastService.addToast(TimeoutToast, currentComponent)
      .then(() => {
        messages.value[3] = "Toast has been dismissed";
      });
  }, 5000);
}
function launchToast5() {
  void ToastService.addToast(PropsToast, currentComponent, { type: "error" })
    .then(() => {
      messages.value[4] = "Toast has been dismissed";
    });
}
function launchToast6() {
  void ToastService.addToast(PropsToast, currentComponent, { type: "warning" })
    .then(() => {
      messages.value[5] = "Toast has been dismissed";
    });
}
function launchToast7() {
  void ToastService.addToast(PropsToast, currentComponent, { type: "success" })
    .then(() => {
      messages.value[6] = "Toast has been dismissed";
    });
}
function launchToast8() {
  void ToastService.addToast(PropsToast, currentComponent, { type: "info" })
    .then(() => {
      messages.value[7] = "Toast has been dismissed";
    });
}

function launchToast9() {
  void ToastService.addToast(ActionButtonToast, currentComponent, { type: "default" }, {
    "bubble-toast-action-event": () => {
      isActionClicked.value = true;
    }
  })
    .then(() => {
      messages.value[8] = "Toast has been dismissed";
    });
}

function launchToast10() {
  void ToastService.addToast(ActionLinkToast, currentComponent)
    .then(() => {
      messages.value[9] = "Toast has been dismissed";
    });
}

function launchToast11() {
  void ToastService.addToast(ActionButtonToast, currentComponent, { type: "info" }, {
    "bubble-toast-action-event": () => {
      isFirstActionClicked.value = true;
    }
  })
    .then(() => {
      messages.value[10] = "Toast has been dismissed";
    });
}

function launchToast12() {
  void ToastService.addToast(ActionButtonToast, currentComponent, { type: "warning" }, {
    "bubble-toast-action-event": () => {
      isSecondActionClicked.value = true;
    }
  })
    .then(() => {
      messages.value[11] = "Toast has been dismissed";
    });
}

function launchToast13() {
  void ToastService.addToast(ActionButtonToast, currentComponent, { type: "error" }, {
    "bubble-toast-action-event": () => {
      isThirdActionClicked.value = true;
    }
  })
    .then(() => {
      messages.value[12] = "Toast has been dismissed";
    });
}

function launchToast14() {
  void ToastService.addToast(ActionButtonToast, currentComponent, { type: "success" }, {
    "bubble-toast-action-event": () => {
      isFourthActionClicked.value = true;
    }
  })
    .then(() => {
      messages.value[13] = "Toast has been dismissed";
    });
}

</script>

<style lang="less" scoped>
[data-test-case] {
  padding: .5rem 0;
}
</style>
