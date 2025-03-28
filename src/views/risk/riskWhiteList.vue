<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>风控管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">风控白名单</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
                <div class="label">用户信息</div>
                <c-input 
                    :inputValue.sync="search.name"
                    placeholder="请输入用户信息"
                />
            </div>

            <div class="search-item">
                <div class="label label2">添加时间</div>
                <date-range-select
                  :value.sync="addTimeRange"
                  :style="{width: '250px'}"
                  @select="handlerSelectAddTime"
                />
            </div>

            <search-button class="search-btn" @search="searchList"/>
          </div>

          <div class="search-line search-line2">
            <div class="search-item">
                <div class="label">认证状态</div>
                <c-select
                  :selectValue.sync="search.authenticationStatus"
                  :options="AUTHENTICATION"
                />
            </div>

            <div class="search-item">
                <div class="label label2">到期时间</div>
                <date-range-select
                  :value.sync="expireTimeRange"
                  :style="{width: '250px'}"
                  @select="handlerSelectExpireTime"
                />
            </div>
              
            <reset-button class="search-btn" @reset="reset"/>
          </div>
        </div>

        <div class="tag-wrap">
          <div class="tabs">
            <div 
              v-for="tab in AUTHENTICATION_RISK"
              :key="tab.value"
              class="tab"
              :class="{active: tab.value == search.status}"
              @click="changeTab(tab.value)"
            >
              {{tab.label}}（{{tab.total}}）
            </div>
          </div>

          <create-button 
            style="margin-left:20px;"
            text="添加用户"
            @create="openAddUserDialog"
          />
        </div>

        <el-table 
          :data="list"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            prop="mobile"
            label="手机号"
          >  
          </el-table-column>

          <el-table-column
            label="用户信息"
          >
            <template slot-scope="scope">
              {{ scope.row.name || '-' }}
            </template>
          </el-table-column>

          <el-table-column
            label="认证状态"
          >
            <template slot-scope="scope">
              {{AUTHENTICATION_STATUS[scope.row.authenticationStatus]}}
            </template>
          </el-table-column>

          <el-table-column
            prop="createdTime"
            label="添加时间"
          >
          </el-table-column>

          <el-table-column
            prop="createdByName"
            label="添加员工"
          >
          </el-table-column>
         
          <el-table-column
            prop="expireTime"
            label="到期时间"
          >
          </el-table-column>

          <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
              {{AUTHENTICATION_RISK_STATUS[scope.row.status]}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="110"
            align="center"
          >
            <template slot-scope="scope">
              <div><el-button class="table-btn" type="text" @click="openEditUserDialog(scope.row)">修改权限</el-button></div>
              <div><el-button class="table-btn" type="text" @click="openHistoryDialog(scope.row.id)">操作历史</el-button></div>
            </template>
          </el-table-column>
        </el-table>

        <pagination 
          :total="total"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>

      <el-dialog
        title="添加用户"
        :visible.sync="showAddUserDialog"
        width="480px"
        :before-close="handleCloseAddUserDialog"
      >
        <div class="item">
            <div class="item-label">用户手机号：</div>
            <div class="item-content">
              <c-input 
                :inputValue.sync="addUserForm.mobile"
                placeholder="请输入用户手机号"
                style="width: 200px"
              />
            </div>
        </div>

        <div class="dialog-titie">到期时间</div>
        <div class="dialog-sub-titie">请选择用户白名单有效期</div>

        <el-radio-group v-model="addUserForm.expireDay">
          <el-radio 
            v-for="item in expireDayList"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
            <div class="btn" @click="handleCloseAddUserDialog">取消</div>
            <div class="btn save-btn" @click="addUser">添加</div>
          </div>
        </span>
      </el-dialog>

      <el-dialog
        title="修改权限"
        :visible.sync="showEditUserDialog"
        width="480px"
        :before-close="handleCloseEditUserDialog"
      >
        <div class="dialog-sub-titie">请选择用户状态</div>
        <el-radio-group v-model="currentUser.status">
          <el-radio 
            v-for="item in AUTHENTICATION_RISK_DIALOG"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>

        <template v-if="currentUser.status == 1">
          <div class="dialog-sub-titie" style="margin-top:40px;">请选择用户白名单有效期</div>

          <el-radio-group v-model="currentUser.expireDay">
            <el-radio 
              v-for="item in expireDayList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </template>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
            <div class="btn" @click="handleCloseEditUserDialog">取消</div>
            <div class="btn save-btn" @click="editUser">保存</div>
          </div>
        </span>
      </el-dialog>

      <el-dialog
        title="操作历史"
        :visible.sync="showHistoryDialog"
        width="800px"
        :before-close="handleCloseHistoryDialog"
      >
        <el-table 
          :data="historyList"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
          max-height="350"
        >
          <el-table-column
            prop="operator"
            label="操作员工"
          >  
          </el-table-column>

          <el-table-column
            prop="createdTime"
            label="操作时间"
          >
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="scope.row.operateType === 1">添加用户</div>
                <div v-else>
                  <div>状态 修改为 {{AUTHENTICATION_RISK_STATUS[scope.row.status]}}</div>
                  <div>有效期 修改为 {{scope.row.expireDay}}天</div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
            <div class="btn" @click="handleCloseHistoryDialog">关闭</div>
          </div>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { selectRiskWhiteList, addWhiteUser, updateWhiteUser, selectHistoryList } from '@/api/risk/whiteList'
import { AUTHENTICATION, AUTHENTICATION_STATUS, AUTHENTICATION_RISK, AUTHENTICATION_RISK_STATUS, AUTHENTICATION_RISK_DIALOG } from '@/utils/constant'
import { validPhoneNum } from '@/utils/validate'

export default {
  name: 'riskWhiteList',

  components: {
    
  },

  data() {
    return {
      AUTHENTICATION,
      AUTHENTICATION_STATUS,
      AUTHENTICATION_RISK,
      AUTHENTICATION_RISK_STATUS,
      AUTHENTICATION_RISK_DIALOG,
      search: {
        name: '',       // 用户信息
        authenticationStatus: '',  // 认证状态 0.未认证 1.已认证
        addTimeStart: '', // 添加时间开始时间
        addTimeEnd: '', // 添加时间结束时间
        expireTimeStart: '', // 到期时间开始时间
        expireTimeEnd: '', // 到期时间结束时间
        status: 0,
        limit: 10,
        page: 1,
      },
      addTimeRange: [],
      expireTimeRange: [],
      list: [],
      total: 0,
      addUserForm: {
        mobile: '',
        expireDay: 30,
      },
      showAddUserDialog: false,
      expireDayList: [
        { value: 30, label: '30天' },
        { value: 60, label: '60天' },
        { value: 90, label: '90天' },
        { value: 180, label: '180天' },
        { value: 360, label: '360天' },
      ],
      showEditUserDialog: false,
      currentUser: {},
      showHistoryDialog: false,
      historyList: [],
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted() {
    this.selectRiskWhiteList()
  },

  methods: {
    changeTab(tab) {
      this.search.status = tab
      this.searchList()
    },

    selectRiskWhiteList() {
      selectRiskWhiteList(this.search).then((res) => {
        if (res.code == 0) {
          this.list = res.data.page.records
          this.total = res.data.page.total
          res.data.countList.forEach(item => {
            for (const tab of this.AUTHENTICATION_RISK) {
              if (tab.value === item.status) {
                tab.total = item.count
                break
              }
            }
          })
        }
      })
    },

    searchList() {
      this.search.page = 1
      this.selectRiskWhiteList()
    },

    reset() {
      this.search.name = ''
      this.search.authenticationStatus = ''
      this.search.addTimeStart = ''
      this.search.addTimeEnd = ''
      this.search.expireTimeStart = ''
      this.search.expireTimeEnd = ''
      this.addTimeRange = []
      this.expireTimeRange = []
      this.searchList()
    },

    handlerSelectAddTime(data) {
      this.search.addTimeStart = data[0] || ''
      this.search.addTimeEnd = data[1] || ''
      this.addTimeRange = data || []
    },

    handlerSelectExpireTime(data) {
      this.search.expireTimeStart = data[0] || ''
      this.search.expireTimeEnd = data[1] || ''
      this.expireTimeRange = data || []
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.selectRiskWhiteList()
    },

    openAddUserDialog() {
      this.showAddUserDialog = true
    },

    handleCloseAddUserDialog() {
      this.showAddUserDialog = false
      this.addUserForm.mobile = ''
      this.addUserForm.expireDay = 30
    },

    addUser() {
      const mobile = this.addUserForm.mobile.trim()

      if (!mobile) {
        this.$message.error('请输入手机号')
        return
      }

      if (!validPhoneNum(mobile)) {
        this.$message.error('请输入正确的手机号')
        return
      }

      const params = {
        ...this.addUserForm,
        createdByName: this.userInfo.name,
      }

      addWhiteUser(params).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.handleCloseAddUserDialog()
          this.reset()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    openEditUserDialog(row) {
      this.currentUser = {
        ...row
      }
      this.showEditUserDialog = true
    },

    handleCloseEditUserDialog() {
      this.showEditUserDialog = false
      this.currentUser = {}
    },

    editUser() {
      if (this.currentUser.status != 1 && this.currentUser.status != 2) {
        this.$message.error('请选择用户状态')
        return
      }

      const params = {
        ...this.currentUser,
        updatedByName: this.userInfo.name,
      }

      updateWhiteUser(params).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.handleCloseEditUserDialog()
          this.selectRiskWhiteList()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    openHistoryDialog(id) {
      const params = {
        id,
      }

      selectHistoryList(params).then((res) => {
        if (res.code == 0) {
          this.historyList = res.data
          this.showHistoryDialog = true
        }
      })
    },

    handleCloseHistoryDialog() {
      this.showHistoryDialog = false
      this.historyList = []
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
    }
  }
  .search-btn {
    margin-left: 12px;
  }
}
.search-line2 {
  margin-top: 30px;
}

.create-btn-warp {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
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

.dialog-titie {
  height: 24px;
  font-family: PingFang SC;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
}

.dialog-sub-titie {
  margin: 12px 0;
  height: 22px;
  font-family: Source Han Sans CN;
  font-size: 14px;
  line-height: 22px;
  color: #4E5969;
}
</style>