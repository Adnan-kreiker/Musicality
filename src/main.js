import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import Icon from './directives/icon';
import { auth } from './includes/firebase';
import './assets/main.css';
import i18n from './includes/i18n';
import './registerServiceWorker';
import ProgressBar from './includes/progress-bar';
import 'nprogress/nprogress.css';
import 'animate.css';

ProgressBar(router);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive('icon', Icon);
    app.mount('#app');
  }
});
