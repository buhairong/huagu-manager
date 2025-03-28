<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>线索管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">客户线索</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content" v-if="detail">
        <div class="detail" v-if="showDetail">
          <div class="header">
            <div class="title">线索跟进</div>
            <div class="history-count" @click="toggleShowHistory" v-if="detail.count">跟进次数：{{detail.count}}次</div>
          </div>

          <div class="detail-card">
            <div class="card-header">基础信息</div>
            <div class="card-container basic-info">
              <div class="item">
                <div class="label">客户姓名</div>
                <c-input
                  :inputValue.sync="detail.userName"
                  placeholder="请输入客户姓名"
                />
              </div>

              <div class="item">
                <div class="label">客户性别</div>
                <el-radio-group v-model="detail.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </div>

              <div class="item">
                <div class="label">联系方式</div>
                {{ detail.mobile }}
              </div>

              <div class="item">
                <div class="label">注册时间</div>
                {{ detail.inviteDate }}
              </div>

              <div class="item">
                <div class="label">意向车系</div>
                <div class="link-text" @click="openCarIntentionDialog">查看更多</div>
              </div>
            </div>
          </div>

          <div class="detail-card">
            <div class="card-header">意向沟通</div>
            <div class="card-container">
              <div class="card-container-title">建立沟通</div>
              <div class="establishing-communications-list block">
                <div 
                  v-for="item in PARTNER_ESTABLISHINGCOMMUNICATIONS_LIST"
                  :key="item.value"
                  class="establishing-communications"
                  :class="{'active-establishing-communications': item.value == detail.establishingCommunications}"
                  @click="changeEstablishingCommunications(item)"
                >
                  {{ item.label }}
                </div>
              </div>

              <div v-if="detail.establishingCommunications == 1">
                <div class="block">
                  <div class="card-container-title">客户意向</div>
                  <el-radio-group v-model="detail.customerIntention" @change="changeCustomerIntention">
                    <el-radio v-for="item in PARTNER_CUSTOMERINTENTION_LIST" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                  </el-radio-group>
                </div>

                <div v-if="detail.customerIntention == 1">
                  
                </div>

                <div v-else-if="detail.customerIntention == 2">
                  <div class="block">
                    <div class="card-container-title">客户需求</div>
                    <el-radio-group v-model="detail.customerDemand">
                      <el-radio v-for="item in PARTNER_CUSTOMERDEMAND_LIST" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
                    </el-radio-group>
                  </div>

                  <div class="detail-info-wrap block">
                    <div>
                      <div class="card-line">
                        <div class="item">
                          <div class="label">所在城市</div>
                          <c-select
                            :selectValue.sync="detail.cityId"
                            :options="cityList"
                            filterable
                            :showAllValue="false"
                            labelKey="city"
                            valueKey="id"
                          />
                        </div>
                        <div class="item">
                          <div class="label">用车场景</div>
                          <c-select
                            :selectValue.sync="detail.vehicleScenario"
                            :options="PARTNER_VEHICLESCENARIO_LIST"
                            :showAllValue="false"
                          />
                        </div>
                      </div>

                      <div class="card-line">
                        <div class="item">
                          <div class="label">能源类型</div>
                          <c-select
                            :selectValue.sync="detail.energyType"
                            :options="PARTNER_ENERGYTYPE_LIST"
                            :showAllValue="false"
                          />
                        </div>
                        <div class="item" style="width: 400px;margin-right:20px;">
                          <div class="label">意向车系</div>
                          <c-select
                            :selectValue.sync="detail.carTypeEntity.carBrandId"
                            :options="brandList"
                            placeholder="选择品牌"
                            style="margin-right: 10px;"
                            labelKey="brandName"
                            valueKey="id"
                            :showAllValue="false"
                            @change="changeCarBrand"
                          />
                          <c-select
                            :selectValue.sync="detail.carTypeId"
                            :options="typeList"
                            placeholder="选择车系"
                            labelKey="carType"
                            valueKey="id"
                            :showAllValue="false"
                            @change="changeCarType"
                          />
                        </div>
                      </div>

                      <div class="card-line">
                        <div class="item">
                          <div class="label">价格区间</div>
                          <c-select
                            :selectValue.sync="detail.priceRange"
                            :options="PARTNER_PRICERANGE_LIST"
                            :showAllValue="false"
                          />
                        </div>
                        <div class="item">
                          <div class="label">用车时间</div>
                          <c-select
                            :selectValue.sync="detail.vehicleUsageTime"
                            :options="PARTNER_VEHICLEUSAGETIME_LIST"
                            :showAllValue="false"
                          />
                        </div>
                      </div>

                      <div class="card-line">
                        <div class="item">
                          <div class="label">订阅模式</div>
                          <el-radio-group v-model="detail.subscriptionModel">
                            <el-radio :label="1">接受</el-radio>
                            <el-radio :label="2">拒绝</el-radio>
                            <el-radio :label="3">未知</el-radio>
                          </el-radio-group>
                        </div>
                        <div class="item">
                          <div class="label">融资租赁</div>
                          <el-radio-group v-model="detail.financeLease">
                            <el-radio :label="1">接受</el-radio>
                            <el-radio :label="2">拒绝</el-radio>
                            <el-radio :label="3">未知</el-radio>
                          </el-radio-group>
                        </div>
                      </div>
                    </div>
                    <c-text-area 
                      :inputValue.sync="detail.contactLaterRemark"
                      placeholder="备注"
                    />
                  </div>
                </div>

                <div v-else-if="detail.customerIntention == 3">

                </div>
              </div>
              <div v-else-if="detail.establishingCommunications == 0">
                
              </div>

              <div class="block" v-if="detail.establishingCommunications == 0 || detail.customerIntention == 1 || detail.customerIntention == 3">
                <div class="card-container-title">沟通结果</div>
                <el-radio-group v-model="detail.communicateResult">
                  <template v-if="detail.customerIntention == 1">
                    <el-radio :label="1">客户忙</el-radio>
                    <el-radio :label="2">信号差</el-radio>
                    <el-radio :label="3">接通挂断</el-radio>
                  </template>
                  <template v-if="detail.customerIntention == 3">
                    <el-radio :label="4">拒绝沟通</el-radio>
                    <el-radio :label="5">随便看看</el-radio>
                    <el-radio :label="6">非本人操作</el-radio>
                  </template>
                  <template v-if="detail.establishingCommunications == 0">
                    <el-radio :label="7">无人接听</el-radio>
                    <el-radio :label="8">停机</el-radio>
                    <el-radio :label="9">无法拨通</el-radio>
                    <el-radio :label="10">空号</el-radio>
                  </template>
                </el-radio-group>
              </div>

              <div class="handle block" v-if="detail.communicateResult">
                <div style="margin-right: 16px;" v-if="detail.communicateResult == 3 || detail.communicateResult == 4">
                  （客户接通挂断，本次跟进结束）
                </div>
                <div class="item" style="height: 40px;width:unset;margin-right: 16px;" v-else>
                  <div class="label">稍后联系</div>
                  <c-date-time
                    :value.sync="detail.contactLaterTime"
                    placeholder="选择稍后联系时间"
                  />
                </div>
                <c-text-area 
                  :inputValue.sync="detail.contactLaterRemark"
                  placeholder="备注"
                />
              </div>
            </div>
          </div>

          <div class="buttom-btn-group">
            <div class="btn" @click="back">取消</div>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
        <div style="padding: 0 20px;" v-if="showHistory">
          <div class="header">
            <div class="title">沟通历史</div>
          </div>

          <div class="history-wrap">
            <div class="history-card" v-for="(item, index) in historyList" :key="item.id">
              <div class="card-header">第{{historyList.length-index}}次沟通：{{ item.createdTime }}</div>
              <div class="card-container">
                <div class="card-container-title">
                  <span v-if="item.establishingCommunications || item.establishingCommunications == 0">{{ PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS[item.establishingCommunications] }}</span> 
                  <span v-if="item.customerIntention"> > {{ PARTNER_CUSTOMERINTENTION_STATUS[item.customerIntention] }}</span> 
                  <span v-if="item.customerDemand"> > {{ PARTNER_CUSTOMERDEMAND_STATUS[item.customerDemand] }}</span>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">所在城市：</div>
                    {{ item.city || '-' }}
                  </div>
                  <div class="item">
                    <div class="label">能源类型：</div>
                    {{ item.energyType ? PARTNER_ENERGYTYPE_STATUS[item.energyType] : '-' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">用车场景：</div>
                    {{ item.vehicleScenario ? PARTNER_VEHICLESCENARIO_STATUS[item.vehicleScenario] : '-' }}
                  </div>
                  <div class="item">
                    <div class="label">用车时间：</div>
                    {{ item.vehicleUsageTime ? PARTNER_PRICERANGE_STATUS[item.vehicleUsageTime] : '-' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">期望车系：</div>
                    {{ item.carType || '-' }}
                  </div>
                  <div class="item">
                    {{ item.subscriptionModel ? '接受订阅模式' : '' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    {{ item.financeLease ? '接受融资租赁' : '' }}
                  </div>
                </div>

                <div class="card-line">
                  <div class="item">
                    <div class="label">备注：</div>
                    {{ item.contactLaterRemark || '-' }}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        title="用户意向车系"
        :visible.sync="showCarIntentionDialog"
        width="480px"
        :before-close="handleCloseDialog"
      >
        <el-table 
          :data="userCarIntentionList"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
          max-height="350"
        >
          <el-table-column
            label="意向车系"
            prop="carType"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="查看次数"
            prop="count"
            align="center"
          >
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
            <div class="btn" @click="handleCloseDialog">关闭</div>
          </div>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserCarIntentionList, addCommunicationRecord, getCommunicationRecordList } from '@/api/clue/clue'
import { getCarBrand, getCarType, getCarTypeYear, listByCarTypeYearId } from '@/api/car/car'
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
  PARTNER_ESTABLISHINGCOMMUNICATIONS_LIST,
  PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS,
  PARTNER_CUSTOMERINTENTION_LIST,
  PARTNER_CUSTOMERINTENTION_STATUS,
} from '@/utils/constant'
import { formatThousandNumber } from "@/utils/util"

export default {
  name: 'userclueDetail',

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
      PARTNER_ESTABLISHINGCOMMUNICATIONS_LIST,
      PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS,
      PARTNER_CUSTOMERINTENTION_LIST,
      PARTNER_CUSTOMERINTENTION_STATUS,
      detail: null,
      showHistory: false,
      showDetail: false,
      userCarIntentionList: [],
      showCarIntentionDialog: false,
      oldValue: {},
      historyList: [],
      cityList: [],
      brandList: [],
      typeList: [],
    }
  },

  computed: {
    ...mapState(['userInfo']),

    disabled() {
			let res = true

      if (this.detail) {
        for (const key in this.oldValue) {
          if (this.detail[key] !== this.oldValue[key]) {
            res = false
            break
          }
        }
      }
      
			
			return res
		},
  },

  mounted() {
    const type = this.$route.query.type
    if (type == 1) {
      this.showDetail = true
    } else {
      this.showHistory = true
    }
    const userclueInfo = localStorage.getItem('userclueInfo')
    if (userclueInfo) {
      this.oldValue = JSON.parse(userclueInfo)
      this.detail = JSON.parse(userclueInfo)

      if (!this.detail.carTypeEntity) {
        this.detail.carTypeEntity = {
          carBrandId: '',          
        }
      }
      this.getUserCarIntentionList()
      this.getCommunicationRecordList()
      if (this.detail.carTypeEntity && this.detail.carTypeEntity.carBrandId) {
        this.getCarType()
      }
    }
    this.getAllCity()
    this.getCarBrand()
  },

  methods: {
    getUserCarIntentionList() {
      const data = {
        userId: this.detail.userId
      }

      getUserCarIntentionList(data).then(res => {
        if (res.code === 0) {
          this.userCarIntentionList = res.data
        }
      })
    },

    getCommunicationRecordList() {
      const data = {
        inviteId: this.detail.inviteId
      }

      getCommunicationRecordList(data).then(res => {
        if (res.code === 0) {
          this.historyList = res.data
        }
      })
    },

    getAllCity() {
      getAllCity().then(res => {
        if(res.code === 0) {
          this.cityList = res.data
        }
      })
    },

    getCarBrand() {
      getCarBrand().then(res => {
        if(res.code === 0) {
          this.brandList = res.data
        }
      })
    },

    changeCarBrand(e) {
      this.detail.carTypeEntity.carBrandId = e
      this.detail.carTypeId = ''
      this.typeList = []
      this.getCarType()
    },

    getCarType() {
      const data = {
        carBrandId: this.detail.carTypeEntity.carBrandId
      }

      getCarType(data).then(res => {
        if(res.code === 0) {
          this.typeList = res.data
        }
      })
    },

    changeCarType(e) {
      this.detail.carTypeId = e
    },

    openCarIntentionDialog() {
      this.showCarIntentionDialog = true
    },

    handleCloseDialog() {
      this.showCarIntentionDialog = false
    },

    changeEstablishingCommunications(item) {
      this.detail.establishingCommunications = item.value
      this.initVaild()
    },

    changeCustomerIntention() {
      this.initVaild()
    },

    initVaild() {
      console.log('initVaild')
      this.detail.communicateResult = ''
      this.detail.cityId = ''
      this.detail.vehicleScenario = ''
      this.detail.energyType = ''
      this.detail.priceRange = ''
      this.detail.vehicleUsageTime = ''
      this.detail.subscriptionModel = ''
      this.detail.financeLease = ''
    },

    toggleShowHistory() {
      this.showHistory = !this.showHistory
    },

    save() {
      if (this.detail.cityId) {
        const findItem = this.cityList.find(item => item.id === this.detail.cityId)
        if (findItem) {
          this.detail.city = findItem.city
        }
      }
      addCommunicationRecord(this.detail).then(res => {
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

    back() {
      this.$router.back()
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
  display: flex;
  .detail {
    flex: 1;
  }
  .header {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: cener;
    height: 24px;
    font-family: PingFang SC;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    .title {
      font-weight: 500;
    }
    .history-count {
      color: #4E5969;
      cursor: pointer;
    }
  }
  .detail-card {
    margin-bottom: 12px;
    border-radius: 4px;
    background: #FFFFFF;
    border: 1px solid #DCDCDC;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
    .basic-info {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .history-wrap {
    max-height: 800px;
    overflow: auto;
  }
  .history-card {
    margin-bottom: 12px;
  }
  .card-header {
    height: 42px;
    line-height: 42px;
    background: #F2F3F5;
    padding: 0 20px;
    color: #1D2129;
    font-size: 14px;
  }
  .card-container {
    padding: 16px;
    .item {
      width: 33%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .label {
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #4E5969;
        margin-right: 8px;
        text-align: right;
      }
      .link-text {
        font-size: 14px;
      }
    }
    .block {
      margin-bottom: 20px;
    }
    .card-line {
      display: flex;
      width: 300px;
      .item {
        flex: 1;
      }
    }
    .detail-info-wrap {
      display: flex;
      .card-line {
        width: unset;
        .item {
          width: 220px;
          .label {
            width: 60px;
          }
        }
      }
    }
    .card-container-title {
      margin-bottom: 20px;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 500;
      color: #3D3D3D;
    }
    .establishing-communications-list {
      display: flex;
      .establishing-communications {
        margin-right: 30px;
        width: 147px;
        height: 45px;
        border-radius: 5px;
        background: #F2F3F5;
        font-size: 14px;
        color: #1D2129;
        font-family: PingFang SC;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .active-establishing-communications {
        color: #3446AA;
        font-weight: 600;
      }
    }
    .handle {
      display: flex;
    }
  }
}

.el-button {
  margin-left: 24px;
  width: 104px;
}

.dialog-btn-wrap {
  display: flex;
  justify-content: center;
  .btn {
    background: #3446AA;
    color: #fff;
  }
}
</style>