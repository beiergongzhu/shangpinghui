//封装游客身份模块uuid---> 生成一个随机字符串（一经生成不能再改变）
import { v4 as uuidv4 } from "uuid";

//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  //先从本地存储获取uuid（看一下本地存储里面是否有）
  //这样的好处是，只要生成了一次，就能直接从本地存储获取，不需要再执行后面的代码，保证了uuid不会改变
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  //如果没有生成
  if (!uuid_token) {
    //生成游客临时身份
    uuid_token = uuidv4();
    //本地存储一次
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  //切记要有返回值，没有返回值则为undefined
  return uuid_token;
};
