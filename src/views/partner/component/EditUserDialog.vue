<template>
  <el-dialog
    title="编辑成员"
    :visible.sync="show"
    width="480px"
    :before-close="handleCloseDialog"
  >
    <div class="item">
        <div class="item-label">手机号</div>
        <div class="item-content">
          {{ userInfo.mobile }}
        </div>
    </div>

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
              :selectValue.sync="roleId"
              :options="roleList"
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
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
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
      name: '',
      roleId: '',
    }
  },

  mounted() {
    this.name = this.userInfo.name
    this.roleId = this.userInfo.role
  },

  methods: {
    handleCloseDialog() {
      this.$emit('update:show', false)
    },

    editUser() {
      const name = this.name.trim()
      if (!name) {
        this.$message.error('请输入姓名')
        return
      }

      if (!this.roleId) {
        this.$message.error('请选择角色')
        return
      }

      const data = {
        ...this.userInfo,
        name,
        role: this.roleId,
      }

      this.$emit('update', data)
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