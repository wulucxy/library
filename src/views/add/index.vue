<template>
  <div class="page addbook-page">
    <Form class="addbook-form" ref="formRef" validate-trigger="onSubmit">
      <CellGroup title="图书录入" :border="false">
        <Field
          :disabled="disabledField"
          ref="nameRef"
          required
          v-model="state.name"
          label="书名"
          placeholder="请输入书名"
          :rules="[{ required: true, message: '请输入书名' }]"
        />
        <Field
          :disabled="disabledField"
          v-model="state.author"
          required
          label="作者"
          placeholder="请输入作者"
          :rules="[{ required: true, message: '请输入作者' }]"
        />
        <Field
          :disabled="disabledField"
          v-model="state.press"
          required
          label="出版社"
          placeholder="请输入出版社"
          :rules="[{ required: true, message: '请输入出版社' }]"
        />
        <Field
          :disabled="disabledField"
          v-model="state.isbn"
          required
          label="ISBN 码"
          placeholder="请输入 ISBN"
          :rules="[{ required: true, message: '请输入 ISBN' }]"
        />
        <Field
          :disabled="disabledField"
          v-model="state.price"
          label="价格"
          type='number'
          placeholder="请输入价格"
        />
        <Field
          :disabled="disabledField"
          v-model="state.intro"
          rows="2"
          label="图书描述"
          type="textarea"
          placeholder="请输入图书描述"
        />
        <Field
          :disabled="disabledField"
          v-model="state.authorIntro"
          rows="1"
          label="作者简介"
          type="textarea"
          placeholder="请输入作者简介"
        />
        <Field
          :disabled="disabledField"
          v-model="state.catalog"
          rows="1"
          label="目录简介"
          type="textarea"
          placeholder="请输入目录简介"
        />
        <Field label="图书封面" :disabled="disabledField">
          <template #input>
            <Uploader v-model="state.picturePath" :max-count="1" :disabled="disabledField" />
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
          loading-text="提交中..."
          type='primary'
        >提&nbsp;交</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import { reactive, ref, computed } from 'vue'
import { Form, CellGroup, Cell, Icon, Field, Button, Uploader, Toast } from 'vant'
import { isNil, clone } from 'lodash'

import { ISBNScan } from '@/utils'
import { createBook, uploadImg, createInstance } from '@/api'

const CONST = require('@/utils/const')

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

    const initialState = {
      name: '',
      author: '',
      press: '',
      price: undefined,
      isbn: '',
      intro: '',
      authorIntro: '',
      catalog: '',
      picturePath: [],
      bookId: null,
      loading: false,
    }

    const state = reactive(clone(initialState))

    const disabledField = computed(() => !isNil(state.bookId))
    // 根据图片地址生成文件路径
    const generatefileList = (imgs) => imgs.map(d => ({
      url: d,
      isImage: true
    }))

    // 智能识别二维码
    const handleDetect = () => {
      Toast({
        message: '自动识别中',
        duration: 0
      })
      ISBNScan({
        onSuccess: (res) => {
          Toast.clear();
          Object.assign(state, {
            author: res.bookInfo['作者'],
            name: res.title,
            press: res.bookInfo['出版社'],
            isbn: res.isbn,
            price: parseFloat(res.bookInfo['定价']) || res.bookInfo['定价'],
            intro: res.bookIntro,
            authorIntro: res.authorIntro,
            catalog: res.catalog,
            picturePath: generatefileList([res.coverUrl]),
          })
          // 对应ISBN 已完成录入，字段不可编辑
          if (!isNil(res.id)) {
            Object.assign(state, {
              bookId: res.id,
              picturePath: generatefileList([`${CONST.uploadBaseUrl}${res.coverUrl}`]),
            })
          } else {
            // todo: ios 无法触发
            nameRef.value.$el?.querySelector('input').focus()
          }
        },
        onFail: err => {
          Toast.clear();
          throw err;
        }
      })
    }

    const resetForm = () => {
      Object.assign(state, initialState)
    }

    const onSubmit = () => {
      Object.assign(state, {
        loading: true
      })

      formRef.value.validate()
        .then(async () => {
          // 如果图书id 已存在，去实例化该图书
          if (!isNil(state.bookId)) {
            return createInstance(state.bookId)
          } else {
            const uploadUrl = await uploadImg({url: state.picturePath[0] })
            return createBook({
              author: state.author,
              name: state.name,
              isbn: state.isbn,
              intro: state.intro,
              authorIntro: state.authorIntro,
              catalog: state.catalog,
              press: state.press,
              price: Number(state.price) * 100,
              picturePath: uploadUrl,
            })
          }  
      })
      .then(() => {
        // 上传图片
        resetForm()
        Toast.success('创建成功')
      })
      .catch(err => {
        console.error(err)
        throw err
      })
      .finally(() => Object.assign(state, { loading: false }))
    }

    return {
      nameRef,
      formRef,
      state,
      disabledField,
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
