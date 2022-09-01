import { createApp, App } from 'vue';
import { registerApp } from './global';

// import './service/axios_demo';

import rootApp from './App.vue';

import router from './router';
import store from './store';
import hyRequest from './service';

const app: App = createApp(rootApp);

// 注册Element PLUS/其他
registerApp(app);
app.use(router);
app.use(store);
app.mount('#app');

// console.log(process.env.VUE_APP_BASE_URL);
// console.log(process.env.VUE_APP_BASE_NAME);

hyRequest.request({
  url: '/home/multidata',
  method: 'GET'
});
