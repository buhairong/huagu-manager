<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column label="方案名称">
        <template slot-scope="scope">
          <div>
            {{ scope.row.productSchemeName || "-" }}
            <i
              style="margin-left: 10px"
              @click="setSubScribeName(scope.row)"
              class="el-icon-edit"
            ></i>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="方案车型">
        <template slot-scope="scope">
          <div>
            {{ scope.row.carType.carBrand }}·{{ scope.row.carType.carType }}
          </div>
          <div>{{ scope.row.carType.carTypeYear }}</div>
          <div>{{ scope.row.carType.carTypeYearProduct }}</div>
        </template>
      </el-table-column>

      <el-table-column label="订阅周期">
        <template slot-scope="scope">
          <div>
            {{
              scope.row.monthTotal === 6 && scope.row.paymentType === 4
                ? 12
                : scope.row.monthTotal
            }}期
          </div>
        </template>
      </el-table-column>

      <el-table-column label="订阅押金">
        <template slot-scope="scope">
          <div>{{ formatThousandNumber(scope.row.deposit) }}元</div>
        </template>
      </el-table-column>

      <el-table-column label="订阅费用">
        <template slot-scope="scope">
          <div>
            {{ formatThousandNumber(scope.row.monthPay) }}/月 ({{
              scope.row.monthTotal === 6 && scope.row.paymentType === 4
                ? "半年付"
                : "一次性付"
            }})
          </div>
        </template>
      </el-table-column>

      <el-table-column label="分销佣金">
        <template slot="header">
          分销佣金
          <el-popover width="200" trigger="hover">
            <span>
              分销佣金是平台合伙人或其他商户帮您引荐客户，最终成交后您所给予的奖励。您设置分销佣金后，平台其他商户及海量的合伙人将会一起帮您推广，具体金额您可自由设置，金额越高合伙人和商户会越有动力。
            </span>
            <span slot="reference">
              <i class="el-icon-warning-outline"></i>
            </span>
          </el-popover>
        </template>
        <template slot-scope="scope">
          <div>
            ￥{{ formatThousandNumber(scope.row.distributionBrokerage) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column v-if="type == 2" label="订阅方案来源">
        <template slot-scope="scope">
          <div>{{ scope.row.merchantName || "-" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="方案创建时间">
        <template slot-scope="scope">
          <div>{{ scope.row.createdTime || "-" }}</div>
        </template>
      </el-table-column>

      <el-table-column v-if="type == 2" label="方案状态">
        <template slot-scope="scope">
          <div>{{ OLD_CAR_CHECK_STATUS[scope.row.finalCheckStatus] }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
          <div class="table-btn" @click="edit(scope.row)">修改方案</div>
          <div class="table-btn" @click="del(scope.row)">删除方案</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  updateCarSubscribeName,
  deleteCityCarSubscribe,
  deleteCarSubscribeByCity,
} from "@/api/subscribe/subscribe";
import { formatThousandNumber } from "@/utils/util";
import { OLD_CAR_CHECK_STATUS } from "@/utils/constant";

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    type: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      OLD_CAR_CHECK_STATUS,
    };
  },

  mounted() {},

  methods: {
    setSubScribeName(row) {
      this.$prompt("请输入方案名称", "修改方案名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: (value) => {
          if (!value || !value.trim()) {
            return "请输入方案名称";
          }
        },
      }).then(({ value }) => {
        this.updateCarSubscribeName(value, row);
      });
    },

    updateCarSubscribeName(subscribeName, row) {
      const params = {
        newType: this.type,
        subscribeName,
        id: this.type == 1 ? row.carType.id : row.id,
      };

      updateCarSubscribeName(params)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.$emit("search");
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    // 1.添加 2.编辑
    edit(row) {
      this.$router.push({
        path: "/product/setSubscribe",
        query: {
          subscribeId: row.id,
          carTypeYearProductId: row.carType.id,
          type: this.type,
          operator: 2,
        },
      });
    },

    goDetailPage(row) {
      this.$router.push({
        path: "/product/subscribe/detail",
        query: {
          subscribeId: row.id,
          carTypeYearProductId: row.carType.id,
          type: this.type,
        },
      });
    },

    del(row) {
      this.$confirm(`确定要删除这个方案吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const data = {
          id: row.id,
          carTypeYearProductId: row.carType.id,
          newType: this.type,
        };

        if (this.type == 1) {
          deleteCarSubscribeByCity(data)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("删除成功");
                this.$emit("search");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((err) => {
              this.$message.error("删除失败");
            });
        } else {
          deleteCityCarSubscribe(data)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("删除成功");
                this.$emit("search");
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((err) => {
              this.$message.error("删除失败");
            });
        }
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

<style lang="less" scoped></style>
