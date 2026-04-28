<template>
  <main style="text-align: left; margin: -0.5rem" class="nck-style">
    <nck-header
      title="NCK showcase page"
      subtitle="A web page to demonstrate all the components of the Neo Component Kit"
      subtitlePosition="under"
      backlink="Back"
      rightButtonIconName="add-plus"
      rightButtonAriaRole="button"
      rightButtonLabel="Edit"
      :showDivider="true"
      @page-header-backlink-clicked="() => {}"
      @page-header-right-button-clicked="showModal"
    ></nck-header>
    <nck-breadcrumb
    :options="testDataForTooltips" :activeStep="currentActiveStep" aria-label="A breadcrumb"></nck-breadcrumb>
    <nck-form labelId="formHeading" class="form background-color-blue-grey-100">
      <h2 class="header-2 inline-block" id="formHeading">Form</h2>
      <nck-badge
        class="inline-block"
        label="New!"
        :color="BadgeColor.GREEN"
        :type="BadgeType.SOLID"
      />

      <nck-card class="form-wrapper background-color-white">
      <nck-loading-area
        :loading="isLoading"
        :size="LoaderSize.XXL"
        loadingText="Please wait while retrieve your data"
        loadingFinishedText="Loading completed">
          <nck-banner
            :type="BannerType.WARNING"
            heading="Hurricane Jean is currently hitting Paris area."
            linkLabel="More information"
            linkAriaRole="link"
            @link-clicked="() => {}">
          </nck-banner>
          <nck-content-switcher
            class="form-field"
            :options="contentSwitcherOptions"
            v-model="contentSwitcherValue"
            label="Transportation mode" />
          <nck-radio-buttons
            class="form-field"
            :options="radioOptions"
            v-model="radioValue"
            name="'radioButtons"
            :direction="GroupDirection.HORIZONTAL"
            groupLabel="Diet"
            :required="true" />
          <nck-text-input
            class="form-field"
            label="First name"
            v-model="textInputValue"
            leadingIcon="account"
            helpMessage="Not a pseudo"
            :required="true"
            clearButtonAltText="Clear first name"
            :clearable="true" />
            <nck-autocomplete
            class="form-field"
            v-model="autocompleteValue"
            label="Currency"
            leadingIcon="card-swipe"
            clearButtonAltText="Clear currency"
            helpMessage="Crytocurrencies are not available"
            :required="true"
            :inlineAutocomplete="true"
            :proposalsRetriever="getMatchingProposalsRetriever"
            :debounceInput="true"
            loadingText="Loading the matching currencies"
            invalidSelectionErrorText="Select a valid currency"
            noMatchesFoundText="No matching currency found"
            errorRetrievingProposalsText="Unable to find currencies at the moment. Please try again after few minutes."
            numberOfMatchingResultsWording="numberResultsAreAvailable"></nck-autocomplete>
          <nck-dropdown
            class="form-field"
            v-model="dropdownOption"
            :autoSelect="false"
            :menuPosition="MenuPosition.BOTTOM_LEFT"
            :maxMenuHeight="20"
            label="Prefered pet"
            :options="optionsWithLotOfDiffentStartingLetters"
            required/>
          <div style="display:flex">
            <NckChip
              class="chip"
              label="Discount"
              leftIconName="tag-filled"
              />
            <NckChip
              class="chip"
              label="Toilets"
              leftIconName="toilet"
              active
              />
            <NckChip
              class="chip"
              label="Accessible"
              active
              @chip-cleared="() => {}"
              clearIconAltText="clear"
              />
          </div>
          <div style="margin-bottom: 1rem">
            <nck-datepicker-range
              class="form-field"
              startRangeName="date_start" endRangeName="date_end"
              startRangeLabel="From" endRangeLabel="To"
              v-model="dates"
              />
          </div>
          <nck-text-area
            label="Your message"
            :rules="rules"
            v-model="textAreaValue"
            ref="input0"
            />
          <nck-switch
            class="form-field"
            v-model="switchValue"
            label="I'm a VIP"
          />
          <div class="last-line">
            <nck-checkbox
            class="form-field"
            v-model="checkboxValue"
            label="I agree" />
            <nck-button
              class="form-field"
              :color="ButtonColor.PRIMARY"
              label="Search"
              leftIcon="train"
              @click="showToast">
            </nck-button>
          </div>
        </nck-loading-area>
      </nck-card>
    </nck-form>
    <nck-pagination
      :totalNumberOfItems="50"
      :numberOfItemsPerPage="10"
      footerWording="paginationFooter"
      pageNumberWording="paginationPageNumber"
      @page-changed="() => {}">
    </nck-pagination>
  </main>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import {
  NckHeader,
  NckBreadcrumb,
  IBreadcrumbOption,
  NckCard,
  NckForm,
  NckTextInput,
  NckSwitch,
  NckDropdown,
  IDropdownOption,
  NckTextArea,
  NckButton,
  ButtonColor,
  NckCheckbox,
  MenuPosition,
  ValidationRule,
  NckContentSwitcher,
  IContentSwitcherOption,
  NckBanner,
  NckRadioButtons,
  IRadioButtonOption,
  GroupDirection,
  NckBadge,
  BadgeColor,
  BadgeType,
  BannerType,
  NckLoadingArea,
  LoaderSize,
  NckAutocomplete,
  IAutocompleteItem,
  NckChip,
  ToastService,
  ModalService,
  NckPagination,
  NckDatepickerRange
} from "@neotechnologygroup/neo-component-kit";
import SimpleToast from "../components/toasts/SimpleToast.vue";
import SimpleModal from "../components/modals/SimpleModal.vue";

const currentComponent = getCurrentInstance()?.proxy ?? undefined;

const isLoading = ref<boolean>(true);
const currentActiveStep = ref<number>(3);
const textInputValue = ref<string>("");
const textAreaValue = ref<string>("");
const switchValue = ref<boolean>(false);
const dropdownOption = ref<IDropdownOption | null>(null);
const checkboxValue = ref<boolean>(false);
const radioValue = ref<string>("");
const autocompleteValue = ref<unknown | null>(null);
const dates = ref<Date[]>([ new Date("2024-07-26T00:00:00Z"), new Date("2024-08-11T00:00:00Z") ]);
const contentSwitcherValue = ref<string>("train");

const contentSwitcherOptions = ref<IContentSwitcherOption[]>([
  { text: "Plane", value: "plane" },
  { text: "Train", value: "train" },
  { text: "Horse", value: "car", disabled: true },
  { text: "Bike", value: "bike" }
]);

const radioOptions = ref<IRadioButtonOption[]>([
  { text: "Any", value: "a" },
  { text: "Vegetarian", value: "b" },
  { text: "Vegan", value: "c" }
]);

const rules = ref<ValidationRule[]>([
  new ValidationRule((value: string) => /^[a-zA-Z]+$/.test(value), "This field should container only letters"),
  new ValidationRule((value: string) => !value || value.length <= 250, "This field cannot contain more than 250 characters")
]);

const optionsWithLotOfDiffentStartingLetters = ref<IDropdownOption[]>([
  { label: "Cat", value: "c" },
  { label: "Dog", value: "d", subLabel: "Whatever flavor" },
  { label: "Snake", value: "s" },
  { label: "Whale", value: "disabled", disabled: true, subLabel: "Too small" }
]);

const currencies = ref<IAutocompleteItem[]>([
  {
    label: "Euro",
    subLabel: "The european currency",
    value: { symbol: "€" },
    leadingIcon: "euro-regular"
  }, {
    label: "US Dollar",
    value: { symbol: "$" },
    leadingIcon: "dollar"
  }, {
    label: "British Pound",
    value: { symbol: "£" },
    leadingIcon: "pound-regular"
  }, {
    label: "Rupee",
    value: { symbol: "rup" }
  }, {
    label: "Yen",
    value: { symbol: "yen" }
  }, {
    label: "Canadian Dollar",
    value: { symbol: "dc" }
  }, {
    label: "Peso",
    value: { symbol: "ps" }
  }
]);

const testDataForTooltips = ref<IBreadcrumbOption[]>([
  {
    text: "Home",
    onClick: () => {
      currentActiveStep.value = 0;
    },
    tooltipContent: "Very long tooltip content which is very interesting but still very long",
    counter: true
  },
  {
    text: "Trips",
    onClick: () => {
      currentActiveStep.value = 1;
    },
    errorState: true,
    icon: "trips",
    iconOrImageAlternative: "error",
    counter: true
  },
  {
    text: "Paris (March 2022)",
    textSecondLine: "City of light",
    onClick: () => {
      currentActiveStep.value = 2;
    },
    tooltipHeading: "Good choice!",
    icon: "amenity-bar-dark",
    iconOrImageAlternative: "beverage"
  },
  {
    text: "Book",
    onClick: () => {
      currentActiveStep.value = 3;
    },
    imageUrl: "Neo_Core_System.svg",
    icon: "fare-check-in-priority-dark",
    iconOrImageAlternative: "Ticket"
  }
]);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

async function getMatchingProposalsRetriever(input: string): Promise<IAutocompleteItem[]> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      const result = currencies.value.filter((currency) => currency.label.toLowerCase().includes(input.toLowerCase()));
      resolve(result);
    }, 200);
  });
}

function showToast() {
  void ToastService.addToast(SimpleToast, currentComponent);
}

function showModal() {
  ModalService.showModal(SimpleModal, currentComponent, undefined)
    .catch(() => {
      // no dismiss handling
    });
}
</script>

<style lang="less" scoped>
  .inline-block {
    display: inline-block;

    +.inline-block {
      padding-left: 1rem;
    }
  }
  .form {
    padding: 1rem;

    .form-wrapper {
      padding: 1rem;
    }

    .form-field {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      display: block;
    }

    .last-line {
      display: flex;
      flex-basis: 100%;
      justify-content: space-between;
    }

    .chip+.chip {
      margin-left: 0.5rem;
    }
  }
</style>
