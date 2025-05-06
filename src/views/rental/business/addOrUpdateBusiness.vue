<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>商务活动</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >{{ type === "add" ? "添加" : "编辑" }}活动</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="form-wrap">
        <el-form
          class="add-form"
          ref="formRef"
          :model="detail"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="城市" prop="cityId">
            <el-select
              value-key="id"
              placeholder="选择城市"
              v-model="detail.cityName"
              @change="changeCity"
            >
              <el-option
                v-for="item in allCitys"
                :key="item.id"
                :label="item.city"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动类型" prop="businessActivityType">
            <c-select
              :selectValue.sync="detail.businessActivityType"
              :options="BUSINESS_ACTIVITY_LIST"
              :showAllValue="false"
            />
          </el-form-item>

          <el-form-item label="活动名称" prop="siteName">
            <c-input
              :inputValue.sync="detail.siteName"
              placeholder="请输入活动名称"
              :maxlength="40"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="活动地址" prop="address">
            <c-input
              :inputValue.sync="detail.address"
              placeholder="请输入活动地址"
              :maxlength="100"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="活动价格" prop="money">
            <div class="sub">
              <c-input-number
                :inputValue.sync="detail.money"
                placeholder="请输入活动价格"
              >
              </c-input-number
              >&nbsp;&nbsp; 元/小时
            </div>
          </el-form-item>

          <el-form-item label="上传背景图片" prop="backImage">
            <el-upload
              :action="UPLOAD_URL"
              :show-file-list="false"
              :accept="IMG_ACCEPT"
              :before-upload="beforeImgUpload"
              :on-success="handleSuccessBackImage"
            >
              <img
                v-if="detail.backImage"
                :src="detail.backImage"
                style="width: 100%"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="活动场地介绍" prop="introduction">
            <c-text-area
              :inputValue.sync="detail.introduction"
              placeholder="请输入活动场地介绍~最多可输入100个字"
            />
          </el-form-item>

          <el-form-item label="上传活动场地图片" prop="imageList">
            <div class="img-wrap">
              <div
                class="img"
                v-for="(img, index) in detail.imageList"
                :key="index"
              >
                <el-image
                  style="width: 100%; height: 100%"
                  :src="img"
                  fit="cover"
                ></el-image>
                <div class="del-icon" @click="delImg(index)">
                  <i class="el-icon-error" style="font-size: 20px"></i>
                </div>
              </div>
              <el-upload
                class="image-list-upload"
                multiple
                :action="UPLOAD_URL"
                :show-file-list="false"
                :accept="IMG_ACCEPT"
                :before-upload="beforeImgUpload"
                :on-success="handleSuccess"
              >
                <div class="upload">
                  <div>
                    <i
                      class="el-icon-plus"
                      style="color: #fff; font-size: 20px; font-weight: 600"
                    ></i>
                  </div>
                  <div class="upload-tip">点击上传活动场地图片</div>
                </div>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">取消</div>
        <div class="btn save-btn" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { getAllCity } from "@/api/subscribe/subscribe";
import { getBusinessDetail, addOrUpdateBusiness } from "@/api/rental/business";
import {
  BUSINESS_ACTIVITY_LIST,
  BUSINESS_ACTIVITY_STATUS,
} from "@/utils/constant";
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from "@/utils/constant";

export default {
  data() {
    return {
      type: "",
      detail: {
        id: undefined,
        cityId: "",
        cityName: "",
        businessActivityType: undefined,
        siteName: "",
        address: "",
        money: undefined,
        backImage: "",
        introduction: "",
        imageList: [],
      },
      rules: {
        cityId: [
          {
            required: true,
            message: "请选择城市",
            trigger: "blur",
          },
        ],
        businessActivityType: [
          {
            required: true,
            message: "请选择活动类型",
            trigger: "blur",
          },
        ],
        siteName: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入活动地址",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "请输入活动价格",
            trigger: "blur",
          },
        ],
        backImage: [
          {
            required: true,
            message: "请上传背景图片",
            trigger: "blur",
          },
        ],
      },
      allCitys: [],
      BUSINESS_ACTIVITY_LIST,
      BUSINESS_ACTIVITY_STATUS,
      UPLOAD_URL,
      IMG_ACCEPT,
    };
  },
  mounted() {
    this.type = this.$route.query.type;

    if (this.type === "edit") {
      this.detail.id = this.$route.query.id;
      this.getDetail();
    }

    this.getAllCity();
  },
  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    back() {
      this.$router.back();
    },

    getDetail() {
      const params = {
        id: this.detail.id,
      };
      getBusinessDetail(params).then((res) => {
        this.detail = {
          ...res.data,
          businessActivityType: res.data.businessActivityType - 0,
        };
      });
    },

    getAllCity() {
      getAllCity().then((res) => {
        if (res.code === 0) {
          this.allCitys = res.data;
        }
      });
    },

    changeCity(e) {
      this.detail.cityId = e.id;
      this.detail.cityName = e.city;
    },

    beforeImgUpload(file) {
      const size = file.size / 1024 / 1024;

      if (size > IMG_LIMIT_SIZE) {
        this.$message.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`);
        return false;
      }

      return true;
    },

    handleSuccessBackImage(res) {
      if (res.code == 0) {
        this.detail.backImage = res.data.src;
      }
    },

    handleSuccess(res) {
      if (res.code == 0) {
        this.detail.imageList.push(res.data.src);
      }
    },

    delImg(index) {
      this.$confirm(`确定要删除这张图片吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.detail.imageList.splice(index, 1);
      });
    },

    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          addOrUpdateBusiness(this.detail)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("保存成功");
                this.back();
              } else {
                this.$message.error("保存失败");
              }
            })
            .catch((err) => {
              this.$message.error("保存失败");
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.img-wrap {
  display: flex;
  flex-wrap: wrap;
}

.img {
  margin-right: 8px;
  margin-bottom: 8px;
  width: 200px;
  height: 200px;
  position: relative;
  .del-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

.image-list-upload {
  ::v-deep .el-upload {
    border: none;
    width: 200px;
    height: 200px;
  }

  .upload {
    width: 100%;
    height: 100%;
    background-color: rgba(10, 15, 45, 0.7);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .upload-tip {
      margin-top: 12px;
      font-family: PingFang SC;
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
