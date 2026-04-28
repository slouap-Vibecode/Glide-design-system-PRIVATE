<template>
  <div>
    <nav>
      <router-link class="test-app-style" to="/">Home</router-link>
    </nav>
    <div data-test-case="4">
      <b>Test case 4</b>
      <p class="test-app-style">
        <i>A modal with missing some action props when using actionIcon will trigger an error</i>
      </p>
      <button class="test-app-style" @click="launchMissingActionsPropsModal">Toggle test case 4 to display error</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentPublicInstance } from "vue";
import { ModalService } from "@neotechnologygroup/neo-component-kit";
import MissingActionsPropsModal from "@/components/modals/errors/MissingActionsPropsModal.vue";

const currentInstance = getCurrentInstance()?.proxy;

function launchMissingActionsPropsModal() {
  ModalService.showModal(MissingActionsPropsModal, currentInstance as ComponentPublicInstance)
    .catch(() => {
      // don't care about dismissal
    });
}
</script>
