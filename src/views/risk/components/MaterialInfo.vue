<template>
  <div class="wrap">
    <div class="title">补充材料</div>
    <!-- <div class="tip" v-if="detail.deposit">需加收保证金 {{formatThousandNumber(detail.deposit)}}</div> -->
    <!-- <el-table 
            class="amount-table"
            :data="detail.amount"
            style="width: 100%"
            border
            :span-method="arraySpanMethod"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="笔数"
                width="80"
                align="center"
            >
                <template slot-scope="scope">
                    <div v-if="(scope.$index === detail.amount.length-1)">总计</div>
                    <div v-else>第{{(scope.$index + 1)}}笔</div>
                </template>
            </el-table-column>
            <el-table-column
                label="支付金额"
                width="120"
            >
                <template slot-scope="scope">
                    <div>{{formatThousandNumber(scope.row.payAmount)}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="支付方式"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="支付时间"
            >
            </el-table-column>
            <el-table-column
                label="交易单号"
            >
                <template slot-scope="scope">
                   {{scope.row.no ? scope.row.no : '无'}}
                </template>
            </el-table-column>
            <el-table-column
                label="转账凭证"
                width="140"
            >
                <template slot-scope="scope">
                    <div class="transfer" v-if="(scope.row.imgList && scope.row.imgList.length)">
                        共{{scope.row.imgList.length}}张
                        <div 
                            class="review-btn"
                            @click="onPreview(scope.$index)"
                        >
                            查看
                        </div>
                        <el-image
                            v-if="(currentIndex === scope.$index)"
                            class="hideImgDiv"
                            ref="preview"
                            :src="scope.row.imgList[0]"
                            :preview-src-list="scope.row.imgList"
                        >
                        </el-image>
                    </div>
                    <div v-else>无</div>
                </template>
            </el-table-column>
            <el-table-column
                width="100"
                align="center"
            >
                <template slot="header" slot-scope="scope">
                    <div>
                        操作 
                        <el-tooltip class="item" effect="dark" placement="bottom-start">
                            <div slot="content">
                                <div class="headerTooltip">
                                    <div class="title">加收保证金</div>
                                    <div class="tip-text">银行转账需手动核实查收</div>
                                </div>
                            </div>
                            <i class="el-icon-warning-outline" style="margin-left:4px;color:#86909C"></i>
                        </el-tooltip>
                    </div>
                </template>
                <template slot-scope="scope">
                    <div v-if="(scope.row.status == 1)">
                        <img :src="checkPassImg" alt="">
                    </div>
                    <div class="check-btn-wrap" v-else>
                        <div class="check-btn" @click="checkAmount(scope.row)">核实查收</div>
                    </div>
                </template>
            </el-table-column>
        </el-table> -->

    <el-table
      :data="detail.certificationList"
      style="width: 100%"
      :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
    >
      <el-table-column prop="certificationName" label="加收材料">
      </el-table-column>
      <el-table-column label="材料图片">
        <template slot-scope="scope">
          <div
            class="transfer"
            v-if="scope.row.imageUrl && scope.row.imageUrl.length"
          >
            <el-image
              style="width: 57px; height: 43px; margin-right: 12px"
              v-for="(img, index) in scope.row.imageUrl"
              :key="index"
              :src="img"
              :preview-src-list="getPreviewList(index, scope.row.imageUrl)"
            >
            </el-image>
          </div>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="200" align="center">
        <template slot-scope="scope">
          <div style="display: flex; align-items: center">
            <div v-if="scope.row.confirmed == 1">
              <img :src="checkPassImg" alt="" />
            </div>
            <div v-else-if="scope.row.confirmed == 2">
              <img :src="checkrRefuseImg" alt="" />
            </div>
            <div class="material-btn-group" v-if="scope.row?.imageUrl?.length">
              <div class="btn" @click="passMaterial(scope.row)">通过</div>
              <div class="btn refuse-btn" @click="refuseMaterial(scope.row)">
                拒绝
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { updateCertificationStatus } from "@/api/risk/userReview";
import { formatThousandNumber } from "@/utils/util";
import checkPassImg from "@/assets/risk/check_pass.png";
import checkrRefuseImg from "@/assets/risk/check_refuse.png";

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      checkPassImg,
      checkrRefuseImg,
      currentIndex: -1,
    };
  },

  mounted() {},

  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === this.detail.amount.length - 1) {
        if (columnIndex === 1) {
          return {
            rowspan: 1,
            colspan: 6,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      }
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return `￥${formatThousandNumber(num)}`;
      }
      return "-";
    },

    onPreview(index) {
      this.currentIndex = index;
      this.$nextTick(() => {
        this.$refs.preview.clickHandler();
      });
    },

    checkAmount(row) {
      this.$confirm("确定要核实查收这笔转账吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});
    },

    getPreviewList(index, imgList) {
      const tempImgList = [...imgList];
      if (index === 0) {
        return tempImgList;
      }

      const img = tempImgList.splice(index, 1);
      return [...img, ...tempImgList];
    },

    passMaterial(row) {
      this.$confirm(`确定要通过 ${row.certificationName} 吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.updateCertificationStatus(row, 1);
      });
    },

    refuseMaterial(row) {
      this.$confirm(`确定要拒绝 ${row.certificationName} 吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.updateCertificationStatus(row, 2);
      });
    },

    // confirmed 1.通过 2.拒绝
    updateCertificationStatus(row, confirmed) {
      updateCertificationStatus({
        certificationId: row.id,
        confirmed,
      })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.$emit("updateCertificationStatus");
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
.wrap {
  margin-top: 40px;
  margin-bottom: 55px;
}
.title {
  margin-bottom: 12px;
  height: 30px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 30px;
  color: #1d2129;
}

.tip {
  margin-bottom: 14px;
  height: 26px;
  line-height: 26px;
  font-family: SourceHanSansCN-Regular;
  font-size: 18px;
  color: #1a1a1a;
}

.transfer {
  display: flex;
  align-items: center;
  .review-btn {
    padding-left: 20px;
    color: #3446aa;
    cursor: pointer;
  }
}

.headerTooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC-Medium;
  color: #ffffff;
  padding: 16px;
  .title {
    height: 22px;
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
  }
  .tip-text {
    height: 18px;
    font-size: 12px;
    line-height: 18px;
    color: #ffffff;
  }
}

.check-btn-wrap {
  display: flex;
  justify-content: center;
}

.check-btn {
  width: 84px;
  height: 32px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3446aa;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ffffff;
  cursor: default;
}

.material-btn-group {
  display: flex;
  justify-content: center;
  .btn {
    width: 57px;
    height: 32px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3446aa;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    cursor: default;
    margin-left: 10px;
  }
  .refuse-btn {
    background: #ea0000;
  }
}

.amount-table {
  margin: 14px 0;
  /deep/ .el-table__row:last-child {
    .el-table__cell:first-child {
      border-right: none;
    }
  }
}

.hideImgDiv {
  /deep/ .el-image__inner {
    display: none;
  }
}
</style>
