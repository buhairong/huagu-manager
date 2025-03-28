<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">商户返佣申请</el-breadcrumb-item>
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
import { selectBrokerageListOfCompany } from '@/api/finance/finance'
import BrokerageSearch from './components/BrokerageSearch.vue'
import BrokerageList from './components/BrokerageList.vue'

export default {
  name: 'brokerage',

  components: {
    BrokerageSearch,
    BrokerageList,
  },

  data() {
    return {
        type: 2, // 1个人，2店铺
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
        selectBrokerageListOfCompany(this.search).then(res => {
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