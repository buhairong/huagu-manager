<template>
    <el-dialog
          title="分配订单"
          :visible.sync="showDistributionDialog"
          width="480px"
          :before-close="handleCloseDistributionDialog"
      >
          <div class="car-info">
              <el-image
                  style="width:108px;height:80px"
                  :src="imageUrl"
                  fit="cover"
              ></el-image>
              {{ carBrand }}·{{ carType }} {{ carTypeYear }} {{ carTypeYearProduct }}
          </div>

          <div class="item">
              <div class="item-title">订单编号: </div>
              <div class="item-content">
                  {{ orderNum }}
              </div>
          </div>

          <div class="item">
              <div class="item-title">用户信息: </div>
              <div class="item-content">
                  {{ name }}
              </div>
          </div>

          <div class="item">
              <div class="item-title">分 配 至: </div>
              <div class="item-content">
                  <c-select
                      :selectValue.sync="carDeliveryId"
                      :options="carDeliveryList"
                      placeholder="请选择交车点"
                      :selectStyle="{
                          width: '200px'
                      }"
                      :showAllValue="false"
                      labelKey="shopName"
                      valueKey="id"
                  />
              </div>
          </div>

          <span slot="footer" class="dialog-footer">
              <div class="dialog-btn-wrap">
                  <div class="btn" @click="handleCloseDistributionDialog">取消</div>
                  <div class="btn save-btn" @click="saveDistribution">确认分配</div>
              </div>
          </span>
      </el-dialog>
</template>

<script>
import { selectCarDeliveryListOfOrder, bindCarDeliveryToOrder } from '@/api/order/orderManagement'
export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },

      orderId: {
        type: Number,
        required: true,
      },

      imageUrl: {
        type: String,
        default: '',
      },

      carBrand: {
        type: String,
        default: '',
      },

      carType: {
        type: String,
        default: '',
      },

      carTypeYear: {
        type: String,
        default: '',
      },

      carTypeYearProduct: {
        type: String,
        default: '',
      },

      orderNum: {
        type: String,
        default: '',
      },

      name: {
        type: String,
        default: '',
      },

      shopId: {
        type: [Number, null],
        default: null,
      },
    },

    data() {
        return {
          showDistributionDialog: false,
          carDeliveryId: null,
          carDeliveryList: [],
        }
    },

    mounted() {
      this.showDistributionDialog = this.show
      this.carDeliveryId = this.shopId
      this.selectCarDeliveryListOfOrder()
    },

  methods: {
    selectCarDeliveryListOfOrder() {
      const data = {
        orderId: this.orderId
      }

      selectCarDeliveryListOfOrder(data).then(res => {
          if(res.code === 0) {
              this.carDeliveryList = res.data
          }
      })
    },

    handleCloseDistributionDialog() {
      this.$emit('close')    
    },

    saveDistribution() {
      if (!this.carDeliveryId) {
        this.$message.error('请选择交车点')
        return
      }

      const data = {
        carDeliveryId: this.carDeliveryId,
        orderId: this.orderId,
      }

      bindCarDeliveryToOrder(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.$emit('save')  
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.car-info {
    display: flex;
    align-items: center;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    .car-brand {
      height: 22px;
      line-height: 22px;
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.9);
    }
    .car-plate {
      margin-top: 8px;
      width: 80px;
      height: 24px;
      border-radius: 2px;
      background: #3446AA;
      font-size: 14px;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
    }
}
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