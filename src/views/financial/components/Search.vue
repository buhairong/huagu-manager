<template>
    <div>
        <div class="title">筛选</div>

        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item">
                    <div class="label">商户类型</div>
                    <c-select
                        :selectValue.sync="search.merchantType"
                        :options="COMPANY_ROLE_LIST"
                    />
                </div>

                <div class="search-item">
                    <div class="label">品牌要求</div>
                    <c-select
                        :selectValue.sync="search.brand"
                        :options="brandArray"
                        labelKey="brandName"
                        valueKey="brandName"
                    />
                </div>

                <div class="search-item">
                    <div class="label">动力类型</div>
                    <c-select
                        :selectValue.sync="search.powerType"
                        :options="POWER_TYPE_LIST"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>

                
            </div>

            <div class="search-line search-line2">
                <div class="search-item">
                    <div class="label">创建时间</div>
                    <date-range-select
                        :value.sync="dateRange"
                        :style="{width: '365px'}"
                        @select="handlerSelectDate"
                    />
                </div>

                <div class="search-item">
                    <div class="label">价格区间</div>
                    <c-select
                        :selectValue.sync="search.priceSection"
                        :options="PRICE_SECTION_LIST"
                    />
                </div>

                <reset-button class="search-btn reset-btn" @reset="reset"/>
            </div>
            
        </div>
    </div>
</template>

<script>
import { getCarBrand } from '@/api/financial/financial'
import { COMPANY_ROLE_LIST, POWER_TYPE_LIST,PRICE_SECTION_LIST } from '@/utils/constant'

export default {
    data() {
        return {
            COMPANY_ROLE_LIST,
            POWER_TYPE_LIST,
            PRICE_SECTION_LIST,
            brandArray: [],
            search: {
                merchantType: null,
                brand: null,
                powerType: null,
                minTime: null,
                maxTime: null,
                priceSection: null,
                page: 1,
                limit: 10,
            },
            dateRange: [],
        }
    },

    mounted() {
        this.searchList()
        this.getCarBrand()
    },

    methods: {
        // 查询品牌列表
        getCarBrand() {
            getCarBrand({}).then((res) => {
                if (res.code == 0) {
                    this.brandArray = res.data
                }
            })
        },

        handlerSelectDate(data) {
            this.search.minTime = data[0]
            this.search.maxTime = data[1]
            this.dateRange = data
        },

        reset() {
            this.search.merchantType = null
            this.search.brand = null
            this.search.powerType = null
            this.search.minTime = null
            this.search.maxTime = null
            this.dateRange = []
            this.search.priceSection = null

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

.search-line2 {
    margin-top: 30px;
}
</style>