<template>
  <el-dialog
    title="编辑成员"
    :visible.sync="show"
    width="480px"
    :before-close="handleCloseDialog"
  >
    <div class="item">
        <div class="item-label">{{ companyId ? '手机号' : '账号' }}：</div>
        <div class="item-content">
          {{ companyId ? userInfo.mobile : userInfo.account }}
        </div>
    </div>

    <div class="item">
        <div class="item-label">姓名：</div>
        <div class="item-content">
          <c-input 
            :inputValue.sync="userInfo.name"
            placeholder="请输入姓名"
            style="width: 200px"
          />
        </div>
    </div>

    <div class="item" v-if="!isManager">
        <div class="item-label">角色：</div>
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

    <div class="item" v-if="!companyId">
        <div class="item-label">状态：</div>
        <div class="item-content">
            <c-select
              :selectValue.sync="userInfo.status"
              :options="STATUS_LIST"
              :showAllValue="false"
              style="width: 200px"
            />
        </div>
    </div>

    <span slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
            <div class="btn" @click="handleCloseDialog">取消</div>
            <div class="btn save-btn" @click="editUser">确认编辑</div>
        </div>
    </span>
  </el-dialog>
</template>

<script>
import { updateCompanyMember } from '@/api/merchant/merchant'

export default {
  name: 'EditUserDialog',

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
      isManager: false,
    }
  },

  mounted() {
    this.isManager = this.userInfo.userRoleList.some(item => item.level === 1)
    this.roleIdList = this.userInfo.userRoleList.map(item => item.roleId)
  },

  methods: {
    handleCloseDialog() {
      this.$emit('update:show', false)
    },

    editUser() {
      const name = this.userInfo.name.trim()
      if (!name) {
        this.$message.error('请输入姓名')
        return
      }

      if (this.roleIdList.length === 0) {
        this.$message.error('请选择角色')
        return
      }

      const data = {
        companyId: this.companyId,
        companyType: this.companyType,
        name,
        roleList: this.roleIdList,
        userId: this.userInfo.id,
      }

      updateCompanyMember(data).then(res => {
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
    },


  },
}
</script>

<style lang="less" scoped>
.item {
    margin-top: 16px;
    display: flex;
    line-height: 32px;
    .item-label {
      width: 120px;
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