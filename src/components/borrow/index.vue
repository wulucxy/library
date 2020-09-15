<template>
  <!-- 借书只能根据图书实例 id 生成 -->
  <BorrowDialog
    :show="state.showDialog"
    :book="state.bookInfo"
    :onCancel="handleCancel"
    :onOk="handleConfirm"
    :onClose="onClose"
  />
</template>
<script>
import { reactive, onMounted } from 'vue'

import { queryBookInfoByInstanceId, borrowBook } from '@/api'
import BorrowDialog from './dialog'

export default {
  name: 'Borrow',
  components: {
    BorrowDialog,
  },
  props: {
    bookInstanceId: String,
    onClose: Function,
  },
  setup(props){
    const state = reactive({
      bookInfo: null,
      showDialog: false,
    })

    const toggleDialog = () => {
      Object.assign(state, {
        showDialog: !state.showDialog
      })
    }

    const handleCancel = () => {
      toggleDialog()
    }

    const handleConfirm = () => {
      borrowBook({
        bookInstanceId: state.bookInfo.bookInstanceId
      }).then(() => {
        toggleDialog()
      })
    }

    onMounted(() => {
      queryBookInfoByInstanceId(props.bookInstanceId).then(bookInfo => {
        if(!bookInfo) {
          throw new Error('无法查询此书本信息，请联系管理员')
        }
        Object.assign(state, {
          bookInfo,
          showDialog: true,
        })
      })
    })

    return {
      state,
      handleCancel,
      handleConfirm
    }
  }
}
</script>
