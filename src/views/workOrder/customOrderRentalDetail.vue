<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>定制管理</el-breadcrumb-item>
            <el-breadcrumb-item>融资租赁</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-if="detail">
            <div class="btn-wrap">
                <div class="create-btn" @click="goDetailPage" v-if="detail.carFinanceLeaseEntity.userCarFinanceLeaseSubscribeId">查看融资租赁订单</div>
                <div class="create-btn" @click="createOrder" v-else-if="detail.carFinanceLeaseLogEntityList[0].status === 2">创建融资租赁订单</div>
            </div>
            <div class="detail-wrap">
                <div class="record-list-wrap">
                    <div class="title">跟进记录</div>
                    <div class="record-list">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(item, index) in detail.carFinanceLeaseLogEntityList"
                                :key="item.id"
                                :timestamp="item.createTime"
                            >
                                <div class="timeline-content">
                                    <div class="status">{{ FOLLOW_STATUS[item.status] }}</div>
                                    <div 
                                        v-if="index !== detail.carFinanceLeaseLogEntityList.length - 1"
                                        class="desc-btn"
                                        :class="{'active-desc-btn': openDescId === item.id}"
                                        @click="openDescDialog(item.id, item.remark)"
                                    >
                                        查看描述
                                    </div>
                                </div>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>

                <div class="userinfo">
                    <div class="title">用车信息</div>
                    <div class="detail-info">
                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">品牌车型: </div>
                                <div class="item-content">{{ detail.carFinanceLeaseEntity.carBrand }} </div>
                            </div>

                            <div class="item">
                                <div class="item-title">开票金额: </div>
                                <div class="item-content">{{ formatThousandNumber(detail.carFinanceLeaseEntity.invoicingAmount) }}</div>
                            </div>
                        </div>

                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">开票金额: </div>
                                <div class="item-content">{{ formatThousandNumber(detail.carFinanceLeaseEntity.invoicingAmount) }}</div>
                            </div>

                            <div class="item">
                                <div class="item-title">装潢费用: </div>
                                <div class="item-content">{{ formatThousandNumber(detail.carFinanceLeaseEntity.decorationExpenses) }} </div>
                            </div>
                        </div>

                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">融购置税: </div>
                                <div class="item-content">{{ TAX_OPEN_STATUS[detail.carFinanceLeaseEntity.taxOpen] }} </div>
                            </div>

                            <div class="item">
                                <div class="item-title">提交时间: </div>
                                <div class="item-content">{{ detail.carFinanceLeaseEntity.createdTime }} </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="detail.carFinanceLeaseEntity.orderType === 2">
                       <div class="title">企业信息</div>
                        <div class="detail-info">
                            <div class="detail-line">
                                <div class="item">
                                    <div class="item-title">企业名称: </div>
                                    <div class="item-content">{{ detail.userCompanyEntity.companyName }} </div>
                                </div>

                                <div class="item">
                                    <div class="item-title">企业地址: </div>
                                    <div class="item-content">{{ detail.userCompanyEntity.address }}</div>
                                </div>
                            </div>

                            <div class="detail-line">
                                <div class="item">
                                    <div class="item-title">法定代表人: </div>
                                    <div class="item-content">{{ detail.userCompanyEntity.contactName }}</div>
                                </div>

                                <div class="item">
                                    <div class="item-title">统一社会信用代码: </div>
                                    <div class="item-content">{{ detail.userCompanyEntity.corporationTaxNumber }} </div>
                                </div>
                            </div>

                            <div class="detail-line">
                                <div class="item">
                                    <div class="item-title">成立日期: </div>
                                    <div class="item-content">{{ detail.userCompanyEntity.establishDate }} </div>
                                </div>

                                <div class="item">
                                    <div class="item-title">营业期限: </div>
                                    <div class="item-content">{{ detail.userCompanyEntity.businessDeadline }} </div>
                                </div>
                            </div>

                            <div class="detail-line">
                                <div class="item">
                                    <div class="item-title">营业执照: </div>
                                    <div class="item-content">
                                        <el-image 
                                            style="width: 160px"
                                            :src="detail.userCompanyEntity.businessLicense" 
                                            :preview-src-list="[detail.userCompanyEntity.businessLicense]">
                                        </el-image>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    
                    <div class="title">客户信息</div>
                    <div class="detail-info">
                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">客户姓名: </div>
                                <div class="item-content">{{ detail.userEntity.name || '-' }} </div>
                            </div>

                            <div class="item">
                                <div class="item-title">身份证号: </div>
                                <div class="item-content">{{ detail.userInfoEntity && detail.userInfoEntity.idcard || '-' }}</div>
                            </div>
                        </div>

                        <div class="detail-line">
                            <div class="item" v-if="detail.userInfoEntity">
                                <div class="item-title">身份证件照: </div>
                                <div class="item-content">
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

                            <div class="item">
                                <div class="item-title">联系方式: </div>
                                <div class="item-content">{{ detail.userInfoEntity && detail.userEntity.mobile || '-' }} </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="(detail.carFinanceLeaseLogEntityList[0] && detail.carFinanceLeaseLogEntityList[0].status === 1) || (detail.carFinanceLeaseLogEntityList[0] && detail.carFinanceLeaseLogEntityList[0].status === 2)">
                        <div class="title">添加记录</div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="跟进状态" prop="status">
                                <c-select
                                    :selectValue.sync="ruleForm.status"
                                    :options="FOLLOW_STATUS_TYPE"
                                    :showAllValue="false"
                                />
                            </el-form-item>
                            <el-form-item label="跟进描述" prop="remark">
                                <c-text-area 
                                    :inputValue.sync="ruleForm.remark"
                                    :maxLength="1000"
                                    :rows="10"
                                    placeholder="请输入跟进记录描述"
                                />
                            </el-form-item>
                            <el-form-item class="btn-wrap">
                                <div class="btn" @click="add">添加跟进记录</div>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
            title="跟进记录描述"
            :visible.sync="showDescDialog"
            width="400px"
            :before-close="closeDescDialog"
        >
            {{ openDesc }}
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCustomRentalOrderDetail, addCustomRentalOrderLog } from '@/api/workerOrder/customOrder'
import { FOLLOW_STATUS_TYPE, FOLLOW_STATUS, TAX_OPEN_STATUS } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'

export default {
    name: 'customOrderRentalDetail',

    data () {
        return {
            orderId: '',
            detail: null,
            FOLLOW_STATUS_TYPE,
            FOLLOW_STATUS,
            TAX_OPEN_STATUS,
            ruleForm: {
                status: '',
                remark: '',
            },
            rules: {
                status: [
                    { required: true, message: '请选择跟进状态', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入跟进记录描述', trigger: 'blur' }
                ]
            },
            openDescId: null,
            openDesc: '',
            showDescDialog: false,
        }
    },

    computed: {
        ...mapState(['userInfo']),
    },

    mounted() {
        this.orderId = this.$route.query.orderId
        this.getCustomRentalOrderDetail()
    },

    methods: {
        getCustomRentalOrderDetail() {
            const params = {
                id: this.orderId,
            }

            getCustomRentalOrderDetail(params).then(res => {
                if (res.code === 0) {
                    this.detail = res.data
                }
            })
        },

        add() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const data = {
                        id: this.orderId,
                        followUserName: this.userInfo.name,
                        ...this.ruleForm,
                    }

                    addCustomRentalOrderLog(data).then(res => {
                        if (res.code == 0) {
                            this.$message.success('保存成功')
                            this.getCustomRentalOrderDetail()
                        } else {
                            this.$message.error('保存失败')
                        }
                    }).catch(err => {
                        this.$message.error('保存失败')
                    })
                }
            })
        },

        openDescDialog(id, desc) {
            this.openDescId = id
            this.openDesc = desc
            this.showDescDialog = true
        },

        closeDescDialog() {
            this.showDescDialog = false
            this.openDescId = null
            this.openDesc = ''
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },

        createOrder() {
            const customRentalOrderInfo = JSON.stringify(this.detail)
            localStorage.setItem('customRentalOrderInfo', customRentalOrderInfo)
            this.$router.push({
                path: '/order/setCustomerRentalOrder',
                query: {
                    type: 1,
                }
            })
        },

        goDetailPage() {
            this.$router.push({
                path: '/order/customerRentalOrderDetail',
                query: {
                    orderId: this.detail.carFinanceLeaseEntity.userCarFinanceLeaseSubscribeId,
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
}

.title {
    height: 28px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    line-height: 28px;
    color: #1D2129;
    margin-bottom: 23px;
}

.sub-title {
    height: 22px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
    color: #1D2129;
    margin-bottom: 40px;
}

.btn-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    .create-btn {
        width: 130px;
        height: 41px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3446AA;
        font-size: 14px;
        color: #FFFFFF;
        cursor: pointer;
    }
}

.detail-wrap {
    height: 0;
    flex: 1;
    display: flex;
    .record-list-wrap {
        width: 300px;
        height: 100%;
        padding-bottom: 40px;
        display: flex;
        flex-direction: column;
        .record-list {
            height: 0;
            flex: 1;
            overflow: auto;
            .timeline-content {
                display: flex;
                align-items: center;
                position: relative;
                .desc {
                    position: absolute;
                    top: -50%;
                    right: 36px;
                    z-index: 100;
                    min-width: 200px;
                    max-width: 400px;
                    border-radius: 5px;
                    background: #F3F3F3;
                    padding: 16px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 30px;
                    color: #000000;
                    .close-btn {
                        width: 20px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        z-index: 200;
                    }
                }
                .status {
                    height: 21px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 21px;
                    color: #1D2129;
                }
                .desc-btn {
                    margin-left: 32px;
                    height: 21px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 21px;
                    color: #3446AA;
                    cursor: default;
                }
                .active-desc-btn {
                    color: #ABABAF;
                }
            }
            .el-timeline {
                padding-left: 24px;
                /deep/ .el-timeline-item {
                    padding-bottom: 40px;
                }
            }
        }
    }
}

.userinfo {
    flex: 1;
}
.detail-info {
    margin-bottom: 40px;
}
.detail-line {
    margin-bottom: 16px;
    display: flex;
    .item {
        margin-right: 20px;
        width: 400px;
        display: flex;
        .item-title {
            width: 124px;
            text-align: right;
            padding-right: 8px;
            height: 21px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 21px;
            color: #86909C;
        }
        .item-content {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 21px;
            color: #1D2129;
            display: flex;
            .img-wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                &:first-child {
                    margin-right: 20px;
                }
                .img-box {
                    margin-bottom: 12px;
                    width: 128px;
                    height: 80px;
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
    }
}

.input-item {
    display: flex;
    align-items: center;
}

.el-form {
    width: 600px;
}

.el-textarea {
    width: 500px;
}

.btn-wrap {
    display: flex;
    justify-content: flex-end;
    .btn {
        width: 116px;
        height: 43px;
    }
}
</style>