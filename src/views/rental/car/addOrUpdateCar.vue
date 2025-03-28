<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >{{ type === "add" ? "添加" : "编辑" }}车辆</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="form-wrap">
        <el-form
          class="add-form"
          :model="detail"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="适用车型" prop="carTypeYearProductId">
            <div class="sub" v-if="type === 'add'">
              <c-select
                :selectValue.sync="detail.carBrandId"
                :options="brandList"
                :showAllValue="false"
                placeholder="选择品牌"
                style="margin-right: 20px"
                labelKey="brandName"
                valueKey="id"
                @change="changeCarBrand"
              />
              <c-select
                :selectValue.sync="detail.carTypeId"
                :options="typeList"
                :showAllValue="false"
                placeholder="选择车系"
                style="margin-right: 20px"
                :selectStyle="{
                  width: '200px',
                }"
                labelKey="carType"
                valueKey="id"
                @change="changeCarType"
              />
              <c-select
                :selectValue.sync="detail.carTypeYearId"
                :options="yearList"
                :showAllValue="false"
                placeholder="选择年款"
                style="margin-right: 20px"
                labelKey="year"
                valueKey="id"
                @change="changeCarTypeYear"
              />
              <c-select
                :selectValue.sync="detail.carTypeYearProductId"
                :options="productList"
                :showAllValue="false"
                placeholder="选择型号"
                style="margin-right: 20px"
                :selectStyle="{
                  width: '220px',
                }"
                labelKey="carTypeYearProduct"
                valueKey="id"
                @change="changeCarProduct"
              />
            </div>
            <div class="sub" v-else>
              {{ detail.carBrand }}·{{ detail.carType }}
              {{ detail.carTypeYear }}
              {{ detail.carTypeYearProduct }}
            </div>
          </el-form-item>

          <el-form-item label="新车指导价">
            {{
              detail.guidancePrice
                ? `${formatThousandNumber(detail.guidancePrice)}元`
                : "-"
            }}
          </el-form-item>

          <el-form-item label="城市">
            <div class="sub">
              <div v-for="city in allCitys" :key="city.id" class="city">
                {{ city.city }}
              </div>
            </div>
          </el-form-item>

          <el-form-item label="车辆租金" prop="money">
            <div class="sub">
              <c-input-number
                :inputValue.sync="currentCityReq.money"
                placeholder="请输入车辆租金"
              >
              </c-input-number
              >&nbsp;&nbsp; 元/天
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
import {
  getCarBrand,
  getCarType,
  getCarTypeYear,
  listByCarTypeYearId,
  selectByCarTypeId,
} from "@/api/car/car";
import { formatThousandNumber } from "@/utils/util";
import { getAllCity } from "@/api/subscribe/subscribe";
import { addOrUpdateCar, getCarDetail } from "@/api/rental/car";

export default {
  data() {
    return {
      type: "",
      detail: {
        id: undefined,
        carBrandId: "",
        carBrand: "",
        carTypeId: "",
        carType: "",
        carTypeYearId: "",
        carTypeYear: "",
        carTypeYearProductId: "",
        carTypeYearProduct: "",
        imageUrl: "",
        guidancePrice: "",
        citySubscribeReq: [
          {
            carRentalId: undefined,
            cityId: "0",
            cityName: "",
            carTypeYearProductId: "",
            productGroupId: "",
            period: "1",
            money: undefined,
          },
        ],
      },
      currentCityReq: {},
      rules: {
        carTypeYearProductId: [
          {
            required: true,
            message: "请选择车型",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "请输入车辆租金",
            trigger: "blur",
          },
        ],
      },
      brandList: [],
      typeList: [],
      yearList: [],
      productList: [],
      allCitys: [],
    };
  },
  mounted() {
    this.type = this.$route.query.type;

    if (this.type === "add") {
      this.currentCityReq = this.detail.citySubscribeReq[0];
      this.getCarBrand();
    } else {
      this.detail.id = this.$route.query.carId;
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
      getCarDetail(params).then((res) => {
        this.detail.carBrand = res.data.carTypeYearProductEntity.carBrand;
        this.detail.carType = res.data.carTypeYearProductEntity.carType;
        this.detail.carTypeYear = res.data.carTypeYearProductEntity.carTypeYear;
        this.detail.carTypeYearProduct =
          res.data.carTypeYearProductEntity.carTypeYearProduct;
        this.detail.guidancePrice =
          res.data.carTypeYearProductEntity.guidancePrice;
        this.detail.citySubscribeReq = [...res.data.citySubscribeReq];
        this.currentCityReq = this.detail.citySubscribeReq[0];
      });
    },

    getAllCity() {
      getAllCity().then((res) => {
        if (res.code === 0) {
          this.allCitys = res.data;
        }
      });
    },

    getCarBrand() {
      getCarBrand().then((res) => {
        if (res.code === 0) {
          this.brandList = res.data;
          this.changeCarBrand(this.detail.carBrandId);
        }
      });
    },

    changeCarBrand(e) {
      this.detail.carBrandId = e;
      this.detail.carTypeId = "";
      this.detail.carTypeYearId = "";
      this.detail.carTypeYearProductId = "";
      this.getCarType();
    },

    getCarType() {
      const data = {
        carBrandId: this.detail.carBrandId,
      };

      getCarType(data).then((res) => {
        if (res.code === 0) {
          this.typeList = res.data;
          this.changeCarType(this.detail.carTypeId);
        }
      });
    },

    changeCarType(e) {
      this.detail.carTypeId = e;
      this.detail.carTypeYearId = "";
      this.detail.carTypeYearProductId = "";
      this.getCarTypeYear();
    },

    getCarTypeYear() {
      const data = {
        carTypeId: this.detail.carTypeId,
      };

      getCarTypeYear(data).then((res) => {
        if (res.code === 0) {
          this.yearList = res.data;
          this.changeCarTypeYear(this.detail.carTypeYearId);
        }
      });
    },

    changeCarTypeYear(e) {
      this.detail.carTypeYearId = e;
      this.detail.carTypeYearProductId = "";
      this.listByCarTypeYearId();
    },

    listByCarTypeYearId() {
      const data = {
        carTypeYearId: this.detail.carTypeYearId,
      };

      listByCarTypeYearId(data).then((res) => {
        if (res.code === 0) {
          this.productList = res.data;
          this.changeCarProduct(this.detail.carTypeYearProductId);
        }
      });
    },

    changeCarProduct(e) {
      this.detail.carTypeYearProductId = e;
      this.detail.citySubscribeReq[0].carTypeYearProductId =
        this.detail.carTypeYearProductId;
      const product = this.productList.find((item) => item.id === e);
      if (product) {
        this.detail.guidancePrice = product.guidancePrice;
        this.detail.carBrand = product.carBrand;
        this.detail.carType = product.carType;
        this.detail.carTypeYear = product.carTypeYear;
        this.detail.carTypeYearProduct = product.carTypeYearProduct;
        this.detail.imageUrl = product.imageUrl;
      }
    },

    save() {
      if (this.type === "add") {
        if (!this.detail.carTypeYearProductId) {
          this.$message.error("请选择车型");
          return;
        }
      }

      if (!this.currentCityReq.money) {
        this.$message.error("请输入车辆租金");
        return;
      }

      addOrUpdateCar(this.detail)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.back();
          } else {
            this.$message.error(res.msg || "保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.sub {
  .city {
    margin-right: 16px;
    height: 28px;
    line-height: 28px;
    border-radius: 2px;
    display: flex;
    padding: 0 6px;
    background: #f2f3f5;
    color: #848484;
    font-size: 14px;
    cursor: default;
  }
  .active-city {
    border: 1px solid #3446aa;
  }
}

:deep(.el-form-item__error) {
  display: none;
}
</style>
