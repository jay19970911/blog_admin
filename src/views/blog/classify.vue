<template>
  <page-layout>
    <a-card>
      <a-button class="add-btn" type="primary" @click="handleEdit">+ 新建</a-button>
      <a-table
        :pagination="false"
        :dataSource="dataSource"
        :columns="columns"
        rowKey="id"
      >
        <template #status="status, record">
          <a-switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            @change="changeStatus(record)"
            :checked="Boolean(record.status)"
          />
        </template>
        <template #action="text,record">
          <div class="action-box">
            <span class="primary" type="primary" @click="handleEdit(record)">编辑</span>
            <span class="danger" type="danger" @click="handleRemove(record)">删除</span>
          </div>
        </template>
      </a-table>
      <my-pagination :payload="payload" :total="total"></my-pagination>
      <a-modal
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
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          @submit.prevent="onSubmit"
        >
          <a-form-model-item label="类型名">
            <a-input placeholder="请输入类型名" v-model="form.cate_name"></a-input>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/blog';
export default {
  data() {
    const { page = '1', per_page = '12' } = this.$route.query;
    return {
      dataSource: [],
      form: {},
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      visible: false,
      payload: {
        page: Number(page),
        per_page: Number(per_page)
      },
      total: 0
    };
  },
  computed: {
    columns() {
      return [
        { title: '类型名', dataIndex: 'cate_name' },
        { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' } },
        { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
      ];
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList() {
      const { data } = await Api.cateList(this.payload);
      this.dataSource = data.list;
      this.total = data.total;
    },
    handleEdit(row = {}) {
      const r = { ...row };
      this.form = r;
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    handleRemove(record) {
      this.$confirm({
        title: '删除',
        content: `您确定要删除吗？`,
        onOk: async () => {
          await Api.cateRemove(record.id);
          this.$message.success('删除数据成功');
          this.fetchList();
        }
      });
    },
    async changeStatus({ id, status }) {
      await Api.change({ id, status });
      this.fetchList();
      this.$message.success(`${status ? '关闭成功' : '打开成功'}`);
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const f = { ...this.form };
        const { id } = this.form;
        if (id) {
          f.id = id;
          await Api.cateUpdate(f);
          this.$message.success('编辑成功');
        } else {
          await Api.cateAdd(f);
          this.$message.success('创建成功');
        }
        this.visible = false;
        this.fetchList();
      });
    }
  }
};
</script>

<style>
</style>