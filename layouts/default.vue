<template>
  <a-layout class="mail-layout">
    <Header @toggle-collapsed="toggleCollapsed" />
    <a-layout :class="{ 'side-collapsed': collapsed }">
      <Sidebar :collapsed="collapsed" @toggle-collapsed="toggleCollapsed" />
      <SidebarRight />
      <a-layout class="mailbox">
        <a-layout-content class="content">
          <Nuxt keep-alive />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import SidebarRight from "../components/SidebarRight.vue";

export default {
  components: {
    Header,
    Sidebar,
    SidebarRight
  },
  data() {
    return {
      collapsed: false,
      screenWidth: 0
    };
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    this.collapsed = this.screenWidth <= 768 ? true : false;

    const that = this;
    window.onresize = () => {
      return (() => {
        that.screenWidth = document.body.clientWidth;
        that.collapsed = that.screenWidth <= 768 ? true : false;
      })();
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="stylus">
@import '@/assets/vars.styl'

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
    color $icon-color
    background transparent
    &:hover,
    &:active,
    &:focus
      background #EFF0F0
      color $icon-color
    .ov-icon
      margin-top 2px
  .mailbox
    margin-left $sidebar-width
    margin-right $sidebar-width-right
    margin-top $header-height + $page-header-height
    height calc(100% - 64px - 48px)
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
        height $page-header-height
        margin-top (- $page-header-height)
        display flex
        flex 1
        align-items center
        button
          width 38px
          height 38px
          transition all 0.2s
          display flex
          align-items center
          justify-content center
          &:hover
            color #202020
        .operation
          display flex
          flex-direction row
          align-items center
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
            display flex
            flex-direction row
            button
              margin-right -2px
  .side-collapsed
    .mailbox
      margin-left $sidebar-width-collapsed
      .content .header
        width calc(100% - 73px - 55px)

  @media (max-width: 768px)
    .mailbox
      margin-left $sidebar-width-collapsed
      margin-right 0
      &::-webkit-scrollbar
        width 5px
      &::-webkit-scrollbar-thumb
        border-radius 3px
      .content .header
        width calc(100% - 73px)
    .side-collapsed .mailbox .content .header
      width calc(100% - 73px)

.ant-tooltip
  .ant-tooltip-arrow
    display none
  .ant-tooltip-inner
    font 500 12px 'Roboto', arial, sans-serif
    padding 4px 8px
    min-height 14px
    min-width auto
    line-height 16px
    letter-spacing 0.8px
    margin-top -6px
    background rgba(60, 64, 67, 0.9)
</style>
