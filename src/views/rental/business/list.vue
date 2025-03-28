<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >商务活动</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">城市</div>
              <c-select
                :selectValue.sync="search.cityId"
                :options="allCitys"
                labelKey="city"
                valueKey="id"
              />
            </div>

            <div class="search-item">
              <div class="label">活动类型</div>
              <c-select
                :selectValue.sync="search.businessActivityType"
                :options="BUSINESS_ACTIVITY_LIST"
              />
            </div>

            <div class="search-item">
              <div class="label">活动名称</div>
              <c-input
                :inputValue.sync="search.siteName"
                placeholder="请输入活动名称"
              />
            </div>

            <div class="search-item">
              <div class="label">活动地址</div>
              <c-input
                :inputValue.sync="search.address"
                placeholder="请输入活动地址"
              />
            </div>

            <search-button class="search-btn" @search="handleSearchBtn" />
            <reset-button class="search-btn" @reset="reset" />
          </div>
        </div>

        <div class="add-btn-group">
          <div class="add-plus-btn" @click="goSavePage('add')">
            <span class="icon"><i class="el-icon-plus"></i></span>
            添加活动
          </div>

          <div class="add-plus-btn view-btn" @click="goOrderPage">查看订单</div>
        </div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column prop="businessActivityType" label="活动类型">
          <template slot-scope="scope">
            {{ BUSINESS_ACTIVITY_STATUS[scope.row.businessActivityType] }}
          </template>
        </el-table-column>

        <el-table-column label="活动名称" prop="siteName" />

        <el-table-column prop="money" label="活动价格">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.money) }}元/小时
          </template>
        </el-table-column>

        <el-table-column prop="cityName" label="城市" />

        <el-table-column label="活动地址" prop="address" />

        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goDetailPage(scope.row)">
              查看详情
            </div>
            <div class="table-btn" @click="goSavePage('edit', scope.row)">
              编辑活动
            </div>
            <div class="table-btn" @click="del(scope.row)">删除活动</div>
            <div class="table-btn" @click="order(scope.row)">活动下单</div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import {
  BUSINESS_ACTIVITY_LIST,
  BUSINESS_ACTIVITY_STATUS,
} from "@/utils/constant";
import { getAllCity } from "@/api/subscribe/subscribe";
import { getBusinessList, removeBusiness } from "@/api/rental/business";

export default {
  data() {
    return {
      search: {
        cityId: undefined,
        businessActivityType: undefined,
        siteName: "",
        address: "",
        mobile: undefined,
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
      allCitys: [],
      BUSINESS_ACTIVITY_LIST,
      BUSINESS_ACTIVITY_STATUS,
    };
  },
  mounted() {
    this.searchList();
    this.getAllCity();
  },
  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    getAllCity() {
      getAllCity().then((res) => {
        if (res.code === 0) {
          this.allCitys = res.data;
        }
      });
    },

    searchList() {
      getBusinessList(this.search).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
      });
    },

    handleSearchBtn() {
      this.search.page = 1;
      this.searchList();
    },

    reset() {
      this.search.cityId = undefined;
      this.search.businessActivityType = undefined;
      this.search.siteName = "";
      this.search.address = "";
      this.search.mobile = undefined;
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    goSavePage(type, row = {}) {
      this.$router.push({
        path: "/rental/business/addOrUpdateBusiness",
        query: {
          type,
          id: row.id,
        },
      });
    },

    del(row) {
      this.$confirm(`确定要删除这个活动吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const params = {
          id: row.id,
        };
        removeBusiness(params)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.searchList();
            } else {
              this.$message.error(res.msg || "删除失败");
            }
          })
          .catch((err) => {
            this.$message.error("删除失败");
          });
      });
    },

    goDetailPage(row) {
      this.$router.push({
        path: "/rental/business/businessDetail",
        query: {
          id: row.id,
        },
      });
    },

    goOrderPage() {
      this.$router.push({
        path: "/rental/business/businessOrderList",
      });
    },

    order(row) {
      this.$router.push({
        path: "/rental/business/addOrUpdateBusinessOrder",
        query: {
          type: "add",
          businessId: row.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add-btn-group {
  display: flex;
  .view-btn {
    margin-left: 12px;
  }
}
</style>
