<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/businessManagement/businessAudit"
          >商户审核</a
        ></el-breadcrumb-item
      >
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="info-box">
        <el-form label-width="150px">
          <el-form-item label="商户角色：">
            <div>
              {{
                infoMation.chooseRole
                  ? infoMation.chooseRole == "1"
                    ? "4s"
                    : infoMation.chooseRole == "2"
                    ? "二级销售网络"
                    : "二手车商"
                  : ""
              }}
            </div>
          </el-form-item>
          <el-form-item label="企业名称：">
            <div>{{ infoMation.companyName }}</div>
          </el-form-item>
          <el-form-item label="商户名称：">
            <div>{{ infoMation.shopName }}</div>
          </el-form-item>
          <el-form-item label="所属行业：">
            <div>
              {{
                infoMation.companyType
                  ? infoMation.companyType == "1"
                    ? "汽车经销商"
                    : "金融服务商"
                  : ""
              }}
            </div>
          </el-form-item>
          <el-form-item label="详细地址：">
            <div>{{ infoMation.address }}</div>
          </el-form-item>
          <el-form-item label="联系人：">
            <div>{{ infoMation.contactName }}</div>
          </el-form-item>
          <el-form-item label="联系方式：">
            <div>{{ infoMation.contactMobile }}</div>
          </el-form-item>
          <el-form-item label="营业执照：">
            <el-image
              class="avtor-img"
              :src="infoMation.businessLicense"
              fit="cover"
            ></el-image>
          </el-form-item>
          <el-form-item label="门店照片：">
            <el-row>
              <el-col :span="8">
                <el-image
                  class="avtor-img"
                  :src="infoMation.shopHeadPic"
                  fit="cover"
                ></el-image>
              </el-col>
              <el-col :span="8">
                <el-image
                  class="avtor-img"
                  :src="infoMation.shopHallPic"
                  fit="cover"
                ></el-image>
              </el-col>
              <el-col :span="8">
                <el-image
                  class="avtor-img"
                  :src="infoMation.shopEnvironmentPic"
                  fit="cover"
                ></el-image>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="统一社会信用代码：">
            <div>{{ infoMation.corporationTaxNumber }}</div>
          </el-form-item>
          <el-form-item label="商户介绍：">
            <div class="business-introduce">
              {{ infoMation.introduce }}
            </div>
          </el-form-item>
          <el-form-item label="商户已方案数量：">
            <div>{{ infoMation.subscribeNums }}</div>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button class="goback-btn" type="info" @click="goback()"
          >返回</el-button
        >
        <el-popover
          v-model="approVisible"
          placement="bottom"
          width="200"
          trigger="click"
        >
          <div class="popover-box">
            <div @click="handleUnApproved()">审核未通过</div>
            <el-divider></el-divider>
            <div @click="handleApproved()">审核通过</div>
          </div>
          <el-button type="primary" slot="reference">审核</el-button>
        </el-popover>
      </div>
    </div>
    <el-dialog
      title="审核通过"
      :visible.sync="approveDialogVisible"
      width="50%"
    >
      <el-form
        :model="approveForm"
        :rules="approveFormRules"
        ref="approveForm"
        label-position="left"
        label-width="500px"
      >
        <el-form-item label="是否核查商户基本信息" prop="baseInfomation">
          <el-radio v-model="approveForm.baseInfomation" label="1"
            >已核查</el-radio
          >
        </el-form-item>
        <el-form-item
          label="是否核查商户社会统一信用代码"
          prop="socialCreditCode"
        >
          <el-radio v-model="approveForm.socialCreditCode" label="1"
            >已核查</el-radio
          >
        </el-form-item>
        <el-form-item label="是否核查商户上传图片信息" prop="uploadInfomation">
          <el-radio v-model="approveForm.uploadInfomation" label="1"
            >已核查</el-radio
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approveClose()">取消</el-button>
        <el-button type="primary" @click="approveSubmit()"
          >提交审核结果</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="审核未通过"
      :visible.sync="unApproveDialogVisible"
      width="50%"
    >
      <el-input
        type="textarea"
        placeholder="请输入审核未通过原因"
        v-model="reason"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unApproveClose()">取消</el-button>
        <el-button type="primary" @click="unApproveSubmit()"
          >提交审核结果</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  companyAudit,
  companyReject,
} from "@/api/businessManagement/businessAuditDetail";

export default {
  data() {
    return {
      // 商户审核查看详情数据
      infoMation: {},
      // 审核弹出框
      approVisible: false,
      // 审核通过弹框
      approveDialogVisible: false,
      approveForm: {
        // 是否核查商户基本信息
        baseInfomation: "",
        // 是否核查商户社会统一信用代码
        socialCreditCode: "",
        // 是否核查商户上传图片信息
        uploadInfomation: "",
      },
      approveFormRules: {
        baseInfomation: [
          {
            required: true,
            message: "是否核查商户基本信息",
            trigger: "change",
          },
        ],
        socialCreditCode: [
          {
            required: true,
            message: "是否核查商户社会统一信用代码",
            trigger: "change",
          },
        ],
        uploadInfomation: [
          {
            required: true,
            message: "是否核查商户上传图片信息",
            trigger: "change",
          },
        ],
      },
      // 审核未通过弹框
      unApproveDialogVisible: false,
      // 审核未通过原因
      reason: "",
    };
  },
  methods: {
    // 返回
    goback() {
      this.$router.go(-1);
    },
    // 审核通过
    handleApproved() {
      this.approVisible = false;
      this.approveDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["approveForm"].resetFields();
      });
    },
    // 审核通过取消
    approveClose() {
      this.approveDialogVisible = false;
    },
    // 审核通过提交审核结果
    approveSubmit() {
      this.$refs["approveForm"].validate((valid) => {
        if (!valid) {
          return;
        } else {
          let data = {
            id: this.infoMation.id,
          };
          companyAudit(data).then((res) => {
            if (res.code == 0) {
              this.approveDialogVisible = false;
              this.$message({
                message: res.msg,
                type: "success",
                duration: 2000,
              });
              this.$router.push({
                path: "/businessManagement/businessAudit",
              });
            }
          });
        }
      });
    },
    // 审核未通过
    handleUnApproved() {
      this.approVisible = false;
      this.unApproveDialogVisible = true;
      this.reason = "";
    },
    // 审核未通过取消
    unApproveClose() {
      this.unApproveDialogVisible = false;
    },
    // 审核未通过提交审核结果
    unApproveSubmit() {
      let data = {
        id: this.infoMation.id,
        rejectDetails: this.reason,
      };
      companyReject(data).then((res) => {
        if (res.code == 0) {
          this.unApproveDialogVisible = false;
          this.$message({
            message: res.msg,
            type: "success",
            duration: 2000,
          });
          this.$router.push({
            path: "/businessManagement/businessAudit",
          });
        }
      });
    },
  },
  created() {
    this.infoMation = JSON.parse(this.$route.query.infoMation);
  },
};
</script>

<style lang="less" scoped>
.navigation {
  margin: 0.2833rem 0;
}

.navigation /deep/ .el-breadcrumb__inner {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #4e5969;
}

.subscription-plan /deep/ .el-breadcrumb__inner {
  font-family: PingFangSC-Medium;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #1d2129;
}

.content {
  // height: 12.6rem;
  padding: 0.3333rem;
  background: #ffffff;
  border-radius: 0.1rem 0.1rem 0 0;
}

.info-box {
  display: flex;
  justify-content: center;
}

.avtor-img {
  width: 2.95rem;
  height: 2.95rem;
  margin: 0 0.0833rem;
  border-radius: 0.2rem;
}

.business-introduce {
  width: 8.05rem;
  height: 2.4333rem;
  padding: 0.1667rem 0.3333rem;
  background: #ffffff;
  border: 0.0167rem solid #8f8f8f;
  box-sizing: border-box;
  border-radius: 0.3rem;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.goback-btn {
  margin: 0 0.1667rem;
}

.popover-box {
  padding: 0.1667rem;
  text-align: center;
  background: #d8d8d8;
}
</style>