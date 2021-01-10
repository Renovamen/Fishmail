<template>
  <div class="article-page">
    <header class="header">
      <div class="back">
        <a-button>
          <NuxtLink to="/">
            <a-icon type="arrow-left" />
          </NuxtLink>
        </a-button>
      </div>
      <div class="operation">
        <a-button>
          <a-icon type="book" />
        </a-button>
        <a-button>
          <a-icon type="exclamation-circle" />
        </a-button>
        <a-button>
          <a-icon type="delete" />
        </a-button>

        <span class="separator" />

        <a-button>
          <a-icon type="mail" />
        </a-button>
        <a-button>
          <a-icon type="clock-circle" />
        </a-button>
        <a-button>
          <a-icon type="check-circle" />
        </a-button>

        <span class="separator" />

        <a-button>
          <a-icon type="export" />
        </a-button>
        <a-button>
          <a-icon type="tag" />
        </a-button>
        <a-button>
          <a-icon type="more" />
        </a-button>
      </div>

      <div class="pagination">
        <div class="num">第 6 个会话，共 26 个</div>
        <div class="pager">
          <a-button>
            <a-icon type="left" />
          </a-button>
          <a-button>
            <a-icon type="right" />
          </a-button>
        </div>
      </div>
    </header>
    <div class="article">
      <h2 class="title">{{ data.title }}</h2>
      <div v-html="data.body" />
    </div>
  </div>
</template>

<script>
import api from '../api/index'

export default {
  data() {
		return {
      data: ''
		}
	},
	mounted() {
    this.getContent()
	},
  methods: {
    async getContent() {
      const id = this.$route.query.id
      api.getNewsById(id).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="stylus">
.article-page
  .header
    padding 0 28px 0 8px
    .back
      width 63px
    .operation
      margin-left -10px
      .separator
        border-left 1px solid #eee
        margin-left 7px
        margin-right 12px
  .article
    padding 65px 30px 50px 73px
    position relative
    color #202124
    h2.title
      font-weight 400
      font-size 22px
    .meta
      margin-top 20px
      img.avatar, span.author, span.bio
        vertical-align middle
      img.avatar
        width 40px
        height 40px
        border-radius 50%
        margin-left -55px
        border 1px solid #eee
      span.author, span.bio
        letter-spacing .2px
      span.author
        font-weight bold
        margin-left 11px
      span.bio
        color #555555
    .content
      p
        line-height 1.7
        margin-bottom 10px
      .content-image
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
        background-color #E7E7E7
        margin 20px 0
    .view-more
      text-align center
      margin-top 80px
      a
        border 1px solid #2995FC
        border-radius 5px
        padding 8px 12px
        font-size 12px
        &:hover
          background #F6FBFF
          color #2995FC
</style>
