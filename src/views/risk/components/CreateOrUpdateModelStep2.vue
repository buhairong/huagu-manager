<template>
    <div class="wrap">
        <el-form ref="form" :model="createData" :rules="rules" label-width="80px">
            <el-form-item label="模型名称" prop="name">
                <c-input 
                    :inputValue.sync="createData.name"
                    :inputStyle="{width:'364px'}"
                    placeholder="请设置模型名称"
                />
            </el-form-item>

            <el-form-item label="适用职业" prop="applyCareer">
                <c-select
                    :selectValue.sync="createData.applyCareer"
                    :options="OCCUPATION"
                    :multiple="true"
                    placeholder="请选择适用职业"
                    :allValue="-1"
                    :selectStyle="{width:'364px'}"
                />
            </el-form-item>

            <el-form-item label="复审资方" prop="applyCapital">
                <c-select
                    :selectValue.sync="createData.applyCapital"
                    :options="managementArray"
                    labelKey="companyName"
                    valueKey="id"
                    :multiple="true"
                    placeholder="请选择模型匹配复审资方"
                    :allValue="-1"
                    :selectStyle="{width:'364px'}"
                />
            </el-form-item>

            <el-form-item label="模型描述">
                <c-text-area 
                    :inputValue.sync="createData.description"
                    placeholder="请输入对风控模型的描述～"
                />
            </el-form-item>
            
        </el-form>

        <div class="btn-group">
            <div class="btn" @click="prev">上一步</div>
            <div class="btn save-btn" @click="save">保存</div>
        </div>
    </div>
</template>

<script>
import { OCCUPATION } from '@/utils/constant'

export default {
    props: {
        createData: {
            type: Object,
            default: () => ({})
        },

        managementArray: { // 资方
            type: Array,
            default: () => []
        },
    },

    data() {
        return {
            OCCUPATION,
            rules: {
                name: [
                    { required: true, message: '请输入模型名称', trigger: 'blur' },
                ],
                applyCareer: [
                    { required: true, message: '请选择适用职业', trigger: 'change' },
                ],
                applyCapital: [
                    { required: true, message: '请选择模型匹配复审资方', trigger: 'change' },
                ],
            },
        }
    },

    mounted() {
        
    },

    methods: {
        prev() {
            const data = {
                applyCareer: this.createData.applyCareer,
                applyCapital: this.createData.applyCapital,
                applyService: this.createData.applyService,
                description: this.createData.description,
                name: this.createData.name,
            }

            this.$emit('prev', data)
        },

        save() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const data = {
                        applyCareer: this.createData.applyCareer,
                        applyCapital: this.createData.applyCapital,
                        applyService: this.createData.applyService,
                        description: this.createData.description,
                        name: this.createData.name,
                    }

                    this.$emit('save', data)
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
    .amount-form-item {
        /deep/ .el-form-item__label:before {
            content: '*';
            color: #F56C6C;
            margin-right: 4px;
        }
    }
}
.btn-group {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    .btn {
        width: 104px;
        height: 40px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #1D2129;
        cursor: default;
    }
    .save-btn {
        margin-left: 24px;
        background: #3446AA;
        color: #FFFFFF;
    }
}
</style>