<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>好车易拍</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">提现申请</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <BrokerageSearch :type="type" @search="handlerSearch" />
            <BrokerageList :type="type" :list="list" @update="selectBrokerageList" />

            <pagination 
                :total="total"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script>
import { selectAuctionCashList } from '@/api/auction/auction'
import BrokerageSearch from './components/BrokerageSearch.vue'
import BrokerageList from './components/BrokerageList.vue'

export default {
  name: 'AuctionCash',

  components: {
    BrokerageSearch,
    BrokerageList,
  },

  data() {
    return {
        type: 3, // 1个人，2店铺 3.竞价
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
        this.selectBrokerageList()
    },

    selectBrokerageList() {
        selectAuctionCashList(this.search).then(res => {
            if(res.code === 0) {
                this.list = res.data.records
                this.total = res.data.total
            }
        })
    },

    handleCurrentChange(e) {
        this.search.page = e
        this.selectBrokerageList()
    },
  },
}
</script>