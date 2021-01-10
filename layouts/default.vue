<template>
  <a-layout class="mail-layout">
    <Header @toggle-collapsed="toggleCollapsed" />
    <a-layout :class="{ 'side-collapsed': collapsed }">
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
$sidebar-width-collapsed = 80px
$sidebar-width-right = 55px
$header-height = 64px

body
  font-family Helvetica, Arial, sans-serif

.mail-layout
  height 100vh
  button
    padding 0
    border-radius 50%
    transition all 0s
    border none
    box-shadow none
    color #5F6368
    &:hover,
    &:active,
    &:focus
      background #EFF0F0
      color #5F6368
  .mailbox
    margin-left $sidebar-width
    margin-right $sidebar-width-right
    margin-top $header-height
    height calc(100% - 64px)
    background #fff
    &::-webkit-scrollbar
      width 10px
    &::-webkit-scrollbar-thumb
      background #CCCCCC
      border 1px solid #B8B8B8
    .content
      margin 0
      height 100%
      .header
        width calc(100% - 255px - 55px)
        z-index 10
        height 48px
        display flex
        flex 1
        align-items center
        button
          width 38px
          height 38px
          transition all 0.2s
          &:hover
            color #202020
          .anticon
            font-size 16px
            margin-top 3px
        .pagination
          display flex
          flex 1
          justify-content flex-end
          .num
            font-size 12px
            display flex
            align-items center
          .pager
            margin-left 10px
            button
              margin-right -2px
              .anticon
                font-size 10px
  .side-collapsed
    .mailbox
      margin-left $sidebar-width-collapsed
      .content .header
        width calc(100% - 80px - 55px)
</style>
