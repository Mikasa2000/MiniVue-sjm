const oldArrPrototype = Array.prototype;

// 创建一个新的实例对象
const newArrPrototype = Object.create(oldArrPrototype);


const methods = ['push','pop','shift','unshift','sort','reverse','splice'];

methods.forEach(item => {
  newArrPrototype[item] = function(...args) {
    const result = oldArrPrototype[item].call(this,...args);
  };


  let inserted;
  let ob = this.__ob__; // 原构造函数的this；
  



  return result;
})