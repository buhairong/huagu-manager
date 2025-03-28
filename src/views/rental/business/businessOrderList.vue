<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >商务活动订单</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">联系人姓名</div>
              <c-input
                :inputValue.sync="search.contactName"
                placeholder="请输入联系人姓名"
              />
            </div>

            <div class="search-item">
              <div class="label">联系人手机号</div>
              <c-input
                :inputValue.sync="search.mobile"
                placeholder="请输入联系人手机号"
                style="width: 200px"
              />
            </div>

            <search-button class="search-btn" @search="handleSearchBtn" />
            <reset-button class="search-btn" @reset="reset" />
          </div>
        </div>

        <div class="add-plus-btn" @click="goBusinessListPage">查看活动</div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column prop="orderNum" label="订单编号" />

        <el-table-column prop="cityName" label="城市">
          <template slot-scope="scope">
            {{ scope.row.memberBusinessActivityEntity.cityName }}
          </template>
        </el-table-column>

        <el-table-column prop="businessActivityType" label="活动类型">
          <template slot-scope="scope">
            {{
              BUSINESS_ACTIVITY_STATUS[
                scope.row.memberBusinessActivityEntity.businessActivityType
              ]
            }}
          </template>
        </el-table-column>

        <el-table-column label="活动名称" prop="siteName">
          <template slot-scope="scope">
            {{ scope.row.memberBusinessActivityEntity.siteName }}
          </template>
        </el-table-column>

        <el-table-column prop="money" label="活动总价">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.money) }}元
          </template>
        </el-table-column>

        <el-table-column prop="payWay" label="支付方式">
          <template slot-scope="scope">
            {{ BUSINESS_ORDER_PAY_WAY_STATUS[scope.row.payWay] }}
          </template>
        </el-table-column>

        <el-table-column prop="contactName" label="联系人" />
        <el-table-column prop="mobile" label="联系人手机号" />

        <el-table-column prop="startDate" label="开始时间" />

        <el-table-column prop="endDate" label="结束时间" />

        <el-table-column prop="createdTime" label="创建时间" />

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goDetailPage(scope.row)">
              查看详情
            </div>
            <div class="table-btn" @click="del(scope.row)">取消活动</div>
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
  getBusinessOrderList,
  removeBusinessOrder,
} from "@/api/rental/business";
import { mapState } from "vuex";
import {
  BUSINESS_ACTIVITY_LIST,
  BUSINESS_ACTIVITY_STATUS,
  BUSINESS_ORDER_PAY_WAY_STATUS,
} from "@/utils/constant";

export default {
  data() {
    return {
      search: {
        companyName: "",
        contactName: "",
        mobile: "",
        account: undefined,
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
      BUSINESS_ACTIVITY_LIST,
      BUSINESS_ACTIVITY_STATUS,
      BUSINESS_ORDER_PAY_WAY_STATUS,
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  mounted() {
    this.search.account = this.userInfo.account;
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
      getBusinessOrderList(this.search).then((res) => {
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
      this.search.contactName = "";
      this.search.mobile = "";
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    del(row) {
      this.$confirm(`确定要取消这个活动吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const params = {
          id: row.id,
        };
        removeBusinessOrder(params)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("活动取消成功");
              this.searchList();
            } else {
              this.$message.error(res.msg || "活动取消失败");
            }
          })
          .catch((err) => {
            this.$message.error("活动取消失败");
          });
      });
    },

    goDetailPage(row) {
      this.$router.push({
        path: "/rental/business/businessOrderDetail",
        query: {
          id: row.id,
        },
      });
    },

    goBusinessListPage() {
      this.$router.push({
        path: "/rental/business",
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
