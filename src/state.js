 import {obersve} from "./observe/index";
 // 初始化状态 
 function initState(vm) {
  // 对数据进行劫持 判断状态
  const opts = vm.$options; // 获取所有的选项
  
  if(opts.data) {
    initData(vm);
  }

}
// 初始化数据
function initData(vm) {
  // console.log(this);
  let data = vm.$options.data;
  // console.log(data)

  vm._data = data;
  obersve(data);


  // 数据代理
  for(let key in data) {
    myProxy(vm,'_data',key)
  }
  
  
}
// 数据代理
function myProxy(vm,target,key) {
  Object.defineProperty(vm,key,{
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    }
  })
} 




export default initState;