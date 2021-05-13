<template>
  <a-layout-header class="header">
    <div class="sitename">
      <a-tooltip title="主菜单" placement="bottom">
        <a-button class="sidebar-togger" @click="$emit('toggle-collapsed')">
          <v-icon name="md-menu-round" scale="1.2" />
        </a-button>
      </a-tooltip>
      <div class="logo">
        <img src="/logo.png" />
      </div>
    </div>
    <div class="toolbar">
      <div class="search-box">
        <a-input placeholder="搜索邮件">
          <a-tooltip slot="prefix" title="搜索" placement="bottom">
            <a-button>
              <v-icon name="md-search" scale="1.1" />
            </a-button>
          </a-tooltip>
          <a-tooltip slot="suffix" title="显示搜索选项" placement="bottom">
            <a-button>
              <v-icon name="md-arrowdropdown" scale="1.1" />
            </a-button>
          </a-tooltip>
        </a-input>
      </div>
      <div class="info">
        <a-tooltip title="支持" placement="bottom">
          <a-button>
            <v-icon name="bi-question-circle" scale="1.2" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="设置" placement="bottom">
          <a-button>
            <v-icon name="oi-gear" scale="1.2" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="Google 应用" placement="bottom">
          <a-button @click="toggleDisableImage()">
            <v-icon
              v-if="disableImage"
              name="md-imagenotsupported-round"
              scale="1.1"
            />
            <v-icon v-else name="md-image" scale="1.1" />
          </a-button>
        </a-tooltip>
        <a-button class="avatar">
          <img src="/avatar.svg" />
        </a-button>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    disableImage: (state) => state.disableImage
  }),
  methods: {
    toggleDisableImage() {
      this.$store.commit("toggleDisableImage");
    }
  }
};
</script>

<style lang="stylus">
@import '@/assets/vars.styl'

.header
  position fixed
  width 100%
  background #fff
  border-bottom $border
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
      display flex
      flex 1
      .ant-input-affix-wrapper
        max-width 724px
        padding 8px 0
        button
          width 38px
          height 38px
          .ov-icon
            color $icon-color
          &:hover,
          &:active,
          &:focus
            background #E2E5E6
        .ant-input-prefix
          left 10px
        .ant-input-suffix
          right 10px
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
      width 210px
      justify-content flex-end
      align-items center
      padding-right 13px
      display flex
      button
        width 40px
        height 40px
        margin-left 5px
        display flex
        align-items center
        justify-content center
      .avatar
        margin-left 8px
        img
          width 33px
          height 33px
          border-radius 50%
  @media (max-width: 768px)
    .sitename .logo,
    .toolbar .info
      display none
    .sitename
      width 73px
    .toolbar
      padding-right 5px
</style>
