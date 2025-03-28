<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">用户信息</div>
              <c-input
                :inputValue.sync="search.userInfo"
                placeholder="请输入用户姓名或手机号"
                :style="{
                  width: '250px'
                }"
              />
            </div>

            <div class="search-item">
              <div class="label">所在城市</div>
              <c-select
                :selectValue.sync="search.cityId"
                :options="cityList"
                filterable
                labelKey="city"
                valueKey="id"
              />
            </div>

            <div class="search-item">
              <div class="label">用车需求</div>
              <c-select
                :selectValue.sync="search.customerDemand"
                :options="PARTNER_CUSTOMERDEMAND_LIST"
              />
            </div>

            <div class="search-item">
              <div class="label">价格区间</div>
              <c-select
                :selectValue.sync="search.priceRange"
                :options="PARTNER_PRICERANGE_LIST"
              />
            </div>

            <search-button class="search-btn" @search="handleSearch" />
          </div>

          <div class="search-line search-line2">
            <div class="search-item">
              <div class="label">注册时间</div>
              <date-range-select
                :value.sync="dateRange"
                :style="{
                  width: '250px'
                }"
                @select="handlerSelectDate"
              />
            </div>

            <div class="search-item">
              <div class="label">用户来源</div>
              <c-select
                :selectValue.sync="search.source"
                :options="PARTNER_SOURCE_LIST"
              />
            </div>

            <div class="search-item">
              <div class="label">用车场景</div>
              <c-select
                :selectValue.sync="search.vehicleScenario"
                :options="PARTNER_VEHICLESCENARIO_LIST"
              />
            </div>

            <div class="search-item">
              <div class="label">能源类型</div>
              <c-select
                :selectValue.sync="search.energyType"
                :options="PARTNER_ENERGYTYPE_LIST"
              />
            </div>

            <reset-button class="search-btn" @reset="reset" />
          </div>
        </div>

        <el-table 
          :data="list"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            label="客户信息"
          >
            <template slot-scope="scope">
              <div>
                <div>{{scope.row?.userInfoEntity?.userName || scope.row.userName}} {{scope.row.sex ? SEX_STATUS[scope.row.sex] : ''}}</div>
                <div>{{scope.row.mobile}}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="所在城市"
            prop="city"
          >
          </el-table-column>

          <el-table-column
            label="客户来源"
          >
            <template slot-scope="scope">
              <div>
                {{ PARTNER_SOURCE_STATUS[scope.row.source] }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="注册时间"
            prop="registerTime"
          >
          </el-table-column>

          <el-table-column
            label="最近活跃"
            prop="lastLive"
          >
          </el-table-column>

          <el-table-column
            label="意向偏好"
            width="160"
          >
            <template slot-scope="scope">
              <div class="preference-wrap">
                <div class="preference-list">
                  <div class="preference-item">用车需求：{{ PARTNER_CUSTOMERDEMAND_STATUS[scope.row.customerDemand] || '-' }}</div>
                  <div class="preference-item">用车场景：{{ PARTNER_VEHICLESCENARIO_STATUS[scope.row.vehicleScenario] || '-' }}</div>
                  <div class="preference-item">能源类型：{{ PARTNER_ENERGYTYPE_STATUS[scope.row.energyType] || '-' }}</div>
                  <div class="preference-item">价格区间：{{ PARTNER_PRICERANGE_STATUS[scope.row.priceRange] || '-' }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="订单信息"
            width="160"
          >
            <template slot-scope="scope">
              <div class="preference-wrap">
                <div class="preference-list">
                  <div class="preference-item">订阅订单：{{ scope.row.userCarSubscribeCount || 0 }}</div>
                  <div class="preference-item">会员租车：{{ scope.row.userCarRentalSubscribe || 0 }}</div>
                  <div class="preference-item">融资租赁：{{ scope.row.userCarFinanceLeaseSubscribe || 0 }}</div>
                  <div class="preference-item">好车易拍：{{ scope.row.secondAuction || 0 }}</div>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="沟通结果"
          >
            <template slot-scope="scope">
              <div>
                <div 
                  v-if="scope.row.valid || scope.row.valid == 0"
                  :class="{
                    'red': scope.row.valid == 0,
                    'blue': scope.row.valid == 2,
                  }"
                >
                  <div>{{PARTNER_VALID_STATUS[scope.row.valid]}}</div>
                </div>
                <div v-else>-</div>                
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="客户经理"
            prop="processedByName"
          >
          </el-table-column>
         
          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
            <template slot-scope="scope">
              <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
            </template>
          </el-table-column>
        </el-table>

        <pagination 
          :total="total"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCommunicationRecord } from '@/api/customer/customer'
import { getAllCity } from '@/api/merchant/merchant'
import {
  PARTNER_CUSTOMERDEMAND_LIST,
  PARTNER_CUSTOMERDEMAND_STATUS,
  PARTNER_VEHICLESCENARIO_LIST,
  PARTNER_VEHICLESCENARIO_STATUS,
  PARTNER_COMMUNICATERESULT_LIST,
  PARTNER_COMMUNICATERESULT_STATUS,
  PARTNER_ENERGYTYPE_LIST,
  PARTNER_ENERGYTYPE_STATUS,
  PARTNER_STATUS_LIST,
  PARTNER_STATUS_STATUS,
  PARTNER_PRICERANGE_LIST,
  PARTNER_PRICERANGE_STATUS,
  PARTNER_VEHICLEUSAGETIME_LIST,
  PARTNER_VEHICLEUSAGETIME_STATUS,
  PARTNER_VALID_LIST,
  PARTNER_VALID_STATUS,
  PARTNER_SOURCE_LIST,
  PARTNER_SOURCE_STATUS,
  SEX_LIST,
  SEX_STATUS,
} from '@/utils/constant'
import { formatThousandNumber } from "@/utils/util"

export default {
  name: 'customerList',

  components: {
    
  },

  data() {
    return {
      PARTNER_CUSTOMERDEMAND_LIST,
      PARTNER_CUSTOMERDEMAND_STATUS,
      PARTNER_VEHICLESCENARIO_LIST,
      PARTNER_VEHICLESCENARIO_STATUS,
      PARTNER_COMMUNICATERESULT_LIST,
      PARTNER_COMMUNICATERESULT_STATUS,
      PARTNER_ENERGYTYPE_LIST,
      PARTNER_ENERGYTYPE_STATUS,
      PARTNER_STATUS_LIST,
      PARTNER_STATUS_STATUS,
      PARTNER_PRICERANGE_LIST,
      PARTNER_PRICERANGE_STATUS,
      PARTNER_VEHICLEUSAGETIME_LIST,
      PARTNER_VEHICLEUSAGETIME_STATUS,
      PARTNER_VALID_LIST,
      PARTNER_VALID_STATUS,
      PARTNER_SOURCE_LIST,
      PARTNER_SOURCE_STATUS,
      SEX_LIST,
      SEX_STATUS,
      search: {
        userInfo: '',
        cityId: '',
        customerDemand: '',
        vehicleScenario: '',
        priceRange: '',
        beginTime: '',
        endTime: '',
        source: '',
        energyType: '',
        limit: 10,
        page: 1,
      },
      dateRange: [],
      cityList: [],
      carTypeList: [],
      list: [],
      total: 0,
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted() {
    this.handleSearch()
    this.getAllCity()
  },

  methods: {
    handleSearch() {
      this.search.page = 1
      this.selectList()
    },
    
    selectList() {
      getCommunicationRecord(this.search).then(res => {
        if (res.code === 0) {
          this.list = res.data.records
          this.total = res.data.total
        }
      })
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.selectList()
    },

    getAllCity() {
      getAllCity().then(res => {
        if(res.code === 0) {
          this.cityList = res.data
        }
      })
    },

    handlerSelectDate(data) {
      if (data) {
        this.search.beginTime = data[0]
        this.search.endTime = data[1]
        this.dateRange = data
      } else {
        this.search.beginTime = ""
        this.search.endTime = ""
        this.dateRange = []
      }
    },

    reset() {
      this.search.userInfo = ""
      this.search.city = ""
      this.search.customerDemand = ""
      this.search.vehicleScenario = ""
      this.search.carTypeId = ""
      this.search.beginTime = ""
      this.search.endTime = ""
      this.search.communicateResult = ""
      this.search.energyType = ""
      this.search.page = 1
      this.dateRange = []
      this.handleSearch()
    },

    goDetailPage(row) {
      localStorage.setItem('customerInfo', JSON.stringify(row))

      this.$router.push({
        path: "/customer/customerDetail",
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
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
  margin-bottom: 23px;
}

.search-wrap {
  margin-bottom: 40px;
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

.preference-wrap {
  display: flex;
  .preference-list {
    flex: 1;
    .preference-item {
      margin-bottom: 16px;
    }
  }
}

.red {
  color: #FF0000;
}
.blue {
  color: #3446AA;
}
</style>