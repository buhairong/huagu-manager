<template>
    <el-dialog
        :title="detail.title"
        :visible.sync="show"
        width="300px"
        :before-close="handleClosePassDialog"
    >
        
        <div class="dialog-wrap">
            <div class="dialog-title">{{ detail.content }}</div>

            <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap" style="margin-top:40px">
                <div class="btn" @click="handleClosePassDialog">取消</div>
                <div class="btn save-btn" @click="handlePass">确认</div>
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
            
        }
    },

    mounted() {
        
    },

    methods: {
        handleClosePassDialog() {
            this.$emit('update:show', false)
        },

        handlePass() {
            this.$emit('save', {
                status: 1,
            })
            this.handleClosePassDialog()
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