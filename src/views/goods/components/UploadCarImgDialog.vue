<template>
    <el-dialog
        :title="carImageLists.length ? '编辑图片' : '上传图片'"
        :visible.sync="showUploadCarImgDialog"
        width="958px"
        :before-close="handleClose"
    >
        <div class="dialog-wrap">
            <div class="title">
                {{uploadBrandName}}·{{uploadCarTypeName}}
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
                                this.handleSuccess(res, file, 0);
                            }
                        "
                    >
                        <img v-if="imageLists[0]" :src="imageLists[0]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="img-type">左前45度</div>
                </div>
                <div class="upload-item upload-item2">
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
                        <img v-if="imageLists[1]" :src="imageLists[1]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="img-type">车辆正前</div>
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
                        <img v-if="imageLists[2]" :src="imageLists[2]" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="img-type">车辆正侧</div>
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
import { uploadAndUpdateCarImage } from '@/api/goods/goods'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from '@/utils/constant'

export default {
    props: {
        showUploadCarImgDialog: {
            type: Boolean,
            default: false,
        },

        uploadCarTypeId: {
            type: Number,
            required: true,
        },

        uploadBrandName: {
            type: String,
            required: true,
        },

        uploadCarTypeName: {
            type: String,
            required: true,
        },

        carImageLists: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            UPLOAD_URL,
            IMG_ACCEPT,
            imageLists: [],
        }
    },

    mounted() {
        this.imageLists = [...this.carImageLists]
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

        handleSuccess(res, file, index) {
            if (res.code == 0) {
                this.$set(this.imageLists, index, res.data.src)
            }
        },

        save() {
            if (!this.imageLists[0]) {
                this.$message.error('请上传车辆左前45度图片')
                return
            }

            if (!this.imageLists[1]) {
                this.$message.error('请上传车辆正前图片')
                return
            }

            if (!this.imageLists[2]) {
                this.$message.error('请上传车辆正侧图片')
                return
            }

            this.uploadAndUpdateCarImage()
        },

        uploadAndUpdateCarImage() {
            let data = {
                picsUrls: this.imageLists,
                carTypeId: this.uploadCarTypeId,
            }

            uploadAndUpdateCarImage(data).then((res) => {
                if (res.code == 0) {
                    this.$emit('carImgSaveSuccess')
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
            this.$emit('update:showUploadCarImgDialog', false)
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