<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>试乘试驾</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/drive/testDrive">试乘试驾</a></el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="content">
      <div class="screen">筛选</div>
      <el-row class="scree-one">
        <el-col :span="4">
          <div class="package-name">
            <span>状态</span>
            <el-select size="small" v-model="form.status" placeholder="选择状态">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="package-name">
            <span>名称</span>
            <el-input
              size="small"
              v-model="form.name"
              placeholder="搜索订单编号或用户姓名"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <el-button size="small" type="primary" icon="el-icon-search" @click="query()"
            >查询</el-button
          >
          <el-button size="small" type="info" icon="el-icon-refresh-right" @click="reset()"
            >重置</el-button
          >
        </el-col>
      </el-row>
      <el-table
        class="bm-table"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#F2F3F5',color:'#1D2129',textAlign:'left'}"
      >
        <el-table-column prop="tdNo" label="订单编号" min-width="100%">
        </el-table-column>
        <el-table-column prop="applyerName" label="用户姓名" min-width="100%">
        </el-table-column>
        <el-table-column prop="applyerMobile" label="联系方式" min-width="100%">
        </el-table-column>
        <el-table-column label="试驾车型" min-width="200%">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.carBrand }}</span>
              <span>{{ scope.row.carType }}</span>
            </div>
            <div>
              <span>{{ scope.row.carTypeYear }}</span>
              <span>{{ scope.row.carTypeYearProduct }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请日期" min-width="120%">
        </el-table-column>
        <el-table-column prop="" label="状态" width="150%"> </el-table-column>
        <el-table-column prop="" label="商户反馈" min-width="100%">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="goAdd(scope.row)" type="text" size="small"
              >分配商户</el-button
            >
            <el-button
              class="btn"
              @click="goModify(scope.row)"
              type="text"
              size="small"
              >修改分配商户</el-button
            >
            <el-button
              class="btn"
              @click="goDelete(scope.row)"
              type="text"
              size="small"
              >删除记录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { listByPage } from "@/api/drive/testDrive";

export default {
  data() {
    return {
      form: {
        // 状态
        status: "",
        // 名称
        name: "",
      },
      // 状态列表
      statusList: [
        {
          value: "0",
          label: "未分配",
        },
        {
          value: "1",
          label: "已分配",
        },
        {
          value: "2",
          label: "待完成",
        },
        {
          value: "3",
          label: "已完成",
        },
      ],
      // 试乘试驾表格数据
      tableData: [],
      // 当前页码
      currentPage: 1,
      // 每页数据
      pageSize: 10,
      // 总数
      total: 100,
    };
  },
  methods: {
    // 查询分页数据
    getListByPage() {
      let data = {
        page: this.currentPage,
        limit: this.pageSize,
        // companyType: this.form.status,
        applyerNameOrTdNo: this.form.name,
      };
      listByPage(data).then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    // 点击当前第几页查询
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getListByPage();
    },
    // 选择每页多少条查询
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListByPage();
    },
    // 查询
    query() {
      this.currentPage = 1;
      this.getListByPage();
    },
    // 重置
    reset() {
      this.form.status = "";
      this.form.name = "";
    },
    // 分配商户
    goAdd() {},
    // 修改分配商户
    goModify() {},
    // 删除记录
    goDelete() {},
  },
  created() {
    this.getListByPage();
  },
};
</script>

<style lang="less" scoped>
.navigation {
  margin: 0.2833rem 0;
}

.navigation /deep/ .el-breadcrumb__inner {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #4e5969;
}

.subscription-plan /deep/ .el-breadcrumb__inner {
  font-family: PingFangSC-Medium;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #1d2129;
}

.content {
  // height: 12.6rem;
  padding: 0.3333rem;
  background: #ffffff;
  border-radius: 0.1rem 0.1rem 0 0;
}

.screen {
  font-family: PingFangSC-Medium;
  font-size: 0.3333rem;
  font-weight: normal;
  color: #1d2129;
}

.package-name {
  display: flex;
  align-items: center;
}

.package-name span {
  font-family: PingFangSC-Regular;
  font-size: 0.2333rem;
  font-weight: normal;
  color: #4e5969;
  white-space: nowrap;
}

.package-name .el-input,
.package-name .el-select {
  width: 4rem;
  height: 0.5333rem;
  margin-left: 0.2667rem;
   margin-right: 0.2667rem;
}

.bm-table {
  margin-top: 0.5rem;
}

.bm-table /deep/ th {
  background: #a8a8a8;
}

.bm-table /deep/ th .cell {
  font-family: Poppins-Regular;
  font-size: 0.2667rem;
  font-weight: normal;
  text-align: center;
}

.bm-table /deep/ td .cell {
  font-family: Poppins-Medium;
  font-size: 0.2rem;
  font-weight: 500;
  text-align: center;
  color: #3d3d3d;
}

.btn {
  margin-left: 0;
}

.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: .2667rem;

}
.scree-one{
  margin-top: .1667rem;
  margin-bottom: .1667rem;
}

</style>