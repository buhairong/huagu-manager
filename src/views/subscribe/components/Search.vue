<template>
  <div>
    <div class="title">筛选</div>

    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">方案名称</div>
          <c-input
            :inputValue.sync="search.schemeName"
            placeholder="请输入方案名称"
          />
        </div>

        <div class="search-item">
          <div class="label">车型名称</div>
          <c-input
            :inputValue.sync="search.carTypeYearProduct"
            placeholder="请输入车型名称"
          />
        </div>

        <search-button class="search-btn" @search="searchList" />

        <reset-button class="search-btn reset-btn" @reset="reset" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        schemeName: "",
        carTypeYearProduct: "",
        limit: 10,
        pageNo: 1,
      },
    };
  },

  mounted() {
    this.searchList();
  },

  methods: {
    reset() {
      this.search.schemeName = "";
      this.search.carTypeYearProduct = "";
      this.search.pageNo = 1;

      this.searchList();
    },

    searchList() {
      this.search.pageNo = 1;
      this.$emit("search", this.search);
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

.reset-btn {
  margin-left: 20px;
}
</style>
