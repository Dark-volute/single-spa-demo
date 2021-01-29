import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const appOptions = {
  router,
  render: h => h(App)
}

// 支持应用独立运行、部署，不依赖于基座应用
if (!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

const vueLifecycle = singleSpaVue({
  Vue,
  appOptions
})

export function bootstrap (props) {
  console.log('app1 bootstrap', props)
  return vueLifecycle.bootstrap(() => {})
}

export function mount (props) {
  console.log('app1 mount', props)
  const a = vueLifecycle.mount(() => {})
  return a
}

export function unmount (props) {
  console.log('app1 unmount', props)
  return vueLifecycle.unmount(() => {})
}

