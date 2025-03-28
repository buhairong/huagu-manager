<template>
    <el-dialog
        :title="detail.title"
        :visible.sync="show"
        width="480px"
        :before-close="handleCloseDialog"
    >
        
        <div class="dialog-wrap">
            <div>
                <div class="dialog-title">
                    {{ detail.content }}
                    <c-input-number 
                        :inputValue.sync="money"
                        placeholder="请输入金额"
                    >
                    </c-input-number> 元
                </div>
                <div class="dialog-tip">备注<span style="color:#86909C">（非必填项）</span></div>
                <c-text-area 
                    :inputValue.sync="reason"
                    placeholder="请输入备注~最多可输入100个字"
                />
            </div>

            <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap" style="margin-top:40px">
                <div class="btn" @click="handleCloseDialog">取消</div>
                <div class="btn save-btn" @click="handleSubmit">确认</div>
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
            money: undefined,
            reason: '',
        }
    },

    mounted() {
        
    },

    methods: {
        handleCloseDialog() {
            this.$emit('update:show', false)
            this.money = undefined
        },

        handleSubmit() {
            if(!this.money) {
                this.$message.error('请输入金额')
                return
            }
            this.$emit('save', {
                money: this.money,
                reason: this.reason,
            })
            this.handleCloseDialog()
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
    line-height: 24px;
    color: #3D3D3D;
    display: flex;
    align-items: center;
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

.el-input-number {
    margin: 0 12px;
}
</style>