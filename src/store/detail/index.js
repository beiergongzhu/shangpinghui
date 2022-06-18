import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodInfo: {},
  //游客（未登录）临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuid) {
    let result = await reqGoodsInfo(skuid);
    if (result.code === 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //将产品添加到购物车中
  //一个函数加上了async返回值一定是一个Promise
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //加入购物车以后（发请求），前台将参数带给服务器
    //服务器写入数据成功，并没有返回其他数据，只是返回code=200代表这次操作成功
    //因为服务器没有返回器与数据，因此咱们不用三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // console.log(result);
    //当前的这个函数如果执行则返回一个Promise
    //代表服务器加入购物车成功
    if (result.code === 200) {
      //返回非空字符串代表成功
      return "ok";
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error("faile"));
    }
  },
};

//简化数据
const getters = {
  //路径导航简化数据
  categoryView(state) {
    //goodInfo初始状态是一个空对象空对象的categoryView属性值为undefined
    return state.goodInfo.categoryView || {};
  },
  //产品信息简化数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性简化数据
  spuSaleAttrList() {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
