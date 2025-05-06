<template>
  <div>
    <div
      class="page-wrap"
      v-loading="syncLoading"
      element-loading-text="车型同步中"
    >
      <div class="product-box">
        <div class="products-wrap">
          <div class="box box1">
            <div class="header-wrap">
              <div class="header">
                <div class="title">品牌筛选</div>
                <div class="letter-wrap">
                  <div
                    v-for="item in letters"
                    :key="item.letter"
                    class="letter"
                    :class="{
                      'active-letter': item.letter === currentFilterLetter,
                    }"
                    @click="scrollToLetter(item)"
                  >
                    {{ item.letter }}
                  </div>
                </div>
              </div>
            </div>
            <div class="content-wrap" ref="letterBox" @scroll="handlerScroll">
              <div v-for="item in brandsList" :key="item.id" class="brand-wrap">
                <div
                  :ref="`letter${item.letter}`"
                  class="letter"
                  v-if="item.letter"
                >
                  {{ item.letter }}
                </div>
                <div
                  class="brand"
                  :class="{ 'active-brand': item.id === currentBrandId }"
                  @click="getCarTypeList(item.id, item.brandName)"
                >
                  <div class="left">
                    <div
                      class="logo-wrap"
                      @mouseenter="changeHoverLetter(item.id)"
                      @mouseleave="changeHoverLetter('')"
                    >
                      <div
                        v-if="item.logoUrl && hoverBrandId === item.id"
                        class="change-logo"
                        @click="
                          changeBrandLogo(
                            item.id,
                            item.brandName,
                            item.logoUrl,
                            item.logoUrlSmall
                          )
                        "
                      >
                        更换logo
                      </div>
                      <img
                        class="logo"
                        :src="item.logoUrl"
                        v-if="item.logoUrl"
                      />
                      <div
                        v-else
                        class="upload-logo"
                        @click="
                          changeBrandLogo(
                            item.id,
                            item.brandName,
                            item.logoUrl,
                            item.logoUrlSmall
                          )
                        "
                      >
                        上传logo
                      </div>
                    </div>
                    <div class="brand-name">{{ item.brandName }}</div>
                  </div>

                  <div class="right">
                    <div class="type">
                      车系 {{ item.typeOpenNum }}/{{ item.typeTotalNum }}
                    </div>
                    <div
                      class="link-item"
                      @click="setCarDeliveryAddress(item.id)"
                    >
                      提车地址
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span class="split-arrow"><i class="el-icon-arrow-right"></i></span>
          <div class="box box2">
            <div class="header-wrap">
              <div class="header">
                <div class="filter">
                  <el-radio-group
                    v-model="filter"
                    @change="getFilterCarTypeList"
                  >
                    <el-radio :label="2">全部车系</el-radio>
                    <el-radio :label="1">已开放车系</el-radio>
                    <el-radio :label="0">未开放车系</el-radio>
                  </el-radio-group>
                </div>
                <div class="sync-type" @click="syncCarType('')">同步车型</div>
              </div>
            </div>
            <div
              class="content-wrap"
              ref="carTypeBox"
              @scroll="handlerCarTypeBoxScroll"
            >
              <el-empty
                v-if="carTypeErrorMsg"
                :description="carTypeErrorMsg"
              ></el-empty>
              <div v-else>
                <div
                  class="car-type"
                  v-for="item in filterCarTypeList"
                  :key="item.id"
                >
                  <div class="left">
                    <template v-if="carType === 1">
                      <div class="tip-icon">
                        <i
                          class="el-icon-warning-outline"
                          v-if="item.fullData == 0"
                        ></i>
                      </div>
                      <div
                        class="car-img-wrap"
                        @mouseenter="changeHoverCarType(item.id)"
                        @mouseleave="changeHoverCarType('')"
                      >
                        <div
                          v-if="
                            item.imageUrl.length && hoverCarTypeId === item.id
                          "
                          class="change-car-img"
                          @click="
                            changeCarImg(item.id, item.carType, item.imageUrl)
                          "
                        >
                          更换图片
                        </div>
                        <img
                          class="car-img"
                          :src="item.imageUrl[0]"
                          v-if="item.imageUrl.length"
                        />
                        <div
                          v-else
                          class="upload-car-img"
                          @click="
                            changeCarImg(item.id, item.carType, item.imageUrl)
                          "
                        >
                          上传图片
                        </div>
                      </div>
                    </template>
                    <div class="car-type-name">{{ item.carType }}</div>
                  </div>
                  <div class="right">
                    <div class="text">
                      {{ item.open ? "关闭车系" : "开放车系" }}
                    </div>
                    <el-switch
                      v-model="item.open"
                      :disabled="item.typeSwitch == 0"
                      :active-value="1"
                      :inactive-value="0"
                      @change="(e) => changeOpenStatus(e, item.id)"
                    >
                    </el-switch>
                    <div class="link-item" @click="syncCarType(item.carType)">
                      同步车型
                    </div>
                    <div
                      class="link-item"
                      @click="
                        changeCarType(
                          item.id,
                          item.carType,
                          item.seriesTypeList
                        )
                      "
                    >
                      车系类型
                    </div>
                    <div
                      class="link-item"
                      @click="
                        viewCarTypesDialog(item.id, item.carType, item.open)
                      "
                    >
                      查看车型
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传品牌logo -->
    <UploadBrandLogoDialog
      v-if="showUploadBrandLogoDialog"
      :showUploadBrandLogoDialog.sync="showUploadBrandLogoDialog"
      :uploadBrandId="uploadBrandId"
      :uploadBrandName="uploadBrandName"
      :bigLogo="bigLogo"
      :smallLogo="smallLogo"
      @logoSaveSuccess="logoSaveSuccess"
    />

    <!-- 上传车辆图片 -->
    <UploadCarImgDialog
      v-if="showUploadCarImgDialog"
      :showUploadCarImgDialog.sync="showUploadCarImgDialog"
      :uploadCarTypeId="uploadCarTypeId"
      :uploadBrandName="currentBrandName"
      :uploadCarTypeName="uploadCarTypeName"
      :carImageLists="imageLists"
      @carImgSaveSuccess="carImgSaveSuccess"
    />

    <!-- 修改车系类型 -->
    <ChangeCarTypeDialog
      v-if="showChangeCarTypeDialog"
      :showChangeCarTypeDialog.sync="showChangeCarTypeDialog"
      :uploadCarTypeId="uploadCarTypeId"
      :uploadBrandName="currentBrandName"
      :uploadCarTypeName="uploadCarTypeName"
      :seriesTypeList="seriesTypeList"
      @changeCarTypeSuccess="changeCarTypeSuccess"
    />

    <!-- 查看车型 -->
    <CarTypesDialog
      v-if="showCarTypesDialog"
      :showCarTypesDialog.sync="showCarTypesDialog"
      :uploadCarTypeId="uploadCarTypeId"
      :uploadBrandName="currentBrandName"
      :uploadCarTypeName="uploadCarTypeName"
      :uploadCarOpenStatus="uploadCarOpenStatus"
      :carType="carType"
    />
  </div>
</template>

<script>
import {
  getBrandList,
  getCarTypeList,
  openOrCloseCarType,
  syncCarType,
  judgeSpiderCarInfoCompleted,
} from "@/api/goods/goods";
import { SYNC_CAR_TYPE_TIME } from "@/utils/constant";
import UploadBrandLogoDialog from "./components/UploadBrandLogoDialog.vue";
import UploadCarImgDialog from "./components/UploadCarImgDialog.vue";
import ChangeCarTypeDialog from "./components/ChangeCarTypeDialog.vue";
import CarTypesDialog from "./components/CarTypesDialog.vue";

export default {
  name: "CarProductTypeManage",

  components: {
    UploadBrandLogoDialog,
    UploadCarImgDialog,
    ChangeCarTypeDialog,
    CarTypesDialog,
  },

  props: {
    carType: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      // 品牌
      isInitLoader: true,
      letters: [],
      currentFilterLetter: "",
      brandsList: [],
      hoverBrandId: "",
      showUploadBrandLogoDialog: false,
      uploadBrandId: null,
      uploadBrandName: "",
      bigLogo: "",
      smallLogo: "",
      brandScrollTop: 0,

      // 车型
      filter: 2, // 0.不开放，1.开放 2.全部
      currentBrandId: null,
      currentBrandName: null,
      carTypeList: [],
      filterCarTypeList: [],
      hoverCarTypeId: "",
      showUploadCarImgDialog: false,
      uploadCarTypeId: null,
      uploadCarTypeName: "",
      imageLists: [],
      syncLoading: false,
      carTypeErrorMsg: "",
      carTypeScrollTop: 0,

      // 车系类型dialog
      seriesTypeList: [], // 车系类型 0.新能源车，1.平行进口车，2.国产车
      showChangeCarTypeDialog: false,

      // 查看车型
      showCarTypesDialog: false,
      uploadCarOpenStatus: 0,
    };
  },

  mounted() {
    this.init();
  },

  activated() {
    this.getBrandList();

    this.$refs.carTypeBox.scrollTo({
      top: this.carTypeScrollTop,
    });
  },

  methods: {
    async init() {
      await this.getBrandList();
      this.getCarTypeList(this.brandsList[0].id, this.brandsList[0].brandName);
    },

    scrollToLetter(item) {
      this.currentFilterLetter = item.letter;
      const scrollTop = this.letters.find(
        (letter) => letter.letter === item.letter
      ).scrollTop;
      this.$refs.letterBox.scrollTo({
        top: scrollTop,
      });
    },

    handlerScroll(e) {
      const scrollTop = e.target.scrollTop;
      this.brandScrollTop = scrollTop;
      let curLetter = "";
      for (const item of this.letters) {
        if (scrollTop >= item.scrollTop - 100) {
          curLetter = item.letter;
        }
      }
      this.currentFilterLetter = curLetter;
    },

    handlerCarTypeBoxScroll(e) {
      const scrollTop = e.target.scrollTop;
      this.carTypeScrollTop = scrollTop;
    },

    // 查询品牌列表
    async getBrandList() {
      let data = {
        letter: "",
      };
      await getBrandList(data).then((res) => {
        if (res.code == 0) {
          let curLetter = "";
          res.data.forEach((item) => {
            if (item.letter === curLetter) {
              item.letter = "";
            } else {
              curLetter = item.letter;
              if (this.isInitLoader) {
                this.letters.push({
                  letter: item.letter,
                  scrollTop: 0,
                });
              }
            }
          });
          this.brandsList = res.data;
          this.isInitLoader = false;

          this.$nextTick(() => {
            this.letters.forEach((item) => {
              const scrollTop = this.$refs["letter" + item.letter][0].offsetTop;
              item.scrollTop = scrollTop - 172;
            });

            if (!this.currentFilterLetter) {
              this.currentFilterLetter = this.letters[0].letter;
            }

            this.$refs.letterBox.scrollTo({
              top: this.brandScrollTop,
            });
          });
        }
      });
    },

    // 查询车系列表
    getCarTypeList(brandId, brandName) {
      this.currentBrandId = brandId;
      this.currentBrandName = brandName;
      let data = {
        brandId,
      };
      this.carTypeErrorMsg = "";
      getCarTypeList(data).then((res) => {
        if (res.code == 0 && res.data && res.data.length) {
          this.carTypeList = res.data;
          this.getFilterCarTypeList();
        } else {
          this.filterCarTypeList = [];
          this.carTypeErrorMsg = "暂无车系";
        }
      });
    },

    getFilterCarTypeList() {
      // 0.不开放，1.开放 2.全部
      if (this.filter === 2) {
        this.filterCarTypeList = this.carTypeList;
      } else {
        this.filterCarTypeList = this.carTypeList.filter(
          (item) => item.open === this.filter
        );
      }
    },

    changeHoverLetter(id) {
      this.hoverBrandId = id;
    },

    changeHoverCarType(id) {
      this.hoverCarTypeId = id;
    },

    changeBrandLogo(id, brandName, logoUrl, logoUrlSmall) {
      this.uploadBrandId = id;
      this.uploadBrandName = brandName;
      this.bigLogo = logoUrl;
      this.smallLogo = logoUrlSmall;
      this.showUploadBrandLogoDialog = true;
    },

    changeCarImg(id, carTypeName, imageLists) {
      this.uploadCarTypeId = id;
      this.uploadCarTypeName = carTypeName;
      this.imageLists = imageLists;
      this.showUploadCarImgDialog = true;
    },

    changeCarType(id, carTypeName, seriesTypeList) {
      this.uploadCarTypeId = id;
      this.uploadCarTypeName = carTypeName;
      this.seriesTypeList = seriesTypeList;
      this.showChangeCarTypeDialog = true;
    },

    viewCarTypesDialog(id, carTypeName, open) {
      this.uploadCarTypeId = id;
      this.uploadCarTypeName = carTypeName;
      this.uploadCarOpenStatus = open;
      this.showCarTypesDialog = true;
    },

    logoSaveSuccess() {
      this.getBrandList(this.currentFilterLetter);
    },

    carImgSaveSuccess() {
      this.getCarTypeList(this.currentBrandId, this.currentBrandName);
    },

    changeCarTypeSuccess() {
      this.getCarTypeList(this.currentBrandId, this.currentBrandName);
    },

    changeOpenStatus(e, carTypeId) {
      let data = {
        open: e,
        carTypeId,
      };

      openOrCloseCarType(data)
        .then((res) => {
          if (res.code == 0) {
            this.getBrandList(this.currentFilterLetter);
            this.getCarTypeList(this.currentBrandId, this.currentBrandName);
          } else {
            this.$message.error("设置失败");
          }
        })
        .catch(() => {
          this.$message.error("设置失败");
        });
    },

    syncCarType(carType = "") {
      const data = {
        carType,
        carBrand: this.currentBrandName,
        allDataOrLackData: 2,
      };

      this.syncLoading = true;

      syncCarType(data)
        .then((res) => {
          if (res.code == 0) {
            setTimeout(() => {
              this.judgeSpiderCarInfoCompleted(res.data);
            }, SYNC_CAR_TYPE_TIME);
          } else {
            this.$message.error("车型同步失败");
          }
        })
        .catch(() => {
          this.$message.error("车型同步失败");
        });
    },

    judgeSpiderCarInfoCompleted(key) {
      const params = {
        key,
      };
      judgeSpiderCarInfoCompleted(params).then((res) => {
        if (res.data == 1) {
          this.$message.success("车型同步成功");
          this.syncLoading = false;
        } else {
          setTimeout(() => {
            this.judgeSpiderCarInfoCompleted(key);
          }, SYNC_CAR_TYPE_TIME);
        }
      });
    },

    setCarDeliveryAddress(brandId) {
      this.$router.push({
        path: "/goods/setCarDeliveryAddress",
        query: {
          brandId,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-wrap {
  min-width: 1244px;
  padding: 22px 32px 140px;
  .deficiency-params-wrap {
    margin-bottom: 38px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    line-height: 22px;
    color: #ff0000;
    text-align: right;
    .deficiency-params {
      border-bottom: 2px solid #ff0000;
      cursor: pointer;
    }
  }
  .product-box {
    display: flex;
    justify-content: center;
  }
  .products-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .box {
      height: 518px;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      .header-wrap {
        .header {
          margin: 0 16px;
          height: 46px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #d8d8d8;
        }
      }
      .content-wrap {
        flex: 1;
        overflow-y: auto;
        padding-bottom: 50px;
      }
    }
    .box1 {
      min-width: 537px;
      .header {
        .title {
          font-size: 14px;
          color: #818181;
        }
        .letter-wrap {
          display: flex;
          .letter {
            padding-left: 6px;
            font-size: 16px;
            color: #34548e;
            cursor: pointer;
            &.active-letter {
              color: #ff0000;
            }
          }
        }
      }
      .brand-wrap {
        .letter {
          padding: 7px 0 5px 24px;
          font-size: 14px;
          color: #ff0000;
        }
        .brand {
          padding: 0 15px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: default;
          .left {
            display: flex;
            align-items: center;
          }
          &.active-brand {
            background: #eeeeee;
          }
          .logo-wrap {
            width: 53px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .change-logo {
              position: absolute;
              top: 0;
              left: 0;
              width: 53px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 2px;
              background: rgba(0, 0, 0, 0.8);
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #ffffff;
              cursor: pointer;
            }
            .logo {
              width: 35px;
              height: 35px;
            }
            .upload-logo {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #ff8f1f;
              cursor: pointer;
            }
          }
          .brand-name {
            padding-left: 37px;
            width: 170px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #585858;
          }
          .right {
            padding-left: 20px;
            display: flex;
          }
          .type {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #6a6a6a;
          }

          .link-item {
            margin-left: 12px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #3446aa;
            cursor: pointer;
          }

          .point-wrap {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #3446aa;
          }
        }
      }
    }
    .box2 {
      min-width: 551px;
      .sync-type {
        width: 88px;
        height: 32px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f0592e;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
      }
      .car-type {
        min-height: 60px;
        display: flex;
        align-items: center;
        .left {
          padding-left: 19px;
          padding-right: 10px;
          display: flex;
          align-items: center;
          .tip-icon {
            width: 14px;
            .el-icon-warning-outline {
              font-size: 14px;
              color: #fa5151;
            }
          }
          .car-img-wrap {
            margin-left: 5px;
            margin-right: 16px;
            width: 69px;
            height: 51px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .change-car-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 2px;
              background: rgba(0, 0, 0, 0.8);
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #ffffff;
              cursor: pointer;
            }
            .car-img {
              width: 100%;
            }
            .upload-car-img {
              font-family: PingFangSC-Medium;
              font-size: 12px;
              color: #ff8f1f;
              cursor: pointer;
            }
          }
          .car-type-name {
            width: 100px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            line-height: 22px;
            color: #3d3d3d;
          }
        }
        .right {
          padding-right: 20px;
          display: flex;
          align-items: center;
          .text {
            margin-right: 6px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3d3d3d;
          }
          .link-item {
            margin-left: 12px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #3446aa;
            cursor: pointer;
          }
        }
      }
    }
    .split-arrow {
      margin: 0 30px;
      color: #767676;
      font-size: 32px;
      font-weight: 600;
    }
  }
}
</style>
