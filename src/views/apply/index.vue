<template>
  <div>
    <Form class="apply-form">
      <CellGroup title="购书申请">
        <Form>
          <Field
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
          <div class="form-footer">
            <Button>重&nbsp;&nbsp;置</Button>
            <Button type='primary'>提&nbsp;&nbsp;交</Button>
          </div>
        </Form>
      </CellGroup>
    </Form>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { Form, CellGroup, Field, Button } from 'vant'

export default {
  name: 'Apply',
  components: {
    Form,
    CellGroup,
    Field,
    Button,
  },
  setup (){
    const state = reactive({
      name: '',
      author: '',
    })

    return {
      state,
    }
  }
}


</script>
