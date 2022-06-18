<template>
  <div class="pagination">
    <!-- 上部 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <!-- 下部 -->
    <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-show="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo === totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的起始数字和结束数字
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this; //解构
      //先定义两个变量存储起始数字与结束数字
      let start = 0;
      let end = 0;
      //连续的页码数为5（即至少为5页），如果出现不正常的现象（即不够5页）
      if (continues > totalPage) {
        //连续页码数大于总的页码数，即为不正常现象
        start = 1;
        end = totalPage;
      } else {
        //正常现象(总页数大于连续页码数)
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //把出现不正常的现象（start数字出现0和负数）纠正
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //把出现不正常的现象（end数字大于总页码）纠正
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end }; //key和value一致，省略value
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>