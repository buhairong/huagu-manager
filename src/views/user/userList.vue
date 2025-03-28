<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item class="subscription-plan">员工管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div>
            <div class="title">筛选</div>

            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                      <div class="label">姓名账号</div>
                      <c-input 
                        :inputValue.sync="search.key"
                        placeholder="请输入姓名或账号"
                      />
                    </div>

                    <div class="search-item">
                      <div class="label">成员角色</div>
                      <c-select
                        :selectValue.sync="search.roleId"
                        :options="roleList"
                        placeholder="请选择角色"
                        labelKey="roleName"
                        valueKey="id"
                      />
                    </div>

                    <div class="search-item">
                      <div class="label">在职状态</div>
                      <c-select
                        :selectValue.sync="search.status"
                        :options="STATUS_LIST"
                        placeholder="请选择在职状态"
                      />
                    </div>

                    <search-button class="search-btn" @search="searchList"/>

                    <reset-button class="search-btn reset-btn" @reset="reset"/>
                </div>
            </div>
        </div>

        <div class="create-btn-wrap" v-if="addable">
            <create-button 
                text="添加成员"
                @create="openAddUserDialog"
            />
        </div>

        <el-table 
          :data="userList"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            label="姓名"
            prop="name"
          >
          </el-table-column>

          <el-table-column
            label="角色"
          >
            <template slot-scope="scope">
              <div>
                <div v-for="(item, index) in scope.row.userRoleList" :key="index">
                  {{ item.roleName }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="账号"
            prop="account"
          >
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="mobile"
          >
          </el-table-column>

          <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
              <div class="table-status-wrap">
                <div class="icon" :class="{'active-icon': scope.row.status === 1}"></div>
                <div class="status">{{ scope.row.status === 1 ? '在职' : '离职' }}</div>
              </div>
            </template>
          </el-table-column>
         
          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
            <template slot-scope="scope">
              <div class="table-btn" @click="openTransferenceRoleDialog(scope.row)" v-if="userInfo.userRoleList.some(item => item.level === 1) && scope.row.account === userInfo.account">转让</div>
              <template v-if="editable(scope.row)">
                <div class="table-btn" @click="openEditUserDialog(scope.row)">编辑</div>
                <div class="table-btn" @click="delUserDialog(scope.row)">删除</div>
              </template>
            </template>
          </el-table-column>
        </el-table>

        <pagination 
          :total="total"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>

      <el-dialog
        title="添加成员"
        :visible.sync="showAddUserDialog"
        width="480px"
      >
        <div class="item">
            <div class="item-label">姓名：</div>
            <div class="item-content">
              <c-input 
                :inputValue.sync="addForm.name"
                placeholder="请输入姓名"
                style="width: 200px"
              />
            </div>
        </div>

        <div class="item">
            <div class="item-label">角色：</div>
            <div class="item-content">
                <c-select
                  :selectValue.sync="addForm.roleIdList"
                  :options="addRoleList"
                  :showAllValue="false"
                  labelKey="roleName"
                  valueKey="id"
                  multiple
                  style="width: 200px"
                />
            </div>
        </div>

        <div class="item">
            <div class="item-label">账号：</div>
            <div class="item-content">
              <c-input 
                :inputValue.sync="addForm.account"
                placeholder="请输入账号"
                style="width: 200px"
              />
            </div>
        </div>

        <div class="item">
            <div class="item-label">密码：</div>
            <div class="item-content">
              <c-input 
                :inputValue.sync="addForm.password"
                placeholder="请输入密码"
                show-password
                style="width: 200px"
              />
            </div>
        </div>

        <div class="item">
            <div class="item-label">手机号：</div>
            <div class="item-content">
              <c-input 
                :inputValue.sync="addForm.mobile"
                placeholder="请输入手机号"
                style="width: 200px"
              />
            </div>
        </div>

        <span slot="footer" class="dialog-footer">
            <div class="dialog-btn-wrap">
                <div class="btn" @click="handleCloseAddUserDialog">取消</div>
                <div class="btn save-btn" @click="addUser">确认添加</div>
            </div>
        </span>
    </el-dialog>

    <el-dialog
      title="编辑成员"
      :visible.sync="showEditUserDialog"
      width="480px"
    >
      <div class="item">
        <div class="item">
          <div class="item-label">姓名：</div>
          <div class="item-content">{{ currentRow.name }}</div>
        </div>
        <div class="item">
          <div class="item-label">账号：</div>
          <div class="item-content">{{ currentRow.account }}</div>
        </div>
      </div>

      <div class="item">
          <div class="item-label">角色：</div>
          <div class="item-content">
              <c-select
                :selectValue.sync="updateForm.roleIdList"
                :options="addRoleList"
                :showAllValue="false"
                multiple
                labelKey="roleName"
                valueKey="id"
                style="width: 200px"
              />
          </div>
      </div>

      <div class="item">
          <div class="item-label">状态：</div>
          <div class="item-content">
              <c-select
                :selectValue.sync="updateForm.status"
                :options="STATUS_LIST"
                :showAllValue="false"
                style="width: 200px"
              />
          </div>
      </div>

      <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
              <div class="btn" @click="handleCloseEditUserDialog">取消</div>
              <div class="btn save-btn" @click="editUser">确认编辑</div>
          </div>
      </span>
    </el-dialog>

    <el-dialog
      title="角色转让"
      :visible.sync="showTransferenceRoleDialog"
      width="480px"
    >
      <div class="item">
          <div class="item-label item-label1">将超级管理员转让给：</div>
          <div class="item-content">
              <c-select
                :selectValue.sync="transferenceForm.userId"
                :options="allUserList"
                :showAllValue="false"
                filterable
                labelKey="name"
                valueKey="id"
                style="width: 200px"
              />
          </div>
      </div>

      <div class="item">
          <div class="item-label item-label1">请选择转让后您的角色：</div>
          <div class="item-content">
              <c-select
                :selectValue.sync="transferenceForm.roleId"
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
              <div class="btn" @click="handleCloseTransferenceRoleDialog">取消</div>
              <div class="btn save-btn" @click="transference">确认转让</div>
          </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getUserList, addUser, editUser, transferMananger, deleteUser } from '@/api/user/user'
import { mapState } from 'vuex'
import { validPhoneNum } from '@/utils/validate'

export default {
  name: 'UserList',

  data() {
    return {
      search: {
        key: '',
        roleId: '',
        status: '',
        page: 1,
        limit: 10,
      },
      roleList: [],
      addRoleList: [],
      STATUS_LIST: [
        { value: 1, label: '在职' },
        { value: 2, label: '离职' },
      ],
      userList: [],
      allUserList: [],
      total: 0,
      showAddUserDialog: false,
      showEditUserDialog: false,
      showTransferenceRoleDialog: false,
      currentRow: {},
      updateForm: {
        id: null,
        status: '',
        roleIdList: [],
      },
      addForm: {
        name: '',
        roleIdList: [],
        account: '',
        password: '',
        mobile: '',
      },
      transferenceForm: {
        roleId: [],
        userId: '',
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),
    // 1:超级管理员 2.销售负责人 3.渠道负责人 4.一般员工 5.销售 6.渠道
    addable() {
      return this.userInfo.userRoleList.some(item => item.level === 1 || item.level === 2 || item.level === 3)
    },
  },

  mounted() {
    this.searchList()
    this.getRoleList()
    this.searchList1()
  },

  methods: {
    getRoleList() {
      getRoleList().then(res => {
        if (res.code === 0) {
          this.roleList = res.data
          if (this.userInfo.userRoleList.some(item => item.level === 1)) {
            this.addRoleList = res.data
          }else if (this.userInfo.userRoleList.some(item => item.level === 2)) {
            this.addRoleList = res.data.filter(item => item.level === 5)
          }else if (this.userInfo.userRoleList.some(item => item.level === 3)) {
            this.addRoleList = res.data.filter(item => item.level === 6)
          }
        }
      })
    },

    searchList() {
      getUserList(this.search).then(res => {
        if (res.code === 0) {
          this.userList = res.data.records
          this.total = res.data.total
        }
      })
    },

    searchList1() {
      getUserList({
        page: 1,
        limit: 1000
      }).then(res => {
        if (res.code === 0) {
          this.allUserList = res.data.records
        }
      })
    },

    reset() {
      this.search.key = ''
      this.search.roleId = ''
      this.search.status = ''
      this.search.page = 1
      this.searchList()
    },

    openAddUserDialog() {
      this.showAddUserDialog = true
      setTimeout(() => {
        this.addForm.account = ''
        this.addForm.password = ''
      }, 1000)
    },

    handleCloseAddUserDialog() {
      this.showAddUserDialog = false
      this.addForm.name = ''
      this.addForm.roleIdList = []
      this.addForm.account = ''
      this.addForm.password = ''
      this.addForm.mobile = ''
    },

    addUser() {
      if (!this.addForm.name.trim()) {
        this.$message.error('请输入姓名')
        return
      }

      if (this.addForm.roleIdList.length === 0) {
        this.$message.error('请选择角色')
        return
      }

      if (!this.addForm.account.trim()) {
        this.$message.error('请输入账号')
        return
      }

      if (!this.addForm.password.trim()) {
        this.$message.error('请输入密码')
        return
      }

      const mobile = this.addForm.mobile.trim()

      if (!mobile) {
        this.$message.error('请输入手机号')
        return
      }

      if (!validPhoneNum(mobile)) {
        this.$message.error('请输入正确的手机号')
        return
      }

      addUser(this.addForm).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.handleCloseAddUserDialog()
          this.reset()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    openEditUserDialog(row) {
      this.currentRow = row
      this.updateForm.id = row.id
      this.updateForm.status = row.status
      this.updateForm.roleIdList = row.userRoleList.map(item => item.roleId)
      this.showEditUserDialog = true
    },

    handleCloseEditUserDialog() {
      this.showEditUserDialog = false
      this.currentRow = {}
      this.updateForm.id = null
      this.updateForm.status = ''
      this.updateForm.roleIdList = []
    },

    editUser() {
      if (this.updateForm.roleIdList.length === 0) {
        this.$message.error('请选择角色')
        return
      }

      if (!this.updateForm.status) {
        this.$message.error('请选择状态')
        return
      }

      editUser(this.updateForm).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.handleCloseEditUserDialog()
          this.searchList()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    openTransferenceRoleDialog(row) {
      this.currentRow = row
      this.showTransferenceRoleDialog = true
    },

    handleCloseTransferenceRoleDialog() {
      this.showTransferenceRoleDialog = false
      this.currentRow = {}
      this.transferenceForm.userId = ''
      this.transferenceForm.roleId = []
    },

    transference() {
      if (!this.transferenceForm.userId) {
        this.$message.error('请选择用户')
        return
      }

      if (this.transferenceForm.roleId.length === 0) {
        this.$message.error('请选择角色')
        return
      }

      transferMananger(this.transferenceForm).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.$store.commit('romoveUserInfo')
          this.$router.push({
            path: "/login",
          })
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    delUserDialog(row) {
      this.$confirm(`确定要删除用户 ${row.name} 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          const data = [row.id]
          deleteUser(data).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.searchList()
            } else {
              this.$message.error('保存失败')
            }
          }).catch(() => {
            this.$message.error('保存失败')
          })
        })
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.searchList()
    },

     // 1:超级管理员 2.销售负责人 3.渠道负责人 4.一般员工 5.销售 6.渠道
    editable(row) {
      if (this.userInfo.userRoleList.some(item => item.level === 1)) {
        return true
      }

      if (this.userInfo.userRoleList.some(item => item.level === 2) && row.userRoleList.some(item => item.level === 5)) {
        return true
      }

      if (this.userInfo.userRoleList.some(item => item.level === 3) && row.userRoleList.some(item => item.level === 6)) {
        return true
      }

      return false
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

.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.table-status-wrap {
  display: flex;
  align-items: center;
  .icon {
    margin-right: 8px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #A4AEBB;
  }
  .active-icon {
    background: #00A870;
  }
}

.item {
    margin-bottom: 16px;
    display: flex;
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
      width: 160px;
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