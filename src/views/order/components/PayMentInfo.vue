<template>
    <div class="wrap">
        <div class="tabs">
            <div 
                class="tab"
                :class="{active: activeTab === 'billListOfDeposit'}"
                @click="changeTab('billListOfDeposit')"
            >
                车辆押金
            </div>
            <div 
                class="tab"
                :class="{active: activeTab === 'billList'}"
                @click="changeTab('billList')"
            >
                订阅费用
            </div>
        </div>

        <div class="container">
            <div class="pay-info" v-if="activeTab === 'billListOfDeposit'">
                <div class="left">
                    <div class="item">
                        <div class="item-title">车辆押金: </div>
                        <div class="item-content">￥{{ formatThousandNumber(detail.costInfo.deposit)}}</div>
                    </div>
                    <div class="item">
                        <div class="item-title">共计费用: </div>
                        <div class="item-content">
                            <div class="totalPay">
                                ￥<span class="price">
                                    {{ formatThousandNumber(detail.costInfo.deposit + (detail.costInfo.addedDeposit || 0)) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <div class="item-title">加收车辆押金: </div>
                        <div class="item-content">{{ detail.costInfo.addedDeposit ? `￥${formatThousandNumber(detail.costInfo.addedDeposit)}` : '-' }}</div>
                    </div>
                </div>
            </div>

            <div class="pay-info" v-if="activeTab === 'billList'">
                <div class="left">
                    <div class="item">
                        <div class="item-title">订阅费用: </div>
                        <div class="item-content">￥{{ formatThousandNumber(detail.costInfo.totalPayment)}}</div>
                    </div>
                    <div class="item">
                        <div class="item-title">保险费用: </div>
                        <div class="item-content">{{ detail.costInfo.premium ? `￥${formatThousandNumber(detail.costInfo.premium)}` : '-' }}</div>
                    </div>
                    <div class="item">
                        <div class="item-title">共计费用: </div>
                        <div class="item-content">
                            <div class="totalPay">
                                ￥<span class="price">
                                    {{ formatThousandNumber(detail.costInfo.totalPayment + (detail.costInfo.totalPlateNumFee || 0) + (detail.costInfo.premium || 0)) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <div class="item-title">牌照费用: </div>
                        <div class="item-content">{{ detail.costInfo.totalPlateNumFee ? `￥${formatThousandNumber(detail.costInfo.totalPlateNumFee)}` : '-' }}</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="create-btn-wrap" v-if="showPayBtn">
            <create-button 
                text="添加付款信息"
                @create="openCreateBankBillDialog"
            />
        </div>

        <el-table 
            :data="paiedInfoList"
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
                    <div>
                        ￥{{ formatThousandNumber(scope.row.total)}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="支付方式"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        {{scope.row.payWay === 1 ? '微信支付' : '银行转账'}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="createdTime"
                label="支付时间"
                align="center"
            >
            </el-table-column>

            <el-table-column
                label="交易单号"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        {{scope.row.wxOrderNum || '无'}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="转账凭证"
                align="center"
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

        <el-dialog
            title="添加付款信息"
            :visible.sync="showCreateBankBillDialog"
            width="560px"
        >
            <div class="item">
                <div class="item-label">付款方式：</div>
                <div class="item-content">银行转账</div>
            </div>

            <div class="item">
                <div class="item-label">付款金额：</div>
                <div class="item-content">
                    <c-input-number 
                        :inputValue.sync="total"
                        placeholder="请输入付款金额"
                        :inputStyle="{
                            width: '300px'
                        }"
                    >
                    </c-input-number> 元
                </div>
            </div>

            <div class="item">
                <div class="item-label">付款凭证：</div>
                <div class="item-content">
                    <div class="img-list">
                        <div class="img-wrap" v-for="(item, index) in bankBills" :key="index">
                            <el-image
                                style="width:100px;"
                                :src="item"
                                mode="widthFix"
                            ></el-image>
                            <div class="del-icon" @click="delImg(index)"><i class="el-icon-error" style="font-size: 20px;"></i></div>
                        </div>
                        
                        <el-upload
                            multiple
                            :action="UPLOAD_URL"
                            :show-file-list="false"
                            :before-upload="beforeImgUpload"
                            :on-success="handleSuccess"
                        >
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            
            <div class="item">
                <div class="item-label">付款时间：</div>
                <div class="item-content">
                    <c-date-time
                        :value.sync="createdTime"
                        placeholder="请选择付款时间"
                        :selectStyle="{
                            width: '300px'
                        }"
                    />
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <div class="dialog-btn-wrap">
                    <div class="btn" @click="handleCloseDialog">取消</div>
                    <div class="btn save-btn" @click="save">确认</div>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { createBankAccount, createBankBill } from '@/api/order/orderManagement'
import { formatThousandNumber } from '@/utils/util'
import { UPLOAD_URL, IMG_LIMIT_SIZE } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },

        userId: {
            type: [String, Number],
            required: true,
        },

        orderId: {
            type: [String, Number],
            required: true,
        },

        orderStatus: {
            type: [Number, String],
            required: true,
        },
    },

    data() {
        return {
            UPLOAD_URL,
            activeTab: 'billListOfDeposit',
            tabs: [
                {id: 1, text: '提车押金'},
                {id: 2, text: '订阅费用'},
            ],
            paiedInfoList: [],
            currentIndex: -1,
            showCreateBankBillDialog: false,
            total: undefined,
            bankBills: [],
            createdTime: '',
        }
    },

    computed: {
        showPayBtn() {
            return (this.activeTab === 'billListOfDeposit' && this.orderStatus == 2) || (this.activeTab === 'billList' && this.orderStatus == 4)
        },
    },

    watch: {
        detail: {
            handler(val) {
                this.paiedInfoList = val[this.activeTab] || []
            },
            immediate: true,
            deep: true
        }
    },

    mounted() {
        if (this.detail.billListOfDeposit) {
            this.paiedInfoList = this.detail.billListOfDeposit
        }
    },

    methods: {
        changeTab(tab) {
            this.activeTab = tab
            this.paiedInfoList = this.detail[tab]
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },

        onPreview(index) {
            this.currentIndex = index
            this.$nextTick(() => {
                this.$refs.preview.clickHandler()
            })
        },

        openCreateBankBillDialog() {
            this.showCreateBankBillDialog = true
        },

        handleCloseDialog() {
            this.showCreateBankBillDialog = false
            this.total = undefined
            this.bankBills = []
            this.createdTime = ''
        },

        beforeImgUpload(file) {
            const size = file.size / 1024 / 1024

            if (size > IMG_LIMIT_SIZE) {
                this.$message.error(`上传文件大小不能超过${IMG_LIMIT_SIZE}MB!`)
                return false
            }

            return true
        },

        handleSuccess(res, file) {
            if (res.code == 0) {
                this.bankBills.push(res.data.src)
            }
        },

        delImg(index) {
            this.$confirm(`确定要删除这张凭证吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.bankBills.splice(index, 1)
            })
        },

        async save() {
            if(!this.total) {
                this.$message.error('请输入付款金额')
                return
            }

            if(this.bankBills.length === 0) {
                this.$message.error('请上传付款凭证')
                return
            }

            if(!this.createdTime) {
                this.$message.error('请选择付款时间')
                return
            }

            const payType = this.activeTab === 'billListOfDeposit' ? 8 : 6

            const data = {
                businessId: this.orderId,
				businessType: 2,
				payType,
				total: this.total,
				userId: this.userId,
                createdTime: this.createdTime,
            }

            const res = await createBankAccount(data)

            if (res.code === 0) {
                const data1 = {
                    bankBills: this.bankBills,
                    id: res.data,
                    payType,
                    userId: this.userId,
                    createdTime: this.createdTime,
                }

                const res1 = await createBankBill(data1)

                if (res1.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('update')
                    this.handleCloseDialog()
                } else {
                    this.$message.error(res.msg)
                }
            } else {
                this.$message.error(res.msg)
            }
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    .tabs {
        display: flex;
        .tab {
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

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        .pay-info {
            padding: 60px 0;
            display: flex;
            .left {
            width: 300px;
            margin-right: 10px;
            }
            .right {
                width: 300px;
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
                }
                .totalPay {
                    color: #F0592E;
                    .price {
                        font-size: 16px;
                    }
                }
            }
        }
    }

    .tabel-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
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
}

.create-btn-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}

.item {
    margin-top: 16px;
    display: flex;
    .item-label {
        margin-right: 16px;
        height: 32px;
        line-height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #1D2129;
    }
    .item-content {
        width: 0;
        flex: 1;
        .img-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            ::v-deep .el-upload {
                width: 100px;
                height: 100px;
            }
        }
    }
}

.img-wrap {
    margin-right: 8px;
    margin-bottom: 16px;
    position: relative;
    .del-icon {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>