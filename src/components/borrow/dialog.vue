<template>
   <van-dialog
      show-cancel-button
      v-model:show="state.show"
      :title="title"
      :before-close="handleBeforeClose"
      @cancel="onCancel"
      @confirm="handleOk"
      @close="onClose"
    >
      <slot v-bind:book="book">
        <div class="borrow-tip tc mt-16 mb-16">
          <h4>《{{ book.name }}》?</h4>
          <div class="divider flex flex-between">
            <div class="divider-line van-hairline--top divider-left"></div>
            <div class="divider-line van-hairline--top divider-right"></div>
          </div>
          <div class="tip-txt f12 primary-txt">
            注：借阅期限30天，可续借1次 14天
          </div>
        </div>
      </slot>
    </van-dialog>
</template>
<script>
import { reactive, watch } from 'vue'
import { Dialog } from 'vant'
export default {
  name: "BorrowDialog",
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '确认借阅'
    },
    onCancel: Function,
    onOk: Function,
    onClose: Function,
    book: Object,
  },
  setup(props){
    const state = reactive({
      show: props.show
    })

    const handleOk = () => {
      props.onOk && props.onOk(props.book)
    }

    const handleBeforeClose = (action, done) => {
      // todo
    }

    watch(() => props.show, (next) => {
      state.show = next
    })

    return {
      state,
      handleOk,
      handleBeforeClose
    }
  }
}
</script>
<style lang="scss">
  .divider{
    margin-top: 20px;
    .divider-line{
      position: relative;
      width: calc(50% - 20px);
      &:after{
        background-color: #979797;
      }
      &:before{
        content: '';
        position: absolute;
        z-index: 99;
        width: 6px;
        height: 6px;
        background: #D8D8D8;
        border-radius: 3px;
        top: -2px;
      }
      &.divider-left:before{
        right: 0;
      }
      &.divider-right:before{
        left: 0;
      }
    }
  }
  .borrow-tip{
    padding: 0 20px;
    h4{
      font-size: 14px;
      line-height: 26px;
    }
    .tip-txt{
      padding-top: 16px;
    }
  }
</style>