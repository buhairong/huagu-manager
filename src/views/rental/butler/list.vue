<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >管家管理</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content">
      <div class="top">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">城市</div>
              <c-select
                :selectValue.sync="search.cityId"
                :options="allCitys"
                labelKey="city"
                valueKey="id"
              />
            </div>

            <div class="search-item">
              <div class="label">姓名</div>
              <c-input
                :inputValue.sync="search.name"
                placeholder="请输入姓名"
              />
            </div>

            <div class="search-item">
              <div class="label">手机</div>
              <c-input
                :inputValue.sync="search.mobile"
                placeholder="请输入手机"
              />
            </div>

            <search-button class="search-btn" @search="handleSearchBtn" />
            <reset-button class="search-btn" @reset="reset" />
          </div>
        </div>

        <div class="add-plus-btn" @click="goSavePage('add')">
          <span class="icon"><i class="el-icon-plus"></i></span>
          添加管家
        </div>
      </div>

      <el-table
        :data="list"
        style="width: 100%"
        :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
      >
        <el-table-column label="姓名" prop="name" />

        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            {{ SEX_STATUS[scope.row.sex] }}
          </template>
        </el-table-column>

        <el-table-column prop="mobile" label="手机号"> </el-table-column>

        <el-table-column prop="cityName" label="城市"> </el-table-column>

        <el-table-column prop="education" label="学历">
          <template slot-scope="scope">
            {{ EDUCATION_STATUS[scope.row.education] }}
          </template>
        </el-table-column>

        <el-table-column prop="createdTime" label="创建时间"> </el-table-column>

        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <div class="table-btn" @click="goDetailPage(scope.row)">
              查看详情
            </div>
            <div class="table-btn" @click="goSavePage('edit', scope.row)">
              编辑管家
            </div>
            <div class="table-btn" @click="del(scope.row)">删除管家</div>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" @handleCurrentChange="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { SEX_STATUS, EDUCATION_STATUS } from "@/utils/constant";
import { getAllCity } from "@/api/subscribe/subscribe";
import { getButlerList, removeButler } from "@/api/rental/butler";

export default {
  data() {
    return {
      search: {
        cityId: undefined,
        name: "",
        mobile: undefined,
        limit: 10,
        page: 1,
      },
      list: [],
      total: 0,
      allCitys: [],
      SEX_STATUS,
      EDUCATION_STATUS,
    };
  },
  mounted() {
    this.searchList();
    this.getAllCity();
  },
  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    getAllCity() {
      getAllCity().then((res) => {
        if (res.code === 0) {
          this.allCitys = res.data;
        }
      });
    },

    searchList() {
      getButlerList(this.search).then((res) => {
        this.list = res.data.records;
        this.total = res.data.total;
      });
    },

    handleSearchBtn() {
      this.search.page = 1;
      this.searchList();
    },

    reset() {
      this.search.cityId = undefined;
      this.search.name = "";
      this.search.mobile = undefined;
      this.search.page = 1;
      this.searchList();
    },

    handleCurrentChange(e) {
      this.search.page = e;
      this.searchList();
    },

    goSavePage(type, row = {}) {
      this.$router.push({
        path: "/rental/butler/addOrUpdateButler",
        query: {
          type,
          id: row.id,
        },
      });
    },

    del(row) {
      this.$confirm(`确定要删除这个管家吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const params = {
          id: row.id,
        };
        removeButler(params)
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
        path: "/rental/butler/butlerDetail",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
