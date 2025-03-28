<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>券码管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >兑换详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <el-table
        :data="list"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column label="兑换码" prop="code" />

        <el-table-column prop="moneyLimit" label="兑换金额">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.money) }}元
          </template>
        </el-table-column>

        <el-table-column label="兑换人">
          <template slot-scope="scope"> {{ scope.row?.exchangeUserInfoEntity?.name }} </template>
        </el-table-column>

        <el-table-column label="兑换人手机号">
          <template slot-scope="scope"> {{ scope.row?.exchangeUserInfoEntity?.mobile }} </template>
        </el-table-column>

        <!-- <el-table-column label="兑换公司">
          <template slot-scope="scope"> {{ scope.row?.exchangeUserCompanyEntity?.companyName }} </template>
        </el-table-column> -->

        <el-table-column label="兑换时间" prop="createdTime" />
      </el-table>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { exchangeDetail } from "@/api/rental/coupon";
import {
  SEX_STATUS,
  SEX_LIST,
  EDUCATION_LIST,
  EDUCATION_STATUS,
} from "@/utils/constant";

export default {
  data() {
    return {
      type: "",
      id: '',
      list: [],
      SEX_STATUS,
      SEX_LIST,
      EDUCATION_LIST,
      EDUCATION_STATUS,
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail();
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
        id: this.id,
      };
      exchangeDetail(params).then((res) => {
        this.list = res.data
      });
    },
  },
};
</script>

<style lang="less" scoped>

</style>
