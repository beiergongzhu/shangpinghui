//vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options) {
  //Vue.prototype.$bus：任何组件都可以使用
  //Vue.directive 全局自定义指令
  //Vue.component
  Vue.directive(options.name, {
    bind: function (el, binding) {
      el.innerHTML = binding.value.toUpperCase();
      console.log(111);
    },
  });
};

export default myPlugins;
