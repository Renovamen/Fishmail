<template>
  <div class="article-page">
    <header class="header">
      <div class="back">
        <a-tooltip title="返回到“收件箱”" placement="bottom">
          <a-button>
            <NuxtLink to="/">
              <v-icon name="md-arrowback-round" />
            </NuxtLink>
          </a-button>
        </a-tooltip>
      </div>
      <div class="operation">
        <a-tooltip title="归档" placement="bottom">
          <a-button>
            <v-icon name="md-archive" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="列为垃圾邮件" placement="bottom">
          <a-button>
            <v-icon name="bi-exclamation-octagon-fill" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="删除" placement="bottom">
          <a-button>
            <v-icon name="md-delete" />
          </a-button>
        </a-tooltip>

        <span class="separator" />

        <a-tooltip title="标记未读" placement="bottom">
          <a-button>
            <v-icon name="md-markasunread" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="延后" placement="bottom">
          <a-button>
            <v-icon name="md-accesstime" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="添加到 Tasks" placement="bottom">
          <a-button>
            <v-icon name="md-addtask-round" />
          </a-button>
        </a-tooltip>

        <span class="separator" />

        <a-tooltip title="移至" placement="bottom">
          <a-button>
            <v-icon name="md-drivefilemove" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="标签" placement="bottom">
          <a-button>
            <v-icon name="fa-tag" scale="0.9" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="更多操作" placement="bottom">
          <a-button>
            <v-icon name="md-morevert" />
          </a-button>
        </a-tooltip>
      </div>

      <div class="pagination">
        <div class="num">第 6 个会话，共 26 个</div>
        <div class="pager">
          <a-tooltip title="较新" placement="bottom">
            <a-button>
              <v-icon name="md-chevronleft-round" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="更早" placement="bottom">
            <a-button>
              <v-icon name="md-chevronright-round" />
            </a-button>
          </a-tooltip>
        </div>
      </div>
    </header>

    <div class="article" :class="{ 'disable-image': disableImage }">
      <h1 class="title">
        {{ data.title }}
      </h1>
      <div v-html="data.body" />
    </div>
  </div>
</template>

<script>
import api from "../api/index";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data: ""
    };
  },
  computed: mapState({
    articles: (state) => state.articles,
    disableImage: (state) => state.disableImage
  }),
  activated() {
    this.getContent();
  },
  deactivated() {
    this.data = "";
  },
  methods: {
    async getContent() {
      const id = this.$route.query.id;
      if (Object.prototype.hasOwnProperty.call(this.articles, id)) {
        this.data = this.articles[id];
      } else {
        api.getNewsById(id).then((res) => {
          this.data = res.data;
          this.$store.commit("updateArticle", {
            id: id,
            data: res.data
          });
        });
      }
    }
  }
};
</script>

<style lang="stylus">
@import "@/assets/vars.styl"

.article-page
  .header
    padding 0 28px 0 8px
    .back
      width 63px
    .operation
      margin-left -10px
      .separator
        border-left $border
        margin-left 7px
        margin-right 12px
        height 20px
  .article
    padding 17px 30px 20px 73px
    position relative
    color $text-color
    h1, h2
      font-weight 400
    h1
      font-size 22px
    h2
      font-size 18px
    .question
      &:not(:last-child)
        margin-bottom 60px
        &::after
          content ""
          position absolute
          height 1px
          width 100%
          margin-left -73px
          border-bottom $border
      .meta
        margin-top 20px
        img.avatar, span.author, span.bio
          vertical-align middle
        img.avatar
          width 40px
          height 40px
          border-radius 50%
          margin-left -55px
        span.author, span.bio
          letter-spacing .2px
        span.author
          font-weight bold
          margin-left 11px
        span.bio
          color #555555
      .content
        margin-top 10px
        p
          line-height 1.7
          margin-bottom 10px
        figure img
          width inherit
          max-width 100%
          margin 30px auto
          display block
        ul
          padding-left 18px
          li
            line-height 1.7
        hr
          border 0
          height 1px
          background-color #eee
          margin 20px 0
    &.disable-image .question .content figure img
      display none

    .view-more
      text-align center
      margin-top 50px
      margin-bottom 35px
      a
        border 1px solid $accent-color
        border-radius 5px
        padding 8px 12px
        font-size 12px
        &:hover
          background #F6FBFF
          color $accent-color
  @media (max-width: 1024px)
    .header
      padding 0 8px
      .operation
        display none !important
    .article
      padding-left 10px
      padding-right 10px
      .question
        .meta
          img.avatar
            margin-left 0
</style>
