<template>
    <div class="wrap">
        <div class="title">用户信息</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="item">
                    <div class="item-title">用户姓名：</div>
                    <div class="item-content">{{(detail.userInfoEntity && detail.userInfoEntity.userName) || detail.userName}}</div>
                </div>
                <div class="item">
                    <div class="item-title">用户性别：</div>
                    <div class="item-content">{{detail.sex ? SEX_STATUS[detail.sex] : ''}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">联系方式：</div>
                    <div class="item-content">{{detail.mobile}}</div>
                </div>
                <div class="item">
                    <div class="item-title">用户来源：</div>
                    <div class="item-content">{{ PARTNER_SOURCE_STATUS[detail.source] }}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">用车城市：</div>
                    <div class="item-content">{{detail.city}}</div>
                </div>
                <div class="item">
                    <div class="item-title">注册时间：</div>
                    <div class="item-content">{{ detail.registerTime }}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">近期活跃：</div>
                    <div class="item-content">{{detail.lastLive}}</div>
                </div>
                <div class="item">
                    <div class="item-title">沟通结果：</div>
                    <div class="item-content">{{ detail.valid || detail.valid == 0 ? PARTNER_VALID_STATUS[detail.valid] : '' }}</div>
                </div>
            </div>
        </div>
        
        <div class="title">认证信息</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="certificate-item">
                    <div class="item-title">身份证：</div>
                    <div class="img-content" v-if="detail.userInfoEntity && detail.userInfoEntity.idcardUrl">
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.userInfoEntity.idcardUrl" 
                                    :preview-src-list="[detail.userInfoEntity.idcardUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">身份证人像面照片</div>
                        </div>
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.userInfoEntity.idcardBackUrl" 
                                    :preview-src-list="[detail.userInfoEntity.idcardBackUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">身份证国徽面照片</div>
                        </div>
                    </div>
                </div>
                <div class="certificate-item">
                    <div class="item-title">驾驶证：</div>
                    <div class="img-content" v-if="detail.userInfoEntity && detail.userInfoEntity.driverLicenseUrl">
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.userInfoEntity.driverLicenseUrl" 
                                    :preview-src-list="[detail.userInfoEntity.driverLicenseUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">驾驶证主页照片</div>
                        </div>
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.userInfoEntity.driverLicenseSecondSheetUrl" 
                                    :preview-src-list="[detail.userInfoEntity.driverLicenseSecondSheetUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">驾驶证副页照片</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="title">意向偏好</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="item">
                    <div class="item-title">用车需求：</div>
                    <div class="item-content">{{ PARTNER_CUSTOMERDEMAND_STATUS[detail.customerDemand] || '' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">用车场景：</div>
                    <div class="item-content">{{ PARTNER_VEHICLESCENARIO_STATUS[detail.vehicleScenario] || '' }}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">能源类型：</div>
                    <div class="item-content">{{ PARTNER_ENERGYTYPE_STATUS[detail.energyType] || '' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">价格区间：</div>
                    <div class="item-content">{{ PARTNER_PRICERANGE_STATUS[detail.priceRange] || '-' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import {
  PARTNER_CUSTOMERDEMAND_LIST,
  PARTNER_CUSTOMERDEMAND_STATUS,
  PARTNER_VEHICLESCENARIO_LIST,
  PARTNER_VEHICLESCENARIO_STATUS,
  PARTNER_COMMUNICATERESULT_LIST,
  PARTNER_COMMUNICATERESULT_STATUS,
  PARTNER_ENERGYTYPE_LIST,
  PARTNER_ENERGYTYPE_STATUS,
  PARTNER_STATUS_LIST,
  PARTNER_STATUS_STATUS,
  PARTNER_PRICERANGE_LIST,
  PARTNER_PRICERANGE_STATUS,
  PARTNER_VEHICLEUSAGETIME_LIST,
  PARTNER_VEHICLEUSAGETIME_STATUS,
  PARTNER_VALID_LIST,
  PARTNER_VALID_STATUS,
  PARTNER_SOURCE_LIST,
  PARTNER_SOURCE_STATUS,
  SEX_LIST,
  SEX_STATUS,
} from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            PARTNER_CUSTOMERDEMAND_LIST,
            PARTNER_CUSTOMERDEMAND_STATUS,
            PARTNER_VEHICLESCENARIO_LIST,
            PARTNER_VEHICLESCENARIO_STATUS,
            PARTNER_COMMUNICATERESULT_LIST,
            PARTNER_COMMUNICATERESULT_STATUS,
            PARTNER_ENERGYTYPE_LIST,
            PARTNER_ENERGYTYPE_STATUS,
            PARTNER_STATUS_LIST,
            PARTNER_STATUS_STATUS,
            PARTNER_PRICERANGE_LIST,
            PARTNER_PRICERANGE_STATUS,
            PARTNER_VEHICLEUSAGETIME_LIST,
            PARTNER_VEHICLEUSAGETIME_STATUS,
            PARTNER_VALID_LIST,
            PARTNER_VALID_STATUS,
            PARTNER_SOURCE_LIST,
            PARTNER_SOURCE_STATUS,
            SEX_LIST,
            SEX_STATUS,
        }
    },

    mounted() {
        
    },

    methods: {
        formatThousandNumber(num) {
            if (num || num == 0) {
                return `￥${formatThousandNumber(num)}`
            }
            return '-'
        },

        getOrderStatus() {
            let res = '-'

            if(this.detail.orderAndUserDetail.status || this.detail.orderAndUserDetail.status == 0) {
                res = ORDER_STATUS[this.detail.orderAndUserDetail.status]
            }

            return res
        },  

        getPaymentType() {
            let res = '-'

            if(this.detail.orderAndUserDetail.paymentType || this.detail.orderAndUserDetail.paymentType == 0) {
                res = PAYMENT_TYPE[this.detail.orderAndUserDetail.paymentType]
            }

            return res
        },

        getDeposit() {
            let res = '-'

            if(this.detail.orderAndUserDetail.paymentType || this.detail.orderAndUserDetail.paymentType == 0) {
                if (this.detail.orderAndUserDetail.paymentType == 0) {
                    res = '减免保证金'
                } else {
                    res = this.formatThousandNumber(this.detail.orderAndUserDetail.deposit)
                }
            }

            return res
        }
    },
}
</script>

<style lang="less" scoped>
.wrap {
    margin-bottom: 55px;
}
.title {
    margin-left: 100px;
    margin-bottom: 30px;
    height: 26px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.9);
}

.items-wrap {
    margin: 0 100px 40px;
    .items-line {
        margin-bottom: 18px;
        display: flex;
        .item {
            flex: 1;
            display: flex;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            line-height: 28px;
            margin-right: 10px;
            .item-title {
                width: 135px;
                text-align: right;
                color: #86909C;
            }
            .item-content {
                flex: 1;
                margin-left: 8px;
                color: #1D2129;
            }
        }
    }
}

.services {
    display: flex;
    flex-wrap: wrap;
    .service {
        padding: 0 4px;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        border: 1px solid #E5E6EB;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #1D2129;
        margin-right: 16px;
        margin-bottom: 12px;
    }
}

.certificate-item {
    flex: 1;
    margin-left: 60px;
    margin-right: 10px;
    .item-title {
        margin-bottom: 6px;
        height: 23px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        line-height: 23px;
        color: #86909C;
    }
    .img-content {
        display: flex;
    }
    .img-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:first-child {
            margin-right: 32px;
        }
        .img-box {
            margin-bottom: 12px;
            width: 160px;
            height: 100px;
            overflow: hidden;
            .el-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .img-title {
            height: 23px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            line-height: 23px;
            color: #3D3D3D;
        }
    }
}
</style>