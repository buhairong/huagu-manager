<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>全民合伙人</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">全民合伙人申请</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div>
            <div class="title">筛选</div>

            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                      <div class="label">合伙人信息</div>
                      <c-input 
                        :inputValue.sync="search.userInfo"
                        placeholder="请输入合伙人信息"
                      />
                    </div>

                    <div class="search-item">
                      <div class="label">状态</div>
                      <c-select
                        :selectValue.sync="search.status"
                        :options="PARTNER_APPLY_STATUS_LIST"
                        placeholder="请选择状态"
                      />
                    </div>

                    <div class="search-item">
                      <div class="label">申请日期</div>
                      <date-range-select
                        :value.sync="dateRange"
                        @select="handlerSelectDate"
                      />
                    </div>

                    <search-button class="search-btn" @search="searchList"/>

                    <reset-button class="search-btn reset-btn" @reset="reset"/>
                </div>
            </div>
        </div>

        <el-table 
          :data="list"
          style="width: 100%"
          :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
          <el-table-column
            label="姓名"
            prop="userName"
          >
          </el-table-column>

          <el-table-column
            label="手机号"
            prop="mobile"
          >
          </el-table-column>

          <el-table-column
            label="职业信息"
            prop="career"
          >
          </el-table-column>

          <el-table-column
            label="申请时间"
            prop="createdTime"
          >
          </el-table-column>

          <el-table-column
            label="状态"
          >
            <template slot-scope="scope">
              <div>
                <div>{{ PARTNER_APPLY_STATUS[scope.row.status] }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="审核信息"
          >
            <template slot-scope="scope">
              <div>
                <div>{{scope.row.updatedBy || '-'}}</div>
                <div>{{scope.row.updatedTime || ''}}</div>
              </div>
            </template>
          </el-table-column>
         
          <el-table-column
              label="操作"
              width="110"
              align="center"
          >
            <template slot-scope="scope">
              <div class="table-btn" @click="goDetail(scope.row)">查看详情</div>
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
import { getPartnerApplyList } from '@/api/partner/partner'
import { PARTNER_APPLY_STATUS_LIST, PARTNER_APPLY_STATUS } from '@/utils/constant'

export default {
  name: 'partnerApply',

  components: {
    
  },

  data() {
    return {
      PARTNER_APPLY_STATUS_LIST,
      PARTNER_APPLY_STATUS,
      search: {
        userInfo: '',
        status: '',
        applyTimeStart: '',
        applyTimeEnd: '',
        page: 1,
        limit: 10,
      },
      dateRange: [],
      list: [],
      total: 0,
    }
  },

  mounted() {
    this.searchList()
  },

  methods: {
    searchList() {
      getPartnerApplyList(this.search).then(res => {
        if (res.code === 0) {
          this.list = res.data.records
          this.total = res.data.total
        }
      })
    },

    handlerSelectDate(data) {
      this.search.applyTimeStart = data[0] || ''
      this.search.applyTimeEnd = data[1] || ''
      this.dateRange = data || []
    },

    reset() {
      this.search.userInfo = ''
      this.search.status = ''
      this.search.applyTimeStart = ''
      this.search.applyTimeEnd = ''
      this.dateRange = []
      this.search.page = 1
      this.searchList()
    },

    handleCurrentChange(e) {
      this.search.page = e
      this.searchList()
    },

    goDetail(row) {
      const partnerApplyInfo = JSON.stringify(row)
      localStorage.setItem('partnerApplyInfo', partnerApplyInfo)
      this.$router.push('/partner/detail')
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

.item {
    margin-bottom: 16px;
    display: flex;
    height: 32px;
    line-height: 32px;
    .item-label {
      margin-right: 16px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #1D2129;
      text-align: right;
    }
}

.tip {
  height: 24px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 24px;
  color: rgba(124, 124, 124, 0.8);
}
</style>