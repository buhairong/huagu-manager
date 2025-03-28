<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >开票管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">公司名称</div>
              <c-input
                :inputValue.sync="search.companyName"
                placeholder="请输入公司名称"
              />
            </div>

            <div class="search-item">
              <div class="label">社会统一信用代码</div>
              <c-input
                :inputValue.sync="search.corporationTaxNumber"
                placeholder="请输入社会统一信用代码"
              />
            </div>

            <div class="search-item">
              <div class="label">公司地址</div>
              <c-input
                :inputValue.sync="search.companyAddress"
                placeholder="请输入公司地址"
              />
            </div>

            <div class="search-item">
              <div class="label">联系电话</div>
              <c-input
                :inputValue.sync="search.phone"
                placeholder="请输入联系电话"
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
        <el-table-column label="公司名称" prop="companyName" />

        <el-table-column label="社会统一信用代码" prop="corporationTaxNumber" />

        <el-table-column label="公司地址" prop="companyAddress" />

        <el-table-column label="联系电话" prop="phone" />

        <el-table-column label="开户行" prop="openBank" />

        <el-table-column label="银行账号" prop="bankAccount" />

        <el-table-column label="开户行地址" prop="bankAddress" />

        <el-table-column prop="createdTime" label="创建时间" />
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
import { getInvoiceList } from "@/api/rental/invoice";

export default {
  data() {
    return {
      search: {
        companyName: "",
        corporationTaxNumber: "",
        companyAddress: "",
        phone: "",
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
      getInvoiceList(this.search).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
      });
    },

    handleSearchBtn() {
      this.search.page = 1;
      this.searchList();
    },

    reset() {
      this.search.companyName = "";
      this.search.corporationTaxNumber = "";
      this.search.companyAddress = "";
      this.search.phone = "";
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
