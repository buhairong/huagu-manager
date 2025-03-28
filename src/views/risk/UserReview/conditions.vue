<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>风控管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信审</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >风控条件</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="content">
      <div class="title">筛选</div>
      <div class="search-wrap">
        <div class="search-item">
          <div class="label">适用客户</div>
          <c-select
            :selectValue.sync="search.applyClient"
            :options="CUSTOM_TYPE"
          />
        </div>

        <div class="search-item">
          <div class="label">数据来源</div>
          <c-select
            :selectValue.sync="search.riskCooperationServiceName"
            :options="dataTypeList"
          />
        </div>

        <search-button class="search-btn" @search="searchList" />
        <reset-button @reset="reset" />
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column prop="apiName" label="条件名称"> </el-table-column>
        <el-table-column label="条件描述">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.description"
              placement="bottom-start"
            >
              <div
                class="desc"
                v-for="(item, index) in scope.row.description.split('\n')"
                :key="index"
              >
                {{ item }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="判断逻辑">
          <template slot-scope="scope">
            <div
              v-for="(item, index) in JSON.parse(
                scope.row.rule
              ).ruleConfig.filter((item) => item.value)"
              :key="index"
            >
              {{
                LOGIC_TYPE.find((type) => type.value == item.value).label
              }}：{{ item.description }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="适用客户" width="120">
          <template slot-scope="scope">
            <div>{{ getCustomType(scope.row.applyClient) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="数据来源" width="150">
          <template slot-scope="scope">
            <div>{{ getDataType(scope.row) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="expireDate" label="到期时间" width="180">
        </el-table-column>
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="judge(scope.row)">判断逻辑</div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>

    <ConditionsJudgeDialog
      v-if="showConditionsJudgeDialog"
      :showConditionsJudgeDialog.sync="showConditionsJudgeDialog"
      :conditionsJudge="conditionsJudge"
      @comfirm="comfirm"
    />
  </div>
</template>

<script>
import {
  selectCooperationServiceName,
  getConditions,
  updateRiskConditionRule,
} from "@/api/risk/userReview";
import { CUSTOM_TYPE, LOGIC_TYPE } from "@/utils/constant";
import ConditionsJudgeDialog from "../components/ConditionsJudgeDialog.vue";

export default {
  name: "Conditions",
  components: {
    ConditionsJudgeDialog,
  },
  data() {
    return {
      CUSTOM_TYPE,
      LOGIC_TYPE,
      search: {
        applyClient: "",
        riskCooperationServiceName: "",
        limit: 10,
        page: 1,
      },
      dataTypeList: [],
      list: [],
      total: 0,
      showConditionsJudgeDialog: false,
      conditionsJudge: {},
      conditionsId: null,
    };
  },

  mounted() {
    this.selectCooperationServiceName();
    this.getConditions();
  },

  methods: {
    selectCooperationServiceName() {
      selectCooperationServiceName().then((res) => {
        if (res.code == 0) {
          this.dataTypeList = res.data.map((item) => {
            return {
              label: item,
              value: item,
            };
          });
        }
      });
    },

    getConditions() {
      getConditions(this.search).then((res) => {
        if (res.code == 0) {
          this.list = res.data.records;
          this.total = res.data.total;
        }
      });
    },

    searchList() {
      this.search.page = 1;
      this.getConditions();
    },

    reset() {
      this.search.applyClient = "";
      this.search.riskCooperationServiceName = "";
      this.search.page = 1;
    },

    getCustomType(key) {
      let res = "-";
      if (key) {
        const item = CUSTOM_TYPE.find((item) => item.value == key);
        if (item) {
          res = item.label;
        }
      }

      return res;
    },

    getDataType(row) {
      let res = "-";
      if (
        row.riskCooperationServiceName &&
        (row.queryMoney || row.residueSize)
      ) {
        res = row.riskCooperationServiceName;
        if (row.queryMoney) {
          res += `（¥ ${row.queryMoney}/次）`;
        } else {
          res += `（剩余${row.residueSize}次）`;
        }
      }

      return res;
    },

    judge(row) {
      this.conditionsJudge = row.rule;
      this.conditionsId = row.id;
      this.showConditionsJudgeDialog = true;
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.getConditions();
    },

    comfirm(e) {
      const data = {
        id: this.conditionsId,
        rule: e,
      };
      updateRiskConditionRule(data)
        .then((res) => {
          if (res.code == 0) {
            this.showConditionsJudgeDialog = false;
            this.$message.success("保存成功");
            this.getConditions();
          } else {
            this.$message.error("保存失败");
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
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1d2129;
  margin-bottom: 23px;
}

.search-wrap {
  margin-bottom: 60px;
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
    }
  }
  .search-btn {
    margin-left: 15px;
    margin-right: 30px;
  }
}

.font_detail {
  width: 110px;
  display: flex;
  flex-direction: column;
  .el-button {
    margin: 0;
    padding: 10px 0;
  }
  .el-button--text {
    color: #3446aa;
  }
}

.desc {
  // display: block;
  // overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
}
</style>
