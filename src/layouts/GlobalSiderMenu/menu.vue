<template>
  <div class="sider-menu-container">
    <div class="systemName" v-if="!collapsed">{{ systemName }}</div>
    <div class="avatar" v-else>
      <my-image :src="avatar" width="60px" height="60px" />
    </div>
    <a-menu
      @click="handleClick"
      theme="dark"
      mode="inline"
      :selectedKeys="selectedKeys"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from './submenu';

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SubMenu
  },
  computed: {
    systemName() {
      return this.$store.state.setting.title;
    },
    avatar() {
      return this.$store.state.setting.avatar;
    },
    menuList() {
      const { children = [] } = this.$router.options.routes[0];
      // return children.filter(item => !item.invisible);
      return children;
    },
    selectedKeys() {
      return [this.$route.path];
    }
  },
  methods: {
    handleClick({ key: path }) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
.sider-menu-container {
  .systemName {
    height: 64px;
    font-size: 24px;
    padding: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>