<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >券码管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="search-wrap">
        <div class="search-line">
          <div class="search-item">
            <div class="label">手机号</div>
            <c-input
              :inputValue.sync="params.mobile"
              placeholder="请输入手机号"
            />
          </div>

          <div class="search-item">
            <div class="label">金额限制</div>
            <c-input-number
              :inputValue.sync="params.moneyLimit"
              placeholder="请输入金额限制"
            >
            </c-input-number
            >&nbsp;&nbsp; 元
          </div>

          <div class="search-item">
            <div class="label">次数限制</div>
            <c-input-number
              :inputValue.sync="params.countLimit"
              placeholder="请输入次数限制"
            >
            </c-input-number>
          </div>

          <div class="add-plus-btn" @click="handleAddCoupon">添加</div>
        </div>
      </div>

      <el-table
        :data="list"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column label="姓名" prop="name" />

        <el-table-column label="手机号" prop="mobile" />

        <el-table-column prop="moneyLimit" label="金额限制">
          <template slot-scope="scope">
            {{ formatThousandNumber(scope.row.moneyLimit) }}元
          </template>
        </el-table-column>

        <el-table-column prop="countLimit" label="次数限制">
          <template slot-scope="scope"> {{ scope.row.countLimit }}次 </template>
        </el-table-column>

        <el-table-column prop="countLimit" label="已推荐次数">
          <template slot-scope="scope"> {{ scope.row.userCount }}次 </template>
        </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
            <div class="table-btn" @click="edit(scope.row)">编辑</div>
            <div class="table-btn" @click="del(scope.row)">删除</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="编辑"
      :visible.sync="showUpdateDialog"
      width="480px"
      :before-close="handleCloseDialog"
    >
      <div class="update-item">
        <div class="label">手机号</div>
        {{ updateParams.mobile }}
      </div>

      <div class="update-item">
        <div class="label">金额限制</div>
        <c-input-number
          :inputValue.sync="updateParams.moneyLimit"
          placeholder="请输入金额限制"
        >
        </c-input-number
        >&nbsp;&nbsp; 元
      </div>

      <div class="update-item">
        <div class="label">次数限制</div>
        <c-input-number
          :inputValue.sync="updateParams.countLimit"
          placeholder="请输入次数限制"
        >
        </c-input-number>
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <div class="btn" @click="handleCloseDialog">取消</div>
          <div class="btn save-btn" @click="save">确认修改</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAdminWhiteList,
  addAdminWhiteList,
  delAdminWhiteList,
} from "@/api/rental/coupon";
import { formatThousandNumber } from "@/utils/util";

export default {
  data() {
    return {
      params: {
        id: undefined,
        mobile: undefined,
        moneyLimit: undefined,
        countLimit: undefined,
      },
      list: [],
      showUpdateDialog: false,
      updateParams: {
        id: undefined,
        mobile: undefined,
        moneyLimit: undefined,
        countLimit: undefined,
      },
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
      getAdminWhiteList().then((res) => {
        this.list = res.data;
      });
    },

    handleAddCoupon() {
      if (!this.params.mobile) {
        this.$message.error("请输入手机号");
        return false;
      }

      if (!this.params.moneyLimit) {
        this.$message.error("请输入金额限制");
        return false;
      }

      if (!this.params.countLimit) {
        this.$message.error("请输入次数限制");
        return false;
      }

      addAdminWhiteList(this.params)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.searchList();
            this.params.id = undefined;
            this.params.mobile = undefined;
            this.params.moneyLimit = undefined;
            this.params.countLimit = undefined;
          } else {
            this.$message.error(res.msg || "保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    save() {
      if (!this.updateParams.moneyLimit) {
        this.$message.error("请输入金额限制");
        return false;
      }

      if (!this.updateParams.countLimit) {
        this.$message.error("请输入次数限制");
        return false;
      }

      addAdminWhiteList(this.updateParams)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.searchList();
            this.handleCloseDialog();
          } else {
            this.$message.error(res.msg || "保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    handleCloseDialog() {
      this.showUpdateDialog = false;
      this.updateParams.id = undefined;
      this.updateParams.mobile = undefined;
      this.updateParams.moneyLimit = undefined;
      this.updateParams.countLimit = undefined;
    },

    edit(row) {
      this.updateParams.id = row.id;
      this.updateParams.mobile = row.mobile;
      this.updateParams.moneyLimit = row.moneyLimit;
      this.updateParams.countLimit = row.countLimit;
      this.showUpdateDialog = true;
    },

    del(row) {
      this.$confirm(`确定要删除手机号 ${row.mobile} 吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const params = {
          mobile: row.mobile,
        };
        delAdminWhiteList(params)
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

    goDetailPage(row) {
      this.$router.push({
        path: "/rental/couponDetail",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-content {
  .search-wrap {
    .add-plus-btn {
      margin-top: 0;
    }
  }
}
.update-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  margin-right: 24px;
  .label {
    width: 80px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4e5969;
    margin-right: 16px;
    text-align: right;
  }
}
</style>
