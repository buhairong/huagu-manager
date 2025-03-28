<template>
  <div>
      <div class="content">
          <div class="title">筛选</div>
          <div class="search-wrap">
              <div class="search-line">
                  <div class="search-item">
                      <div class="label">订单编号</div>
                      <c-input 
                          :inputValue.sync="search.orderNum"
                          placeholder="请输入订单编号"
                      />
                  </div>

                  <div class="search-item">
                      <div class="label">客户信息</div>
                      <c-input 
                          :inputValue.sync="search.nameOrMobile"
                          placeholder="请输入客户姓名或手机号"
                          :inputStyle="{
                            width: '170px'
                          }"
                      />
                  </div>

                  <div class="search-item">
                      <div class="label">下单日期</div>
                      <date-range-select
                          :value.sync="dateRange"
                          @select="handlerSelectDate"
                      />
                  </div>

                  <search-button class="search-btn" @search="searchList"/>
              </div>

              <div class="search-line search-line2">
                  <!-- <div class="search-item">
                      <div class="label">订单状态</div>
                      <c-select
                          :selectValue.sync="search.status"
                          :options="ORDER_STATUS_LIST"
                          placeholder="请选择订单状态"
                      />
                  </div> -->

                  <div class="search-item">
                      <div class="label">车辆款型</div>
                      <c-select
                          :selectValue.sync="search.carBrandId"
                          :options="brandList"
                          placeholder="选择品牌"
                          style="margin-right: 10px;"
                          labelKey="brandName"
                          valueKey="id"
                          :selectStyle="{
                              width: '198px'
                          }"
                          @change="changeCarBrand"
                      />
                      <c-select
                          :selectValue.sync="search.carTypeId"
                          :options="typeList"
                          placeholder="选择车系"
                          style="margin-right: 10px;"
                          labelKey="carType"
                          valueKey="id"
                          :selectStyle="{
                              width: '198px'
                          }"
                          @change="changeCarType"
                      />
                      <c-select
                          :selectValue.sync="search.carTypeYearId"
                          :options="yearList"
                          placeholder="选择年款"
                          style="margin-right: 10px;"
                          labelKey="year"
                          valueKey="id"
                          :selectStyle="{
                              width: '198px'
                          }"
                          @change="changeCarTypeYear"
                      />
                      <c-select
                          :selectValue.sync="search.carTypeYearProductId"
                          :options="productList"
                          placeholder="选择型号"
                          :selectStyle="{
                              width: '236px'
                          }"
                          labelKey="carTypeYearProduct"
                          valueKey="id"
                          @change="changeCarProduct"
                      />
                  </div>

                  <reset-button class="search-btn" @reset="reset"/>

              </div>
          </div>

          <div class="tag-wrap">
            <div class="tabs">
                <div 
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="tab"
                    :class="{active: tab.id == activeTab}"
                    @click="changeTab(tab.id)"
                >
                    {{tab.text}}（{{tab.total}}）
                </div>
            </div>

            <create-button 
                style="margin-left:20px;"
                text="创建订单"
                @create="setOrder(1)"
            />
          </div>

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
                  label="订单来源"
              >
                  <template slot-scope="scope">
                      <div>
                          <div>{{ scope.row.partnerRecommend === 1 ? '合伙人引荐' : '客户自购' }}</div>
                          <div v-if="scope.row.partnerRecommend === 1">佣金:￥{{formatThousandNumber(scope.row.distributionBrokerageFree)}}</div>
                      </div>
                  </template>
              </el-table-column>

              <el-table-column
                  prop="createdTime"
                  label="下单日期"
                  align="center"
              >
              </el-table-column>

              <el-table-column
                  label="车辆信息"
              >
                  <template slot-scope="scope">
                      <div v-if="scope.row.carPlateNum || scope.row.carVin || scope.row.carEngineNum || scope.row.carColor">
                          <el-tooltip class="item" effect="dark" :content="`车牌号：${scope.row.carPlateNum || '-'}\n车架号：${scope.row.carVin || '-'}\n发动机号：${scope.row.carEngineNum || '-'}\n外观颜色：${scope.row.carColor || '-'}`" placement="bottom-start">
                            <div>{{scope.row.carBrand}}·{{scope.row.carType}} <br> {{scope.row.carTypeYear}} <br> {{scope.row.carTypeYearProduct}}</div>
                          </el-tooltip>
                      </div>
                      <div v-else>
                          <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                          <div>{{scope.row.carTypeYear}}</div>
                          <div>{{scope.row.carTypeYearProduct}}</div>
                      </div>
                  </template>
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
                  label="方案信息"
              >
                  <template slot-scope="scope">
                      <div>
                          <div>订阅周期：{{scope.row.monthTotal}}个月</div>
                          <div>期末选择：{{scope.row.finalSelect}}</div>
                      </div>
                  </template>
              </el-table-column>

              <el-table-column
                  label="订单金额"
              >
                  <template slot-scope="scope">
                      <div>
                          <div>车辆押金：{{formatThousandNumber(scope.row.deposit)}}元</div>
                          <div>订阅费用：{{formatThousandNumber(scope.row.totalPayment)}}元</div>
                          <div>买断价格：{{formatThousandNumber(scope.row.buyoutsFee)}}元</div>
                      </div>
                  </template>
              </el-table-column>

              <el-table-column
                  prop="statusStr"
                  label="订单状态"
                  align="center"
              >
              </el-table-column>

                <el-table-column
                    label="操作"
                    width="110"
                    align="center"
                >
                    <template slot-scope="scope">
                      <div class="table-btn" @click="goOrderDetailPage(scope.row)">查看详情</div>
                      <div v-if="scope.row.status == 16 || scope.row.status == 17" class="table-btn" @click="openDistributionDialog(scope.row)">分配订单</div>
                      <div v-if="scope.row.isEntrustOrder === 1 && (scope.row.status == 10 || scope.row.status == 1)" class="table-btn" @click="setOrder(2, scope.row)">编辑订单</div>
                      <!-- <div v-if="type == 1 && scope.row.status == 3 && scope.row.carDeliveryId" class="table-btn" @click="openChooseDialog(scope.row)">绑定车辆</div>
                      <div v-if="scope.row.status == 13" class="table-btn" @click="goReplenishCarInfoPage(scope.row)">补充信息</div>
                      <div v-if="scope.row.status == 5" class="table-btn" @click="openGetCarDialog(scope.row)">车辆到店</div> -->
                    </template>
                </el-table-column>

            </el-table>

            <pagination 
                :total="total"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>

      <el-dialog
          :visible.sync="showChooseDialog"
          width="150px"
      >
         <div class="choose-item" @click="openChooseBindCarDialog">选择车辆</div>
         <div class="choose-item" @click="openCreateBindCarDialog">添加车辆</div>
      </el-dialog>

      <el-dialog
          title="选择车辆"
          :visible.sync="showChooseBindCarDialog"
          width="1000px"
      >
          <el-table 
              :data="bindCarList"
              style="width: 100%"
              :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
              max-height="500"
          >
              <el-table-column
                  label="选择"
                  align="center"
              >
                <template slot-scope="scope">
                    <div><el-radio v-model="chooseBindCarId" :label="scope.row.id"><span style="display: none;">1</span></el-radio></div>
                </template>
              </el-table-column>

              <el-table-column
                  label="车牌号"
                  align="center"
              >
                <template slot-scope="scope">
                    <div>{{ scope.row.carPlateNum || '-' }}</div>
                </template>
              </el-table-column>

              <el-table-column
                  label="车辆颜色"
                  align="center"
              >
                <template slot-scope="scope">
                    <div>{{ scope.row.carColor || '-' }}</div>
                </template>
              </el-table-column>

              <el-table-column
                  label="车架号"
                  align="center"
              >
                <template slot-scope="scope">
                    <div>{{ scope.row.carVin || '-' }}</div>
                </template>
              </el-table-column>

              <el-table-column
                  label="发动机号"
                  align="center"
              >
                <template slot-scope="scope">
                    <div>{{ scope.row.carEngineNum || '-' }}</div>
                </template>
              </el-table-column>

              <el-table-column
                  label="实表里程数"
                  align="center"
              >
                <template slot-scope="scope">
                    <div>{{ scope.row.mileage ? `${formatThousandNumber(scope.row.mileage)} 公里` : '-' }}</div>
                </template>
              </el-table-column>

              <el-table-column
                  label="车辆增配项"
              >
                  <template slot-scope="scope">
                      <div v-if="scope.row.carOtherConfigList.length > 3">
                          <el-tooltip class="item" effect="dark" :content="scope.row.carOtherConfigList.join('\n')">
                              <div>
                                <div v-for="(item, index) in scope.row.carOtherConfigList.slice(0, 3)" :key="index">
                                  {{ item }}
                                </div>
                              </div>
                          </el-tooltip>
                      </div>
                      <div v-else>
                        <div v-for="(item, index) in scope.row.carOtherConfigList" :key="index">
                          {{ item }}
                        </div>
                      </div>
                  </template>
              </el-table-column>
          </el-table>

          <div class="dialog-btn-wrap" style="margin-top:40px;justify-content: center;">
              <div class="btn" @click="handleCloseChooseBindCarDialog">取消</div>
              <div class="btn save-btn" @click="saveChooseBindCar">确认</div>
          </div>
      </el-dialog>

      <el-dialog
          title="绑定车辆"
          :visible.sync="showCreateBindCarDialog"
          width="480px"
      >
          <div class="car-info">
              <el-image
                  style="width:108px;height:80px"
                  :src="currentOrder.imageUrl"
                  fit="cover"
              ></el-image>
              {{ currentOrder.carBrand }}·{{ currentOrder.carType }} {{ currentOrder.carTypeYear }} {{ currentOrder.carTypeYearProduct }}
          </div>

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
              <div class="item-title">车 架 号: </div>
              <div class="item-content">
                  <c-input 
                      :inputValue.sync="carVin"
                      placeholder="请输入车架号"
                      :inputStyle="{
                        width: '200px'
                      }"
                  />
              </div>
          </div>

          <div class="item">
              <div class="item-title">发动机号: </div>
              <div class="item-content">
                  <c-input 
                      :inputValue.sync="carEngineNum"
                      placeholder="请输入车架号"
                      :inputStyle="{
                        width: '200px'
                      }"
                  />
              </div>
          </div>

          <span slot="footer" class="dialog-footer">
              <div class="dialog-btn-wrap">
                  <div class="btn" @click="handleCloseCreateBindCarDialog">取消</div>
                  <div class="btn save-btn" @click="saveCreateBindCar">绑定车辆</div>
              </div>
          </span>
      </el-dialog>

      <el-dialog
          title="提车信息"
          :visible.sync="showGetCarDialog"
          width="480px"
      >
          <div class="car-info">
              <el-image
                  style="width:108px;height:80px"
                  :src="currentOrder.imageUrl"
                  fit="cover"
              ></el-image>
              <div>
                <div class="car-brand">
                  {{ currentOrder.carBrand }}·{{ currentOrder.carType }} {{ currentOrder.carTypeYear }} {{ currentOrder.carTypeYearProduct }}
                </div>
                <div class="car-plate">{{ currentOrder.carPlateNum }}</div>
              </div>
          </div>

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
              <div class="item-title">提车门店: </div>
              <div class="item-content">
                {{ deliveryInfo.deliveryName }}
              </div>
          </div>

          <div class="item">
              <div class="item-title">提车地址: </div>
              <div class="item-content">
                {{ deliveryInfo.deliveryAddress }}
              </div>
          </div>

          <div class="item">
              <div class="item-title">提车时间: </div>
              <div class="item-content">
                  <c-date-time
                      :value.sync="deliveryTime"
                      placeholder="请选择提车时间"
                  />
              </div>
          </div>

          <span slot="footer" class="dialog-footer">
              <div class="dialog-btn-wrap">
                  <div class="btn" @click="handleCloseGetCarDialog">取消</div>
                  <div class="btn save-btn" @click="saveGetCar">确认</div>
              </div>
          </span>
        </el-dialog>

        <DistributionDialog 
            v-if="showDistributionDialog"
            :show="showDistributionDialog"
            :orderId="currentOrder.id"
            :imageUrl="currentOrder.imageUrl"
            :carBrand="currentOrder.carBrand"
            :carType="currentOrder.carType"
            :carTypeYear="currentOrder.carTypeYear"
            :carTypeYearProduct="currentOrder.carTypeYearProduct"
            :orderNum="currentOrder.orderNum"
            :name="currentOrder.name"
            :shopId="carDeliveryId"
            @close="handleCloseDistributionDialog"
            @save="saveDistribution"
        />
    </div>
</template>

<script>
import { selectListByPage, selectCarDeliveryListOfOrder, bindCarDeliveryToOrder, noBindCarList, bindCarToOrder, createCarAndBindOrder, updateCarDeliveryTime } from '@/api/order/orderManagement'
import { getCarBrand, getCarType, getCarTypeYear, listByCarTypeYearId } from '@/api/car/car'
import { selectSingleCarDeliveryAddressDetail } from '@/api/goods/goods'
import { ORDER_STATUS_LIST } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'
import DistributionDialog from './DistributionDialog'

export default {
    name: 'orderList',

    components: {
        DistributionDialog,
    },

    props: {
        type: {
            type: Number,
            required: true,
        }
    },

    data() {
        return {
            ORDER_STATUS_LIST,
            search: {
                newType: null,
                orderNum: '',
                nameOrMobile: '',
                minCreatedTime: null,
                maxCreatedTime: null,
                carBrandId: '',
                carTypeId: '',
                carTypeYearId: '',
                carTypeYearProductId: '',
                status: null,
                limit: 10,
                page: 1,
            },
            dateRange: [],
            brandList: [],
            typeList: [],
            yearList: [],
            productList: [],
            total: 0,
            list: [],
            carDeliveryList: [],
            currentOrder: {},
            carDeliveryId: '',
            showDistributionDialog: false,
            showChooseDialog: false,
            carVin: '',
            carEngineNum: '',
            showCreateBindCarDialog: false,
            bindCarList: [],
            chooseBindCarId: '',
            showChooseBindCarDialog: false,
            deliveryInfo: {},
            deliveryTime: '',
            showGetCarDialog: false,
            activeTab: undefined,
            tabs: [
                { id: undefined, text: '全部', total: 0 },
                { id: 10, text: '待审核', total: 0 },
                { id: 1, text: '待签约', total: 0 },
                { id: 2, text: '待支付车辆押金', total: 0 },
                { id: 3, text: '备车中', total: 0 },
                { id: 5, text: '待交车', total: 0 },
                { id: 4, text: '待支付订阅费用', total: 0 },
                { id: 6, text: '订阅中', total: 0 },
                { id: 7, text: '订阅结束', total: 0 },
            ],
        }
    },

    mounted() {
        this.search.newType = this.type
        this.searchList()
        this.getCarBrand()
    },

    methods: {
        getCarBrand() {
            getCarBrand().then(res => {
                if(res.code === 0) {
                    this.brandList = res.data
                }
            })
        },

        changeCarBrand(e) {
            this.search.carBrandId = e
            this.getCarType()
        },

    getCarType() {
        const data = {
            carBrandId: this.search.carBrandId
        }

        getCarType(data).then(res => {
            if(res.code === 0) {
                this.typeList = res.data
            }
        })
    },

    changeCarType(e) {
        this.search.carTypeId = e
        this.getCarTypeYear()
    },

    getCarTypeYear() {
        const data = {
            carTypeId: this.search.carTypeId
        }

        getCarTypeYear(data).then(res => {
            if(res.code === 0) {
                this.yearList = res.data
            }
        })
    },

    changeCarTypeYear(e) {
        this.search.carTypeYearId = e
        this.listByCarTypeYearId()
    },

    listByCarTypeYearId() {
        const data = {
            carTypeYearId: this.search.carTypeYearId
        }

        listByCarTypeYearId(data).then(res => {
            if(res.code === 0) {
                this.productList = res.data
            }
        })
    },

    changeCarProduct(e) {
        this.search.carTypeYearProductId = e
    },

    getList() {
      selectListByPage(this.search).then(res => {
            if (res.code == 0) {
                //res.data.page.records[0].status = 1
                this.list = res.data.page.records
                this.total = res.data.page.total
                this.tabs[0].total = res.data.count
                res.data.countList.forEach(item => {
                    for (const tab of this.tabs) {
                        if (tab.id === item.status) {
                            tab.total = item.count
                            break
                        }
                    }
                })
            }
      })
    },
   
    handlerSelectDate(data) {
      if (data) {
        this.search.minCreatedTime = data[0]
        this.search.maxCreatedTime = data[1]
        this.dateRange = data
      } else {
        this.search.minCreatedTime = null
        this.search.maxCreatedTime = null
        this.dateRange = []
      }
    },

    searchList() {
        this.search.page = 1
        this.getList()
    },
    
    reset() {
        this.search.orderNum = ''
        this.search.nameOrMobile = ''
        this.search.minCreatedTime = null
        this.search.maxCreatedTime = null
        this.search.status = ''
        this.search.carBrandId = ''
        this.search.carTypeId = ''
        this.search.carTypeYearId = ''
        this.search.carTypeYearProductId = ''
        this.dateRange = []
        this.searchList()
    },

    handleCurrentChange(e) {
        this.search.page = e
        this.getList()
    },

    formatThousandNumber(num) {
        if (num || num == 0) {
            return formatThousandNumber(num)
        }
        return 0
    },

    goOrderDetailPage(row) {
      this.$router.push({
          path: '/order/detail',
          query: {
              orderId: row.id,
              type: row.newType,
              orderStatus: row.status,
          },
      })
    },

    selectCarDeliveryListOfOrder(orderId) {
        const data = {
          orderId
        }

        selectCarDeliveryListOfOrder(data).then(res => {
            if(res.code === 0) {
                this.carDeliveryList = res.data
            }
        })
    },

    openDistributionDialog(row) {
      this.currentOrder = row
      this.selectCarDeliveryListOfOrder(row.id)
      this.carDeliveryId = row.carDeliveryId
      this.showDistributionDialog = true
    },

    handleCloseDistributionDialog() {
      this.showDistributionDialog = false
      this.currentOrder = {}
      this.carDeliveryId = ''
    },

    saveDistribution() {
        this.getList()
        this.handleCloseDistributionDialog()
    },

    handleOpenChooseDialog() {
      this.showChooseDialog = true
    },

    handleCloseChooseDialog() {
      this.showChooseDialog = false
    },

    openChooseDialog(row) {
      this.currentOrder = row
      this.showChooseDialog = true
    },

    handleCloseCreateBindCarDialog() {
      this.showCreateBindCarDialog = false
      this.carVin = ''
      this.carEngineNum = ''
      this.currentOrder = {}
    },

    openCreateBindCarDialog() {
      this.handleCloseChooseDialog()
      this.carVin = this.currentOrder.carVin
      this.carEngineNum = this.currentOrder.carEngineNum
      this.showCreateBindCarDialog = true
    },

    saveCreateBindCar() {
      if (!this.carVin) {
        this.$message.error('请输入车架号')
        return
      }

      if (!this.carEngineNum) {
        this.$message.error('请输入发动机号')
        return
      }

      const data = {
        newType: this.currentOrder.newType,
        carTypeYearProductId: this.currentOrder.carTypeYearProductId,
        orderId: this.currentOrder.id,
        carVin: this.carVin,
        carEngineNum: this.carEngineNum,
      }
      
      createCarAndBindOrder(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getList()
          this.handleCloseCreateBindCarDialog()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    noBindCarList() {
      const data = {
        newOrdOld: this.currentOrder.newType,
        carTypeYearProductId: this.currentOrder.carTypeYearProductId,
      }

      noBindCarList(data).then(res => {
          if(res.code === 0) {
              this.bindCarList = res.data
          }
      })
    },

    handleCloseChooseBindCarDialog() {
      this.showChooseBindCarDialog = false
      this.currentOrder = {}
    },

    openChooseBindCarDialog() {
      this.noBindCarList()
      this.handleCloseChooseDialog()
      this.showChooseBindCarDialog = true
    },

    saveChooseBindCar() {
      if (!this.chooseBindCarId) {
        this.$message.error('请选择要绑定的车辆')
        return
      }

      const data = {
        carId: this.chooseBindCarId,
        carType: this.currentOrder.newType,
        orderId: this.currentOrder.id,
      }

      bindCarToOrder(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getList()
          this.handleCloseChooseBindCarDialog()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    goReplenishCarInfoPage(row) {
        this.$router.push({
            path: '/order/replenishCarInfo',
            query: {
                newOrOlder: row.newType,
                carId: row.carId
            },
        })
    },

    selectSingleCarDeliveryAddressDetail() {
        const data = {
            carDeliveryAddressId: this.currentOrder.carDeliveryId
        }

        selectSingleCarDeliveryAddressDetail(data).then((res) => {
            if (res.code == 0) {
                this.deliveryInfo = res.data
            } 
        })
    },

    handleCloseGetCarDialog() {
      this.showGetCarDialog = false
      this.currentOrder = {}
      this.deliveryInfo = {}
      this.deliveryTime = ''
    },

    openGetCarDialog(row) {
      this.currentOrder = row
      this.deliveryTime = row.carDeliveryTime
      this.selectSingleCarDeliveryAddressDetail()
      this.showGetCarDialog = true
    },

    saveGetCar() {
      if(!this.deliveryTime) {
        this.$message.error('请选择提车时间')
        return
      }

      const data = {
        deliveryTime: this.deliveryTime,
        orderId: this.currentOrder.id,
      }

      updateCarDeliveryTime(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getList()
          this.handleCloseGetCarDialog()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    // 1.添加 2.编辑
    setOrder(operator, row={}) {
        this.$router.push({
            path: '/order/setEntrustOrder',
            query: {
                type: this.type,
                operator,
                orderId: row.id,
                orderStatus: row.status,
            },
        })
    },

    changeTab(tab) {
        this.activeTab = tab
        this.search.status = tab
        this.searchList()
    },

  },
}
</script>

<style lang="less" scoped>
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
  margin-bottom: 23px;
}

.search-line {
  display: flex;
  align-items: center;
  .search-item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      .label {
          height: 22px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          line-height: 22px;
          color: #4E5969;
          margin-right: 16px;
          text-align: right;
      }
  }
}
.search-line2 {
  margin: 30px 0;
}

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

.choose-item {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #3446AA;
  cursor: pointer;
}

.tag-wrap {
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .tabs {
        padding-bottom: 20px;
        flex: 1;
        white-space: nowrap;
        overflow: auto;
        .tab {
            display: inline-block;
            margin-right: 8px;
            padding: 0 16px;
            height: 28px;
            line-height: 28px;
            border-radius: 32px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            cursor: default;
            &.active {
                background: #F2F3F8;
                color: #3446AA;
            }
        }
    }
}
</style>