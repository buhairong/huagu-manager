<template>
  <div class="wrap">
    <template v-if="type == 1">
      <div class="title">基本信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">联系方式:</div>
            <div class="item-content">{{ detail.mobile || "-" }}</div>
          </div>

          <div class="item">
            <div class="item-title">申请时间:</div>
            <div class="item-content">{{ detail.createdTime || "-" }}</div>
          </div>
        </div>

        <div class="right">
          <div class="item">
            <div class="item-title">职业信息:</div>
            <div class="item-content">{{ detail.career || "-" }}</div>
          </div>

          <div class="item">
            <div class="item-title">入驻时间:</div>
            <div class="item-content">{{ detail.updatedTime || "-" }}</div>
          </div>
        </div>
      </div>

      <div class="title">证件照片</div>
        <div class="container">
            <div class="certificate-item" v-if="detail.idcard">
                <div class="item-title">身份证：</div>
                <div class="img-content">
                    <div class="img-wrap">
                        <div class="img-box">
                            <el-image 
                                style="width: 160px"
                                :src="detail.idcardUrl" 
                                :preview-src-list="[detail.idcardUrl]"
                            >
                            </el-image>
                        </div>
                        <div class="img-title">身份证人像面照片</div>
                    </div>
                    <div class="img-wrap">
                        <div class="img-box">
                            <el-image 
                                style="width: 160px"
                                :src="detail.idcardBackUrl" 
                                :preview-src-list="[detail.idcardBackUrl]"
                            >
                            </el-image>
                        </div>
                        <div class="img-title">身份证国徽面照片</div>
                    </div>
                </div>
            </div>
            <div class="certificate-item">
                <div class="item-title">所在单位证明：</div>
                <div class="img-content">
                    <div class="img-wrap">
                        <div class="img-box">
                            <el-image 
                                style="width: 160px"
                                :src="detail.imageUrlList[0]" 
                                :preview-src-list="detail.imageUrlList"
                            >
                            </el-image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
      <div class="title">基本信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">企业名称:</div>
            <div class="item-content">{{ detail.companyName || "-" }}</div>
          </div>

          <div class="item">
            <div class="item-title">管理员联系方式:</div>
            <div class="item-content">{{ detail.managerMobile || "-" }}</div>
          </div>
        </div>

        <div class="right">
          <div class="item">
            <div class="item-title">统一社会信用代码:</div>
            <div class="item-content">{{ detail.corporationTaxNumber || "-" }}</div>
          </div>

          <div class="item">
            <div class="item-title">注册日期:</div>
            <div class="item-content">{{ detail.createdTime || "-" }}</div>
          </div>
        </div>
      </div>

      <div class="title">收款信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">开户名称:</div>
            <div class="item-content">{{ detail.bankName || "-" }}</div>
          </div>

          <div class="item">
            <div class="item-title">开户银行:</div>
            <div class="item-content">{{ detail.bankCardName || "-" }}</div>
          </div>
        </div>

        <div class="right">
          <div class="item">
            <div class="item-title">银行账号:</div>
            <div class="item-content">{{ detail.bankCardNo || "-" }}</div>
          </div>
        </div>
      </div>
    </template>
    

    <div class="title">合伙人权限</div>
    <el-table 
      :data="list"
      style="margin-left: 150px;margin-bottom: 40px;width: 400px"
      :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
    >
      <el-table-column
        label="权限"
        prop="label"
      >
      </el-table-column>

      <el-table-column
          label="操作"
          width="250"
          align="center"
      >
        <template slot-scope="scope">
          <div class="display:flex;">
            <el-switch
              v-model="scope.row.open"
              :active-value="1"
              :inactive-value="0"
              @change="(e) => changeOpenStatus(e, scope.$index)"
            >
            </el-switch>
            <span style="padding-left:12px;">{{ scope.row.open === 0 ? '关闭' : '开启' }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { updateAuthority } from '@/api/partner/partner'

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },

    type: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      list: [],
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      if (this.type == 1) {
        this.list = [
          { label: '首年会员费用', open: this.detail.firstYearRole, key: 'firstYearRole' },
          { label: '次年会员费用', open: this.detail.secondYearRole, key: 'secondYearRole' },
        ]
      } else {
        this.list = [
          { label: '员工首年会员费用', open: this.detail.staffFirstYearRole, key: 'staffFirstYearRole' },
          { label: '员工次年会员费用', open: this.detail.staffSecondYearRole, key: 'staffSecondYearRole'  },
          { label: '合伙人首年会员费用', open: this.detail.partnerFirstYearRole, key: 'partnerFirstYearRole' },
          { label: '合伙人次年会员费用', open: this.detail.partnerSecondYearRole, key: 'partnerSecondYearRole' },
        ]
      }
    },

    changeOpenStatus(e, index) {
      const data = {
        id: this.detail.id,
        type: this.type,
        [this.list[index]['key']]: e,
      }

      updateAuthority(data).then(res => {
        if(res.code === 0) {
          this.$message.success('保存成功')
          console.log('list', this.list)
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
.title {
    margin: 24px 0;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    line-height: 22px;
    color: #1D2129;
}
.container {
  padding-left: 100px;
  display: flex;
  .left {
    width: 400px;
    margin-right: 30px;
  }
  .right {
    width: 400px;
  }
  .item {
    margin-bottom: 16px;
    display: flex;
    .item-title {
      margin-right: 8px;
      height: 21px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 21px;
      color: #86909c;
      width: 130px;
      text-align: right;
    }
    .item-content {
      width: 0;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 21px;
      color: #1d2129;
      .preview-img {
        width: 95px;
      }
    }
  }
}

.certificate-item {
  flex: 1;
  margin-left: 60px;
  margin-right: 10px;
  .item-title {
      margin-bottom: 6px;
      height: 23px;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      line-height: 23px;
      color: #86909C;
  }
  .img-content {
      display: flex;
  }
  .img-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:first-child {
          margin-right: 32px;
      }
      .img-box {
          margin-bottom: 12px;
          width: 160px;
          height: 100px;
          overflow: hidden;
          .el-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
          }
      }
      .img-title {
          height: 23px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          line-height: 23px;
          color: #3D3D3D;
      }
  }
}
</style>
