import { MixIns } from "./init";
import { liftcycleMixin } from './lifecycle/index.js';
import { renderMixin } from './vdom/index.js';

function Vue(options) {
  this.init(options);
}

MixIns(Vue);
liftcycleMixin(Vue);
renderMixin(Vue);

export default Vue;