<template>
    <div class="wrap">
        <div 
            class="insurance-wrap"
            v-for="(item, index) in detail.insuranceList"
            :key="index"
        >
            <div class="title">{{ item.insuranceType === 0 ? '交强险' : '商业险' }}</div>
            <div class="container">
                <div class="img-wrap">
                    <div class="img" v-for="img in item.insurancePicsList" :key="img.fileId">
                        <el-image
                            style="width:100%;height:100%"
                            :src="img.url"
                            fit="cover"
                        ></el-image>
                        <div class="del-icon" @click="delImg(index, img.fileId)"><i class="el-icon-error" style="font-size: 20px;"></i></div>
                    </div>
                    <el-upload
                        multiple
                        :action="UPLOAD_URL"
                        :show-file-list="false"
                        :accept="IMG_ACCEPT"
                        :before-upload="beforeImgUpload"
                        :on-success="(res, file) => handleSuccess(res, file, index)"
                    >
                        <img v-if="item.insuranceType === 0" :src="require('@/assets/car/jiaoqiang.png')">
                        <img v-else :src="require('@/assets/car/shangye.png')">
                    </el-upload>
                </div>

                <div class="item">
                    <div class="item-title">投保公司</div>
                    <div class="item-content">
                        <c-select
                            :selectValue.sync="item.insuranceCompany"
                            :options="insuranceCompanyList"
                            :showAllValue="false"
                            labelKey="insuranceName"
                            valueKey="id"
                        />
                    </div>
                </div>

                <div class="item">
                    <div class="item-title">保险单号</div>
                    <div class="item-content">
                        <c-input 
                            :inputValue.sync="item.insuranceNo"
                            placeholder="请输入投保单号"
                        />
                    </div>
                </div>

                <div class="item" v-if="item.insuranceType === 1">
                    <div class="item-title">三者金额</div>
                    <div class="item-content">
                        <c-input-number 
                            :inputValue.sync="item.amountOfThree"
                            placeholder="请输入三者金额"
                        >
                        </c-input-number>
                    </div>
                </div>

                <div class="item">
                    <div class="item-title">有效日期</div>
                    <div class="item-content">
                        <c-date 
                            :value.sync="item.expireDate"
                            placeholder="请选择有效日期"
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { listInsuranceCompany } from '@/api/car/car'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            insuranceCompanyList: [],
            UPLOAD_URL,
            IMG_ACCEPT,
        }
    },

    watch: {
        detail: {
            handler(val) {
                this.$emit('change', val)
            },
            immediate: true,
            deep: true
        }
    },

    mounted() {
        this.listInsuranceCompany()
    },

    methods: {
        listInsuranceCompany() {
            listInsuranceCompany().then(res => {
                if (res.code === 0) {
                    this.insuranceCompanyList = res.data
                }
            })
        },

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
                this.detail.travelLicenseUrl = res.data.src
                this.detail.insuranceList[index].insurancePicsList.push({
                    url: res.data.src,
                    fileId: res.data.fileId,
                })
            }
        },

        delImg(index, fileId) {
            this.$confirm(`确定要删除这张图片吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const findIndex = this.detail.insuranceList[index].insurancePicsList.findIndex(item => item.fileId === fileId)
                if (findIndex !== -1) {
                    this.detail.insuranceList[index].insurancePicsList.splice(findIndex, 1)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    width: 700px;
    .insurance-wrap {
        flex: 1;
        .title {
            margin-bottom: 20px;
            height: 22px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            line-height: 22px;
            color: #1D2129;
        }

        .container {
            padding-left: 60px;
            .img {
                width: 146px;
                height: 206px;
                margin-bottom: 20px;
                position: relative;
                .del-icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }
            ::v-deep .el-upload {
                border: none;
                width: 146px;
                height: unset;
            }

            .item {
                margin-top: 16px;
                display: flex;
                .item-title {
                    margin-right: 20px;
                    height: 32px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 32px;
                    color: #4E5969;
                    text-align: right;
                }
            }
        }
    }
}
</style>