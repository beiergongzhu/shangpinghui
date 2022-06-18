//登录与注册的模块
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";

const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    localStorage.removeItem("TOKEN");
  },
};
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    //获取验证码的这个接口，是直接返回验证码(省钱)，但是正常情况下应该是后台把验证码发到手机上
    let result = await reqGetCode(phone);
    if (result.code === 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登录业务  (token：令牌)
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    //服务器下发的token，是用户的唯一标识。类似于之前使用的uuid
    //将来经常通过带token找服务器要用户信息进行展示
    if (result.code === 200) {
      //用户已经登录成功且获取到token
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      localStorage.setItem("TOKEN", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户信息（利用token）
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code === 200) {
      //提交用户信息
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //退出登录
  async userLogout({ commit }) {
    let result = await reqLogout();
    if (result.code === 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
