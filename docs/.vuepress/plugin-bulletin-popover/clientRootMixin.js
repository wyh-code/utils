import Popover from './Popover.vue';
import Vue from 'vue';

export default {
  updated() {
    setTimeout(() => {
      console.log('123455')
      const app = document.getElementById('app');
      let ComponentClass = Vue.extend(Popover);
      let instance = new ComponentClass();
      instance.$mount();
      // app.appendChild(instance.$el)
    }, 100)
  }
}