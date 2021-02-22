<template>
  <a-layout-header class="global-header-container">
    <a-icon
      class="trigger"
      :type="newCollapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handleClick"
    />
    <div class="global-header-login">
      <a-dropdown class="navUser-wrppaer">
        <div>
          <img
            class="avatar"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F17%2F20170217221145_aMtmh.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613804496&t=3b54870d25673cc6beb3100911fe59af"
            alt
          />
          <span class="user-name">Admin</span>
        </div>

        <a-menu slot="overlay">
          <a-menu-item>
            <span @click.self="logout">退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    collapsed: {
      handler() {
        this.newCollapsed = this.collapsed;
      }
    }
  },
  data() {
    return {
      newCollapsed: this.collapsed
    };
  },
  methods: {
    handleClick() {
      this.$emit('change', !this.newCollapsed);
    },
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="less" scoped>
.global-header-container {
  background: #fff;
  padding: 0 24px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .global-header-login {
    cursor: pointer;
    line-height: 64px;
    &:hover {
      .header-avatar {
        display: block;
      }
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0;
    cursor: pointer;
    transition: color 0.3s;
  }
  .header-avatar {
    position: absolute;
    top: 64px;
    right: 0;
    display: none;
  }
}
</style>