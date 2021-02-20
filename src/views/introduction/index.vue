<template>
  <page-layout>
    <a-card>
      <a-button class="add-btn" type="primary" @click="handleEdit">新建</a-button>
      <a-table
        :pagination="false"
        :dataSource="dataSource"
        :columns="columns"
        rowKey="id"
      >
        <template #action="text,record">
          <div class="action-box">
            <span class="primary" type="primary" @click="handleEdit(record)">编辑</span>
            <span class="danger" type="danger" @click="handleRemove(record)">删除</span>
          </div>
        </template>
      </a-table>
      <a-modal
        v-if="visible"
        :maskClosable="false"
        :destroyOnClose="true"
        :title="form.id ? '编辑' : '添加'"
        v-model="visible"
        @ok="onSubmit"
        :width="800"
      >
        <a-form-model
          ref="form"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          @submit.prevent="onSubmit"
        >
          <a-form-model-item label="姓名">
            <a-input placeholder="请输入姓名" v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="基本信息">
            <a-input placeholder="请输入基本信息" v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="头像">
            <a-input placeholder="请上传头像" v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="毕业院校">
            <a-input placeholder="请输入毕业院校" v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="手机号码">
            <a-input placeholder="请输入手机号码" v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="政治面貌">
            <a-input placeholder="请输入政治面貌" v-model="form.name"></a-input>
          </a-form-model-item>
          <a-form-model-item label="简介">
            <a-input
              placeholder="请输入简介"
              v-model="form.name"
              type="textarea"
              :rows="5"
            ></a-input>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </page-layout>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [],
      form: {},
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      visible: false
    };
  },
  computed: {
    columns() {
      return [
        { title: '姓名', dataIndex: 'name' },
        { title: '基本信息', dataIndex: 'info' },
        { title: '头像', dataIndex: 'cover' },
        { title: '毕业院校', dataIndex: 'college' },
        { title: '手机号码', dataIndex: 'phone' },
        { title: '政治面貌', dataIndex: 'face' },
        { title: '简介', dataIndex: 'intro' },
        { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
      ];
    }
  },
  methods: {
    handleEdit(row = {}) {
      const r = { ...row };
      this.form = r;
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    handleRemove(record) {
      console.log(record);
    },
    onSubmit() {}
  }
};
</script>

<style>
</style>