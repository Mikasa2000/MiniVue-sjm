export function createElement(tags,attrs = {}, ...children) {
  return vnode(tag, attrs, children)
}

export function createTextVnode(text) {
  return vnode(undefined,undefined,undefined,undefined,text)
}

function vnode(tag, props, children) {
  return {
    tag,
    props,
    children,
    text
  }
}