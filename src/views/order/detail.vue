<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="top">
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

                <div style="margin-top: 40px;">
                    <OrderInfo 
                        v-if="detail"
                        v-show="activeTab===1"
                        :detail="detail"
                        :orderStatus="orderStatus"
                        @update="getDetail"
                    />

                    <CustomerInfo 
                        v-if="detail"
                        v-show="activeTab===6"
                        :detail="detail"
                    />

                    <CarInfo 
                        v-if="detail"
                        v-show="activeTab===2"
                        :detail="detail"
                        :orderId="orderId"
                        :orderStatus="orderStatus"
                        @update="getDetail"
                    />

                    <AgreementInfo 
                        v-if="detail"
                        v-show="activeTab===5"
                        :detail="detail"
                        :orderId="orderId"
                        @update="getDetail"
                    />

                    <PayMentInfo 
                        v-if="detail && detail.paiedInfo"
                        v-show="activeTab===8"
                        :detail="detail.paiedInfo"
                        :userId="detail.orderInfo.userId"
                        :orderId="orderId"
                        :orderStatus="orderStatus"
                        @update="getDetail"
                    />

                    <VehicleInfo 
                        v-if="detail"
                        v-show="activeTab===3"
                        :detail="detail"
                    />

                    <InsuranceInfo 
                        v-if="detail"
                        v-show="activeTab===4"
                        :detail="detail"
                    />

                    <VehicleInfo 
                        v-if="detail"
                        v-show="activeTab===10"
                        :detail="detail"
                    />

                    

                    <!-- <MerchantInfo 
                        v-if="detail"
                        v-show="activeTab===7"
                        :detail="detail.companyRespVo"
                    /> -->

                    

                    <IdentityInfo 
                        v-if="detail"
                        v-show="activeTab===9"
                        :detail="detail.faceAuditRecord"
                    />

                    

                    <OrderHistory 
                        v-if="detail"
                        v-show="activeTab===11"
                        :detail="detail.userCarSubscribeLog"
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
import { selectCarDetailInfo } from '@/api/order/orderManagement'
import OrderInfo from './components/OrderInfo.vue'
import CarInfo from './components/CarInfo.vue'
import VehicleInfo from '@/views/cars/components/VehicleInfo.vue'
import InsuranceInfo from '@/views/cars/components/InsuranceInfo.vue'
import AgreementInfo from './components/AgreementInfo.vue'
import CustomerInfo from './components/CustomerInfo.vue'
import MerchantInfo from './components/MerchantInfo.vue'
import PayMentInfo from './components/PayMentInfo.vue'
import IdentityInfo from './components/IdentityInfo.vue'
import OrderHistory from './components/OrderHistory.vue'

export default {
    name: 'orderDetail',

    components: {
        OrderInfo,
        CarInfo,
        VehicleInfo,
        InsuranceInfo,
        AgreementInfo,
        CustomerInfo,
        //MerchantInfo,
        PayMentInfo,
        IdentityInfo,
        OrderHistory,
    },

    data() {
        return {
            orderId: null,
            type: null,
            activeTab: 1,
            tabs: [
                {id: 1, text: '订阅信息'},
                {id: 6, text: '用户信息'},
                {id: 2, text: '车辆信息'},
                {id: 5, text: '合同信息'},
                {id: 8, text: '付款信息'},
                {id: 10, text: '交车信息'},
                {id: 11, text: '订单历史'},
                // {id: 3, text: '验车信息'},
                // {id: 4, text: '保险信息'},
                // {id: 7, text: '商户信息'},
                // {id: 8, text: '付款信息'},
                // {id: 9, text: '认证信息'},
                
            ],
            detail: null,
            orderStatus: null,
        }
    },

    mounted() {
        this.orderId = this.$route.query.orderId
        this.type = this.$route.query.type
        this.orderStatus = this.$route.query.orderStatus
        
        this.getDetail()
    },

    activated() {
        this.orderId = this.$route.query.orderId
        this.type = this.$route.query.type
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
                orderId: this.orderId,
            }

            selectCarDetailInfo(data).then(res => {
                if (res.code === 0) {
                    if (res.data.otherConfigList.length) {
                        res.data.otherConfigList = res.data.otherConfigList[0].details.filter(item => item.hasCheck === 1)
                    } else {
                        res.data.otherConfigList = [{details:[]}]
                    }
                    
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

    .tabs {
        width: 100%;
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