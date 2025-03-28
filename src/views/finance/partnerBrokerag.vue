<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">合伙人反佣申请</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="title">筛选</div>

            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                        <div class="label">申请日期</div>
                        <date-range-select
                            :value.sync="createTimeRange"
                            :selectStyle="{
                                width: '300px'
                            }"
                            @select="handlerSelectCreateDate"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">完成日期</div>
                        <date-range-select
                            :value.sync="updateTimeRange"
                            :selectStyle="{
                                width: '300px'
                            }"
                            @select="handlerSelectUpdateDate"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">状态</div>
                        <c-select
                            :selectValue.sync="search.status"
                            :options="BROKERAGE_RISK_STATUS"
                            placeholder="请选择状态"
                        />
                    </div>

                    <search-button class="search-btn" @search="selectBrokerageList"/>

                    <reset-button class="reset-btn" @reset="reset"/>
                </div>
            </div>

           <el-table 
                :data="list"
                style="width: 100%"
                :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
            >
                <el-table-column
                    label="返佣金额"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{formatThousandNumber(scope.row.total)}}元</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="收款人信息"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.companyName || scope.row.name}}</div>
                            <div>{{scope.row.mobile}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="收款人银行卡号"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.companyCardNo || scope.row.bankCardNo}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="银行"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.companyCardName || scope.row.bankName}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="申请时间"
                    prop="applyTime"
                >
                </el-table-column>

                <el-table-column
                    label="状态"
                >
                    <template slot-scope="scope">
                        <div :class="{'error-status': scope.row.status === 0}">{{BROKERAGE_RISK[scope.row.status]}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="完成时间"
                    prop="finishTime"
                >
                </el-table-column>

                <el-table-column
                    label="操作"
                    width="110"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 2" class="table-btn" @click="agree(scope.row.id)">完成放款</div>
                        <div v-if="scope.row.status === 2" class="table-btn" @click="reject(scope.row.id)">信息有误</div>
                        <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
                    </template>
                </el-table-column>
            </el-table>

            <pagination 
                :total="total"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>

        <el-dialog
            title="转账信息有误"
            :visible.sync="showRejectDialog"
            width="480px"
            :before-close="handleClose"
        >
            
            <div class="wrap">
                <div>
                    <div class="dialog-tip">备注说明</div>
                    <c-text-area 
                        :inputValue.sync="remark"
                        placeholder="请输入备注说明~最多可输入100个字"
                    />
                </div>

                <span slot="footer" class="dialog-footer">
                    <div class="dialog-btn-wrap" style="margin-top:40px">
                        <div class="btn" @click="handleClose">取消</div>
                        <div class="btn save-btn" @click="handleReject">确认</div>
                    </div>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { selectPartnerBrokerageList, operateSubscribePage } from '@/api/finance/finance'
import { BROKERAGE_RISK_STATUS, BROKERAGE_RISK } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'

export default {
  name: 'partnerBrokerag',

  components: {
    
  },

  data() {
    return {
        BROKERAGE_RISK_STATUS,
        BROKERAGE_RISK,
        search: {
            applyStartTime: '', // 最小申请时间
            applyEndTime: '', // 最大申请时间
            finishStartTime: '', // 最小完成时间
            finishEndTime: '', // 最大完成时间
            status: '',  // 1批准，0不批准，2待放款
            page: 1,	
            limit: 10,
        },
        createTimeRange: [],
        updateTimeRange: [],
        list: [],
        total: 0,
        remark: '',
        showRejectDialog: false,
        rejectId: null,
    }
  },

    mounted() {
        this.selectBrokerageList()
    },

    methods: {
        selectBrokerageList() {
            selectPartnerBrokerageList(this.search).then(res => {
                if(res.code === 0) {
                    this.list = res.data.records
                    this.total = res.data.total
                }
            })
        },

        handlerSelectCreateDate(data) {
            this.search.applyStartTime = data[0] || ''
            this.search.applyEndTime = data[1] || ''
            this.createTimeRange = data || []
        },

        handlerSelectUpdateDate(data) {
            this.search.finishStartTime = data[0] || ''
            this.search.finishEndTime = data[1] || ''
            this.updateTimeRange = data || []
        },

        reset() {
            this.search.applyStartTime = ''
            this.search.applyEndTime = ''
            this.createTimeRange = []
            this.search.finishStartTime = ''
            this.search.finishEndTime = ''
            this.updateTimeRange = []
            this.search.status = ''
            this.search.page = 1
            this.selectBrokerageList()
        },

        handleCurrentChange(e) {
            this.search.page = e
            this.selectBrokerageList()
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },

        goDetailPage(row) {
            this.$router.push({
                path: '/finance/partnerBrokerageDetail',
                query: {
                    ...row
                },
            })
        },

        agree(id) {
            this.$confirm(`确认完成这笔放款吗？`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }).then(() => {
                this.updateStatusOfBrokerage(1, id)
            })
        },

        reject(id) {
            this.showRejectDialog = true
            this.rejectId = id
        },

         handleClose() {
            this.showRejectDialog = false
            this.rejectId = null
        },

        handleReject() {
            if (!this.remark.trim()) {
                this.$message.error('请输入备注说明')
                return
            }


            this.updateStatusOfBrokerage(0, this.rejectId)
            this.handleClose()
        },

        updateStatusOfBrokerage(status, id) {
            const data = {
                status,
                id,
                reason: this.remark,
            }
            operateSubscribePage(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.selectBrokerageList()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
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

.search-wrap {
    margin-bottom: 40px;
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

  .reset-btn {
    margin-left: 12px;
  }
}

.error-status {
    color: #EA0000;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .dialog-tip {
    margin-top: 20px;
    margin-bottom: 5px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4E5969;
  }
}
</style>