<template>
    <div>
        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                v-if="type < 5"
                prop="orderNum"
                label="订单编号"
                align="center"
            >
            </el-table-column>

            <el-table-column
                v-if="type < 6"
                label="车辆信息"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                        <div>{{scope.row.carTypeYear}}</div>
                        <div>{{scope.row.carTypeYearProduct}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="客户信息"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.name}}</div>
                        <div>{{scope.row.mobile}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="支付费用"
            >
                <template slot-scope="scope">
                    <div v-if="type == 1 || type == 4 || type == 5">{{ scope.row.deposit ? `${formatThousandNumber(scope.row.deposit)}元` : '-' }}</div>
                    <div v-else>{{ scope.row.totalPayment ? `${formatThousandNumber(scope.row.totalPayment)}元` : '-' }}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="支付方式"
            >
                <template slot-scope="scope">
                    <div>{{ scope.row.payType ? payTypeList[scope.row.payType] : '-' }}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="订单状态"
            >
                <template slot-scope="scope">
                    <div>{{ scope.row.confirmed || scope.row.confirmed == 0 ? confirmList[scope.row.confirmed] : '-' }}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="审核人员"
            >
                <template slot-scope="scope">
                    <div>{{ scope.row.updateName || '-' }}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="审核日期"
            >
                <template slot-scope="scope">
                    <div>{{ scope.row.updateTime || '-' }}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div v-if="scope.row.confirmed == 0" class="table-btn" @click="goFinanceDetailPage(scope.row)">确认收款</div>
                    <div v-else class="table-btn" @click="goFinanceDetailPage(scope.row)">查看详情</div>
                </template>
            </el-table-column>
        </el-table>

      
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'

export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
        type: {
            type: Number, // 1.提车押金 2.订阅费用 3.租车业务租金 4.租车业务押金 5.竞拍 6.充值
            required: true,
        },
    },

    data() {
        return {
            payTypeList: {
                '1': '微信支付',
                '2': '银行转账',
                '3': '混合支付',
            },
            confirmList: {
                0: '待确认',
                1: '已完成',
                2: '已驳回',
            },
            typeList: {
                1: '提车押金',
                2: '订阅费用',
                3: '租车费用',
                4: '租车押金',
            },
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

        goFinanceDetailPage(row) {
            this.$router.push({
                path: '/finance/detail',
                query: {
                    orderId: row.id,
                    name: row.name,
                    mobile: row.mobile,
                    emergencyContactName: row.emergencyContactName,
                    emergencyContactPhone: row.emergencyContactPhone,
                    type: this.type,
                    userId: row.userId,
                },
            })
        },
    },
}
</script>

<style lang="less" scoped>

</style>