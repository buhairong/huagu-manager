<template>
  <div style="width: 100%">
    <div class="create-btn-wrap">
        <create-button 
            text="添加员工"
            @create="openAddUserDialog"
        />
    </div>

    <el-table 
      :data="userList"
      :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
    >
      <el-table-column
          label="姓名"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.row.name }}
            <span style="padding-left: 8px" :class="{'red': scope.row.status == 2}">{{ statusObj[scope.row.status] || '' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="联系方式"
          prop="mobile"
      >
      </el-table-column>
      <el-table-column
          label="员工角色"
      >
        <template slot-scope="scope">
          <div>
            {{ partnerCompanyRoleStatus[scope.row.role] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="110"
          align="center"
      >
        <template slot-scope="scope">
          <div class="table-btn" @click="inviteAgain(scope.row)" v-if="scope.row.status == 2">重新邀请</div>
          <div class="table-btn" @click="openEditUserDialog(scope.row)" v-else>编辑</div>
          <div class="table-btn" @click="delUserDialog(scope.row)">删除</div>
        </template>
      </el-table-column>
    </el-table>

    <AddUserDialog 
      v-if="showAddUserDialog"
      :show.sync="showAddUserDialog"
      :roleList="partnerCompanyRoleList"
      @add="add"
    />

    <EditUserDialog 
      v-if="showEditUserDialog"
      :show.sync="showEditUserDialog"
      :roleList="partnerCompanyRoleList"
      :userInfo="userInfo"
      @update="update"
    />
  </div>
</template>

<script>
import { getPartnerCompanyUserList, addPartnerCompanyUser, updatePartnerCompanyUser, deletePartnerCompanyUser, invitePartnerCompanyUser } from '@/api/partner/partner'
import { partnerCompanyRoleList, partnerCompanyRoleStatus } from '@/utils/constant'
import AddUserDialog from './AddUserDialog.vue'
import EditUserDialog from './EditUserDialog.vue'

export default {
  components: {
    AddUserDialog,
    EditUserDialog,
  },

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      partnerCompanyRoleList,
      partnerCompanyRoleStatus,
      userInfo: {},
      showAddUserDialog: false,
      showEditUserDialog: false,
      userList: [],
      statusObj: {
				0: '邀请中',
				2: '拒绝邀请',
			}
    }
  },

  mounted() {
    this.getPartnerCompanyUserList()
  },

  methods: {
    getPartnerCompanyUserList() {
      const data = {
        partnerCompanyId: this.detail.id,
        page: 1,
        limit: 1000,
      }

      getPartnerCompanyUserList(data).then(res => {
        if (res.code === 0) {
          this.userList = res.data.records
        }
      })
    },

    openAddUserDialog() {
      this.showAddUserDialog = true
    },

    openEditUserDialog(row) {
      this.userInfo = row
      this.showEditUserDialog = true
    },

    delUserDialog(row) {
      this.$confirm(`确定要删除员工 ${row.name} 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        deletePartnerCompanyUser(row).then(res => {
          if (res.code === 0) {
            this.$message.success('保存成功')
            this.getPartnerCompanyUserList()
          } else {
            this.$message.error('保存失败')
          }
        }).catch(() => {
          this.$message.error('保存失败')
        })
      })
    },

    add(data) {
      const params = {
        ...data,
        partnerCompanyId: this.detail.id,
      }
      addPartnerCompanyUser(params).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getPartnerCompanyUserList()
          this.showAddUserDialog = false
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    update(data) {
      updatePartnerCompanyUser(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.getPartnerCompanyUserList()
          this.showEditUserDialog = false
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    inviteAgain(row) {
			const params = {
				userId: row.userId,
				partnerCompanyId: row.partnerCompanyId,
				status: 0,
			}

      invitePartnerCompanyUser(params).then(res => {
        if (res.code === 0) {
          this.$message.success('已重新邀请')
          this.getPartnerCompanyUserList()
        }
      })
		},
  },
}
</script>

<style lang="less" scoped>
.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.red {
  color: #FF0000;
}
</style>
