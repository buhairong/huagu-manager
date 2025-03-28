<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>全民合伙人</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">全民合伙人管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div>
            <div class="title">筛选</div>

            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                      <div class="label">合伙人信息</div>
                      <c-input 
                        :inputValue.sync="search.partnerInfo"
                        placeholder="请输入合伙人信息"
                      />
                    </div>

                    <div class="search-item">
                      <div class="label">状态</div>
                      <c-select
                        :selectValue.sync="search.isFreezed"
                        :options="freezedStatusList"
                        placeholder="请选择状态"
                      />
                    </div>

                    <div class="search-item">
                      <div class="label">申请日期</div>
                      <date-range-select
                        :value.sync="dateRange"
                        @select="handlerSelectDate"
                      />
                    </div>

                    <search-button class="search-btn" @search="handleSearch"/>

                    <reset-button class="search-btn reset-btn" @reset="reset"/>
                </div>
            </div>
        </div>

        <div class="create-btn-wrap">
          <div class="tabs">
            <div 
              v-for="tab in PARTNER_STATUS"
              :key="tab.value"
              class="tab"
              :class="{'active-tab': search.type === tab.value}"
              @click="changeTab(tab.value)"
            >
              {{ tab.label }}
            </div>
          </div>

          <div class="btn-group" v-if="search.type === 2">
            <create-button 
              text="添加企业合伙人"
              :buttonStyle="{
                width: '140px'
              }"
              @create="set(1)"
            />
          </div>
        </div>

        <el-table 
          :data="list"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <template v-if="search.type === 1">
            <el-table-column
              label="姓名"
              prop="userName"
            >
              <template slot-scope="scope">
                <div>
                  {{scope.row.userName || '-'}}
                  <i style="margin-left:10px"  @click="setName(scope.row)" class="el-icon-edit"></i>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="手机号"
            >
              <template slot-scope="scope">
                <div>
                  <div>{{ scope.row.mobile }}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="职业信息"
              prop="career"
            >
            </el-table-column>

            <el-table-column
              label="申请时间"
              prop="partnerCreateTime"
            >
            </el-table-column>

            <el-table-column
              label="入驻时间"
              prop="updatedTime"
            >
            </el-table-column>

            <el-table-column
              label="状态"
            >
              <template slot-scope="scope">
                <div>
                  <div>{{ scope.row.isFreezed === 1 ? '冻结' : '正常' }}</div>
                  <div v-if="scope.row.isFreezed === 1">{{ scope.row.freezedCreateTime ? `（${scope.row.freezedCreateTime}）` : '（永久冻结）' }}</div>
                </div>
              </template>
            </el-table-column>
          </template>

          <template v-if="search.type === 2">
            <el-table-column
              label="企业信息"
            >
              <template slot-scope="scope">
                <div>
                  <div>{{ scope.row.companyName }}</div>
                  <div>{{ scope.row.corporationTaxNumber }}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="超管联系方式"
              prop="managerMobile"
            >
            </el-table-column>

            <el-table-column
              label="收款信息"
            >
              <template slot-scope="scope">
                <div>
                  <div>{{ scope.row.bankCardName }}</div>
                  <div>{{ scope.row.bankCardNo }}</div>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              label="入驻时间"
              prop="createdTime"
            >
            </el-table-column>

            <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
              <div>
                <div>{{ scope.row.isFreezed === 1 ? '冻结' : '正常' }}</div>
                <div v-if="scope.row.isFreezed === 1">{{ scope.row.freezedCreateTime ? `（${scope.row.freezedCreateTime}）` : '（永久冻结）' }}</div>
              </div>
            </template>
          </el-table-column>
          </template>

          

          <template v-if="search.type === 1">
            <el-table-column
              label="审核信息"
            >
              <template slot-scope="scope">
                <div>
                  <div>{{ scope.row.mobile }}</div>
                  <div>{{ scope.row.updatedTime }}</div>
                </div>
              </template>
            </el-table-column>
          </template>
         
          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
            <template slot-scope="scope">
              <div class="table-btn" @click="detail(scope.row)">查看详情</div>
              <div class="table-btn" @click="set(2, scope.row)" v-if="search.type === 2">编辑信息</div>
              <div class="table-btn" @click="openFreezedDialog(scope.row)">{{ scope.row.isFreezed === 1 ? '解除冻结' : '权限冻结' }}</div>
            </template>
          </el-table-column>
        </el-table>

        <pagination 
          :total="total"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>

      <el-dialog
        title="冻结用户全民合伙人权限"
        :visible.sync="showFreezedDialog"
        width="480px"
      >
        <div class="item">
          <el-radio-group v-model="freezedParams.freezedDate">
              <el-radio 
                  v-for="item in freezedDateList"
                  :key="item.value"
                  :label="item.value"
              >
                  {{ item.label }}
              </el-radio>
          </el-radio-group>
        </div>

        <div class="item" v-if="freezedParams.freezedDate === 1">
          <div class="item-label">权限冻结至：</div>
          <div class="item-content">
              <c-date
                :value.sync="freezedParams.freezeDate"
                placeholder="请选择日期"
              />
          </div>
      </div>

        <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap">
                <div class="btn" @click="closeDialog">取消</div>
                <div class="btn save-btn" @click="freezeOrUnfreeze">确认</div>
            </div>
        </span>
      </el-dialog>

      <el-dialog
        title="解除冻结"
        :visible.sync="showUnfreezedDialog"
        width="480px"
      >
        <div class="tip">
          确认要解除冻结解除用户全民合伙人权限
        </div>

        <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap">
                <div class="btn" @click="closeDialog">取消</div>
                <div class="btn save-btn" @click="freezeOrUnfreeze">确认</div>
            </div>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getPartnerList, getCompanyPartnerList, freezeOrUnfreeze, freezeOrUnfreezeForCompany, updatePartnerUserName } from '@/api/partner/partner'
import { PARTNER_STATUS } from '@/utils/constant'

export default {
  name: 'partnerList',

  components: {
    
  },

  data() {
    return {
      PARTNER_STATUS,
      search: {
        type: 1, // 1.个人合伙人 2.企业合伙人
        partnerInfo: '',
        isFreezed: '', // 0.正常 1.冻结
        startDate: '',
        endDate: '',
        page: 1,
        limit: 10,
      },
      dateRange: [],
      list: [],
      total: 0,
      freezedStatusList: [
        { value: 0, label: '正常' },
        { value: 1, label: '冻结' },
      ],
      showFreezedDialog: false,
      showUnfreezedDialog: false,
      freezedParams: {
        id: null,
        freezeDate: '',
        isFreezed: null,
        freezedDate: 1, // 1.按日期冻结  2.永久冻结
      },
      freezedDateList: [
        { value: 1, label: '按日期冻结' },
        { value: 2, label: '永久冻结' },
      ],
    }
  },

  mounted() {
    this.handleSearch()
  },

  activated() {
    this.handleSearch()
  },

  methods: {
    changeTab(tab) {
      this.search.type = tab
      this.reset()
    },

    handleSearch() {
      if (this.search.type === 1) {
        this.searchList()
      } else {
        this.searchCompanyList()
      }
    },

    searchList() {
      getPartnerList(this.search).then(res => {
        if (res.code === 0) {
          this.list = res.data.records
          this.total = res.data.total
        }
      })
    },

    searchCompanyList() {
      getCompanyPartnerList(this.search).then(res => {
        if (res.code === 0) {
          this.list = res.data.records
          this.total = res.data.total
        }
      })
    },

    handlerSelectDate(data) {
      this.search.startDate = data[0] || ''
      this.search.endDate = data[1] || ''
      this.dateRange = data || []
    },

    reset() {
      this.search.partnerInfo = ''
      this.search.isFreezed = ''
      this.search.startDate = ''
      this.search.endDate = ''
      this.dateRange = []
      this.search.page = 1
      this.list = []
      this.total = 0

      this.handleSearch()
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.handleSearch()
    },

    openFreezedDialog(row) {
      this.freezedParams.id = row.id
      if (row.isFreezed === 1) {
        this.freezedParams.isFreezed = 0
        this.showUnfreezedDialog = true
      } else {
        this.freezedParams.isFreezed = 1
        this.showFreezedDialog = true
      }
    },

    closeDialog() {
      this.showFreezedDialog = false
      this.showUnfreezedDialog = false
      this.freezedParams.id = null
      this.freezedParams.freezeDate = ''
      this.freezedParams.isFreezed = null,
      this.freezedParams.freezedDate = 1
    },

    freezeOrUnfreeze() {
      if (this.freezedParams.isFreezed === 1 && this.freezedParams.freezedDate === 1 && !this.freezedParams.freezeDate) {
        this.$message.error('请选择日期')
        return
      }

      if (this.search.type === 1) {
        this.freezeOrUnfreezeForPerson()
      } else {
        this.freezeOrUnfreezeForCompany()
      }
    },

    freezeOrUnfreezeForPerson() {
      freezeOrUnfreeze(this.freezedParams).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.handleSearch()
          this.closeDialog()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    freezeOrUnfreezeForCompany() {
      freezeOrUnfreezeForCompany(this.freezedParams).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.handleSearch()
          this.closeDialog()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    // 1.添加 2.编辑
    set(type, row) {
      localStorage.setItem('companyPartnerDetail', JSON.stringify(row))
      this.$router.push({
        path: '/partner/setCompanyPartner',
        query: {
          type,
        },
      })
    },

    detail(row) {
      localStorage.setItem('partnerDetailInfo', JSON.stringify(row))
      let path = '/partner/companyPartnerDetail'
      // if (this.search.type === 2) {
      //   path = '/partner/companyPartnerDetail'
      // }
      this.$router.push({
        path,
        query: {
          type: this.search.type,
        },
      })
    },

    setName(row) {
      this.$prompt('请输入姓名', '修改姓名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (value) => {
              if(!value || !value.trim()) {
                  return '请输入姓名'
              }
          }
      }).then(({ value }) => {
          const params = {
            id: row.id,
            userName: value,
          }

          updatePartnerUserName(params).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.handleSearch()
            } else {
              this.$message.error('保存失败')
            }
          }).catch(err => {
            this.$message.error('保存失败')
          })
      })
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
    margin-bottom: 20px;
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
.reset-btn {
  margin-left: 20px;
}

.item {
    margin-bottom: 16px;
    display: flex;
    height: 32px;
    line-height: 32px;
    .item-label {
      margin-right: 16px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #1D2129;
      text-align: right;
    }
}

.tip {
  height: 24px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 24px;
  color: rgba(124, 124, 124, 0.8);
}

.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn-group {
    display: flex;
  }
}
</style>