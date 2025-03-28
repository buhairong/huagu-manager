<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>竞价管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan">竞价列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
      <div class="title">筛选</div>
      <div class="search-wrap">
        <div class="search-line">
          <div class="search-item">
            <div class="label">商户名称</div>
            <c-input
              :inputValue.sync="search.companyName"
              placeholder="请输入商户名称"
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
            <div class="label">竞价周期</div>
            <c-input
              :inputValue.sync="search.periodDay"
              placeholder="请输入竞价周期"
            />
          </div>

          <search-button class="search-btn" @search="searchList" />
        </div>

        <div class="search-line search-line2">
          <div class="search-item">
            <div class="label">竞价状态</div>
            <c-select
              :selectValue.sync="search.status"
              :options="auctionCarStatusList"
            />
          </div>

          <div class="search-item">
            <div class="label">开始时间</div>
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
          prop="companyName"
          label="商户名称"
        >
        </el-table-column>

        <el-table-column label="竞价车辆">
          <template slot-scope="scope">
            <div>
              <div>{{ scope.row.carBrand }}·{{ scope.row.carType }}</div>
              <div>{{ scope.row.carTypeYear }}</div>
              <div>{{ scope.row.carTypeYearProduct }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="起拍价格">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.startingPrice) }}元</div>
          </template>
        </el-table-column>

        <el-table-column label="加价幅度">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.advance) }}元</div>
          </template>
        </el-table-column>

        <el-table-column label="保证金">
          <template slot-scope="scope">
            <div>{{ formatThousandNumber(scope.row.deposit) }}元</div>
          </template>
        </el-table-column>

        <el-table-column label="竞价周期">
          <template slot-scope="scope">
            <div>{{ scope.row.periodDay }}天</div>
          </template>
        </el-table-column>

        <el-table-column 
          prop="startTime" 
          label="开始时间"
        >
        </el-table-column>

        <el-table-column 
          prop="endTime" 
          label="结束时间"
        >
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <div>{{ auctionCarStatus[scope.row.status] }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goOrderDetailPage(scope.row.id)">
              查看详情
            </div>
            <div class="table-btn" @click="delOrder(scope.row.id)">
              撤回竞价
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getAuctionList, delAuction } from "@/api/auction/auction";
import { auctionCarStatusList, auctionCarStatus } from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";

export default {
  name: "AuctionCarList",

  components: {},

  data() {
    return {
      auctionCarStatusList,
      auctionCarStatus,
      search: {
        companyName: "",
        carInfo: "", 
        periodDay: "",
        status: "",
        startTime: "", // 创建日期 - 开始日期
        endTime: "", // 创建日期 - 结束日期
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
      getAuctionList(this.search).then((res) => {
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
      this.search.companyName = ""
      this.search.carInfo = ""
      this.search.periodDay = ""
      this.search.status = ""
      this.search.startTime = ""
      this.search.endTime = ""
      this.search.page = 1
      this.dateRange = []
      this.searchList()
    },

    goOrderDetailPage(carId) {
      this.$router.push({
        path: "/auction/auctionCarDetail",
        query: {
          carId,
        },
      })
    },

    delOrder(id) {
      this.$confirm(`确定要删除这个竞拍吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id
        }

        delAuction(data).then(res => {
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
