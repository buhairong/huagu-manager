<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>免押管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">大数据查询模型</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div class="title">筛选</div>
        <div class="search-wrap">
          <div class="search-line">
            <div class="search-item">
                <div class="label">模型名称</div>
                <c-input 
                    :inputValue.sync="search.modelName"
                    placeholder="请输入模型名称"
                    :inputStyle="{width: '208px'}"
                />
            </div>

            <div class="search-item">
                <div class="label">免押金认证职业</div>
                <c-select
                    :selectValue.sync="search.occupationId"
                    :options="OCCUPATION"
                />
            </div>

            <search-button class="search-btn" @search="searchList"/>
          </div>

          <div class="search-line search-line2">
            <div class="search-item">
                <div class="label">模型状态</div>
                <c-select
                  :selectValue.sync="search.status"
                  :options="MODEL_TYPE"
                />
            </div>

            <div class="search-item">
                <div class="label label2">创建时间</div>
                <date-range-select
                  :value.sync="dateRange"
                  :style="{width: '250px'}"
                  @select="handlerSelectDate"
                />
            </div>
              
            <reset-button class="search-btn" @reset="reset"/>
          </div>
        </div>

        <div class="create-btn-warp">
          <create-button 
            text="创建模型"
            @create="setModel(1)"
          />
        </div>
        
        <el-table 
          :data="list"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            prop="type"
            label="模型名称"
          >  
          </el-table-column>

          <el-table-column
            prop="type"
            label="适用免押金认证职业"
          >
          </el-table-column>

          <el-table-column
            label="查询条件"
          >
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.ruleNames" class="item" effect="dark" :content="scope.row.ruleNames" placement="bottom-start">
                <div class="rule-name" v-html="scope.row._ruleNames"></div>
              </el-tooltip>
              <div v-else>-</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="type"
            label="模型创建时间"
          >
          </el-table-column>
         
          <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
              {{getStatus(scope.row.status)}}
            </template>
          </el-table-column>

          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
              <template slot-scope="scope">
                  <div><el-button class="table-btn" type="text" @click="changeStatus(scope.row)">{{(scope.row.status == 1 ? '停用' : '启用')}}</el-button></div>
                  <div><el-button class="table-btn" type="text" @click="editModel(scope.row)">编辑</el-button></div>
                  <div><el-button class="table-btn" type="text" @click="delModel(scope.row)">删除</el-button></div>
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
import { getModels } from '@/api/nodeposit/model'
import { MODEL_TYPE, OCCUPATION, OCCUPATION_STATUS } from '@/utils/constant'

export default {
  name: 'nodepositModel',

  components: {
    
  },

  data() {
    return {
      MODEL_TYPE,
      OCCUPATION,
      OCCUPATION_STATUS,
      search: {
        modelName: '',       // 模型名称
        occupationId: '',    // 免押金认证职业
        status: '',          // 模型状态
        minCreateTime: '', // 创建日期开始时间
        maxCreateTime: '', // 创建日期结束时间
        limit: 10,
        page: 1,
      },
      dateRange: [],
      list: [],
      total: 0,
    }
  },

  mounted() {
    this.getModels()
  },

  methods: {
    getModels() {
      getModels(this.search).then((res) => {
          if (res.code == 0) {
            this.list = res.data.records
            this.total = res.data.total
          }
      })
    },

    searchList() {
      this.search.page = 1
      this.getModels()
    },

    reset() {
      this.search.modelName = ''
      this.search.occupationId = ''
      this.search.status = ''
      this.search.minCreateTime = ''
      this.search.maxCreateTime = ''
      this.searchList()
    },
        
    handlerSelectDate(data) {
      this.search.minCreateTime = data[0] || ''
      this.search.maxCreateTime = data[1] || ''
      this.dateRange = data || []
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.getModels()
    },

    // 1.添加 2.编辑
    setModel(operator, row={}) {
      this.$router.push({
        path: '/nodeposit/model/detail',
        query: {
          operator,
          modelId: row.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  height: 28px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  line-height: 28px;
  color: #1D2129;
  margin-bottom: 23px;
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
    }
  }
  .search-btn {
    margin-left: 12px;
  }
}
.search-line2 {
  margin-top: 30px;
}

.create-btn-warp {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
}
</style>