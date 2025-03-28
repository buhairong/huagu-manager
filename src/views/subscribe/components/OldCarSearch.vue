<template>
    <div>
        <div class="title">筛选</div>

        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item">
                    <div class="label">选择商户</div>
                    <c-select
                        :selectValue.sync="search.merchantId"
                        :options="merchantList"
                        placeholder="请选择商户"
                        filterable
                        labelKey="shopName"
                        valueKey="id"
                    />
                </div>

                <div class="search-item">
                    <div class="label">车架号</div>
                    <c-input 
                        :inputValue.sync="search.carVin"
                        placeholder="请输入车架号"
                    />
                </div>

                <div class="search-item">
                    <div class="label">发动机号</div>
                    <c-input 
                        :inputValue.sync="search.carEngineNum"
                        placeholder="请输入发动机号"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>

                <reset-button class="search-btn reset-btn" @reset="reset"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import { selectList } from '@/api/merchant/merchant'

export default {
    data() {
        return {
            search: {
                merchantId: null,
                carVin: '',
                carEngineNum: '',
                page: 1,
                limit: 10,
            },
            merchantList: [],
            
        }
    },

    mounted() {
        this.selectList()
        this.searchList()
    },

    methods: {
        selectList() {
            const params = {
                companyType: 1,
                page: 1,
                size: 1000,
            }

            selectList(params).then(res => {
                if(res.code === 0) {
                    this.merchantList = res.data.records
                }
            })
        },

        reset() {
            this.search.merchantId = null
            this.search.carVin = ''
            this.search.carEngineNum = ''

            this.searchList()
        },

        searchList() {
            this.search.page = 1
            this.$emit('search', this.search)
        },
    },
}
</script>

<style lang="less" scoped>
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
  margin-bottom: 23px;
}

.search-wrap {
    margin-bottom: 20px;
}

.search-line {
  display: flex;
  align-items: center;
  .search-item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      .label {
          height: 22px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          line-height: 22px;
          color: #4E5969;
          margin-right: 16px;
          text-align: right;
      }
  }
}

.reset-btn {
    margin-left: 20px;
}
</style>