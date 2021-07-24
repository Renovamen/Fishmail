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
      <a-menu-item key="menu-inbox" class="inbox" @click="select('inbox')">
        <img
          v-if="curSelect === 'inbox'"
          src="https://www.gstatic.com/images/icons/material/system/2x/inbox_gm_googlered600_20dp.png"
        />
        <img
          v-else
          src="https://www.gstatic.com/images/icons/material/system/2x/inbox_black_20dp.png"
        />
        <span class="text">收件箱</span>
      </a-menu-item>
      <a-menu-item key="menu-star" @click="select('star')">
        <img
          src="https://www.gstatic.com/images/icons/material/system/2x/grade_black_20dp.png"
        />
        <span class="text">已加星标</span>
      </a-menu-item>
      <a-menu-item key="menu-delay" @click="select('delay')">
        <img
          src="https://www.gstatic.com/images/icons/material/system/2x/watch_later_black_20dp.png"
        />
        <span class="text">已延后</span>
      </a-menu-item>
      <a-menu-item key="menu-important" @click="select('important')">
        <img
          src="https://www.gstatic.com/images/icons/material/system/2x/label_important_black_20dp.png"
        />
        <span class="text">重要邮件</span>
      </a-menu-item>
      <a-menu-item key="menu-outbox" @click="select('outbox')">
        <img
          src="https://www.gstatic.com/images/icons/material/system/2x/send_black_20dp.png"
        />
        <span class="text">已发邮件</span>
      </a-menu-item>
      <a-menu-item key="menu-manuscript" @click="select('manuscript')">
        <img
          src="https://www.gstatic.com/images/icons/material/system/2x/insert_drive_file_black_20dp.png"
        />
        <span class="text">草稿</span>
      </a-menu-item>
      <a-sub-menu key="menu-catagory">
        <span slot="title" class="title">
          <v-icon name="fa-tag" />
          <span class="text">类别</span>
        </span>
        <a-menu-item key="1" @click="select('people')">
          <img
            src="https://www.gstatic.com/images/icons/material/system/2x/people_black_20dp.png"
          />
          <span class="text">社交</span>
        </a-menu-item>
        <a-menu-item key="2" @click="select('info')">
          <img
            src="https://www.gstatic.com/images/icons/material/system/2x/info_black_20dp.png"
          />
          <span class="text">动态</span>
        </a-menu-item>
        <a-menu-item
          key="3"
          @click="
            select('forum');
            goGithub();
          "
        >
          <img
            src="https://www.gstatic.com/images/icons/material/system/2x/forum_black_20dp.png"
          />
          <span class="text">源码</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
const gitRepo = "https://github.com/Renovamen/Fishmail";

export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      curSelect: "inbox"
    };
  },
  watch: {
    collapsed(val) {
      this.isCollapsed = val;
    }
  },
  methods: {
    goGithub() {
      window.open(gitRepo);
    },
    select(value) {
      this.curSelect = value;
    }
  }
};
</script>

<style lang="stylus">
@import '@/assets/vars.styl'

.ant-tooltip img
  display none

.ant-menu-submenu-popup
  span.text
    margin-left 5px
  img
    height 20px
    width 20px
    opacity .54

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
    .ant-menu-item,
    .ant-menu-submenu .ant-menu-submenu-title
      color $text-color
      height 33px
      line-height 33px
      margin 0
      border-radius 0 50px 50px 0
      padding-left 27px !important
      display flex
      align-items center
      &::after
        border-right none
      &:hover
        color $text-color
        background-color $sidebar-bg-hover
      img
        height 20px
        width 20px
        opacity .54
      span.text
        margin-left 17px
        line-height 1
    .ant-menu-submenu .ant-menu-submenu-title
      span.title
        display flex
        align-items center
        .ov-icon
          margin-left 1px
          opacity .6
      .ant-menu-submenu-arrow
        &::before, &::after
          background $text-color
    .ant-menu-submenu .ant-menu-item
      padding-left 40px !important
    .ant-menu-item-selected
      background-color $sidebar-bg-hover
      font-weight bold
    .inbox.ant-menu-item-selected
      background-color $sidebar-bg-selected
      color $text-color-selected
      &:hover
        background-color $sidebar-bg-selected
        color $text-color-selected
      img
        opacity 1
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
