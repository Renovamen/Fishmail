<template>
  <div class="mail-list">
    <header class="header">
      <div class="select-all">
        <a-tooltip title="选择" placement="bottom">
          <a-checkbox></a-checkbox>
        </a-tooltip>
      </div>
      <div class="operation">
        <a-tooltip title="刷新" placement="bottom">
          <a-button @click="refresh()">
            <a-icon type="reload" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="更多操作" placement="bottom">
          <a-button>
            <a-icon type="more" />
          </a-button>
        </a-tooltip>
      </div>

      <div class="pagination">
        <div class="num">第 {{ page }} 页，共 {{ data.length }} 行</div>
        <div class="pager">
          <a-tooltip title="较新" placement="bottom">
            <a-button @click="goPage(-1)">
              <a-icon type="left" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="较旧" placement="bottom">
            <a-button @click="goPage(1)">
              <a-icon type="right" />
            </a-button>
          </a-tooltip>
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
        @click="goToArticle(record.key)"
      >
        {{ text }}
      </div>
      <div class="time" slot="time" slot-scope="text">{{ text }}</div>
    </a-table>
  </div>
</template>

<script>
import api from '../api/index'
import { mapState } from 'vuex'

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
      columns,
      page: 1,
      latestDate: ''
    }
  },
  computed: mapState({
		lists: state => state.lists
	}),
  async mounted() {
    await this.refresh()
  },
  methods: {
    async getList() {
      if(this.lists.hasOwnProperty(this.page)) {
        this.data = this.lists[this.page]
      }
      else {
        this.data = []
        await this.getListByDate((this.page - 1) * 3)
        await this.getListByDate((this.page - 1) * 3 + 1)
        await this.getListByDate((this.page - 1) * 3 + 2)
        this.lists[this.page] = this.data
      }
    },
    async getListByDate(num) {
      await api.getNewsByDate(this.getDate(num)).then(res => {
        const list = res.data.stories
        for (let i = 0; i < list.length; i++) {
          let item = {
            time: this.formatDate(res.data.date),
            articleTitle: list[i].title,
            hint: list[i].hint,
            key: list[i].id
          }
          const readTime = this.getReadTime(list[i].hint)
          if(readTime) {
            item.articleTitle += ` — ${readTime} 分钟阅读`
            item.hint = item.hint.slice(0, - (8 + readTime.length))
          }
          this.data.push(item)
        }
      })
    },
    async getLatestDate() {
      await api.getNews().then(res => {
        this.latestDate = res.data.date
      })
    },
    async refresh() {
      this.page = 1
      this.lists = {}
      await this.getLatestDate()
      await this.getList()
    },
    getDate(num) {
      const d = new Date()

      const initY = parseInt(this.latestDate.slice(0, 4))
      const initM = parseInt(this.latestDate.slice(4, 6))
      const initD = parseInt(this.latestDate.slice(6, 8))

      d.setFullYear(initY)
      d.setMonth(initM - 1)
      d.setDate(initD)

      d.setDate(d.getDate() + 1 - num)

      const year = d.getFullYear(),
            month = (d.getMonth() + 1).toString().padStart(2, '0'),
            day = d.getDate().toString().padStart(2, '0')

      return year + month + day
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
    },
    goPage(value) {
      this.page += value
      this.getList()
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
  table
    font-size 14px
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
