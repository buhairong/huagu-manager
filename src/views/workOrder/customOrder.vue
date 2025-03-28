<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>定制管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">新车订阅</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="title">筛选</div>
            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                        <div class="label">用户信息</div>
                        <c-input 
                            :inputValue.sync="search.userInfo"
                            placeholder="请输入用户信息"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">用车城市</div>
                        <c-input 
                            :inputValue.sync="search.city"
                            placeholder="请输入用车城市"
                        />
                    </div>

                    <!-- <div class="search-item">
                        <div class="label label2">订阅周期</div>
                        <c-select
                            :selectValue.sync="search.period"
                            :options="periodList"
                        />
                    </div> -->

                    <div class="search-item">
                        <div class="label">跟进状态</div>
                        <c-select
                            :selectValue.sync="search.status"
                            :options="FOLLOW_STATUS_TYPE"
                        />
                    </div>

                    <search-button class="search-btn" @search="searchList"/>
                </div>

                <div class="search-line search-line2">
                    <!-- <div class="search-item">
                        <div class="label">品牌筛选</div>
                        <c-select
                            :selectValue.sync="search.carBrand"
                            :options="brandList"
                        />
                    </div> -->

                    <div class="search-item">
                        <div class="label">车型信息</div>
                        <c-input 
                            :inputValue.sync="search.carProduct"
                            placeholder="请输入车型信息"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label label2">提交日期</div>
                        <date-range-select
                            :value.sync="dateRange"
                            @select="handlerSelectDate"
                        />
                    </div>
                    
                    <reset-button class="search-btn" @reset="reset"/>
                </div>
            </div>

            <el-table 
                :data="list"
                style="width: 100%"
                :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
            >
                <el-table-column
                    label="用户信息"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row.mobile}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="车型信息"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row.carProduct}}</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="订阅周期"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row.period}}个月</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="finalSelect"
                    label="期末选择"
                >
                </el-table-column> -->
                <el-table-column
                    prop="city"
                    label="用车城市"
                >
                </el-table-column>
                <el-table-column
                    prop="deliveryDate"
                    label="计划提车时间"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="提交日期"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="跟进状态"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="110"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div><el-button class="table-btn" type="text" @click="goDetailPage(scope.row)">查看详情</el-button></div>
                    </template>
                </el-table-column>
               
              
            </el-table>

            <pagination 
                :total="total"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script>
import { getCustomOrderList, selectPeriodList, selectBrandList } from '@/api/workerOrder/customOrder'
import { FOLLOW_STATUS_TYPE } from '@/utils/constant'

export default {
    name: 'customOrder',

    data () {
        return {
            search: {
                userInfo: '',
                city: '',
                carProduct: '',
                period: '',
                status: '',
                carBrand: '',
                beginDate: null,
                endDate: null,
                limit: 10,
                page: 1,
            },
            dateRange: [],
            periodList: [], // 订阅周期列表
            FOLLOW_STATUS_TYPE, // 跟进状态列表
            brandList: [], // 品牌筛选列表
            list: [],
            total: 0,
        }
    },

    mounted() {
        this.getCustomOrderList()
        this.selectPeriodList()
        this.selectBrandList()
    },

    methods: {
        getCustomOrderList() {
            getCustomOrderList(this.search).then(res => {
                if (res.code == 0) {
                    this.list = res.data.records
                    this.total = res.data.total
                }
            })
        },

        selectPeriodList() {
            selectPeriodList().then((res) => {
                if (res.code == 0) {
                    this.periodList = res.data.map(item => {
                        const res = {
                            value: item+'',
                            label: `${item}个月`
                        }

                        return res
                    })
                }
            })
        },

        selectBrandList() {
            selectBrandList().then((res) => {
                if (res.code == 0) {
                    this.brandList = res.data.map(item => {
                        const res = {
                            value: item,
                            label: item
                        }

                        return res
                    })
                }
            })
        },

        handlerSelectDate(data) {
            this.search.beginDate = data[0]
            this.search.endDate = data[1]
            this.dateRange = data
        },

        searchList() {
            this.search.page = 1
            this.getCustomOrderList()
        },

        handleCurrentChange(e) {
            this.search.page = e
            this.getCustomOrderList()
        },

        reset() {
            this.search.userInfo = ''
            this.search.city = ''
            this.search.carProduct = ''
            this.search.period = ''
            this.search.status = ''
            this.search.carBrand = ''
            this.search.beginDate = null
            this.search.endDate = null
            this.dateRange = []
        },

        goDetailPage(row) {
            this.$router.push({
                path: '/workOrder/customOrderDetail',
                query: {
                    detail: JSON.stringify(row)
                }
            })
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
  margin-bottom: 40px;
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
        .label2 {
            width: 84px;
        }
    }
    .search-btn {
        margin-left: 12px;
    }
}
.search-line2 {
    margin: 30px 0;
}
</style>