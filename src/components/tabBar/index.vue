<template>
  <Tabbar
    v-model="active"
    :active-color="tabBarActiveColor"
    @change="changeActive"
  >
    <TabbarItem 
      v-for="(item,index) of data"
      :key="index"
      :icon="item.icon"
      :to="item.path"
      :name="item.name"
    >
      {{item.label}}
    </TabbarItem>
  </Tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  name: 'TabBar',
  components: {
    Tabbar,
    TabbarItem
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tabBarActiveColor: {
      type: String,
      default: '#e43130'
    }  
  },
  setup(props) {
    const changeActive = (active) => {}

    return {
      changeActive
    }
  }
}
</script>