import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code === 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车列表数据
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车某一个产品的选中状态isChecked
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部勾选的产品
  //通过调用另一个action***（新思想）
  deleteAllCheckedCart({ dispatch, getters }) {
    //context(上下文)：可以理解为小仓库 ----> commit:[提交mutations修改state]  getters[计算属性]  dispatch[派发action] state[当前仓库数据]
    let PromiseAll = []; //设置该数组的目的是方便后续使用Promise.all()方法
    getters.cartList.cartInfoList.forEach((item) => {
      if (item.isChecked == 1) {
        let promise = dispatch("deleteCartListBySkuId", item.skuId); //返回一个Promise
        //将每一次返回的Promise添加到数组当中
        PromiseAll.push(promise);
      }
      //只要全部的promise都成功，返回的结果即为成功；如果有一个失败，返回的结果即为失败
      //无论成功还是失败，Promise.all方法都返回一个Promise
      //Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例
      return Promise.all(PromiseAll);
    });
  },
  //修改全部产品的状态
  //类比上面的删除全部选中操作
  updateAllCartIsChecked({ dispatch, getters }, isChecked) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      PromiseAll.push(promise);
    });
    //最终返回结果
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
