<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >个性化订单</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content">
      <div class="title">筛选</div>
      <div class="search-wrap">
        <div class="search-line">
          <div class="search-item">
            <div class="label">合同编号</div>
            <c-input
              :inputValue.sync="search.contractLabelNum"
              placeholder="请输入合同编号"
            />
          </div>

          <div class="search-item">
            <div class="label">客户信息</div>
            <c-input
              :inputValue.sync="search.nameOrMobile"
              placeholder="请输入客户信息"
            />
          </div>

          <div class="search-item">
            <div class="label">车辆信息</div>
            <c-input
              :inputValue.sync="search.carInfo"
              placeholder="请输入车辆信息"
            />
          </div>

          <div class="search-item">
            <div class="label">订阅周期</div>
            <c-select
              :selectValue.sync="search.period"
              :options="SUBSCRIBE_PERIOD"
            />
          </div>

          <search-button class="search-btn" @search="searchList" />
        </div>

        <div class="search-line search-line2">
          <div class="search-item">
            <div class="label">设备价格</div>
            <amount-range-select
              :minSelectValue.sync="search.minMoney"
              :maxSelectValue.sync="search.maxMoney"
              :style="{ width: '365px' }"
              @select="handlerSelectAmount"
            />
          </div>

          <div class="search-item">
            <div class="label">创建日期</div>
            <date-range-select
              :value.sync="dateRange"
              @select="handlerSelectDate"
            />
          </div>

          <reset-button class="search-btn" @reset="reset" />
        </div>
      </div>

      <div class="create-btn-wrap">
        <create-button text="创建订单" @create="goSetOrderPage(1)" />
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column
          prop="contractLabelNum"
          label="合同编号"
          align="center"
        >
        </el-table-column>

        <el-table-column label="客户信息">
          <template slot-scope="scope">
            <div>
              <div>{{ scope.row.name }}</div>
              <div>{{ scope.row.mobile }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="车辆信息" prop="carFullName">
          <!-- <template slot-scope="scope">
            <div>
              <div>{{ scope.row.carBrand }}·{{ scope.row.carType }}</div>
              <div>{{ scope.row.carTypeYear }}</div>
              <div>{{ scope.row.carTypeYearProduct }}</div>
            </div>
          </template> -->
        </el-table-column>

        <el-table-column label="设备价格">
          <template slot-scope="scope">
            <div>¥ {{ formatThousandNumber(scope.row.devicePrice) }}</div>
          </template>
        </el-table-column>

        <el-table-column label="首付比例">
          <template slot-scope="scope">
            <div>{{ scope.row.firstPeriodRate }}%</div>
          </template>
        </el-table-column>

        <el-table-column label="订阅周期">
          <template slot-scope="scope">
            <div>{{ SUBSCRIBE_PERIOD_STATUS[scope.row.period] }}</div>
          </template>
        </el-table-column>

        <el-table-column label="期末余值">
          <template slot-scope="scope">
            <div>¥ {{ formatThousandNumber(scope.row.devicePrice * scope.row.residualValueRate / 100) }}</div>
          </template>
        </el-table-column>

        <el-table-column label="年利率">
          <template slot-scope="scope">
            <div>{{ scope.row.irrRate }}%</div>
          </template>
        </el-table-column>

        <el-table-column prop="createdTime" label="创建日期" align="center">
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goOrderDetailPage(scope.row.id)">
              查看详情
            </div>
            <div class="table-btn" @click="goSetOrderPage(2, scope.row.id)">
              编辑订单
            </div>
            <div class="table-btn" @click="delOrder(scope.row.id)">
              删除订单
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { selectIndividuationOrder, delIndividuationOrder } from "@/api/order/customerOrder";
import { SUBSCRIBE_PERIOD, SUBSCRIBE_PERIOD_STATUS } from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";

export default {
  name: "customerOrder",

  components: {},

  data() {
    return {
      SUBSCRIBE_PERIOD,
      SUBSCRIBE_PERIOD_STATUS,
      search: {
        contractLabelNum: "", // 合同编号
        nameOrMobile: "", // 请输入客户信息
        carInfo: "", // 车辆信息
        minMoney: "", // 设备价格最小值
        maxMoney: "", // 设备价格最大值
        period: "", // 订阅周期
        minCreatedTime: "", // 创建日期 - 开始日期
        maxCreatedTime: "", // 创建日期 - 结束日期
        limit: 10,
        page: 1,
      },
      dateRange: [],
      total: 0,
      list: [],
    };
  },

  mounted() {
    this.searchList();
  },

  methods: {
    searchList() {
      selectIndividuationOrder(this.search).then((res) => {
        if (res.code === 0) {
          this.list = res.data.records;
          this.total = res.data.total;
        }
      })
    },

    handlerSelectAmount(data) {
      this.search.minMoney = data.min;
      this.search.maxMoney = data.max;
    },

    handlerSelectDate(data) {
      if (data) {
        this.search.minCreatedTime = data[0];
        this.search.maxCreatedTime = data[1];
        this.dateRange = data;
      } else {
        this.search.minCreatedTime = "";
        this.search.maxCreatedTime = "";
        this.dateRange = [];
      }
    },

    reset() {
      this.search.contractLabelNum = "";
      this.search.nameOrMobile = "";
      this.search.carInfo = "";
      this.search.minMoney = "";
      this.search.maxMoney = "";
      this.search.period = "";
      this.search.minCreatedTime = "";
      this.search.maxCreatedTime = "";
      this.search.page = 1;
      this.dateRange = [];
      this.searchList();
    },

    // type: 1.创建 2.编辑
    goSetOrderPage(type, orderId='') {
      this.$router.push({
        path: "/order/setCustomerOrder",
        query: {
          type,
          orderId,
        },
      });
    },

    goOrderDetailPage(orderId) {
      this.$router.push({
        path: "/order/customerOrderDetail",
        query: {
          orderId,
        },
      });
    },

    delOrder(orderId) {
      this.$confirm(`确定要删除这个订单吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = [orderId]

        delIndividuationOrder(data).then(res => {
            if (res.code === 0) {
                this.$message.success('删除成功')
                this.searchList()
            } else {
                this.$message.error('删除失败')
            }
        }).catch(err => {
            this.$message.error('删除失败')
        })
      });
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1d2129;
  margin-bottom: 23px;
}

.search-line {
  display: flex;
  align-items: center;
  .search-item {
    display: flex;
    align-items: center;
    margin-right: 24px;
    .label {
      height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 22px;
      color: #4e5969;
      margin-right: 16px;
      text-align: right;
    }
  }
}
.search-line2 {
  margin: 30px 0;
}

.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
