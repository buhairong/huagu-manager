<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>竞价管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan">交易纠纷</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
      <div class="title">筛选</div>
      <div class="search-wrap">
        <div class="search-line">
          <div class="search-item">
            <div class="label">发起方名称</div>
            <c-input
              :inputValue.sync="search.name"
              placeholder="请输入发起方名称"
            />
          </div>

          <div class="search-item">
            <div class="label">竞价车辆</div>
            <c-input
              :inputValue.sync="search.carInfo"
              placeholder="请输入竞价车型"
            />
          </div>

          <div class="search-item">
            <div class="label">取消原因</div>
            <c-select
              :selectValue.sync="search.reason"
              :options="disputeReasonList"
            />
          </div>

          <search-button class="search-btn" @search="searchList" />
        </div>

        <div class="search-line search-line2">
          <div class="search-item">
            <div class="label">审批状态</div>
            <c-select
              :selectValue.sync="search.status"
              :options="disputeStatusList"
            />
          </div>

          <div class="search-item">
            <div class="label">提交时间</div>
            <date-range-select
              :value.sync="dateRange"
              @select="handlerSelectDate"
            />
          </div>

          <reset-button class="search-btn" @reset="reset" />
        </div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column
          label="发起方"
        >
          <template slot-scope="scope">
            <div>
              <div>{{ scope.row.name }}</div>
              <div>{{ scope.row.mobile }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column 
          prop="reason" 
          label="取消交易原因"
        >
        </el-table-column>

        <el-table-column label="最终竞价">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.finalPrice) }}元</div>
          </template>
        </el-table-column>

        <el-table-column label="保证金">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.deposit) }}元</div>
          </template>
        </el-table-column>

        <el-table-column label="商户需赔付">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.mercharPaytPrice) }}元</div>
          </template>
        </el-table-column>

        <el-table-column label="用户需赔付">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.wecarsPayPrice) }}元</div>
          </template>
        </el-table-column>

        <el-table-column 
          prop="createdTime" 
          label="提交申请时间"
        >
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <div>{{ disputeStatus[scope.row.status] }}</div>
          </template>
        </el-table-column>

        <el-table-column 
          prop="updatedTime" 
          label="审核时间"
        >
        </el-table-column>

        <el-table-column 
          prop="updatedBy" 
          label="审核人员"
        >
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goOrderDetailPage(scope.row.id)">
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
import { getDisputesList, delAuction } from "@/api/auction/auction";
import { disputeStatusList, disputeStatus, disputeReasonList } from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";

export default {
  name: "AuctionDisputeList",

  components: {},

  data() {
    return {
      disputeStatusList,
      disputeStatus,
      disputeReasonList,
      search: {
        name: "",        // 发起方名称
        carInfo: "",     // 车型
        reason: "",  // 取消原因
        status: "",  // 状态
        startTime: "", // 提交时间 - 开始日期
        endTime: "", // 提交时间 - 结束日期
        limit: 10,
        page: 1,
      },
      dateRange: [],
      createUserList: [],
      total: 0,
      list: [],
    };
  },

  mounted() {
    this.searchList()
  },

  methods: {
    searchList() {
      getDisputesList(this.search).then((res) => {
        if (res.code === 0) {
          this.list = res.data.records
          this.total = res.data.total
        }
      })
    },

    handlerSelectDate(data) {
      if (data) {
        this.search.startTime = data[0]
        this.search.endTime = data[1]
        this.dateRange = data
      } else {
        this.search.startTime = ""
        this.search.endTime = ""
        this.dateRange = []
      }
    },

    reset() {
      this.search.name = ""
      this.search.carInfo = ""
      this.search.reason = ""
      this.search.status = ""
      this.search.startTime = ""
      this.search.endTime = ""
      this.search.page = 1
      this.dateRange = []
      this.searchList()
    },

    goOrderDetailPage(disputeId) {
      this.$router.push({
        path: "/auction/disputeDetail",
        query: {
          disputeId,
        },
      })
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
