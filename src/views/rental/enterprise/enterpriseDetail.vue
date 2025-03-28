<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >企业详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: tab.id === activeTab }"
          @click="changeTab(tab.id)"
        >
          {{ tab.text }}
        </div>
      </div>

      <div class="container">
        <div class="form-wrap1" v-show="activeTab == 1">
          <el-form
            class="add-form"
            ref="formRef"
            :model="detail"
            label-width="auto"
          >
            <el-form-item label="信用代码" prop="corporationTaxNumber">
              {{ detail.corporationTaxNumber }}
            </el-form-item>

            <el-form-item label="企业名称" prop="companyName">
              {{ detail.companyName }}
            </el-form-item>

            <el-form-item label="法人" prop="contactName">
              {{ detail.contactName }}
            </el-form-item>

            <el-form-item label="注册地址" prop="address">
              {{ detail.address }}
            </el-form-item>

            <el-form-item label="成立日期" prop="establishDate">
              {{ detail.establishDate }}
            </el-form-item>

            <!-- <el-form-item label="营业期限" prop="businessDeadline">
            {{
              detail.isCompanyForever == 1 ? "长期" : detail.businessDeadline
            }}
          </el-form-item>

          <el-form-item label="负责人" prop="managerName">
            {{ detail.managerName }}
          </el-form-item>

          <el-form-item label="负责人联系电话" prop="managerMobile">
            {{ detail.managerMobile }}
          </el-form-item> -->

            <el-form-item label="营业执照" prop="idcardUrl">
              <el-image
                :src="detail.businessLicense"
                :preview-src-list="[detail.businessLicense]"
              ></el-image>
            </el-form-item>
          </el-form>
        </div>

        <el-table
          v-show="activeTab == 2"
          :data="staffList"
          :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
          style="width: 600px"
        >
          <el-table-column label="姓名" prop="name">
            <template slot-scope="scope">
              {{ scope.row?.userEntity?.name }}
            </template>
          </el-table-column>
          <el-table-column label="联系方式" prop="mobile">
            <template slot-scope="scope">
              {{ scope.row?.userEntity?.mobile }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { getEnterpriseDetail } from "@/api/rental/enterprise";

export default {
  data() {
    return {
      type: "",
      detail: {
        id: undefined,
        address: "",
        businessDeadline: "",
        businessLicense: "",
        companyName: "",
        confirmed: undefined,
        contactName: "",
        corporationTaxNumber: "",
        establishDate: "",
        isCompanyForever: 0,
        managerMobile: "",
        managerName: "",
        registeredAddress: "",
        userCompanyAccountEntity: undefined,
        userCompanyShareRelationEntityList: [],
      },
      activeTab: 1,
      tabs: [
        { id: 1, text: "基本信息" },
        { id: 2, text: "员工信息" },
      ],
      staffList: [],
    };
  },
  mounted() {
    this.detail.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    back() {
      this.$router.back();
    },

    getDetail() {
      const params = {
        id: this.detail.id,
      };
      getEnterpriseDetail(params).then((res) => {
        this.detail = {
          ...res.data,
        };

        if (res?.data?.userCompanyShareRelationEntityList) {
          this.staffList = res.data.userCompanyShareRelationEntityList || [];
        }
        console.log("this.staffList", this.staffList);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
}
.tabs {
  margin-bottom: 40px;
  width: 100%;
  white-space: nowrap;
  overflow: auto;
  .tab {
    display: inline-block;
    margin-right: 8px;
    width: 88px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 32px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    cursor: default;
    &.active {
      background: #f2f3f8;
      color: #3446aa;
    }
  }
}

.container {
  width: 100%;
  height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.el-image {
  width: 200px;
}
</style>
