<template>
  <div>
    <!-- 三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- Floor组件自己在内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/index.vue";
import Recommend from "@/pages/Home/Recommend/index.vue";
import Rank from "@/pages/Home/Rank/index.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/index.vue";
import Brand from "@/pages/Home/Brand/index.vue";

export default {
  data() {
    return {};
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    floorList() {
      return this.$store.state.home.floorList;
    },
  },
  methods: {},
  mounted() {
    //派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
};
</script>

<style scoped>
</style>
