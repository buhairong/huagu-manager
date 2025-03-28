<template>
    <div class="wrap">
        <div class="title">付款明细</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">租车费用: </div>
                    <div class="item-content">¥ {{ formatThousandNumber(detail.totalPayment) }}</div>
                </div>
                <div class="item">
                    <div class="item-title">租车押金: </div>
                    <div class="item-content">¥ {{ formatThousandNumber(detail.deposit) }}</div>
                </div>
                <div class="item">
                    <div class="item-title">取送车服务费: </div>
                    <div class="item-content">¥ {{ formatThousandNumber(0) }}</div>
                </div>
            </div>
        </div>

        <div class="title">用车信息</div>
        <div class="container">
            <el-table 
                :data="detail.billList"
                style="width: 100%"
                :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
            >
                <el-table-column
                    label="笔数"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div>
                            第{{scope.$index + 1}}笔
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="支付金额"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div>{{ scope.row.paymentMoney ? `${formatThousandNumber(scope.row.paymentMoney)}元` : '-' }}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="支付方式"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div>{{ scope.row.payWay ? payTypeList[scope.row.payWay] : '-' }}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="支付时间"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div>{{ scope.row.paymentDate || '-' }}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="交易单号"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.wxOrderNum || '-'}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="转账凭证"
                    align="center"
                    width="140"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.bankBills.length === 0">无</div>
                        <div class="files" v-else>
                            <el-image
                                style="width:16px;height:16px"
                                :src="require('@/assets/order/pdf-icon.png')"
                            ></el-image>
                            <div class="file-count">{{scope.row.bankBills.length}}张</div>
                            <div 
                                class="review-btn"
                                @click="onPreview(scope.$index)"
                            >
                                查看
                            </div>
                            <el-image
                                v-if="(currentIndex === scope.$index)"
                                class="hideImgDiv"
                                ref="preview"
                                :src="scope.row.bankBills[0]"
                                :preview-src-list="scope.row.bankBills"
                            >
                            </el-image>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>


        
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'

export default {
    components: {
      
    },

    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            payTypeList: {
                '1': '微信支付',
                '2': '银行转账',
                '3': '线下支付',
            },
            currentIndex: -1,
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

        onPreview(index) {
            this.currentIndex = index
            this.$nextTick(() => {
                this.$refs.preview.clickHandler()
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
.files {
    display: flex;
    justify-content: center;
    align-items: center;
    .file-count {
        padding-left: 8px;
        padding-right: 16px;
    }
    .review-btn {
        color: #3446AA;
        cursor: pointer;
    }
}
.hideImgDiv {
    /deep/ .el-image__inner {
        display: none;
    }
}
</style>