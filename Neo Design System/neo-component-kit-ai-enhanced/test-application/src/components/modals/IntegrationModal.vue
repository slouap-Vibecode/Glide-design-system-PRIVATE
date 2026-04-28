<template>
  <NckModal modalTitle="Integration modal">
    <template #modal-body>
      <p>This modal tests a variety of component, especially ones with popover, how they behave within the modal</p>
      <NckDatepickerRange id="datepickerInModal" ignoreParentOverflow startRangeName="TC10_start"
        endRangeName="TC10_end" startRangeLabel="The beginning" endRangeLabel="The end" :todayDate="today"
        :popoverPosition="DatepickerPopoverPosition.RIGHT" />
      <p></p>
      <NckDropdown id="dropdownInModalFullSize" ignoreParentOverflow label="test" v-model="dropdownValues[0]"
        :options="dropdownOptions" :maxMenuHeight="30" />
      <p></p>
      <NckAutocomplete id="autocompleteInModal" ignoreParentOverflow name="name" label="Test autocomplete"
        clearButtonAltText="Clear" loadingText="Loading..." noMatchesFoundText="Nada" errorRetrievingProposalsText="Error"
        invalidSelectionErrorText="Invalid" numberOfMatchingResultsWording="numberResultsAreAvailable"
        helpMessage="test trigger target" :proposalsRetriever="getProposalsRetriever" :modelValue="selectedOption" />
      <NckDropdown id="dropdownInModalHalfSize" ignoreParentOverflow style="width: 50%" label="test 50%"
        v-model="dropdownValues[1]" :options="dropdownOptions" helpMessage="half size !!" :maxMenuHeight="30"
        readonly />
      <div class="chip-popovers">
        <NckChipPopover
          v-model="chipPopoverValue[0]"
          label="ignoreParentOverflow"
          headerVisible
          popoverTitle="A M BOTTOM_LEFT popover with ignoreParentOverflow..."
          ignoreParentOverflow
          :popoverSize="PopoverSize.M"
          :menuPosition="MenuPosition.BOTTOM_LEFT"
        >
          <template #popover-body>
            ...to overflow the modal instead of expanding its body vertically
          </template>
        </NckChipPopover>
        <NckChipPopover
          v-model="chipPopoverValue[1]"
          label="ignoreParentOverflow"
          headerVisible
          popoverTitle="A L BOTTOM_RIGHT popover with ignoreParentOverflow..."
          ignoreParentOverflow
          :popoverSize="PopoverSize.L"
          :menuPosition="MenuPosition.BOTTOM_RIGHT"
        >
          <template #popover-body>
            ...to overflow the modal instead of expanding its body vertically
          </template>
        </NckChipPopover>
        <NckChipPopover
          v-model="chipPopoverValue[2]"
          label="ignoreParentOverflow"
          headerVisible
          popoverTitle="A XL TOP_LEFT popover with ignoreParentOverflow..."
          ignoreParentOverflow
          :popoverSize="PopoverSize.XL"
          :menuPosition="MenuPosition.TOP_LEFT"
        >
          <template #popover-body>
            ...to overflow the modal instead of expanding its body vertically
          </template>
        </NckChipPopover>
        <NckChipPopover
          v-model="chipPopoverValue[3]"
          label="ignoreParentOverflow"
          headerVisible
          popoverTitle="A FLUID_WIDTH TOP_RIGHT popover with ignoreParentOverflow..."
          ignoreParentOverflow
          :popoverSize="PopoverSize.FLUID_WIDTH"
          :menuPosition="MenuPosition.TOP_RIGHT"
        >
          <template #popover-body>
            ...to overflow the modal instead of expanding its body vertically
          </template>
        </NckChipPopover>
        <NckChipPopover
        v-model="chipPopoverValue[4]"
        label="ignoreParentOverflow"
        headerVisible
        popoverTitle="A FULL_WIDTH BOTTOM_LEFT popover with ignoreParentOverflow..."
        ignoreParentOverflow
        :popoverSize="PopoverSize.FULL_WIDTH"
        :menuPosition="MenuPosition.BOTTOM_LEFT"
      >
        <template #popover-body>
          ...to overflow the modal instead of expanding its body vertically
        </template>
      </NckChipPopover>
    </div>
    </template>
    <template v-slot:modal-footer-additional-content>
      <NckButton label="Footer button not doing anything" />
    </template>
    <template v-slot:modal-footer-action-buttons>
      <NckButton label="Bye modal" @click="closeModal" />
    </template>
  </NckModal>
</template>
<style scoped>
  .chip-popovers {
    display: flex;
    gap: 0.2rem;
    flex-wrap: wrap;
  }
</style>
<script setup lang="ts">
import { DatepickerPopoverPosition, MenuPosition, ModalService, NckAutocomplete, NckButton, NckChipPopover, NckDatepickerRange, NckDropdown, NckModal, PopoverSize } from "@neotechnologygroup/neo-component-kit";
import { ref } from "vue";

const today = ref<Date>(new Date(2023, 0, 26));
const chipPopoverValue = ref<boolean[]>([ false, false, false, false, false ]);

const dropdownOptions = ref([
  {
    label: "Test string",
    value: "string value"
  },
  {
    label: "number value",
    value: 1
  },
  {
    label: "boolean",
    value: true
  },
  {
    label: "London",
    subLabel: "United Kingdom",
    value: { displayAddress: "London", cityCode: "LON", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "London Gatwick international airport at 25km of London city center",
    value: { displayAddress: "London Gatwick international", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "plane"
  },
  {
    label: "London Saint Pancras",
    value: { displayAddress: "London Saint Pancras", cityCode: "SPC", lat: -33.145, lon: 42.34 },
    leadingIcon: "train"
  },
  {
    label: "Koh Lanta",
    value: { displayAddress: "Koh Lanta", cityCode: "KLT", lat: 3.145, lon: 2.34 }
  },
  {
    label: "Koh Tao",
    value: { displayAddress: "Koh Tao", cityCode: "KTA", lat: 34.145, lon: 12.34 }
  },
  {
    label: "Koh Samui",
    value: { displayAddress: "Koh Samui", cityCode: "KSA", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Rok",
    value: { displayAddress: "Koh Rok", cityCode: "KRO", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Rok Nuy",
    value: { displayAddress: "Koh Rok Nuy", cityCode: "KRN", lat: -33.145, lon: 42.34 }
  },
  {
    label: "Koh Phiphi",
    value: { displayAddress: "Koh Phiphi", cityCode: "KPP", lat: -33.145, lon: 42.34 }
  }
]);

const allAddresses = ref([
  {
    label: "Paris, France",
    value: { displayAddress: "Paris, France", cityCode: "PAR", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "Gare de Lyon, Paris",
    value: { displayAddress: "Gare de Lyon, Paris", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "location"
  },
  {
    label: "Aéroport Paris CDG",
    value: { displayAddress: "Aéroport Paris CDG", cityCode: "CDG", lat: -33.145, lon: 42.34 },
    leadingIcon: "time"
  },
  {
    label: "London",
    subLabel: "United Kingdom",
    value: { displayAddress: "London", cityCode: "LON", lat: 3.145, lon: 2.34 },
    leadingIcon: "company"
  },
  {
    label: "London Gatwick international airport at 25km of London city center",
    value: { displayAddress: "London Gatwick international", cityCode: "FR7500L", lat: 34.145, lon: 12.34 },
    leadingIcon: "plane"
  },
  {
    label: "London Saint Pancras",
    value: { displayAddress: "London Saint Pancras", cityCode: "SPC", lat: -33.145, lon: 42.34 },
    leadingIcon: "train"
  }
]);

const selectedOption = ref(allAddresses.value[0]);

const dropdownValues = ref([ null, null ]);

async function getProposalsRetriever(input: string) {
  const result = allAddresses.value.filter(
    (address) => address.label.toLowerCase().includes(input.toLowerCase()));

  return result;
}

function closeModal() {
  ModalService.closeModal();
}
</script>
