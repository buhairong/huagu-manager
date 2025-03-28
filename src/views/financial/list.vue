<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">金融方案</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <Search @search="handlerSearch" />

          <div class="create-btn-wrap">
            <create-button 
                text="创建方案"
                @create="add"
            />
          </div>

          <List :list="list" @search="handlerSearch" />

          <pagination 
              :total="total"
              @handleCurrentChange="handleCurrentChange"
          />
      </div>
  </div>
</template>

<script>
import { selectSubscribeFinancialScheme } from '@/api/financial/financial'
import Search from './components/Search.vue'
import List from './components/List.vue'

export default {
  name: 'financial',

  components: {
    Search,
    List,
  },

  data() {
    return {
        search: {},
        list: [],
        total: 0,
    }
  },

  mounted() {
      
  },

  methods: {
    handlerSearch(search) {
        if (search) {
          this.search = search
        }
        
        this.selectList()
    },

    selectList() {
      selectSubscribeFinancialScheme(this.search).then(res => {
          if(res.code === 0) {
              this.list = res.data.records
              this.total = res.data.total
          }
      })
    },

    handleCurrentChange(e) {
        this.search.page = e
        this.selectOrderListOfSubscribeFee()
    },

    // 1.添加 2.编辑
    add() {
        this.$router.push({
            path: '/product/setFinancial',
            query: {
                operator: 1,
            },
        })
    },
  },
}
</script>

<style lang="less" scoped>
.create-btn-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>