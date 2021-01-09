<template>
  <a-layout class="mail-layout">
    <Header @toggle-collapsed="toggleCollapsed" />
    <a-layout>
      <Sidebar :collapsed="collapsed" />
      <SidebarRight />
      <a-layout class="mailbox">
        <a-layout-content class="content">
          <Nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import SidebarRight from '../components/SidebarRight.vue'

export default {
  components: { 
    Header,
    Sidebar,
    SidebarRight
  },
  data() {
    return {
      collapsed: false,
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="stylus">
$sidebar-width = 255px
$sidebar-width-right = 55px
$header-height = 64px

.mail-layout
  height 100vh
  .mailbox
    margin-left $sidebar-width
    margin-right $sidebar-width-right
    margin-top $header-height
    height calc(100% - 64px)
    .content
      background #fff
      margin 0
      height 100%
</style>
