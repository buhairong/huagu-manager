<template>
    <el-dialog
        :title="detail.title"
        :visible.sync="show"
        width="480px"
        :before-close="handleCloseRefuseDialog"
    >
        
        <div class="dialog-wrap">
            <div>
                <div class="dialog-title">{{ detail.content }}</div>
                <div class="dialog-tip">拒绝原因<span style="color:#86909C">（必填项）</span></div>
                <c-text-area 
                    :inputValue.sync="reason"
                    placeholder="请输入拒绝原因~最多可输入100个字"
                />
            </div>

            <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap" style="margin-top:40px">
                <div class="btn" @click="handleCloseRefuseDialog">取消</div>
                <div class="btn save-btn" @click="handleReject">确认</div>
            </div>
            </span>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },

        show: {
            type: Boolean,
            required: false,
        },
    },

    data() {
        return {
            reason: '',
        }
    },

    mounted() {
        
    },

    methods: {
        handleCloseRefuseDialog() {
            this.$emit('update:show', false)
            this.reason = ''
        },

        handleReject() {
            const reason = this.reason.trim()
            if(!reason) {
                this.$message.error('请输入拒绝原因')
                return
            }
            this.$emit('save', {
                status: 2,
                reason,
            })
            this.handleCloseRefuseDialog()
        },
    },
}
</script>

<style lang="less" scoped>
.dialog-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog-title {
    height: 24px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #3D3D3D;
  }
  .dialog-tip {
    margin-top: 20px;
    margin-bottom: 5px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4E5969;
  }
}
</style>