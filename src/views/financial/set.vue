<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>订阅方案</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">{{operator == 1 ? '创建' : '修改'}}金融方案</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-loading="syncLoading" element-loading-text="保存中">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="适用业务">
                    <div>常规订阅</div>
                </el-form-item>

                <el-form-item label="适用金融方" prop="companyId">
                    <c-select
                        :selectValue.sync="form.companyId"
                        :options="merchantList"
                        placeholder="请选择金融方"
                        filterable
                        :showAllValue="false"
                        labelKey="companyName"
                        valueKey="id"
                        :selectStyle="{width: '300px'}"
                    />
                </el-form-item>

                <el-form-item label="适配地区" prop="cityIdList">
                    <c-select
                        :selectValue.sync="form.cityIdList"
                        :options="cityList"
                        multiple
                        filterable
                        :showAllValue="false"
                        labelKey="city"
                        valueKey="cityId"
                        :selectStyle="{width: '300px'}"
                        @change="changeCity"
                    />
                </el-form-item>

                <el-form-item label="商户类型" prop="merchantTypeList">
                    <el-checkbox-group v-model="form.merchantTypeList">
                        <el-checkbox
                            v-for="item in COMPANY_ROLE_LIST"
                            :key="item.value"
                            :label="item.value"
                        >
                            {{ item.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="车辆要求">
                    <el-form-item label="品牌要求" prop="brandList">
                        <c-select
                            :selectValue.sync="form.brandList"
                            :options="brandList"
                            multiple
                            filterable
                            :showAllValue="false"
                            labelKey="brandName"
                            valueKey="brandName"
                            :selectStyle="{width: '300px'}"
                        />
                    </el-form-item>

                    <el-form-item label="价格区间" prop="priceSection">
                        <c-select
                            :selectValue.sync="form.priceSection"
                            :options="PRICE_SECTION_LIST"
                            multiple
                            :showAllValue="false"
                            :selectStyle="{width: '300px'}"
                        />
                    </el-form-item>

                    <el-form-item label="动力类型" prop="powerTypeList">
                        <el-checkbox-group v-model="form.powerTypeList">
                            <el-checkbox
                                v-for="item in POWER_TYPE_LIST"
                                :key="item.value"
                                :label="item.value"
                            >
                                {{ item.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form-item>

                <el-form-item label="支持订阅周期">
                    <div>36期</div>
                </el-form-item>

                <el-form-item label="保证金比例" prop="depositRate">
                    <c-input-number 
                        :inputValue.sync="form.depositRate"
                        placeholder="请输入保证金比例"
                        :precision="2"
                    >
                    </c-input-number>%
                </el-form-item>

                <!-- <el-form-item label="期末余值比例" prop="residualValueRate">
                    <c-input-number 
                        :inputValue.sync="form.residualValueRate"
                        placeholder="请输入期末余值比例"
                        :precision="2"
                    >
                    </c-input-number>%
                </el-form-item> -->

                <el-form-item label="方案名称" prop="schemeName">
                    <c-input 
                        :inputValue.sync="form.schemeName"
                        placeholder="请输入方案名称"
                        :inputStyle="{
                            width: '300px'
                        }"
                    />
                </el-form-item>

                <el-form-item label="方案描述">
                    <c-text-area 
                        :inputValue.sync="form.schemeDesc"
                        placeholder="请输入对此方案的描述~最多可输入100个字"
                    />
                </el-form-item>

            </el-form>

            <div class="buttom-btn-group">
                <back-button />
                <div class="btn save-btn" @click="save">保存方案</div>
            </div>
        </div>
    </div>
</template>

<script>
import { createSubscribeFinancialScheme, updateSubscribeFinancialScheme, detailSubscribeFinancialScheme, getCarBrand, getCity } from '@/api/financial/financial'
import { selectList } from '@/api/merchant/merchant'
import { COMPANY_ROLE_LIST, PRICE_SECTION_LIST, POWER_TYPE_LIST } from '@/utils/constant'

export default {
    name: 'setFinancial',

    data() {
        return {
            operator: null,
            syncLoading: false,
            COMPANY_ROLE_LIST,
            PRICE_SECTION_LIST,
            POWER_TYPE_LIST,
            merchantList: [],
            cityList: [],
            brandList: [],
            form: {
                supportPeriodList: [36],
                applyService: 3,
                id: null,
                companyId: null,
                companyName: '',
                cityIdList: [],
                cityReqVoList: [],
                merchantTypeList: [],
                brandList: [],
                priceSection: [],
                powerTypeList: [],
                depositRate: undefined,
                residualValueRate: undefined,
                schemeName: '',
                schemeDesc: '',
            },
            rules: {
                companyId: [
                    { required: true, message: '请选择金融方', trigger: 'change' }
                ],
                cityIdList: [
                    { required: true, message: '请选择适配地区', trigger: 'change' }
                ],
                merchantTypeList: [
                    { required: true, message: '请选择商户类型', trigger: 'change' }
                ],
                brandList: [
                    { required: true, message: '请选择品牌', trigger: 'change' }
                ],
                priceSection: [
                    { required: true, message: '请选择价格区间', trigger: 'change' }
                ],
                powerTypeList: [
                    { required: true, message: '请选择动力类型', trigger: 'change' }
                ],
                depositRate: [
                    { required: true, message: '请输入保证金比例', trigger: 'blur' }
                ],
                schemeName: [
                    { required: true, message: '请输入方案名称', trigger: 'blur' }
                ],
            },
        }
    },

    mounted() {
        this.operator = this.$route.query.operator
        this.form.id = this.$route.query.id

        this.selectList()
        this.getCarBrand()
        this.getCity()

        if (this.operator == 2) {
            this.detailSubscribeFinancialScheme()
        }
    },

    methods: {
        selectList() {
            const params = {
                companyType: 2,
                page: 1,
                size: 1000,
            }

            selectList(params).then(res => {
                if(res.code === 0) {
                    this.merchantList = res.data.records
                }
            })
        },

        getCarBrand() {
            getCarBrand().then(res => {
                if(res.code === 0) {
                    this.brandList = res.data
                }
            })
        },

        getCity() {
            getCity().then(res => {
                if(res.code === 0) {
                    this.cityList = res.data.map(city => {
                        city.cityId = city.id

                        return city
                    })
                }
            })
        },

        detailSubscribeFinancialScheme() {
            const data = {
                id: this.form.id,
            }

            detailSubscribeFinancialScheme(data).then(res => {
                if(res.code === 0) {
                    this.form = {
                        ...res.data,
                        cityIdList: res.data.cityReqVoList.map(city => city.cityId)
                    }
                }
            })
        },

        changeCity(data) {
            this.form.cityReqVoList = this.cityList.filter(city => data.includes(city.id))
        },

        back() {
            this.$router.back()
        },

        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const company = this.merchantList.find(item => item.id === this.form.companyId)

                    if (company) {
                        this.form.companyName = company.companyName
                    }

                    if (this.operator == 1) {
                        this.createSubscribeFinancialScheme()
                    } else {
                        this.updateSubscribeFinancialScheme()
                    }
                }
            })
        },

        createSubscribeFinancialScheme() {
            createSubscribeFinancialScheme(this.form).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        updateSubscribeFinancialScheme() {
            updateSubscribeFinancialScheme(this.form).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error('保存失败')
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
    align-items: center;
}
</style>