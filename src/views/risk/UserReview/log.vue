<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>风控管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信审</el-breadcrumb-item>
        <el-breadcrumb-item class="subscription-plan">查询日志</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <div class="title">筛选</div>
        <div class="search-wrap">
            <div class="search-line">
                <div class="search-item">
                    <div class="label">查询条件</div>
                    <c-input 
                        :inputValue.sync="search.ruleName"
                        placeholder="请输入查询条件"
                    />
                </div>

                <div class="search-item">
                    <div class="label label2">查询应用模型</div>
                    <c-select
                        :selectValue.sync="search.modelId"
                        :options="modelList"
                        labelKey="name"
                        valueKey="id"
                    />
                </div>

                <div class="search-item">
                    <div class="label">查询状态</div>
                    <c-select
                        :selectValue.sync="search.status"
                        :options="STATUS_TYPE"
                    />
                </div>

                <search-button class="search-btn" @search="searchList"/>
            </div>

            <div class="search-line search-line2">
                <div class="search-item">
                    <div class="label">数据来源</div>
                    <c-select
                        :selectValue.sync="search.riskCooperationService"
                        :options="dataTypeList"
                    />
                </div>

                <div class="search-item">
                    <div class="label label2">查询日期</div>
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
                label="编号"
                width="80"
            >
                <template slot-scope="scope">
                    <div>{{getIndex(scope.$index)}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="ruleName"
                label="条件名称"
            >
            </el-table-column>
            <el-table-column
                prop="userName"
                label="查询客户"
            >
            </el-table-column>
            <el-table-column
                prop="modelName"
                label="查询应用模型"
            >
            </el-table-column>
            <el-table-column
                label="查询状态"
                width="80"
            >
                <template slot-scope="scope">
                    <div v-if="(scope.row.status == 1)">成功</div>
                    <div v-else-if="(scope.row.status == 0)">查询中</div>
                    <div v-else-if="(scope.row.status == 2)">
                        <el-tooltip class="item" effect="dark" :content="scope.row.result" placement="bottom-start">
                            <div style="display:flex;align-items:center;color:#EA0000">
                                失败 <i class="el-icon-warning-outline" style="margin-left: 3px;"></i>
                            </div>
                        </el-tooltip>
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column
                label="查询费用"
                width="80"
            >
                <template slot-scope="scope">
                    <div>{{getQueryMoney(scope.row.queryMoney)}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="riskCooperationServiceName"
                label="数据来源"
            >
            </el-table-column>
            <el-table-column
                prop="createdTime"
                label="查询日期"
                width="160"
            >
            </el-table-column>
            <el-table-column
                prop="updatedTime"
                label="完成日期"
                width="160"
            >
            </el-table-column>
        </el-table>

        <div class="total-wrap">
            <div class="total-item">查询次数：{{count || count === 0 ? count : '-'}}</div>
            <div class="total-item">查询费用：{{totalQueryMoney || totalQueryMoney === 0 ? totalQueryMoney : '-'}}</div>
        </div>

        <pagination 
            :total="total"
            @handleCurrentChange="handleCurrentChange"
        />
    </div>
  </div>
</template>

<script>
import { selectCooperationServiceName, getModels, getLogs } from '@/api/risk/userReview'
import { STATUS_TYPE } from '@/utils/constant'

export default {
    name: 'Log',
    components: {

    },
    data() {
        return {
            STATUS_TYPE,
            search: {
                ruleName: '',
                modelId: '',
                status: '',
                riskCooperationService: '',
                minDate: null,
                maxDate: null,
                limit: 10,
                page: 1,
            },
            dataTypeList: [],
            total: 0,
            dateRange: [],
            modelList: [],
            list: [],
            count: null,
            totalQueryMoney: null,
        }
    },

    mounted() {
        this.selectCooperationServiceName()
        this.getModels()
        this.getLogs()
    },

    methods: {
        selectCooperationServiceName() {
            selectCooperationServiceName().then(res => {
                if (res.code == 0) {
                    this.dataTypeList = res.data.map(item => {
                        return {
                            label: item,
                            value: item
                        }
                    })
                }
            })
        },

        getModels() {
            getModels({
                limit: 100,
                page: 1,
            }).then((res) => {
                if (res.code == 0) {
                    this.modelList = res.data.records
                }
            })
        },

        getLogs() {
            getLogs(this.search).then(res => {
                if (res.code == 0) {
                    this.list = res.data.pageRespVo.records
                    this.total = res.data.pageRespVo.total
                    this.count = res.data.count
                    this.totalQueryMoney = res.data.totalQueryMoney
                }
            })
        },

        handlerSelectDate(data) {
            this.search.minDate = data[0]
            this.search.maxDate = data[1]
            this.dateRange = data
        },

        searchList() {
            this.search.page = 1
            this.getLogs()
        },

        reset() {
            this.search.ruleName = ''
            this.search.modelId = ''
            this.search.status = ''
            this.search.riskCooperationService = ''
            this.search.minDate = null
            this.search.maxDate = null
            this.dateRange = []
        },

        handleCurrentChange(e) {
            this.search.page = e
            this.getLogs()
        },

        getIndex(index) {
            return ((this.search.page - 1) * this.search.limit + (index + 1)+'').padStart(3, '00')
        },

        getQueryMoney(queryMoney) {
            let res = '-'

            if(queryMoney || queryMoney == 0) {
                res = `¥ ${queryMoney}`
            }

            return res
        },
    },
}
</script>

<style lang="less" scoped> 
.content {
    padding-bottom: 100px;
}
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
.total-wrap {
    margin-top: 30px;
    display: flex;
    .total-item {
        flex: 1;
        height: 18px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 18px;
        color: #1D2129;
    }
}
</style>