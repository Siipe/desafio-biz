import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import watchlist from './views/Watchlist.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: watchlist,
  },
];

const router = new VueRouter({
  routes,
});

export default router;