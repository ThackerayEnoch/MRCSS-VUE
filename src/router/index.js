import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components:{
        rootRouter: () => import('../views/MainView.vue')
      },
      children: [
        {
          path: '', // 默认子路由
          name: 'ringtone',
          components:{
            ringtoneRouter: () => import('../views/ringtone/RingtoneView.vue')
          }
        },
        {
          path: '/ringtone/manage',
          name: 'ringtone-manage',
          components:{ 
            ringtoneRouter:() => import('../views/ringtone/RingtoneManage.vue')
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      components:{ 
        rootRouter:() => import('../views/auth/LoginView.vue')
      }
    },
    {
      path: '/register',
      name: 'register',
      components:{
        rootRouter: () => import('../views/auth/RegisterView.vue')
      }
    },
  ]
})

export default router