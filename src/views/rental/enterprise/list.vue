<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >企业管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">信用代码</div>
              <c-input
                :inputValue.sync="search.corporationTaxNumber"
                placeholder="请输入信用代码"
              />
            </div>

            <div class="search-item">
              <div class="label">企业名称</div>
              <c-input
                :inputValue.sync="search.companyName"
                placeholder="请输入企业名称"
              />
            </div>

            <div class="search-item">
              <div class="label">法人</div>
              <c-input
                :inputValue.sync="search.contactName"
                placeholder="请输入法人"
              />
            </div>

            <div class="search-item">
              <div class="label">注册地址</div>
              <c-input
                :inputValue.sync="search.address"
                placeholder="请输入注册地址"
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
        <el-table-column prop="corporationTaxNumber" label="信用代码" />

        <el-table-column prop="companyName" label="企业名称" />

        <el-table-column prop="address" label="注册地址" />

        <el-table-column prop="contactName" label="法人" />

        <el-table-column prop="managerName" label="负责人" />

        <el-table-column prop="managerMobile" label="负责人联系电话" />

        <el-table-column prop="establishDate" label="成立日期" />

        <el-table-column prop="businessDeadline" label="营业期限">
          <template slot-scope="scope">
            {{
              scope.row.isCompanyForever == 1
                ? "长期"
                : scope.row.businessDeadline
            }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goDetailPage(scope.row)">
              查看详情
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getEnterpriseList } from "@/api/rental/enterprise";

export default {
  data() {
    return {
      search: {
        corporationTaxNumber: "",
        companyName: "",
        contactName: "",
        address: "",
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
    };
  },

  mounted() {
    this.searchList();
  },

  methods: {
    searchList() {
      getEnterpriseList(this.search).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
      });
    },

    handleSearchBtn() {
      this.search.page = 1;
      this.searchList();
    },

    reset() {
      this.search.corporationTaxNumber = "";
      this.search.companyName = "";
      this.search.contactName = "";
      this.search.address = "";
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    goDetailPage(row) {
      this.$router.push({
        path: "/rental/enterprise/enterpriseDetail",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
