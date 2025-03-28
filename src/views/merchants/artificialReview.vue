<template>
  <div>
    <div class="header">
      <el-image
        class="logo"
        :src="require('@/assets/logo_txt.png')"
        fit="cover"
      ></el-image>
      <div style="display: flex; align-items: center">
        <div class="avtor-name">Serati Ma</div>
        <el-image
          class="avtor-img"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        ></el-image>
      </div>
    </div>
    <div class="banner">
      <div class="center">
        <el-steps :active="active">
          <el-step title="选择行业"></el-step>
          <el-step title="基本信息"></el-step>
          <el-step title="人工审核"></el-step>
          <el-step title="入驻成功"></el-step>
        </el-steps>
      </div>
      <div class="designation">
        <div>认证企业：上海画毂汽车科技有限公司</div>
        <div style="margin-top: 16.8px">商户名称：上海奔驰4s店</div>
      </div>
      <el-image
        class="audit-img"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="cover"
      ></el-image>
      <div class="audit-staus">审核中</div>
      <div class="description">请耐心等待 审核结果约10分钟</div>
      <!-- <el-button class="next-btn" type="primary" @click="lastClick()"
        >上一步</el-button
      > -->
      <el-button class="next-btn" type="primary" @click="nextClick()"
        >联系客服：XXX-XXXXXX</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 3,
    };
  },
  methods: {
    // 上一步
    // lastClick() {
    //   this.active = this.active - 1;
    //   this.$router.push({
    //     path: "/baseInformation",
    //     query: {
    //       active: this.active,
    //     },
    //   });
    // },
    // 下一步
    nextClick() {
      this.active = this.active + 1;
      this.$router.push({
        path: "/inSuccessful",
        query: {
          active: this.active,
        },
      });
    },
  },
  created() {
    this.active = Number(this.$route.query.active);
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  // width: 24rem;
  height: 1.0667rem;
}

.logo {
  width: 3.5rem;
  height: 1.0667rem;
}

.avtor-name {
  font-family: Roboto-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.85);
}

.avtor-img {
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 0.1667rem;
  margin-right: 0.7333rem;
  border-radius: 50%;
}

.banner {
  // width: 23.2rem;
  // height: 13.1333rem;
  margin: 0 0.4rem;
  margin-top: 0.4rem;
  border-radius: 0 0 0.1rem 0.1rem;
  background: #ffffff;
  overflow: hidden;
}

.center {
  width: 14.2667rem;
  margin: 0 auto;
  margin-top: 0.8333rem;
}

.el-steps /deep/ .el-step__head {
  margin-left: 0.3rem;
}

// .el-steps /deep/ .el-step__line,
// .el-steps /deep/ .is-finish .el-step__line {
//   color: transparent;
//   background: transparent;
// }

.el-steps /deep/ .is-finish .el-step__icon {
  width: 0.4333rem;
  height: 0.4333rem;
  background: #3446aa;
  border: 0.0167rem solid #a4aebb;
}

.el-steps /deep/ .is-finish .el-step__icon-inner {
  font-family: PingFangSC-Semibold;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #ffffff;
}

.el-steps /deep/ .el-step__title.is-finish {
  font-family: PingFangSC-Medium;
  font-size: 0.2667rem;
  font-weight: normal;
  color: #1d2129;
}

.el-steps /deep/ .is-process .el-step__icon,
.el-steps /deep/ .is-wait .el-step__icon {
  width: 0.4333rem;
  height: 0.4333rem;
  background: #f2f3f5;
  border: 0.0167rem solid #a4aebb;
}

.el-steps /deep/ .is-process .el-step__icon-inner,
.el-steps /deep/ .is-wait .el-step__icon-inner {
  font-family: PingFangSC-Semibold;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #86909c;
}

.el-steps /deep/ .el-step__title.is-process,
.el-steps /deep/ .el-step__title.is-wait {
  font-family: PingFangSC-Regular;
  font-size: 0.2667rem;
  font-weight: normal;
  color: #86909c;
}

.designation {
  margin-left: 9.3833rem;
  margin-top: 1.05rem;
  font-family: PingFangSC-Medium;
  font-size: 0.3rem;
  font-weight: normal;
  color: #000000;
}

.audit-img {
  display: block;
  width: 1.5625rem;
  height: 1.5625rem;
  margin: 0 auto;
  margin-top: 1.3333rem;
  border-radius: 50%;
}

.audit-staus {
  margin-top: 0.7167rem;
  font-family: PingFangSC-Medium;
  font-size: 0.3667rem;
  font-weight: normal;
  color: #000000;
  text-align: center;
}

.description {
  margin-top: 0.2667rem;
  font-family: PingFang SC Medium;
  font-size: 16px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.next-btn {
  display: block;
  width: 3.4667rem;
  height: 0.6667rem;
  margin: 0 auto;
  margin-top: 1.9433rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.0667rem;
  background: #3446aa;
}

.next-btn /deep/ span {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #ffffff;
}
</style>

