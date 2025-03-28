<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>竞价管理</el-breadcrumb-item>
            <el-breadcrumb-item>交易纠纷</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-if="detail">
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
                    <DisputeInfo 
                        v-show="activeTab === 1"
                        :detail="detail"
                    />

                    <CarInfo 
                        v-show="activeTab === 2"
                        :detail="detail"
                    />

                    <CarPhotos 
                        v-show="activeTab === 3"
                        :detail="detail"
                    />
                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">返回</div>
                <div class="btn-group" v-if="detail.biddingDisputes.status === 1">
                    <div class="btn save-btn" @click="openPassDialog">审核通过</div>
                    <div class="btn save-btn" @click="openRejectDialog">审核驳回</div>
                </div>
            </div>
        </div>

        <el-dialog
            title="审核通过"
            :visible.sync="showPassDialog"
            width="450px"
            :before-close="handleClose"
        >
            <div class="dialog-wrap">
                <div class="title">请确认通过交易纠纷处理。</div>

                <div class="result-item">
                    处理结果：
                    <el-radio-group v-model="result">
                        <el-radio 
                            v-for="item in disputeResultList"
                            :key="item.value"
                            :label="item.value"
                        >
                            {{ item.label  }}
                        </el-radio>
                    </el-radio-group>
                </div>

                <div class="btn-group">
                    <div class="btn" @click="handleClose">取消</div>
                    <div class="btn save-btn" @click="updateStatus(2)">确认</div>
                </div>
            </div>
        </el-dialog>

        <el-dialog
            title="审核驳回"
            :visible.sync="showRejectDialog"
            width="450px"
            :before-close="handleClose"
        >
            <div class="dialog-wrap">
                <div class="title">请确认驳回交易纠纷处理。</div>

                <div class="dialog-tip">驳回原因<span style="color:#86909C">（必填项）</span></div>
                <c-text-area 
                    :inputValue.sync="rejectReason"
                    placeholder="请输入驳回原因~最多可输入100个字"
                />

                <div class="btn-group">
                    <div class="btn" @click="handleClose">取消</div>
                    <div class="btn save-btn" @click="updateStatus(3)">确认</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDisputesDetail, updateDisputesStatus } from "@/api/auction/auction"
import { disputeResultList } from "@/utils/constant"
import DisputeInfo from './components/DisputeInfo.vue'
import CarInfo from '../cars/components/CarInfo.vue'
import CarPhotos from '../cars/components/CarPhotos.vue'

export default {
    name: 'DisputeDetail',

    components: {
        DisputeInfo,
        CarInfo,
        CarPhotos,
    },

    data() {
        return {
            disputeResultList,
            disputeId: null,
            newOrOlder: null,
            activeTab: 1,
            tabs: [
                {id: 1, text: '交易信息'},
                {id: 2, text: '车辆信息'},
                {id: 3, text: '车辆照片'},
            ],
            detail: null,
            showPassDialog: false,
            showRejectDialog: false,
            result: null, // 1.商家赔付 2.用户赔付
            rejectReason: '',
        }
    },

    computed: {
        ...mapState(['userInfo'])
    },

    mounted() {
        this.disputeId = this.$route.query.disputeId
        this.getDetail()
    },

    activated() {
        this.disputeId = this.$route.query.disputeId
        this.getDetail()
    },

    deactivated() {
        this.detail = null
    },

    methods: {
        getDetail() {
            const data = {
                id: this.disputeId,
            }

            getDisputesDetail(data).then(res => {
                if (res.code === 0) {
                    this.detail = {
                        ...res.data,
                        carInfoRespVo: res.data.secondHandCars
                    }
                }
            })
        },

        back() {
            this.$router.back()
        },

        updateStatus(status) {
            if (status === 2) {
                if (!this.result) {
                    this.$message.error('请选择处理结果')
                    return
                }
            } else if (status === 3) {
                if (!this.rejectReason) {
                    this.$message.error('请输入驳回原因')
                    return
                }
            }


            const data = {
                id: this.disputeId,
                status,
                rejectReason: this.rejectReason,
                result: this.result,
                updatedBy: this.userInfo.name,
            }

            updateDisputesStatus(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('操作成功')
                    this.handleClose()
                    this.getDetail()
                } else {
                    this.$message.error('操作失败')
                }
            }).catch(err => {
                this.$message.error('操作失败')
            })
        },

        changeTab(tab) {
            this.activeTab = tab
        },
        handleClose() {
            this.showPassDialog = false
            this.showRejectDialog = false
        },

        openPassDialog() {
            this.showPassDialog = true
        },

        openRejectDialog() {
            this.showRejectDialog = true
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
        display: flex;
        .tab {
            margin-right: 8px;
            width: 88px;
            height: 28px;
            border-radius: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            cursor: default;
            &.active {
                background: #F2F3F8;
                color: #3446AA;
            }
        }
    }

    .tab-container {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.btn-group {
    display: flex;
}

.dialog-wrap {
    .title {
        margin-bottom: 20px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #3D3D3D;
    }

    .result-item {
        display: flex;
        align-items: center
    }

    .btn-group {
        margin-top: 45px;
        display: flex;
        justify-content: center;
        .btn {
            width: 91px;
            height: 32px;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #F2F3F5;
            color: #1D2129;
            cursor: default;
        }
        .save-btn {
            margin-left: 38px;
            background: #3446AA;
            color: #FFFFFF;
        }
    }
}


</style>