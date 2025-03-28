<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>全民合伙人</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">全民合伙人详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content" v-if="partnerApplyInfo">
        <PersonInfo  :detail="partnerApplyInfo" />

        <div class="btn-group" v-if="partnerApplyInfo.status === 0">
          <button class="page-btn" @click="openPassDialog">申请通过</button>
          <button class="page-btn" @click="openRefuseDialog">申请不通过</button>
        </div>
        <div v-else>
          <div style="width:684px;">
            <div class="title">审核信息</div>
            <div class="items-wrap">
              <div class="items-line">
                <div class="item">
                  <div class="item-title">审核结果：</div>
                  <div class="item-content">{{partnerApplyInfo.status === 1 ? '通过' : '不通过'}}</div>
                </div>
                <div class="item">
                  <div class="item-title">审核人员：</div>
                  <div class="item-content">{{partnerApplyInfo.updatedBy || '-'}}</div>
                </div>
              </div>

              <div class="items-line">
                <div class="item">
                  <div class="item-title">审核时间：</div>
                  <div class="item-content">{{partnerApplyInfo.updatedTime || '-'}}</div>
                </div>
                <div class="item" v-if="partnerApplyInfo.status === 2">
                  <div class="item-title">不通过原因：</div>
                  <div class="item-content">{{partnerApplyInfo.reason || '-'}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-group">
            <back-button />
          </div>
        </div>
      </div>

      <PassDialog :show.sync="passDialog.show" :detail="passDialog" @save="save" />
      <RefuseDialog :show.sync="refuseDialog.show" :detail="refuseDialog" @save="save" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { partnerApply } from '@/api/partner/partner'
import PersonInfo from './component/PersonInfo.vue'
import PassDialog from './component/PassDialog.vue'
import RefuseDialog from './component/RefuseDialog.vue'

export default {
  name: 'partnerApplyDetail',

  components: {
    PersonInfo,
    PassDialog,
    RefuseDialog,
  },

  data() {
    return {
      partnerApplyInfo: null,
      passDialog: {
        show: false,
        title: '申请通过',
        content: '确认通过合伙人入驻申请？',
      },
      refuseDialog: {
        show: false,
        title: '申请不通过',
        content: '确认拒绝合伙人入驻申请？',
      },
    }
  },

  computed: {
    ...mapState(['userInfo']),
  },

  mounted() {
    const info = localStorage.getItem('partnerApplyInfo')
    this.partnerApplyInfo = JSON.parse(info)
  },

  methods: {
    openPassDialog() {
      this.passDialog.show = true
    },

    openRefuseDialog() {
      this.refuseDialog.show = true
    },

    save(data) {
      const params = {
        id: this.partnerApplyInfo.id,
        status: data.status,
        reason: data.reason || '',
        operator: this.userInfo.name,
      }

      partnerApply(params).then((res) => {
        if (res.code == 0) {
          this.$message.success('保存成功')
          this.$router.back()
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-group {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  .page-btn {
    margin: 0 40px;
    padding: 0 55px;
    height: 58px;
    border-radius: 8px;
    background: #3446AA;
    font-size: 20px;
    font-weight: 500;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
  }
}

.title {
  margin-bottom: 30px;
  height: 26px;
  font-family: PingFangSC-Medium;
  font-size: 17px;
  line-height: 26px;
  color: rgba(0, 0, 0, 0.9);
}

.items-wrap {
  margin-bottom: 40px;
  .items-line {
    margin-bottom: 18px;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      line-height: 28px;
      margin-right: 10px;
      .item-title {
        width: 135px;
        text-align: right;
        color: #86909C;
      }
      .item-content {
        flex: 1;
        margin-left: 8px;
        color: #1D2129;
      }
    }
  }
}
</style>