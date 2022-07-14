import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/convenio/form',
    name: 'convenio-form',
    component: () => import(/* webpackChunkName: "form" */ '../views/convenio/convenio-form.vue')
  },
  {
    path: '/convenio/form/:model/:id',
    name: 'convenio-detalhar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import(/* webpackChunkName: "form" */ '../views/convenio/convenio-form.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
