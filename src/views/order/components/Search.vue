<template>
    <div>
        <div class="title">筛选</div>

        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item">
                    <div class="label">订单编号</div>
                    <c-input 
                        :inputValue.sync="search.orderNum"
                        placeholder="请输入订单编号"
                    />
                </div>

                <div class="search-item">
                    <div class="label">客户信息</div>
                    <c-input 
                        :inputValue.sync="search.nameOrMobile"
                        placeholder="请输入客户姓名或手机号"
                        :inputStyle="{
                        width: '170px'
                        }"
                    />
                </div>

                <div class="search-item">
                    <div class="label">下单日期</div>
                    <date-range-select
                        :value.sync="dateRange"
                        @select="handlerSelectDate"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>
            </div>

            <div class="search-line search-line2">
                <div class="search-item">
                    <div class="label">车辆款型</div>
                    <c-select
                        :selectValue.sync="search.carBrandId"
                        :options="brandList"
                        placeholder="选择品牌"
                        style="margin-right: 10px;"
                        labelKey="brandName"
                        valueKey="id"
                        :selectStyle="{
                            width: '198px'
                        }"
                        @change="changeCarBrand"
                    />
                    <c-select
                        :selectValue.sync="search.carTypeId"
                        :options="typeList"
                        placeholder="选择车系"
                        style="margin-right: 10px;"
                        labelKey="carType"
                        valueKey="id"
                        :selectStyle="{
                            width: '198px'
                        }"
                        @change="changeCarType"
                    />
                    <c-select
                        :selectValue.sync="search.carTypeYearId"
                        :options="yearList"
                        placeholder="选择年款"
                        style="margin-right: 10px;"
                        labelKey="year"
                        valueKey="id"
                        :selectStyle="{
                            width: '198px'
                        }"
                        @change="changeCarTypeYear"
                    />
                    <c-select
                        :selectValue.sync="search.carTypeYearProductId"
                        :options="productList"
                        placeholder="选择型号"
                        :selectStyle="{
                            width: '236px'
                        }"
                        labelKey="carTypeYearProduct"
                        valueKey="id"
                        @change="changeCarProduct"
                    />
                </div>

                <reset-button class="search-btn" @reset="reset"/>
            </div>
        </div>
    </div>
</template>

<script>
import { getCarBrand, getCarType, getCarTypeYear, listByCarTypeYearId } from '@/api/car/car'

export default {
    data() {
        return {
            search: {
                orderNum: '',
                nameOrMobile: '',
                minCreatedTime: '',
                maxCreatedTime: '',
                carBrandId: '',
                carTypeId: '',
                carTypeYearId: '',
                carTypeYearProductId: '',
                status: '',
                limit: 10,
                page: 1,
            },
            dateRange: [],
            brandList: [],
            typeList: [],
            yearList: [],
            productList: [],
        }
    },

    mounted() {
        this.searchList()
        this.getCarBrand()
    },

    methods: {
        getCarBrand() {
            getCarBrand().then(res => {
                if(res.code === 0) {
                    this.brandList = res.data
                }
            })
        },

        changeCarBrand(e) {
            this.search.carBrandId = e
            this.getCarType()
        },

        getCarType() {
            const data = {
                carBrandId: this.search.carBrandId
            }

            getCarType(data).then(res => {
                if(res.code === 0) {
                    this.typeList = res.data
                }
            })
        },

        changeCarType(e) {
            this.search.carTypeId = e
            this.getCarTypeYear()
        },

        getCarTypeYear() {
            const data = {
                carTypeId: this.search.carTypeId
            }

            getCarTypeYear(data).then(res => {
                if(res.code === 0) {
                    this.yearList = res.data
                }
            })
        },

        changeCarTypeYear(e) {
            this.search.carTypeYearId = e
            this.listByCarTypeYearId()
        },

        listByCarTypeYearId() {
            const data = {
                carTypeYearId: this.search.carTypeYearId
            }

            listByCarTypeYearId(data).then(res => {
                if(res.code === 0) {
                    this.productList = res.data
                }
            })
        },

        changeCarProduct(e) {
            this.search.carTypeYearProductId = e
        },

        reset() {
            this.search.orderNum = ''
            this.search.nameOrMobile = ''
            this.search.minCreatedTime = null
            this.search.maxCreatedTime = null
            this.search.status = ''
            this.search.carBrandId = ''
            this.search.carTypeId = ''
            this.search.carTypeYearId = ''
            this.search.carTypeYearProductId = ''
            this.dateRange = []
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
  margin: 30px 0;
}
</style>