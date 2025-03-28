<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class="subscription-plan"
        >车辆管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="content">
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

          <div class="search-item">
            <div class="label">车辆状态</div>
            <c-select :selectValue.sync="search.status" :options="CAR_STATUS" />
          </div>

          <div class="search-item">
            <div class="label">车辆颜色</div>
            <c-select
              :selectValue.sync="search.carColor"
              :options="colorList"
            />
          </div>

          <search-button class="search-btn" @search="searchList" />
          <reset-button class="search-btn" @reset="reset" />
        </div>
      </div>

      <div class="split-line"></div>

      <div class="tab-wrap">
        <div class="tabs">
          <div
            v-for="tab in CAR_NEW_STATUS"
            :key="tab.value"
            class="tab"
            :class="{ active: tab.value == search.newOrOlder }"
            @click="changeTab(tab.value)"
          >
            {{ tab.label }}
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
              <div>{{ scope.row.carBrand }}·{{ scope.row.carType }}</div>
              <div>{{ scope.row.carTypeYear }}</div>
              <div>{{ scope.row.carTypeYearProduct }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="carPlateNum" label="车牌号" width="120">
        </el-table-column>

        <el-table-column prop="carColor" label="车辆颜色" width="120">
        </el-table-column>

        <el-table-column label="车架号＆发动机号" width="140">
          <template slot-scope="scope">
            <div>
              <div>{{ scope.row.frameNum }}</div>
              <div>{{ scope.row.engineNum }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="出厂年限&里程数" width="140">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.years">{{ scope.row.years }}年</div>
              <div>{{ numberToCurrencyNo(scope.row.mileage, "公里") }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="增配项">
          <template slot-scope="scope">
            <div v-if="scope.row.otherConfig.length > 3">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.otherConfig.join('\n')"
              >
                <div>
                  <div
                    class="other-config"
                    v-for="(item, index) in scope.row.otherConfig.slice(0, 3)"
                    :key="index"
                  >
                    {{ item }}
                  </div>
                </div>
              </el-tooltip>
            </div>
            <div v-else>
              <div
                class="other-config"
                v-for="(item, index) in scope.row.otherConfig"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间"> </el-table-column>

        <el-table-column label="车辆状态" width="120">
          <template slot-scope="scope">
            <div>
              {{ getStatus(scope.row.status) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goCarDetailPage(scope.row)">
              查看详情
            </div>
            <div class="table-btn" @click="goSaveCarPage('edit', scope.row)">
              编辑车辆
            </div>
            <div class="table-btn" @click="delAddress(scope.row)">删除车辆</div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { carListByPage, carColorList, deleteCar } from "@/api/car/car";
import { CAR_STATUS, CAR_NEW_STATUS } from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";
import { numberToCurrencyNo } from "@/utils/numberToCurrency";

export default {
  name: "carList",
  data() {
    return {
      CAR_STATUS,
      CAR_NEW_STATUS,
      search: {
        newOrOlder: "1",
        carInfo: "",
        status: "",
        carColor: "",
        limit: 10,
        page: 1,
      },
      colorList: [],
      list: [],
      total: 0,
    };
  },

  mounted() {
    this.carColorList();
    this.carListByPage();
  },

  methods: {
    changeTab(tab) {
      this.search.newOrOlder = tab;
      this.search.page = 1;
      this.carColorList();
      this.carListByPage();
    },

    carColorList() {
      const data = {
        newOrdOld: this.search.newOrOlder,
      };
      carColorList(data).then((res) => {
        if (res.code == 0) {
          this.colorList = res.data.map((item) => {
            return {
              label: item,
              value: item,
            };
          });
        }
      });
    },

    carListByPage() {
      carListByPage(this.search)
        .then((res) => {
          if (res.code == 0) {
            this.list = res.data.records;
            this.total = res.data.total;
          } else {
            this.list = [];
          }
        })
        .catch((err) => {
          this.list = [];
        });
    },

    searchList() {
      this.search.page = 1;
      this.carListByPage();
    },

    reset() {
      this.search.carInfo = "";
      this.search.status = "";
      this.search.carColor = "";
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.carListByPage();
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return `￥${formatThousandNumber(num)}`;
      }
      return "-";
    },

    numberToCurrencyNo(num, unit) {
      if (num) {
        return numberToCurrencyNo(num) + unit;
      }
      return "-";
    },

    getStatus(status) {
      let label = "-";
      if (status || status == 0) {
        const findItem = CAR_STATUS.find((item) => item.value == status);
        if (findItem) {
          label = findItem.label;
        }
      }

      return label;
    },

    goSaveCarPage(type, row = {}) {
      this.$router.push({
        path: "/cars/addOrUpdateCar",
        query: {
          type,
          newOrOlder: this.search.newOrOlder,
          carId: row.id,
        },
      });
    },

    goCarDetailPage(row) {
      this.$router.push({
        path: "/cars/detail",
        query: {
          carId: row.id,
          newOrOlder: this.search.newOrOlder,
        },
      });
    },

    delAddress(row) {
      this.$confirm(`确定要删除这辆车吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id: row.id,
          newOrOld: this.search.newOrOlder,
        };

        deleteCar(data)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.carListByPage();
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((err) => {
            this.$message.error("删除失败");
          });
      });
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
    .label1 {
      width: 70px;
    }
  }
  .search-btn {
    margin-left: 12px;
  }
}
.search-line2 {
  margin-top: 30px;
}

.split-line {
  height: 1px;
  background: #d8d8d8;
  margin-top: 32px;
  margin-bottom: 16px;
}

.tab-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tabs {
  display: flex;
  .tab {
    margin-right: 8px;
    width: 88px;
    height: 28px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    cursor: default;
    &.active {
      background: #f2f3f8;
      color: #3446aa;
    }
  }
}

.other-config {
  margin-bottom: 4px;
  padding: 0 8px;
  line-height: 26px;
  font-size: 12px;
  color: #1d2129;
  border: 1px solid #e5e6eb;
  text-align: center;
}
</style>
