<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>营销活动</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >产品推荐</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content">
      <div class="create-btn-wrap">
        <div class="title">推荐新车订阅产品</div>
        <div style="display: flex; align-items: center">
          <create-button text="添加产品" @create="set(1)" />
          <div
            class="link-text"
            style="margin-left: 16px"
            @click="openLogDialog"
          >
            操作日志
          </div>
        </div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
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
            <div class="table-btn" @click="set(2, scope.row)">更换产品</div>
            <div class="table-btn" @click="del(scope.row)">移除产品</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <ChooseSubscribeDialog
      v-if="showChooseSubscribeDialog"
      :show.sync="showChooseSubscribeDialog"
      :carType="1"
      :businessType="5"
      @save="handleChoose"
    />

    <LogDialog v-if="showLogDialog" :show.sync="showLogDialog" :logType="6" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  selectList,
  addSubscribeIsRecommend,
  updateSubscribeIsRecommend,
  deleteSubscribeIsRecommend,
} from "@/api/subscribe/subscribe";
import { addLogList } from "@/api/log/log";
import { POWER_MODE_STATUS } from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";
import ChooseSubscribeDialog from "../subscribe/components/ChooseSubscribeDialog.vue";
import LogDialog from "@/components/LogDialog.vue";

export default {
  name: "partnerRecommendList",

  components: {
    ChooseSubscribeDialog,
    LogDialog,
  },

  data() {
    return {
      POWER_MODE_STATUS,
      search: {
        carType: 1,
        businessType: 4,
        limit: 1000,
        page: 1,
      },
      list: [],
      total: 0,
      currentSubscribe: {},
      type: null,
      showChooseSubscribeDialog: false,
      showLogDialog: false,
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  mounted() {
    this.selectList();
  },

  methods: {
    selectList() {
      selectList(this.search).then((res) => {
        if (res.code === 0) {
          this.list = res.data.records;
        }
      });
    },

    // 1.添加 2.修改
    set(type, row) {
      this.type = type;
      this.currentSubscribe = row;
      this.showChooseSubscribeDialog = true;
    },

    handleChoose(row) {
      if (this.type === 1) {
        this.save(row);
      } else {
        this.update(row);
      }
    },

    save(row) {
      addSubscribeIsRecommend({
        id: row.id,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.selectList();
            const data = [
              {
                logType: 6,
                account: this.userInfo.account,
                userName: this.userInfo.name,
                operateType: "添加产品",
                beforeModify: "",
                afterModify: `${row.carType.carBrand}·${row.carType.carType}、${row.carType.carTypeYear}、${row.carType.carTypeYearProduct}`,
              },
            ];
            this.addLog(data);
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    update(row) {
      updateSubscribeIsRecommend({
        afterId: row.id,
        beforeId: this.currentSubscribe.id,
      })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.selectList();
            const data = [
              {
                logType: 6,
                account: this.userInfo.account,
                userName: this.userInfo.name,
                operateType: "更换产品",
                beforeModify: `${this.currentSubscribe.carType.carBrand}·${this.currentSubscribe.carType.carType}、${this.currentSubscribe.carType.carTypeYear}、${this.currentSubscribe.carType.carTypeYearProduct}`,
                afterModify: `${row.carType.carBrand}·${row.carType.carType}、${row.carType.carTypeYear}、${row.carType.carTypeYearProduct}`,
              },
            ];
            this.addLog(data);
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    del(row) {
      this.$confirm(`确定要删除这个产品吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id: row.id,
        };

        deleteSubscribeIsRecommend(data)
          .then((res) => {
            if (res.code === 0) {
              this.$message.success("删除成功");
              this.selectList();
              const data = [
                {
                  logType: 6,
                  account: this.userInfo.account,
                  userName: this.userInfo.name,
                  operateType: "移除产品",
                  beforeModify: `${row.carType.carBrand}·${row.carType.carType}、${row.carType.carTypeYear}、${row.carType.carTypeYearProduct}`,
                  afterModify: "",
                },
              ];
              this.addLog(data);
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((err) => {
            console.log("删除失败", err);
            this.$message.error("删除失败");
          });
      });
    },

    addLog(logEntityList) {
      addLogList({ logEntityList }).then((res) => {
        if (res.code === 0) {
          //
        }
      });
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    openLogDialog() {
      this.showLogDialog = true;
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
  justify-content: space-between;
  align-items: center;
  .title {
    color: #4e5969;
    font-weight: 500;
    font-size: 22px;
    margin: 0;
  }
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
