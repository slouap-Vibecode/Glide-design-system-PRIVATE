import { ComponentInternalInstance, getCurrentInstance, onUpdated, shallowReadonly, shallowRef } from "vue";

// https://mokkapps.de/vue-tips/check-if-component-has-event-listener-attached
export function useReactiveAttrs() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("no Vue instance");
  }

  const attributes = shallowRef(getAttributesFromInstance(instance));

  // https://vuejs.org/guide/components/attrs#accessing-fallthrough-attributes-in-javascript:~:text=Note%20that%20although,on%20each%20update.
  onUpdated(() => {
    attributes.value = getAttributesFromInstance(instance);
  });

  return shallowReadonly(attributes);
}

function getAttributesFromInstance(instance: ComponentInternalInstance) {
  const nextAttributes: Record<string, unknown> = {};

  if (!instance.vnode.props) {
    return nextAttributes;
  }

  const componentPropsKeys = Object.keys(instance.props);
  for (const key of Object.keys(instance.vnode.props)) {
    if (!componentPropsKeys.includes(key)) {
      nextAttributes[key] = instance.vnode.props[key];
    }
  }

  return nextAttributes;
}
