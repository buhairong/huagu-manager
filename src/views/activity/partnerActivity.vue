<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>营销活动</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">活动配置</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="title-wrap">
          <div class="title">任务中心</div>
          <div class="line"></div>
        </div>

        <div class="task-wrap">
          <div class="task" v-for="item in taskEntityList" :key="item.id">
            <div class="task-title">任务描述：{{ PARTNER_TASK_TYPE[item.taskType] }}</div>
            <div class="items">
              <div class="item">
                <div class="item-label">邀请人数：</div>
                <div class="item-content">{{item.taskCount}}人</div>
              </div>
              <div class="item">
                <div class="item-label">任务奖励：</div>
                <div class="item-content">{{item.taskMoney}}元</div>
              </div>
            </div>
            <div class="desc" v-if="item.taskType === 3">
              在邀请第{{item.specialTaskPartnerCount}}位合伙人时，受邀合伙人需带来{{item.specialTaskCustomerCount}}个有效客户。
            </div>

            <div class="btn-group">
              <div class="link-btn" @click="openLogDialog(item.taskType)">操作日志</div>
              <div class="link-btn" @click="handleUpdate(item)">编辑任务</div>
            </div>
          </div>
        </div>

        <div class="title-wrap">
          <div class="title">合伙人佣金</div>
          <div class="line"></div>
        </div>

        <div class="task-wrap">
          <div class="task" v-for="item in commissionList" :key="item.id">
            <div class="task-title">{{ PARTNER_TASK_TYPE[item.taskType] }}</div>
            <div class="items">
              <div class="item">
                <div class="item-label">抽佣金额：</div>
                <div class="item-content">{{item.paramValue}}元</div>
              </div>
            </div>

            <div class="btn-group">
              <div class="link-btn" @click="openLogDialog(item.taskType)">操作日志</div>
              <div class="link-btn" @click="handleUpdate(item)">编辑任务</div>
            </div>
          </div>
        </div>

        <div class="title-wrap">
          <div class="title">爆单排行榜</div>
          <div class="line"></div>
        </div>

        <div class="task-wrap">
          <div class="task" v-for="item in rankList" :key="item.id">
            <div class="task-title">{{ PARTNER_TASK_TYPE[item.taskType] }}</div>
            <div class="items">
              <div class="item">
                <div class="item-label">更新方式：</div>
                <div class="item-content">{{PARTNER_RANK_STATUS[item.paramValue]}}</div>
              </div>
            </div>

            <div class="btn-group">
              <div class="link-btn" @click="openLogDialog(item.taskType)">操作日志</div>
              <div class="link-btn" @click="handleUpdate(item)">编辑任务</div>
            </div>
          </div>
        </div>
      </div>

      <LogDialog
        v-if="showLogDialog"
        :show.sync="showLogDialog"
        :logType="logType"
      />

      <el-dialog
        title="编辑任务"
        :visible.sync="showUpdateDialog"
        width="480px"
        :before-close="handleCloseDialog"
      >
        <template v-if="updateForm.taskType <= 3">
          <div class="item">
            <div class="item-label">邀请人数：</div>
            <div class="item-content">
              <c-input-number 
                :inputValue.sync="updateForm.taskCount"
                placeholder="请输入邀请人数"
                :min="1"
              />人
            </div>
          </div>

          <div class="item">
            <div class="item-label">任务奖励：</div>
            <div class="item-content">
              <c-input-number 
                :inputValue.sync="updateForm.taskMoney"
                placeholder="请输入奖励金额"
              />元
            </div>
          </div>
        </template>
        
        <template v-if="updateForm.taskType === 3">
          <div class="update-dialog-line"></div>

          <div class="item">
            <div class="item-label item-label1">
              一级合伙人邀请第
              <c-input-number 
                :inputValue.sync="updateForm.specialTaskPartnerCount"
                placeholder="请输入"
                :inputStyle="{
                  width: '80px',
                }"
              />
              位合伙人时，
            </div>
          </div>
          <div class="item">
            <div class="item-label item-label1">
              受邀合伙人需带来                       
              <c-input-number 
                :inputValue.sync="updateForm.specialTaskCustomerCount"
                placeholder="请输入"
                :inputStyle="{
                  width: '80px',
                }"
              />
              个有效客户。
            </div>
          </div>
        </template>

        <template v-if="updateForm.taskType === 4">
          <div class="item">
            <div class="item-label">抽佣金额：</div>
            <div class="item-content">
              <c-input-number 
                :inputValue.sync="updateForm.paramValue"
                placeholder="请输入抽佣金额"
              />元
            </div>
          </div>
        </template>

        <template v-if="updateForm.taskType === 5">
          <div class="item">
            <div class="item-label">更新方式：</div>
            <div class="item-content">
              <c-select
                :selectValue.sync="updateForm.paramValue"
                :options="PARTNER_RANK_LIST"
                placeholder="请选择更新方式"
                :showAllValue="false"
              />
            </div>
          </div>
        </template>

        <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap">
                <div class="btn" @click="handleCloseDialog">取消</div>
                <div class="btn save-btn" @click="save">确认修改</div>
            </div>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { selectActivityTask, updateActivityTask } from '@/api/activity/activity'
import { addLogList } from '@/api/log/log'
import { PARTNER_TASK_TYPE, PARTNER_RANK_LIST, PARTNER_RANK_STATUS } from '@/utils/constant'
import LogDialog from '@/components/LogDialog.vue'

export default {
  name: 'partnerActivity',

  components: {
    LogDialog,
  },

  data() {
    return {
      PARTNER_TASK_TYPE,
      PARTNER_RANK_LIST,
      PARTNER_RANK_STATUS,
      taskEntityList: [],
      commissionList: [],
      rankList: [],
      showLogDialog: false,
      logType: null,
      showUpdateDialog: false,
      updateForm: {},
    }
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted() {
    this.selectActivityTask()
  },

  methods: {
    selectActivityTask() {
      selectActivityTask({}).then(res => {
        if (res.code === 0) {
          this.taskEntityList = res.data.taskEntityList
          this.commissionList = res.data.commissionList
          this.rankList = res.data.rankList
        }
      })
    },

    openLogDialog(logType) {
      this.logType = logType
      this.showLogDialog = true
    },

    handleUpdate(item) {
      this.updateForm = {
        old: {
          ...item,
        },
        ...item,
      }
      this.showUpdateDialog = true
    },

    addLog(logEntityList) {
      addLogList({logEntityList}).then(res => {
        if (res.code === 0) {
          //
        }
      })
    },

    handleCloseDialog() {
      this.showUpdateDialog = false
      this.updateForm = {}
    },

    save() {
      let isChange = false
      for (const key in this.updateForm.old) {
        if (this.updateForm.old[key] != this.updateForm[key]) {
          isChange = true
          break
        }
      }

      if (!isChange) {
        this.handleCloseDialog()
        return
      }

      const logList = []

      if (this.updateForm.taskType <= 3) {
        if (!this.updateForm.taskCount) {
          this.$message.error('请输入邀请人数')
          retrun
        }
        if (!this.updateForm.taskMoney) {
          this.$message.error('请输入奖励金额')
          retrun
        }
        if (this.updateForm.old.taskCount !== this.updateForm.taskCount) {
          logList.push({
            logType: this.updateForm.taskType,
            account: this.userInfo.account,
            userName: this.userInfo.name,
            operateType: '邀请人',
            beforeModify: this.updateForm.old.taskCount,
            afterModify: this.updateForm.taskCount,
          })
        }

        if (this.updateForm.old.taskMoney !== this.updateForm.taskMoney) {
          logList.push({
            logType: this.updateForm.taskType,
            account: this.userInfo.account,
            userName: this.userInfo.name,
            operateType: '任务奖励',
            beforeModify: this.updateForm.old.taskMoney,
            afterModify: this.updateForm.taskMoney,
          })
        }
      }

      if (this.updateForm.taskType === 3) {
        if (!this.updateForm.specialTaskPartnerCount) {
          this.$message.error('请输入邀请第几位合伙人')
          retrun
        }
        if (!this.updateForm.specialTaskCustomerCount) {
          this.$message.error('请输入带来几个有效客户')
          retrun
        }

        if (this.updateForm.old.specialTaskPartnerCount !== this.updateForm.specialTaskPartnerCount) {
          logList.push({
            logType: this.updateForm.taskType,
            account: this.userInfo.account,
            userName: this.userInfo.name,
            operateType: '邀请第几位合伙人',
            beforeModify: this.updateForm.old.specialTaskPartnerCount,
            afterModify: this.updateForm.specialTaskPartnerCount,
          })
        }

        if (this.updateForm.old.specialTaskCustomerCount !== this.updateForm.specialTaskCustomerCount) {
          logList.push({
            logType: this.updateForm.taskType,
            account: this.userInfo.account,
            userName: this.userInfo.name,
            operateType: '带来几个有效客户',
            beforeModify: this.updateForm.old.specialTaskCustomerCount,
            afterModify: this.updateForm.specialTaskCustomerCount,
          })
        }
      }

      if (this.updateForm.taskType === 4) {
        if (!this.updateForm.paramValue) {
          this.$message.error('请输入抽佣金额')
          retrun
        }

        if (this.updateForm.old.paramValue != this.updateForm.paramValue) {
          this.updateForm.commissionAmount = this.updateForm.paramValue
          logList.push({
            logType: this.updateForm.taskType,
            account: this.userInfo.account,
            userName: this.userInfo.name,
            operateType: '抽佣金额',
            beforeModify: this.updateForm.old.paramValue,
            afterModify: this.updateForm.paramValue,
          })
        }
      }

      if (this.updateForm.taskType === 5) {
        this.updateForm.rankMethod = this.updateForm.paramValue
        if (this.updateForm.old.paramValue !== this.updateForm.paramValue) {
          logList.push({
            logType: this.updateForm.taskType,
            account: this.userInfo.account,
            userName: this.userInfo.name,
            operateType: '排行榜更新方式',
            beforeModify: this.updateForm.old.paramValue,
            afterModify: this.updateForm.paramValue,
          })
        }
      }

      updateActivityTask(this.updateForm).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.selectActivityTask()
          this.handleCloseDialog()
          this.addLog(logList)
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
.title-wrap {
  display: flex;
  align-items: center;
  .title {
    width: 150px;
    font-family: PingFang SC;
    font-size: 25px;
    font-weight: 500;
    color: #3D3D3D;
  }
  .line {
    flex: 1;
    height: 1px;
    background: #D8D8D8;
  }
}
.task-wrap {
  padding: 20px 20px 20px 170px;
  display: flex;
  flex-wrap: wrap;
  .task {
    margin-right: 30px;
    margin-bottom: 20px;
    width: 367px;
    border-radius: 4px;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    padding: 12px;
    position: relative;
    .task-title {
      height: 24px;
      font-family: PingFang SC;
      font-size: 16px;
      line-height: 24px;
      color: #1D2129;
      margin-bottom: 16px;
    }
    .items {
      .item {
        margin-top: 8px;
        display: flex;
        font-size: 14px;
        .item-label {
          color: #4E5969;
        }
        .item-content {
          color: #1D2129;
        }
      }
    }
    .desc {
      margin-top: 10px;
      padding: 10px 0 30px 0;
      font-family: PingFang SC;
      font-size: 12px;
      line-height: 22px;
      color: #4E5969;
      border-top: 1px solid #D8D8D8;
    }
    .btn-group {
      position: absolute;
      right: 0;
      bottom: 12px;
      display: flex;
      .link-btn {
        margin-right: 16px;
        font-family: PingFang SC;
        font-size: 14px;
        color: #3446AA;
        cursor: pointer;
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
    width: 70px;
    margin-right: 16px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #1D2129;
    text-align: right;
  }
  .item-label1 {
    width: 100%;
    display: flex;
    align-items: center;
  }
}

.update-dialog-line {
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background: #D8D8D8;
}
</style>