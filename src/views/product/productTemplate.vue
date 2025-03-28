<template>
  <div>
    <el-breadcrumb class="navigation" separator="/">
      <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        ><a href="#/product/productTemplate">产品模板</a></el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="content">
      <div class="title">筛选</div>

      <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
              <div class="label">模板名称</div>
              <c-input 
                :inputValue.sync="search.name"
                placeholder="请输入模板名称"
              />
            </div>

            <div class="search-item">
              <div class="label">计算规则</div>
              <c-select
                :selectValue.sync="search.calculatorRule"
                :options="CALCULATOR_RULE_LIST"
                placeholder="请选择计算规则"
              />
            </div>

            <div class="search-item">
              <div class="label">模板状态</div>
              <c-select
                :selectValue.sync="search.status"
                :options="TEMPLATE_STATUS_LIST"
                placeholder="请选择模板状态"
              />
            </div>

            <div class="search-item">
              <div class="label">创建日期</div>
              <date-range-select
                :value.sync="dateRange"
                :style="{width: '250px'}"
                @select="handlerSelectDate"
              />
            </div>

            <search-button class="search-btn" @search="searchList"/>

            <reset-button class="search-btn reset-btn" @reset="reset"/>
          </div>
      </div>
      
      <div class="create-btn-wrap">
        <create-button 
          text="创建模板"
          @create="goAdd"
        />
      </div>
      
      <el-table
        class="bm-table"
        :data="list"
        style="width: 100%"
        :header-cell-style="{background:'#F2F3F5',color:'#1D2129',textAlign:'left'}"
      >
        <el-table-column 
          prop="name" 
          label="模板名称" 
        >
        </el-table-column>
        
        <el-table-column 
          label="适用车型"
        >
          <template slot-scope="scope">
            <div>
              <div v-for="(item, index) in scope.row.newType" :key="index">
                {{ CAR_NEW_STATUS_KEY[item] }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column 
          label="首付比例"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.firstPeriodRate }}%</div>
          </template>
        </el-table-column>

        <el-table-column 
          label="IRR"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.periodRate }}%</div>
          </template>
        </el-table-column>

        <el-table-column 
          label="计算规则"
        >
          <template slot-scope="scope">
            <div>{{ CALCULATOR_RULE_LIST_STATUS[scope.row.calculatorRule] }}</div>
          </template>
        </el-table-column>
        
        <el-table-column 
          label="模板状态"
        >
          <template slot-scope="scope">
            <div>{{ TEMPLATE_STATUS[scope.row.status] }}</div>
          </template>
        </el-table-column>

        <el-table-column 
          prop="createTime" 
          label="创建时间" 
        >
        </el-table-column>

        <el-table-column label="操作" width="110">
          <template slot-scope="scope">
            <el-button @click="goModify(scope.row)" type="text" size="small">修改模板</el-button>
            <el-button
              v-if="scope.row.status == '0'"
              @click="goStart(scope.row)"
              type="text"
              size="small"
              >启用模板</el-button
            >
            <el-button
              v-else
              @click="goStop(scope.row)"
              type="text"
              size="small"
              >停用模板</el-button
            >
            <el-button @click="goDelete(scope.row)" type="text" size="small"
              >删除模板</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination 
        :total="total"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {
  listByPage,
  carSubscribeTemplateEnable,
  carSubscribeTemplateDelete,
} from "@/api/product/productTemplate"
import { CALCULATOR_RULE_LIST, CALCULATOR_RULE_LIST_STATUS, CAR_NEW_STATUS_KEY, TEMPLATE_STATUS_LIST, TEMPLATE_STATUS } from '@/utils/constant'

export default {
  data() {
    return {
      CALCULATOR_RULE_LIST,
      CALCULATOR_RULE_LIST_STATUS,
      CAR_NEW_STATUS_KEY,
      TEMPLATE_STATUS_LIST,
      TEMPLATE_STATUS,
      search: {
        name: "",  // 模板名称
        calculatorRule: '', // 计算规则 1.自动摊销计算 2.手动设置租金 
        status: '', // 0.停用  1.启用
        createTimeStart: '', // 创建时间-开始时间
        createTimeEnd: '', // 创建时间-结束时间
        limit: 10,
        page: 1,
      },
      dateRange: [],
      list: [],
      total: 0,
    }
  },
  methods: {
    // 查询新车模板或二手车模板分页数据
    getListByPage() {
      listByPage(this.search).then((res) => {
        if (res.code == 0) {
          this.list = res.data.records
          this.total = res.data.total
        }
      })
    },

    searchList() {
      this.search.page = 1
      this.getListByPage()
    },

    reset() {
      this.search.name = ''
      this.search.calculatorRule = ''
      this.search.status = ''
      this.search.createTimeStart = ''
      this.search.createTimeEnd = ''
      this.dateRange = []
      this.searchList()
    },

    handlerSelectDate(data) {
      this.search.createTimeStart = data[0] || ''
      this.search.createTimeEnd = data[1] || ''
      this.dateRange = data || []
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.searchList()
    },
   
    // 创建模板
    goAdd() {
      this.$router.push({
        path: "/product/carTemplate",
        query: {
          type: "0",
          activeName: this.activeName,
        },
      });
    },
    // 修改模板
    goModify(val) {
      this.$router.push({
        path: "/product/carTemplate",
        query: {
          type: "1",
          infoMation: JSON.stringify(val),
        },
      });
    },
    // 停用模板
    goStop(val) {
      this.$confirm(`确定停用名称为${val.templateName}的模板吗？`, "提示", {
        confirmButtonText: "停用",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            status: "0",
            templateId: val.id,
          };
          carSubscribeTemplateEnable(data).then((res) => {
            if (res.code == 0) {
              this.getListByPage();
              this.$message({
                type: "success",
                message: res.msg,
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用",
            duration: 2000,
          });
        });
    },
    // 启用模板
    goStart(val) {
      this.$confirm(`确定启用名称为${val.templateName}的模板吗？`, "提示", {
        confirmButtonText: "启用",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            status: "1",
            templateId: val.id,
          };
          carSubscribeTemplateEnable(data).then((res) => {
            if (res.code == 0) {
              this.getListByPage();
              this.$message({
                type: "success",
                message: res.msg,
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启用",
            duration: 2000,
          });
        });
    },
    // 删除模板
    goDelete(val) {
      let data = [val.id];
      carSubscribeTemplateDelete(data).then((res) => {
        if (res.code == 0) {
          this.getListByPage();
          this.$message({
            type: "success",
            message: res.msg,
            duration: 2000,
          });
        }
      });
    },
  },
  created() {
    // this.getListEnable()
    this.getListByPage()
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
    white-space:nowrap;
}

.package-name .el-input,
.package-name .el-select {
  width: 4rem;
  height: 0.5333rem;
  margin-left: 0.2667rem;
  margin-right: 0.2667rem;
}

.add-btn {
  display: flex;
  height: .5333rem;
  justify-content: space-between;
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

.bm-table .el-button {
  margin-left: 0;
}

.scree-one{
  margin-top: .1667rem;
  margin-bottom: .1667rem;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: .2667rem;
}
.tabs-area {
  display: flex;
  margin-bottom: .3rem;
  span{
   width: 1.4667rem;
    height: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .0667rem .2667rem;
    box-sizing: border-box;
    border-radius: .5333rem;
    color: #4E5969;
    white-space:nowrap;
    font-size: .2333rem;
  }
  .car{
    color: #3446AA;
    background: #F2F3F8;
  }
}

.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
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
      color: #4E5969;
      margin-right: 16px;
      text-align: right;
    }
  }
}

.reset-btn {
    margin-left: 20px;
}

.create-btn-wrap {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>