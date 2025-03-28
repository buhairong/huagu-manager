<template>
  <el-form ref="step2form" :model="detail.userCarFinanceLeaseSubscribe" :rules="rules" label-width="150px">
    <el-form-item label="选择车型" prop="carTypeYearProductId">
      <c-select
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
        :selectValue.sync="detail.userCarFinanceLeaseSubscribe.carTypeYearProductId"
        :options="productList"
        :showAllValue="false"
        placeholder="选择型号"
        :selectStyle="{
          width: '198px',
        }"
        labelKey="carTypeYearProduct"
        valueKey="id"
        @change="changeCarProduct"
      />
    </el-form-item>

    <el-form-item label="厂商指导价">
      {{
        detail.userCarFinanceLeaseSubscribe.guidancePrice
          ? `${formatThousandNumber(detail.userCarFinanceLeaseSubscribe.guidancePrice)}元`
          : "选择车型年款自动计算"
      }}
    </el-form-item>

    <el-form-item label="公司报价" prop="companyQuotation">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.companyQuotation"
        placeholder="请输入公司报价"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

    <el-form-item label="购置税" prop="tax">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.tax"
        placeholder="请输入购置税"
      >
      </c-input-number>元
    </el-form-item>

    <el-form-item label="保险费用" prop="insuranceExpenses">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.insuranceExpenses"
        placeholder="请输入保险费用"
      >
      </c-input-number>元
    </el-form-item>

    <el-form-item label="装潢费用" prop="decorationExpenses">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.decorationExpenses"
        placeholder="请输入装潢费用"
      >
      </c-input-number>元
    </el-form-item>

    <el-form-item label="设备金额">
      {{
        detail.userCarFinanceLeaseSubscribe.equipmentAmount
          ? `${formatThousandNumber(detail.userCarFinanceLeaseSubscribe.equipmentAmount)}元`
          : "设备金额自动计算"
      }}
    </el-form-item>

    <el-form-item label="车牌号" prop="plateNum">
      <c-input
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.plateNum"
        placeholder="请输入车牌号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="车架号" prop="vimNum">
      <c-input
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.vimNum"
        placeholder="请输入车架号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="外观颜色" prop="outColor">
      <c-input
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.outColor"
        placeholder="请输入外观颜色"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="内饰颜色" prop="inColor">
      <c-input
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.inColor"
        placeholder="请输入内饰颜色"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="保险打包年数" prop="insureYear">
      <c-select
        :selectValue.sync="detail.userCarFinanceLeaseSubscribe.insureYear"
        :options="SUBSCRIBE_PERIOD"
        :showAllValue="false"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="交强险到期日" prop="compulsoryInsuranceEndDate">
      <c-date 
        :value.sync="detail.userCarFinanceLeaseSubscribe.compulsoryInsuranceEndDate"
      />
    </el-form-item>

    <el-form-item label="商业险到期日" prop="commercialInsuranceEndDate">
      <c-date 
        :value.sync="detail.userCarFinanceLeaseSubscribe.commercialInsuranceEndDate"
      />
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
  name: "SetRentalCustomerOrderStep2",

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
        carTypeYearProductId: [
          { required: true, message: "请选择车型", trigger: "change" },
        ],
        companyQuotation: [
          { required: true, message: "请输入公司报价", trigger: "blur" },
        ],
        tax: [
          { required: true, message: "请输入购置税", trigger: "blur" },
        ],
        insuranceExpenses: [
          { required: true, message: "请输入保险费用", trigger: "blur" },
        ],
        decorationExpenses: [
          { required: true, message: "请输入装潢费用", trigger: "blur" },
        ],
        plateNum: [
          { required: true, message: "请输入车牌号", trigger: "blur" },
        ],
        vimNum: [{ required: true, message: "请输入车架号", trigger: "blur" }],
        outColor: [
          { required: true, message: "请输入外观颜色", trigger: "blur" },
        ],
        inColor: [
          { required: true, message: "请输入内饰颜色", trigger: "blur" },
        ],
        insureYear: [
          { required: true, message: "请选择保险打包年数", trigger: "change" },
        ],
        compulsoryInsuranceEndDate: [
          { required: true, message: "请选择交强险到期日", trigger: "change" },
        ],
        commercialInsuranceEndDate: [
          { required: true, message: "请选择商业险到期日", trigger: "change" },
        ],
      },
    };
  },

  watch: {
    detail: {
      handler(val) {
        if (this.detail.userCarFinanceLeaseSubscribe.companyQuotation && this.detail.userCarFinanceLeaseSubscribe.tax && this.detail.userCarFinanceLeaseSubscribe.insuranceExpenses && this.detail.userCarFinanceLeaseSubscribe.decorationExpenses) {
          this.detail.userCarFinanceLeaseSubscribe.equipmentAmount = this.detail.userCarFinanceLeaseSubscribe.companyQuotation +
            this.detail.userCarFinanceLeaseSubscribe.tax + 
            this.detail.userCarFinanceLeaseSubscribe.insuranceExpenses + 
            this.detail.userCarFinanceLeaseSubscribe.decorationExpenses
        }
        
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
      this.detail.userCarFinanceLeaseSubscribe.carTypeYearProductId = "";
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
      this.detail.userCarFinanceLeaseSubscribe.carTypeYearProductId = "";
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
      this.detail.userCarFinanceLeaseSubscribe.carTypeYearProductId = "";
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
      this.detail.userCarFinanceLeaseSubscribe.carTypeYearProductId = e;
      const carProduct = this.productList.find((item) => item.id === e);
      if (carProduct) {
        this.detail.userCarFinanceLeaseSubscribe.guidancePrice = carProduct.guidancePrice;
        this.calculatePurchaseTaxRatio();
      }
    },

    calculatePurchaseTaxRatio() {
      const params = {
        carTypeProductId: this.detail.userCarFinanceLeaseSubscribe.carTypeYearProductId,
        nakedCarPrice: this.detail.userCarFinanceLeaseSubscribe.guidancePrice,
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
