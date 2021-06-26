import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _72352113 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _43094ab9 = () => interopDefault(import('../pages/checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _63e2ad86 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _64ccf04b = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _55d7dd1a = () => interopDefault(import('../pages/user-profile.vue' /* webpackChunkName: "pages/user-profile" */))
const _4cfa66df = () => interopDefault(import('../pages/user-pwd-change.vue' /* webpackChunkName: "pages/user-pwd-change" */))
const _a60a4a0e = () => interopDefault(import('../pages/admin/administrators.vue' /* webpackChunkName: "pages/admin/administrators" */))
const _8cea191c = () => interopDefault(import('../pages/admin/customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _6d152ded = () => interopDefault(import('../pages/admin/product-categories.vue' /* webpackChunkName: "pages/admin/product-categories" */))
const _39de64ca = () => interopDefault(import('../pages/admin/product-edit.vue' /* webpackChunkName: "pages/admin/product-edit" */))
const _586eb3a2 = () => interopDefault(import('../pages/admin/product-list.vue' /* webpackChunkName: "pages/admin/product-list" */))
const _03098f73 = () => interopDefault(import('../pages/admin/user-groups.vue' /* webpackChunkName: "pages/admin/user-groups" */))
const _5df77932 = () => interopDefault(import('../pages/product/_slug/_id.vue' /* webpackChunkName: "pages/product/_slug/_id" */))
const _cb89eb22 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _72352113,
    name: "cart"
  }, {
    path: "/checkout",
    component: _43094ab9,
    name: "checkout"
  }, {
    path: "/login",
    component: _63e2ad86,
    name: "login"
  }, {
    path: "/signup",
    component: _64ccf04b,
    name: "signup"
  }, {
    path: "/user-profile",
    component: _55d7dd1a,
    name: "user-profile"
  }, {
    path: "/user-pwd-change",
    component: _4cfa66df,
    name: "user-pwd-change"
  }, {
    path: "/admin/administrators",
    component: _a60a4a0e,
    name: "admin-administrators"
  }, {
    path: "/admin/customers",
    component: _8cea191c,
    name: "admin-customers"
  }, {
    path: "/admin/product-categories",
    component: _6d152ded,
    name: "admin-product-categories"
  }, {
    path: "/admin/product-edit",
    component: _39de64ca,
    name: "admin-product-edit"
  }, {
    path: "/admin/product-list",
    component: _586eb3a2,
    name: "admin-product-list"
  }, {
    path: "/admin/user-groups",
    component: _03098f73,
    name: "admin-user-groups"
  }, {
    path: "/product/:slug?/:id?",
    component: _5df77932,
    name: "product-slug-id"
  }, {
    path: "/",
    component: _cb89eb22,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
