<template>
  <div>
    <a-layout-sider
      class="global-sider-container"
      v-model="collapsed"
      :width="256"
      :trigger="null"
      collapsible
    >
      <sider-menu :collapsed="collapsed" />
    </a-layout-sider>
  </div>
</template>

<script>
import SiderMenu from './menu';
export default {
  components: {
    SiderMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.global-sider-container {
  height: 100%;
}
</style>