<template>
  <page-layout title="文章管理详情">
    <a-card>
      <a-form-model @submit.prevent="onSubmit" :model="form" ref="form">
        <a-form-model-item label="博客标题" v-bind="formItemLayout" prop="title">
          <a-input placeholder="请输入博客标题" v-model="form.title"></a-input>
        </a-form-model-item>
        <a-form-model-item label="副标题" v-bind="formItemLayout" prop="subtitle">
          <a-input placeholder="请输入副标题" v-model="form.subtitle"></a-input>
        </a-form-model-item>
        <a-form-model-item label="分类" v-bind="formItemLayout" prop="cate_name">
          <a-select placeholder="请输入分类" v-model="form.cate_name">
            <a-select-option
              v-for="item in cateList"
              :key="String(item.id)"
            >{{ item.cate_name}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="头像" v-bind="formItemLayout" prop="cover">
          <a-input placeholder="请输入头像地址" v-model="form.cover"></a-input>
        </a-form-model-item>
        <a-form-model-item label="完成时间" v-bind="formItemLayout" prop="date">
          <a-date-picker showTime placeholder="请选择完成时间" v-model="form.date"></a-date-picker>
        </a-form-model-item>
        <a-form-model-item label="点赞数" v-bind="formItemLayout" prop="likes_num">
          <a-input placeholder="请输入点赞数" v-model="form.likes_num"></a-input>
        </a-form-model-item>

        <a-form-model-item
          label="评论数"
          v-bind="formItemLayout"
          prop="contents_num"
        >
          <a-input placeholder="请输入评论数" v-model="form.contents_num"></a-input>
        </a-form-model-item>

        <a-form-model-item label="浏览数" v-bind="formItemLayout" prop="views_num">
          <a-input placeholder="请输入浏览数" v-model="form.views_num"></a-input>
        </a-form-model-item>

        <a-form-model-item label="正文" v-bind="formItemLayout" name="content">
          <md-editor class="editor" type="markdown" v-model="form.content"></md-editor>
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
import * as Api from '@/api/blog';
import moment from 'moment';

import MdEditor from '@/common/md-editor';
import { mapState } from 'vuex';
export default {
  components: {
    MdEditor
  },
  data() {
    const { id = '' } = this.$route.query;
    return {
      form: {},
      id
    };
  },
  computed: {
    ...mapState({
      cateList: state => state.blog.cateList
    })
  },
  mounted() {
    this.$store.dispatch('fetchCateList');
    this.id && this.fetchData();
  },
  methods: {
    moment,
    async fetchData() {
      const { data = {} } = await Api.detail(this.id);
      const d = { ...data };
      this.form = d;
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const f = { ...this.form };
        console.log(f);
        f.date = f.date ? moment(f.date).format('YYYY-MM-DD HH:mm:ss') : '';
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