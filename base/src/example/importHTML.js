import importHTML from 'import-html-entry';


// 子应用沙箱原理
function getExecutableScript(script, proxy, strictGlobal= true) {
  
    var globalWindow = (0, eval)('window');
    globalWindow.proxy = proxy;

    // 将子应用代码的执行上下文环境绑定为proxy
    return `;(function(window,  self, globalThis){
        ${script}
     }).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
  }

  // proxy 代理window
  const proxy = new Proxy(window, {
    get: function(target, key) {
        console.log('---get---', key)
    },
    set: function(target, key) {
        console.log('---set---', key)
    }
})

// 'window.b = 123;' 从子应用获取的字符串代码
var code = getExecutableScript('window.b = 123;', proxy);

// eval 执行子应用代码
(0, eval)(code);


importHTML('http://127.0.0.1:8082')
    .then(res => {
        res.execScripts().then(exports => {
          console.log(exports)
    })
});
