<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>定制管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">融资租赁</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="title">筛选</div>
            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                        <div class="label">签约主体</div>
                        <c-input 
                            :inputValue.sync="search.name"
                            placeholder="请输入签约主体"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">品牌车型</div>
                        <c-input 
                            :inputValue.sync="search.carBrand"
                            placeholder="请输入品牌车型"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">融购置税</div>
                        <c-select
                            :selectValue.sync="search.taxOpen"
                            :options="TAX_OPEN_LIST"
                        />
                    </div>

                    <search-button class="search-btn" @search="searchList"/>
                </div>

                <div class="search-line search-line2">

                    <div class="search-item">
                        <div class="label">提交日期</div>
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
                    label="签约主体"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row.signUser}}</div>
                        <div>{{scope.row.mobile}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="品牌车型"
                    prop="carBrand"
                >
                </el-table-column>
               
                <el-table-column
                    label="开票金额"
                >
                    <template slot-scope="scope">
                        <div>{{formatThousandNumber(scope.row.invoicingAmount)}}元</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="融购置税"
                >
                    <template slot-scope="scope">
                        <div>{{TAX_OPEN_STATUS[scope.row.taxOpen]}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="保险金额"
                >
                    <template slot-scope="scope">
                        <div>{{formatThousandNumber(scope.row.insuranceExpenses)}}元</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="createdTime"
                    label="提交日期"
                >
                </el-table-column>

                <el-table-column
                    label="跟进状态"
                >
                     <template slot-scope="scope">
                        <div>{{FOLLOW_STATUS[scope.row.status]}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="followUserName"
                    label="跟进人"
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
import { getCustomRentalOrderList } from '@/api/workerOrder/customOrder'
import { TAX_OPEN_LIST, TAX_OPEN_STATUS, FOLLOW_STATUS } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'

export default {
    name: 'customRentalOrder',

    data () {
        return {
            TAX_OPEN_LIST,
            TAX_OPEN_STATUS,
            FOLLOW_STATUS,
            search: {
                name: '',
                carBrand: '',
                taxOpen: '',
                beginDate: '',
                endDate: '',
                limit: 10,
                page: 1,
            },
            dateRange: [],
            list: [],
            total: 0,
        }
    },

    mounted() {
        this.getCustomOrderList()
    },

    methods: {
        getCustomOrderList() {
            getCustomRentalOrderList(this.search).then(res => {
                if (res.code == 0) {
                    this.list = res.data.records
                    this.total = res.data.total
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
            this.search.name = ''
            this.search.taxOpen = ''
            this.search.carBrand = ''
            this.search.beginDate = ''
            this.search.endDate = ''
            this.dateRange = []
        },

        goDetailPage(row) {
            this.$router.push({
                path: '/workOrder/customOrderRentalDetail',
                query: {
                    orderId: row.id,
                }
            })
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
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