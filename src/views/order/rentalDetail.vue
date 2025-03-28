<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-if="detail">
            <div class="top">
                <div class="header">
                    <div class="tabs">
                        <div 
                            v-for="tab in tabs"
                            :key="tab.id"
                            class="tab"
                            :class="{active: tab.id == activeTab}"
                            @click="changeTab(tab.id)"
                        >
                            {{tab.text}}
                        </div>
                    </div>
                    <div class="order-status">订单状态：{{ CAR_RENTAL_ORDER_STATUS[orderStatus] }}</div>
                </div>
                

                <div style="margin-top: 40px;">
                    <OrderInfo 
                        v-if="orderDetail"
                        v-show="activeTab === 1"
                        :detail="orderDetail"
                        :orderStatus="orderStatus"
                        @update="getDetail"
                    />

                    <RentalCustomerInfo 
                        v-if="customerDetail"
                        v-show="activeTab === 2"
                        :detail="customerDetail"
                    />

                    <RentalContractInfo 
                        v-if="contractDetail"
                        v-show="activeTab === 3"
                        :detail="contractDetail"
                        @update="getDetail"
                    />

                    <RentalAccountInfo 
                        v-if="accountDetail"
                        v-show="activeTab === 4"
                        :detail="accountDetail"
                    />
                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">返回</div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectRentalOrderDetail } from '@/api/order/orderManagement'
import { CAR_RENTAL_ORDER_STATUS } from '@/utils/constant'
import OrderInfo from './components/RentalOrderInfo.vue'
import RentalCustomerInfo from './components/RentalCustomerInfo.vue'
import RentalContractInfo from './components/RentalContractInfo.vue'
import RentalAccountInfo from './components/RentalAccountInfo.vue'

export default {
    name: 'rentalDetail',

    components: {
        OrderInfo,
        RentalCustomerInfo,
        RentalContractInfo,
        RentalAccountInfo,
    },

    data() {
        return {
            CAR_RENTAL_ORDER_STATUS,
            orderId: null,
            activeTab: 1,
            tabs: [
                {id: 1, text: '订单信息'},
                {id: 2, text: '用户信息'},
                {id: 3, text: '合同信息'},
                {id: 4, text: '账单信息'},
                // {id: 5, text: '订单历史'},
                
            ],
            detail: null,
            orderStatus: null,
            orderDetail: null,
            customerDetail: null,
            contractDetail: null,
            accountDetail: null,
        }
    },

    mounted() {
        this.orderId = this.$route.query.orderId
        this.orderStatus = this.$route.query.orderStatus
        //this.orderStatus = 70
        
        this.getDetail()
    },

    activated() {
        this.orderId = this.$route.query.orderId
        this.orderStatus = this.$route.query.orderStatus
        
        this.getDetail()
        const from = localStorage.getItem('formOrderDetailTab')
        if (from) {
            localStorage.removeItem('formOrderDetailTab')
        } else {
            this.activeTab = 1
        }
    },

    deactivated() {
        this.detail = null
    },

    methods: {
        getDetail() {
            const data = {
                id: this.orderId,
            }

            selectRentalOrderDetail(data).then(res => {
                if (res.code === 0) {
                    this.detail = res.data

                    if (this.detail.riskQueryList && this.detail.riskQueryList.personalQuery && this.detail.riskQueryList.personalQuery.length) {
                        let str = '1'

                        let stautsRes = this.detail.riskQueryList.personalQuery.some(item => item.stauts == 0)
                        if (stautsRes) {
                            str = '4'
                        }

                        stautsRes = this.detail.riskQueryList.personalQuery.some(item => item.stauts == 2)
                        if (stautsRes) {
                            str = '5'
                        }

                        let ruleResultRes = this.detail.riskQueryList.personalQuery.some(item => item.ruleResult == 3 || !item.ruleResult)
                        if (ruleResultRes) {
                            str = '3'
                        }

                        ruleResultRes = this.detail.riskQueryList.personalQuery.some(item => item.ruleResult == 2)
                        if (ruleResultRes) {
                            str = '2'
                        }

                        this.detail.riskQueryList.personalQuery.push({
                            apiName: '查询结果', 
                            queryStatus: str
                        })
                    }

                    this.orderDetail = {
                        ...this.detail.carTypeYearProductEntity,
                        ...this.detail.rentalVo,
                    }

                    this.customerDetail = {
                        id: this.orderId,
                        faceAuditRecord: this.detail.faceAuditRecord,
                        ...this.detail.rentalVo,
                        ...this.detail.riskQueryList,
                    }

                    this.contractDetail = {
                        orderId: this.orderId,
                        contractList: this.detail.contractList,
                        faceAuditRecord: this.detail.faceAuditRecord,
                    }

                    this.accountDetail = {
                        ...this.detail.rentalVo,
                        billList: this.detail.bankBillRespVos,
                    }
                }
            })
        },

        back() {
            this.$router.back()
        },

        changeTab(tab) {
            this.activeTab = tab
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    height: unset;
    min-height: calc(100vh - 142px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .top {
        width: 100%;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .tabs {
        flex: 1;
        white-space: nowrap;
        overflow: auto;
        .tab {
            display: inline-block;
            margin-right: 8px;
            width: 88px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-radius: 32px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            cursor: default;
            &.active {
                background: #F2F3F8;
                color: #3446AA;
            }
        }
    }
}
</style>