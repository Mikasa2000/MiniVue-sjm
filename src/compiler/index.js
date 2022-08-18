import { parseHtmlToAst } from './astParser';
import { generate } from './generate';
export function compileToFunction(template) {
  // 1.将template转化成语法树；
  // 2.生成render（） 方法；-> _c, _v, _s
  // 3.render执行后的结果就是虚拟dom；
  // 4.patch 虚拟DOM转换成真是DOM

  // 转化成语法树模块
  const ast = parseHtmlToAst(template);
  console.log('ast',ast);
  // 生成虚拟DOM 返回出来一串字符串
  const code = generate(ast);
  const render = new Function(`with(this){ return ${code}}`)
  // console.log(code);

  return render;

}