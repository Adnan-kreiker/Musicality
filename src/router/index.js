import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Home = () => import('@/views/Home.vue');
const Song = () => import(/* webpackChunkName: "mu" */'@/views/Song.vue');
const Manage = () => import(/* webpackChunkName: "mu" */'@/views/Manage.vue');
const About = () => import('@/views/About.vue');
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    name: 'Song',
    path: '/song/:id',
    component: Song,
  },
  {
    path: '/manage-music',
    alias: '/manage',
    meta: {
      requiresAuth: true,
    },
    name: 'Manage',
    component: Manage,
  },
  // {
  //   path: '/manage',
  //   redirect: { name: 'Manage' },
  // },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    // eslint-disable-next-line semi
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'Home' });
  }
});

export default router;
