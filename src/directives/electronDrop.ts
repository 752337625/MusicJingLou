/**
 * @Example v-drop
 */
import type { App, Directive } from 'vue';
const dropDirective: Directive = {
  // 指令具有一组生命周期钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {
    //console.log(1);
  },
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {
    //console.log(1);
  },
  // 在绑定元素的父组件挂载之后调用
  mounted(el) {
    const { height } = el.getBoundingClientRect();
    console.log(el.getBoundingClientRect());
    const doc = document.createElement('div');
    doc.style.position = 'fixed';
    doc.style.top = '0';
    doc.style.left = '0';
    doc.style.height = `${height}px`;
    doc.style.width = '100%';
    doc.style.zIndex = '99';
    doc.style.pointerEvents = 'none';
    doc.style['-webkit-user-select'] = 'none';
    doc.style['-webkit-app-region'] = 'drag';
    document.body.appendChild(doc);
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {
    //console.log(1);
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated() {
    //console.log(1);
  },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {
    //console.log(1);
  },
  // 在绑定元素的父组件卸载之后调用
  unmounted() {
    //console.log(1);
  },
};

export function setupDropDirective(app: App) {
  app.directive('drop', dropDirective);
}

export default dropDirective;
