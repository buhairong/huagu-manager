<template>
    <div>
        <div class="title">筛选</div>

        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item">
                    <div class="label">商户名称</div>
                    <c-input 
                        :inputValue.sync="search.shopName"
                        placeholder="请输入商户名称"
                    />
                </div>

                <div class="search-item">
                    <div class="label">行业分类</div>
                    <c-select
                        :selectValue.sync="search.chooseRole"
                        :options="COMPANY_ROLE_LIST"
                        placeholder="请选择行业分类"
                    />
                </div>

                <div class="search-item">
                    <div class="label">所在城市</div>
                    <c-select
                        :selectValue.sync="search.cityId"
                        :options="cityList"
                        filterable
                        labelKey="city"
                        valueKey="id"
                        placeholder="请选择所在城市"
                    />
                </div>

                <div class="search-item">
                    <div class="label">商户状态</div>
                    <c-select
                        :selectValue.sync="search.contractStatus"
                        :options="MERCHANT_STATUS_LIST"
                        placeholder="请选择行业分类"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>

                <reset-button class="search-btn reset-btn" @reset="reset"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import { getAllCity } from '@/api/merchant/merchant'
import { COMPANY_ROLE_LIST, MERCHANT_STATUS_LIST } from '@/utils/constant'

export default {
    props: {
        type: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            COMPANY_ROLE_LIST,
            MERCHANT_STATUS_LIST,
            search: {
                shopName: '',
                chooseRole: '',
                cityId: '',
                contractStatus: '',
                type: '',
                page: 1,
                size: 10,
            },
            cityList: [],
        }
    },

    mounted() {
        this.searchList()
        this.getAllCity()
    },

    methods: {
        getAllCity() {
            getAllCity().then(res => {
                if(res.code === 0) {
                    this.cityList = res.data
                }
            })
        },

        reset() {
            this.search.shopName = ''
            this.search.chooseRole = ''
            this.search.cityId = ''
            this.search.contractStatus = ''
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