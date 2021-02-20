<template>
  <page-layout title="项目管理详情">
    <a-card>
      <a-form-model @submit.prevent="onSubmit" :model="form" ref="form">
        <a-form-model-item label="项目名称" v-bind="formItemLayout" prop="name">
          <a-input placeholder="请输入项目名称" v-model="form.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="头像" v-bind="formItemLayout" prop="cover">
          <a-input placeholder="请输入头像地址" v-model="form.cover"></a-input>
        </a-form-model-item>
        <a-form-model-item label="项目技术" v-bind="formItemLayout" prop="skill">
          <a-input placeholder="请输入项目技术" v-model="form.skill"></a-input>
        </a-form-model-item>
        <a-form-model-item
          label="项目分类"
          v-bind="formItemLayout"
          prop="project_tag"
        >
          <a-input placeholder="请输入项目分类" v-model="form.project_tag"></a-input>
        </a-form-model-item>
        <a-form-model-item label="组件库" v-bind="formItemLayout" prop="tool">
          <a-input placeholder="请输入组件库名称" v-model="form.tool"></a-input>
        </a-form-model-item>

        <a-form-model-item
          label="项目介绍"
          v-bind="formItemLayout"
          prop="introduce"
        >
          <a-input
            placeholder="请输入项目介绍"
            type="textarea"
            :rows="5"
            v-model="form.introduce"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item class="actions" v-bind="tailFormItemLayout">
          <a-button
            type="primary"
            @click="onSubmit"
            style="margin-right: 30px"
          >提交</a-button>
          <a-button @click="handleBack" style="margin-right: 30px">返回</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </page-layout>
</template>

<script>
import * as Api from '@/api/project';

export default {
  data() {
    const { id = '' } = this.$route.query;
    return {
      form: {},
      id
    };
  },
  computed: {},
  mounted() {
    this.id && this.fetchData();
  },
  methods: {
    async fetchData() {
      const { data } = await Api.detail(this.id);
      const d = { ...data.data };
      this.form = d;
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const f = { ...this.form };
        if (this.id) {
          f.id = this.id;
          await Api.update(f);
          this.$message.success('编辑成功');
        } else {
          await Api.add(f);
          this.$message.success('添加成功');
        }
        this.$router.back();
      });
    },
    handleBack() {
      this.$router.back();
    }
  }
};
</script>

<style>
</style>