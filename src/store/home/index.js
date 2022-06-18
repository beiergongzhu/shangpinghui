//home模块的小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api/index";

const state = {
  //state中数据默认初始值别乱写，要根据接口返回值来初始化
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
const actions = {
  //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    //这里如果不加await，返回的是axios执行后返回的结果即一个Promise。所以要加上await来得到Promise成功的结果
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    }
  },
  //获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code === 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code === 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};
//计算属性
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
