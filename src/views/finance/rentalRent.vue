<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">租车费用</el-breadcrumb-item>
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
import { selectRentalRentList } from '@/api/finance/finance'
import PaySearch from './components/PaySearch.vue'
import PayList from './components/PayList.vue'

export default {
  name: 'rentalRent',

  components: {
    PaySearch,
    PayList,
  },

  data() {
    return {
        type: 3, // 1押金，2订阅费用 3.租车业务租金 4.租车业务押金
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
        this.selectRentalRentList()
    },

    selectRentalRentList() {
        selectRentalRentList(this.search).then(res => {
            if(res.code === 0) {
                this.list = res.data.records
                this.total = res.data.total
            }
        })
    },

    handleCurrentChange(e) {
        this.search.page = e
        this.selectRentalRentList()
    },
  },
}
</script>