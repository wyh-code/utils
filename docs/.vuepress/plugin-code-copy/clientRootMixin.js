import CodeCopy from './CodeCopy.vue'
import Vue from 'vue'

export default {
  async ready() {
    console.log('Hello World!');
  },
  updated() {
    setTimeout(() => {
      console.log('123455')
      document.querySelectorAll('div[class*="language-"] pre').forEach(el => {
        if (el.classList.contains('code-copy-added')) return
        let ComponentClass = Vue.extend(CodeCopy)
        let instance = new ComponentClass()
        instance.code = el.innerText
        instance.$mount()
        el.classList.add('code-copy-added')
        el.appendChild(instance.$el)
      })
    }, 100)
  }
}