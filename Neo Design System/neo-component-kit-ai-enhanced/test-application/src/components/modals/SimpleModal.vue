<template>
  <nck-modal modalTitle="Hello modal" :size="ModalSize.M" :confirmDismissal="confirmDismissal">
    <template #modal-body>
      <nck-button data-open-extra-modal v-if="extraButton" color="primary" label="Open extra modal"
        @click="openExtraModal" />
      Hello this is a regular size modal with a lot of text which makes appear a
      scroolbar. Hello this is a regular size modal with a lot of text which
      makes appeaera a scrollbar. Hello this is a regular size modal with a lot
      of text which makes appeaera a scrollbar. Hello this is a regular size
      modal with a lot of text which makes appeaera a scrollbar.Hello this is a
      regular size modal with a lot of text which makes appeaera a scrollbar
      Hello this is a regular size modal with a lot of text which makes appeaera
      a scrollbar.Hello this is a regular size modal with a lot of text which
      makes appeaera a scrollbar.Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Vestibulum mattis bibendum nunc non fermentum. Nullam
      nibh ipsum, pharetra in cursus eu, bibendum nec magna. Integer efficitur
      leo id mollis interdum. Sed laoreet mattis lectus vel finibus. Donec
      maximus erat nibh, vitae rutrum urna efficitur id. Quisque tempus ac metus
      quis blandit. Fusce et turpis justo. Nunc tempus pellentesque magna, a
      pharetra ex maximus eu. Ut molestie odio leo, auctor egestas purus euismod
      quis. Ut vestibulum, metus quis dignissim commodo, nibh augue laoreet
      purus, ac mattis justo felis a quam. In rhoncus, arcu vitae placerat
      placerat, urna erat elementum felis, gravida dapibus magna felis non
      magna. Nulla vel arcu magna. Orci varius natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Aenean volutpat ante quis elit
      viverra efficitur. Proin ornare euismod turpis at facilisis. Suspendisse
      sagittis lacus vitae libero maximus sollicitudin. Quisque vel metus
      euismod, suscipit eros at, fringilla felis. Suspendisse faucibus neque
      pulvinar cursus vehicula. Ut pellentesque, dui ut consectetur consequat,
      mi tellus aliquam magna, quis efficitur lectus eros id justo. In nisi mi,
      rhoncus et augue vitae, pharetra malesuada nisi. Sed hendrerit risus ac
      rutrum dapibus. Nunc interdum massa at finibus varius. In condimentum,
      lectus quis sollicitudin aliquet, magna diam varius massa, varius
      vestibulum urna leo quis lorem. Cras maximus enim a erat pretium sodales.
      Proin lobortis purus nulla, ac mattis ipsum pulvinar ut. Curabitur
      tincidunt auctor ante, non malesuada justo dapibus quis. Nunc rhoncus
      efficitur risus ut convallis. Nam dignissim fringilla erat nec posuere.
      Nulla facilisi. Nulla dapibus imperdiet augue, vel luctus ligula aliquam
      quis. Sed nec posuere est. Praesent at tristique nibh. Morbi commodo nisi
      odio, vitae viverra sapien interdum ac. Pellentesque ac tellus ut justo
      semper laoreet at ac turpis. Maecenas vel nibh sit amet justo accumsan
      interdum. Class aptent taciti sociosqu ad litora torquent per conubia
      nostra, per inceptos himenaeos. Vivamus nec pulvinar magna. Vivamus mattis
      diam sed orci finibus, at imperdiet diam efficitur. Aliquam erat volutpat.
      Donec nec ante neque. Aenean laoreet nisl mauris, a interdum magna
      consectetur ac. Vestibulum quis dapibus arcu. Mauris et leo varius,
      tincidunt diam vulputate, molestie nisi. Ut ante turpis, volutpat at
      pellentesque sit amet, imperdiet at lectus. Maecenas sodales turpis ac
      orci bibendum, a sodales dolor imperdiet. Aliquam justo massa, viverra
      condimentum interdum a, eleifend eget libero. Mauris quis sem enim. Nunc
      fermentum justo et nulla dignissim, eu viverra metus tincidunt. Morbi quis
      est eu magna maximus laoreet egestas quis nibh. Proin et elementum mi.
      Nulla gravida ex a dolor luctus, vitae maximus nisi commodo. Etiam
      pellentesque augue et velit mattis, at ultricies enim interdum. Nullam ac
      eleifend est. Etiam sit amet ullamcorper quam. Nam placerat rhoncus quam
      ac maximus. Phasellus ultricies ligula congue magna tincidunt, sed mattis
      sapien convallis. Nunc aliquet et elit et finibus. Cras varius porttitor
      viverra. Aenean sed mattis lorem. Integer lectus lacus, tempus quis
      molestie in, efficitur in dui. Etiam in tristique nulla. Maecenas suscipit
      nisl a neque interdum ornare. Nunc congue tellus in diam accumsan posuere.
      Etiam interdum, sem sed tempus lacinia, nunc sem sodales dolor, at
      fringilla nunc ante sed ex. Donec quis egestas ipsum. Maecenas dignissim
      velit vitae nisi faucibus scelerisque.
    </template>

    <template #modal-footer-action-buttons>
      <nck-button v-if="confirmDismissal" color="light" label="Dismiss modal" @click="dismissModal" />
      <nck-button color="positive" label="Bye modal" @click="closeModal" />
    </template>
  </nck-modal>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentPublicInstance } from "vue";
import {
  ModalRole,
  ModalService,
  ModalSize,
  NckButton,
  NckModal
} from "@neotechnologygroup/neo-component-kit";
import ExtraSmallModal from "./ExtraSmallModal.vue";

defineProps<{
  extraButton?: boolean;
  confirmDismissal?: boolean;
}>();

const currentInstance = getCurrentInstance()?.proxy;

function closeModal() {
  ModalService.closeSpecificModal(currentInstance as ComponentPublicInstance);
}

function dismissModal() {
  ModalService.dismissSpecificModal(currentInstance as ComponentPublicInstance);
}

function openExtraModal() {
  ModalService.showModal(ExtraSmallModal, currentInstance as ComponentPublicInstance, undefined, { modalRole: ModalRole.DIALOG })
    .catch(() => {
      // don't care about dismissal
    });
}
</script>
