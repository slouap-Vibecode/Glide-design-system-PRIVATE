<script lang="ts">
import { PropType, VNodeNormalizedChildren, defineComponent } from "vue";

export default defineComponent({
  props: {
    vnode: {
      type: Array as PropType<VNodeNormalizedChildren[]>,
      required: true,
    },
  },
  render() {
    return this.$props.vnode;
  },
});
</script>
