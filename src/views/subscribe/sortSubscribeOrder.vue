<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >产品排序</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content">
      <div class="create-btn-wrap">
        <create-button text="添加产品" @create="set(1)" />
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column label="产品排序" width="110" align="center">
          <template>
            <div>
              <el-image
                style="width: 24px"
                :src="require('@/assets/carRental/order.png')"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="支持车型">
          <template slot-scope="scope">
            <div>
              <div>
                {{ scope.row.carType.carBrand }}·{{ scope.row.carType.carType }}
              </div>
              <div>{{ scope.row.carType.carTypeYear }}</div>
              <div>{{ scope.row.carType.carTypeYearProduct }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="动力类型">
          <template slot-scope="scope">
            <div>
              {{ POWER_MODE_STATUS[scope.row.carType.powerMode] }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="起订周期">
          <template slot-scope="scope">
            <div>
              <div
                class="period"
                v-for="(item, index) in scope.row.detailList"
                :key="index"
              >
                <div v-if="item.monthTotal === 12 && item.paymentType === 0">
                  12期
                </div>
                <div
                  v-else-if="item.monthTotal === 6 && item.paymentType === 4"
                >
                  12期
                </div>
                <div v-else>6期</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="订阅费用" width="200">
          <template slot-scope="scope">
            <div
              class="period"
              v-for="(item, index) in scope.row.detailList"
              :key="index"
            >
              <div class="payment">
                {{ formatThousandNumber(item.monthPay) }}元/月
              </div>
              <div class="payment">
                （{{
                  item.monthTotal === 6 && item.paymentType === 4
                    ? "分两次付"
                    : "一次性付"
                }}{{ formatThousandNumber(item.totalPayment) }}元/次）
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="车辆押金">
          <template slot-scope="scope">
            <div>
              <div
                class="period"
                v-for="(item, index) in scope.row.detailList"
                :key="index"
              >
                <div>{{ formatThousandNumber(item.deposit) }}元</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="方案创建时间" prop="createdTime">
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="set(2, scope.row.id)">更换产品</div>
            <div class="table-btn" @click="del(scope.row.id)">移除产品</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <ChooseSubscribeDialog
      v-if="showChooseSubscribeDialog"
      :show.sync="showChooseSubscribeDialog"
      :carType="1"
      @save="handleChoose"
    />
  </div>
</template>

<script>
import {
  selectList,
  addBusinessSort,
  updateBusinessSort,
  deleteBusinessSort,
  sortSubscribe,
} from "@/api/subscribe/subscribe";
import Sortable from "sortablejs";
import { POWER_MODE_STATUS } from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";
import ChooseSubscribeDialog from "./components/ChooseSubscribeDialog.vue";

export default {
  name: "SortSubscribeOrder",

  components: {
    ChooseSubscribeDialog,
  },

  data() {
    return {
      POWER_MODE_STATUS,
      search: {
        carType: 1,
        businessType: 3,
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
      currentSubscribeId: null,
      type: null,
      showChooseSubscribeDialog: false,
    };
  },

  mounted() {
    this.selectList();
  },

  methods: {
    selectList() {
      selectList(this.search).then((res) => {
        if (res.code === 0) {
          this.list = res.data.records;
          this.$nextTick(() => {
            this.rowDrop();
          });
        }
      });
    },

    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      Sortable.create(tbody, {
        onEnd: ({ newIndex, oldIndex }) => {
          if (newIndex === oldIndex) {
            return;
          }
          this.list.splice(newIndex, 0, this.list.splice(oldIndex, 1)[0]);
          const newArray = this.list.slice(0);
          this.list = [];
          this.$nextTick(() => {
            const data = [];
            this.list = newArray;
            newArray.forEach((item, index) => {
              data.push({
                id: item.id,
                sort: index,
              });
            });
            this.sortCarRental(data);
          });
        },
      });
    },

    sortCarRental(data) {
      sortSubscribe(data)
        .then((res) => {
          if (res.code === 0) {
            this.selectList();
          } else {
            this.$message.error("排序失败");
          }
        })
        .catch((err) => {
          this.$message.error("排序失败");
        });
    },

    // 1.添加 2.修改
    set(type, id) {
      this.type = type;
      this.currentSubscribeId = id;
      this.showChooseSubscribeDialog = true;
    },

    handleChoose(row) {
      if (this.type === 1) {
        this.save(row.id);
      } else {
        this.update(row.id);
      }
    },

    save(businessId) {
      addBusinessSort({
        businessId,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.selectList();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    update(businessId) {
      updateBusinessSort({
        businessId,
        id: this.currentSubscribeId,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.selectList();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    del(id) {
      this.$confirm(`确定要删除这个产品吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id,
        };

        deleteBusinessSort(data)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.selectList();
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((err) => {
            this.$message.error("删除失败");
          });
      });
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

.search-wrap {
  margin-bottom: 20px;
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
.reset-btn {
  margin-left: 20px;
}

.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.period {
  margin-top: 12px;
  height: 44px;
  line-height: 44px;
  .payment {
    height: 22px;
    line-height: 22px;
  }
}
</style>
