<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>工单管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="title">查看详情</div>
            <div class="detail-wrap">
                <div class="record-list-wrap">
                    <div class="sub-title">跟进记录</div>
                    <div class="record-list">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(item, index) in recordList"
                                :key="item.id"
                                :timestamp="item.createTime"
                            >
                                <div class="timeline-content">
                                    <div class="status">{{ item.status }}</div>
                                    <div 
                                        v-if="index !== recordList.length - 1"
                                        class="desc-btn"
                                        :class="{'active-desc-btn': openDescId === item.id}"
                                        @click="openDescDialog(item.id, item.description)"
                                    >
                                        查看描述
                                    </div>
                                    <!-- <div v-show="showDescDialog && openDescId === item.id" class="desc">
                                        {{ item.description }}
                                        <div class="close-btn" @click="closeDescDialog">
                                            <i class="el-icon-circle-close"></i>
                                        </div>
                                    </div> -->
                                </div>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>

                <div class="userinfo">
                    <div class="title">客户需求</div>
                    <div class="detail-info">
                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">用户电话: </div>
                                <div class="item-content">{{ detail.mobile }} </div>
                            </div>
                            <div class="item">
                                <div class="item-title">用车城市: </div>
                                <div class="item-content">{{ detail.city }} </div>
                            </div>
                        </div>
                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">车型信息: </div>
                                <div class="item-content">{{ detail.carProduct }}</div>
                            </div>
                            <div class="item">
                                <div class="item-title">提交时间: </div>
                                <div class="item-content">{{ detail.createTime }} </div>
                            </div>
                        </div>
                        <div class="detail-line">
                            <div class="item">
                                <div class="item-title">计划提车时间: </div>
                                <div class="item-content">{{ detail.deliveryDate }} </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="(recordList[0] && recordList[0].statusCode === 1) || (recordList[0] && recordList[0].statusCode === 2)">
                        <div class="title">添加记录</div>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="跟进状态" prop="status">
                                <c-select
                                    :selectValue.sync="ruleForm.status"
                                    :options="FOLLOW_STATUS_TYPE"
                                    :showAllValue="false"
                                />
                            </el-form-item>
                            <el-form-item label="跟进描述" prop="description">
                                <c-text-area 
                                    :inputValue.sync="ruleForm.description"
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
import { selectUserRequirementLogList, addUserRequirementLog } from '@/api/workerOrder/customOrder'
import { FOLLOW_STATUS_TYPE } from '@/utils/constant'

export default {
    name: 'customOrderDetail',

    data () {
        return {
            detail: {},
            recordList: [],
            FOLLOW_STATUS_TYPE,
            ruleForm: {
                status: '',
                description: '',
            },
            rules: {
                status: [
                    { required: true, message: '请选择跟进状态', trigger: 'change' }
                ],
                description: [
                    { required: true, message: '请输入跟进记录描述', trigger: 'blur' }
                ]
            },
            openDescId: null,
            openDesc: '',
            showDescDialog: false,
        }
    },

    mounted() {
        const detail = this.$route.query.detail
        this.detail = JSON.parse(detail)
        this.selectUserRequirementLogList()
    },

    methods: {
        selectUserRequirementLogList() {
            const params = {
                userRequirementId: this.detail.id
            }

            selectUserRequirementLogList(params).then(res => {
                if (res.code == 0) {
                    this.recordList = res.data
                }
            })
        },

        add() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const data = {
                        userRequirementId: this.detail.id,
                        ...this.ruleForm,
                    }

                    addUserRequirementLog(data).then(res => {
                        if (res.code == 0) {
                            this.$message.success('保存成功')
                            this.selectUserRequirementLogList()
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

.detail-wrap {
    height: 0;
    flex: 1;
    display: flex;
    .record-list-wrap {
        width: 300px;
        height: 100%;
        padding: 40px 0;
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
        width: 350px;
        display: flex;
        .item-title {
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