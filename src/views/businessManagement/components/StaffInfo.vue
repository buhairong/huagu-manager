<template>
  <div style="width: 100%">
    <div class="create-btn-wrap">
        <create-button 
            text="添加员工"
            @create="openAddUserDialog"
        />
    </div>

    <el-table 
      :data="detail.userRespVos"
      :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
    >
      <el-table-column
          label="姓名"
          prop="name"
      >
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
            <div v-for="(item, index) in scope.row.userRoleList" :key="index">
              {{ item.roleName }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="110"
          align="center"
      >
        <template slot-scope="scope">
          <div class="table-btn" @click="openEditUserDialog(scope.row)">编辑</div>
          <div class="table-btn" @click="delUserDialog(scope.row)">删除</div>
        </template>
      </el-table-column>
    </el-table>

    <AddUserDialog 
      :show.sync="showAddUserDialog"
      :companyId="companyId"
      :companyType="type"
      :roleList="roleList"
      @update="update"
    />

    <EditUserDialog 
      v-if="showEditUserDialog"
      :show.sync="showEditUserDialog"
      :companyId="companyId"
      :companyType="type"
      :roleList="roleList"
      :userInfo="userInfo"
      @update="update"
    />

    <TransferenceDialog 
      v-if="showTransferenceDialog"
      :show.sync="showTransferenceDialog"
      :companyId="companyId"
      :companyType="type"
      :userList="detail.userRespVos"
      :userInfo="userInfo"
      @update="update"
    />
  </div>
</template>

<script>
import { selectRole, deleteCompanyMember } from '@/api/merchant/merchant'
import AddUserDialog from './AddUserDialog.vue'
import EditUserDialog from './EditUserDialog.vue'
import TransferenceDialog from './TransferenceDialog.vue'

export default {
  components: {
    AddUserDialog,
    EditUserDialog,
    TransferenceDialog,
  },

  props: {
    detail: {
      type: Object,
      required: true,
    },

    companyId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      userInfo: {},
      roleList: [],
      showAddUserDialog: false,
      showEditUserDialog: false,
      showTransferenceDialog: false,
    }
  },

  mounted() {
    this.selectRole()
  },

  methods: {
    selectRole() {
      const data = {
        companyType: this.type
      }

      selectRole(data).then(res => {
        if (res.code === 0) {
          this.roleList = res.data
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
      if (row.userRoleList.some(item => item.level === 1)) {
        this.userInfo = row
        this.showTransferenceDialog = true
      } else {
        this.$confirm(`确定要删除员工 ${row.name} 吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          const data = {
            companyId: this.companyId,
            companyType: this.type,
            userId: row.id,
          }
          deleteCompanyMember(data).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.update()
            } else {
              this.$message.error('保存失败')
            }
          }).catch(() => {
            this.$message.error('保存失败')
          })
        })
      }
    },

    update() {
      this.$emit('update')
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
</style>
