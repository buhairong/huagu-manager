<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">会员租车</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <Search @search="handlerSearch" />

          <el-table 
              :data="list"
              style="width: 100%"
              :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
          >
            <el-table-column
              prop="orderNum"
              label="订单编号"
              align="center"
            >
            </el-table-column>

            <el-table-column
              label="客户信息"
            >
                <template slot-scope="scope">
                  <div>
                    <div>{{scope.row.name}}</div>
                    <div>{{scope.row.mobile}}</div>
                  </div>
                </template>
            </el-table-column>

            <el-table-column
              label="车辆信息"
            >
              <template slot-scope="scope">
                  <div>
                    <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                    <div>{{scope.row.carTypeYear}}</div>
                    <div>{{scope.row.carTypeYearProduct}}</div>
                  </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="cityName"
              label="用车城市"
            >
            </el-table-column>

            <el-table-column
              label="用车时间"
              align="center"
            >
              <template slot-scope="scope">
                  <div style="display:flex;flex-direction: column;align-items: center;">
                    <div>取：{{scope.row.startDate}}</div>
                    <div>（{{scope.row.monthTotal*30}}天）</div>
                    <div>还：{{scope.row.endDate}}</div>
                  </div>
              </template>
            </el-table-column>

            <el-table-column
              label="取车信息"
            >
              <template slot-scope="scope">
                  <div>
                    <div>交车人：{{scope.row.pickUpUserName || '-'}}</div>
                    <div>地址：{{scope.row.pickUpAddress}}</div>
                  </div>
              </template>
            </el-table-column>

            <el-table-column
              label="取车信息"
            >
              <template slot-scope="scope">
                  <div>
                    <div>取车人：{{scope.row.returnUserName || '-'}}</div>
                    <div>地址：{{scope.row.returnAddress}}</div>
                  </div>
              </template>
            </el-table-column>

            <el-table-column
              label="订单金额"
            >
              <template slot-scope="scope">
                  <div>
                    <div>租车费用：{{formatThousandNumber(scope.row.totalPayment)}}元</div>
                    <div>租车押金：{{formatThousandNumber(scope.row.deposit)}}元</div>
                    <div>取送车服务费：{{formatThousandNumber(0)}}元</div>
                  </div>
              </template>
            </el-table-column>

            <el-table-column
              label="订单状态"
            >
              <template slot-scope="scope">
                  <div :class="{'red': scope.row.status == 120 }">{{CAR_RENTAL_ORDER_STATUS[scope.row.status]}}</div>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="110"
              align="center"
            >
                <template slot-scope="scope">
                  <div class="table-btn" @click="goOrderDetailPage(scope.row)">查看详情</div>
                  <div v-if="scope.row.status == 70 || scope.row.status == 80">
                    <div class="table-btn" @click="bindCar(scope.row)">{{ scope.row.carPlateNum ? '换绑车辆' : '绑定车辆' }}</div>
                    <div class="table-btn" @click="setPickCarPerson(1, scope.row)">交车管理</div>
                  </div>
                  <div v-if="scope.row.status == 100 || scope.row.status == 110" class="table-btn" @click="setPickCarPerson(2, scope.row)">取车管理</div>
                  <div v-if="scope.row.status >= 130 && scope.row.vehicleDamage" class="table-btn" @click="handleVehicleDamage(scope.row)">车损处理</div>
                </template>
            </el-table-column>
          </el-table>

          <pagination 
            :total="total"
            @handleCurrentChange="handleCurrentChange"
          />
      </div>

      <BindCarDialog 
        v-if="showBindCarDialog"
        :show.sync="showBindCarDialog"
        :currentOrder="currentRow"
        @save="saveBindCar"
      />

      <SetPickCarPersonDialog 
        v-if="showSetPickCarPersonDialog"
        :show.sync="showSetPickCarPersonDialog"
        :currentOrder="currentRow"
        @save="savePickCarPerson"
      />
  </div>
</template>

<script>
import { selectRentalOrderList, bindRentalOrderCar, setPickCarPerson } from '@/api/order/orderManagement'
import { formatThousandNumber } from '@/utils/util'
import { CAR_RENTAL_ORDER_STATUS } from '@/utils/constant'
import Search from './components/Search.vue'
import BindCarDialog from './components/BindCarDialog.vue'
import SetPickCarPersonDialog from './components/SetPickCarPersonDialog.vue'

export default {
  name: 'rentalOrderList',

  components: {
    Search,
    BindCarDialog,
    SetPickCarPersonDialog,
  },

  data() {
    return {
      CAR_RENTAL_ORDER_STATUS,
      search: {},
      list: [],
      total: 0,
      currentRow: {},
      showBindCarDialog: false,
      showSetPickCarPersonDialog: false,
    }
  },

  mounted() {
      
  },

  methods: {
    handlerSearch(search) {
      this.search = search
      this.selectList()
    },

    selectList() {
      selectRentalOrderList(this.search).then(res => {
        if (res.code == 0) {
          this.list = res.data.records.map(item => {
            let vehicleDamage = false
            if (item.status >= 130) {
              if (item.returnedCheckInfo) {
                const json = JSON.parse(item.returnedCheckInfo)
                for(const item of json) {
                  if (item.type === 'tyre' || item.type === 'appearance' || item.type === 'interior') {
                    if (item.children) {
                      const pos = item.children
                      for(const item1 of pos) {
                        if (item1.children) {
                          const part = item1.children
                          for(const item2 of part) {
                            if (item2.exceptionDesc) {
                              vehicleDamage = true
                              break
                            }
                          }
                        } else if (item1.exceptionDesc) {
                          vehicleDamage = true
                          break
                        }
                      }
                    }
                  }
                }
              }
            }

            return {
              ...item,
              vehicleDamage,
            }
          })
          this.total = res.data.total
        }
      })
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.selectList()
    },

    formatThousandNumber(num) {
        if (num || num == 0) {
            return formatThousandNumber(num)
        }
        return 0
    },

    goOrderDetailPage(row) {
      this.$router.push({
          path: '/order/rentalDetail',
          query: {
            orderId: row.id,
            orderStatus: row.status,
          },
      })
    },

    bindCar(row) {
      this.currentRow = row
      this.showBindCarDialog = true
    },

    saveBindCar(data) {
      const parmas = {
        id: data.id,
        carPlateNum: data.carPlateNum,
        carColor: data.carColor,
      }

      bindRentalOrderCar(parmas).then((res) => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.selectList()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    // type: 1.交车 2.取车
    setPickCarPerson(type, row) {
      this.currentRow = {
        ...row,
        type,
      }
      this.showSetPickCarPersonDialog = true
    },

    savePickCarPerson(data) {
      const parmas = {
        id: data.id,
        type: data.type,
        userId: data.userId,
        userName: data.userName,
      }

      setPickCarPerson(parmas).then((res) => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.selectList()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    handleVehicleDamage(row) {
      this.$router.push({
          path: '/order/vehicleDamageReport',
          query: {
            orderId: row.id,
            orderStatus: row.status,
          },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.red {
  color: #EB0A0A;
}
</style>