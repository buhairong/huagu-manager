<template>
    <div class="wrap">
        <el-table 
            :data="detail.orderRespVos"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                prop="orderNum"
                label="订单编号"
                align="center"
            >
            </el-table-column>

            <el-table-column
                label="订单来源"
                align="center"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.partnerRecommend === 1">
                        <div>合伙人引荐</div>
                        <div>佣金:￥{{formatThousandNumber(scope.row.distributionBrokerageFree)}}</div>
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="createdTime"
                label="下单日期"
                align="center"
            >
            </el-table-column>

            <el-table-column
                label="客户信息"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.name}}</div>
                        <div>{{scope.row.mobile}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="方案信息"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        <div>订阅周期：{{scope.row.monthTotal}}个月</div>
                        <div>期末选择：{{scope.row.finalSelect}}</div>
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column
                label="订单金额"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        <div>提车押金：{{formatThousandNumber(scope.row.deposit)}}元</div>
                        <div>订阅费用：{{formatThousandNumber(scope.row.totalPayment)}}元</div>
                        <div>买断价格：{{formatThousandNumber(scope.row.buyoutsFee)}}元</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="status"
                label="订单状态"
                align="center"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            
        }
    },

    mounted() {
        
    },

    methods: {
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
.wrap {
    padding: 0 100px;
}
</style>