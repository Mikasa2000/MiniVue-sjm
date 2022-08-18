import initState from "./state";
import { compileToFunction } from './compiler/index.js';
import { mountComponent } from './lifecycle/index.js';
export function MixIns (Vue) {
  // 初始化数据
  Vue.prototype.init = function(options) {
    const vm = this;
    vm.$options = options; // 将用户的选项挂载到实例上


    // 初始化状态
    initState(vm);

    // 判断render > template > el
    if(options.el) {
      vm.$mount(options.el);
    }
  }

  Vue.prototype.$mount = function(el) {
    const vm = this;
    el = document.querySelector(el);
    let ops = vm.$options;
    if(!ops.render) { //先查找是否有template
      let template;
      // 如果没有写template
      if(!ops.template && el) {
        template = el.outerHTML;
      }else {
        if(el) {
          template = ops.template;
        }
      }


      // 如果有template
      if(template) {
        // 需要对模板进行编译
        const render = compileToFunction(template);
        ops.render = render;
      }
    }
    // 生命周期函数
    mountComponent(vm);
  }

}




