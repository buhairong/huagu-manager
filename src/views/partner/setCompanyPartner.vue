<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >{{ type == 1 ? "创建" : "编辑" }}企业合伙人</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content">
      <div>
        <div class="container">
          <el-steps :active="activeStep" align-center style="width: 600px">
            <el-step
              v-for="(item, index) in stepList"
              :key="index"
              :title="item"
            >
            </el-step>
          </el-steps>

          <div style="margin-top: 40px" v-if="detail">
            <Step1
              v-show="activeStep === 0"
              ref="step1"
              :detail="detail"
              @change="change"
            />

            <Step2
              v-show="activeStep === 1"
              ref="step2"
              :detail="detail"
              @change="change"
            />
          </div>
        </div>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back" v-if="activeStep === 0">取消</div>
        <div class="btn" @click="prev" v-else>上一步</div>

        <div class="btn save-btn" @click="save" v-if="activeStep === 1">
          保存
        </div>
        <div class="btn save-btn" @click="next" v-else>下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createCompanyPartner, updateCompanyPartner } from '@/api/partner/partner'
import Step1 from "./component/SetCompanyPartnerStep1.vue"
import Step2 from "./component/SetCompanyPartnerStep2.vue"

const detail = () => ({
  createdBy: '',
  // step1
  businessLicense: "", // 营业执照
  companyName: "", // 企业名称
  registeredAddress: "", // 注册地址
  corporationTaxNumber: "", // 信用代码
  businessDeadline: '', // 营业期限
  isCompanyForever: 0, // 企业营业期限是否长期有效 0.否 1.是 
  managerMobile: "", // 联系方式

  // step2
  bankName: '', // 开户名
  bankCardNo: '', // 账号
  bankCardName: '', // 开户行
})

export default {
  name: "setCompanyPartner",

  components: {
    Step1,
    Step2,
  },

  data() {
    return {
      type: null,
      activeStep: 0,
      stepList: ["企业信息", "收款信息"],
      detail: null,
    };
  },

  computed: {
    ...mapState(['userInfo'])
  },

  mounted() {
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.detail = {
        ...detail(),
        createdBy: this.userInfo.name
      };
    } else {
      let detail = localStorage.getItem('companyPartnerDetail')
      if (detail) {
        detail = JSON.parse(detail)
        this.detail = {
          ...detail,
        }
      }
    }
  },

  methods: {
    back() {
      this.$router.back();
    },

    change(data) {
      this.detail = data;
    },

    prev() {
      --this.activeStep;
    },

    next() {
      if (this.activeStep === 0) {
        this.$refs.step1.$refs.step1form.validate((valid) => {
          if (valid) {
            ++this.activeStep;
          } else {
            this.$message.error("请检查输入项");
          }
        });
      }
    },

    save() {
      this.$refs.step2.$refs.step2form.validate((valid) => {
        if (valid) {
          if (this.type == 1) { 
            createCompanyPartner(this.detail).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
          } else {
            updateCompanyPartner(this.detail).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
          }
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    margin-bottom: 32px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.9);
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
