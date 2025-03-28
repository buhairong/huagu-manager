<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>商户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/businessManagement/businessManagement"
          >商户管理</a
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
      <div class="goback-btn">
        <el-button type="info" @click="goback()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商户管理查看详情数据
      infoMation: {},
    };
  },
  methods: {
    // 返回
    goback() {
      this.$router.go(-1);
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
  padding: 0.1667rem 0.3333rem;
  background: #ffffff;
  border: 0.0167rem solid #8f8f8f;
  box-sizing: border-box;
  border-radius: 0.3rem;
}

.goback-btn {
  display: flex;
  justify-content: flex-end;
}
.el-form-item{
  margin-bottom: 0rem;
}
</style>