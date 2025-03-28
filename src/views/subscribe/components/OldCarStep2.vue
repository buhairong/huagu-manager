<template>
  <div>
      <div class="content">
          <Search @search="handlerSearch" />

          <List :list="list" :detail="detail" @next="next"/>

          <pagination 
              :total="total"
              @handleCurrentChange="handleCurrentChange"
          />
      </div>
  </div>
</template>

<script>
import { selectSecondHandCarsByMerchant } from '@/api/subscribe/subscribe'
import Search from './OldCarSearch.vue'
import List from './OldCarList.vue'

export default {
  props: {
      detail: {
          type: Object,
          required: true,
      },
  },

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
        selectSecondHandCarsByMerchant(this.search).then(res => {
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

    next() {
        this.$emit('next')
    },
  },
}
</script>

<style lang="less" scoped>
.create-btn-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>