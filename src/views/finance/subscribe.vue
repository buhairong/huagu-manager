<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>财务管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">订阅费用</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <PaySearch :type="type" @search="handlerSearch" />

          <PayList :type="type" :list="list" />

          <pagination 
              :total="total"
              @handleCurrentChange="handleCurrentChange"
          />
      </div>
  </div>
</template>

<script>
import { selectOrderListOfSubscribeFee } from '@/api/finance/finance'
import PaySearch from './components/PaySearch.vue'
import PayList from './components/PayList.vue'

export default {
  name: 'depositPay',

  components: {
    PaySearch,
    PayList,
  },

  data() {
    return {
        type: 2, // 1押金，2订阅费用
        search: {},
        list: [],
        total: 0,
    }
  },

  mounted() {
      
  },

  methods: {
    handlerSearch(search) {
        this.search = search
        this.selectOrderListOfSubscribeFee()
    },

    selectOrderListOfSubscribeFee() {
        selectOrderListOfSubscribeFee(this.search).then(res => {
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
  },
}
</script>