import { newArrayProto } from "./array";
import Dep from "./dep";

class Observer{
  constructor(target) {
    // 存储this；
    Object.defineProperty(target,'__ob__',{
      value:this,
      enumerable:false
    }) 
    // console.log('ii',target)
    // console.log('111',target.__proto__)
   
    // 处理数组
    if(Array.isArray(target)) {
      target.__proto__ = newArrayProto;
      // console.log(target)
      this.observeArray(target);
     
    }else{
      // 处理对象
      this.walk(target);
    }
   
  }

  // 观测数组
  observeArray(target) {
    target.forEach(item => obersve(item))
  }

  // 观察对象
  walk(target) {
    for(let key in target) {
      defineReactive(target,key,target[key]);
    }
  }
}

// 数据劫持
export function obersve(target) {
  // console.log(target)
  if(typeof target !== 'object' || target == null) return;
  if(target.__ob__ instanceof Observer) return target.__ob__;
  return new Observer(target) 
 
}

// 确定响应式
export function defineReactive(target,key,value) {
  obersve(value);
  let dep = new Dep(); // 每一个属性都有一个dep
  Object.defineProperty(target,key,{
    get() {
      if(Dep.target) {
        dep.depend(); // 让这个属性收集器记住这个watcher
      }
      return value;
    },
    set(newValue) {
      obersve(newValue)
      if(value !== newValue) {
        value = newValue;
        dep.notify(); // 通知更新 
      }
    }
  })
}