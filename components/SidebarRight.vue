<template>
  <a-layout-sider class="sidebar-right" width="55">
    <a-button>
      <img
        src="https://www.gstatic.com/companion/icon_assets/calendar_2020q4_2x.png"
      />
    </a-button>
    <a-button>
      <img
        src="https://www.gstatic.com/companion/icon_assets/keep_2020q4v3_2x.png"
      />
    </a-button>
    <a-button>
      <img src="https://www.gstatic.com/companion/icon_assets/tasks2_2x.png" />
    </a-button>
    <a-button>
      <img
        src="https://www.gstatic.com/companion/icon_assets/contacts_2x.png"
      />
    </a-button>

    <div class="separator" />

    <a-button>
      <img
        src="https://www.gstatic.com/images/icons/material/system/1x/add_grey600_24dp.png"
      />
    </a-button>
  </a-layout-sider>
</template>

<style lang="stylus">
@import '@/assets/vars.styl'

.sidebar-right
  position fixed
  background #fff
  height 100%
  right 0
  margin-top $header-height
  border-left $border
  text-align center
  padding-top 8px
  z-index 20
  button
    width 40px
    height 40px
    margin-bottom 16px
    img
      height 20px
      width 20px
      margin-top -2px
  .separator
    margin 8px auto 24px
    width 20px
    border-top $border

@media (max-width: 768px)
  .sidebar-right
    display none
</style>
