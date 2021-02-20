<template>
  <page-layout>
    <a-card>
      <a-button type="primary" class="add-btn" @click="handleEdit">+ 新建</a-button>
      <a-table
        :pagination="false"
        :dataSource="dataSource"
        :columns="columns"
        rowKey="id"
      >
        <template #action="text,record">
          <div class="action-box">
            <span type="primary" class="primary" @click="handleEdit(record)">编辑</span>
            <span class="danger" type="danger" @click="handleRemove(record)">删除</span>
          </div>
        </template>
      </a-table>
    </a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/project';
export default {
  data() {
    return {
      dataSource: []
    };
  },
  computed: {
    columns() {
      return [
        { title: '编号', dataIndex: 'id' },
        { title: '项目名称', dataIndex: 'name' },
        { title: '封面', dataIndex: 'cover' },
        { title: '技术', dataIndex: 'skill' },
        { title: '组件库', dataIndex: 'tool' },
        { title: '项目分类', dataIndex: 'project_tag' },
        { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
      ];
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList() {
      const { data = {} } = await Api.list();
      this.dataSource = data.list;
    },
    handleEdit(row = {}) {
      const r = { ...row };
      this.$router.push({
        path: '/project/detail',
        query: { id: row.id || '' }
      });
    },
    handleRemove(record) {
      this.$confirm({
        title: '删除',
        content: `您确定要删除吗？`,
        onOk: async () => {
          await Api.remove(record.id);
          this.$message.success('删除数据成功');
          this.fetchList();
        }
      });
    }
  }
};
</script>

<style>
</style>