<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 在Home，Search显示；在登陆和注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "asjhdij",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action，获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
