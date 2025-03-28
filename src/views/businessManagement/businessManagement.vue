<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>商户管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">汽车经销商</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <Search :type="type" @search="handlerSearch" />

          <List :type="type" :list="list" @search="handlerSearch" />

          <pagination 
              :total="total"
              @handleCurrentChange="handleCurrentChange"
          />
      </div>
  </div>
</template>

<script>
import { selectList } from '@/api/merchant/merchant'
import Search from './components/Search.vue'
import List from './components/List.vue'

export default {
  name: 'businessManagement',

  components: {
    Search,
    List,
  },

  data() {
    return {
        type: 1, // 1汽车经销商，2金融服务商
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
      const params = {
        ...this.search,
        companyType: this.type,
      }

      selectList(params).then(res => {
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