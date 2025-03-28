<template>
    <div class="wrap">
        <div class="title">竞价方案</div>

        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">起拍价格: </div>
                    <div class="item-content">{{ formatThousandNumber(detail.secondAuction.startingPrice) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">保 证 金 : </div>
                    <div class="item-content">{{ formatThousandNumber(detail.secondAuction.deposit) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">开始时间: </div>
                    <div class="item-content">{{ detail.secondAuction.startTime }}次</div>
                </div>

                <div class="item">
                    <div class="item-title">创建时间: </div>
                    <div class="item-content">{{ detail.secondAuction.createdTime }}</div>
                </div>

                <div class="item">
                    <div class="item-title">商户名称: </div>
                    <div class="item-content">{{ detail.secondHandCars.merchantName }}</div>
                </div>
            </div>

            <div class="right">
                <div class="item">
                    <div class="item-title">加价幅度: </div>
                    <div class="item-content">{{ formatThousandNumber(detail.secondAuction.advance) }}元</div>
                </div>

                <div class="item">
                    <div class="item-title">竞价周期: </div>
                    <div class="item-content">{{ detail.secondAuction.periodDay }}天</div>
                </div>

                <div class="item">
                    <div class="item-title">结束时间: </div>
                    <div class="item-content">{{ detail.secondAuction.endTime }}</div>
                </div>

                <div class="item">
                    <div class="item-title">竞价状态: </div>
                    <div class="item-content">{{ auctionCarStatus[detail.secondAuction.status] }}</div>
                </div>

                <div class="item">
                    <div class="item-title">创建人员: </div>
                    <div class="item-content">{{ detail.secondAuction.createdBy }}</div>
                </div>
            </div>
        </div>

        <div class="title">竞买列表</div>
        <el-table
            :data="detail.secondAuctionRecordEntityList"
            :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
        >
            <el-table-column
                prop="userName"
                label="竞买人"
                align="center"
            >
            </el-table-column>

            <el-table-column
                label="价格"
                align="center"
            >
                <template slot-scope="scope">
                    <div>{{ formatThousandNumber(scope.row.price) }}元</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="auctionTime"
                label="出价时间"
                align="center"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { auctionCarStatus } from "@/utils/constant"

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            auctionCarStatus,
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
    }
}
</style>