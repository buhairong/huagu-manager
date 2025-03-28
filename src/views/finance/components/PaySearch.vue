<template>
    <div>
        <div class="title">筛选</div>

        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item" v-if="type < 5">
                    <div class="label">订单编号</div>
                    <c-input 
                        :inputValue.sync="search.orderNum"
                        placeholder="请输入订单编号"
                        :inputStyle="{
                            width: '200px'
                        }"
                    />
                </div>

                <div class="search-item">
                    <div class="label">客户信息</div>
                    <c-input 
                        :inputValue.sync="search.userInfo"
                        placeholder="请输入客户姓名或手机号"
                        :inputStyle="{
                            width: '200px'
                        }"
                    />
                </div>

                <div class="search-item">
                    <div class="label">审核人员</div>
                    <c-select
                        :selectValue.sync="search.updateBy"
                        :options="auditList"
                        placeholder="请选择审核人员"
                        labelKey="auditManName"
                        valueKey="auditManId"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>
            </div>

            <div class="search-line search-line2">
                <div class="search-item">
                    <div class="label">订单状态</div>
                    <c-select
                        :selectValue.sync="search.confirmed"
                        :options="confirmList"
                        placeholder="请选择订单状态"
                    />
                </div>

                <div class="search-item" v-if="type < 6">
                    <div class="label">车辆信息</div>
                    <c-select
                        :selectValue.sync="search.carBrandId"
                        :options="brandList"
                        placeholder="请选择车辆信息"
                        labelKey="carBrand"
                        valueKey="brandId"
                    />
                </div>

                <div class="search-item">
                    <div class="label">审核日期</div>
                    <date-range-select
                        :value.sync="dateRange"
                        @select="handlerSelectDate"
                        :selectStyle="{
                            width: '265px'
                        }"
                    />
                </div>

                <reset-button class="search-btn" @reset="reset"/>
            </div>
        </div>
    </div>
</template>

<script>
import { financialSelector } from '@/api/finance/finance'

export default {
    props: {
        type: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            search: {
                orderNum: '',
                userInfo: '',
                updateBy: '',
                confirmed: '', // 1确认，0未确认
                carBrandId: '',
                minUpdateTime: '',
                maxUpdateTime: '',
                page: 1,
                limit: 10,
            },
            dateRange: [],
            confirmList: [
                { label: '待确认', value: 0},
                { label: '已完成', value: 1},
            ],
            auditList: [],
            brandList: [],
        }
    },

    mounted() {
        this.searchList()
        this.financialSelector()
    },

    methods: {
        financialSelector() {
            const data = {
                type: this.type,
            }

            financialSelector(data).then(res => {
                if(res.code === 0) {
                    this.auditList = res.data.auditList
                    this.brandList = res.data.brandList
                }
            })
        },

        handlerSelectDate(data) {
            if (data) {
                this.search.minUpdateTime = data[0]
                this.search.maxUpdateTime = data[1]
                this.dateRange = data
            } else {
                this.search.minUpdateTime = null
                this.search.maxUpdateTime = null
                this.dateRange = []
            }
        },

        reset() {
            this.search.orderNum = ''
            this.search.userInfo = ''
            this.search.updateBy = ''
            this.search.confirmed = ''
            this.search.carBrandId = ''
            this.search.minUpdateTime = ''
            this.search.maxUpdateTime = ''
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