// Regular Expressions for parsing tags and attributes
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 标签名
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;

const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
/**
 * 
 * tag,type,attrs,children 
 * 
 * {
 *  tag:tagName,
 *  type:1,
 *  attrs：{
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

// 创建AST语法树
export function parseHtmlToAst (template) {
  // console.log(template);
  let text,
      root, // 最终的树
      currentParent,
      stack = [];
  while (template) {

    let textEnd = template.indexOf('<'); // 返回数组中给定元素的索引；
    // 第一项
    if(textEnd === 0) {
      const startTagMatch = parseStartTag();
      if(startTagMatch) {
        start(startTagMatch.tagName,startTagMatch.attrs);
        continue;
      }

      const endTagMatch = template.match(endTag);
      if(endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
  
    }

    if(textEnd > 0) {
      text = template.substring(0,textEnd);
      // console.log('text',text)
      // console.log(template)
    }


    if(text) {
      advance(text.length);
      chars(text);
    }
    // break;
  }




 // 编译开始节点 对每一个节点进行操作 
  function parseStartTag() {
    const start = template.match(startTagOpen);
    // console.log('start',start); 
    let end,attr;

    if(start) {
      // match就是开始节点div的AST树
      // console.log(start)
      const match = {
        tagName:start[1],
        attrs:[],
      
      }
      advance(start[0].length);
      // 没有匹配到 /> 但是匹配到了属性 处理属性
      while(!(end = template.match(startTagClose)) && (attr = template.match(attribute))) {
        // console.log(attr)
        match.attrs.push({
          name:attr[1],
          value:attr[3] || attr[4] || attr[5]
        });
        advance(attr[0].length)
        // console.log('match',match)
        // return match
      }

      if(end) {
        advance(end[0].length);
        // console.log('match',match)
        return match;
      }
      
    }
    
  }



  // 处理开始 每一个节点的开始
  function start (tagName,attrs) {
    // // 
    // console.log('------开始-------');
    // console.log(tagName,attrs);

    const element = createASTElement(tagName,attrs);
    // console.log('ele',element);

    // 如果 没有节点
    if(!root) {
      root = element;

    }
    currentParent = element;
    stack.push(element);
  }

  // 处理结束 每一个节点的结束
  function end (tagName) {
    // console.log('------结束-------');
    // console.log('end:',tagName);
    const element = stack.pop(); // 删除的这一项就是当前element
    currentParent = stack[stack.length -1];
    if(currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }
  
  // 处理文本
  function chars (text) {
    // console.log('------文本-------');
    // console.log(text);
    text = text.trim();
    if(text.length > 0) {
      currentParent.children.push({
        type:3,
        text
      })
    }
   
   
  }
  // 截取剩余的template
  function advance (n) {
    // console.log('------剩余部分----')
    template = template.substring(n);
  }
  
  // 创建出AST语法树节点
  function createASTElement(tagName,attrs) {
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

      tag:tagName,
      type:1,
      children:[],  
      attrs,
      parent
    }
  }
  return root;
}

