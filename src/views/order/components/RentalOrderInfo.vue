<template>
    <div class="wrap">
        <div class="title">车辆信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">车辆型号: </div>
                    <div class="item-content">{{ detail.carBrand}}{{ detail.carType}} {{ detail.carTypeYear}}{{ detail.carTypeYearProduct}}</div>
                </div>
                <div class="item">
                    <div class="item-title">外观颜色: </div>
                    <div class="item-content">{{ detail.carColor || '待绑定' }}</div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">车辆牌照: </div>
                    <div class="item-content">{{ detail.plateNum || '待绑定' }}</div>
                </div>
            </div>
        </div>

        <div class="title">用车信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">车辆押金: </div>
                    <div class="item-content">¥ {{ formatThousandNumber(detail.deposit) }}</div>
                </div>
                <div class="item">
                    <div class="item-title">付款方式: </div>
                    <div class="item-content">{{detail.businessType === 1 ? '月付' : '一次性付'}}</div>
                </div>
                <div class="item" v-if="detail.businessType === 1">
                    <div class="item-title">租赁月数: </div>
                    <div class="item-content">第{{ detail.currentMonth }}/{{ detail.monthTotal }}月</div>
                </div>
                <div class="item">
                    <div class="item-title">取车时间: </div>
                    <div class="item-content">{{ detail.startDate }}</div>
                </div>
                <div class="item">
                    <div class="item-title">取车地址: </div>
                    <div class="item-content">{{ detail.pickUpAddress }}</div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">租车费用: </div>
                    <div class="item-content">
                        ￥{{ formatThousandNumber(detail.totalPayment) }} 
                        <span v-if="detail.businessType === 1">（￥{{ formatThousandNumber(detail.paymentEveryMonth) }}/月）</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">取送车服务费: </div>
                    <div class="item-content">¥ {{ formatThousandNumber(0) }}</div>
                </div>
                <div class="item" v-if="detail.businessType === 1">
                    <div class="item-title">还款日期: </div>
                    <div class="item-content">每月{{ detail.day }}日</div>
                </div>
                <div class="item">
                    <div class="item-title">还车时间: </div>
                    <div class="item-content">{{ detail.endDate }}</div>
                </div>
                <div class="item">
                    <div class="item-title">还车地址: </div>
                    <div class="item-content">{{ detail.returnAddress }}</div>
                </div>
            </div>
        </div>


        <div class="title">订单信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">订单编号: </div>
                    <div class="item-content">{{ detail.orderNum }}</div>
                </div>
                <div class="item">
                    <div class="item-title">交车员工: </div>
                    <div class="item-content">
                        {{ detail.pickUpUserName || '' }}
                        <span 
                            v-if="orderStatus == 70 || orderStatus == 80"
                            style="padding-left:5px;color:#3446AA;text-decoration:underline;cursor:pointer;" 
                            @click="setPickCarPerson(1)"
                        >
                            {{ detail.pickUpUserName ? '重新分配' : '待分配' }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">下单时间: </div>
                    <div class="item-content">{{ detail.createdDate }}</div>
                </div>
                <div class="item">
                    <div class="item-title">取车员工: </div>
                    <div class="item-content">
                        {{ detail.returnUserName || '' }}
                        <span 
                            v-if="orderStatus == 70 || orderStatus == 80"
                            style="padding-left:5px;color:#3446AA;text-decoration:underline;cursor:pointer;" 
                            @click="setPickCarPerson(2)"
                        >
                            {{ detail.returnUserName ? '重新分配' : '待分配' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <SetPickCarPersonDialog 
            v-if="showSetPickCarPersonDialog"
            :show.sync="showSetPickCarPersonDialog"
            :currentOrder="currentRow"
            @save="savePickCarPerson"
        />
    </div>
</template>

<script>
import { setPickCarPerson } from '@/api/order/orderManagement'
import { formatThousandNumber } from '@/utils/util'
import SetPickCarPersonDialog from './SetPickCarPersonDialog.vue'

export default {
    components: {
        SetPickCarPersonDialog,
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
            currentRow: {},
            showSetPickCarPersonDialog: false,
        }
    },

    mounted() {
        
    },

    methods: {
        formatThousandNumber(num, defaultValue = '-') {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return defaultValue
        },

        // type: 1.交车 2.取车
        setPickCarPerson(type) {
            this.currentRow = {
                ...this.detail,
                name: this.detail.userName,
                type,
            }
            this.showSetPickCarPersonDialog = true
        },

        savePickCarPerson(data) {
            const parmas = {
                id: data.id,
                type: data.type,
                userId: data.userId,
                userName: data.userName,
            }

            setPickCarPerson(parmas).then((res) => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('update')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
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