<template>
    <div class="wrap">
        <div class="title">担保人信息</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="item">
                    <div class="item-title">担保人姓名：</div>
                    <div class="item-content">{{detail.guarantorInfo.name || '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">身份证号：</div>
                    <div class="item-content">{{detail.guarantorInfo.idcard || '-'}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">所在单位名称：</div>
                    <div class="item-content">{{detail.guarantorInfo.companyName || '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">认证时间：</div>
                    <div class="item-content">{{detail.guarantorInfo.createdTime || '-'}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">所在单位证明：</div>
                    <div class="img-content">
                        <div class="img-wrap">
                            <el-image 
                                style="width: 160px"
                                :src="detail.guarantorInfo.imageUrlList[0]" 
                                :preview-src-list="detail.guarantorInfo.imageUrlList"
                            >
                            </el-image>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">户籍所在地：</div>
                    <div class="item-content">{{detail.guarantorInfo.address}}</div>
                </div>
            </div>
        </div>
        
        <div class="title">证件照片</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="certificate-item">
                    <div class="item-title">身份证：</div>
                    <div class="img-content">
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.guarantorInfo.idcardUrl" 
                                    :preview-src-list="[detail.guarantorInfo.idcardUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">身份证人像面照片</div>
                        </div>
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.guarantorInfo.idcardBackUrl" 
                                    :preview-src-list="[detail.guarantorInfo.idcardBackUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">身份证国徽面照片</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { ORDER_STATUS, PAYMENT_TYPE } from '@/utils/constant'

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