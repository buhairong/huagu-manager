<template>
    <div class="wrap">
        <div class="title">交易信息</div>

        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">发起方: </div>
                    <div class="item-content">{{ detail.biddingDisputes.name }}</div>
                </div>

                <div class="item">
                    <div class="item-title">保证金 : </div>
                    <div class="item-content">{{ formatThousandNumber(detail.biddingDisputes.deposit) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">商户需赔付: </div>
                    <div class="item-content">{{ formatThousandNumber(detail.biddingDisputes.mercharPaytPrice) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">取消原因: </div>
                    <div class="item-content">{{ detail.biddingDisputes.reason }}</div>
                </div>

                <div class="item">
                    <div class="item-title">取消交易描述: </div>
                    <div class="item-content">{{ detail.biddingDisputes.description }}</div>
                </div>
            </div>

            <div class="right">
                <div class="item">
                    <div class="item-title">联系方式: </div>
                    <div class="item-content">{{ detail.biddingDisputes.mobile }}</div>
                </div>

                <div class="item">
                    <div class="item-title">最终竞价: </div>
                    <div class="item-content">{{ formatThousandNumber(detail.biddingDisputes.finalPrice) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">用户需赔付: </div>
                    <div class="item-content">{{ formatThousandNumber(detail.biddingDisputes.wecarsPayPrice) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">提交时间: </div>
                    <div class="item-content">{{ detail.biddingDisputes.createdTime }}</div>
                </div>
            </div>
        </div>

        <div class="item">
            <div class="item-title">取消交易凭证: </div>
            <div class="img-wrap">
                <div class="car-pic" v-for="(item, index) in detail.biddingDisputes.imageList" :key="index">
                    <el-image
                        style="width:100%;"
                        :src="item"
                        :preview-src-list="detail.biddingDisputes.imageList"
                        :initial-index="index"
                    ></el-image>
                </div>
            </div>
        </div>

        <template v-if="detail.biddingDisputes.status >= 2">
            <div class="title">取消交易审核</div>

            <div class="container">
                <div class="left">
                    <div class="item">
                        <div class="item-title">审核结果: </div>
                        <div class="item-content">{{ disputeStatus[detail.biddingDisputes.status] }}</div>
                    </div>

                    <div class="item" v-if="detail.biddingDisputes.status === 2">
                        <div class="item-title">处理结果: </div>
                        <div class="item-content">{{ disputeResultStatus[detail.biddingDisputes.result] }}</div>
                    </div>

                    <div class="item" v-else-if="detail.biddingDisputes.status === 3">
                        <div class="item-title">驳回原因: </div>
                        <div class="item-content">{{ detail.biddingDisputes.rejectReason }}</div>
                    </div>
                </div>

                <div class="right">
                    <div class="item">
                        <div class="item-title">审核人员: </div>
                        <div class="item-content">{{ detail.biddingDisputes.updatedBy }}</div>
                    </div>

                    <div class="item">
                        <div class="item-title">审核时间: </div>
                        <div class="item-content">{{ detail.biddingDisputes.updatedTime }}</div>
                    </div>
                </div>
            </div>
        </template>
        
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { disputeStatus, disputeResultStatus } from "@/utils/constant"

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            disputeStatus,
            disputeResultStatus,
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
        margin-top: 24px;
        display: flex;
        .left{
            margin-right: 100px;
        }
    }

    .item {
        margin-bottom: 16px;
        display: flex;
        .item-title {
            margin-right: 8px;
            width: 110px;
            height: 21px;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 21px;
            color: #86909C;
            width: 95px;
            text-align: right;
        }
        .item-content {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 21px;
            color: #1D2129;
        }
    }
    .img-wrap {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
    }
}

.car-pic {
    margin-right: 32px;
    margin-bottom: 32px;
    width: 100px;
}
</style>