import Order from './Orders.vue';
import Home from './Home.vue';
import Modify from './Modify.vue';
import Dashboard from './Dashboard.vue'


export default [
  { path: '/', component: Home },
  { path: '/orders', component: Order },
  { path: '/modify/:docID', name: "modify", component: Modify, props: true },
  {path:'/dashboard', component: Dashboard}

]
