<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >车辆详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="form-wrap">
        <el-form
          v-if="detail"
          class="add-form"
          :model="detail"
          :rules="rules"
          label-width="auto"
        >
          <el-form-item label="车型" prop="carTypeYearProductId">
            {{ detail.carBrand }}·{{ detail.carType }}
            {{ detail.carTypeYear }}
            {{ detail.carTypeYearProduct }}
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
            {{
              currentCityReq.money
                ? `${formatThousandNumber(currentCityReq.money)}元/天`
                : "-"
            }}
          </el-form-item>
        </el-form>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { getAllCity } from "@/api/subscribe/subscribe";
import { addOrUpdateCar, getCarDetail } from "@/api/rental/car";

export default {
  data() {
    return {
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
      allCitys: [],
    };
  },
  mounted() {
    this.detail.id = this.$route.query.carId;
    this.getDetail();
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
  },
};
</script>

<style lang="less" scoped>
.item-title {
  width: 120px;
  text-align: right;
}
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
