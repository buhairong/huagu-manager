<template>
    <div>
        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                v-if="type === 2"
                label="公司名称"
                prop="companyName"
            >
            </el-table-column>

            <el-table-column
                label="返佣金额"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{formatThousandNumber(scope.row.money)}}元</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                v-if="type === 2"
                label="收款账户"
                prop="companyName"
            >
            </el-table-column>

            <el-table-column
                v-else
                label="收款人信息"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.name}}</div>
                        <div>{{scope.row.idCard}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="银行卡号"
                prop="bankAccountId"
            >
            </el-table-column>

            <el-table-column
                label="开户行"
                prop="bankName"
            >
            </el-table-column>

            <el-table-column
                label="申请时间"
                prop="createTime"
            >
            </el-table-column>

            <el-table-column
                v-if="type === 3"
                label="状态"
            >
                <template slot-scope="scope">
                    <div>
                        <div v-if="scope.row.status === 0">待放款</div>
                        <div v-else-if="scope.row.status === 1">完成放款</div>
                        <div class="error-status" v-else>{{scope.row.remark}}</div>
                    </div>
                </template>
            </el-table-column>
            
            <el-table-column
                v-else
                label="状态"
            >
                <template slot-scope="scope">
                    <div :class="{'error-status': scope.row.status === 0}">{{scope.row.statusStr}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="完成时间"
            >
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.updateTime || '-'}}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div v-if="type === 3">
                        <div v-if="scope.row.status === 0">
                            <div class="table-btn" @click="agree(scope.row.id)">完成放款</div>
                            <div class="table-btn" @click="reject(scope.row.id)">信息有误</div>
                        </div>
                    </div>
                    <div v-else-if="scope.row.status === 2">
                        <div class="table-btn" @click="agree(scope.row.id)">完成放款</div>
                        <div class="table-btn" @click="reject(scope.row.id)">信息有误</div>
                    </div>
                    <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
                </template>
            </el-table-column>
        </el-table>

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
import { updateStatusOfBrokerage } from '@/api/finance/finance'
import { updateStatusOfAuction } from '@/api/auction/auction'
import { formatThousandNumber } from '@/utils/util'

export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
        type: {
            type: Number, // 1个人，2店铺
            required: true,
        },
    },

    data() {
        return {
            remark: '',
            showRejectDialog: false,
            rejectId: null,
        }
    },

    mounted() {
        
    },

    methods: {
        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },

        agree(id) {
            this.$confirm(`确认完成这笔放款吗？`, '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            }).then(() => {
                if (this.type === 3) {
                    this.updateStatusOfAuction(1, id)
                } else {
                    this.updateStatusOfBrokerage(1, id)
                }
                
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

            if (this.type === 3) {
                this.updateStatusOfAuction(2, this.rejectId)
            } else {
                this.updateStatusOfBrokerage(0, this.rejectId)
            }
            
            this.handleClose()
        },

        updateStatusOfAuction(status, id) {
            const data = {
                status,
                id,
                remark: this.remark,
            }
            updateStatusOfAuction(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('update')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        updateStatusOfBrokerage(status, id) {
            const data = {
                status,
                id,
                remark: this.remark,
            }
            updateStatusOfBrokerage(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('update')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        goDetailPage(row) {
            let statusStr = '待放款'

            if (row.status === 1) {
                statusStr = '完成放款'
            } else if (row.status === 2) {
                statusStr = '拒绝放款'
            }

            this.$router.push({
                path: '/finance/brokerageDetail',
                query: {
                    type: this.type,
                    ...row,
                    statusStr,
                },
            })
        },
    },
}
</script>

<style lang="less" scoped>
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