<template>
  <span class="popover">popover</span>
</template>

<script>
export default {
  data() {
    return {
      // buttonText: copybuttonText
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.popover {
  position: fixed;
  z-index: 999;
  top: 5rem;
  right: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  border: 1px solid ;
  border-radius: 0.5rem;
  font-size: 1rem;
  background: red;
}

</style>