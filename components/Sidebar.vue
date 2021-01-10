<template>
  <a-layout-sider
    class="sidebar"
    width="255"
    v-model="collapsed"
    :trigger="null"
    collapsible
  >
    <a-menu
      class="menu"
      mode="inline"
      :default-selected-keys="['menu-inbox']"
      :default-open-keys="['menu-catagory']"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item key="menu-inbox">
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
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  props: ['collapsed']
}
</script>

<style lang="stylus">
$text-color = #202124
$text-color-selected = #d93025
$item-bg-seleted = #fce8e6
$item-bg-hover = #F1F3F4
$header-height = 64px

.sidebar
  position fixed
  background #fff
  height 100%
  left 0
  margin-top $header-height
  z-index 20
  transition all 0s
  .menu
    padding-right 18px
    margin-top 20px
    .anticon
      font-size 16px
    .ant-menu-item,
    .ant-menu-submenu-title
      height 33px
      line-height 33px
      margin 0
      border-radius 0 50px 50px 0
      &::after
        border-right none
      &:hover
        color $text-color
        background-color $item-bg-hover
      .text
        margin-left 5px
    .ant-menu-item-selected
      background-color $item-bg-seleted
      color $text-color-selected
      font-weight bold
      &:hover
        background-color $item-bg-seleted
        color $text-color-selected
    .ant-menu-submenu-selected .ant-menu-submenu-title
      color $text-color
</style>
