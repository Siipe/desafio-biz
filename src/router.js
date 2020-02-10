import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Watchlist from './views/Watchlist.vue';
import Search from './views/Search.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: Watchlist,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
