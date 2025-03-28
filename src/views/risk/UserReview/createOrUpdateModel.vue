<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>风控管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信审</el-breadcrumb-item>
        <el-breadcrumb-item>风控模型</el-breadcrumb-item>
        <el-breadcrumb-item class="subscription-plan">{{breadcrumbText}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <CreateOrUpdateModelStep1 
            v-if="step === 1 && createData.rules"
            :createData="createData"
            @next="next"
        />

        <CreateOrUpdateModelStep2
            v-if="step === 2"
            :createData="createData"
            :managementArray="managementArray"
            @prev="prev"
            @save="save"
        />
    </div>
  </div>
</template>

<script>
import { selectAllServiceApi, selectCompanyList, createAndUpdateModel, getModelDetail } from '@/api/risk/userReview'
import CreateOrUpdateModelStep1 from '../components/CreateOrUpdateModelStep1.vue'
import CreateOrUpdateModelStep2 from '../components/CreateOrUpdateModelStep2.vue'

export default {
    name: 'CreateOrUpdateModel',
    components: {
        CreateOrUpdateModelStep1,
        CreateOrUpdateModelStep2,
    },
    data() {
        return {
            breadcrumbText: '',
            step: 1,
            createData: {
                id: null,
                type: null, // 适用客户 1个人 2企业
                applyCapital: [], // 适用资方，传入资金方公司id，全部只传-1
                applyCareer: [],
                description: '', // 描述
                name: '', // 模型名称
                rules: null, // 匹配规则
            },
            managementArray: [], // 资方
        }
    },

    mounted() {
        this.createData.type = this.$route.query.customType

        if (this.$route.query.modelId) {
            this.createData.id = this.$route.query.modelId
        }

        this.breadcrumbText = this.createData.id ? '修改模型' : '创建模型'

        this.selectAllServiceApi()
        this.selectCompanyList()
    },

    methods: {
        // 查询匹配规则
        selectAllServiceApi() {
            const data = {
                applyClient: this.createData.type,
                modelId:  this.createData.id,
            }

            selectAllServiceApi(data).then(res => {
                if (res.code == 0) {
                    if (this.createData.id) {
                        getModelDetail({
                            id: this.createData.id
                        }).then((detail) => {
                            if (res.code == 0) {
                                this.createData = {
                                    ...this.createData,
                                    ...detail.data,
                                    rules: res.data,
                                }
                            }
                        })
                    } else {
                        this.createData.rules = res.data
                    }
                }
            })
        },

        // 查询金融公司
        selectCompanyList() {
            selectCompanyList().then((res) => {
                if (res.code == 0) {
                    this.managementArray = res.data
                }
            })
        },

        prev(data) {
            this.step = 1
            this.createData.applyCareer = data.applyCareer
            this.createData.applyCapital = data.applyCapital
            this.createData.applyService = data.applyService
            this.createData.description = data.description
            this.createData.name = data.name
        },

        next(data) {
            this.step = 2
            this.createData.rules = data.rules
        },

        save(data) {
            this.createData.applyCareer = data.applyCareer
            this.createData.applyCapital = data.applyCapital
            this.createData.applyService = data.applyService
            this.createData.description = data.description
            this.createData.name = data.name
            this.createAndUpdateModel()
        },

        createAndUpdateModel() {
            createAndUpdateModel(this.createData).then((res) => {
                if (res.code == 0) {
                    this.$message.success('保存成功')
                    this.$router.back()
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

</style>