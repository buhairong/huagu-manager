<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >会员租车</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content" v-if="detail">
      <div class="title">{{ type == 1 ? "创建" : "修改" }}方案</div>

      <div class="form-item">
        <div class="form-label">选择车型</div>
        <div class="form-content">
          <SelectCarProduct
            :carTypeYearProductId="detail.carTypeYearProductId"
            :disabled="type == 2"
            :carEntity="carInfo"
            @changeCarProduct="changeCarProduct"
          />
        </div>
      </div>

      <div class="form-item">
        <div class="form-label">新车指导价</div>
        <div class="form-content">
          <c-input-number
            :inputValue.sync="detail.guidancePrice"
            placeholder="请输入车辆指导价"
          >
          </c-input-number>
          元
        </div>
      </div>

      <div class="form-item">
        <div class="form-label">通用城市</div>
        <div class="form-content">
          <CitySubscribe
            :citySubscribeReq="detail.citySubscribeReq"
            :defaultCitySubscribe="defaultCitySubscribe"
            @change="change"
            @changeCity="changeCity"
          />
        </div>
      </div>

      <div class="form-title">租车押金</div>
      <div class="form-item">
        <div class="form-label">租车押金</div>
        <div class="form-content">
          <el-radio-group v-model="currentCity.type" v-if="businessType == 1">
            <el-radio
              v-for="item in typeList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <c-input-number
            v-else-if="businessType == 2"
            :inputValue.sync="currentCity.deposit"
            placeholder="请输入车辆押金"
          >
          </c-input-number>
          元
        </div>
      </div>

      <div class="form-item" v-if="businessType == 1">
        <div class="form-label">押金为</div>
        <div class="form-content">
          <div v-show="currentCity.type === 1">
            <c-select
              :selectValue.sync="currentCity.month"
              :options="monthList"
              :showAllValue="false"
              placeholder="请选择月数"
            />
            的车辆租金
          </div>
          <div v-show="currentCity.type === 2">
            <c-input-number
              :inputValue.sync="currentCity.deposit"
              placeholder="请输入车辆押金"
            >
            </c-input-number>
            元
          </div>
        </div>
      </div>

      <div class="form-title">车辆租金</div>
      <div v-for="item in currentCity.typeReqVos" :key="item.period">
        <div class="form-sub-title" v-if="businessType == 1">
          {{ item.period }}天套餐
        </div>
        <div class="form-item" v-if="businessType == 1">
          <div class="form-label">租赁周期</div>
          <div class="form-content">{{ item.period }}天</div>
        </div>
        <div class="form-item">
          <div class="form-label">车辆租金</div>
          <div class="form-content">
            <c-input-number
              :inputValue.sync="item.money"
              placeholder="请输入车辆租金"
            >
            </c-input-number>
            元/{{ businessType == 1 ? "月" : "天" }}
          </div>
        </div>
      </div>

      <div class="form-title">逾期还车违约金</div>
      <div class="form-item">
        <div class="form-label">逾期还车违约金</div>
        <div class="form-content">
          <c-input-number
            :inputValue.sync="currentCity.contractDamages"
            placeholder="请输入逾期还车违约金"
          >
          </c-input-number>
          元/天
        </div>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">取消</div>
        <div class="btn save-btn" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCarRental, getCarRentalDetail } from "@/api/carRental/carRental";
import { formatThousandNumber } from "@/utils/util";
import { CAR_RENTAL_PERIOD_LIST } from "@/utils/constant";
import SelectCarProduct from "./components/SelectCarProduct.vue";
import CitySubscribe from "./components/CitySubscribe.vue";

const defaultCitySubscribe = () => ({
  cityId: 0, // 城市Id  0代表全部城市
  cityName: "", // 城市名称  空字符串代表全部城市
  type: 1, // 租车押金类型 1.车辆租金  2. 自定义金额
  month: 0, // 月数
  deposit: undefined, // 车辆押金
  contractDamages: undefined, // 违约金
  guidancePrice: undefined,
  typeReqVos: JSON.parse(JSON.stringify(CAR_RENTAL_PERIOD_LIST)),
});

const defaultDetail = () => ({
  id: null,
  businessType: 1, // 1.折扣长租 2.随用随还
  carTypeYearProductId: null, // 车型Id
  citySubscribeReq: [defaultCitySubscribe()],
});

export default {
  name: "setCarRental",

  components: {
    SelectCarProduct,
    CitySubscribe,
  },

  data() {
    return {
      CAR_RENTAL_PERIOD_LIST,
      defaultCitySubscribe: defaultCitySubscribe(),
      businessType: null,
      type: null,
      carRentalId: null,
      detail: null,
      currentCity: {},
      carInfo: {},
      typeList: [
        { value: 1, label: "车辆租金" },
        { value: 2, label: "自定义金额" },
      ],
      monthList: [
        { value: 1, label: "1个月" },
        { value: 2, label: "2个月" },
        { value: 3, label: "3个月" },
        { value: 4, label: "4个月" },
        { value: 5, label: "5个月" },
        { value: 6, label: "6个月" },
        { value: 7, label: "7个月" },
        { value: 8, label: "8个月" },
        { value: 9, label: "9个月" },
        { value: 10, label: "10个月" },
        { value: 11, label: "11个月" },
        { value: 12, label: "12个月" },
      ],
    };
  },

  mounted() {
    this.type = this.$route.query.type;
    this.businessType = this.$route.query.businessType;
    if (this.type == 1) {
      this.detail = defaultDetail();
      this.detail.businessType = this.businessType;

      if (this.businessType == 2) {
        this.defaultCitySubscribe.typeReqVos = [
          { value: 1, label: "1天", period: 1, money: undefined },
        ];
        this.detail.citySubscribeReq = [
          JSON.parse(JSON.stringify(this.defaultCitySubscribe)),
        ];
      }

      this.currentCity = this.detail.citySubscribeReq[0];
    } else {
      this.carRentalId = this.$route.query.carRentalId;
      this.defaultCitySubscribe.typeReqVos = [
        { value: 1, label: "1天", period: 1, money: undefined },
      ];
      this.getCarRentalDetail();
    }
  },

  methods: {
    getCarRentalDetail() {
      const data = {
        id: this.carRentalId,
      };

      getCarRentalDetail(data).then((res) => {
        if (res.code === 0) {
          this.detail = {
            ...res.data,
            id: this.carRentalId,
            guidancePrice: res.data.carTypeYearProductEntity.guidancePrice,
          };

          this.carInfo = this.detail.carTypeYearProductEntity;

          this.detail.citySubscribeReq.map((city) => {
            if (this.businessType == 1) {
              let typeReqVos = JSON.parse(
                JSON.stringify(CAR_RENTAL_PERIOD_LIST)
              );
              typeReqVos = typeReqVos.map((type) => {
                const findItem = city.typeReqVos.find(
                  (period) => period.period === type.period
                );
                if (findItem) {
                  type = findItem;
                }
                return type;
              });
              city.typeReqVos = typeReqVos;
            } else {
            }

            return city;
          });

          this.currentCity = this.detail.citySubscribeReq[0];
        }
      });
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    changeCarProduct(data) {
      this.carInfo = data;
      this.detail.guidancePrice = this.carInfo.guidancePrice;
      this.detail.carTypeYearProductId = data.id;
    },

    change(data) {
      this.detail.citySubscribeReq = data;
    },

    changeCity(data) {
      this.currentCity = data;
    },

    back() {
      this.$router.back();
    },

    save() {
      if (!this.detail.carTypeYearProductId) {
        this.$message.error("请选择车型");
        return;
      }

      for (const item of this.detail.citySubscribeReq) {
        const cityName = item.cityName || "全部城市";
        // if (item.type === 1 && !item.month) {
        //   this.$message.error(`请选择 ${cityName} 的租车押金月数`)
        //   return
        // }

        if (item.type === 2 && !item.deposit) {
          this.$message.error(`请输入 ${cityName} 的租车押金`);
          return;
        }

        const result = item.typeReqVos.some((period) => period.money);
        if (!result) {
          this.$message.error(`请输入 ${cityName} 的套餐车辆租金`);
          return;
        }

        if (!item.contractDamages) {
          this.$message.error(`请输入 ${cityName} 的逾期还车违约金`);
          return;
        }
      }

      for (const item of this.detail.citySubscribeReq) {
        item.typeReqVos = item.typeReqVos.filter((period) => period.money);
      }

      if (!this.detail.guidancePrice) {
        this.detail.guidancePrice = this.carInfo.guidancePrice;
      }

      setCarRental(this.detail)
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
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 32px;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.9);
}

.form-title {
  margin: 30px 0;
  margin-left: 50px;
  width: 140px;
  height: 32px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 32px;
  color: #1d2129;
  text-align: right;
}

.form-sub-title {
  margin-left: 150px;
  margin-top: 30px;
  margin-bottom: 22px;
  width: 80px;
  height: 22px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 22px;
  color: #1d2129;
  text-align: right;
}

.form-item {
  margin-left: 200px;
  padding-bottom: 16px;
  display: flex;
  line-height: 32px;
  .form-label {
    padding-right: 12px;
    width: 120px;
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4e5969;
  }
}
</style>
