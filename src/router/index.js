import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../pages/Home/Home.vue')
const Destination = () => import('../pages/Destination/Destination.vue')
const Assistance = () => import('../pages/Assistance/Assistance.vue')
const Details = () => import('../components/Details/Details.vue')
const Medical = () => import('../pages/Medical/Medical.vue')
const Concierge = () => import('../pages/Concierge/Concierge.vue')
const Consulting = () => import('../pages/Consulting/Consulting')
const ScenicDetail = () => import('../pages/ScenicDetail/ScenicDetail.vue')
const HealthyDetail = () => import('../pages/HealthyDetail/HealthyDetail.vue')
const DietDetail = () => import('../pages/DietDetail/DietDetail.vue')
const RiskDetail = () => import('../pages/RiskDetail/RiskDetail.vue')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/des',
      component: Destination
    },
    {
      path: '/ass',
      component: Assistance
    },
    {
      path: '/med',
      component: Medical
    }, {
      path: '/consult',
      component: Consulting
    }, {
      path: '/concierge',
      component: Concierge
    },
    {
      path: '/details/:id',
      name: 'details',
      component: Details
    },
    {
      path: '/ScenicDetail/:name',
      name: 'ScenicDetail',
      component: ScenicDetail
    },
    {
      path: '/HealthyDetail',
      name: 'HealthyDetail',
      component: HealthyDetail
    },
    {
      path: '/DietDetail',
      name: 'DietDetail',
      component: DietDetail
    },
    {
      path: '/RiskDetail/:name',
      name: 'RiskDetail',
      component: RiskDetail
    }
  ]
})

export default router
