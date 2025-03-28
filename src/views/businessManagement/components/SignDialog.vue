<template>
  <el-dialog
      title="选择签约方式"
      :visible.sync="show"
      width="480px"
    >
      <div class="info">
        <img :src="detail.shopHeadPic" class="img">
        <div class="title">{{ detail.shopName }}</div>
      </div>
      <div class="item">
          <div class="item-label">签约时间：</div>
          <div class="item-content">
              <el-radio-group v-model="signTime">
                  <el-radio 
                      v-for="item in SIGNTIME"
                      :key="item.value"
                      :label="item.value"
                  >
                      {{ item.label }}
                  </el-radio>
              </el-radio-group>
          </div>
      </div>

      <div class="item">
          <div class="item-label">签约方式：</div>
          <div class="item-content">
              <el-radio-group v-model="signType">
                  <el-radio 
                      v-for="item in SIGNTYPE"
                      :key="item.value"
                      :label="item.value"
                  >
                      {{ item.label }}
                  </el-radio>
              </el-radio-group>
          </div>
      </div>

      <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
              <div class="btn" @click="handleCloseDialog">取消</div>
              <div class="btn save-btn" @click="save">确认</div>
          </div>
      </span>
  </el-dialog>
</template>

<script>
import { SIGNTIME, SIGNTYPE } from '@/utils/constant'

export default {
  name: 'SignDialog',

  props: {
    show: {
      type: Boolean,
      required: true,
    },

    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      SIGNTIME,
      SIGNTYPE,
      signTime: '',  
      signType: '',
    }
  },

  mounted() {
    this.signTime = this.detail.signTime
    this.signType = this.detail.signType
  },

  methods: {
    handleCloseDialog() {
      this.$emit('update:show', false)
    },

    save() {
      this.$emit('save', {
        signTime: this.signTime,  
        signType: this.signType,
      })
      this.handleCloseDialog()
    },
  },
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  align-items: center;
  .img {
    margin-right: 8px;
    width: 120px;
  }
  .title {
    height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
  }
}
.item {
    margin-top: 16px;
    display: flex;
    height: 32px;
    line-height: 32px;
    .item-label {
      width: 120px;
      margin-right: 16px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #1D2129;
      text-align: right;
    }
}

.dialog-btn-wrap {
    display: flex;
    justify-content: flex-end;
    .btn {
        width: 91px;
        height: 32px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #1D2129;
        z-index: 0;
        cursor: default;
    }
    .save-btn {
        margin-left: 8px;
        background: #3446AA;
        color: #FFFFFF;
    }
}
</style>