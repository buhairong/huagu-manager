<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>会员租车订单</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">车损处理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content" v-if="detail">
          <div class="top">
            <div class="block">
              <div class="title">取车信息</div>

              <div class="item-wrap">
                <CarInfoHeader :carInfo="detail.carTypeYearProduct" />
              </div>

              <div class="item-wrap">
                 <div class="item">
                    <div class="label">订单编号: </div>
                    <div class="item-content">{{ detail.orderNum }}</div>
                 </div>

                 <div class="item">
                    <div class="label">用户信息: </div>
                    <div class="item-content">{{ detail.userName }}</div>
                 </div>

                 <div class="item">
                    <div class="label">取车时间: </div>
                    <div class="item-content">{{ detail.endDate }}</div>
                 </div>

                 <div class="item">
                    <div class="label">取车地址: </div>
                    <div class="item-content">{{ detail.returnedAddress }}</div>
                 </div>

                 <div class="item">
                    <div class="label">取车人员: </div>
                    <div class="item-content">{{ detail.returnedCheckUserName }}</div>
                 </div>
              </div>
            </div>
            
            <div class="block">
              <div class="title">车损报告</div>
              <div class="item-wrap">
                <el-table 
                  :data="list"
                  style="width: 100%"
                  :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
                >
                  <el-table-column
                    prop="position"
                    label="受损位置"
                  >
                  </el-table-column>

                  <el-table-column
                    prop="location"
                    label="涉及部位"
                  >
                  </el-table-column>

                  <el-table-column
                    label="异常处照片"
                  >
                    <template slot-scope="scope">
                        <div>
                          <el-image
                            style="width:30px"
                            :src="scope.row.imageList[0]"
                            :preview-src-list="scope.row.imageList"
                          >
                          </el-image>
                        </div>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="remark"
                    label="备注"
                  >
                  </el-table-column>

                  <el-table-column
                    prop="checkUserName"
                    label="验车人员"
                  >
                  </el-table-column>

                  <el-table-column
                    label="扣除押金"
                  >
                    <template slot-scope="scope">
                        <div style="display:flex;align-items: center;">
                          <c-input-number 
                            :inputValue.sync="scope.row.deposit"
                            placeholder="请输入金额"
                            :disabled="orderStatus == 150"
                            @blur="handleTotal"
                          >
                          </c-input-number> 元
                        </div>
                    </template>
                  </el-table-column>
                
                </el-table>

                <div class="total">
                  共计扣除：{{formatThousandNumber(total)}}元 剩余返还押金：{{remind}}元
                </div>
              </div>
            </div>
          </div>

          <div class="buttom-btn-group">
            <back-button />
            <div class="btn save-btn" @click="save" v-if="orderStatus != 150">发送账单</div>
          </div>
      </div>
  </div>
</template>

<script>
import { getVehicleDamageReport, insertVehicleDamage } from '@/api/order/orderManagement'
import { formatThousandNumber } from '@/utils/util'
import CarInfoHeader from './components/CarInfoHeader'

export default {
  name: 'vehicleDamageReport',

  components: {
    CarInfoHeader,
  },

  data() {
    return {
      orderId: null,
      detail: null,
      orderStatus: null,
      list: [],
      totalDeposit: 0,
      //total: 0,
    }
  },

  computed: {
    total() {
      let res = 0

      res = this.list.reduce((prev, cur) => {
        return prev + (cur.deposit || 0)
      }, 0)

      return res
    },

    remind() {
      let res = 0

      res = this.totalDeposit - this.total

      return this.formatThousandNumber(res)
    },
  },

  mounted() {
    this.orderId = this.$route.query.orderId
    this.orderStatus = this.$route.query.orderStatus
    this.getDetail()
  },

  methods: {
    getDetail() {
      const data = {
        id: this.orderId,
      }

      getVehicleDamageReport(data).then(res => {
        if (res.code === 0) {
          this.detail = res.data
          this.detail.carTypeYearProduct.carPlateNum = res.data.plateNum
          this.totalDeposit = res.data.deposit + (res.data.addDeposit || 0)

          if (res.data.carRentalVehicleDamageEntityList && res.data.carRentalVehicleDamageEntityList.length) {
            this.list = res.data.carRentalVehicleDamageEntityList
          } else {
            const json = JSON.parse(res.data.returnedCheckInfo)
            for(const item of json) {
              if (item.type === 'tyre' || item.type === 'appearance' || item.type === 'interior') {
                if (item.children) {
                  const pos = item.children
                  for(const item1 of pos) {
                    if (item1.children) {
                      const part = item1.children
                      for(const item2 of part) {
                        if (item2.exceptionDesc) {
                          this.list.push({
                            position: item1.name,
                            location: item2.name,
                            imageList: item2.imgList,
                            remark: item2.exceptionDesc,
                            checkUserName: res.data.returnedCheckUserName,
                            deposit: undefined,
                          })
                        }
                      }
                    } else if (item1.exceptionDesc) {
                      this.list.push({
                        position: item1.name,
                        location: item1.name,
                        imageList: item1.imgList,
                        remark: item1.exceptionDesc,
                        checkUserName: res.data.returnedCheckUserName,
                        deposit: undefined,
                      })
                    }
                  }
                }
              }
            }
          }
        }
      })
    },

    back() {
      this.$router.back()
    },
        
    save() {
      for (const item of this.list) {
        if (!item.deposit && item.deposit != 0) {
          this.$message.error('请输入金额')
          return
        }
      }

      const params = {
        id: this.orderId,
        carRentalVehicleDamageEntityList: this.list,
      }

      insertVehicleDamage(params).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.back()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    formatThousandNumber(num) {
        if (num || num == 0) {
            return formatThousandNumber(num)
        }
        return 0
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  padding-left: 100px;
  height: unset;
  min-height: calc(100vh - 142px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    margin: 30px 0 20px 0;
    height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
  }
  .item-wrap {
    padding-left: 100px;
    .item {
      margin-top: 16px;
      padding-right: 8px;
      display: flex;
      height: 21px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 21px;
      color: #4E5969;
      .label {
        padding-right: 12px;
      }
    }
  }
  .total {
    margin-top: 16px;
    height: 24px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 24px;
    color: #3D3D3D;
  }
}
</style>