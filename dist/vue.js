(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var oldArrayProto = Array.prototype; // ?????????????????????????????????

  var newArrayProto = Object.create(oldArrayProto);
  var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
  methods.forEach(function (item) {
    newArrayProto[item] = function () {
      var _oldArrayProto$item;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // console.log('sas',args)
      // console.log('this',this)
      // ?????????array?????????
      var result = (_oldArrayProto$item = oldArrayProto[item]).call.apply(_oldArrayProto$item, [this].concat(args)); //  console.log('this2',this)
      // ????????????????????????????????????


      var inserted;
      var ob = this.__ob__;

      switch (methods) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          // console.log(args)
          inserted = args.slice(2);
      }

      if (inserted) {
        // ?????????????????????????????????
        ob.observeArray(inserted);
      }

      return result;
    };
  });

  var id$1 = 0;

  var Dep = /*#__PURE__*/function () {
    // ?????????dep?????????watcher
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id$1++;
      this.subs = []; // ??????????????????????????????????????????watcher
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // ???????????????????????????watcher
        Dep.target.addDep(this); // Watcher????????????dep
        // this.subs.push(Dep.target); // ????????? ????????????
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;

  var Observer = /*#__PURE__*/function () {
    function Observer(target) {
      _classCallCheck(this, Observer);

      // ??????this???
      Object.defineProperty(target, '__ob__', {
        value: this,
        enumerable: false
      }); // console.log('ii',target)
      // console.log('111',target.__proto__)
      // ????????????

      if (Array.isArray(target)) {
        target.__proto__ = newArrayProto; // console.log(target)

        this.observeArray(target);
      } else {
        // ????????????
        this.walk(target);
      }
    } // ????????????


    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(target) {
        target.forEach(function (item) {
          return obersve(item);
        });
      } // ????????????

    }, {
      key: "walk",
      value: function walk(target) {
        for (var key in target) {
          defineReactive(target, key, target[key]);
        }
      }
    }]);

    return Observer;
  }(); // ????????????


  function obersve(target) {
    // console.log(target)
    if (_typeof(target) !== 'object' || target == null) return;
    if (target.__ob__ instanceof Observer) return target.__ob__;
    return new Observer(target);
  } // ???????????????

  function defineReactive(target, key, value) {
    obersve(value);
    var dep = new Dep(); // ???????????????????????????dep

    Object.defineProperty(target, key, {
      get: function get() {
        if (Dep.target) {
          dep.depend(); // ????????????????????????????????????watcher
        }

        return value;
      },
      set: function set(newValue) {
        obersve(newValue);

        if (value !== newValue) {
          value = newValue;
          dep.notify(); // ???????????? 
        }
      }
    });
  }

  function initState(vm) {
    // ????????????????????? ????????????
    var opts = vm.$options; // ?????????????????????

    if (opts.data) {
      initData(vm);
    }
  } // ???????????????


  function initData(vm) {
    // console.log(this);
    var data = vm.$options.data; // console.log(data)

    vm._data = data;
    obersve(data); // ????????????

    for (var key in data) {
      myProxy(vm, '_data', key);
    }
  } // ????????????


  function myProxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[target][key];
      },
      set: function set(newValue) {
        vm[target][key] = newValue;
      }
    });
  }

  // Regular Expressions for parsing tags and attributes
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // ?????????

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // <div

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // > />

  var startTagClose = /^\s*(\/?)>/; // </div>

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  /**
   * 
   * tag,type,attrs,children 
   * 
   * {
   *  tag:tagName,
   *  type:1,
   *  attrs???{
   *    name:'',
   *    type:''
   * 
   *  },
   * 
   *  children:[{
   *    name:''
   * 
   *  }]
   *  
   * }
   */
  // ??????AST?????????

  function parseHtmlToAst(template) {
    // console.log(template);
    var text,
        root,
        // ????????????
    currentParent,
        stack = [];

    while (template) {
      var textEnd = template.indexOf('<'); // ???????????????????????????????????????
      // ?????????

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = template.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      if (textEnd > 0) {
        text = template.substring(0, textEnd); // console.log('text',text)
        // console.log(template)
      }

      if (text) {
        advance(text.length);
        chars(text);
      } // break;

    } // ?????????????????? ?????????????????????????????? 


    function parseStartTag() {
      var start = template.match(startTagOpen); // console.log('start',start); 

      var end, attr;

      if (start) {
        // match??????????????????div???AST???
        // console.log(start)
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // ??????????????? /> ???????????????????????? ????????????

        while (!(end = template.match(startTagClose)) && (attr = template.match(attribute))) {
          // console.log(attr)
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length); // console.log('match',match)
          // return match
        }

        if (end) {
          advance(end[0].length); // console.log('match',match)

          return match;
        }
      }
    } // ???????????? ????????????????????????


    function start(tagName, attrs) {
      // // 
      // console.log('------??????-------');
      // console.log(tagName,attrs);
      var element = createASTElement(tagName, attrs); // console.log('ele',element);
      // ?????? ????????????

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element);
    } // ???????????? ????????????????????????


    function end(tagName) {
      // console.log('------??????-------');
      // console.log('end:',tagName);
      var element = stack.pop(); // ??????????????????????????????element

      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    } // ????????????


    function chars(text) {
      // console.log('------??????-------');
      // console.log(text);
      text = text.trim();

      if (text.length > 0) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    } // ???????????????template


    function advance(n) {
      // console.log('------????????????----')
      template = template.substring(n);
    } // ?????????AST???????????????


    function createASTElement(tagName, attrs) {
      return {
        /*
        {
          tag:tagName,
          type:1,
          children:[],
          attrs,
          parent:
        }
        */
        tag: tagName,
        type: 1,
        children: [],
        attrs: attrs,
        parent: parent
      };
    }

    return root;
  }

  function formatProps(attrs) {
    // console.log(attrs);
    // ??????style??????
    var attrStr = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      console.log('attr', attr);

      if (attr.name === 'style') {
        (function () {
          var styleAttrs = {};
          attr.value.split(';').map(function (styleAttr) {
            var _styleAttr$split = styleAttr.split(':'),
                _styleAttr$split2 = _slicedToArray(_styleAttr$split, 2),
                key = _styleAttr$split2[0],
                value = _styleAttr$split2[1];

            styleAttrs[key] = value;
          });
          attr.value = styleAttrs; // console.log('11',styleAttrs)
        })();
      } // ??????style??????


      attrStr += "".concat(attr.name, " : ").concat(JSON.stringify(attr.value), ",");
    }

    console.log('????????????:', "{".concat(attrStr.slice(0, -1), "}"));
    return "{".concat(attrStr.slice(0, -1), "}");
  }

  function generateChild(node) {
    if (node.type === 1) {
      return generate(node);
    } else if (node.type === 3) ;
  } // 


  function getChildren(ast) {
    var children = ast.children;
    console.log('children', children);

    if (children) {
      return children.map(function (c) {
        return generateChild(c);
      }).join(',');
    }
  }

  function generate(ast) {
    // render??????
    // function render(h) {
    //   return `
    //     _c('div', { id:"app",style:{"color":"skyblue" } }
    //     ,_c('h3',_v("hello world")
    //     ,_c('h3',_s(name))))
    //   `
    // }
    var children = getChildren(ast);
    "_c('".concat(ast.tag, "',").concat(ast.attrs.length > 0 ? "".concat(formatProps(ast.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")\n  ");
  }

  function compileToFunction(template) {
    // 1.???template?????????????????????
    // 2.??????render?????? ?????????-> _c, _v, _s
    // 3.render??????????????????????????????dom???
    // 4.patch ??????DOM???????????????DOM
    // ????????????????????????
    var ast = parseHtmlToAst(template);
    console.log('ast', ast); // ????????????DOM ???????????????????????????

    var code = generate(ast);
    var render = new Function("with(this){ return ".concat(code, "}")); // console.log(code);

    return render;
  }

  /**
   * 1.?????????????????????watcher??? ???????????????????????????watcher??????Dep.target??????????????????;
   * 2.??????getter???_rander??????vm????????? ??????Object.definepropyte.get;
   */

  var id = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, fn, options) {
      _classCallCheck(this, Watcher);

      this.id = id++;
      this.renderWatcher = options;
      this.getter = fn; // getter?????????????????????????????????????????????

      this.deps = []; // watcher??????dep;

      this.depsId = new Set();
      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        Dep.target = this; // this???????????????watcher

        this.getter(); // ??????vm????????? ?????????_updata(),?????????vm?????????

        Dep.target = null;
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.deps.push(dep); // watcher??????dep

          this.depsId.add(id);
          dep.addSub(this); // dep??????watcher
        }
      }
    }, {
      key: "update",
      value: function update() {
        this.get();
      }
    }]);

    return Watcher;
  }(); // ????????????????????????????????????dep?????????????????????watcher

  function mountComponent(vm) {
    // _render???????????????????????????????????????DOM
    // _updata????????????DOM
    new Watcher(vm, function () {
      vm._update(vm._render()); // ????????????vm_update?????????watcher???

    }, true);
  }
  function liftcycleMixin(Vue) {
    // ??????????????????????????? ??????DOM???????????????DOM
    Vue.prototype._update = function (vnode) {
    };
  }

  function MixIns(Vue) {
    // ???????????????
    Vue.prototype.init = function (options) {
      var vm = this;
      vm.$options = options; // ????????????????????????????????????
      // ???????????????

      initState(vm); // ??????render > template > el

      if (options.el) {
        vm.$mount(options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      var ops = vm.$options;

      if (!ops.render) {
        //??????????????????template
        var template; // ???????????????template

        if (!ops.template && el) {
          template = el.outerHTML;
        } else {
          if (el) {
            template = ops.template;
          }
        } // ?????????template


        if (template) {
          // ???????????????????????????
          var render = compileToFunction(template);
          ops.render = render;
        }
      } // ??????????????????


      mountComponent(vm);
    };
  }

  function createElement(tags) {
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, attrs, children);
  }
  function createTextVnode(text) {
    return vnode(undefined, undefined, undefined);
  }

  function vnode(tag, props, children) {
    return {
      tag: tag,
      props: props,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      return createElement.apply(void 0, arguments);
    };

    Vue.prototype._s = function (value) {
      if (value === null) return;
      return _typeof(value) === 'object' ? JSON.stringify(value) : value;
    };

    Vue.prototype._v = function (text) {
      return createTextVnode();
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$optins.render;
      render.call(vm); // ????????????
    };
  }

  function Vue(options) {
    this.init(options);
  }

  MixIns(Vue);
  liftcycleMixin(Vue);
  renderMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
