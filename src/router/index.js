import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/thongtinhoadon',
      name: 'thongtinhoadon',
      component: () => import('@/views/Thongtinhoadon.vue'),
      props: true,
    },
    {
      path: '/sanluongdien',
      name: 'sanluongdien',
      component: () => import('@/views/Sanluongdien.vue'),
      props: true,
    },
  ],
});

export default router;