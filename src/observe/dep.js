let id = 0;
class Dep{ // 属性的dep要收集watcher
  constructor() {
    this.id = id++;
    this.subs = []; // 这里存放着当前属性对应的所有watcher
  }
  depend() {
    // 我们不希望放重复的watcher
    Dep.target.addDep(this); // Watcher记住当前dep
    // this.subs.push(Dep.target); // 会重复 所以不用
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}

Dep.target = null;

export default Dep;