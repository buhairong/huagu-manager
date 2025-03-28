<template>
  <el-dialog
    title=""
    :visible.sync="show"
    width="980px"
    :before-close="handleCloseDialog"
  >
    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">车型名称</div>
          <c-input
            :inputValue.sync="search.carTypeYearProduct"
            placeholder="请输入车型名称"
          />
        </div>

        <search-button class="search-btn" @search="selectList" />
      </div>
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      max-height="350"
    >
      <el-table-column label="支持车型">
        <template slot-scope="scope">
          <div>
            {{ scope.row.carType.carBrand }}·{{ scope.row.carType.carType }}
          </div>
          <div>{{ scope.row.carType.carTypeYear }}</div>
          <div>{{ scope.row.carType.carTypeYearProduct }}</div>
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
              <div v-else-if="item.monthTotal === 6 && item.paymentType === 4">
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

      <el-table-column label="方案创建时间">
        <template slot-scope="scope">
          <div>{{ scope.row.createdTime || "-" }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="110" align="center">
        <template slot-scope="scope">
          <div class="table-btn" @click="save(scope.row)">选择产品</div>
        </template>
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <div class="dialog-btn-wrap">
        <div class="btn" @click="handleCloseDialog">取消</div>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { selectList } from "@/api/subscribe/subscribe";
import { formatThousandNumber } from "@/utils/util";
import { POWER_MODE_STATUS } from "@/utils/constant";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },

    carType: {
      type: Number,
      default: 1,
    },

    businessType: {
      type: Number,
      default: 2,
    },
  },

  data() {
    return {
      POWER_MODE_STATUS,
      search: {
        carType: 1,
        carTypeYearProduct: "",
        limit: 1000,
        page: 1,
      },
      list: [],
    };
  },

  mounted() {
    this.search.carType = this.carType;
    this.search.businessType = this.businessType;
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

    handleCloseDialog() {
      this.$emit("update:show", false);
    },

    save(row) {
      this.$emit("save", row);
      this.handleCloseDialog();
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
