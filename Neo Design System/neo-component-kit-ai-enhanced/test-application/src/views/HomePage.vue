<template>
  <div class="background">
    <div class="homepage-title">Welcome to Neo Component Kit test app!</div>

    <div id="nav">
      <ul class="list">
        <li v-for="component in components" :key="component.name">
          <router-link :to="component.url">{{ component.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const components = ref<Array<{ name: string; url: string }>>([
  { name: "Modal", url: "/modal" },
  { name: "Popover", url: "/popover" },
  { name: "Button", url: "/button" },
  { name: "Chip", url: "/chip" },
  { name: "Chip popover", url: "/chip-popover" },
  { name: "Banner", url: "/banner" },
  { name: "Toast", url: "/toast" },
  { name: "Information tooltip", url: "/infoTooltip" },
  { name: "Dialog tooltips", url: "/dialogTooltip" },
  { name: "List", url: "/list" },
  { name: "Icon", url: "/icon" },
  { name: "Counter badge", url: "/counterBadge" },
  { name: "Card", url: "/card" },
  { name: "Tab", url: "/tabs" },
  { name: "Header", url: "/header" },
  { name: "Badge", url: "/badge" },
  { name: "Table", url: "/table" },
  { name: "Pagination", url: "/pagination" },
  { name: "Pagination (FR)", url: "/pagination?lang=fr" },
  { name: "Breadcrumb", url: "/breadcrumb" },
  { name: "Content switcher", url: "/contentSwitcher" },
  { name: "Text input", url: "/textInput" },
  { name: "Phone number input", url: "/phone-number-input" },
  { name: "Checkbox", url: "/checkbox" },
  { name: "Switch", url: "/switch" },
  { name: "Loader", url: "/loader" },
  { name: "Radio buttons", url: "/radiobuttons" },
  { name: "Text area", url: "/textArea" },
  { name: "Dropdown", url: "/dropdown" },
  { name: "Recommended badge", url: "/recommendedBadge" },
  { name: "Placeholder", url: "/placeholder" },
  { name: "Menu", url: "/menu" },
  { name: "Form", url: "/form" },
  { name: "Datepicker, range of dates", url: "/datepicker-range" },
  { name: "Datepicker, single date", url: "/datepicker-single" },
  { name: "Datepickers with time", url: "/datepickers-with-time" },
  { name: "Autocomplete", url: "/autocomplete" },
  { name: "Showcase", url: "/showcase" },
  { name: "Toggle chip", url: "/toggleChip" },
  { name: "Toggle chip group", url: "/toggle-chip-group" },
  { name: "Slider", url: "/slider" },
  { name: "Drawer", url: "/drawer" },
  { name: "Status Indicator", url: "/status-indicator" },
  { name: "Search input", url: "/search-input" },
  { name: "Styles", url: "/styles" },
  { name: "Timeline", url: "/timeline" }
]);

onMounted(() => {
  components.value.sort((val1, val2) => {
    const nameVal1 = val1.name.toLowerCase();
    const nameVal2 = val2.name.toLowerCase();
    if (nameVal1 < nameVal2) {
      return -1;
    } else if (nameVal1 > nameVal2) {
      return 1;
    } else {
      return 0;
    }
  });
});
</script>

<style scoped lang="less">
#nav {
  padding: 1.875rem;
  a {
    font-weight: bold;
    font-size: 1.2rem;
    color: white;
    &.router-link-exact-active {
      color: white;
    }
  }
}

.homepage-title {
  padding: 2rem;
  font-size: 2.8rem;
  text-shadow: 0.1875rem 0.1875rem 0.1875rem black;
  color: white;
  text-align: left;
  margin-left: 2.25rem;
}

.list {
  list-style: none;
  text-align: left;
}

.background {
  background-image: url("https://miro.medium.com/max/1400/1*2kmYJdNvUCAU3ufDR0HTmA.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  margin: -0.5rem;
}
</style>
