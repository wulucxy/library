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
        <Field label="图书封面">
          <template #input>
            <Uploader v-model="state.picturePath" :max-count="1" />
          </template>
        </Field>
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
        <Button @click="resetForm">重&nbsp;置</Button>
        <Button
          @click="onSubmit"
          :loading="state.loading"
          loading-text="加载中..."
          type='primary'
        >提&nbsp;交</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { Form, CellGroup, Cell, Icon, Field, Button, Uploader, Toast } from 'vant'

import { utilScan } from '@/utils'
import { queryISBN, createBook, uploadImg } from '@/api'

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
      name: '',
      author: '',
      press: '',
      price: undefined,
      isbn: '',
      intro: '',
      picturePath: [],
      loading: false,
    }

    const state = reactive(intialState)

    // 智能识别二维码
    const handleDetect = () => {
      utilScan({
        type: 'barCode',
        onSuccess: (data) => {
          // 图书二维码同步给后端
          queryISBN(data.text).then(res => {
            Object.assign(state, {
              author: res.bookInfo['作者'],
              name: res.title,
              press: res.bookInfo['出版社'],
              isbn: res.isbn,
              price: parseFloat(res.bookInfo['定价']),
              intro: res.bookIntro,
              picturePath: [res.coverUrl],
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
      Object.assign(state, {
        loading: true
      })

      formRef.value.validate()
        .then(async () => {
          console.log('state', state.picturePath)
          const uploadUrl = await uploadImg({url: state.picturePath[0] })
          console.log('uploadUrl', uploadUrl)
          // 首先将图片保存到 minIO
          createBook({
            author: state.author,
            name: state.name,
            isbn: state.isbn,
            intro: state.intro,
            press: state.press,
            price: state.price,
            picturePath: uploadUrl,
          }).then(({ id }) => {
            // 上传图片
            // minIOUpload({ objectPath: `books/${id}`, fileList: state.picturePath })
            resetForm()
            Toast.success('创建成功')
        })
        .catch(err => {
          console.error(err)
          throw err
        })
        .finally(() => Object.assign(state, { loading: false }))
      })
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
