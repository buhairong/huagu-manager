<template>
    <el-dialog
        :title="bigLogo || smallLogo ? '修改logo' : '上传logo'"
        :visible.sync="showUploadBrandLogoDialog"
        width="958px"
        :before-close="handleClose"
    >
        <div class="dialog-wrap">
            <div class="title">
                {{uploadBrandName}}
            </div>
            <div class="upload-wrap">
                <div class="upload-item">
                    <el-upload
                        :action="UPLOAD_URL"
                        :show-file-list="false"
                        :accept="IMG_ACCEPT"
                        :before-upload="beforeImgUpload"
                        :on-success="
                            (res, file) => {
                                this.handleSuccess(res, file, 1);
                            }
                        "
                    >
                        <img v-if="logoUrl" :src="logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="img-type">首页logo</div>
                </div>
                <div class="upload-item upload-item2">
                    <el-upload
                        :action="UPLOAD_URL"
                        :show-file-list="false"
                        :accept="IMG_ACCEPT"
                        :before-upload="beforeImgUpload"
                        :on-success="
                            (res, file) => {
                                this.handleSuccess(res, file, 2);
                            }
                        "
                    >
                        <img v-if="logoUrlSmall" :src="logoUrlSmall" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="img-type">筛选页logo</div>
                </div>
            </div>
            <div class="btn-group">
                <div class="btn" @click="handleClose">取消</div>
                <div class="btn save-btn" @click="save">保存</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { updateBrandLogo } from '@/api/goods/goods'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from '@/utils/constant'

export default {
    props: {
        showUploadBrandLogoDialog: {
            type: Boolean,
            default: false,
        },

        uploadBrandId: {
            type: Number,
            required: true,
        },

        uploadBrandName: {
            type: String,
            required: true,
        },

        bigLogo: {
            type: String,
            required: true,
        },

        smallLogo: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            UPLOAD_URL,
            IMG_ACCEPT,
            logoUrl: '',
            logoUrlSmall: '',
        }
    },

    mounted() {
        this.logoUrl = this.bigLogo
        this.logoUrlSmall = this.smallLogo
    },

    methods: {
        beforeImgUpload(file) {
            const size = file.size / 1024 / 1024

            if (size > IMG_LIMIT_SIZE) {
                this.$message.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`)
                return false
            }

            return true
        },

        // type 1 首页logo 2 筛选页logo
        handleSuccess(res, file, type) {
            if (res.code == 0) {
                if (type === 1) {
                    this.logoUrl = res.data.src
                } else {
                    this.logoUrlSmall = res.data.src
                }
            }
        },

        save() {
            if (!this.logoUrl) {
                this.$message.error('请上传首页logo')
                return
            }

            if (!this.logoUrlSmall) {
                this.$message.error('请上传筛选页logo')
                return
            }

            this.UploadBrandLogoDialog()
        },

        UploadBrandLogoDialog() {
            let data = {
                brandId: this.uploadBrandId,
            }

            if (this.logoUrl) {
                data.logoUrl = this.logoUrl
            }

            if (this.logoUrlSmall) {
                data.logoUrlSmall = this.logoUrlSmall
            }

            updateBrandLogo(data).then((res) => {
                if (res.code == 0) {
                    this.$emit('logoSaveSuccess')
                    this.handleClose()
                    this.$message.success('上传成功')
                } else {
                    this.$message.error('上传失败')
                }
            }).catch(() => {
                this.$message.error('上传失败')
            })
        },

        handleClose() {
            this.$emit('update:showUploadBrandLogoDialog', false)
        },
    },
}
</script>

<style lang="less" scoped>
.dialog-wrap {
    title {
        height: 24px;
        font-family: PingFangSC-Medium;
        font-size: 18px;
        line-height: 24px;
        color: #3D3D3D;
    }
    .upload-wrap {
        margin-top: 64px;
        display: flex;
        justify-content: center;
        .upload-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .img-type {
                margin-top: 36px;
                height: 24px;
                font-family: PingFangSC-Medium;
                font-size: 22px;
                line-height: 24px;
                color: #3D3D3D;
            }
        }
        .upload-item2 {
            margin-left: 74px;
        }
    }
    .btn-group {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        .btn {
            width: 100px;
            height: 40px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #F2F3F5;
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #1D2129;
            cursor: pointer;
        }
        .save-btn {
            margin-left: 30px;
            background: #3446AA;
            color: #FFFFFF;
        }
    }
}
</style>