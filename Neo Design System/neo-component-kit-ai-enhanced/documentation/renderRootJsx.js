/**
 * renderRootJsx — vue-styleguidist wrapper for every example preview.
 *
 * Called by vue-styleguidist for each rendered example block.
 * Returns a Vue 3 component options object that renders StyleguideWrapper
 * as the root, with the example component passed in as the default slot.
 *
 * StyleguideWrapper auto-detects the nck component inside via CSS class names,
 * looks it up in the $tokenManifest global property, and renders a collapsible
 * "Show token overrides" accordion with scoped CSS var overrides below the preview.
 */
import { h } from 'vue'
import StyleguideWrapper from './components/StyleguideWrapper.vue'

export default function wrapPreview(previewComponent) {
  return {
    render() {
      return h(StyleguideWrapper, null, {
        default: () => h(previewComponent),
      })
    },
  }
}
