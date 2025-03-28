<template>
    <div class="wrap">
        <div class="add-plus-btn-wrap">
            <div class="add-plus-btn" @click="goSaveRecordPage('add')">
                <span class="icon"><i class="el-icon-plus"></i></span>
                添加记录
            </div>
        </div>
        

        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="事故日期"
                width="120"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        {{scope.row.accidentDate.slice(0, 10)}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="accidentDesc"
                label="事故描述"
                align="center"
            >
            </el-table-column>

            <el-table-column
                label="维修总金额"
                width="140"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        {{formatThousandNumber(scope.row.maintainTotalMoney)}}元
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="跟进状态"
                width="120"
                align="center"
            >
                <template slot-scope="scope">
                    <div>
                        {{ getStatus(scope.row.status) }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="principalName"
                label="跟进人"
                align="center"
            >
            </el-table-column>

            <el-table-column
                prop="updateTime"
                label="最近更新日期"
                width="120"
                align="center"
            >
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div class="table-btn" @click="goRecordDetailPage(scope.row)">查看</div>
                    <div class="table-btn" @click="goSaveRecordPage('edit', scope.row)">编辑</div>
                    <div class="table-btn" @click="delRecord(scope.row)">删除</div>
                    </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { MAINTENANCE_STATUS } from '@/utils/constant'
import { selectAccidentRecordList, deleteAccidentRecord } from '@/api/car/car'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            list: [],
        }
    },

    mounted() {
        this.selectAccidentRecordList()
    },

    methods: {
        selectAccidentRecordList() {
            const data = {
                carId: this.detail.carInfoRespVo.carTypeYearProductId,
                carType: this.detail.carInfoRespVo.newOrOld,
            }

            selectAccidentRecordList(data).then(res => {
                if (res.code === 0) {
                    this.list = res.data
                }
            })
        },

        goRecordDetailPage(row) {
            this.$router.push({
                path: '/cars/maintenanceRecordDetail',
                query: {
                    carTypeYearProductId: this.detail.carInfoRespVo.carTypeYearProductId,
                    maintenanceRecordId: row.id
                },
            })
        },

        goSaveRecordPage(type, row={}) {
            this.$router.push({
                path: '/cars/addOrUpdateMaintenanceRecord',
                query: {
                    type,
                    carTypeYearProductId: this.detail.carInfoRespVo.carTypeYearProductId,
                    carType: this.detail.carInfoRespVo.newOrOld,
                    maintenanceRecordId: row.id
                },
            })
        },

        delRecord(row) {
            this.$confirm(`确定要删除这条维修记录吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const data = {
                    id: row.id,
                }

                deleteAccidentRecord(data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('删除成功')
                        this.selectAccidentRecordList()
                    } else {
                        this.$message.error('删除失败')
                    }
                }).catch(err => {
                    this.$message.error('删除失败')
                })
            })
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return '-'
        },

        getStatus(status) {
            let label = '-'
            if (status || status == 0) {
                const findItem = MAINTENANCE_STATUS.find(item => item.value == status)
                if (findItem) {
                    label = findItem.label
                }
            } 

            return label
            
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    padding: 0 80px;
    .add-plus-btn-wrap {
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>