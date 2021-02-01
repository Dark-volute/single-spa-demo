import importHTML from 'import-html-entry';



const rawWindow = window
const addWindowKeyMap = new Set()


/***
 *  将子应用代码的执行上下文环境绑定为proxy
 * 
function getExecutableScript(script, proxy, strictGlobal= true) {
  
    var globalWindow = (0, eval)('window');
    globalWindow.proxy = proxy;

    return `;(function(window,  self, globalThis){
        ${script}
     }).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
  }


// 'window.b = 123;' 从子应用获取的字符串代码
var code = getExecutableScript('window.b = 123;', proxy);

// eval 执行子应用代码
(0, eval)(code);

 */


// 用proxy代理window，传给子应用，子应用对全局属性的操作就是对该 proxy 对象属性的操作。
const proxy = new Proxy(window, {
    get: function (target, key) {
        console.log('---get---', key)
        return rawWindow[key]
    },
    set: function (target, key, value) {
        console.log('---set---', key)
        addWindowKeyMap.add(key)
        rawWindow[key] = value
    }
})


window.addEventListener('popstate', function (a, b) {
    if (window.location.pathname === '/app1') {
        importHTML('http://127.0.0.1:8888').then(res => {
            // 执行子应用代码
            res.execScripts(proxy).then(exports => {
                console.log(exports)
            })
        });
    } else {
        // 切换到主应用时删除在子应用添加的window属性
        for (let key of addWindowKeyMap.keys()) {
            delete rawWindow[key]
        }
    }
})