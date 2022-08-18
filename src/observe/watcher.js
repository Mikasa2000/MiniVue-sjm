import Dep from "./dep";

/**
 * 1.当我们创建渲染watcher时 会把当前渲染的这个watcher放到Dep.target这个属性身上;
 * 2.调用getter（_rander）去vm上取值 走到Object.definepropyte.get;
 */
let id = 0;
class Watcher {
  constructor(vm,fn,options) {
    this.id = id++;
    this.renderWatcher = options;
    this.getter = fn; // getter意味着调用这个函数可以发生取值
    this.deps = []; // watcher记录dep;
    this.depsId = new Set();
    this.get();
  }

  get() {
    Dep.target = this; // this指当前这个watcher
    this.getter(); // 会去vm上取值 这就是_updata(),也会去vm上取值
    Dep.target = null;
  }

  addDep(dep) {
    let id = dep.id;
    if(!this.depsId.has(id)) {
      this.deps.push(dep); // watcher记住dep
      this.depsId.add(id);
      dep.addSub(this); // dep记住watcher
    }
  }

  update() {
    this.get();
  }
}

 // 需要给每一个属性增加一个dep，目的就是收集watcher

export default Watcher;