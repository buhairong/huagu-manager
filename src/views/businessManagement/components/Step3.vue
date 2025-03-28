<template>
    <div>
        <el-form ref="step3form" :model="detail" :rules="rules" label-width="140px">
            <el-form-item label="开户名称">
                <div>{{ detail.companyName }}</div>
            </el-form-item>

            <el-form-item label="银行账号" prop="bankAccount">
                <c-input 
                    :inputValue.sync="detail.bankAccount"
                    placeholder="请输入开户行帐号"
                    :inputStyle="{
                        width: '300px'
                    }"
                />
            </el-form-item>

            <el-form-item label="开户银行" prop="bankName">
                <c-input 
                    :inputValue.sync="detail.bankName"
                    placeholder="请输入开户银行"
                    :inputStyle="{
                        width: '300px'
                    }"
                />
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            rules: {
                bankAccount: [
                    { required: true, message: '请输入开户行帐号', trigger: 'blur' }
                ],
                bankName: [
                    { required: true, message: '请输入开户银行', trigger: 'blur' }
                ],
            },
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

    },
}
</script>

<style lang="less" scoped>

</style>