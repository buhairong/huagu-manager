<template>
  <el-dialog
      title="添加成员"
      :visible.sync="show"
      width="480px"
      :before-close="handleCloseDialog"
    >
      <div class="item">
          <div class="item-label">姓名：</div>
          <div class="item-content">
            <c-input 
              :inputValue.sync="name"
              placeholder="请输入姓名"
              style="width: 200px"
            />
          </div>
      </div>

      <div class="item">
          <div class="item-label">角色：</div>
          <div class="item-content">
              <c-select
                :selectValue.sync="roleIdList"
                :options="roleList"
                :showAllValue="false"
                labelKey="roleName"
                valueKey="id"
                multiple
                style="width: 200px"
              />
          </div>
      </div>

      <div class="item">
          <div class="item-label">手机号：</div>
          <div class="item-content">
            <c-input 
              :inputValue.sync="mobile"
              placeholder="请输入手机号"
              style="width: 200px"
            />
          </div>
      </div>

      <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
              <div class="btn" @click="handleCloseDialog">取消</div>
              <div class="btn save-btn" @click="addUser">确认添加</div>
          </div>
      </span>
  </el-dialog>
</template>

<script>
import { addCompanyMember } from '@/api/merchant/merchant'
import { validPhoneNum } from '@/utils/validate'

export default {
  name: 'AddUserDialog',

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
  },

  data() {
    return {
      name: '',
      roleIdList: [],
      mobile: '',
    }
  },

  mounted() {
    
  },

  methods: {
    handleCloseDialog() {
      this.$emit('update:show', false)
    },

    addUser() {
      const name = this.name.trim()
      const mobile = this.mobile.trim()
      if (!name) {
        this.$message.error('请输入姓名')
        return
      }

      if (this.roleIdList.length === 0) {
        this.$message.error('请选择角色')
        return
      }

      if (this.companyType) {
        if (!mobile) {
          this.$message.error('请输入手机号')
          return
        }

        if (!validPhoneNum(mobile)) {
          this.$message.error('请输入正确的手机号')
          return
        }
      }

      const data = {
        companyId: this.companyId,
        companyType: this.companyType,
        name,
        roleList: this.roleIdList,
        mobile,
      }

      addCompanyMember(data).then(res => {
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