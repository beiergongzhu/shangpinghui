//search模块的小仓库
import { reqGetSearchInfo } from "@/api";

const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  //获取search模块的数据
  //params={}代表如果传了参数就以传的为准，没传就是空对象
  async getSearchList({ commit }, params = {}) {
    //当前这个reqGetSearchInfo函数在调用获取服务器数据时，至少要传递一个参数（空对象）
    //params形参：是当用户派发action的时候，第二个参数传过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code === 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
//计算属性，在项目中主要作用是简化仓库当中的数据（为了简化数据而生）
//可以把将来在组件当中需要用的数据简化一下（将来在组件中获取数据的时候就更加方便）
//state要划分模块，但getters不划分模块
const getters = {
  //当前形参state是当前仓库中的state，并非原来大仓库中的那个state
  goodsList(state) {
    //如果服务器的数据回来了，则它是一个数组；如果网络不行，则返回的是undefined
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
