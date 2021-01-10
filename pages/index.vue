<template>
  <div class="mail-list">
    <header class="header">
      <div class="select-all">
        <a-checkbox></a-checkbox>
      </div>
      <div class="operation">
        <a-button>
          <a-icon type="reload" />
        </a-button>
        <a-button>
          <a-icon type="more" />
        </a-button>
      </div>

      <div class="pagination">
        <div class="num">第 1 - 27 行，共 27 行</div>
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
    <a-table
      :columns="columns"
      :data-source="data"
      :showHeader="false"
      :row-selection="selectItem"
      :pagination="false"
    >
      <div
        slot="articleTitle"
        slot-scope="text, record"
        @click="goToArticle(record.id)"
      >
        {{ text }}
      </div>
      <div class="time" slot="time" slot-scope="text">{{ text }}</div>
    </a-table>
  </div>
</template>

<script>
import api from '../api/index'

const columns = [
  {
    title: 'hint',
    dataIndex: 'hint',
    width: 240
  },
  {
    title: 'articleTitle',
    dataIndex: 'articleTitle',
    scopedSlots: { customRender: 'articleTitle' },
    ellipsis: true
  },
  {
    title: 'time',
    dataIndex: 'time',
    scopedSlots: { customRender: 'time' },
    width: 100
  }
]

export default {
  data() {
    return {
      data: [],
      columns
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      api.getNews().then(res => {
        this.data = res.data.stories
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].key = i
          this.data[i].time = this.formatDate(res.data.date)
          this.data[i].articleTitle = this.data[i].title

          const readTime = this.getReadTime(this.data[i].hint)
          if(readTime) {
            this.data[i].articleTitle += ` — ${readTime} 分钟阅读`
            this.data[i].hint = this.data[i].hint.slice(0, - (8 + readTime.length))
          }
        }
      })
    },
    formatDate(value) {
      return value.slice(0, 4) + '/' + value.slice(4, 6) + '/' + value.slice(6, 8)
    },
    getReadTime(hint) {
      const timeMatch = hint.match(
        / · (.*?) 分钟阅读/
      )
      if(!timeMatch) return null
      return timeMatch[1]
    },
    goToArticle(id) {
      this.$router.push({
				path: "article",
				query: {
					id: id
				}
			})
    }
  },
  computed: {
    selectItem() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            name: record.name
          },
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.mail-list
  .header
    padding-right 28px
    .select-all
      width 60px
      padding-left 22px
    .operation
      margin-left -5px
  .article
  table
    font-size 14px
    margin-top 48px
    tr
      background-color #F4F7F7
      cursor pointer
    td, th
      padding 8px !important
    .time
      font-size 12px
      text-align right
      padding-right 5px
</style>
