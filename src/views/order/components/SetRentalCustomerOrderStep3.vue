<template>
  <el-form ref="step3form" :model="detail.userCarFinanceLeaseSubscribe" :rules="rules" label-width="150px">
    <el-form-item label="设备金额">{{ formatThousandNumber(detail.userCarFinanceLeaseSubscribe.equipmentAmount) }}元</el-form-item>

    <el-form-item label="融资年限" prop="subscriptionCycle">
      <c-select
        :selectValue.sync="detail.userCarFinanceLeaseSubscribe.subscriptionCycle"
        :options="SUBSCRIBE_PERIOD"
        :showAllValue="false"
        :selectStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="每期月数" prop="monthsPerPeriod">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.monthsPerPeriod"
        placeholder="请输入每期月数"
        :inputStyle="{
          width: '300px',
        }"
      >
      </c-input-number>
    </el-form-item>

    <el-form-item label="手续费" prop="commission">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.commission"
        placeholder="请输入手续费"
      >
      </c-input-number>元
    </el-form-item>

    <el-form-item label="首期月供金额" prop="firstMonthMoney">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.firstMonthMoney"
        placeholder="请输入首期月供金额"
      >
      </c-input-number>元
    </el-form-item>

    <el-form-item label="未来月供金额" prop="otherMonthMoney">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.otherMonthMoney"
        placeholder="请输入未来月供金额"
      >
      </c-input-number>元
    </el-form-item>

    <el-form-item label="押金金额" prop="deposit">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.deposit"
        placeholder="请输入押金金额"
      >
      </c-input-number>元
      押金比例：{{ detail.userCarFinanceLeaseSubscribe.deposit ? `${ (detail.userCarFinanceLeaseSubscribe.deposit / detail.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2) }%` : '根据押金自动计算' }}
    </el-form-item>

    <el-form-item label="首付金额" prop="downPayment">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.downPayment"
        placeholder="请输入首付金额"
      >
      </c-input-number>元
      首付金额比例：{{ detail.userCarFinanceLeaseSubscribe.downPayment ? `${ (detail.userCarFinanceLeaseSubscribe.downPayment / detail.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2) }%` : '根据首付金额自动计算' }}
    </el-form-item>

    <el-form-item label="期末残值" prop="residualValue">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.residualValue"
        placeholder="请输入期末残值"
      >
      </c-input-number>元
      期末残值比例：{{ detail.userCarFinanceLeaseSubscribe.residualValue ? `${ (detail.userCarFinanceLeaseSubscribe.residualValue / detail.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2) }%` : '根据期末残值自动计算' }}
    </el-form-item>

    <el-form-item label="留购金额" prop="hirePurchaseMoney">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.hirePurchaseMoney"
        placeholder="请输入留购金额"
      >
      </c-input-number>元
      留购金额比例：{{ detail.userCarFinanceLeaseSubscribe.hirePurchaseMoney ? `${ (detail.userCarFinanceLeaseSubscribe.hirePurchaseMoney / detail.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2) }%` : '根据留购金额自动计算' }}
    </el-form-item>

    <el-form-item label="年利率" prop="annualInterestRate">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.annualInterestRate"
        placeholder="请输入年利率"
        :precision="2"
      >
      </c-input-number>%
    </el-form-item>

    <el-form-item label="IRR" prop="irr">
      <c-input-number
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.irr"
        placeholder="请输入IRR"
        :precision="2"
      >
      </c-input-number>%
    </el-form-item>

    <el-form-item label="期初期末支付区分" prop="payWay">
      <c-select
        :selectValue.sync="detail.userCarFinanceLeaseSubscribe.payWay"
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
  name: "SetRentalCustomerOrderStep3",

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
        subscriptionCycle: [
          { required: true, message: "请选择融资年限", trigger: "change" },
        ],
        monthsPerPeriod: [
          { required: true, message: "请输入每期月数", trigger: "blur" },
        ],
        commission: [
          { required: true, message: "请输入手续费", trigger: "blur" },
        ],
        firstMonthMoney: [
          { required: true, message: "请输入首期月供金额", trigger: "blur" },
        ],
        otherMonthMoney: [
          { required: true, message: "请输入未来月供金额", trigger: "blur" },
        ],
        deposit: [
          { required: true, message: "请输入押金金额", trigger: "blur" },
        ],
        downPayment: [
          { required: true, message: "请输入首付金额", trigger: "blur" },
        ],
        residualValue: [
          { required: true, message: "请输入期末残值", trigger: "blur" },
        ],
        hirePurchaseMoney: [
          { required: true, message: "请输入留购金额", trigger: "blur" },
        ],
        annualInterestRate: [
          { required: true, message: "请输入年利率", trigger: "blur" },
        ],
        irr: [
          { required: true, message: "请输入IRR", trigger: "blur" },
        ],
        payWay: [
          { required: true, message: "请选择期初期末支付区分", trigger: "change" },
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
