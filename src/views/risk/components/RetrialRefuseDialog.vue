<template>
    <el-dialog
        title="复审"
        :visible.sync="show"
        width="450px"
        :before-close="handleClose"
    >
        <div class="wrap">
            <div class="title">确认拒绝{{customTypeText}}的订单申请？</div>
            <div class="reason-item">
                <div class="item-title">拒绝原因<span style="color:#86909C">（必填项）</span></div>
                <c-text-area 
                    :inputValue.sync="reason"
                    placeholder="请输入拒绝原因~最多可输入100个字"
                />
            </div>
            <div class="btn-group">
                <el-button class="btn" @click="handleClose">取消</el-button>
                <el-button 
                    type="primary" 
                    class="btn save-btn"
                    :disabled="!reason"
                    @click="save"
                >确认</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { CUSTOM_TYPE } from '@/utils/constant'

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },

        customType: {
            type: [String, Number],
            required: true,
        },
    },

    data() {
        return {
            customTypeText: '',
            reason: '',
        }
    },

    mounted() {
        this.customTypeText = CUSTOM_TYPE.find(item => item.value == this.customType).label
    },

    methods: {
        handleClose() {
            this.$emit('update:show', false)
        },

        save() {
            this.$confirm('确定要拒绝这笔订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$emit('comfirm', this.reason)
                this.handleClose()
            })
        },
    }
}
</script>

<style lang="less" scoped>
.title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #3D3D3D;
}

.btn-group {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    .btn {
        width: 91px;
        height: 32px;
        border-radius: 2px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        color: #1D2129;
        cursor: default;
    }
    .save-btn {
        margin-left: 38px;
        background: #3446AA;
        color: #FFFFFF;
    }
    .is-disabled {
        background: rgba(52, 70, 170, .6);
    }
}

.reason-item {
    .item-title {
        margin-top: 25px;
        margin-bottom: 10px;
        height: 22px;
        line-height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4E5969;
    }
}
</style>