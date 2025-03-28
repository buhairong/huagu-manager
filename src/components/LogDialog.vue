<template>
  <el-dialog
    title="操作日志"
    :visible.sync="show"
    width="980px"
    :before-close="handleCloseDialog"
  >
    <div class="search-wrap">
      <div class="search-line">
        <div class="search-item">
          <div class="label">操作人</div>
          <c-select
            :selectValue.sync="logSearch.userName"
            :options="userList"
            placeholder="请选择操作人"
          />
        </div>

        <div class="search-item">
          <div class="label">修改项</div>
          <c-select
            :selectValue.sync="logSearch.operateType"
            :options="operateType"
            placeholder="请选择操作人"
          />
        </div>

        <div class="search-item">
          <div class="label">日期</div>
          <date-range-select
            :value.sync="dateRange"
            @select="handlerSelectDate"
          />
        </div>

        <search-button class="search-btn" @search="handleSearch"/>

        <reset-button class="reset-btn" @reset="reset"/>
      </div>
    </div>
   
    <el-table 
      :data="logList"
      style="width: 100%"
      :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
      max-height="350"
    >
      <el-table-column
        label="操作时间"
        prop="createdTime"
      >
      </el-table-column>

      <el-table-column
          label="操作人信息"
      >
        <template slot-scope="scope">
          <div>{{scope.row.userName}}</div>
          <div>{{scope.row.account}}</div>
        </template>
      </el-table-column>

      <el-table-column
        label="修改项"
        prop="operateType"
      >
      </el-table-column>

      <el-table-column
        label="修改前参数"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="logType == 5">
              {{ PARTNER_RANK_STATUS[scope.row.beforeModify] }}
            </div>
            <div v-else>
              <div v-for="(item, index) in scope.row.beforeModify.split('、')" :key="index">
                {{item}}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="修改后参数"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="logType == 5">
              {{ PARTNER_RANK_STATUS[scope.row.afterModify] }}
            </div>
            <div v-else>
              <div v-for="(item, index) in scope.row.afterModify.split('、')" :key="index">
                {{item}}
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination 
      :total="total"
      @handleCurrentChange="handleCurrentChange"
    />

    <span slot="footer" class="dialog-footer">
      <div class="dialog-btn-wrap">
        <div class="btn" @click="handleCloseDialog">关闭</div>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { selectLogList, selectTaskLogCriteria } from '@/api/log/log'
import { PARTNER_RANK_STATUS } from '@/utils/constant'

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },

    logType: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      PARTNER_RANK_STATUS,
      logList: [],
      logSearch: {
        userName: '',
        operateType: '',
        startTime: '',
        endTime: '',
        page: 1,
        limit: 10,
      },
      total: 0,
      userList: [],
      operateType: [],
      dateRange: [],
    }
  },

  mounted() {
    this.logSearch.logType = this.logType
    this.handleSearch()
    this.selectTaskLogCriteria()
  },

  methods: {
    handleSearch() {
      this.logSearch.page = 1
      this.selectLogList()
    },

    selectLogList() {
      selectLogList(this.logSearch).then(res => {
        if (res.code === 0) {
          this.logList = res.data.records
          this.total = res.data.total
        }
      })
    },

    selectTaskLogCriteria() {
      selectTaskLogCriteria({logType: this.logType}).then(res => {
        if (res.code === 0) {
          this.userList = res.data.userName.map(item => {
            return {
              value: item,
              label: item,
            }
          })
          this.operateType = res.data.operateType.map(item => {
            return {
              value: item,
              label: item,
            }
          })
        }
      })
    },
    handlerSelectDate(data) {
      if (data) {
        this.logSearch.startTime = data[0]
        this.logSearch.endTime = data[1]
        this.dateRange = data
      } else {
        this.logSearch.startTime = ''
        this.logSearch.endTime = ''
        this.dateRange = []
      }
    },

    reset() {
      this.logSearch.userName = ''
      this.logSearch.operateType = ''
      this.logSearch.startTime = ''
      this.logSearch.endTime = ''
      this.dateRange = []
      this.handleSearch()
    },

    handleCurrentChange(e) {
        this.logSearch.page = e
        this.selectLogList()
    },

    handleCloseDialog() {
      this.$emit('update:show', false)    
    },
  },
}
</script>

<style lang="less" scoped>
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

.dialog-btn-wrap {
  display: flex;
  justify-content: center;
  .btn {
    background: #3446AA;
    color: #fff;
  }
}

.reset-btn {
  margin-left:20px;
}
</style>