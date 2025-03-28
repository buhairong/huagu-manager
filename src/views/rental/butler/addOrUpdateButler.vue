<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>管家管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >{{ type === "add" ? "添加" : "编辑" }}管家</el-breadcrumb-item
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

          <el-form-item label="姓名" prop="name">
            <c-input
              :inputValue.sync="detail.name"
              placeholder="请输入姓名"
              :maxlength="20"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="detail.sex">
              <el-radio
                v-for="item in SEX_LIST"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <c-input
              :inputValue.sync="detail.mobile"
              placeholder="请输入手机号"
              :maxlength="20"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="学历" prop="education">
            <c-select
              :selectValue.sync="detail.education"
              :options="EDUCATION_LIST"
              :showAllValue="false"
              clearable
            />
          </el-form-item>

          <el-form-item label="身份证号码" prop="idcard">
            <c-input
              :inputValue.sync="detail.idcard"
              placeholder="请输入身份证号码"
              :maxlength="18"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="管家介绍" prop="introduce">
            <c-text-area
              :inputValue.sync="detail.introduce"
              placeholder="请输入管家介绍~最多可输入100个字"
            />
          </el-form-item>

          <el-form-item label="上传身份证正面图片" prop="idcardUrl">
            <el-upload
              :action="UPLOAD_URL"
              :show-file-list="false"
              :accept="IMG_ACCEPT"
              :before-upload="beforeImgUpload"
              :on-success="(res) => handleSuccess('idcardUrl', res)"
            >
              <img
                v-if="detail.idcardUrl"
                :src="detail.idcardUrl"
                style="width: 100%"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="上传身份证反面图片" prop="idcardBackUrl">
            <el-upload
              :action="UPLOAD_URL"
              :show-file-list="false"
              :accept="IMG_ACCEPT"
              :before-upload="beforeImgUpload"
              :on-success="(res) => handleSuccess('idcardBackUrl', res)"
            >
              <img
                v-if="detail.idcardBackUrl"
                :src="detail.idcardBackUrl"
                style="width: 100%"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="照片" prop="imageUrl">
            <el-upload
              :action="UPLOAD_URL"
              :show-file-list="false"
              :accept="IMG_ACCEPT"
              :before-upload="beforeImgUpload"
              :on-success="(res) => handleSuccess('imageUrl', res)"
            >
              <img
                v-if="detail.imageUrl"
                :src="detail.imageUrl"
                style="width: 100%"
              />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
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
import { addOrUpdateButler, getButlerDetail } from "@/api/rental/butler";
import {
  SEX_STATUS,
  SEX_LIST,
  EDUCATION_LIST,
  EDUCATION_STATUS,
} from "@/utils/constant";
import { phoneReg } from "@/utils/validate";
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from "@/utils/constant";

export default {
  data() {
    return {
      type: "",
      detail: {
        id: undefined,
        name: "",
        sex: undefined,
        mobile: "",
        imageUrl: "",
        idcard: "",
        idcardUrl: "",
        idcardBackUrl: "",
        education: "",
        cityId: "",
        cityName: "",
        introduce: "",
      },
      rules: {
        cityId: [
          {
            required: true,
            message: "请选择城市",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: phoneReg,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        education: [
          {
            required: true,
            message: "请选择学历",
            trigger: "blur",
          },
        ],
        idcard: [
          {
            required: true,
            message: "请输入身份证号码",
            trigger: "blur",
          },
        ],
        introduce: [
          {
            required: true,
            message: "请输入管家介绍",
            trigger: "blur",
          },
        ],
        idcardUrl: [
          {
            required: true,
            message: "请上传身份证正面图片",
            trigger: "blur",
          },
        ],
        idcardBackUrl: [
          {
            required: true,
            message: "请上传身份证反面图片",
            trigger: "blur",
          },
        ],
        imageUrl: [
          {
            required: true,
            message: "请上传照片",
            trigger: "blur",
          },
        ],
      },
      allCitys: [],
      SEX_STATUS,
      SEX_LIST,
      EDUCATION_LIST,
      EDUCATION_STATUS,
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
      getButlerDetail(params).then((res) => {
        this.detail = {
          ...res.data,
        };
        if (res.data.education) {
          this.detail.education = res.data.education - 0;
        }
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

    handleSuccess(field, res) {
      if (res.code == 0) {
        this.detail[field] = res.data.src;
      }
    },

    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          addOrUpdateButler(this.detail)
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

<style lang="less" scoped></style>
