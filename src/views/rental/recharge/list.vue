<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >充值管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">订单编号</div>
              <c-input
                :inputValue.sync="search.orderNum"
                placeholder="请输入订单编号"
              />
            </div>

            <div class="search-item">
              <div class="label">订单类型</div>
              <c-select
                :selectValue.sync="search.orderType"
                :options="CUSTOM_TYPE"
              />
            </div>

            <search-button class="search-btn" @search="handleSearchBtn" />
            <reset-button class="search-btn" @reset="reset" />
          </div>
        </div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column label="订单编号" prop="orderNum" />

        <el-table-column label="订单类型">
          <template slot-scope="scope">
            {{ CUSTOM_TYPE_STATUS[scope.row.orderType] }}
          </template>
        </el-table-column>

        <el-table-column prop="mobile" label="客户手机号">
          <template slot-scope="scope">
            {{ scope.row?.mobile }}
          </template>
        </el-table-column>

        <el-table-column label="客户公司">
          <template slot-scope="scope">
            {{ scope.row?.userCompanyEntity?.companyName }}
          </template>
        </el-table-column>

        <el-table-column label="充值金额">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.rechargeAmount) }} 元
          </template>
        </el-table-column>

        <el-table-column label="赠送金额">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.giftAmount) }} 元
          </template>
        </el-table-column>

        <el-table-column label="支付状态">
          <template slot-scope="scope">
            {{ RECHARGE_ORDER_STATUS[scope.row.status] }}
          </template>
        </el-table-column>

        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import {
  CUSTOM_TYPE,
  CUSTOM_TYPE_STATUS,
  RECHARGE_ORDER_STATUS,
} from "@/utils/constant";
import { getRechargeOrderList } from "@/api/rental/recharge";

export default {
  data() {
    return {
      search: {
        orderNum: "",
        orderType: "",
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
      CUSTOM_TYPE,
      CUSTOM_TYPE_STATUS,
      RECHARGE_ORDER_STATUS,
    };
  },

  mounted() {
    this.searchList();
  },

  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    searchList() {
      getRechargeOrderList(this.search).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
      });
    },

    handleSearchBtn() {
      this.search.page = 1;
      this.searchList();
    },

    reset() {
      this.search.orderNum = "";
      this.search.orderType = "";
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },
  },
};
</script>

<style lang="less" scoped></style>
