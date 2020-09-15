<template>
  <div>
    <div style="height:50px; pointer-events: none;"></div>
    <Tabbar
      v-model="state.active"
      :active-color="tabBarActiveColor"
    >
      <TabbarItem 
        v-for="(item,index) of data"
        :key="index"
        replace
        :to="item.path"
        :name="item.name"
      >
        <span>{{item.label}}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.unactive" />
        </template>
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { reactive } from 'vue'
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
    activeRoute: {
      type: Object,
      default: () => ({})
    },
    handleChange: Function,
    tabBarActiveColor: {
      type: String,
      default: '#FFD27E'
    }  
  },
  setup(props) {
    // eslint-disable-next-line
    const { handleChange } = props
    const activeTabName = (props.data.find(d => d.path === props.activeRoute.path) || {}).name
    const state = reactive({
      active: activeTabName
    })

    return {
      state,
    }
  }
}
</script>