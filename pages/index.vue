<template>
  <div calss="mail-list">
    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      :showHeader="false"
      :row-selection="selectItem"
    />
  </div>
</template>

<script>
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: 240
  },
  {
    title: 'email',
    dataIndex: 'email',
    ellipsis: true
  },
  {
    title: 'time',
    dataIndex: 'time',
    width: 100
  }
]
const data = [
  {
    key: '1',
    name: 'Gitee 开源托管平台',
    email: 'Gitee 源代码托管平台 中文界面 更友好 汇聚众多本土原创开源项目，托管项目超 1000 万，超 500 万开发者选择',
    time: '2020/10/14'
  },
  {
    key: '2',
    name: '华为云',
    email: '「华为云」云产品免费试用 「华为云」云服务器，数据库，存储等 40+ 云产品 0 元试用',
    time: '2020/10/14'
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'Hi! Sidney No. 1 Lake Park.',
    time: '2020/5/8'
  }
]

export default {
  data() {
    return {
      data,
      columns
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
table
  font-size 14px
  tr
    background-color #F4F7F7
  td, th
    padding 8px !important
</style>
