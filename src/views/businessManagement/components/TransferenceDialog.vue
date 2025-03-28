<template>
  <el-dialog
    title="角色转让"
    :visible.sync="show"
    width="480px"
    :before-close="handleCloseDialog"
  >
    <div class="item">
        <div class="item-label item-label1">将超级管理员转让给：</div>
        <div class="item-content">
            <c-select
              :selectValue.sync="userId"
              :options="userList"
              :showAllValue="false"
              filterable
              labelKey="name"
              valueKey="id"
              style="width: 200px"
            />
        </div>
    </div>

    <div class="item" v-if="companyType == 0">
        <div class="item-label item-label1">请选择转让后您的角色：</div>
        <div class="item-content">
            <c-select
              :selectValue.sync="roleIdList"
              :options="roleList"
              :showAllValue="false"
              multiple
              labelKey="roleName"
              valueKey="id"
              style="width: 200px"
            />
        </div>
    </div>

    <span slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
            <div class="btn" @click="handleCloseDialog">取消</div>
            <div class="btn save-btn" @click="transference">确认转让</div>
        </div>
    </span>
  </el-dialog>
</template>

<script>
import { deleteCompanyMember } from '@/api/merchant/merchant'

export default {
  name: 'TransferenceDialog',

  props: {
    show: {
      type: Boolean,
      required: true,
    },

    companyId: {
      type: [String, Number],
      default: ''
    },

    companyType: {
      type: [String, Number],
      default: 0,
    },

    userList: {
      type: Array,
      default: () => [],
    },

    roleList: {
      type: Array,
      default: () => [],
    },

    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      STATUS_LIST: [
        { value: 1, label: '在职' },
        { value: 2, label: '离职' },
      ],
      roleIdList: [],
      userId: '',
    }
  },

  mounted() {
    
  },

  methods: {
    handleCloseDialog() {
      this.$emit('update:show', false)
    },

    transference() {
      if (!this.userId) {
        this.$message.error('请选择要转让的员工')
        return
      }
     
      this.$confirm(`确定要转让超级管理员吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        const data = {
          adminUserId: this.userId,
          companyId: this.companyId,
          companyType: this.companyType,
          userId: this.userInfo.id,
        }
        deleteCompanyMember(data).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.handleCloseDialog()
            this.$emit('update')
          } else {
            this.$message.error('保存失败')
          }
        }).catch(() => {
          this.$message.error('保存失败')
        })
      })

    },
  },
}
</script>

<style lang="less" scoped>
.item {
    margin-top: 16px;
    display: flex;
    height: 32px;
    line-height: 32px;
    .item-label {
      width: 140px;
      margin-right: 16px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #1D2129;
      text-align: right;
    }
}

.dialog-btn-wrap {
    display: flex;
    justify-content: flex-end;
    .btn {
        width: 91px;
        height: 32px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #1D2129;
        z-index: 0;
        cursor: default;
    }
    .save-btn {
        margin-left: 8px;
        background: #3446AA;
        color: #FFFFFF;
    }
}
</style>