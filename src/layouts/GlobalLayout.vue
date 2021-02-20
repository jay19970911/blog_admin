<template>
  <a-layout style="min-height:100vh;">
    <global-sider-menu :collapsed="collapsed" />
    <a-layout>
      <global-header
        @change="() => (collapsed = !collapsed)"
        :collapsed="collapsed"
      />
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer style="padding: 0;text-align:center;">
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from './GlobalHeader';
import GlobalSiderMenu from './GlobalSiderMenu';
import GlobalFooter from './GlobalFooter';
export default {
  name: 'GlobalLayout',
  components: {
    GlobalHeader,
    GlobalSiderMenu,
    GlobalFooter
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    copyright() {
      // return this.$store.state.setting.copyright;
      console.log(this.$store.state, 88);
    }
  }
};
</script>

<style lang="less" scoped>
</style>