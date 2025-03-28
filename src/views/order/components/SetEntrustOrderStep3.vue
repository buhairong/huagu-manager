<template>
  <div>
    <el-form ref="step3form" :model="detail" :rules="rules" label-width="140px">
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
        />
      </el-form-item>

      <el-form-item label="车辆指导价">
        {{ detail.guidancePrice ? `${formatThousandNumber(detail.guidancePrice)}元` : '选择车型自动计算' }}
      </el-form-item>

      <el-form-item label="外观颜色" prop="outColor">
        <c-input 
          :inputValue.sync="detail.outColor"
          placeholder="请输入外观颜色"
          :inputStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <el-form-item label="内饰颜色" prop="inColor">
        <c-input 
          :inputValue.sync="detail.inColor"
          placeholder="请输入内饰颜色"
          :inputStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <el-form-item label="车辆增配项" prop="otherConfigList">
        <div>
          <div class="config-item" v-for="(item, index) in detail.otherConfigList[0].details" :key="index">
            <c-input 
              :inputValue.sync="item.detailName"
              placeholder="请输入增配项"
              style="width: 180px;margin-right:20px;"
            />
            <c-input-number 
              :inputValue.sync="item.money"
              placeholder="请输入增配项金额"
              style="width: 140px;margin-right:8px;"
            />
            元
            <span style="margin-left: 20px" @click="del(index)"><i class="el-icon-remove-outline" style="font-size: 18px"></i></span>
          </div>

          <div class="add-wrap" >
            <div class="add" @click="addConfig">
              <i class="el-icon-circle-plus" style="font-size: 20px;"></i>
              <div class="tip">更多增配项</div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getCarBrand,
  getCarType,
  getCarTypeYear,
  listByCarTypeYearId,
} from "@/api/car/car"
import { formatThousandNumber } from "@/utils/util"

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
      rules: {
        carTypeYearProductId: [
          { required: true, message: "请选择车型", trigger: "change" },
        ],
        outColor: [
          { required: true, message: '请输入外观颜色', trigger: 'blur' }
        ],
        inColor: [
          { required: true, message: '请输入内饰颜色', trigger: 'blur' }
        ],
      },
    }
  },

  watch: {
    detail: {
      handler(val) {
        if (val.otherConfigList[0].details.length === 0) {
          this.addConfig()
        }
        this.$emit('change', val)
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    this.getCarBrand()
  },

  methods: {
    getCarBrand() {
      getCarBrand().then((res) => {
        if (res.code === 0) {
          this.brandList = res.data
          if (this.detail.carBrandId) {
            this.getCarType()
          }
        }
      })
    },

    changeCarBrand(e) {
      this.detail.carBrandId = e
      this.detail.carTypeId = ""
      this.typeList = []
      this.detail.carTypeYearId = ""
      this.yearList = []
      this.detail.carTypeYearProductId = ""
      this.productList = []
      this.getCarType()
    },

    getCarType() {
      const data = {
        carBrandId: this.detail.carBrandId,
      }

      getCarType(data).then((res) => {
        if (res.code === 0) {
          this.typeList = res.data
          if (this.detail.carTypeId) {
            this.getCarTypeYear()
          }
        }
      })
    },

    changeCarType(e) {
      this.detail.carTypeId = e
      this.detail.carTypeYearId = ""
      this.yearList = []
      this.detail.carTypeYearProductId = ""
      this.productList = []
      this.getCarTypeYear()
    },

    getCarTypeYear() {
      const data = {
        carTypeId: this.detail.carTypeId,
      }

      getCarTypeYear(data).then((res) => {
        if (res.code === 0) {
          this.yearList = res.data;
          if (this.detail.carTypeYearId) {
            this.listByCarTypeYearId();
          }
        }
      })
    },

    changeCarTypeYear(e) {
      this.detail.carTypeYearId = e
      this.detail.carTypeYearProductId = ""
      this.productList = []
      this.listByCarTypeYearId()
    },

    listByCarTypeYearId() {
      const data = {
        carTypeYearId: this.detail.carTypeYearId,
      }

      listByCarTypeYearId(data).then((res) => {
        if (res.code === 0) {
          this.productList = res.data
        }
      })
    },

    changeCarProduct(e) {
      this.detail.carTypeYearProductId = e
      const carProduct = this.productList.find((item) => item.id === e)
      if (carProduct) {
        this.detail.guidancePrice = carProduct.guidancePrice
        this.detail.carImage = carProduct.imageUrl
        this.detail.carFullName = `${carProduct.carBrand}·${carProduct.carType} ${carProduct.carTypeYear} ${carProduct.carTypeYearProduct}`
        this.detail.carSubscribeId = null
        this.detail.cityId = '' // 用车城市
        this.detail.cityName = ''
        this.detail.plateCityId = '' // 车辆上牌城市
        this.detail.plateCityName = ''
        this.detail.discount = undefined // 厂商折扣
        this.detail.purchaseTax = null // 购置税
        this.detail.profit = undefined // 预留利润
        this.detail.firstPeriodRate = undefined // 首期摊销比例
        this.detail.residualValueRate = undefined // 期末余值比例
        this.detail.twelveMonthMoney = undefined // 12个月后二手车估价
        this.detail.deposit = undefined // 车辆押金
        this.detail.apportionFeeRecordList = [] // 订阅方案
        this.detail.typeReqVos = [] // 选择方案
      }
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },

    addConfig() {
			this.detail.otherConfigList[0].details.push({
				detailName: '',
				hasCheck: 1,
				money: undefined
			})
    },

    del(index) {
      this.$confirm(`确定要删除这个增配项吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.detail.otherConfigList[0].details.splice(index, 1)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.config-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.add-wrap {
  margin-top: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .add {
    margin-right: 30px;
    display: flex;
    align-items: center;
  }
  .tip {
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    color: #1D2129;
    padding-left: 8px;
  }
}
</style>