//入口文件
import Vue from "vue";
import App from "./App.vue";
//三级联动组件--注册为全局组件
import TypeNav from "@/components/TypeNav";
import Carousle from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button, MessageBox } from "element-ui";
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousle.name, Carousle);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
//Element-UI注册组件的时候还有一种写法：挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from "@/router";
//引入仓库
import store from "@/store";
//引入mockServe.js文件----mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";

//统一接收api文件夹里面的全部请求函数(* as是指统一引入)
import * as API from "@/api";

//引入lazyload插件（图片懒加载）
import VueLazyload from "vue-lazyload";
import atm from "@/assets/1.gif";
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm,
});

//自定义插件练习
import myPlugins from "./plugins/myPlugins";
Vue.use(myPlugins, {
  name: "upper",
});

//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: (h) => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    //组件实例的原型的原型指向的是Vue.prototype,this是Vue实例
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由信息：当这里书写router时，组件身上都拥有$router,$route属性
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store,
}).$mount("#app");
