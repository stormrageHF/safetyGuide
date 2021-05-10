import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../pages/Home/Home.vue')
const Destination = () => import('../pages/Destination/Destination.vue')
const Assistance = () => import('../pages/Assistance/Assistance.vue')
const Details = () => import('../components/Details/Details.vue')
const AADetails = () => import('../components/Details/AADetails.vue')
const Medical = () => import('../pages/Medical/Medical.vue')
const Concierge = () => import('../pages/Concierge/Concierge.vue')
const Consulting = () => import('../pages/Consulting/Consulting')
const ScenicDetail = () => import('../pages/ScenicDetail/ScenicDetail.vue')
const HealthyDetail = () => import('../pages/HealthyDetail/HealthyDetail.vue')
const DietDetail = () => import('../pages/DietDetail/DietDetail.vue')
const RiskDetail = () => import('../pages/RiskDetail/RiskDetail.vue')
const Test = () => import('../components/Test/Test.vue')
const Vaccine = () => import('@/pages/Vaccine/Vaccine.vue')
const LiveData = () => import('@/pages/Vaccine/LiveData/LiveData.vue')
const Appointment = () => import('@/pages/Vaccine/Appointment/Appointment.vue')
const Research = () => import('@/pages/Vaccine/Research/Research.vue')

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
      component: Destination,
      children: [
        {
          path: '/Vaccine',
          name: "Vaccine",
          component: Vaccine,
          redirect: '/Vaccine/livedata',
          children: [
            {
              path: 'livedata',
              name: "LiveData",
              component: LiveData,
            },
            {
              path: 'appointment',
              name: "Appointment",
              component: Appointment,
            },
            {
              path: 'research',
              name: "Research",
              component: Research,
            }
          ]
        }
      ]
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
      path: '/aadetails/:id',
      name: 'aadetails',
      component: AADetails
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
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },

  ]
})

export default router
