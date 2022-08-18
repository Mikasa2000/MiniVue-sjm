import Watcher from "../observe/watcher";

export function mountComponent(vm) {
  // _render根据数据创建一个最新的虚拟DOM
  // _updata创建真实DOM
  new Watcher(vm,() => {
    vm._update(vm._render()); // 我们会将vm_update封装到watcher中
  },true);
  
}

export function liftcycleMixin(Vue) {
  // 添加更新视图的方法 虚拟DOM转化成真实DOM
  Vue.prototype._update = function(vnode) {
    // console.log(vnod)
    const vm = this;
  }
}