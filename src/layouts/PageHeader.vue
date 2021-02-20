<template>
  <div class="page-header">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item,index) in breadcrumb" :key="item.path">
          <span v-if="index === 0">
            <a href="#/">{{ item.meta.title || '首页' }}</a>
          </span>
          <span v-else>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="main">
      <div class="row flex">
        <div class="flex title-wrap">
          <h1 v-if="title && !content" class="title">{{title}}</h1>
          <div v-if="content" class="content">
            <slot name="content"></slot>
          </div>
        </div>
        <div class="action">
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    content() {
      return (this.$slots.content && this.$slots.content.length) || 0;
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;
  .main {
    flex: 0 1 auto;
    .title-wrap {
      flex: auto;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 0;
      }
    }
    .row {
      justify-content: space-between;
      // align-items: center;
      margin-bottom: 12px;
    }
  }
  .breadcrumb {
    margin-bottom: 16px;
  }
}
</style>