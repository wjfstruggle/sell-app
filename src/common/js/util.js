/**
 *  解析url参数
 *  @example ?id12345&a=b
 *  @return Object {id:12345, a:b}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g // [?&]匹配?，[^?&]匹配id和a，[^?&]匹配12345和b
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=') // substring(1)把？删掉
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
