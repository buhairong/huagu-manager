<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >订单管理</el-breadcrumb-item
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
              <div class="label">客户手机号</div>
              <c-input
                :inputValue.sync="search.mobile"
                placeholder="请输入客户手机号"
              />
            </div>

            <div class="search-item">
              <div class="label">订单状态</div>
              <c-select
                :selectValue.sync="search.status"
                :options="MEMBER_CAR_RENTAL_ORDER_LIST"
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

        <el-table-column label="车辆信息">
          <template slot-scope="scope">
            <div>
              <div>
                {{ scope.row.carTypeYearProductEntity.carBrand }}·{{
                  scope.row.carTypeYearProductEntity.carType
                }}
              </div>
              <div>{{ scope.row.carTypeYearProductEntity.carTypeYear }}</div>
              <div>
                {{ scope.row.carTypeYearProductEntity.carTypeYearProduct }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="订单类型">
          <template slot-scope="scope">
            {{ CUSTOM_TYPE_STATUS[scope.row.orderType] }}
          </template>
        </el-table-column>

        <el-table-column prop="sex" label="客户姓名">
          <template slot-scope="scope">
            {{ scope.row?.userEntity?.name }}
          </template>
        </el-table-column>

        <el-table-column prop="mobile" label="客户手机号">
          <template slot-scope="scope">
            {{ scope.row?.userEntity?.mobile }}
          </template>
        </el-table-column>

        <el-table-column label="客户公司">
          <template slot-scope="scope">
            {{ scope.row?.userCompanyEntity?.companyName }}
          </template>
        </el-table-column>

        <el-table-column label="用车日期">
          <template slot-scope="scope">
            {{ scope.row.startDate.slice(0, 10) }} 至
            {{ scope.row.endDate.slice(0, 10) }}
          </template>
        </el-table-column>

        <el-table-column label="总价">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.totalPayment) }} 元
          </template>
        </el-table-column>

        <el-table-column label="支付方式">
          <template slot-scope="scope">
            {{ PAY_WAY_STATUS[scope.row.payWay] }}
          </template>
        </el-table-column>

        <el-table-column label="订单状态">
          <template slot-scope="scope">
            {{ MEMBER_CAR_RENTAL_ORDER_STATUS[scope.row.status] }}
          </template>
        </el-table-column>

        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.payWay == 3 && scope.row.status == 1">
              <div class="table-btn" @click="examine(scope.row.id, 2)">
                审核通过
              </div>
              <div class="table-btn" @click="examine(scope.row.id, 3)">
                审核拒绝
              </div>
            </div>
            <div v-if="scope.row.status == 2">
              <div class="table-btn" @click="openEndOrderDialog(scope.row)">
                结束订单
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>

    <el-dialog
      title="结束订单"
      :visible.sync="showEndOrderDialog"
      width="600px"
      :before-close="handleCloseDialog"
    >
      <div class="update-item">
        <div class="label">车牌号</div>
        <c-input
          :inputValue.sync="endOrderParams.carNumber"
          placeholder="请输入车牌号"
        >
        </c-input>
      </div>

      <div class="update-item">
        <div class="label">实际用车时间</div>
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="yyyy-MM-dd HH"
          value-format="yyyy-MM-dd HH"
          popper-class="pickerDeleteMinutes"
          @change="handlerSelectDate"
        >
        </el-date-picker>
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <div class="btn" @click="handleCloseDialog">取消</div>
          <div class="btn save-btn" @click="save">确定</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { mapState } from "vuex";
import {
  PAY_WAY_LIST,
  PAY_WAY_STATUS,
  MEMBER_CAR_RENTAL_ORDER_LIST,
  MEMBER_CAR_RENTAL_ORDER_STATUS,
  CUSTOM_TYPE_STATUS,
} from "@/utils/constant";
import { getOrderList, examine, endOrder } from "@/api/rental/order";

export default {
  data() {
    return {
      search: {
        account: "",
        orderNum: "",
        mobile: "",
        status: "",
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
      PAY_WAY_LIST,
      PAY_WAY_STATUS,
      MEMBER_CAR_RENTAL_ORDER_LIST,
      MEMBER_CAR_RENTAL_ORDER_STATUS,
      CUSTOM_TYPE_STATUS,
      currentOrder: {},
      showEndOrderDialog: false,
      endOrderParams: {
        id: "",
        actualStartDate: "",
        actualEndDate: "",
        carNumber: "",
      },
      dateRange: [],
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
      getOrderList(this.search).then((res) => {
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
      this.search.mobile = "";
      this.search.status = "";
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    examine(id, status) {
      const params = {
        id,
        status,
      };
      examine(params)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.searchList();
          } else {
            this.$message.error(res.msg || "保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    openEndOrderDialog(row) {
      this.endOrderParams.id = row.id;
      this.showEndOrderDialog = true;
    },

    handleCloseDialog() {
      this.showEndOrderDialog = false;
      this.endOrderParams.id = "";
      this.endOrderParams.actualStartDate = "";
      this.endOrderParams.actualEndDate = "";
      this.endOrderParams.carNumber = "";
      this.dateRange = [];
    },

    handlerSelectDate(data) {
      if (data) {
        this.endOrderParams.actualStartDate = data[0] + ":00:00";
        this.endOrderParams.actualEndDate = data[1] + ":00:00";
        this.dateRange = data;
      } else {
        this.endOrderParams.actualStartDate = "";
        this.endOrderParams.actualEndDate = "";
        this.dateRange = [];
      }
    },

    save() {
      if (!this.endOrderParams.carNumber) {
        this.$message.error("请输入车牌号");
        return false;
      }

      if (!this.endOrderParams.actualStartDate) {
        this.$message.error("请选择实际用车时间");
        return false;
      }

      endOrder(this.endOrderParams)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.searchList();
            this.handleCloseDialog();
          } else {
            this.$message.error(res.msg || "保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.update-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  margin-right: 24px;
  .label {
    width: 120px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4e5969;
    margin-right: 16px;
    text-align: right;
  }
}
</style>
