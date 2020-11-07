import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'ListProducts',
    component: () => import('@/views/Products/ListProduct.vue')
  },
  {
    path: '/products/new',
    name: 'CreateProduct',
    component: () => import('@/views/Products/CreateProduct.vue')
  },
  {
    path: '/clientes',
    name: 'ListClientes',
    component: () => import('@/views/Clientes/ListClientes.vue')
  },
  {
    path: '/clientes/new',
    name: 'CreateClientes',
    component: () => import('@/views/Clientes/CreateClientes.vue')
  },
  {
    path: '/vendas/do',
    name: 'DoVenda',
    component: () => import('@/views/Vendas/DoVenda.vue')
  },
  {
    path: '/vendas',
    name: 'Vendas',
    component: () => import('@/views/Vendas/ListVendas.vue')
  },
  {
    path: '/print_venda/:vendaId',
    name: 'PrintVendas',
    component: () => import('@/views/Vendas/PrintVenda.vue')
  },
  {
    path: '/contas',
    name: 'ContasAReceber',
    component: () => import('@/views/Contas/ContasAReceber.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
