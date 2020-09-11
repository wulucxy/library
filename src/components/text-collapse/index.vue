<template>
  <div class="text-collapse">
    <h3 v-if="title">{{ title }}</h3>
    <div :class="['txt', { 'clamp': !state.collapsed }]" ref="boxRef">
      <span ref="innerBoxRef" id='testSpan'>
        <slot />
      </span>
    </div>
    <div class="collapse-action-row tc" v-if="state.isClamp">
      <div @click="toggleCollapsed" class='dib'>
        <span>{{state.collapsed ? '收起' : '展开'}}</span>
        <Icon :name="state.collapsed ? 'arrow-up' : 'arrow-down'" class='ml-6' />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import { Icon } from 'vant'

export default {
  name: "TextCollpase",
  components: {
    Icon
  },
  props: {
    title: String,
  },
  setup (props){
    const boxRef = ref(null)
    const innerBoxRef = ref(null)

    const state = reactive({
      isClamp: false, // 文本是否超出三行，默认否
      collapsed: false // 文本是否是展开状态 默认为收起
    })

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
    }

    onMounted(() => {
      const boxHeight = boxRef.value.offsetHeight
      const textHeight = innerBoxRef.value.offsetHeight
      if(boxHeight < textHeight) {
        state.isClamp = true
      }
    })

    return {
      boxRef,
      innerBoxRef,
      toggleCollapsed,
      state
    }
  },
};
</script>
<style lang="scss" scoped>
.text-collapse{
  padding-top: 16px;
  h3{
    line-height: 1.5;
    margin-bottom: 12px;
  }
}
.txt {
  margin-bottom: 12px;
  line-height: 1.5;
}
.clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.btn {
  color: red;
}
</style>
