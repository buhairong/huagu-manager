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
      <el-form
        class="baseInfoForm"
        ref="baseInfoForm"
        :model="baseInfoForm"
        :rules="baseInfoFormRules"
        label-width="150px"
      >
        <el-form-item label="企业名称：" prop="companyName">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="baseInfoForm.companyName"
                placeholder="请输入企业名称"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="营业执照上传：">
          <el-upload
            class="avatar-uploader photo"
            list-type="picture-card"
            :action="action"
            :show-file-list="false"
            :on-success="
              (res, file) => {
                this.handleSuccess(res, file, '1');
              }
            "
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="统一社会信用代码：" prop="socialCreditCode">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="baseInfoForm.socialCreditCode"
                placeholder="自动识别营业执照、可修改"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="商户名称：" prop="merchantsName">
          <el-row>
            <el-col :span="12">
              <el-input
                id="tipinput"
                v-model="baseInfoForm.merchantsName"
                placeholder="请输入商户名称"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-row>
            <el-col :span="4">
              <el-input
                class="city-name"
                v-model="baseInfoForm.cityname"
                placeholder="商户城市"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-input
                class="city-name"
                v-model="baseInfoForm.districtName"
                placeholder="商户地区"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-input
                class="address"
                v-model="baseInfoForm.address"
                placeholder="详细街道地址"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系人：" prop="people">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="baseInfoForm.people"
                placeholder="请输入商户联系人"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone">
          <el-row>
            <el-col :span="12">
              <el-input
                placeholder="请输入联系方式"
                v-model="baseInfoForm.phone"
                class="input-with-select"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="门店介绍：">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="baseInfoForm.storeIntroduce"
                type="textarea"
                placeholder="说点什么~最多可输入100个字"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="门店照片上传：">
          <el-row>
            <el-col :span="4">
              <el-upload
                class="avatar-uploader photo"
                list-type="picture-card"
                :action="action"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    this.handleSuccess(res, file, '2');
                  }
                "
              >
                <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="photo-title">门头照片</div>
            </el-col>
            <el-col :span="4">
              <el-upload
                class="avatar-uploader photo"
                list-type="picture-card"
                :action="action"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    this.handleSuccess(res, file, '3');
                  }
                "
              >
                <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="photo-title">展厅照片</div>
            </el-col>
            <el-col :span="4">
              <el-upload
                class="avatar-uploader photo"
                list-type="picture-card"
                :action="action"
                :show-file-list="false"
                :on-success="
                  (res, file) => {
                    this.handleSuccess(res, file, '4');
                  }
                "
              >
                <img v-if="imageUrl4" :src="imageUrl4" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="photo-title">环境照片</div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div style="text-align: center; margin: 25px 0">
        <el-button class="last-btn" @click="lastClick()">上一步</el-button>
        <el-button class="next-btn" type="primary" @click="nextClick()"
          >下一步</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      baseInfoForm: {
        // 企业名称
        companyName: "",
        // 统一社会信用代码
        socialCreditCode: "",
        // 商户名称
        merchantsName: "",
        // 市
        cityname: "",
        // 区
        districtName: "",
        // 详细街道地址
        address: "",
        // 经度
        lng: "",
        // 纬度
        lat: "",
        // 联系人
        people: "",
        // 请输入联系方式
        phone: "",
        // 门店介绍
        storeIntroduce: "",
      },
      baseInfoFormRules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        socialCreditCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
        ],
        merchantsName: [
          { required: true, message: "请输入商户名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细街道地址", trigger: "change" },
        ],
        people: [
          { required: true, message: "请输入商户联系人", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
      },
      // 上传地址
      action: "https://jsonplaceholder.typicode.com/posts/",
      // 设置上传的请求头部
      headers: "",
      // 上传时附带的额外参数
      data: "",
      // 上传的文件字段名
      name: "",
      // 上传的文件类型
      accept: "",
      // 营业执照上传
      imageUrl1: "",
      // 门店-门头照片上传
      imageUrl2: "",
      // 门店-展厅照片上传
      imageUrl3: "",
      // 门店-环境照片上传
      imageUrl4: "",
    };
  },
  methods: {
    // 异步加载高德地图
    loadAmap() {
      window._AMapSecurityConfig = {
        securityJsCode: "802de4d8c34256c5cd0e6d479d575182",
      };
      var url =
        "https://webapi.amap.com/maps?v=2.0&key=57284904422a35020d71a78f57381a0d&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    },
    // 搜索商户名称获取详细地址
    init() {
      let that = this;
      // 声明异步加载回调函数
      window.onLoad = function () {
        // var map = new AMap.Map("container", {
        //   resizeEnable: true,
        //   center: [116.397428, 39.90923],
        //   zoom: 13,
        // });
        AMap.plugin(["AMap.PlaceSearch", "AMap.AutoComplete"], function () {
          // 根据关键字进行搜索
          var autoOptions = {
            input: "tipinput",
            city: "全国",
          };
          var auto = new AMap.AutoComplete(autoOptions);
          auto.on("select", select); //注册监听，当选中某条记录时会触发
          function select(e) {
            console.log(e);
            that.baseInfoForm.merchantsName = e.poi.name;
            // 省市区的正则
            let reg = /.+?(省|市|自治区|自治州|县|区)/g;
            let pcd = e.poi.district.match(reg);
            if (pcd.length == "3") {
              that.baseInfoForm.cityname = pcd[1];
              that.baseInfoForm.districtName = pcd[2];
            } else if (pcd.length == "2") {
              that.baseInfoForm.cityname = pcd[0];
              that.baseInfoForm.districtName = pcd[1];
            }
            that.baseInfoForm.address = e.poi.address;
            that.baseInfoForm.lng = e.poi.location.lng;
            that.baseInfoForm.lat = e.poi.location.lat;
            // var placeSearch = new AMap.PlaceSearch({
            //   map,
            // });
            // placeSearch.search(e.poi.name);
          }
        });
      };
    },
    // 上传图片 type 1 营业执照 2 门店
    handleSuccess(res, file, type) {
      // if (file.size > 1024) {
      //   this.$message({
      //     message: "文件最大上传大小1Mb",
      //     type: "error",
      //     duration: 2000,
      //   });
      //   return;
      // }
      if (type == "1") {
        this.imageUrl1 = file.url;
      } else if (type == "2") {
        this.imageUrl2 = file.url;
      } else if (type == "3") {
        this.imageUrl3 = file.url;
      } else if (type == "4") {
        this.imageUrl4 = file.url;
      }
    },
    // 上一步
    lastClick() {
      this.save();
      this.active = this.active - 1;
      this.$router.push({
        path: "/industry",
        query: {
          active: this.active,
        },
      });
    },
    // 下一步
    nextClick() {
      this.$refs["baseInfoForm"].validate((valid) => {
        if (!valid) {
          return;
        }
        if (!this.imageUrl1) {
          this.$message({
            message: "请上传营业执照",
            type: "error",
            duration: 2000,
          });
          return;
        }
        if (!this.imageUrl2) {
          this.$message({
            message: "请上传门头照片",
            type: "error",
            duration: 2000,
          });
          return;
        }
        if (!this.imageUrl3) {
          this.$message({
            message: "请上传展厅照片",
            type: "error",
            duration: 2000,
          });
          return;
        }
        if (!this.imageUrl4) {
          this.$message({
            message: "请上传环境照片",
            type: "error",
            duration: 2000,
          });
          return;
        }
        this.save();
        this.active = this.active + 1;
        this.$router.push({
          path: "/artificialReview",
          query: {
            active: this.active,
          },
        });
      });
    },
    // 保存数据到本地
    save() {
      localStorage.setItem("baseInfoForm", JSON.stringify(this.baseInfoForm));
      localStorage.setItem("imageUrl1", this.imageUrl1);
      localStorage.setItem("imageUrl2", this.imageUrl2);
      localStorage.setItem("imageUrl3", this.imageUrl3);
      localStorage.setItem("imageUrl4", this.imageUrl4);
    },
  },
  created() {
    this.loadAmap();
    this.init();
    this.baseInfoForm = localStorage.getItem("baseInfoForm")
      ? JSON.parse(localStorage.getItem("baseInfoForm"))
      : {};
    this.imageUrl1 = localStorage.getItem("imageUrl1")
      ? localStorage.getItem("imageUrl1")
      : "";
    this.imageUrl2 = localStorage.getItem("imageUrl2")
      ? localStorage.getItem("imageUrl2")
      : "";
    this.imageUrl3 = localStorage.getItem("imageUrl3")
      ? localStorage.getItem("imageUrl3")
      : "";
    this.imageUrl4 = localStorage.getItem("imageUrl4")
      ? localStorage.getItem("imageUrl4")
      : "";
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

.baseInfoForm {
  margin-left: 5.8333rem;
  margin-top: 0.4rem;
}

.baseInfoForm /deep/ .el-form-item__label {
  font-family: PingFangSC-Regular;
  font-weight: normal;
  color: #4e5969;
}

// .baseInfoForm /deep/ .el-form-item__label::before {
//   content: "*";
//   color: red;
// }

.baseInfoForm .el-input {
  width: 6.1rem;
  height: 0.5333rem;
}

.baseInfoForm /deep/ .el-input__inner {
  width: 6.1rem;
  height: 0.5333rem;
}

.baseInfoForm .city-name {
  width: 2rem;
  height: 0.5333rem;
}

.city-name /deep/ .el-input__inner {
  width: 2rem;
  height: 0.5333rem;
}

.baseInfoForm .address {
  width: 2.75rem;
  height: 0.5333rem;
}

.address /deep/ .el-input__inner {
  width: 2.75rem;
  height: 0.5333rem;
}

.photo /deep/ .el-upload {
  width: 1.65rem;
  height: 1.2333rem;
  line-height: 1.2333rem;
}

.photo-title {
  display: inline-block;
  margin-left: 20px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  font-weight: normal;
  color: #4e5969;
}

.last-btn {
  width: 1.7333rem;
  height: 0.6667rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.0333rem;
  background: #f2f3f5;
}

.last-btn /deep/ span {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #1d2129;
}

.next-btn {
  width: 1.7333rem;
  height: 0.6667rem;
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

