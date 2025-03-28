<template>
    <el-select 
        :value="selectValue" 
        :placeholder="placeholder"
        :disabled="disabled"
        :multiple="multiple"
        :filterable="filterable"
        :style="selectStyle"
        :clearable="clearable"
        @change="handlerChange"
    >
        <el-option
            v-if="showAllValue"
            label="全部"
            :value="allValue"
        >
        </el-option>
        <el-option
            v-for="item in options"
            :key="item[valueKey]"
            :label="item[labelKey]"
            :value="item[valueKey]"
        >
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        selectValue: {
            type: [String, Number, Array],
            required: true,
            default: '',
        },
        options: {
            type: Array,
            default: () => []
        },
        labelKey: {
            type: String,
            default: 'label',
        },
        valueKey: {
            type: String,
            default: 'value',
        },
        placeholder: {
            type: String,
            default: '请选择',
        },
        selectStyle: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        filterable: {
            type: Boolean,
            default: false,
        },
        allValue: {
            type: [String, Number],
            default: ''
        },
        showAllValue: {
            type: Boolean,
            default: true,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        handlerChange(e) {
            let res = e

            if (this.multiple) {
                if(e[e.length-1] == -1) {
                    res = [-1]
                } else {
                    const index = e.indexOf(-1)
                    if (index !== -1) {
                        res.splice(index, 1)
                    }
                }
            }
            this.$emit('update:selectValue', res)

            this.$emit('change', res)
        },
    },
}
</script>

<style lang="less" scoped>
.el-select {
    width: 134px;
    background: #F2F3F5;
    /deep/ .el-input {
        width: 100%;
    }
    /deep/ .el-input__inner {
        width: 100%;
        height: 32px;
        border-radius: 2px;
        background: #F2F3F5;
        padding: 10px 8px;
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
    /deep/ .el-input__suffix {
        display: flex;
        align-items: center;
    }
}
</style>