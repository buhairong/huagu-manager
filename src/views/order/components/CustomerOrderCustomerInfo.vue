<template>
  <div>
    <div class="title">客户信息</div>
    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">客户类型:</div>
          <div class="item-content">{{ detail.customerType === 1 ? '个人客户' : '企业客户' }}</div>
        </div>

        <template v-if="detail.customerType === 2">
          <div class="item">
            <div class="item-title">唯一证件号:</div>
            <div class="item-content">{{ detail.corporationTaxNumber }}</div>
          </div>

          <div class="item">
            <div class="item-title">注册地址:</div>
            <div class="item-content">{{ detail.registeredAddress }}</div>
          </div>

          <div class="item">
            <div class="item-title">企业联系人:</div>
            <div class="item-content">{{ detail.managerName }}</div>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <div class="item-title">使用人证件:</div>
            <div class="item-content">
              <el-image
                class="preview-img"
                :src="detail.idcardUrl"
                :preview-src-list="[detail.idcardUrl]"
              >
            </el-image>
            </div>
          </div>

          <div class="item">
            <div class="item-title">使用人手机号:</div>
            <div class="item-content">{{ detail.userMobile }}</div>
          </div>
        </template>
      </div>
      <div class="right">
        <template v-if="detail.customerType === 2">
          <div class="item">
            <div class="item-title">客户名称:</div>
            <div class="item-content">{{ detail.companyName }}</div>
          </div>
          
          <div class="item">
            <div class="item-title">营业执照:</div>
            <div class="item-content">
              <el-image
                class="preview-img"
                :src="detail.businessLicense"
                :preview-src-list="[detail.businessLicense]"
              >
            </el-image>
            </div>
          </div>

          <div class="item">
            <div class="item-title">经营场所:</div>
            <div class="item-content">{{ detail.address }}</div>
          </div>

          <div class="item">
            <div class="item-title">企业联系人手机号:</div>
            <div class="item-content">{{ detail.managerMobile }}</div>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <div class="item-title">使用人姓名:</div>
            <div class="item-content">{{ detail.userName }}</div>
          </div>

          <div class="item">
            <div class="item-title">使用人证件号:</div>
            <div class="item-content">{{ detail.idcard }}</div>
          </div>

          <div class="item">
            <div class="item-title">使用人联系地址:</div>
            <div class="item-content">{{ detail.userAddress }}</div>
          </div>
        </template>
      </div>
    </div>

    <template v-if="detail.customerType === 2">
      <div class="title">使用人信息</div>
      <div class="container">
        <div class="left">
          <div class="item">
            <div class="item-title">使用人姓名:</div>
            <div class="item-content">{{ detail.userName }}</div>
          </div>

          <div class="item">
            <div class="item-title">使用人证件号:</div>
            <div class="item-content">{{ detail.idcard }}</div>
          </div>

          <div class="item">
            <div class="item-title">使用人联系地址:</div>
            <div class="item-content">{{ detail.userAddress }}</div>
          </div>
        </div>
        <div class="right">
          <div class="item">
            <div class="item-title">使用人证件:</div>
            <div class="item-content">
              <el-image
                class="preview-img"
                :src="detail.idcardUrl"
                :preview-src-list="[detail.idcardUrl]"
              >
            </el-image>
            </div>
          </div>

          <div class="item">
            <div class="item-title">使用人手机号:</div>
            <div class="item-content">{{ detail.userMobile }}</div>
          </div>
        </div>
      </div>
    </template>

    <div class="title">备用联系人信息</div>
    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">备用联系姓名:</div>
          <div class="item-content">{{ detail.emergencyContactName }}</div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">备用联系手机号:</div>
          <div class="item-content">{{ detail.emergencyContactPhone }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CustomerOrderCustomerInfo",

  components: {},

  props: {
    detail: {
        type: Object,
        required: true,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.title {
  margin: 24px 0;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #1d2129;
}
.container {
  display: flex;
  .left {
    width: 350px;
    margin-right: 30px;
  }
  .right {
    width: 350px;
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
      .preview-img {
        width: 95px;
      }
    }
  }
}
</style>
