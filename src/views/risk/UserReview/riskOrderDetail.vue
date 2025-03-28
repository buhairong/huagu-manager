<template>
  <div v-if="detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>风控管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信审</el-breadcrumb-item>
      <el-breadcrumb-item>订单申请</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >查看详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="content">
      <div class="header" v-if="customType == 2">
        <div class="tabs">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            class="tab"
            :class="{ active: tab.id == tabIndex }"
            @click="changeTab(tab.id)"
          >
            {{ tab.text }}
          </div>
        </div>
      </div>
      <div class="container" ref="riskContent">
        <!-- 企业信息 -->
        <CompanyInfo
          v-if="detail && customType == 2"
          ref="companyInfo"
          :detail="detail"
        />

        <!-- 企业风险查询 -->
        <RiskQuery
          v-if="detail && customType == 2"
          ref="companyRisk"
          :orderId="orderId"
          :auditRate="auditRate"
          :record="detail.companyQuery"
          :customType="2"
          @handleCommand="handleRiskQueryCommand"
          @updateRiskQueryAgain="initQuery"
        />

        <!-- 个人信息 -->
        <PersonInfo v-if="detail" ref="personInfo" :detail="detail" />

        <!-- 个人风险查询 -->
        <RiskQuery
          v-if="detail"
          ref="personRisk"
          :orderId="orderId"
          :auditRate="auditRate"
          :record="detail.personalQuery"
          :customType="1"
          @handleCommand="handleRiskQueryCommand"
          @updateRiskQueryAgain="initQuery"
        />

        <div
          class="add-materia-btn-wrap"
          v-if="detail.depositFreeApply && detail.depositFreeApply.status === 1"
        >
          <div class="page-btn" @click="addGuarantor">增加担保人</div>
          <div class="page-btn" @click="openAddMoneyDialog">加收押金</div>
          <div class="page-btn" @click="openRetrialMaterialDialog">
            加收材料
          </div>
        </div>

        <template
          v-if="
            detail &&
            detail.depositFreeApply &&
            detail.depositFreeApply.addDeposit
          "
        >
          <div>
            <div class="title" style="margin-left: 0">加收押金</div>
            <div
              class="item-content"
              style="display: flex; align-items: center"
            >
              需加收保证金 ¥
              {{ formatThousandNumber(detail.depositFreeApply.addDeposit) }}
              <img
                :src="passImg"
                style="margin-left: 12px"
                v-if="detail.depositFreeApply.isAddDepositAgree === 1"
              />
              <img
                :src="refuseImg"
                style="margin-left: 12px"
                v-if="detail.depositFreeApply.isAddDepositAgree === 2"
              />
            </div>
          </div>
        </template>

        <!-- 补充材料 -->
        <MaterialInfo
          v-if="
            detail &&
            detail.certificationList &&
            detail.certificationList.length
          "
          :detail="detail"
          @updateCertificationStatus="initQuery"
        />

        <template v-if="detail && detail.depositFreeApply && businessType == 1">
          <div style="margin: 40px 0">
            <div>
              <div class="title">车辆申请</div>
              <div class="items-wrap">
                <div class="items-line">
                  <div class="item">
                    <div class="item-title">所在单位名称：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.companyName || "-" }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-title">职业：</div>
                    <div class="item-content">
                      {{
                        OCCUPATION_STATUS[detail.depositFreeApply.careerCode]
                      }}
                    </div>
                  </div>
                </div>

                <div class="items-line">
                  <div class="item">
                    <div class="item-title">户籍所在地：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.issue }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-title">申请时间：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.createdTime || "-" }}
                    </div>
                  </div>
                </div>

                <div
                  class="items-line"
                  v-if="detail.guarantorInfo && customType == 1"
                >
                  <div class="item">
                    <div class="item-title">申请担保人：</div>
                    <div class="item-content">
                      {{ detail.guarantorInfo.name || "-" }}
                      <span
                        style="padding-left: 8px; cursor: pointer"
                        @click="openGuarantorDialog"
                      >
                        <span
                          style="color: #ffc117"
                          v-if="detail.guarantorInfo.status === 0"
                          >待审核</span
                        >
                        <span
                          style="color: #3446aa; text-decoration: underline"
                          v-else
                          >查看信息</span
                        >
                      </span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-title">职业：</div>
                    <div class="item-content">
                      {{
                        OCCUPATION_STATUS[detail.depositFreeApply.careerCode]
                      }}
                    </div>
                  </div>
                </div>

                <div class="items-line">
                  <div class="item">
                    <div class="item-title">所在单位证明：</div>
                    <div class="img-content">
                      <div class="img-wrap">
                        <el-image
                          style="width: 160px"
                          :src="detail.depositFreeApply.imageList[0]"
                          :preview-src-list="detail.depositFreeApply.imageList"
                        >
                        </el-image>
                      </div>
                    </div>
                  </div>
                  <div
                    class="item"
                    v-if="detail.depositFreeApply?.socialSecurityList?.length"
                  >
                    <div class="item-title">社保记录：</div>
                    <div class="item-content">
                      <div class="img-wrap">
                        <el-image
                          style="width: 160px"
                          :src="detail.depositFreeApply.socialSecurityList[0]"
                          :preview-src-list="
                            detail.depositFreeApply.socialSecurityList
                          "
                        >
                        </el-image>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="items-line">
                  <div class="item">
                    <div class="item-title">用车城市：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.cityName }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-if="detail && detail.depositFreeApply">
          <template v-if="detail.depositFreeApply.status === 1">
            <div>
              <div class="btn-group" v-if="businessType == 1">
                <button
                  class="page-btn"
                  :disabled="disabled"
                  @click="openPassDialog"
                >
                  申请通过
                </button>
                <button
                  class="page-btn"
                  :disabled="disabled"
                  @click="openRefuseDialog"
                >
                  申请不通过
                </button>
              </div>
              <div class="btn-group" v-else-if="businessType == 2">
                <button
                  class="page-btn"
                  :disabled="rentalDisabled"
                  @click="openRentalPassDialog"
                >
                  审核通过
                </button>
                <!-- <button class="page-btn" @click="openAddMoneyDialog">加收押金</button> -->
                <button
                  class="page-btn"
                  :disabled="rentalDisabled"
                  @click="openRentalRefuseDialog"
                >
                  审核不通过
                </button>
              </div>
            </div>
          </template>

          <div v-else-if="detail.depositFreeApply.status >= 2">
            <div style="margin-top: 40px">
              <div class="title">审核信息</div>
              <div class="items-wrap">
                <div class="items-line">
                  <div class="item">
                    <div class="item-title">审核结果：</div>
                    <div class="item-content">
                      {{
                        detail.depositFreeApply.status === 2 ? "通过" : "不通过"
                      }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-title">审核人员：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.updatedBy || "-" }}
                    </div>
                  </div>
                </div>

                <div class="items-line">
                  <div class="item">
                    <div class="item-title">审核时间：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.updatedTime || "-" }}
                    </div>
                  </div>
                  <div class="item" v-if="detail.depositFreeApply.status === 3">
                    <div class="item-title">不通过原因：</div>
                    <div class="item-content">
                      {{ detail.depositFreeApply.reason || "-" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-group">
              <back-button />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 复审通过 -->
    <RetrialPassDialog
      v-if="showRetrialPassDialog"
      :show.sync="showRetrialPassDialog"
      :customType="customType"
      :certificationList="detail.certificationList"
      @comfirm="passRetrial"
    />

    <!-- 复审拒绝 -->
    <RetrialRefuseDialog
      v-if="showRetrialRefuseDialog"
      :show.sync="showRetrialRefuseDialog"
      :customType="customType"
      @comfirm="refuseRetrial"
    />

    <!-- 补充材料 -->
    <RetrialMaterialDialog
      v-if="showRetrialMaterialDialog"
      :show.sync="showRetrialMaterialDialog"
      :certificationList="certificationList"
      :riskResult="7"
      @comfirm="materialRetrial"
    />

    <el-dialog
      title="申请通过"
      :visible.sync="showPassDialog"
      width="300px"
      :before-close="handleClosePassDialog"
    >
      <div class="dialog-wrap">
        <div class="dialog-title">确认通过个人申请？</div>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap" style="margin-top: 40px">
            <div class="btn" @click="handleClosePassDialog">取消</div>
            <div class="btn save-btn" @click="handlePass">确认</div>
          </div>
        </span>
      </div>
    </el-dialog>

    <el-dialog
      title="申请不通过"
      :visible.sync="showRefuseDialog"
      width="480px"
      :before-close="handleCloseRefuseDialog"
    >
      <div class="dialog-wrap">
        <div>
          <div class="dialog-title">确认拒绝个人申请？</div>
          <div class="dialog-tip">
            拒绝原因<span style="color: #86909c">（必填项）</span>
          </div>
          <c-text-area
            :inputValue.sync="reason"
            placeholder="请输入拒绝原因~最多可输入100个字"
          />
        </div>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap" style="margin-top: 40px">
            <div class="btn" @click="handleCloseRefuseDialog">取消</div>
            <div class="btn save-btn" @click="handleReject">确认</div>
          </div>
        </span>
      </div>
    </el-dialog>

    <el-dialog
      v-if="detail && detail.guarantorInfo"
      title=""
      :visible.sync="showGuarantorDialog"
      width="800px"
      :before-close="handleCloseGuarantorDialog"
    >
      <div class="guarantor-dialog-wrap">
        <div>
          <!-- 担保人信息 -->
          <GuarantorInfo v-if="detail" :detail="detail" />

          <!-- 担保人风险查询 -->
          <RiskQuery
            v-if="detail"
            :orderId="orderId"
            :auditRate="auditRate"
            :record="detail.guarantorInfo.personalQuery"
            :customType="1"
            @handleCommand="handleRiskQueryCommand"
            @updateRiskQueryAgain="initQuery"
          />
        </div>

        <div style="margin-top: 40px">
          <div class="btn-group" v-if="detail.guarantorInfo.status === 0">
            <button
              class="page-btn"
              :disabled="guarantorDisabled"
              @click="openGuarantorPassDialog"
            >
              担保人审核通过
            </button>
            <button
              class="page-btn"
              :disabled="guarantorDisabled"
              @click="openGuarantorRefuseDialog"
            >
              担保人审核拒绝
            </button>
          </div>
          <div v-else>
            <div class="title">审核信息</div>
            <div class="items-wrap">
              <div class="items-line">
                <div class="item">
                  <div class="item-title">审核结果：</div>
                  <div class="item-content">
                    {{ detail.guarantorInfo.status === 1 ? "通过" : "不通过" }}
                  </div>
                </div>
                <div class="item">
                  <div class="item-title">审核人员：</div>
                  <div class="item-content">
                    {{ detail.guarantorInfo.updatedBy || "-" }}
                  </div>
                </div>
              </div>

              <div class="items-line">
                <div class="item">
                  <div class="item-title">审核时间：</div>
                  <div class="item-content">
                    {{ detail.guarantorInfo.updatedTime || "-" }}
                  </div>
                </div>
                <div class="item" v-if="detail.guarantorInfo.status === 2">
                  <div class="item-title">不通过原因：</div>
                  <div class="item-content">
                    {{ detail.guarantorInfo.reason || "-" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="担保人申请通过"
      :visible.sync="showGuarantorPassDialog"
      width="300px"
      :before-close="handleCloseGuarantorPassDialog"
    >
      <div class="dialog-wrap">
        <div class="dialog-title">确认通过担保人申请？</div>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap" style="margin-top: 40px">
            <div class="btn" @click="handleCloseGuarantorPassDialog">取消</div>
            <div class="btn save-btn" @click="handlePassGuarantor">确认</div>
          </div>
        </span>
      </div>
    </el-dialog>

    <el-dialog
      title="担保人申请不通过"
      :visible.sync="showGuarantorRefuseDialog"
      width="480px"
      :before-close="handleCloseGuarantorRefuseDialog"
    >
      <div class="dialog-wrap">
        <div>
          <div class="dialog-title">确认拒绝担保人申请？</div>
          <div class="dialog-tip">
            拒绝原因<span style="color: #86909c">（必填项）</span>
          </div>
          <c-text-area
            :inputValue.sync="guarantorReason"
            placeholder="请输入拒绝原因~最多可输入100个字"
          />
        </div>

        <span slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap" style="margin-top: 40px">
            <div class="btn" @click="handleCloseGuarantorRefuseDialog">
              取消
            </div>
            <div class="btn save-btn" @click="handleRejectGuarantor">确认</div>
          </div>
        </span>
      </div>
    </el-dialog>

    <PassDialog
      :show.sync="passDialog.show"
      :detail="passDialog"
      @save="rentalApprove"
    />
    <RefuseDialog
      :show.sync="refuseDialog.show"
      :detail="refuseDialog"
      @save="rentalApprove"
    />
    <AddMoneyDialog
      :show.sync="addMoneyDialog.show"
      :detail="addMoneyDialog"
      @save="saveAddDeposit"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  selectRiskOrderDetail,
  certificationConfigList,
  updateAuditStatusOfAgain,
  updateAuditStatusOfLog,
  addUserCarSubscribeCertification,
  addOtherDeposit,
  updateGuarantorInfo,
  updateDepositFreeApply,
  selectCarRentalRiskOrderDetail,
  addDeposit,
  rentalApprove,
} from "@/api/risk/userReview";
import {
  RETRIAL_STATUS,
  CHECKED_STATUS,
  OCCUPATION_STATUS,
} from "@/utils/constant";
import { formatThousandNumber } from "@/utils/util";
import passImg from "@/assets/risk/pass.png";
import refuseImg from "@/assets/risk/refuse.png";
import RetrialPassDialog from "../components/RetrialPassDialog.vue";
import RetrialRefuseDialog from "../components/RetrialRefuseDialog.vue";
import RetrialMaterialDialog from "../components/RetrialMaterialDialog.vue";
import RiskRecord from "../components/RiskRecord.vue";
import CompanyInfo from "../components/CompanyInfo.vue";
import RiskQuery from "../components/RiskQuery.vue";
import PersonInfo from "../components/PersonInfo.vue";
import GuarantorInfo from "../components/GuarantorInfo.vue";
import MaterialInfo from "../components/MaterialInfo.vue";
import PassDialog from "@/views/partner/component/PassDialog.vue";
import RefuseDialog from "@/views/partner/component/RefuseDialog.vue";
import AddMoneyDialog from "../components/AddMoneyDialog.vue";

export default {
  name: "RiskOrderDetail",

  components: {
    RetrialPassDialog,
    RetrialRefuseDialog,
    RetrialMaterialDialog,
    CompanyInfo,
    RiskQuery,
    PersonInfo,
    GuarantorInfo,
    MaterialInfo,
    PassDialog,
    RefuseDialog,
    AddMoneyDialog,
  },

  data() {
    return {
      passImg,
      refuseImg,
      OCCUPATION_STATUS,
      RETRIAL_STATUS,
      CHECKED_STATUS,
      businessType: null, // 1.汽车订阅 2.会员租车
      orderId: null,
      manual: "1", // 1.正常跳转 2.滚动条拉到人工审核
      customType: null, // 1.个人用户 2.企业用户
      auditRate: null,
      tabIndex: "2",
      tabs: [
        { id: "2", text: "企业信息" },
        { id: "1", text: "用户信息" },
      ],
      detail: null,
      record: {}, // 风控记录
      showRetrialPassDialog: false,
      showRetrialRefuseDialog: false,
      showRetrialMaterialDialog: false,
      certificationList: [],
      logId: null,
      showGuarantorDialog: false,
      showPassDialog: false,
      showRefuseDialog: false,
      reason: "",
      showGuarantorPassDialog: false,
      showGuarantorRefuseDialog: false,
      guarantorReason: "",
      passDialog: {
        show: false,
        title: "大数据审核通过",
        content: "通过用户大数据查询？",
      },
      refuseDialog: {
        show: false,
        title: "大数据审核不通过",
        content: "拒绝通过用户大数据查询？",
      },
      addMoneyDialog: {
        show: false,
        title: "加收租车押金",
        content: "租车押金金额",
      },
    };
  },

  computed: {
    ...mapState(["userInfo"]),
    disabled() {
      let res = false;

      if (
        this.detail &&
        this.detail.personalQuery &&
        this.detail.personalQuery.length
      ) {
        const list = this.detail.personalQuery.slice(0, -1);
        let ruleResultRes = list.every((item) => item.ruleResult == 1);
        if (!ruleResultRes) {
          res = true;
        }
      }

      if (
        this.detail &&
        this.detail.companyQuery &&
        this.detail.companyQuery.length
      ) {
        const list = this.detail.companyQuery.slice(0, -1);
        let ruleResultRes = list.every((item) => item.ruleResult == 1);
        if (!ruleResultRes) {
          res = true;
        }
      }

      if (
        this.detail &&
        this.detail.certificationList &&
        this.detail.certificationList.length
      ) {
        let ruleResultRes = this.detail.certificationList.every(
          (item) => item.confirmed == 1
        );
        if (!ruleResultRes) {
          res = true;
        }
      }

      if (
        this.detail &&
        this.detail.guarantorInfo &&
        this.detail.guarantorInfo.status !== 1
      ) {
        res = true;
      }

      return res;
    },

    rentalDisabled() {
      let res = false;

      if (
        this.detail &&
        this.detail.personalQuery &&
        this.detail.personalQuery.length
      ) {
        const list = this.detail.personalQuery.slice(0, -1);
        let ruleResultRes = list.every((item) => item.ruleResult == 1);
        if (!ruleResultRes) {
          res = true;
        }
      }

      if (
        this.detail &&
        this.detail.companyQuery &&
        this.detail.companyQuery.length
      ) {
        const list = this.detail.companyQuery.slice(0, -1);
        let ruleResultRes = list.every((item) => item.ruleResult == 1);
        if (!ruleResultRes) {
          res = true;
        }
      }

      if (
        this.detail &&
        this.detail.depositFreeApply &&
        this.detail.depositFreeApply.addDeposit &&
        this.detail.depositFreeApply.isAddDepositAgree !== 1
      ) {
        res = true;
      }

      return res;
    },

    guarantorDisabled() {
      let res = true;

      if (
        this.detail &&
        this.detail.guarantorInfo &&
        this.detail.guarantorInfo.personalQuery &&
        this.detail.guarantorInfo.personalQuery.length
      ) {
        const list = this.detail.guarantorInfo.personalQuery.slice(0, -1);
        let ruleResultRes = list.every((item) => item.ruleResult == 1);
        if (ruleResultRes) {
          res = false;
        }
      }

      return res;
    },
  },

  mounted() {
    this.orderId = this.$route.query.orderId;
    this.manual = this.$route.query.manual;
    this.customType = this.$route.query.customType;
    this.auditRate = this.$route.query.auditRate;
    this.businessType = this.$route.query.businessType;
    this.initQuery();
  },

  methods: {
    initQuery() {
      if (this.businessType == 1) {
        this.selectRiskOrderDetail();
        this.certificationConfigList();
      } else if (this.businessType == 2) {
        this.selectCarRentalRiskOrderDetail();
      }
    },

    certificationConfigList() {
      certificationConfigList().then((res) => {
        if (res.code == 0) {
          this.certificationList = res.data;
        }
      });
    },

    selectRiskOrderDetail() {
      selectRiskOrderDetail({
        auditRate: this.auditRate,
        id: this.orderId,
      }).then((res) => {
        if (res.code == 0) {
          this.detail = res.data;
          this.init();
        }
      });
    },

    selectCarRentalRiskOrderDetail() {
      selectCarRentalRiskOrderDetail({
        auditRate: this.auditRate,
        id: this.orderId,
      }).then((res) => {
        if (res.code == 0) {
          this.detail = res.data;
          this.init();
        }
      });
    },

    init() {
      if (this.detail.personalQuery && this.detail.personalQuery.length) {
        let str = "1";

        let stautsRes = this.detail.personalQuery.some(
          (item) => item.stauts == 0
        );
        if (stautsRes) {
          str = "4";
        }

        stautsRes = this.detail.personalQuery.some((item) => item.stauts == 2);
        if (stautsRes) {
          str = "5";
        }

        let ruleResultRes = this.detail.personalQuery.some(
          (item) => item.ruleResult == 3 || !item.ruleResult
        );
        if (ruleResultRes) {
          str = "3";
        }

        ruleResultRes = this.detail.personalQuery.some(
          (item) => item.ruleResult == 2
        );
        if (ruleResultRes) {
          str = "2";
        }

        this.detail.personalQuery.push({
          apiName: "查询结果",
          queryStatus: str,
        });
      }

      if (this.detail.companyQuery && this.detail.companyQuery.length) {
        let str = "1";

        let stautsRes = this.detail.companyQuery.some(
          (item) => item.stauts == 0
        );
        if (stautsRes) {
          str = "4";
        }

        stautsRes = this.detail.companyQuery.some((item) => item.stauts == 2);
        if (stautsRes) {
          str = "5";
        }

        let ruleResultRes = this.detail.companyQuery.some(
          (item) => item.ruleResult == 3 || !item.ruleResult
        );
        if (ruleResultRes) {
          str = "3";
        }

        ruleResultRes = this.detail.companyQuery.some(
          (item) => item.ruleResult == 2
        );
        if (ruleResultRes) {
          str = "2";
        }

        this.detail.companyQuery.push({
          apiName: "查询结果",
          queryStatus: str,
        });
      }

      if (
        this.detail.guarantorInfo &&
        this.detail.guarantorInfo.personalQuery &&
        this.detail.guarantorInfo.personalQuery.length
      ) {
        let str = "1";

        let stautsRes = this.detail.guarantorInfo.personalQuery.some(
          (item) => item.stauts == 0
        );
        if (stautsRes) {
          str = "4";
        }

        stautsRes = this.detail.guarantorInfo.personalQuery.some(
          (item) => item.stauts == 2
        );
        if (stautsRes) {
          str = "5";
        }

        let ruleResultRes = this.detail.guarantorInfo.personalQuery.some(
          (item) => item.ruleResult == 3 || !item.ruleResult
        );
        if (ruleResultRes) {
          str = "3";
        }

        ruleResultRes = this.detail.guarantorInfo.personalQuery.some(
          (item) => item.ruleResult == 2
        );
        if (ruleResultRes) {
          str = "2";
        }

        this.detail.guarantorInfo.personalQuery.push({
          apiName: "查询结果",
          queryStatus: str,
        });
      }

      if (this.manual == "2") {
        this.$nextTick(() => {
          this.handleScrollToManual();
        });
      }
    },

    changeTab(id) {
      this.tabIndex = id;
      if (id == 1) {
        this.handleScrollToPerson();
      } else {
        this.handleScrollToCompany();
      }
    },

    handleRiskQueryCommand(data) {
      this.logId = data.logId;
      if (data.command == 1) {
        this.showRetrialPassDialog = true;
      } else if (data.command == 2) {
        this.showRetrialRefuseDialog = true;
      } else if (data.command == 3) {
        this.showRetrialMaterialDialog = true;
      }
    },

    handleCommand(e) {
      this.logId = null;
      if (e == 1) {
        this.showRetrialPassDialog = true;
      } else if (e == 2) {
        this.showRetrialRefuseDialog = true;
      } else if (e == 3) {
        this.showRetrialMaterialDialog = true;
      }
    },

    // 复审通过
    passRetrial() {
      if (this.logId) {
        this.updateAuditStatusOfLog(1);
      } else {
        this.updateAuditStatusOfAgain(5);
      }
    },

    // 复审拒绝
    refuseRetrial(remark) {
      if (this.logId) {
        this.updateAuditStatusOfLog(2);
      } else {
        this.updateAuditStatusOfAgain(6, remark);
      }
    },

    // 复审补充材料
    materialRetrial(data) {
      // if (this.detail.riskResult !== 7) {
      //     Promise.all([this.addUserCarSubscribeCertification(data), this.addOtherDeposit(data)]).then(res => {
      //         this.$message.success('保存成功')
      //         this.selectRiskOrderDetail()
      //     }).catch(err => {
      //         this.$message.error(err)
      //     })
      // } else {
      this.addUserCarSubscribeCertification(data)
        .then((res) => {
          this.$message.success("保存成功");
          this.initQuery();
        })
        .catch((err) => {
          this.$message.error(err);
        });
      // }
    },

    updateAuditStatusOfLog(ruleResult, remark = "") {
      updateAuditStatusOfLog({
        orderId: this.orderId,
        auditRate: this.auditRate,
        logId: this.logId,
        orderType: this.customType,
        ruleResult,
        remark,
      })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    updateAuditStatusOfAgain(riskResult, remark = "") {
      updateAuditStatusOfAgain({
        orderId: this.orderId,
        auditRate: this.auditRate,
        riskResult,
        remark,
      })
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    addUserCarSubscribeCertification(data) {
      if (data.material && data.material.length) {
        return new Promise((resolve, reject) => {
          addUserCarSubscribeCertification({
            userCarSubscribeId: this.orderId,
            auditRate: this.auditRate,
            riskResult: this.logId ? 4 : 7,
            list: data.material,
            logId: this.logId,
          })
            .then((res) => {
              if (res.code == 0) {
                resolve("保存成功");
              } else {
                reject("加收材料保存失败");
              }
            })
            .catch((err) => {
              reject("加收材料保存失败");
            });
        });
      } else {
        resolve(true);
      }
    },

    addOtherDeposit(data) {
      return new Promise((resolve, reject) => {
        addOtherDeposit({
          orderId: this.orderId,
          deposit: data.deposit,
          description: data.mask,
        })
          .then((res) => {
            if (res.code == 0) {
              resolve("保存成功");
            } else {
              reject("保证金保存失败");
            }
          })
          .catch((err) => {
            reject("保证金保存失败");
          });
      });
    },

    handleScrollToManual() {
      let scrollTop = this.$refs.personRisk.$el.offsetTop - 60;
      if (
        this.customType == "2" &&
        this.detail.compnayRiskRecord.some((item) => item.ruleResult == 3)
      ) {
        scrollTop = this.$refs.companyRisk.$el.offsetTop;
      }
      this.$refs.riskContent.scrollTo({
        top: scrollTop,
      });
    },

    handleScrollToPerson() {
      let scrollTop = this.$refs.personInfo.$el.offsetTop;
      this.$refs.riskContent.scrollTo({
        top: scrollTop - 60,
      });
    },

    handleScrollToCompany() {
      this.$refs.riskContent.scrollTo({
        top: 0,
      });
    },

    openRetrialMaterialDialog() {
      this.showRetrialMaterialDialog = true;
    },

    openGuarantorDialog() {
      this.showGuarantorDialog = true;
    },

    handleCloseGuarantorDialog() {
      this.showGuarantorDialog = false;
    },

    openPassDialog() {
      this.showPassDialog = true;
    },

    handleClosePassDialog() {
      this.showPassDialog = false;
    },

    handlePass() {
      this.updateDepositFreeApply(2);
    },

    openRefuseDialog() {
      this.showRefuseDialog = true;
    },

    handleCloseRefuseDialog() {
      this.showRefuseDialog = false;
      this.reason = "";
    },

    handleReject(data) {
      this.reason = this.reason.trim() || data.reason;
      if (!this.reason.trim()) {
        this.$message.error("请输入拒绝原因");
        return;
      }
      this.updateDepositFreeApply(3);
    },

    updateDepositFreeApply(status) {
      const parmas = {
        id: this.detail.depositFreeApply.id,
        status,
        reason: this.reason,
        updatedBy: this.userInfo.name,
      };

      updateDepositFreeApply(parmas)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
            this.handleClosePassDialog();
            this.handleCloseRefuseDialog();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    rentalApprove(data) {
      const parmas = {
        depositApplyId: this.detail.depositFreeApply.id,
        status: data.status,
        reason: data.reason || "",
      };

      rentalApprove(parmas)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
            this.handleClosePassDialog();
            this.handleCloseRefuseDialog();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    openGuarantorPassDialog() {
      this.showGuarantorPassDialog = true;
    },

    handleCloseGuarantorPassDialog() {
      this.showGuarantorPassDialog = false;
    },

    handlePassGuarantor() {
      this.updateGuarantorInfo(1);
    },

    openGuarantorRefuseDialog() {
      this.showGuarantorRefuseDialog = true;
    },

    handleCloseGuarantorRefuseDialog() {
      this.showGuarantorRefuseDialog = false;
      this.guarantorReason = "";
    },

    handleRejectGuarantor() {
      if (!this.guarantorReason.trim()) {
        this.$message.error("请输入拒绝原因");
        return;
      }
      this.updateGuarantorInfo(2);
    },

    updateGuarantorInfo(status) {
      const parmas = {
        orderId: this.orderId,
        id: this.detail.guarantorInfo.id,
        status,
        reason: this.guarantorReason.trim(),
        updatedBy: this.userInfo.name,
      };

      updateGuarantorInfo(parmas)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
            this.handleCloseGuarantorPassDialog();
            this.handleCloseGuarantorRefuseDialog();
            this.handleCloseGuarantorDialog();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    openRentalPassDialog() {
      this.passDialog.show = true;
    },

    openRentalRefuseDialog() {
      this.refuseDialog.show = true;
    },

    openAddMoneyDialog() {
      this.addMoneyDialog.show = true;
    },

    saveAddDeposit(data) {
      const params = {
        depositApplyId: this.detail.depositFreeApply.id,
        addDeposit: data.money,
        remark: data.reason || "",
      };

      addDeposit(params)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },

    addGuarantor() {
      const params = {
        depositApplyId: this.detail.depositFreeApply.id,
        hasGuarantor: 1,
      };

      addDeposit(params)
        .then((res) => {
          if (res.code == 0) {
            this.$message.success("保存成功");
            this.initQuery();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
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
.content {
  height: calc(100vh - 142px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  overflow: auto;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabs {
  display: flex;
  .tab {
    padding: 0 80px;
    height: 36px;
    border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #4e5969;
    margin-right: 8px;
    cursor: default;
    &.active {
      background: #f2f3f8;
      color: #3446aa;
    }
  }
}

.result-wrap {
  display: flex;
  align-items: center;
  .review-tip {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #86909c;
  }
  .review-result {
    margin-left: 10px;
    margin-right: 45px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #1d2129;
  }
  .retrial-btn {
    width: 104px;
    height: 40px;
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
}

.add-materia-btn-wrap {
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.page-btn {
  margin-left: 20px;
  padding: 0 24px;
  height: 40px;
  border-radius: 8px;
  background: #3446aa;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
}

.page-btn:disabled {
  background: rgba(52, 70, 170, 0.6);
}

.title {
  margin-left: 100px;
  margin-bottom: 12px;
  height: 30px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 30px;
  color: #1d2129;
}

.items-wrap {
  margin: 0 100px 40px;
  .items-line {
    margin-bottom: 18px;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      font-family: PingFangSC-Regular;
      font-size: 15px;
      line-height: 28px;
      margin-right: 10px;
      .item-title {
        width: 135px;
        text-align: right;
        color: #86909c;
      }
      .item-content {
        flex: 1;
        margin-left: 8px;
        color: #1d2129;
      }
    }
  }
}

.btn-group {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  .page-btn {
    margin: 0 40px;
  }
}

.dialog-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog-title {
    height: 24px;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
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

.guarantor-dialog-wrap {
  .title {
    margin-left: 0;
  }
  .items-wrap {
    margin: 0 0 40px;
  }

  ::v-deep .wrap {
    .title {
      margin-left: 0;
    }
    .items-wrap {
      margin: 0 0 40px;
    }
  }
}
</style>
