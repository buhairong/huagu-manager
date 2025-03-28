<template>
    <div class="wrap">
        <div class="car-info">
            <el-image
                style="width:108px;height:80px"
                :src="detail.imageUrl"
                fit="cover"
            ></el-image>
            {{ detail.carBrand }}·{{ detail.carType }} {{ detail.carTypeYear }} {{ detail.carTypeYearProduct }}
        </div>

        <div class="travelLicense">
            <div class="item">
                <div class="item-title">行驶证照片</div>
                <div class="item-content">
                    <el-upload
                        :action="UPLOAD_URL"
                        :show-file-list="false"
                        :accept="IMG_ACCEPT"
                        :before-upload="beforeImgUpload"
                        :on-success="handleSuccess"
                    >
                        <img v-if="detail.travelLicenseUrl" :src="detail.travelLicenseUrl" style="width:100%;">
                        <img v-else :src="require('@/assets/car/travelLicense.png')">
                    </el-upload>
                </div>
            </div>

            <div class="item">
                <div class="item-title">车牌号</div>
                <div class="item-content">
                    <c-input 
                        :inputValue.sync="detail.carPlateNum"
                        placeholder="系统自动识别，可修改"
                        :inputStyle="{
                            width: '200px'
                        }"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-title">车架号</div>
                <div class="item-content">
                    <c-input 
                        :inputValue.sync="detail.carVin"
                        placeholder="系统自动识别，可修改"
                        :inputStyle="{
                            width: '200px'
                        }"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-title">发动机号</div>
                <div class="item-content">
                    <c-input 
                        :inputValue.sync="detail.carEngineNum"
                        placeholder="系统自动识别，可修改"
                        :inputStyle="{
                            width: '200px'
                        }"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-title">车辆注册日期</div>
                <div class="item-content">
                    <c-date 
                        :value.sync="detail.registerDate"
                        placeholder="系统自动识别，可修改"
                    />
                </div>
            </div>

            <div class="item">
                <div class="item-title">车辆上牌日期</div>
                <div class="item-content">
                    <c-date 
                        :value.sync="detail.plateDate"
                        placeholder="请选择车辆上牌日期"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { OCRDrivingLicense } from '@/api/car/car'
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

        handleSuccess(res, file) {
            if (res.code == 0) {
                this.detail.travelLicenseUrl = res.data.src
                this.OCRDrivingLicense()
            }
        },

        OCRDrivingLicense() {
            const data = {
                imageUrl: this.detail.travelLicenseUrl
            }

            OCRDrivingLicense(data).then(res => {
                if(res.code === 0) {
                    this.detail.carPlateNum = res.data.carPlateNum
                    this.detail.carVin = res.data.carVin
                    this.detail.carEngineNum = res.data.carEngineNum
                    this.detail.registerDate = res.data.registerDate
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .car-info {
        display: flex;
        align-items: center;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.9);
    }
    .travelLicense {
        margin-top: 30px;
        .item {
            margin-bottom: 16px;
            display: flex;
            .item-title {
                margin-right: 30px;
                width: 84px;
                height: 32px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                line-height: 32px;
                color: #4E5969;
                text-align: right;
            }

            ::v-deep .el-upload {
                border: none;
                width: 212px;
                height: unset;
            }
        }
    }
}
</style>