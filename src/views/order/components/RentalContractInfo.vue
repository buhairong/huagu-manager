<template>
    <div class="wrap">
        <div class="add-plus-btn-wrap">
            <div class="add-plus-btn" @click="openDialog('add')">
                <span class="icon"><i class="el-icon-plus"></i></span>
                添加合同
            </div>
        </div>
        

        <el-table 
            :data="detail.contractList"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="合同名称"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        {{scope.row.contractName || '-'}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="合同附件"
                align="center"
            >
                <template slot-scope="scope">
                    <div class="files">
                        <el-image
                            style="width:16px;height:16px"
                            :src="require('@/assets/order/pdf-icon.png')"
                        ></el-image>
                        <div class="file-count">{{scope.row.fileList.length}}张</div>
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
                            :src="scope.row.fileList[0].contractFileUrl"
                            :preview-src-list="scope.row.fileList.map(item => item.contractFileUrl)"
                        >
                        </el-image>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                align="center"
            >
                <template slot-scope="scope">
                    <div style="display: flex;justify-content: center;">
                        <div class="table-btn" style="margin-right:16px" @click="openDialog('edit', scope.row)">修改合同</div>
                        <div class="table-btn" @click="delRecord(scope.row)">删除合同</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <FaceAudit 
            style="margin-top:100px;"
            :detail="detail"
            :businessNode="10"
        />

        <el-dialog
            :title="dialogType === 'add' ? '添加合同' : '修改合同'"
            :visible.sync="showDialog"
            width="560px"
        >
            <div class="item">
                <div class="item-label">合同名称：</div>
                <div class="item-content">
                    <c-input 
                        :inputValue.sync="currentAgreement.contractName"
                        placeholder="请输入合同名称"
                        :inputStyle="{
                            width: '350px'
                        }"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-label">合同编号：</div>
                <div class="item-content">
                    <c-input 
                        :inputValue.sync="currentAgreement.contractLabelNum"
                        placeholder="请输入合同编号"
                        :inputStyle="{
                            width: '350px'
                        }"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-label">合同类型：</div>
                <div class="item-content">
                    <c-input 
                        :inputValue.sync="currentAgreement.contractType"
                        placeholder="请输入合同类型"
                        :inputStyle="{
                            width: '350px'
                        }"
                    />
                </div>
            </div>
            
            <div class="item">
                <div class="item-label">签约时间：</div>
                <div class="item-content">
                    <c-date-time
                        :value.sync="currentAgreement.signTime"
                        placeholder="请选择签约时间"
                        :selectStyle="{
                            width: '350px'
                        }"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-label">有效期限：</div>
                <div class="item-content">
                    <date-range-select
                        :value.sync="dateRange"
                        @select="handlerSelectDate"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-label">合同附件：</div>
                <div class="item-content">
                    <div class="img-list">
                        <div class="img-wrap" v-for="(item, index) in currentAgreement.fileList" :key="index">
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
import { createOrUpdateRentalContract, deleteRentalContract } from '@/api/order/orderManagement'
import { UPLOAD_URL, IMG_LIMIT_SIZE } from '@/utils/constant'
import FaceAudit from './FaceAudit.vue'

export default {
    components: {
        FaceAudit,
    },

    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            UPLOAD_URL,
            currentIndex: -1,
            dialogType: '',
            showDialog: false,
            currentAgreement: {
                contractName: '',
                contractLabelNum: '',
                contractType: '',
                signTime: null,
                startTime: null,
                endTime: null,
                fileList: [],
            },
            dateRange: [],
        }
    },

    mounted() {
        
    },

    methods: {
        onPreview(index) {
            this.currentIndex = index
            this.$nextTick(() => {
                this.$refs.preview.clickHandler()
            })
        },

        openDialog(type, item = {}) {
            if (type === 'edit') {
                this.currentAgreement = {
                    ...item,
                    fileList: item.fileList.map(item => item.contractFileUrl)
                }

                this.dateRange = [item.startTime, item.endTime]

                console.log(this.currentAgreement)
            }
            
            this.dialogType = type
            this.showDialog = true
        },

        handleCloseDialog() {
            this.showDialog = false
            this.currentAgreement = {
                contractName: '',
                contractLabelNum: '',
                contractType: '',
                signTime: null,
                startTime: null,
                endTime: null,
                fileList: [],
            }
            this.dateRange = []
        },

        handlerSelectDate(data) {
            if (data) {
                this.currentAgreement.startTime = data[0]
                this.currentAgreement.endTime = data[1]
                this.dateRange = data
            } else {
                this.currentAgreement.startTime = null
                this.currentAgreement.endTime = null
                this.dateRange = []
            }
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
                this.currentAgreement.fileList.push(res.data.src)
            }
        },

        delImg(index) {
            this.$confirm(`确定要删除这张合同附件吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.currentAgreement.fileList.splice(index, 1)
            })
        },

        save() {
            if(!this.currentAgreement.contractName.trim()) {
                this.$message.error('请输入合同名称')
                return
            }

            if(!this.currentAgreement.contractLabelNum.trim()) {
                this.$message.error('请输入合同编号')
                return
            }

            if(!this.currentAgreement.contractType.trim()) {
                this.$message.error('请输入合同类型')
                return
            }

            if(!this.currentAgreement.signTime) {
                this.$message.error('请选择签约时间')
                return
            }

            if(!this.currentAgreement.startTime) {
                this.$message.error('请选择有效期限')
                return
            }

            if(this.currentAgreement.fileList.length === 0) {
                this.$message.error('请上传合同附件')
                return
            }

            const data = {
                orderId: this.detail.orderId,
                ...this.currentAgreement
            }

            createOrUpdateRentalContract(data).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('update')
                    this.handleCloseDialog()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        delRecord(row) {
            this.$confirm(`确定要删除${row.contractName}？删除后该合同信息无法恢复`, '删除合同', {
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const data = {
                    contractId: row.id,
                }

                deleteRentalContract(data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('删除成功')
                        this.$emit('update')
                    } else {
                        this.$message.error('删除失败')
                    }
                }).catch(err => {
                    this.$message.error('删除失败')
                })
            })
        },

        
    },
}
</script>

<style lang="less" scoped>
.wrap {
    padding: 0 80px;
    .add-plus-btn-wrap {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-end;
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
}
</style>