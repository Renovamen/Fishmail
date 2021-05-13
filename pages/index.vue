<template>
  <div class="article-list">
    <header class="header">
      <div class="select-all">
        <a-tooltip title="选择" placement="bottom">
          <a-checkbox />
        </a-tooltip>
      </div>
      <div class="operation">
        <a-tooltip title="刷新" placement="bottom">
          <a-button @click="refresh()">
            <v-icon name="md-refresh" />
          </a-button>
        </a-tooltip>
        <a-tooltip title="更多操作" placement="bottom">
          <a-button>
            <v-icon name="md-morevert" />
          </a-button>
        </a-tooltip>
      </div>

      <div class="pagination">
        <div class="num">第 {{ page }} 页，共 {{ data.length }} 行</div>
        <div class="pager">
          <a-tooltip title="较新" placement="bottom">
            <a-button @click="changePage(-1)">
              <v-icon name="md-chevronleft-round" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="较旧" placement="bottom">
            <a-button @click="changePage(1)">
              <v-icon name="md-chevronright-round" />
            </a-button>
          </a-tooltip>
        </div>
      </div>
    </header>

    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <div class="icon-image" />
          <div class="text">主要</div>
        </span>
        <a-table
          :columns="columns"
          :data-source="data"
          :show-header="false"
          :row-selection="selectItem"
          :pagination="false"
          :custom-row="goToArticle"
          :row-class-name="setClassName"
        >
          <div slot="time" slot-scope="text" class="time">
            {{ text }}
          </div>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <footer>
      <a-row>
        <a-col :span="8" class="left">
          使用了 15 GB 存储空间中的 0.56 GB (3%)
        </a-col>
        <a-col :span="8" class="center"> 条款 · 隐私权 · 使用规定 </a-col>
        <a-col :span="8" class="right"> 上次帐号活动时间：3分钟前 </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="left"> 管理 </a-col>
        <a-col :span="8" class="center" />
        <a-col :span="8" class="right"> 详细信息 </a-col>
      </a-row>
    </footer>
  </div>
</template>

<script>
import api from "../api/index";
import { mapState } from "vuex";

const columns = [
  {
    title: "hint",
    dataIndex: "hint",
    width: 240
  },
  {
    title: "articleTitle",
    dataIndex: "articleTitle",
    ellipsis: true
  },
  {
    title: "time",
    dataIndex: "time",
    scopedSlots: { customRender: "time" },
    width: 100
  }
];

export default {
  data() {
    return {
      data: [],
      columns,
      page: 1,
      latestDate: ""
    };
  },
  computed: {
    ...mapState({
      lists: "lists"
    }),
    selectItem() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: (record) => ({
          props: {
            name: record.name
          }
        })
      };
    }
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async getList() {
      if (Object.prototype.hasOwnProperty.call(this.lists, this.page)) {
        this.data = this.lists[this.page];
      } else {
        this.data = [];
        await this.getListByDate((this.page - 1) * 3);
        await this.getListByDate((this.page - 1) * 3 + 1);
        await this.getListByDate((this.page - 1) * 3 + 2);
        this.$store.commit("updateList", {
          page: this.page,
          data: this.data
        });
      }
    },
    async getListByDate(num) {
      await api.getNewsByDate(this.getDate(num)).then((res) => {
        const list = res.data.stories;
        for (let i = 0; i < list.length; i++) {
          let item = {
            time: this.formatDate(res.data.date),
            articleTitle: list[i].title,
            hint: list[i].hint,
            key: list[i].id
          };
          const readTime = this.getReadTime(list[i].hint);
          if (readTime) {
            item.articleTitle += ` — ${readTime} 分钟阅读`;
            item.hint = item.hint.slice(0, -(8 + readTime.length));
          }
          this.data.push(item);
        }
      });
    },
    async getLatestDate() {
      await api.getNews().then((res) => {
        this.latestDate = res.data.date;
      });
    },
    async refresh() {
      this.page = 1;
      this.$store.commit("clearList");
      await this.getLatestDate();
      await this.getList();
    },
    getDate(num) {
      const d = new Date();

      const initY = parseInt(this.latestDate.slice(0, 4));
      const initM = parseInt(this.latestDate.slice(4, 6));
      const initD = parseInt(this.latestDate.slice(6, 8));

      d.setFullYear(initY);
      d.setMonth(initM - 1);
      d.setDate(initD);

      d.setDate(d.getDate() + 1 - num);

      const year = d.getFullYear(),
        month = (d.getMonth() + 1).toString().padStart(2, "0"),
        day = d.getDate().toString().padStart(2, "0");

      return year + month + day;
    },
    formatDate(value) {
      return (
        value.slice(0, 4) + "/" + value.slice(4, 6) + "/" + value.slice(6, 8)
      );
    },
    getReadTime(hint) {
      const timeMatch = hint.match(/ · (.*?) 分钟阅读/);
      if (!timeMatch) return null;
      return timeMatch[1];
    },
    goToArticle(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              path: "article",
              query: {
                id: record.key
              }
            });
          }
        }
      };
    },
    changePage(value) {
      this.page = Math.max(1, this.page + value);
      this.getList();
    },
    setClassName(record, index) {
      return record.time === this.formatDate(this.latestDate) ? "latest" : "";
    }
  }
};
</script>

<style lang="stylus">
@import '@/assets/vars.styl'

.article-list
  .header
    padding-right 28px
    .select-all
      width 60px
      padding-left 19px
    .operation
      margin-left 5px
  .ant-tabs-bar
    margin-bottom 0
    .ant-tabs-nav-wrap
      .ant-tabs-tab
        width $tab-width
        height 57px
        display flex
        align-items center
        &:hover
          background-color #F2F2F2
        span
          display flex
          align-items center
          .icon-image
            background-image url(https://www.gstatic.com/images/icons/material/system/2x/inbox_gm_googlered600_20dp.png)
            background-position center
            background-repeat no-repeat
            background-size 20px
            height 20px
            width 20px
            margin-top -2px
            margin-right 16px
            margin-left 1px
            display inline-block
          .text
            display inline-block
      .ant-tabs-ink-bar
        background-color $text-color-selected
        width $tab-width - 16px !important
        left 50%
        margin-left (- ($tab-width - 16px) / 2)
        border-top-left-radius 3px
        border-top-right-radius 3px
        height 3px
      .ant-tabs-tab-active
        color $text-color-selected
  .ant-table-tbody
    font-size 14px
    color $text-color
    tr
      background-color $table-color
      cursor pointer
      .time
        font-size 12px
        text-align right
        padding-right 5px
        color $icon-color
    tr.latest
      background-color #fff
      font-weight bold
      .time
        color $text-color
    td, th
      padding 10px !important
    .ant-checkbox-wrapper
      margin-left -7px
  footer
    height 72px
    padding 16px 17px
    font-size 10px
    .ant-row
      padding 1px 0
      .center
        text-align center
      .right
        text-align right

  @media (max-width: 768px)
    footer
      display none

  @media (max-width: 1024px)
    .header
      padding-right 8px
      .select-all
        display none
      .operation
        margin-left 8px
</style>
