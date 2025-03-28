<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >车辆管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">车辆信息</div>
              <c-input
                :inputValue.sync="search.carInfo"
                placeholder="请输入车辆信息"
              />
            </div>

            <search-button class="search-btn" @search="handleSearchBtn" />
            <reset-button class="search-btn" @reset="reset" />
          </div>
        </div>

        <div class="add-plus-btn" @click="goSaveCarPage('add')">
          <span class="icon"><i class="el-icon-plus"></i></span>
          添加车辆
        </div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
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

        <el-table-column prop="guidancePrice" label="新车指导价">
          <template slot-scope="scope">
            {{
              formatThousandNumber(
                scope.row.carTypeYearProductEntity.dealerReferencePrice
              )
            }}元
          </template>
        </el-table-column>

        <el-table-column prop="money" label="车辆租金">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.citySubscribeReq[0].money) }}元/天
          </template>
        </el-table-column>

        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goCarDetailPage(scope.row)">
              查看详情
            </div>
            <div class="table-btn" @click="goSaveCarPage('edit', scope.row)">
              编辑车辆
            </div>
            <div class="table-btn" @click="delCar(scope.row)">删除车辆</div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getCarList, removeCar } from "@/api/rental/car";
import { formatThousandNumber } from "@/utils/util";

export default {
  data() {
    return {
      search: {
        carInfo: "",
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
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    searchList() {
      getCarList(this.search).then((res) => {
        this.list = res.data;
        //this.total = res.data.total
      });
    },

    handleSearchBtn() {
      this.search.page = 1;
      this.searchList();
    },

    reset() {
      this.search.carInfo = "";
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    goSaveCarPage(type, row = {}) {
      this.$router.push({
        path: "/rental/car/addOrUpdateCar",
        query: {
          type,
          carId: row.id,
        },
      });
    },

    delCar(row) {
      this.$confirm(`确定要删除这辆车吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const params = {
          id: row.id,
        };
        removeCar(params)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.searchList();
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((err) => {
            this.$message.error("删除失败");
          });
      });
    },

    goCarDetailPage(row) {
      this.$router.push({
        path: "/rental/car/carDetail",
        query: {
          carId: row.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search-item {
  .el-input {
    width: 220px;
  }
}
</style>
