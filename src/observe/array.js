let oldArrayProto = Array.prototype;
// 也是创建实例的一种方式
export let newArrayProto = Object.create(oldArrayProto);
let methods = ['push','pop','shift','unshift','splice','sort','reverse']

methods.forEach(item => {
  newArrayProto[item] = function(...args) {
    // console.log('sas',args)
    // console.log('this',this)
    // 谁调的array指向谁
   const result = oldArrayProto[item].call(this,...args);
  //  console.log('this2',this)
   // 对新增的数据再次进行劫持
   let inserted;
   let ob = this.__ob__
   switch(methods) {
    case 'push':
    case 'unshift':
    inserted = args;
    
    break;
    case 'splice':
      // console.log(args)
      inserted = args.slice(2);
      

    default:
      break;
   }

   if(inserted) { // 对新增内容再次进行观测
    ob.observeArray(inserted);
   }

   return result;
  }
})

