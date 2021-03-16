import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0f4344e6 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _054f04ca = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _a42103a6 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _6da11126 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _2400f242 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _03746b29 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _a00c8a8c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _0f4344e6,
    children: [{
      path: "",
      component: _054f04ca,
      name: "home"
    }, {
      path: "/login",
      component: _a42103a6,
      name: "login"
    }, {
      path: "/register",
      component: _a42103a6,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _6da11126,
      name: "profile"
    }, {
      path: "/settings",
      component: _2400f242,
      name: "settings"
    }, {
      path: "/editor",
      component: _03746b29,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _a00c8a8c,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
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
