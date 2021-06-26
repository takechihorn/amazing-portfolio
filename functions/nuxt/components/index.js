import { wrapFunctional } from './utils'

export { default as ErrorBar } from '../../components/ErrorBar.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as ProductBox } from '../../components/ProductBox.vue'

export const LazyErrorBar = import('../../components/ErrorBar.vue' /* webpackChunkName: "components/error-bar" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyProductBox = import('../../components/ProductBox.vue' /* webpackChunkName: "components/product-box" */).then(c => wrapFunctional(c.default || c))
