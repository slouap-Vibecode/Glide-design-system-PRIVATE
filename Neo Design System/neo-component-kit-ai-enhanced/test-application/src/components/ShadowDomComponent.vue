<template>
  <section ref="el" class="shadow-dom">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, render } from "vue";

const slots = useSlots();
const el = ref<HTMLElement>();

onMounted(() => {
  if (!el.value) {
    return;
  }

  const content = slots.default ? slots.default() : [];

  // Create a shadow DOM in the component root with the "open" mode.
  const container = el.value.attachShadow({ mode: "open" });

  // Append each element in the default slot to the shadow DOM container.
  content.forEach((s) => {
    render(s, container);
  });

  // Add global styles to the shadow DOM.
  document.querySelectorAll("style").forEach((style) => {
    const nextStyle = document.createElement("style");
    nextStyle.innerHTML = style.innerHTML;
    container.appendChild(nextStyle);
  });

  // Add global CSS files to the shadow DOM.
  document.querySelectorAll("link[rel='stylesheet']").forEach((css) => {
    container.appendChild(css.cloneNode());
  });

  const noAnimationStyle = document.createElement("style");
  noAnimationStyle.innerHTML = `
*,
*::after,
*::before {
  transition-delay: 0s !important;
  transition-duration: 0s !important;
  transition: none !important;
  animation-delay: -0.0001s !important;
  animation: none !important;
  animation-duration: 0s !important;
  animation-play-state: paused !important;
  caret-color: transparent !important;
  color-adjust: exact !important;
}
`;
  container.appendChild(noAnimationStyle);
});

</script>
