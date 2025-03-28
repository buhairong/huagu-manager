<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>产品</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/product/subscriptionPlan">订阅方案</a></el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="content">
      <div class="screen">筛选</div>
      <el-row>
        <el-col :span="5">
          <div class="package-name">
            <span>方案名称</span>
            <el-input
              v-model="packageName"
              placeholder="请输入方案名称"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="package-name">
            <span>订阅周期</span>
            <el-input
              v-model="subscriptionPeriod"
              placeholder="请选择订阅周期"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="14">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 方案名称
      packageName: "",
      // 订阅周期
      subscriptionPeriod: "",
    };
  },
  methods: {},
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
  height: 12.6rem;
  padding: 0.3333rem;
  background: #ffffff;
  border-radius: 0.1rem 0.1rem 0 0;
}

.screen {
  font-family: PingFangSC-Medium;
  font-size: 0.3333rem;
  font-weight: normal;
  color: #1d2129;
}

.package-name {
  display: flex;
  align-items: center;
}

.package-name span {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #4e5969;
}

.package-name .el-input {
  width: 2.2333rem;
  height: 0.5333rem;
  margin-left: 0.2667rem;
}
</style>

