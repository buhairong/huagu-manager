<template>
  <div>
    <div class="page-header header">
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
      <el-image
        class="audit-img"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="cover"
      ></el-image>
      <div class="audit-staus">恭喜你！审核通过</div>
      <div class="description">欢迎加入wecars 立即开启美好的订阅之旅</div>
      <!-- <el-button class="next-btn" type="primary" @click="lastClick()"
        >上一步</el-button
      > -->
      <el-button class="next-btn" type="primary" @click="goClick()"
        >立即体验</el-button
      >
    </div>
    <el-dialog class="experience-pop" :visible.sync="dialogVisible">
      <div class="experience-content">
        <div class="experience-box">
          <div class="experience-box-img"></div>
          <div class="experience-box-title">创建订阅方案</div>
        </div>
        <div class="experience-box">
          <div class="experience-box-img"></div>
          <div class="experience-box-title">上传车辆</div>
        </div>
        <div class="experience-box">
          <div class="experience-box-img"></div>
          <div class="experience-box-title">DIY店铺</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 4,
      dialogVisible: false,
    };
  },
  methods: {
    // 上一步
    // lastClick() {
    //   this.active = this.active - 1;
    //   this.$router.push({
    //     path: "/artificialReview",
    //     query: {
    //       active: this.active,
    //     },
    //   });
    // },
    // 立即体验
    goClick() {
      this.dialogVisible = true;
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

.audit-img {
  display: block;
  width: 1.5625rem;
  height: 1.5625rem;
  margin: 0 auto;
  margin-top: 2.25rem;
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
  font-size: 0.2667rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.next-btn {
  display: block;
  width: 1.7333rem;
  height: 0.6667rem;
  margin: 0 auto;
  margin-top: 0.7933rem;
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

.experience-pop /deep/ .el-dialog {
  width: 15.4833rem;
  height: 8.55rem;
  margin-top: 18vh !important;
  border-radius: 0.1rem;
}

.experience-pop /deep/ .el-dialog__header {
  display: none;
}

.experience-pop /deep/ .el-dialog__body {
  padding: 0;
  padding-top: 1.6667rem;
}

.experience-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.experience-box {
  width: 3.5167rem;
  height: 5.3333rem;
}

.experience-box-img {
  width: 3.5167rem;
  height: 4.1667rem;
  background: #d8d8d8;
}

.experience-box-title {
  width: 3.5167rem;
  margin-top: 0.6667rem;
  font-family: PingFang SC Regular;
  font-size: 0.3667rem;
  font-weight: normal;
  color: #000000;
  text-align: center;
}
</style>

