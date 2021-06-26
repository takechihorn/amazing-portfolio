import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  ErrorBar: () => import('../../components/ErrorBar.vue' /* webpackChunkName: "components/error-bar" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  ProductBox: () => import('../../components/ProductBox.vue' /* webpackChunkName: "components/product-box" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
