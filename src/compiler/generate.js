/**
 * 
 * <div id="app">
    <h3>hello world</h3>
    <h3>{{name}}</h3>
   </div>

   _c(); 创建元素
   _v(); 创建文本节点
   _s(); 处理{{name}} _s(name)


   render() // 模板字符串
 */

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
// 每次只处理一个节点；
function formatProps(attrs) {
  // console.log(attrs);
  // 处理style属性
  let attrStr = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    console.log('attr',attr)
    if (attr.name === 'style') {
      let styleAttrs = {};
      attr.value.split(';').map((styleAttr) => {
        let [key, value] = styleAttr.split(':');
        styleAttrs[key] = value;
      });
      attr.value = styleAttrs;
      // console.log('11',styleAttrs)
    }
    // 不是style属性
    attrStr += `${attr.name} : ${JSON.stringify(attr.value)},`;
  }
  console.log('所有属性:',`{${attrStr.slice(0, -1)}}`)
  return `{${attrStr.slice(0, -1)}}`
}

function generateChild(node) {
  if(node.type === 1) {
    return generate(node);
  }else if(node.type === 3) {
    // let text = node.text;
    // if(!defaultTagRE.text(text)) {
    //   return `_v(${JSON.stringify(text)})`; // 处理只有单独的字符串
    // }
    // let match,index,lastIndex = defaultTagRE.lastIndex  = 0;
    // while(match = defaultTagRE.exec(text)) {
    //   index = match.index;
    //   if(index > lastIndex) {

    //   }
    // }
  }
}

// 
function getChildren(ast) {
  const children = ast.children;
  console.log('children',children)
  if(children) {
    return children.map(c => generateChild(c)).join(',');
  }
}
export function generate(ast) {

  // render函数
  // function render(h) {
  //   return `
  //     _c('div', { id:"app",style:{"color":"skyblue" } }
  //     ,_c('h3',_v("hello world")
  //     ,_c('h3',_s(name))))

  //   `
  // }
  let children = getChildren(ast);

  let code = `_c('${ast.tag}',${ast.attrs.length > 0 ? `${formatProps(ast.attrs)}` : 'undefined'
    }${children ? `,${children}`:''})
  `;
}