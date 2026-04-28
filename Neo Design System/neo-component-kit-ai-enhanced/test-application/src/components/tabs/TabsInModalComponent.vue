<script setup lang="ts">
import { ModalSize, NckModal, NckTabs, TabsType } from '@neotechnologygroup/neo-component-kit';

</script>

<template>
  <NckModal modalTitle="Test with tabs" :size="ModalSize.XS">
    <template #modal-body>
      <NckTabs :type="TabsType.COMPACT">
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
      </NckTabs>
    </template>
  </NckModal>
</template>