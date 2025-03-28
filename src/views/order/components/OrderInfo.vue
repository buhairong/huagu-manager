<template>
    <div class="wrap">
        <div class="title">方案信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">用车城市: </div>
                    <div class="item-content">{{ detail.orderInfo.city || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">订阅周期: </div>
                    <div class="item-content">{{ detail.orderInfo.subscribeMouth }}/{{ detail.orderInfo.monthTotal === 6 && detail.orderInfo.paymentType ===4 ? 12 : detail.orderInfo.monthTotal }}月 (第{{ detail.orderInfo.orderSize }}期)</div>
                </div>
                <div class="item">
                    <div class="item-title">车辆押金: </div>
                    <div class="item-content">{{ detail.orderInfo.hasDepositFree === 2 ? '免押金' : `¥${formatThousandNumber(detail.orderInfo.deposit, '', 0)}` }}</div>
                </div>
                <div class="item" v-if="detail.orderInfo.hasDepositFree === 2">
                    <div class="item-title">违章押金: </div>
                    <div class="item-content">¥{{ formatThousandNumber(violationDeposit, '', 0) }}</div>
                </div>
                <div class="item">
                    <div class="item-title">买断价格: </div>
                    <div class="item-content">¥{{formatThousandNumber(detail.orderInfo.buyoutsFee, '', 0)}}</div>
                </div>
                <div class="item">
                    <div class="item-title">用户限定里程: </div>
                    <div class="item-content">{{detail.orderInfo.limitMileage ? formatThousandNumber(detail.orderInfo.limitMileage, '公里') : '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">精选服务: </div>
                    <div class="item-content">
                        {{ detail.orderInfo.carSubscribeFreeServiceList.map(item => item.serviceName).join('、') }}
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">牌照选择: </div>
                    <div class="item-content">{{ USE_PLATE[detail.orderInfo.usePlate] }}</div>
                </div>
                <div class="item">
                    <div class="item-title">支付方式: </div>
                    <div class="item-content">{{ PAYMENT_TYPE[detail.orderInfo.paymentType] }}</div>
                </div>
                <div class="item">
                    <div class="item-title">订阅费用: </div>
                    <div class="item-content">
                        ¥{{formatThousandNumber(detail.orderInfo.totalPayment, '', 0)}}
                        <span style="padding-left:4px;font-size:12px;color:#ABACB6;">（¥{{formatThousandNumber(detail.orderInfo.monthPayment, '', 0)}}/月）</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">期末选择: </div>
                    <div class="item-content">{{ detail.orderInfo.finalSelect }}</div>
                </div>
                <div class="item">
                    <div class="item-title">超出里程另付: </div>
                    <div class="item-content">{{detail.orderInfo.overMileageFee ? `￥${detail.orderInfo.overMileageFee}/公里` : '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">分销佣金: </div>
                    <div class="item-content">
                        {{detail.orderInfo.distributionBrokerageFree ? `¥${formatThousandNumber(detail.orderInfo.distributionBrokerageFree, '', 0)}` : '-'}}
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">保障服务: </div>
                    <div class="item-content">
                        <div class="service-tag" v-if="detail.orderInfo.safeguardServiceList.includes(0)">7x24小时道路救援</div>
                        <div class="service-tag" v-if="detail.orderInfo.safeguardServiceList.includes(1)">免费送车上门</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="title">订单信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">订单编号: </div>
                    <div class="item-content">{{ detail.orderInfo.orderNum || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">提车门店: </div>
                    <div class="item-content">
                        {{ detail.companyRespVo && detail.companyRespVo.shopName || '-' }}
                        <span 
                            v-if="orderStatus == 1 || orderStatus == 3"
                            style="padding-left:5px;color:#3446AA;text-decoration:underline;cursor:pointer;" 
                            @click="openDistributionDialog"
                        >
                            重新分配
                        </span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">订阅开始时间: </div>
                    <div class="item-content">{{ detail.orderInfo.startDate || '-' }}</div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">订单来源: </div>
                    <div class="item-content">
                        <div v-if="detail.orderInfo.orderSource === 0">客户自购</div>
                        <div v-else-if="detail.companyRespVo">{{ COMPANY_TYPE[detail.companyRespVo.companyType] }}-{{ detail.companyRespVo.shopName }}</div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">提车日期: </div>
                    <div class="item-content">{{ detail.orderInfo.carDeliveryTime || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">订阅结束时间: </div>
                    <div class="item-content">{{ detail.orderInfo.endDate || '-' }}</div>
                </div>
            </div>
        </div>

        <DistributionDialog 
            v-if="showDistributionDialog"
            :show="showDistributionDialog"
            :orderId="detail.orderInfo.id"
            :imageUrl="detail.carInfoRespVo.imageUrl"
            :carBrand="detail.carInfoRespVo.carBrand"
            :carType="detail.carInfoRespVo.carType"
            :carTypeYear="detail.carInfoRespVo.carTypeYear"
            :carTypeYearProduct="detail.carInfoRespVo.carTypeYearProduct"
            :orderNum="detail.carInfoRespVo.orderNum"
            :name="detail.orderInfo.name"
            :shopId="detail.companyRespVo.id"
            @close="handleCloseDistributionDialog"
            @save="saveDistribution"
        />
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { USE_PLATE, COMPANY_TYPE, PAYMENT_TYPE, violationDeposit } from '@/utils/constant'
import DistributionDialog from './DistributionDialog'

export default {
    components: {
        DistributionDialog,
    },

    props: {
        detail: {
            type: Object,
            required: true,
        },

        orderStatus: {
            type: [Number, String],
            required: true,
        },
    },

    data() {
        return {
            violationDeposit,
            USE_PLATE,
            COMPANY_TYPE,
            PAYMENT_TYPE,
            showDistributionDialog: false,
        }
    },

    mounted() {
        
    },

    methods: {
        formatThousandNumber(num, unit, defaultValue='-') {
            if (num || num == 0) {
                return formatThousandNumber(num) + unit
            }
            return defaultValue
        },

        openDistributionDialog() {
            this.showDistributionDialog = true
        },

        handleCloseDistributionDialog() {
            this.showDistributionDialog = false
        },

        saveDistribution() {
            this.handleCloseDistributionDialog()
            this.$emit('update')
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    padding-left: 100px;
    .title {
        margin: 24px 0;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 22px;
        color: #1D2129;
    }
    .container {
        padding-left: 50px;
        display: flex;
        .left {
            width: 400px;
            margin-right: 30px;
        }
        .right {
            width: 400px;
        }
        .item {
            margin-bottom: 16px;
            display: flex;
            .item-title {
                margin-right: 8px;
                height: 21px;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #86909C;
                width: 130px;
                text-align: right;
            }
            .item-content {
                width: 0;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #1D2129;
                .service-tag {
                    padding: 0 4px;
                    margin-right: 16px;
                    border: 1px solid #E5E6EB;
                    border-radius: 2px;
                }
            }
        }
    }
}
</style>