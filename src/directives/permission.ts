/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, Directive } from 'vue';
const authDirective: Directive = {
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
	mounted() {
		//console.log(1);
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

export function setupPermissionDirective(app: App) {
	app.directive('auth', authDirective);
}

export default authDirective;
