<template>
  <el-form ref="step2form" :model="detail" :rules="rules" label-width="140px">
    <el-form-item label="适用车型" prop="carTypeYearProductId">
      <div class="sub">
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
    </el-form-item>

    <el-form-item label="外观颜色" prop="colors">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="(item, index) in colorList"
          :key="index"
          :label="item.colorName"
          @change="changeCarColor"
        >
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <!-- <el-form-item label="车辆增配项">
           <div>
                <div class="config-item" v-for="item in detail.otherConfigs[0].details" :key="item.configId">
                    <span style="margin-right:10px;" @click="delConfig(item.configId)"><i class="el-icon-remove" style="color:rgba(29, 33, 41, 0.6);font-size: 20px;"></i></span>
                    <c-input 
                        style="margin-right:8px;"
                        :inputStyle="{
                            width:'200px'
                        }"
                        :inputValue.sync="item.detailName"
                        placeholder="请输入增配项"
                    />
                    <c-input-number 
                        :inputValue.sync="item.money"
                        placeholder="请输入金额"
                    >
                    </c-input-number>
                    <div class="unit">元</div>
                </div>

                <div class="add-config" @click="addConfig">
                    <i class="el-icon-circle-plus" style="color:#3446AA;font-size: 20px;margin-right:10px;"></i>
                    更多增配项
                </div>
           </div>
        </el-form-item> -->
  </el-form>
</template>

<script>
import {
  getCarBrand,
  getCarType,
  getCarTypeYear,
  listByCarTypeYearId,
  selectByCarTypeId,
} from "@/api/car/car";

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      brandList: [],
      typeList: [],
      yearList: [],
      productList: [],
      colorList: [],
      configId: 1,
      rules: {
        carTypeYearProductId: [
          { required: true, message: "请选择车型", trigger: "change" },
        ],
        colors: [{ required: true, message: "请选择颜色", trigger: "change" }],
      },
      checkList: [],
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
    // if (this.detail.otherConfigs && this.detail.otherConfigs.length && this.detail.otherConfigs[0].details.length) {
    //     this.detail.otherConfigs[0].details.map(item => {
    //         ++this.configId
    //         item.configId = this.configId

    //         return item
    //     })
    // } else {
    //     this.addConfig()
    // }

    if (this.detail.colors.length) {
      this.checkList = this.detail.colors.map((item) => item.colorName);
    }
  },

  methods: {
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
      const product = this.productList.find((item) => item.id === e);
      if (product) {
        this.detail.carType.carBrand = product.carBrand;
        this.detail.carType.carType = product.carType;
        this.detail.carType.carTypeYear = product.carTypeYear;
        this.detail.carType.carTypeYearProduct = product.carTypeYearProduct;
        this.detail.carType.imageUrl = product.imageUrl;
        this.detail.carType.guidancePrice = product.guidancePrice;
        this.detail.guidancePrice = product.guidancePrice;
        this.detail.tempGuidancePrice = product.guidancePrice;
        this.detail.purchasingPrice = product.purchasingPrice || undefined;
        this.detail.transactionPrice = product.transactionPrice || undefined;
        this.detail.citySubscribeReq[0].purchasingPrice =
          this.detail.purchasingPrice;
        this.detail.citySubscribeReq[0].transactionPrice =
          this.detail.transactionPrice;
      }
      this.selectByCarTypeId();
    },

    selectByCarTypeId() {
      const data = {
        id: this.detail.carTypeYearProductId,
      };

      selectByCarTypeId(data).then((res) => {
        if (res.code === 0) {
          this.colorList = res.data.outColors;
        }
      });
    },

    changeCarColor(e) {
      this.detail.colors = this.colorList
        .map((item) => {
          if (this.checkList.includes(item.colorName)) {
            item.hasCheck = 1;
          }

          return item;
        })
        .filter((item) => item.hasCheck);
    },

    addConfig() {
      const configId = ++this.configId;
      this.detail.otherConfigs[0].details.push({
        configId,
        detailName: "",
        money: undefined,
        hasCheck: 1,
      });
    },

    delConfig(configId) {
      this.$confirm(`确定要删除这个增配项吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const index = this.detail.otherConfigs[0].details.findIndex(
          (item) => item.configId === configId
        );
        if (index !== -1) {
          this.detail.otherConfigs[0].details.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sub {
  display: flex;
}

.config-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  .unit {
    height: 32px;
    font-family: HarmonyOS_Sans_SC;
    font-size: 14px;
    line-height: 32px;
    color: #3d3d3d;
    background: #f2f3f5;
    padding-right: 8px;
  }
}

.add-config {
  font-family: HarmonyOS_Sans_SC;
  font-size: 14px;
  color: #1d2129;
  display: flex;
  align-items: center;
  cursor: pointer;
}

::v-deep .el-radio {
  height: 32px;
  line-height: 32px;
}
</style>
