<template>
    <div>
        <el-form ref="step2form" :model="detail" :rules="rules" label-width="150px">
            <el-form-item label="超级管理员名称" prop="managerName">
                <c-input 
                    :inputValue.sync="detail.managerName"
                    placeholder="请输入超级管理员名称"
                    :inputStyle="{
                        width: '300px'
                    }"
                />
            </el-form-item>

            <el-form-item label="超级管理员联系方式" prop="managerMobile">
                <c-input 
                    :inputValue.sync="detail.managerMobile"
                    placeholder="请输入超级管理员联系方式"
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
                managerName: [
                    { required: true, message: '请输入超级管理员名称', trigger: 'blur' }
                ],
                managerMobile: [
                    { required: true, message: '请输入超级管理员联系方式', trigger: 'blur' },
                    { pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
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