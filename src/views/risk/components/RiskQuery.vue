<template>
    <div class="wrap">
        <div class="title">{{customTypeText}}</div>
        <el-table 
            :data="record"
            style="width: 100%"
            border
            :span-method="arraySpanMethod"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column :label="`${customTypeText}`" align="center">
                <el-table-column
                    prop="apiName"
                    label="查询条件"
                >
                </el-table-column>
                <el-table-column
                    label="命中条件"
                >
                    <template slot-scope="scope">
                        <div v-if="(scope.row.status == 1)">
                            <div>{{scope.row.ruleName || '-'}}</div>
                        </div>
                        <div style="color:#EA0000;" v-else-if="(scope.row.status == 2)">
                            查询失败
                        </div>
                        <div v-else>
                            <img :src="loadImg" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="结果"
                    width="60"
                >
                    <template slot-scope="scope">
                        <div v-if="(scope.$index === (record.length - 1))" :style="{color: RISK_QUERY_STATUS[scope.row.queryStatus].fontColor}">
                            {{RISK_QUERY_STATUS[scope.row.queryStatus].label}}
                        </div>
                        <div v-else>
                            <div v-if="(scope.row.ruleResult == 1)">
                                <img :src="passImg" alt="">
                            </div>
                            <div v-else-if="(scope.row.ruleResult == 2)">
                                <img :src="refuseImg" alt="">
                            </div>
                            <div v-else-if="(scope.row.ruleResult == 3)">
                                <div v-if="(scope.row.status == 1)">
                                    <img :src="manualImg" alt="">
                                </div>
                                <div v-else-if="(scope.row.status == 2)">
                                    <img :src="queryFailImg" alt="">
                                </div>
                                <div v-else>
                                    <img :src="loadImg" alt="">
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="(scope.row.status == 1)">
                                    <img :src="manualImg" alt="">
                                </div>
                                <div v-else-if="(scope.row.status == 2)">
                                    <img :src="queryFailImg" alt="">
                                </div>
                                <div v-else>
                                    <img :src="loadImg" alt="">
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="operator === 'update'"
                    label="操作"
                    width="80"
                    align="center"
                >
                    <template slot-scope="scope" v-if="(scope.row.status && scope.row.status != 0)">
                        <el-button class="table-btn" type="text" v-if="(scope.row.status == 2)" @click="updateRiskQueryAgain(scope.row)" style="padding-top:0;padding-bottom:0;">查询</el-button>
                        <el-tooltip class="item" effect="dark" :content="scope.row.result" placement="left" v-else>
                            <el-button class="table-btn" type="text" style="padding-top:0;padding-bottom:0;text-align:center;width:100%;">查看</el-button>
                        </el-tooltip>
                        <el-dropdown trigger="click" @command="(e) => handleCommand(e, scope.row)" v-if="(scope.row.ruleResult == 3 || !scope.row.ruleResult)">
                            <el-button class="table-btn" type="text">审核</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    v-for="item in RISK_STATUS"
                                    :key="item.value"
                                    :command="item.value"
                                >
                                    {{item.label}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { updateRiskQueryAgain, updateAuditStatusOfLog } from '@/api/risk/userReview'
import { RISK_QUERY_STATUS, RISK_STATUS } from '@/utils/constant'
import loadImg from '@/assets/risk/loading.png'
import passImg from '@/assets/risk/pass.png'
import refuseImg from '@/assets/risk/refuse.png'
import manualImg from '@/assets/risk/manual.png'
import queryFailImg from '@/assets/risk/query_fail.png'

export default {
    props: {
        orderId: {
            type: [String, Number],
        },

        auditRate: {
            type: [String, Number],
        },

        record: {
            type: Array,
            required: true,
            default: () => []
        },

        customType: {
            type: Number,
            required: true,
        },

        operator: {
            type: String,
            default: 'update',
        }
    },

    data() {
        return {
            loadImg,
            passImg,
            refuseImg,
            manualImg,
            queryFailImg,
            RISK_QUERY_STATUS,
            RISK_STATUS,
            queryStatus: '',
            customTypeText: '',
            riskInfo: [],
        }
    },

    mounted() {
        this.customTypeText = this.customType === 1 ? '大数据查询' : '企业风险查询模型'
        this.riskInfo = this.record
    },

    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === this.record.length - 1) {
                if (columnIndex === 0) {
                    return {
                        rowspan: 1,
                        colspan: 2
                    }
                } else if (columnIndex === 2) {
                    return {
                        rowspan: 1,
                        colspan: 2
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },

        handleCommand(ruleResult, row) {
            console.log('handleCommand', ruleResult)
            updateAuditStatusOfLog({
                auditRate: this.auditRate,
                orderId: this.orderId,
                logId: row.id,
                ruleResult,
                orderType: row.orderType,
            }).then((res) => {
                if (res.code == 0) {
                    this.$message.success('保存成功')
                    this.$emit('updateRiskQueryAgain')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        updateRiskQueryAgain(row) {
            updateRiskQueryAgain({
                auditRate: this.auditRate,
                orderId: this.orderId,
                logId: row.id,
            }).then((res) => {
                if (res.code == 0) {
                    this.$message.success('查询成功')
                    this.$emit('updateRiskQueryAgain')
                } else {
                    this.$message.error('查询失败')
                }
            }).catch(err => {
                this.$message.error('查询失败')
            })
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    margin-bottom: 55px;
}
.title {
    margin-bottom: 30px;
    height: 30px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    line-height: 30px;
    color: #1D2129;
}

.items-wrap {
    margin: 0 100px;
    .items-line {
        margin-bottom: 18px;
        display: flex;
        .item {
            flex: 1;
            display: flex;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            line-height: 23px;
            margin-right: 10px;
            .item-title {
                width: 128px;
                text-align: right;
                color: #86909C;
            }
            .item-content {
                margin-left: 8px;
                color: #1D2129;
            }
        }
    }
}

/deep/ .el-table__row:last-child {
    .el-table__cell:first-child {
        border-right: none;
    }
}
</style>