import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
//引入store
import store from "@/store";

//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象上的push方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//从写push|replace方法
//第一个参数：告诉原来的push方法往哪里跳转(传递哪些参数)
//第二个参数：成功回调
//第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call和apply的区别：相同点：都可调用函数一次，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数：call传递多个参数用逗号隔开，而apply方法执行,传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
const router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    //返回的这个y=0，代表滚动条在最上方
    return { y: 0 };
  },
});

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  //to：可以获取到你要跳转到的那个路由的信息
  //from：可以获取到来的那个路由的信息
  //next：放行函数  next()放行  next("/home")放行到指定的路由  next(false)取消当前的导航。如果浏览器的URL改变了，那么URL地址会重置到from路由对应的地址
  //用户登录了才会有token，未登录一定不会有token
  let token = store.state.user.token;
  //注意：空对象在进行if判断时为真,所以不能直接拿userInfo去判断
  let name = store.state.user.userInfo.name; //用户信息
  if (token) {
    //用户已经登陆了就不能再去login界面,让其停留在首页
    if (to.path === "/login") {
      next("/home");
    } else {
      //登陆了，但是去的不是login
      if (name) {
        next();
      } else {
        // 没有用户信息，就派发action获取用户信息存在仓库，然后再进行跳转
        try {
          //获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效了，获取用户信息失败，就需要重新登陆
          //清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //未登录：不能去交易相关页面，不能去支付相关页面，不能去个人中心
    //如果未登录去到上面这些路由，则应跳转到登录页
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //把未登录时想去而没有去成的页面信息，保存到地址栏的query参数中
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
