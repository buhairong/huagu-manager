<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">IRR</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div class="irr-list">
            <div class="irr" style="margin-right: 100px;">
              <div class="title">全新车</div>
              <div class="irr-rate">{{newCarIRR.periodRate ? `${newCarIRR.periodRate}%` : '暂无设置'}}</div>
              <div class="btn-group">
                <div style="margin-right: 50px;" @click="openDialog(1)">设置IRR</div>
                <div @click="goHistory(1)">查看历史</div>
              </div>
            </div>
            <div class="irr">
              <div class="title">二手车</div>
              <div class="irr-rate">{{oldCarIRR.periodRate ? `${oldCarIRR.periodRate}%` : '暂无设置'}}</div>
              <div class="btn-group">
                <div style="margin-right: 50px;" @click="openDialog(2)">设置IRR</div>
                <div @click="goHistory(2)">查看历史</div>
              </div>
            </div>
          </div>
      </div>

      <el-dialog
        :title="`设置${carType === 1 ? '全新车' : '二手车'}IRR`"
        :visible.sync="showDialog"
        width="480px"
        :before-close="handleClose"
      >
        <div class="wrap">
          <div class="input-item">
            <c-input-number 
              :inputValue.sync="periodRate"
              :placeholder="`请输入${carType === 1 ? '全新车' : '二手车'}IRR`"
              :precision="2"
            >
            </c-input-number>%
          </div>
            
          <div class="btn-group1">
              <el-button class="btn" @click="handleClose">取消</el-button>
              <el-button 
                  type="primary" 
                  class="btn save-btn"
                  @click="update"
              >保存</el-button>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { selectLastIRRRecord, updateIRR } from '@/api/system/IRR'

export default {
  name: 'IRR',

  components: {
    
  },

  data() {
    return {
      newCarIRR: {},
      oldCarIRR: {},
      periodRate: undefined,
      carType: null,
      showDialog: false,
    }
  },

  mounted() {
    this.selectLastIRRRecord()
  },

  methods: {
    selectLastIRRRecord() {
      selectLastIRRRecord().then(res => {
        if (res.code === 0 && res.data && res.data.length) {
          this.newCarIRR = res.data.filter(item => item.carType === 1)[0] || {}
          this.oldCarIRR = res.data.filter(item => item.carType === 2)[0] || {}
        }
      })
    },

    openDialog(carType) {
      this.carType = carType
      this.showDialog = true
    },

    handleClose() {
      this.showDialog = false
      this.carType = null
      this.periodRate = undefined
    },

    update() {
      const data = {
        carType: this.carType,
        periodRate: this.periodRate,
      }

      updateIRR(data).then(res => {
        if (res.code === 0) {
          this.$message.success('保存成功')
          this.selectLastIRRRecord()
          this.handleClose()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },

    goHistory(carType) {
      this.$router.push({
          path: '/system/IRR/history',
          query: {
              carType
          },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .irr-list {
    display: flex;
    .irr {
      width: 305px;
      height: 353px;
      border-radius: 12px;
      background: #FFFFFF;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
      padding: 40px 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 25px;
        color: #727171;
      }
      .irr-rate {
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #F01C1C;
      }
      .btn-group {
        display: flex;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 22px;
        color: #3446AA;
        div {
          cursor: pointer;
        }
      }
    }
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-item {
    display: flex;
    align-items: center;
  }
}

.btn-group1 {
    margin-top: 50px;
    display: flex;
    .btn {
        width: 91px;
        height: 32px;
        border-radius: 2px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        color: #1D2129;
        cursor: default;
    }
    .save-btn {
        margin-left: 20px;
        background: #3446AA;
        color: #FFFFFF;
    }
}
</style>