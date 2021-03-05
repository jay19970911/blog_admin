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
          label="项目开始时间"
          v-bind="formItemLayout"
          prop="created_at"
        >
          <a-date-picker v-model="form.created_at"></a-date-picker>
        </a-form-model-item>

        <a-form-model-item label="项目结束时间" v-bind="formItemLayout" prop="end_at">
          <a-date-picker v-model="form.end_at"></a-date-picker>
        </a-form-model-item>

        <a-form-model-item
          label="项目描述"
          v-bind="formItemLayout"
          prop="desc_info"
        >
          <a-input
            placeholder="请输入项目描述"
            type="textarea"
            :rows="4"
            v-model="form.desc_info"
          ></a-input>
        </a-form-model-item>

        <a-form-model-item label="负责模块" v-bind="formItemLayout">
          <a-input
            placeholder="请输入负责模块"
            type="textarea"
            :rows="5"
            v-model="form.modules"
          ></a-input>
        </a-form-model-item>

        <a-form-model-item label="作品图集" v-bind="formItemLayout"></a-form-model-item>

        <a-form-model-item
          label="项目代码"
          v-bind="formItemLayout"
          prop="introduce"
        >
          <Editor
            id="tinymce"
            apiKey="2cxmq3i3ilepgtbvle7c6ltaklf6r6fssrxjvsgaa6twfgdc"
            v-model="form.introduce"
            :init="init"
          ></Editor>
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

import moment from 'moment';

import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme';
import 'tinymce/skins/ui/oxide/skin.css';

import 'tinymce/plugins/preview';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/quickbars';

export default {
  components: {
    Editor
  },
  data() {
    const { id = '' } = this.$route.query;
    return {
      form: {},
      id,
      init: {
        id: 'tiny-iframe',
        // height: this.height, // 编辑器高度
        height: 600,
        language: 'zh_CN',
        language_url: '/tinymce/langs/zh_CN.js',
        skin_url: '/static/tinymce/skins/lightgray', // skin路径
        menubar: true, // 顶部菜单栏显示
        plugins: ['preview importcss fullscreen image link media codesample quickbars'],
        file_picker_types: 'media',
        fontsize_formats: '10px 12px 14px 16px 18px 24px 36px 48px',
        // branding: false, // 是否禁用“Powered by TinyMCE”
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false
      }
    };
  },
  computed: {},
  mounted() {
    tinymce.init({});
    this.id && this.fetchData();
  },
  methods: {
    moment,
    async fetchData() {
      const { data } = await Api.detail(this.id);
      const d = { ...data };
      this.form = d;
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const f = { ...this.form };
        f.created_at = f.created_at ? moment(f.created_at).format('YYYY-MM-DD') : '';
        f.end_at = f.end_at ? moment(f.end_at).format('YYYY-MM-DD') : '';
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