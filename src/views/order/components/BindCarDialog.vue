<template>
  <el-dialog
    title="绑定车辆"
    :visible.sync="show"
    width="480px"
    :before-close="handleCloseDialog"
  >
    <CarInfoHeader :carInfo="currentOrder" />

    <div class="item">
      <div class="item-title">订单编号: </div>
      <div class="item-content">
        {{ currentOrder.orderNum }}
      </div>
    </div>

    <div class="item">
      <div class="item-title">用户信息: </div>
      <div class="item-content">
        {{ currentOrder.name }}
      </div>
    </div>
      
    <div class="item">
      <div class="item-title">车 牌 号 : </div>
      <div class="item-content">
          <c-input 
            :inputValue.sync="formData.carPlateNum"
            placeholder="请输入车牌号"
            :inputStyle="{
              width: '200px'
            }"
          />
      </div>
    </div>

    <div class="item">
      <div class="item-title">外观颜色: </div>
      <div class="item-content">
        <c-input 
          :inputValue.sync="formData.carColor"
          placeholder="请输入外观颜色"
          :inputStyle="{
            width: '200px'
          }"
        />
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <div class="dialog-btn-wrap">
        <div class="btn" @click="handleCloseDialog">取消</div>
        <div class="btn save-btn" @click="save">绑定车辆</div>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import CarInfoHeader from './CarInfoHeader'

export default {
  components: {
    CarInfoHeader,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    currentOrder: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      formData: {},
    }
  },

    mounted() {
      this.formData = this.currentOrder
    },

  methods: {
    handleCloseDialog() {
      this.$emit('update:show', false)    
    },

    save() {
      if (!this.formData.carPlateNum) {
        this.$message.error('请输入车牌号')
        return
      }

      if (!this.formData.carColor) {
        this.$message.error('请输入外观颜色')
        return
      }

      this.$emit('save', this.formData)
      this.handleCloseDialog()
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  margin-top: 16px;
  display: flex;
  .item-title {
    margin-right: 8px;
    width: 84px;
    height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 32px;
    color: #4E5969;
    text-align: right;
  }
  .item-content {
    height: 32px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 32px;
    color: #1D2129;
  }
}
</style>