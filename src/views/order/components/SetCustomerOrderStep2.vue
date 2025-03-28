<template>
  <el-form ref="step2form" :model="detail" :rules="rules" label-width="150px">
    <el-form-item label="输入车型" prop="carFullName">
      <c-input
        :inputValue.sync="detail.carFullName"
        placeholder="请输入输入车型"
        :inputStyle="{
          width: '300px',
        }"
      />
      <!-- <c-select
        :selectValue.sync="detail.carBrandId"
        :options="brandList"
        :showAllValue="false"
        placeholder="选择品牌"
        style="margin-right: 10px"
        labelKey="brandName"
        valueKey="id"
        @change="changeCarBrand"
      />
      <c-select
        :selectValue.sync="detail.carTypeId"
        :options="typeList"
        :showAllValue="false"
        placeholder="选择车系"
        style="margin-right: 10px"
        labelKey="carType"
        valueKey="id"
        @change="changeCarType"
      />
      <c-select
        :selectValue.sync="detail.carTypeYearId"
        :options="yearList"
        :showAllValue="false"
        placeholder="选择年款"
        style="margin-right: 10px"
        labelKey="year"
        valueKey="id"
        @change="changeCarTypeYear"
      />
      <c-select
        :selectValue.sync="detail.carTypeYearProductId"
        :options="productList"
        :showAllValue="false"
        placeholder="选择型号"
        :selectStyle="{
          width: '198px',
        }"
        labelKey="carTypeYearProduct"
        valueKey="id"
        @change="changeCarProduct"
      /> -->
    </el-form-item>

    <el-form-item label="厂商指导价" prop="guidancePrice">
      <c-input-number
        :inputValue.sync="detail.guidancePrice"
        placeholder="请输入厂商指导价"
      >
      </c-input-number>元
      <!-- {{
        detail.guidancePrice
          ? `${formatThousandNumber(detail.guidancePrice)}元`
          : "选择车型年款自动计算"
      }} -->
    </el-form-item>

    <el-form-item label="购置税" prop="purchaseTax">
      <c-input-number
        :inputValue.sync="detail.purchaseTax"
        placeholder="请输入购置税"
      >
      </c-input-number>元
      <!-- {{
        detail.purchaseTax
          ? `${formatThousandNumber(detail.purchaseTax)}元`
          : "选择车型年款自动计算"
      }} -->
    </el-form-item>

    <el-form-item label="公司报价" prop="ticketPrice">
      <c-input-number
        :inputValue.sync="detail.ticketPrice"
        placeholder="请输入公司报价"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

    <el-form-item label="外观颜色" prop="outColor">
      <c-input
        :inputValue.sync="detail.outColor"
        placeholder="请输入外观颜色"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="内饰颜色" prop="inColor">
      <c-input
        :inputValue.sync="detail.inColor"
        placeholder="请输入内饰颜色"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="车牌号" prop="carPlateNum">
      <c-input
        :inputValue.sync="detail.carPlateNum"
        placeholder="请输入车牌号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="车架号" prop="carVin">
      <c-input
        :inputValue.sync="detail.carVin"
        placeholder="请输入车架号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="客户是否有牌照" prop="hasCarPlateNum">
      <el-radio-group v-model="detail.hasCarPlateNum">
        <el-radio
          v-for="item in HAS_CAR_PLATENUM_LIST"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item
      label="牌照费/牌照月租"
      prop="plateMonthPrice"
      v-if="detail.hasCarPlateNum === 2"
    >
      <c-input-number
        :inputValue.sync="detail.plateMonthPrice"
        placeholder="请输入牌照费/牌照月租"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

    <el-form-item label="保险打包年数" prop="insurePeriod">
      <c-select
        :selectValue.sync="detail.insurePeriod"
        :options="SUBSCRIBE_PERIOD"
        :showAllValue="false"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="商业险购买年限" prop="commercialInsurePeriod">
      <c-select
        :selectValue.sync="detail.commercialInsurePeriod"
        :options="SUBSCRIBE_PERIOD"
        :showAllValue="false"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="保险费" prop="insurePrice">
      <c-input-number
        :inputValue.sync="detail.insurePrice"
        placeholder="请输入保险费"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

    <el-form-item label="设备金额" prop="devicePrice">
      <c-input-number
        :inputValue.sync="detail.devicePrice"
        placeholder="请输入设备金额"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

  </el-form>
</template>

<script>
import {
  getCarBrand,
  getCarType,
  getCarTypeYear,
  listByCarTypeYearId,
} from "@/api/car/car";
import { calculatePurchaseTaxRatio } from "@/api/subscribe/subscribe";
import { formatThousandNumber } from "@/utils/util";
import { SUBSCRIBE_PERIOD } from "@/utils/constant";

export default {
  name: "SetCustomerOrderStep2",

  components: {},

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      SUBSCRIBE_PERIOD,
      HAS_CAR_PLATENUM_LIST: [
        { value: 1, label: "是" },
        { value: 2, label: "否" },
      ],
      brandList: [],
      typeList: [],
      yearList: [],
      productList: [],
      rules: {
        carFullName: [
          { required: true, message: "请输入车型", trigger: "change" },
        ],
        guidancePrice: [
          { required: true, message: "请输入厂商指导价", trigger: "blur" },
        ],
        purchaseTax: [
          { required: true, message: "请输入购置税", trigger: "blur" },
        ],
        ticketPrice: [
          { required: true, message: "请输入公司报价", trigger: "blur" },
        ],
        outColor: [
          { required: true, message: "请输入外观颜色", trigger: "blur" },
        ],
        inColor: [
          { required: true, message: "请输入内饰颜色", trigger: "blur" },
        ],
        carPlateNum: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
        ],
        carVin: [{ required: true, message: "请输入车架号", trigger: "blur" }],
        hasCarPlateNum: [
          {
            required: true,
            message: "请选择客户是否有牌照",
            trigger: "change",
          },
        ],
        plateMonthPrice: [
          { required: true, message: "请输入牌照费/牌照月租", trigger: "blur" },
        ],
        insurePeriod: [
          { required: true, message: "保险打包年数", trigger: "change" },
        ],
        commercialInsurePeriod: [
          { required: true, message: "商业险购买年限", trigger: "change" },
        ],
        insurePrice: [
          { required: true, message: "请输入保险费", trigger: "blur" },
        ],
        devicePrice: [
          { required: true, message: "请输入设备金额", trigger: "blur" },
        ],
      },
    };
  },

  watch: {
    detail: {
      handler(val) {
        this.$emit("change", val);
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    this.getCarBrand();
  },

  methods: {
    getCarBrand() {
      getCarBrand().then((res) => {
        if (res.code === 0) {
          this.brandList = res.data;
          if (this.detail.carBrandId) {
            this.getCarType();
          }
        }
      });
    },

    changeCarBrand(e) {
      this.detail.carBrandId = e;
      this.detail.carTypeId = "";
      this.typeList = [];
      this.detail.carTypeYearId = "";
      this.yearList = [];
      this.detail.carTypeYearProductId = "";
      this.productList = [];
      this.getCarType();
    },

    getCarType() {
      const data = {
        carBrandId: this.detail.carBrandId,
      };

      getCarType(data).then((res) => {
        if (res.code === 0) {
          this.typeList = res.data;
          if (this.detail.carTypeId) {
            this.getCarTypeYear();
          }
        }
      });
    },

    changeCarType(e) {
      this.detail.carTypeId = e;
      this.detail.carTypeYearId = "";
      this.yearList = [];
      this.detail.carTypeYearProductId = "";
      this.productList = [];
      this.getCarTypeYear();
    },

    getCarTypeYear() {
      const data = {
        carTypeId: this.detail.carTypeId,
      };

      getCarTypeYear(data).then((res) => {
        if (res.code === 0) {
          this.yearList = res.data;
          if (this.detail.carTypeYearId) {
            this.listByCarTypeYearId();
          }
        }
      });
    },

    changeCarTypeYear(e) {
      this.detail.carTypeYearId = e;
      this.detail.carTypeYearProductId = "";
      this.productList = [];
      this.listByCarTypeYearId();
    },

    listByCarTypeYearId() {
      const data = {
        carTypeYearId: this.detail.carTypeYearId,
      };

      listByCarTypeYearId(data).then((res) => {
        if (res.code === 0) {
          this.productList = res.data;
        }
      });
    },

    changeCarProduct(e) {
      this.detail.carTypeYearProductId = e;
      const carProduct = this.productList.find((item) => item.id === e);
      if (carProduct) {
        this.detail.guidancePrice = carProduct.guidancePrice;
        this.calculatePurchaseTaxRatio();
      }
    },

    calculatePurchaseTaxRatio() {
      const params = {
        carTypeProductId: this.detail.carTypeYearProductId,
        nakedCarPrice: this.detail.guidancePrice,
        discount: 0,
      };

      calculatePurchaseTaxRatio(params).then((res) => {
        if (res.code === 0) {
          this.detail.purchaseTax = res.data;
        }
      });
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },
  },
};
</script>

<style lang="less" scoped></style>
