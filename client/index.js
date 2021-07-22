import Vue from 'vue';
import SharkquilaUI from './SharkquilaUI.vue';
import store from './store/store'
import SKPlugins from "sharkquila_ui_toolkit";

import "./style/style.less";

Vue.use(SKPlugins)

new Vue({
  store,
  render: h => h(SharkquilaUI),
  renderError: e => console.error(e)
}).$mount('#main-container');