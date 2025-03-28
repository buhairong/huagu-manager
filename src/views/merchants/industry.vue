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
      <div class="industry-title">行业选择</div>
      <el-radio-group v-model="industryRadio" class="industry-content">
        <el-radio
          v-for="(item, index) in industryRadioList"
          :key="index"
          :label="item.value"
          @change="handleChange"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
      <!-- <el-checkbox-group
        :max="1"
        v-model="industryRadio"
        class="industry-content"
      >
        <el-checkbox
          v-for="(item, index) in industryRadioList"
          :key="index"
          :label="item.value"
          @change="handleChange"
          >{{ item.label }}</el-checkbox
        >
      </el-checkbox-group> -->
      <div class="industry-title mt40">即将入驻</div>
      <el-radio-group v-model="afterIndustryRadio" class="industry-content">
        <el-radio
          v-for="(item, index) in afterIndustryRadioList"
          :key="index"
          :label="item.value"
          disabled
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
      <div class="industry-title mt40">入驻须知</div>
      <div class="industry-content">
        <div
          class="industry-content-list"
          v-for="(item, index) in instructionList"
          :key="index"
        >
          {{ index + 1 }}. {{ item.content }}
        </div>
      </div>
      <el-button class="next-btn" type="primary" @click="nextClick()"
        >下一步</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      // 行业选择
      industryRadio: "0",
      // 行业选择列表
      industryRadioList: [
        {
          value: "0",
          label: "汽车经销商",
        },
        {
          value: "1",
          label: "金融服务商",
        },
      ],
      // 即将入驻
      afterIndustryRadio: "",
      // 即将入驻选择列表
      afterIndustryRadioList: [
        {
          value: "0",
          label: "汽车制造商",
        },
        {
          value: "1",
          label: "保险公司",
        },
        {
          value: "2",
          label: "修理厂",
        },
        {
          value: "3",
          label: "二手车商",
        },
        {
          value: "4",
          label: "加油站",
        },
        {
          value: "5",
          label: "充电站",
        },
        {
          value: "6",
          label: "洗车房",
        },
      ],
      // 入驻须知
      instructionList: [
        {
          content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案1",
        },
        {
          content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案2",
        },
        {
          content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案3",
        },
      ],
    };
  },
  methods: {
    // 商户入驻-行业选择
    handleChange() {
      if (this.industryRadio == "0") {
        this.instructionList = [
          {
            content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案1",
          },
          {
            content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案2",
          },
          {
            content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案3",
          },
        ];
      } else if (this.industryRadio == "1") {
        this.instructionList = [
          {
            content: "金融服务商为不同行业、场景的商家匹配更适合的解决方案1",
          },
          {
            content: "金融服务商为不同行业、场景的商家匹配更适合的解决方案2",
          },
          {
            content: "金融服务商为不同行业、场景的商家匹配更适合的解决方案3",
          },
          {
            content: "金融服务商为不同行业、场景的商家匹配更适合的解决方案4",
          },
          {
            content: "金融服务商为不同行业、场景的商家匹配更适合的解决方案5",
          },
        ];
      }
    },
    // 下一步
    nextClick() {
      localStorage.setItem("industryRadio", this.industryRadio);
      localStorage.setItem(
        "instructionList",
        JSON.stringify(this.instructionList)
      );
      this.active = this.active + 1;
      this.$router.push({
        path: "/baseInformation",
        query: {
          active: this.active,
        },
      });
    },
  },
  created() {
    this.industryRadio = localStorage.getItem("industryRadio")
      ? localStorage.getItem("industryRadio")
      : "0";
    this.instructionList = localStorage.getItem("instructionList")
      ? JSON.parse(localStorage.getItem("instructionList"))
      : [
          {
            content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案1",
          },
          {
            content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案2",
          },
          {
            content: "汽车经销商为不同行业、场景的商家匹配更适合的解决方案3",
          },
        ];
    this.active = this.$route.query.active
      ? Number(this.$route.query.active)
      : 1;
  },
};
</script>

<style lang="less">
// .el-step__line {
//   background: transparent;
// }
// .is-finish .el-step__icon {
//   background: #3446aa;
//   color: #fff;
//   width: 26px;
//   height: 26px;
// }
// .is-process .el-step__icon,
// .is-wait .el-step__icon {
//   background: #f2f3f5;
//   color: #86909c;
//   width: 26px;
//   height: 26px;
//   border: 1px solid #a4aebb;
// }
// .el-step__title,
// .el-step__title.is-process,
// .el-step__title.is-wait {
//   color: #86909c;
// }
// .el-step__title.is-finish {
//   color: black;
// }
</style>
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

.industry-title {
  margin-left: 4.4667rem;
  margin-top: 1.6667rem;
  font-family: PingFangSC-Medium;
  font-size: 0.2667rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.9);
}

.mt40 {
  margin-top: 0.8rem;
}

.industry-content {
  margin-left: 4.4667rem;
  margin-top: 0.4rem;
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #1d2129;
}

.industry-content-list {
  margin: 0.0667rem 0;
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #86909c;
}

.next-btn {
  display: block;
  width: 1.7333rem;
  height: 0.6667rem;
  margin: 0 auto;
  margin-top: 2.25rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.0333rem;
  background: #3446aa;
}

.next-btn /deep/ span {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #ffffff;
}
</style>

