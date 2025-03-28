<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>商户管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">设置商户</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-loading="syncLoading" element-loading-text="保存中">
            <div>
                <div class="title">{{ COMPANY_TYPE[type] }}</div>
           
                <div class="container">
                    <el-steps :active="activeStep" align-center style="width:500px;">
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
                            v-show="activeStep === 0"
                            ref="step1"
                            :detail="detail"
                            :type="type"
                            @change="change"
                        />

                        <Step2 
                            v-if="detail"
                            v-show="activeStep === 1"
                            ref="step2"
                            :detail="detail"
                            @change="change"
                        />

                        <Step3 
                            v-if="detail"
                            v-show="activeStep === 2"
                            ref="step3"
                            :detail="detail"
                            @change="change"
                        />
                    </div>
                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back" v-if="activeStep === 0">取消</div>
                <div class="btn" @click="prev" v-else>上一步</div>

                <div class="btn save-btn" @click="save" v-if="activeStep === 2">{{type == 1 ? '邀请入驻' : '保存'}}</div>
                <div class="btn save-btn" @click="next" v-else>下一步</div>
            </div>
        </div>

        <SignDialog v-if="showSignDialog" :show.sync="showSignDialog" :detail="detail" @save="saveDialog"/>
    </div>
</template>

<script>
import { getCompanyDetail, addCarDealer, addFinancialService } from '@/api/merchant/merchant'
import { COMPANY_TYPE } from '@/utils/constant'
import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'
import SignDialog from './components/SignDialog.vue'

const detail = {
    // step1
    chooseRole: '',
    isFinancial: '',
    cityId: '',
    cityName: '',
    carBrandIdList: [],
    companyName: '',
    businessLicense: '',
    corporationTaxNumber: '',
    shopName: '',
    address: '',
    contactMobile: '',
    shopHeadPic: '',
    lat: null,
    lng: null,
    // step2
    managerName: '',
    managerMobile: '',
    // step3
    bankAccount: '',
    bankName: '',
    // step4
    signTime: 1,  
    signType: 1,
}

export default {
    name: 'addMerchant',

    components: {
        Step1,
        Step2,
        Step3,
        SignDialog,
    },

    data() {
        return {
            COMPANY_TYPE,
            type: null,
            operator: null,
            companyId: null,
            activeStep: 0,
            stepList: [
                '商户信息',
                '超级管理员信息',
                '收款信息',
            ],
            detail: null,
            syncLoading: false,
            showSignDialog: false,
        }
    },

    mounted() {
        this.type = this.$route.query.type
        this.operator = this.$route.query.operator
        this.companyId = this.$route.query.companyId

        if (this.operator == 1) {
            this.detail = {
                ...detail,
                companyType: this.type,
            }
        } else {
            this.getCompanyDetail()
        }
    },

    methods: {
        getCompanyDetail() {
            const params = {
                companyId: this.companyId,
            }

            getCompanyDetail(params).then(res => {
                if(res.code === 0) {
                    this.detail = {
                        ...res.data.company,
                        ...res.data,
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
            --this.activeStep
        },

        next() {
            if (this.activeStep === 0) {
                this.$refs.step1.$refs.step1form.validate((valid) => {
                    if (valid) {
                        ++this.activeStep
                    } else {
                        this.$message.error('请检查输入项')
                    }
                })
            } else if (this.activeStep === 1) {
                this.$refs.step2.$refs.step2form.validate((valid) => {
                    if (valid) {
                        ++this.activeStep
                    } else {
                        this.$message.error('请检查输入项')
                    }
                })
            }
        },

        save() {
            this.$refs.step3.$refs.step3form.validate((valid) => {
                if (valid) {
                    if (this.type == 1) {
                        this.showSignDialog = true
                    } else {
                        this.addFinancialService()
                    }
                } else {
                    this.$message.error('请检查输入项')
                }
            })
        },

        saveDialog(data) {
            this.detail.signTime = data.signTime
            this.detail.signType = data.signType
            this.addCarDealer()
        },

        // 汽车经销商新增或者修改
        addCarDealer() {
            addCarDealer(this.detail).then(res => {
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

        // 金融服务商新增或修改
        addFinancialService() {
            addFinancialService(this.detail).then(res => {
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
        margin-bottom: 32px;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.9);
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>