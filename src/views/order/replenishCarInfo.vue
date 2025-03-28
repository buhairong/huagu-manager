<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">车辆信息</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-loading="syncLoading" element-loading-text="保存中">
            <div class="top">
                <div class="content-title">车辆信息</div>

                <el-steps :active="activeStep" align-center style="width:100%">
                    <el-step 
                        v-for="(item, index) in stepList"
                        :key="index"
                        :title="item"
                    >
                    </el-step>
                </el-steps>

                <div style="margin-top: 40px;">
                    <Step1 
                        v-if="detail"
                        v-show="activeStep===0"
                        :detail="detail"
                        @change="change"
                    />

                    <Step2 
                        v-if="detail"
                        v-show="activeStep===1"
                        :detail="detail"
                        @change="change"
                    />

                    <Step3 
                        v-if="detail"
                        v-show="activeStep===2"
                        :detail="detail"
                        @change="change"
                    />
                    
                </div>

            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back" v-if="activeStep === 0">取消</div>
                <div class="btn" @click="prev" v-else>上一步</div>

                <div class="btn save-btn" @click="save" v-if="activeStep === 2">确认</div>
                <div class="btn save-btn" @click="next" v-else>下一步</div>
            </div>
        </div>
    </div>
</template>

<script>
import Step1 from '@/views/cars/components/Step2.vue'
import Step2 from '@/views/cars/components/Step3.vue'
import Step3 from './components/Step3.vue'
import { addOrUpdateCarFinal, selectCarDetailInfo } from '@/api/car/car'

export default {
    name: 'replenishCarInfo',

    components: {
        Step1,
        Step2,
        Step3,
    },

    data() {
        return {
            newOrOld: null,
            carId: null,
            activeStep: 0,
            stepList: [
                '行驶证信息',
                '保险信息',
                '其他信息',
            ],
            detail: null,
            syncLoading: false,
        }
    },

    mounted() {
        this.newOrOld = this.$route.query.newOrOlder
        this.carId = this.$route.query.carId
        
        this.getDetail()
    },

    methods: {
        getDetail() {
            const data = {
                id: this.carId,
                newOrOld: this.newOrOld,
            }

            selectCarDetailInfo(data).then(res => {
                if (res.code === 0) {
                    this.detail = {
                        id: this.carId,
                        newOrOld: this.newOrOld,
                        carBrandId: res.data.carInfoRespVo.carBrandId,
                        carBrand: res.data.carInfoRespVo.carBrand,
                        carTypeId: res.data.carInfoRespVo.carTypeId,
                        carType: res.data.carInfoRespVo.carType,
                        carTypeYearId: res.data.carInfoRespVo.carTypeYearId,
                        carTypeYear: res.data.carInfoRespVo.carTypeYear,
                        carTypeYearProductId: res.data.carInfoRespVo.carTypeYearProductId,
                        carTypeYearProduct: res.data.carInfoRespVo.carTypeYearProduct,
                        imageUrl: res.data.carInfoRespVo.imageUrl,
                        carColor: res.data.carInfoRespVo.carColor,
                        otherConfigList: [{
                            function: "",
                            details: res.data.carInfoRespVo.otherConfigList,
                        }],
                        travelLicenseUrl: res.data.carInfoRespVo.travelLicenseUrl,
                        carPlateNum: res.data.carInfoRespVo.carPlateNum,
                        carVin: res.data.carInfoRespVo.carVin,
                        carEngineNum: res.data.carInfoRespVo.carEngineNum,
                        registerDate: res.data.carInfoRespVo.registerDate,
                        plateDate: res.data.carInfoRespVo.plateDate,
                        insuranceList: res.data.insuranceList,
                    }

                    if (res.data.insuranceList.length === 0) {
                        this.detail.insuranceList = [
                            {
                                insuranceType: 0, // 交强险
                                insuranceNo: '',
                                expireDate: '',
                                insuranceCompany: '',
                                insurancePicsList: []
                            },
                            {
                                insuranceType: 1, // 商业险
                                insuranceNo: '',
                                expireDate: '',
                                insuranceCompany: '',
                                amountOfThree: undefined,
                                insurancePicsList: []
                            },
                        ]
                    } else {
                        this.detail.insuranceList.map(item => {
                            if (item.insuranceCompany) {
                                item.insuranceCompany = item.insuranceCompany - 0
                            }
                            
                            return item
                        })
                    }

                    if (res.data.carInfoRespVo.otherConfigList.length === 0) {
                        this.detail.otherConfigList = [{
                            function: "",
                            details: [{
                                detailName: "",
                                money: undefined,
                                hasCheck: 1
                            }]
                        }]
                    }
                }
            })
        },

        back() {
            this.$router.back()
        },

        change(data) {
            this.detail = data
        },

        prev() {
            if (this.detail.otherConfigList[0].details.length === 0) {
                this.detail.otherConfigList[0].details.push({
                    configId: 0,
                    detailName: "",
                    money: undefined,
                    hasCheck: 1
                })
            }
            --this.activeStep
        },

        next() {
            if (this.activeStep === 0) {
                if(!this.detail.travelLicenseUrl) {
                    this.$message.error('请上传行驶证')
                    return
                }

                if(!this.detail.carPlateNum) {
                    this.$message.error('请输入车牌号')
                    return
                }

                if(!this.detail.carVin) {
                    this.$message.error('请输入车架号')
                    return
                } 

                if(!this.detail.carEngineNum) {
                    this.$message.error('请输入发动机号')
                    return
                } 

                if(!this.detail.registerDate) {
                    this.$message.error('请选择车辆注册日期')
                    return
                } 

                if(!this.detail.plateDate) {
                    this.$message.error('请选择车辆注册日期')
                    return
                } 
            }

            if (this.activeStep === 1) {
                for(const item of this.detail.insuranceList) {
                    if (item.insuranceType == 0) {
                        if(item.insurancePicsList.length === 0) {
                            this.$message.error('请上传交强险保单图片')
                            return
                        } 

                        if(!item.insuranceNo) {
                            this.$message.error('请输入交强险保险单号')
                            return
                        } 

                        if(!item.insuranceCompany) {
                            this.$message.error('请选择交强险投保公司')
                            return
                        } 

                        if(!item.expireDate) {
                            this.$message.error('请选择交强险有效日期')
                            return
                        } 
                    }

                    if (item.insuranceType == 1) {
                        if (item.insuranceNo || item.insuranceCompany || item.amountOfThree || item.amountOfThree == 0 || item.expireDate || item.insurancePicsList.length) {
                            if(item.insurancePicsList.length === 0) {
                                this.$message.error('请上传商业险保单图片')
                                return
                            } 

                            if(!item.insuranceNo) {
                                this.$message.error('请输入商业险保险单号')
                                return
                            } 

                            if(!item.insuranceCompany) {
                                this.$message.error('请选择商业险投保公司')
                                return
                            } 

                            if(!item.expireDate) {
                                this.$message.error('请选择商业险有效日期')
                                return
                            } 
                        }
                    }
                }
            }


            ++this.activeStep
        },

        save() {
            this.detail.otherConfigList[0].details = this.detail.otherConfigList[0].details.filter(item => {
                return item.detailName.trim() || item.money || item.money == 0
            })

            for(const item of this.detail.otherConfigList[0].details) {
                if(!item.detailName.trim()) {
                    this.$message.error('请输入增配项')
                    return
                }

                if(!item.money && item.money != 0) {
                    this.$message.error('请输入金额')
                    return
                }
            }

            


            addOrUpdateCarFinal(this.detail).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
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
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>