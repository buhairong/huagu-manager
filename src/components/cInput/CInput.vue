<template>
    <el-input 
        :value="inputValue" 
        :placeholder="placeholder"
        :maxlength="maxLength"
        :disabled="disabled"
        :style="inputStyle"
        @input="handlerInput"
        v-bind="$attrs"
        v-on="$listeners"
    ></el-input>
</template>

<script>
export default {
    props: {
        inputValue: {
            type: String,
            required: true,
            default: '',
        },
        inputStyle: {
            type: Object,
            default: () => ({}),
        },
        placeholder: {
            type: String,
            default: '请输入',
        },
        maxLength: {
            type: Number,
            default: 100,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        handlerInput(e) {
            this.$emit('update:inputValue', e)
        },
    },
}
</script>

<style lang="less" scoped>
.el-input {
    width: 134px;
    height: 32px;
    /deep/ .el-input__inner {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        background: #F2F3F5;
        padding: 0 8px;
        font-family: PingFangSC-Regular;
        box-sizing: border-box;
        border: none;
        font-size: 14px;
        color: #4E5969;
        display: flex;
        align-items: center;
        &::placeholder{
            color: #A4AEBB;
        }
    }
}
</style>