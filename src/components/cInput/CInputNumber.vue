<template>
    <el-input-number 
        :value="inputValue" 
        :placeholder="placeholder"
        :min="min"
        :disabled="disabled"
        :style="inputStyle"
        :precision="precision"
        :controls="false"
        @change="handlerChange"
        v-bind="$attrs"
        v-on="$listeners"
    >
    </el-input-number>
</template>

<script>
export default {
    props: {
        inputValue: {
            type: [String, Number],
            required: true,
            default: undefined,
        },
        inputStyle: {
            type: Object,
            default: () => ({}),
        },
        placeholder: {
            type: String,
            default: '请输入',
        },
        min: {
            type: Number,
            default: 0,
        },
        precision: {
            type: Number,
            default: 0,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        handlerChange(e) {
            this.$emit('update:inputValue', e)
        },
    },
}
</script>

<style lang="less" scoped>
.el-input-number {
    width: 190px;
    height: 32px;
}
/deep/ .el-input {
    width: 100%;
    height: 100%;
    .el-input__inner {
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