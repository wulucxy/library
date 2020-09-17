<template>
  <div class="page settings-page">
    <CellGroup title="设置" :border="false">
      <Cell title="录入图书" is-link to="add" />
    </CellGroup>
  </div>
</template>
<script>
import { CellGroup, Cell } from 'vant'

export default {
  name: 'Settings',
  components: {
    CellGroup,
    Cell
  },
  setup (){
    
  }
}
</script>

