<template>
    <el-input 
        id="wecars-textarea"
        type="textarea"
        :value="inputValue" 
        :placeholder="placeholder"
        :maxlength="maxLength"
        :disabled="disabled"
        :style="inputStyle"
        :show-word-limit="showWordLimit"
        :rows="rows"
        @input="handlerInput"
        @blur="handlerBlur"
    ></el-input>
</template>

<script>
export default {
    props: {
        inputValue: {
            type: String,
            required: true,
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
        rows: {
            type: Number,
            default: 5,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        showWordLimit: {
            type: Boolean,
            default: true,
        },
    },

    methods: {
        handlerInput(e) {
            this.$emit('update:inputValue', e)
        },

        handlerBlur(e) {
            this.$emit('update:inputValue', e.target.value.trim())
        },
    },
}
</script>

<style lang="less" scoped>
.el-textarea {
    width: 364px;
    /deep/ .el-textarea__inner {
        width: 100%;
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
        resize: none;
        &::placeholder{
            color: #A4AEBB;
        }
    }
    /deep/ .el-input__count {
        background: #F2F3F5;
    }
}
</style>