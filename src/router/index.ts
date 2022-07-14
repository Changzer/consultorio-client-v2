import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/especialidade/listar',
    name: 'especialidade-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/especialidade/especialidade-list.vue')
  },
  {
    path: '/especialidade/form',
    name: 'especialidade-form',
    component: () => import(/* webpackChunkName: "form" */ '../views/especialidade/especialidade-form.vue')
  },
  {
    path: '/especialidade/form/:model/:id',
    name: 'especialidade-detalhar',
    props: (router) => ({ id: router.params.id, model: router.params.model }),
    component: () => import(/* webpackChunkName: "form" */ '../views/especialidade/especialidade-form.vue')
  },
  {
    path: '/convenio/listar',
    name: 'convenio-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/convenio/convenio-list.vue')
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
  },

  {
    path: '/medico/listar',
    name: 'medico-listar',
    component: () => import(/* webpackChunkName: "list" */ '../views/medico/medico-list.vue')
  },
  {
    path: '/medico/form',
    name: 'medico-form',
    component: () => import(/* webpackChunkName: "list" */ '../views/medico/medico-form.vue')
  },
  {
    path: '/medico/form/:model/:id',
    name: 'medico-detalhar',
    props: (router) => ({ id: router.params.id, model: router.params.model}),
    component: () => import(/* webpackChunkName: "list" */ '../views/medico/medico-form.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router