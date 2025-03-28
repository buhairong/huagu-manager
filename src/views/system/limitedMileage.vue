<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">限定里程</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div class="title">设置限定里程</div>

          <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
          >
            <el-table-column
                label="价格区间"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.description || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="限定里程数"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.limitMileage}}公里</div>
                </template>
            </el-table-column>

            <el-table-column
                label="超出里程费用"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.overMileageFee}}元/公里</div>
                </template>
            </el-table-column>

            <el-table-column
                label="最后修改时间"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.updateTime}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div class="table-btn" @click="edit(scope.row)">编辑</div>
                </template>
            </el-table-column>
        </el-table>
      </div>

      <el-dialog
          :title="`${currentRow.description}限定里程`"
          :visible.sync="showDialog"
          width="380px"
          :before-close="handleClose"
      >
          <div class="wrap">
            <el-form ref="form" :model="currentRow" :rules="rules">
              <el-form-item prop="limitMileage">
                <c-input-number 
                  :inputValue.sync="currentRow.limitMileage"
                  placeholder="请输入限定里程"
                >
                </c-input-number>公里
              </el-form-item>

              <el-form-item prop="overMileageFee">
                <c-input-number 
                  :inputValue.sync="currentRow.overMileageFee"
                  placeholder="请输入超出里程费用"
                >
                </c-input-number>元
              </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
              <div class="dialog-btn-wrap">
                  <div class="btn" @click="handleClose">取消</div>
                  <div class="btn save-btn" @click="save">保存</div>
              </div>
            </span>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import { selectLimitMileageRecord, updateLimitMileageRecord } from '@/api/system/limitedMileage'

export default {
  name: 'limitedMileage',

  components: {
    
  },

  data() {
    return {
      list: [],
      showDialog: false,
      currentRow: {},
      rules: {
        limitMileage: [
            { required: true, message: '请输入限定里程', trigger: 'blur' }
        ],
        overMileageFee: [
            { required: true, message: '请输入超出里程费用', trigger: 'blur' }
        ],
      },
    }
  },

  mounted() {
    this.selectLimitMileageRecord()
  },

  methods: {
    selectLimitMileageRecord() {
      selectLimitMileageRecord().then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
      })
    },
        
    edit(row) {
      this.currentRow = {
        ...row
      }

      this.showDialog = true
    },

    handleClose() {
      this.showDialog = false
      this.currentRow = {}
    },

    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateLimitMileageRecord(this.currentRow).then(res => {
              if (res.code === 0) {
                this.$message.success('保存成功')
                this.handleClose()
                this.selectLimitMileageRecord()
              } else {
                  this.$message.error('保存失败')
              }
          }).catch(err => {
              this.$message.error('保存失败')
          })
        }
      })
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

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>