<template>
    <el-dialog
        title="复审"
        :visible.sync="show"
        width="320px"
        :before-close="handleClose"
    >
        <div class="wrap">
            <div class="title">确认通过{{customTypeText}}的订单申请？</div>
            <div class="btn-group">
                <div class="btn" @click="handleClose">取消</div>
                <div class="btn save-btn" @click="save">确认</div>
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
            type: String | Number,
            required: true,
        },

        certificationList: {
            type: Array,
            default: () => []
        },
    },

    data() {
        return {
            customTypeText: '',
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
            if (this.certificationList.length === 0 || this.certificationList.every(item => item.confirmed === 1)) {
                this.$emit('comfirm')
                this.handleClose()
            } else {
                this.$message.error('补充材料未全部通过')
                this.handleClose()
            }
        },
    }
}
</script>

<style lang="less" scoped>
.title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #3D3D3D;
    text-align: center;
}

.btn-group {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    .btn {
        width: 91px;
        height: 32px;
        border-radius: 2px;
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
}
</style>