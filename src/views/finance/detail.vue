<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>财务管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan">{{
        typeList[type]
      }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content" v-if="detail">
      <div class="title">客户信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">客户姓名:</div>
            <div class="item-content">{{ name || "-" }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">联系方式:</div>
            <div class="item-content">{{ mobile || "-" }}</div>
          </div>
        </div>
      </div>

      <template v-if="type == 1 || type == 2">
        <div class="title">紧急联系人</div>
        <div class="container">
          <div class="left">
            <div class="item">
              <div class="item-title">紧急联系人姓名:</div>
              <div class="item-content">{{ emergencyContactName || "-" }}</div>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <div class="item-title">紧急联系人联系方式:</div>
              <div class="item-content">{{ emergencyContactPhone || "-" }}</div>
            </div>
          </div>
        </div>
      </template>

      <div class="title">费用明细</div>
      <div class="container" v-if="type == 1 || type == 4 || type == 5">
        <div class="left">
          <div class="item">
            <div class="item-title">订阅押金:</div>
            <div class="item-content">
              ￥{{ `${formatThousandNumber(detail.costInfo.deposit)}` }}
            </div>
          </div>
          <div class="item" v-if="type == 4">
            <div class="item-title">补缴押金:</div>
            <div class="item-content">
              ￥{{
                formatThousandNumber(detail.costInfo.supplementaryDeposit || 0)
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">共计费用:</div>
            <div class="item-content">
              <div class="totalPay">
                ￥<span class="price">
                  {{
                    formatThousandNumber(
                      detail.costInfo.deposit +
                        (detail.costInfo.addedDeposit || 0) +
                        (detail.costInfo.supplementaryDeposit || 0)
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">加收车辆押金:</div>
            <div class="item-content">
              {{
                detail.costInfo.addedDeposit
                  ? `￥${formatThousandNumber(detail.costInfo.addedDeposit)}`
                  : "-"
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="type == 2">
        <div class="left">
          <div class="item">
            <div class="item-title">订阅费用:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(detail.costInfo.totalPayment) }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">保险费用:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(detail.costInfo.premium) }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">共计费用:</div>
            <div class="item-content">
              <div class="totalPay">
                ￥<span class="price">
                  {{
                    formatThousandNumber(
                      detail.costInfo.totalPayment +
                        (detail.costInfo.totalPlateNumFee || 0) +
                        (detail.costInfo.otherConfigPayment || 0) +
                        (detail.costInfo.premium || 0)
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">牌照费用:</div>
            <div class="item-content">
              {{
                detail.costInfo.totalPlateNumFee
                  ? `￥${formatThousandNumber(
                      detail.costInfo.totalPlateNumFee
                    )}`
                  : "-"
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">增配项费用:</div>
            <div class="item-content">
              {{
                detail.costInfo.otherConfigPayment
                  ? `￥${formatThousandNumber(
                      detail.costInfo.otherConfigPayment
                    )}`
                  : "-"
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="container" v-if="type == 3">
        <div class="left">
          <div class="item">
            <div class="item-title">租车费用:</div>
            <div class="item-content">
              ￥{{
                `${
                  detail.costInfo.businessType === 1
                    ? formatThousandNumber(detail.costInfo.monthPayment) + "/月"
                    : detail.costInfo.totalPayment
                }`
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">共计费用:</div>
            <div class="item-content">
              <div class="totalPay">
                ￥<span class="price">
                  {{ formatThousandNumber(detail.costInfo.totalPayment) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">取送车服务费:</div>
            <div class="item-content">￥{{ formatThousandNumber(0) }}</div>
          </div>
        </div>
      </div>

      <div class="container" v-if="type == 6">
        <div class="left">
          <div class="item">
            <div class="item-title">充值金额:</div>
            <div class="item-content">
              ￥{{ formatThousandNumber(detail.costInfo.totalPayment) }}
            </div>
          </div>
        </div>
      </div>

      <div class="title" v-if="detail.billList && detail.billList.length">
        账单已分{{ detail.billList.length }}笔支付
      </div>
      <el-table
        :data="detail.billList"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column label="笔数" align="center">
          <template slot-scope="scope">
            <div>第{{ scope.$index + 1 }}笔</div>
          </template>
        </el-table-column>

        <el-table-column label="支付金额" align="center">
          <template slot-scope="scope">
            <div>
              {{
                scope.row.total
                  ? `${formatThousandNumber(scope.row.total)}元`
                  : "-"
              }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="支付方式" align="center">
          <template slot-scope="scope">
            <div>
              {{ scope.row.payWay ? payTypeList[scope.row.payWay] : "-" }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="支付时间" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.createdTime || "-" }}</div>
          </template>
        </el-table-column>

        <el-table-column label="交易单号" align="center">
          <template slot-scope="scope">
            <div>
              {{ scope.row.wxOrderNum || "无" }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="转账凭证" align="center" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.bankBills.length === 0">无</div>
            <div class="files" v-else>
              <el-image
                style="width: 16px; height: 16px"
                :src="require('@/assets/order/pdf-icon.png')"
              ></el-image>
              <div class="file-count">{{ scope.row.bankBills.length }}张</div>
              <div class="review-btn" @click="onPreview(scope.$index)">
                查看
              </div>
              <el-image
                v-if="currentIndex === scope.$index"
                class="hideImgDiv"
                ref="preview"
                :src="scope.row.bankBills[0]"
                :preview-src-list="scope.row.bankBills"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.payWay == 2">
              <div class="operator" v-if="scope.row.confirmed == 0">
                <div
                  class="btn"
                  @click="confirmSubscribeAccountDetailOfBank(scope.row, 1)"
                >
                  确认收款
                </div>
                <div
                  class="btn reject-btn"
                  @click="openRejectDialog(scope.row)"
                >
                  驳回收款
                </div>
              </div>
              <div v-else>
                {{ scope.row.confirmed == 1 ? "已确认" : "已驳回" }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="驳回收款"
      :visible.sync="showRejectDialog"
      width="480px"
      :before-close="handleClose"
    >
      <div class="wrap">
        <div>
          <div class="dialog-title">确认驳回用户车辆押金收款信息？</div>
          <div class="dialog-tip">
            拒绝原因<span style="color: #86909c">（必填项）</span>
          </div>
          <c-text-area
            :inputValue.sync="remark"
            placeholder="请输入拒绝原因~最多可输入100个字"
          />
        </div>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap" style="margin-top: 40px">
            <div class="btn" @click="handleClose">取消</div>
            <div class="btn save-btn" @click="handleReject">确认</div>
          </div>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectDepositDetail,
  selectSubscribeFeeDetail,
  selectAuctionDepositDetail,
  selectPageOfAccountDetail,
  confirmSubscribeAccountDetailOfBank,
  updateGuarantorInfo,
  updateDepositFreeApply,
} from "@/api/finance/finance";
import { formatThousandNumber } from "@/utils/util";
import { violationDeposit } from "@/utils/constant";

export default {
  name: "financeDetail",

  data() {
    return {
      violationDeposit,
      type: null, // 1押金，2订阅费用 3.租车业务租金 4.租车业务押金
      orderId: null,
      name: "",
      mobile: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      userId: "",
      detail: null,
      payTypeList: {
        1: "微信支付",
        2: "银行转账",
        3: "线下支付",
      },
      typeList: {
        1: "提车押金",
        2: "订阅费用",
        3: "租车费用",
        4: "租车押金",
      },
      currentIndex: -1,
      rejectRow: {},
      showRejectDialog: false,
      remark: "",
    };
  },

  mounted() {
    this.type = this.$route.query.type;
    this.orderId = this.$route.query.orderId;
    this.name = this.$route.query.name;
    this.mobile = this.$route.query.mobile;
    this.emergencyContactName = this.$route.query.emergencyContactName;
    this.emergencyContactPhone = this.$route.query.emergencyContactPhone;
    this.userId = this.$route.query.userId;
    this.init();
  },

  methods: {
    init() {
      let type = 1;
      if (this.type == 3 || this.type == 4) {
        type = 0;
      }
      if (this.type == 1 || this.type == 4) {
        this.selectDepositDetail(type);
      } else if (this.type == 5) {
        this.selectAuctionDepositDetail(type);
      } else if (this.type == 6) {
        this.selectPageOfAccountDetail(type);
      } else {
        this.selectSubscribeFeeDetail(type);
      }
    },

    selectPageOfAccountDetail(type) {
      const data = {
        id: this.orderId,
        type,
        userId: this.userId,
      };

      selectPageOfAccountDetail(data).then((res) => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    },

    selectAuctionDepositDetail(type) {
      const data = {
        id: this.orderId,
        type,
        userId: this.userId,
      };

      selectAuctionDepositDetail(data).then((res) => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    },

    selectDepositDetail(type) {
      const data = {
        orderId: this.orderId,
        type,
      };

      selectDepositDetail(data).then((res) => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    },

    selectSubscribeFeeDetail(type) {
      const data = {
        orderId: this.orderId,
        type,
      };

      selectSubscribeFeeDetail(data).then((res) => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    },

    openRejectDialog(row) {
      this.rejectRow = row;
      this.showRejectDialog = true;
    },

    handleClose() {
      this.showRejectDialog = false;
      this.rejectRow = {};
    },

    handleReject() {
      if (!this.remark.trim()) {
        this.$message.error("请输入驳回理由");
        return;
      }

      this.confirmSubscribeAccountDetailOfBank(this.rejectRow, 2);
      this.handleClose();
    },

    // 1确认，2驳回
    confirmSubscribeAccountDetailOfBank(row, confirmed) {
      this.$confirm(
        `确定要${confirmed == 1 ? "同意" : "驳回"}这笔银行转账吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        let type = this.type;
        if (type == 1) {
          type = 2;
        } else if (type == 2) {
          type = 1;
        } else if (type == 5) {
          type = 2;
        }
        const data = {
          accountDetailId: row.id,
          businessId: this.orderId,
          type,
          confirmed,
          remark: this.remark,
        };

        confirmSubscribeAccountDetailOfBank(data).then((res) => {
          if (res.code === 0) {
            this.remark = "";
            this.init();
          }
        });
      });
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    onPreview(index) {
      this.currentIndex = index;
      this.$nextTick(() => {
        this.$refs.preview.clickHandler();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 100px;
  .title {
    margin: 24px 0;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    line-height: 22px;
    color: #1d2129;
  }
  .container {
    padding-left: 50px;
    display: flex;
    .left {
      width: 400px;
      margin-right: 30px;
    }
    .right {
      width: 400px;
    }
    .item {
      margin-bottom: 16px;
      display: flex;
      .item-title {
        margin-right: 8px;
        height: 21px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 21px;
        color: #86909c;
        width: 130px;
        text-align: right;
      }
      .item-content {
        width: 0;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 21px;
        color: #1d2129;
      }
      .totalPay {
        height: 30px;
        line-height: 30px;
        color: #f0592e;
        .price {
          font-size: 20px;
        }
      }
    }
  }

  .files {
    display: flex;
    justify-content: center;
    align-items: center;
    .file-count {
      padding-left: 8px;
      padding-right: 16px;
    }
    .review-btn {
      color: #3446aa;
      cursor: pointer;
    }
  }
  .hideImgDiv {
    /deep/ .el-image__inner {
      display: none;
    }
  }

  .operator {
    display: flex;
    .btn {
      width: 84px;
      height: 32px;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #3446aa;
      font-size: 14px;
      color: #ffffff;
    }
    .reject-btn {
      background: #ea0000;
      margin-left: 6px;
    }
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog-title {
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #3d3d3d;
  }
  .dialog-tip {
    margin-top: 20px;
    margin-bottom: 5px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4e5969;
  }
}
</style>
