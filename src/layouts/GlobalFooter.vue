<template>
  <a-layout-footer>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />
      {{copyright}}
    </div>
  </a-layout-footer>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data() {
    return {};
  },
  computed: {
    copyright() {
      return this.$store.state.setting.copyright;
    }
  }
};
</script>