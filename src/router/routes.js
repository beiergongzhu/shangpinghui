//路由配置信息
//当打包构建应用时，JavaScript包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    name: "search",
    path: "/search/:keyword?", //:为占位符
    component: () => import("@/pages/Search"),
    meta: { show: true },
    //路由组件能不能传递props数据？
    //布尔值写法：只能传递params
    // props: true,
    //对象写法
    // props: { a: 1, b: 2 },
    //函数写法：可以params参数，query参数，通过props传递给路由组件(最常用)
    // props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k }),
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/detail/:skuid",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //想要去交易页面，必须从购物车而来
      if (from.path === "/shopcart") {
        next();
      } else {
        //如果从其他路由组件而来，则停留在当前页面
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      //想要去支付页面（pay），必须从交易页面（trade）而来
      if (from.path === "/trade") {
        next();
      } else {
        //如果从其他路由组件而来，则停留在当前页面
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    //二级路由组件
    children: [
      {
        path: "/center",
        redirect: "/center/myorder",
      },
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder"),
      },
    ],
  },
];
