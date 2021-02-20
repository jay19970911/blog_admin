<template>
  <div>
    <page-header :breadcrumb="breadcrumb" :title="title" :logo="logo">
      <slot
        name="content"
        slot="content"
        v-if="$slots.content && $slots.content.length"
      ></slot>
      <!-- <div slot="content"></div> -->
      <slot name="action" slot="action"></slot>
    </page-header>
    <div ref="page" class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader';
export default {
  components: {
    PageHeader
  },
  data() {
    return {
      breadcrumb: [],
      title: '',
      logo: ''
    };
  },
  mounted() {
    this.getBreadcrumb();
    this.getPageHeaderInfo();
  },
  updated() {
    this.getBreadcrumb();
    this.getPageHeaderInfo();
  },
  methods: {
    getBreadcrumb() {
      // 获取面包屑的路由
      this.breadcrumb = this.$route.matched;
    },
    getPageHeaderInfo() {
      // 获取当前路由的name
      // console.log(this.$route.name, 88222);
      this.title = this.$route.meta.title;
    }
  }
};
</script>

<style lang="less" scoped>
.page-content {
  margin: 24px 24px 0;
}
</style>