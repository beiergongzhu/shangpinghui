<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 专门用来触发鼠标移动事件的盒子 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgObj() {
      //当currentIndex变化时，计算属性会重新计算
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    //全局事件总线：获取兄弟组件传递过来的索引值
    this.$bus.$on("getIndex", (index) => {
      //修改当前响应式数据
      this.currentIndex = index;
    });
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      //限制蒙板的范围只能在框内
      if (left < 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      //修改元素mask的left和top值(mask是定位元素)
      mask.style.left = left + "px"; //别忘了加单位
      mask.style.top = top + "px";
      //修改右边大图的位置
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>