<template>
  <div class="page addbook-page">
    <Form class="addbook-form" ref="formRef" validate-trigger="onSubmit">
      <CellGroup title="图书录入" :border="false">
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
        <Field
          v-model="state.press"
          label="出版社"
          placeholder="请输入出版社"
          :rules="[{ required: true, message: '请输入出版社' }]"
        />
        <Field
          v-model="state.isbn"
          label="ISBN 码"
          placeholder="请输入 ISBN"
          :rules="[{ required: true, message: '请输入 ISBN' }]"
        />
        <Field
          v-model="state.price"
          label="价格"
          type='number'
          placeholder="请输入价格"
        />
        <Field
          v-model="state.intro"
          rows="2"
          label="图书描述"
          type="textarea"
          placeholder="请输入图书描述"
        />
        <!-- <Field label="上传图片" v-model="state.picturePath">
          <template #input>
            <Uploader />
          </template>
        </Field> -->
      </CellGroup>
      <CellGroup title="智能添加图书">
        <Cell
          clickable
          title="智能识别"
          label="扫码识别之江图书二维码"
          class="flex-vertical-align"
          @click="handleDetect"
        >
          <template #right-icon>
            <Icon name="scan" class="book-icon" />
          </template>
        </Cell>
      </CellGroup>
      <div class="form-footer mt-16">
        <Button @click="resetForm">重&nbsp;&nbsp;置</Button>
        <Button @click="onSubmit" type='primary'>提&nbsp;&nbsp;交</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { Form, CellGroup, Cell, Icon, Field, Button, Uploader, Toast } from 'vant'

import { utilScan } from '@/utils'
import { queryBookInfoByInstanceId, createBook } from '@/api'

export default {
  name: 'AddBook',
  components: {
    Form,
    CellGroup,
    Field,
    Button,
    Uploader,
    Icon,
    Cell
  },
  setup (){
    const nameRef = ref(null)
    const formRef = ref(null)

    const intialState = {
      id: '',
      name: '',
      author: '',
      press: '',
      price: undefined,
      isbn: '',
      intro: '',
      picturePath: ''
    }

    const state = reactive(intialState)

    // 智能识别二维码
    const handleDetect = () => {
      utilScan({
        type: 'barCode',
        onSuccess: (data) => {
          console.log('data===', data)
          // 图书二维码同步给后端
          queryBookInfoByInstanceId(data.text).then(res => {
            console.log('===res===', res)
            Object.assign(state, {
              author: res.author,
              name: res.name,
              press: res.press,
              isbn: res.isbn,
              price: res.price,
              intro: res.intro
            })
            // todo: ios 无法触发
            nameRef.value.$el?.querySelector('input').focus()
          })
        }
      })
    }

    const resetForm = () => {
      Object.assign(state, intialState)
    }

    const onSubmit = () => {
      formRef.value.validate()
        .then(() => {
          createBook({
            author: state.author,
            name: state.name,
            isbn: state.isbn,
            intro: state.intro,
            press: state.press,
            price: state.price,
            picturePath: state.picturePath,
          }).then(() => {
            resetForm()
            Toast.success('创建成功')
          })
        })
        .catch(err => console.error(err))
    }

    return {
      nameRef,
      formRef,
      state,
      handleDetect,
      resetForm,
      onSubmit
    }
  }
}
</script>
<style lang="scss" scoped>
  .addbook-page{
    background-color: #f7f8fa;
  }
  .book-icon{
    font-size: 24px;
    line-height: inherit;
  }
</style>
