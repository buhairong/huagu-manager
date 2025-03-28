<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >订阅方案</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content">
      <Search @search="handlerSearch" />

      <div class="create-btn-wrap">
        <div class="tabs">
          <div
            v-for="tab in CAR_NEW_STATUS"
            :key="tab.value"
            class="tab"
            :class="{ 'active-tab': activeTab == tab.value }"
            @click="changeTab(tab.value)"
          >
            {{ tab.label }}
          </div>
        </div>

        <div class="btn-group">
          <div class="calc-btn" @click="goCalcPage">
            <el-image
              class="calc-icon"
              :src="require('@/assets/subscribe/calc.png')"
            ></el-image>
            产品定价测算
          </div>

          <create-button text="创建方案" @create="add" />
        </div>
      </div>

      <List :type="activeTab" :list="list" @search="handlerSearch" />

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { selectList } from "@/api/subscribe/subscribe";
import { CAR_NEW_STATUS } from "@/utils/constant";
import Search from "./components/Search.vue";
import List from "./components/List.vue";

export default {
  name: "subscribe",

  components: {
    Search,
    List,
  },

  data() {
    return {
      CAR_NEW_STATUS,
      activeTab: "1", // 1.全新车 2.二手车
      search: {},
      list: [],
      total: 0,
    };
  },

  mounted() {},

  activated() {
    this.handlerSearch();
  },

  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.search.pageNo = 1;
      this.selectList();
    },

    handlerSearch(search) {
      if (search) {
        this.search = search;
      }

      this.selectList();
    },

    selectList() {
      const params = {
        ...this.search,
        carType: this.activeTab,
      };

      selectList(params).then((res) => {
        if (res.code === 0) {
          this.list = res.data.records;
          this.total = res.data.total;
        }
      });
    },

    handleCurrentChange(e) {
      this.search.pageNo = e;
      this.selectList();
    },

    // 1.添加 2.编辑
    add() {
      this.$router.push({
        path: "/product/setSubscribe",
        query: {
          type: this.activeTab,
          operator: 1,
        },
      });
    },

    goCalcPage() {
      this.$router.push({
        path: "/product/calcProductPrice",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn-group {
    display: flex;
    .calc-btn {
      margin-right: 16px;
      height: 32px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      background: #3446aa;
      color: #ffffff;
      font-size: 14px;
      cursor: default;
      .calc-icon {
        width: 10px;
        height: 10px;
        margin-right: 8px;
      }
    }
  }
}
</style>
