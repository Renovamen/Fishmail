<template>
  <a-layout-header class="header">
    <div class="sitename">
      <a-button
        class="sidebar-togger"
        @click="$emit('toggle-collapsed')"
      >
        <a-icon type="menu" />
      </a-button>
      <div class="logo">
        <img src="/logo.png" />
      </div>
    </div>
    <div class="toolbar">
      <a-input
        class="search-box"
        placeholder="搜索邮件"
      >
        <a-icon slot="prefix" type="search" />
        <a-tooltip
          slot="suffix"
          title="显示搜索选项"
        >
          <a-icon type="caret-down" />
        </a-tooltip>
      </a-input>
      <div class="info">
        <a-button>
          <a-icon type="question-circle" />
        </a-button>
        <a-button>
          <a-icon type="setting" />
        </a-button>
        <a-button>
          <a-icon type="appstore" />
        </a-button>
        <a-button class="avatar">
          <img src="/avatar.svg" />
        </a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<style lang="stylus">
$sidebar-width = 255px
$header-height = 64px

.header
  position fixed
  width 100%
  background #fff
  border-bottom 1px solid #eee
  padding 0
  display flex
  z-index 30
  .sitename
    width $sidebar-width
    padding 0 13px
    display inline-block
    .sidebar-togger
      width 45px
      height 45px
      margin-top 9px
      margin-left 0
      .anticon
        font-size 18px
        margin-top 3px
    .logo
      width 178px
      float right
      img
        width 109px
        height 40px
        margin-top -3px
  .toolbar
    line-height $header-height
    border-bottom none
    display inline-block
    display flex
    flex 1
    .search-box
      padding 8px 0
      width 724px
      .anticon
        color #5F6368
      .ant-input-prefix
        left 20px
        .anticon
          font-size 19px
      .ant-input-suffix
        right 22px
      input
        height 100%
        border-radius 8px
        padding 0 58px
        font-size 16px
        background #F1F3F4
        border none
        &:focus
          background transparent
          box-shadow 0 1px 1px 0 rgba(65, 69, 73, 0.3), 0 1px 3px 0 rgba(65, 69, 73, 0.15)
          -webkit-box-shadow 0 1px 1px 0 rgba(65, 69, 73, 0.3), 0 1px 3px 0 rgba(65, 69, 73, 0.15)
    .info
      display flex
      flex 1
      justify-content flex-end
      align-items center
      padding 0 15px
      button
        width 40px
        height 40px
        margin-left 5px
        .anticon
          font-size 20px
          margin-top 5px
      .avatar
        margin-left 8px
        img
          width 33px
          height 33px
          border-radius 50%
</style>
