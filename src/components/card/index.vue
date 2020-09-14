<template>
  <div class="my-card">
    <slot />
  </div>
</template>
<script>
  export default {
    name: "Card"
  }
</script>
<style lang="scss" scoped>
  .my-card{
    padding: 8px 16px;
    background-color: #fff;
  }
</style>