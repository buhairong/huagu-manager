<template>
  <el-table 
    :data="detail.decorateList"
    :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
  >
    <el-table-column
        label="精品/装潢名称"
        prop="decorateName"
    >
    </el-table-column>
    <el-table-column
        label="设置员工"
        prop="createName"
    >
    </el-table-column>
    <el-table-column
        label="操作"
        width="110"
        align="center"
    >
        <template slot-scope="scope">
            <div class="table-btn" @click="del(scope.row)">删除</div>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteDecorate } from '@/api/merchant/merchant'

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      
    }
  },

  methods: {
    del(row) {
        this.$confirm(`确定要删除 ${row.decorateName} 吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          const data = {
            id: row.id
          }

          deleteDecorate(data).then(res => {
              if (res.code === 0) {
                  this.$message.success('删除成功')
                  this.$emit('update')
              } else {
                  this.$message.error('删除失败')
              }
          }).catch(err => {
              this.$message.error('删除失败')
          })
        })
    },
  }
}
</script>

<style lang="less" scoped>
</style>
