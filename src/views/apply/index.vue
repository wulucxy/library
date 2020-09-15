<template>
  <div class="page apply-page">
    <Form class="apply-form" ref="formRef" validate-trigger="onSubmit">
      <CellGroup title="购书申请" :border="false">
        <Field
          ref="nameRef"
          v-model="state.name"
          label="书名"
          placeholder="请输入书名"
          :rules="[{ required: true, message: '请输入书名' }]"
        />
        <Field
          v-model="state.author"
          label="作者"
          placeholder="请输入作者"
          :rules="[{ required: true, message: '请输入作者' }]"
        />
        <!-- <Field label="上传图片" v-model="state.picturePath">
          <template #input>
            <Uploader />
          </template>
        </Field> -->
      </CellGroup>
      <CellGroup title="智能识别">
        <Cell
          clickable
          title="智能识别"
          label="扫码识别图书 ISBN 码"
          class="flex-vertical-align"
          @click="handleDetect"
        >
          <template #right-icon>
            <Icon name="scan" class="book-icon" />
          </template>
        </Cell>
      </CellGroup>
      <div class="form-footer mt-16">
        <Button @click="handleReset">重&nbsp;&nbsp;置</Button>
        <Button @click="onSubmit" type='primary'>提&nbsp;&nbsp;交</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { Form, CellGroup, Cell, Icon, Field, Button, Uploader } from 'vant'

import { Card } from '@/components'
import { utilScan } from '@/utils'
import { queryISBN, purchaseBook } from '@/api'

export default {
  name: 'Apply',
  components: {
    Form,
    CellGroup,
    Card,
    Field,
    Button,
    Uploader,
    Icon,
    Cell
  },
  setup (){
    const nameRef = ref(null)
    const formRef = ref(null)

    const state = reactive({
      name: '',
      author: '',
      picturePath: ''
    })

    // 智能识别二维码
    const handleDetect = () => {
      utilScan({
        type: 'barCode',
        onSuccess: (data) => {
          // 图书二维码同步给后端
          queryISBN(data.txt).then(res => {
            Object.assign(state, {
              author: res.bookInfo['作者'],
              name: res.title,
            })
            // todo: ios 无法触发
            nameRef.value.$el?.querySelector('input').focus()
          })
        }
      })
    }

    const handleReset = () => {
      Object.assign(state, {
        name: '',
        author: '',
        picturePath: ''
      })
    }

    const onSubmit = () => {
      formRef.value.validate()
        .then(() => {
          purchaseBook({
            author: state.author,
            bookName: state.name
          })
        })
        .catch(err => console.error(err))
    }

    return {
      nameRef,
      formRef,
      state,
      handleDetect,
      handleReset,
      onSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
  .apply-page{
    background-color: #f7f8fa;
  }
  .book-icon{
    font-size: 24px;
    line-height: inherit;
  }
</style>
