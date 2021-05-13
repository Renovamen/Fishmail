<template>
  <a-layout-sider
    v-model="isCollapsed"
    class="sidebar"
    width="255"
    collapsed-width="73"
    :trigger="null"
    collapsible
  >
    <div class="write-email-box">
      <div class="write-email">
        <span class="text">写邮件</span>
      </div>
    </div>
    <a-menu
      class="menu"
      mode="inline"
      :default-selected-keys="['menu-inbox']"
      :default-open-keys="['menu-catagory']"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item key="menu-inbox" class="inbox">
        <a-icon type="inbox" />
        <span class="text">收件箱</span>
      </a-menu-item>
      <a-menu-item key="menu-star">
        <a-icon type="star" />
        <span class="text">已加星标</span>
      </a-menu-item>
      <a-menu-item key="menu-delay">
        <a-icon type="clock-circle" />
        <span class="text">已延后</span>
      </a-menu-item>
      <a-menu-item key="menu-important">
        <a-icon type="flag" />
        <span class="text">重要邮件</span>
      </a-menu-item>
      <a-menu-item key="menu-outbox">
        <a-icon type="rocket" />
        <span class="text">已发邮件</span>
      </a-menu-item>
      <a-menu-item key="menu-manuscript">
        <a-icon type="file" />
        <span class="text">草稿</span>
      </a-menu-item>
      <a-sub-menu key="menu-catagory">
        <span slot="title">
          <a-icon type="tag" />
          <span class="text">类别</span>
        </span>
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="text">社交</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="info-circle" />
          <span class="text">动态</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a target="_blank" href="https://github.com/Renovamen/Fishmail">
            <a-icon type="github" />
            <span class="text">源码</span>
          </a>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed
    };
  },
  watch: {
    collapsed(val) {
      this.isCollapsed = val;
    }
  }
};
</script>

<style lang="stylus">
@import '@/assets/vars.styl'

.sidebar
  position fixed
  background #fff
  height 100%
  left 0
  margin-top $header-height
  z-index 20
  transition all 0s
  .write-email-box
    display flex
    height 48px
    margin 16px 0
    padding 0 0 0 8px
    color $text-color
    .write-email
      box-shadow 0 1px 2px 0 rgba(60, 64 67, 0.302),
                  0 1px 3px 1px rgba(60, 64, 67, 0.149)
      letter-spacing 0.25px
      align-items center
      display inline-flex
      height 48px
      min-width 56px
      overflow hidden
      padding 0 24px 0 0
      border-radius 24px
      cursor pointer
      transition box-shadow 0.15s, background-color 0.15s
      &:hover
        box-shadow 0 1px 2px 0 rgba(60, 64 67, 0.3),
                    0 1px 3px 1px rgba(60, 64, 67, 0.1),
                    0 3px 8px 4px rgba(60, 64 67, 0.13)
        background-color #fafafb
      &::before
        content ''
        display block
        height 48px
        min-width 56px
        background-position center
        background-repeat no-repeat
        background-size 32px
        background-image url(https://www.gstatic.com/images/icons/material/colored_icons/2x/create_32dp.png)
  .menu
    padding-right 18px
    width $sidebar-width
    .anticon
      font-size 16px
      color #767676
    .ant-menu-item,
    .ant-menu-submenu .ant-menu-submenu-title
      color $text-color
      height 33px
      line-height 33px
      margin 0
      border-radius 0 50px 50px 0
      padding-left 27px !important
      &::after
        border-right none
      &:hover
        color $text-color
        background-color $sidebar-bg-hover
      a
        color $text-color
      .text
        margin-left 5px
    .ant-menu-submenu .ant-menu-item
      padding-left 40px !important
    .ant-menu-item-selected
      background-color $sidebar-bg-hover
      font-weight bold
    .inbox.ant-menu-item-selected
      background-color $sidebar-bg-selected
      color $text-color-selected
      .anticon
        color $text-color-selected
      &:hover
        background-color $sidebar-bg-selected
        color $text-color-selected
    .ant-menu-submenu-selected .ant-menu-submenu-title
      color $text-color
  &.ant-layout-sider-collapsed
    .write-email-box
      .write-email
        width 56px
        height 56px
        border-radius 28px
        margin-top -4px
        .text
          display none
        &::before
          width 56px
          height 56px
    .menu
      width $sidebar-width-collapsed
</style>
