<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>线索管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">客户线索</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">客户信息</div>
              <c-input
                :inputValue.sync="search.userInfo"
                placeholder="请输入客户信息"
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
              <div class="label">期望车系</div>
              <c-select
                :selectValue.sync="search.carTypeId"
                :options="carTypeList"
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
              <div class="label">沟通状态</div>
              <c-select
                :selectValue.sync="search.communicateResult"
                :options="PARTNER_COMMUNICATERESULT_LIST"
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
          :data="currentPageDate"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            label="客户信息"
          >
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.userName}}</div>
                <div>{{scope.row.mobile}}</div>
              </div>
            </template>
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
            prop="inviteDate"
          >
          </el-table-column>

          <el-table-column
            label="处理状态"
          >
            <template slot-scope="scope">
              <div>
                {{ PARTNER_STATUS_STATUS[scope.row.status] }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="客户经理"
            prop="processedByName"
          >
          </el-table-column>

          <el-table-column
            label="最后跟进时间"
            prop="createdTime"
          >
          </el-table-column>

          <el-table-column
            label="跟进次数"
          >
            <template slot-scope="scope">
              <div>
                <div class="link-text" style="font-size: 16px;text-decoration: underline;" @click="goDetailPage(2, scope.row)" v-if="scope.row.count">
                  {{ scope.row.count }}
                </div>
                <div v-else>0</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="意向偏好"
            width="320"
          >
            <template slot-scope="scope">
              <div class="preference-wrap">
                <div class="preference-list">
                  <div class="preference-item">用车需求：{{ PARTNER_CUSTOMERDEMAND_STATUS[scope.row.customerDemand] || '-' }}</div>
                  <div class="preference-item">用车场景：{{ PARTNER_VEHICLESCENARIO_STATUS[scope.row.vehicleScenario] || '-' }}</div>
                  <div class="preference-item">能源类型：{{ PARTNER_ENERGYTYPE_STATUS[scope.row.energyType] || '-' }}</div>
                  <div class="preference-item">价格区间：{{ PARTNER_PRICERANGE_STATUS[scope.row.priceRange] || '-' }}</div>
                </div>
                <div class="preference-list">
                  <div class="preference-item">所在城市：{{ scope.row.city || '-' }}</div>
                  <div class="preference-item">用车时间：{{ PARTNER_VEHICLEUSAGETIME_STATUS[scope.row.vehicleUsageTime] || '-' }}</div>
                  <div class="preference-item">期望车系：{{ scope.row.carTypeEntity ? scope.row.carTypeEntity.carType : '-' }}</div>
                  <div class="preference-item">
                    <div v-if="scope.row.subscriptionModel || scope.row.financeLease">
                      {{ scope.row.subscriptionModel == 1 ? '接受订阅模式' : '' }}
                      <span v-if="scope.row.subscriptionModel && scope.row.financeLease"> | </span>
                      {{ scope.row.financeLease == 1 ? '接受融资租赁' : '' }}
                    </div>
                    <div v-else>-</div>
                  </div>
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
                  <div v-if="scope.row.valid == 0 || scope.row.valid == 2">{{PARTNER_COMMUNICATERESULT_STATUS[scope.row.communicateResult]}}</div>
                </div>
                <div v-else>-</div>                
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="备注"
            prop="contactLaterRemark"
          >
          </el-table-column>
         
          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
            <template slot-scope="scope">
              <div class="table-btn" @click="goDetailPage(1, scope.row)">
                <div v-if="scope.row.valid == 0">重新跟进</div>
                <div v-else-if="scope.row.valid == 1 || scope.row.valid == 2">继续跟进</div>
                <div v-else>立即跟进</div>
              </div>
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
import { getCommunicationRecord } from '@/api/clue/clue'
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
} from '@/utils/constant'
import { formatThousandNumber } from "@/utils/util"

export default {
  name: 'userclueList',

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
      search: {
        level: null,
        account: null,
        userInfo: '',
        cityId: '',
        customerDemand: '',
        vehicleScenario: '',
        carTypeId: '',
        startTime: '',
        endTime: '',
        communicateResult: '',
        energyType: '',
        limit: 10,
        page: 1,
      },
      dateRange: [],
      cityList: [],
      carTypeList: [],
      list: [],
      total: 0,
      currentPageDate: [],
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted() {
    this.search.level = this.userInfo.userRoleList[0].level
    this.search.account = this.userInfo.account
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
          this.list = res.data
          this.total = res.data.length
          this.getData()
        }
      })
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.getData()
    },

    getData() {
      const start = (this.search.page - 1) * this.search.limit
      const end = start + this.search.limit
      this.currentPageDate = this.list.slice(start, end)
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
        this.search.startTime = data[0]
        this.search.endTime = data[1]
        this.dateRange = data
      } else {
        this.search.startTime = ""
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
      this.search.startTime = ""
      this.search.endTime = ""
      this.search.communicateResult = ""
      this.search.energyType = ""
      this.search.page = 1
      this.dateRange = []
      this.handleSearch()
    },

    goDetailPage(type, row) {
      if (type === 2 && !row.count) {
        return
      }

      localStorage.setItem('userclueInfo', JSON.stringify(row))

      this.$router.push({
        path: "/clue/userclueDetail",
        query: {
          type,
        },
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