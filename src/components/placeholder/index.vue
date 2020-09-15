<template>
  <Skeleton title :row="6" style="paddingTop: 16px" />
</template>
<script>
  import { Skeleton } from 'vant'

  export default {
    name: 'Placeholder',
    components: {
      Skeleton
    }
  }
</script>
