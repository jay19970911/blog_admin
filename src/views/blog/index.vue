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
        <template #cover="text">
          <my-image :src="text"></my-image>
        </template>
        <template #action="text,record">
          <div class="action-box">
            <span class="primary" type="primary" @click="handleEdit(record)">编辑</span>
            <span class="danger" type="danger" @click="handleRemove(record)">删除</span>
          </div>
        </template>
      </a-table>
      <my-pagination :payload="payload" :total="total"></my-pagination>
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
        { title: '编号', dataIndex: 'id' },
        { title: '标题', dataIndex: 'title' },
        { title: '副标题', dataIndex: 'subtitle' },
        { title: '图片', dataIndex: 'cover', scopedSlots: { customRender: 'cover' } },
        { title: '获赞数', dataIndex: 'likes_num' },
        { title: '评论数', dataIndex: 'contents_num' },
        { title: '浏览数', dataIndex: 'views_num' },
        { title: '创建日期', dataIndex: 'date' },
        { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } }
      ];
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList() {
      const { list, total } = await Api.list(this.payload);
      this.dataSource = list;
      this.total = total;
    },
    handleEdit(row = {}) {
      this.$router.push({
        path: '/blog/detail',
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