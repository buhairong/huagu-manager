<template>
  <div>
    <c-select
      :selectValue.sync="carInfo.carBrandId"
      :options="brandList"
      :showAllValue="false"
      placeholder="选择品牌"
      style="margin-right: 10px"
      labelKey="brandName"
      valueKey="id"
      :disabled="disabled"
      @change="changeCarBrand"
    />
    <c-select
      :selectValue.sync="carInfo.carTypeId"
      :options="typeList"
      :showAllValue="false"
      placeholder="选择车系"
      style="margin-right: 10px"
      labelKey="carType"
      valueKey="id"
      :disabled="disabled"
      @change="changeCarType"
    />
    <c-select
      :selectValue.sync="carInfo.carTypeYearId"
      :options="yearList"
      :showAllValue="false"
      placeholder="选择年款"
      style="margin-right: 10px"
      labelKey="year"
      valueKey="id"
      :disabled="disabled"
      @change="changeCarTypeYear"
    />
    <c-select
      :selectValue.sync="carInfo.id"
      :options="productList"
      :showAllValue="false"
      placeholder="选择型号"
      :selectStyle="{
        width: '198px',
      }"
      labelKey="carTypeYearProduct"
      valueKey="id"
      :disabled="disabled"
      @change="changeCarProduct"
    />
  </div>
</template>

<script>
import { getCarBrand, getCarType, getCarTypeYear, listByCarTypeYearId } from "@/api/car/car"

export default {
  name: "SelectCarProduct",

  components: {},

  props: {
    carTypeYearProductId: {
      type: Number,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    carEntity: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      carInfo: {},
      brandList: [],
      typeList: [],
      yearList: [],
      productList: [],
    }
  },

  mounted() {
    if (this.disabled) {
      this.carInfo = this.carEntity
    }
    this.getCarBrand()
  },

  methods: {
    getCarBrand() {
      getCarBrand().then((res) => {
        if (res.code === 0) {
          this.brandList = res.data
          if (this.carInfo.carBrandId) {
            this.getCarType()
          }
        }
      })
    },

    changeCarBrand(e) {
      this.carInfo.carBrandId = e
      this.carInfo.carTypeId = ""
      this.typeList = []
      this.carInfo.carTypeYearId = ""
      this.yearList = []
      this.carInfo.id = ""
      this.productList = []
      this.getCarType()
    },

    getCarType() {
      const data = {
        carBrandId: this.carInfo.carBrandId,
      }

      getCarType(data).then((res) => {
        if (res.code === 0) {
          this.typeList = res.data
          if (this.carInfo.carTypeId) {
            this.getCarTypeYear()
          }
        }
      })
    },

    changeCarType(e) {
      this.carInfo.carTypeId = e
      this.carInfo.carTypeYearId = ""
      this.yearList = []
      this.carInfo.id = ""
      this.productList = []
      this.getCarTypeYear()
    },

    getCarTypeYear() {
      const data = {
        carTypeId: this.carInfo.carTypeId,
      }

      getCarTypeYear(data).then((res) => {
        if (res.code === 0) {
          this.yearList = res.data;
          if (this.carInfo.carTypeYearId) {
            this.listByCarTypeYearId()
          }
        }
      })
    },

    changeCarTypeYear(e) {
      this.carInfo.carTypeYearId = e
      this.carInfo.id = ""
      this.productList = []
      this.listByCarTypeYearId()
    },

    listByCarTypeYearId() {
      const data = {
        carTypeYearId: this.carInfo.carTypeYearId,
      }

      listByCarTypeYearId(data).then((res) => {
        if (res.code === 0) {
          this.productList = res.data
        }
      })
    },

    changeCarProduct(e) {
      const carProduct = this.productList.find((item) => item.id === e)
      if (carProduct) {
        this.carInfo = carProduct
        this.$emit("changeCarProduct", carProduct)
      }
    },
  },
}
</script>

<style lang="less" scoped>

</style>
