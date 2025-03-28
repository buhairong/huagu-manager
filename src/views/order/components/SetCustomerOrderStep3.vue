<template>
  <el-form ref="step3form" :model="detail" :rules="rules" label-width="150px">
    <el-form-item label="设备金额">{{ formatThousandNumber(detail.devicePrice) }}元</el-form-item>

    <el-form-item label="订阅周期（年）" prop="period">
      <c-select
        :selectValue.sync="detail.period"
        :options="SUBSCRIBE_PERIOD"
        :showAllValue="false"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="每期月数" prop="monthTotal">
      <c-input-number
        :inputValue.sync="detail.monthTotal"
        placeholder="请输入每期月数"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

    <el-form-item label="首付款比例" prop="firstPeriodRate">
      <c-input-number
        :inputValue.sync="detail.firstPeriodRate"
        placeholder="请输入首付款比例"
        :precision="2"
      >
      </c-input-number>%
      首付款金额：{{ detail.firstPeriodRate ? `${ formatThousandNumber(detail.devicePrice * detail.firstPeriodRate / 100) }元` : '根据首付款比例自动计算' }}
    </el-form-item>

    <el-form-item label="押金比例" prop="depositRate">
      <c-input-number
        :inputValue.sync="detail.depositRate"
        placeholder="请输入押金比例"
        :precision="2"
      >
      </c-input-number>%
      押金金额：{{ detail.depositRate ? `${ formatThousandNumber(detail.devicePrice * detail.depositRate / 100) }元` : '根据押金比例自动计算' }}
    </el-form-item>

    <el-form-item label="期末残值比例" prop="residualValueRate">
      <c-input-number
        :inputValue.sync="detail.residualValueRate"
        placeholder="请输入期末残值比例"
        :precision="2"
      >
      </c-input-number>%
      期末残值金额：{{ detail.residualValueRate ? `${ formatThousandNumber(detail.devicePrice * detail.residualValueRate / 100) }元` : '根据期末残值比例自动计算' }}
    </el-form-item>

    <el-form-item label="年利率" prop="irrRate">
      <c-input-number
        :inputValue.sync="detail.irrRate"
        placeholder="请输入年利率"
        :precision="2"
      >
      </c-input-number>%
    </el-form-item>

    <el-form-item label="订阅开始日" prop="startDate">
      <c-date 
        :value.sync="detail.startDate"
        placeholder="请选择订阅开始日"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="期初期末支付区分" prop="payType">
      <c-select
        :selectValue.sync="detail.payType"
        :options="PAYTYPE_LIST"
        :showAllValue="false"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

  </el-form>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { SUBSCRIBE_PERIOD } from "@/utils/constant"

export default {
  name: "SetCustomerOrderStep3",

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
      PAYTYPE_LIST: [
        { value: 1, label: "期初" },
        { value: 2, label: "期末" },
      ],
      rules: {
        period: [
          { required: true, message: "请选择订阅周期", trigger: "change" },
        ],
        monthTotal: [
          { required: true, message: "请输入每期月数", trigger: "blur" },
        ],
        firstPeriodRate: [
          { required: true, message: "请输入首付款比例", trigger: "blur" },
        ],
        depositRate: [
          { required: true, message: "请输入押金比例", trigger: "blur" },
        ],
        residualValueRate: [
          { required: true, message: "请输入期末残值比例", trigger: "blur" },
        ],
        irrRate: [
          { required: true, message: "请输入年利率", trigger: "blur" },
        ],
        startDate: [
          { required: true, message: "请选择订阅开始日", trigger: "change" },
        ],
        payType: [
          { required: true, message: "请选择订阅开始日", trigger: "change" },
        ],
      },
    }
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
    
  },

  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },
  },
};
</script>

<style lang="less" scoped></style>
