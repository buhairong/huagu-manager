<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>风控管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户信审</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">订单申请</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="title">筛选</div>
            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                        <div class="label">信息</div>
                        <c-input 
                            :inputValue.sync="search.userName"
                            placeholder="输入申请人或担保人信息"
                        />
                    </div>

                    <div class="search-item" v-if="search.orderType == 1">
                        <div class="label">用车城市</div>
                        <c-select
                            :selectValue.sync="search.cityId"
                            placeholder="选择车辆免押城市"
                            labelKey="cityName"
                            valueKey="cityId"
                            :options="cityList"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">审核人员</div>
                        <c-select
                            :selectValue.sync="search.auditUser"
                            :options="auditUserList"
                            labelKey="name"
                            valueKey="name"
                            placeholder="选择审核人员"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label label2">申请时间</div>
                        <date-range-select
                            :value.sync="dateRange"
                            :style="{width: '250px'}"
                            @select="handlerSelectDate"
                        />
                    </div>

                    <search-button class="search-btn" @search="searchList"/>
                </div>

                <div class="search-line search-line2">
                    <div class="search-item" v-if="search.orderType == 1">
                        <div class="label">职业</div>
                        <c-select
                            :selectValue.sync="search.careerCode"
                            :options="OCCUPATION"
                            placeholder="选择免押金认证职业"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">查询模型</div>
                        <c-select
                            :selectValue.sync="search.modelName"
                            :options="modelList"
                            labelKey="name"
                            valueKey="name"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">申请状态</div>
                        <c-select
                            :selectValue.sync="search.riskResult"
                            :options="CHECKED_STATUS_ARRAY"
                        />
                    </div>

                    <!-- <div class="search-item">
                        <div class="label label2">到期时间</div>
                        <date-range-select
                            :value.sync="expireDateRange"
                            :style="{width: '250px'}"
                            @select="handlerSelectExpireDate"
                        />
                    </div> -->
                    
                    <reset-button class="search-btn" @reset="reset"/>
                </div>
            </div>

            <div class="split-line"></div>

            <div class="tabs">
                <div 
                    v-for="tab in businessTypeList"
                    :key="tab.value"
                    class="tab"
                    :class="{active: tab.value === currentBusiness}"
                    @click="changeBusiness(tab.value)"
                >
                    {{tab.label}}
                </div>
            </div>

            <div class="tabs">
                <div 
                    v-for="tab in CUSTOM_TYPE"
                    :key="tab.value"
                    class="tab"
                    :class="{active: tab.value == search.orderType}"
                    @click="changeTab(tab.value)"
                >
                    {{tab.label}}
                </div>
            </div>

            <el-table 
                :data="list"
                style="width: 100%"
                :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
            >
                <el-table-column
                    label="用户信息"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.name || '-'}}</div>
                            <div>{{scope.row.companyName || ''}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    v-if="search.orderType == 2"
                    prop="companyName"
                    label="企业信息"
                >
                </el-table-column>

                <el-table-column
                    v-if="search.orderType == 1"
                    label="担保人信息"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.guarantorName || '-'}}</div>
                            <div>{{scope.row.guarantorCompanyName || ''}}</div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    v-if="search.orderType == 1"
                    label="职业"
                >
                    <template slot-scope="scope">
                       <div>{{OCCUPATION_STATUS[scope.row.careerCode]}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="用车城市"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row.careerCode === 7 ? scope.row.city : '全部'}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="业务类型"
                >
                    <template>
                        <div>{{ businessType[currentBusiness] }}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="modelNamesStr"
                    label="大数据查询"
                >
                </el-table-column>

                <el-table-column
                    prop="createdTime"
                    label="申请时间"
                >
                </el-table-column>
                
                <el-table-column
                    label="申请状态"
                >
                    <template slot-scope="scope">
                        <div>
                            {{getRiskResult(scope.row.riskResult)}}
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="审核信息"
                >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.approver || '-'}}</div>
                            <div>{{scope.row.approveTime || ''}}</div>
                        </div>
                    </template>
                </el-table-column>
                
                <!-- <el-table-column
                    label="到期时间"
                >
                    <template slot-scope="scope">
                        <div>{{scope.row.expireTime || '-'}}</div>
                    </template>
                </el-table-column> -->
                
                
                <el-table-column
                    label="操作"
                    width="110"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div><el-button class="table-btn" type="text" @click="goDetailPage(scope.row.id, scope.row.auditRate, 1)">查看详情</el-button></div>
                        <div v-if="(scope.row.queryStatus == 1)">
                            <div v-if="(scope.row.riskResult == 3 || scope.row.riskResult == 4 || scope.row.riskResult == 7)">
                                <el-button class="table-btn" type="text" @click="goDetailPage(scope.row.id, scope.row.auditRate, 1, 2)">
                                    人工审核
                                </el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <pagination 
                :total="total"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>

        <!-- 复审通过 -->
        <RetrialPassDialog 
            v-if="showRetrialPassDialog"
            :show.sync="showRetrialPassDialog"
            :customType="search.orderType"
            @comfirm="passRetrial"
        />

        <!-- 复审拒绝 -->
        <RetrialRefuseDialog 
            v-if="showRetrialRefuseDialog"
            :show.sync="showRetrialRefuseDialog"
            :customType="search.orderType"
            @comfirm="refuseRetrial"
        />

        <!-- 补充材料 -->
        <RetrialMaterialDialog 
            v-if="showRetrialMaterialDialog"
            :show.sync="showRetrialMaterialDialog"
            :certificationList="certificationList"
            :riskResult="currentRow.riskResult"
            @comfirm="materialRetrial"
        />
    </div>
</template>

<script>
import { getBrandList } from '@/api/goods/goods'
import { getModels, getCityList, getAuditUserList, selectRiskListByPage, updateAuditStatusToPersonal, updateAuditStatusOfAgain, certificationConfigList, addUserCarSubscribeCertification, addOtherDeposit, selectRentalRiskList } from '@/api/risk/userReview'
import { CUSTOM_TYPE, BUSINESS_TYPE, MODEL_TYPE, CAR_TYPE, REVIEW_PROGRESS, SEARCH_STATUS, CHECKED_STATUS_ARRAY, RETRIAL_STATUS, OCCUPATION, OCCUPATION_STATUS } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'
import RetrialPassDialog from '../components/RetrialPassDialog.vue'
import RetrialRefuseDialog from '../components/RetrialRefuseDialog.vue'
import RetrialMaterialDialog from '../components/RetrialMaterialDialog.vue'

export default {
    name: 'Model',
    components: {
        RetrialPassDialog,
        RetrialRefuseDialog,
        RetrialMaterialDialog,
    },
    data() {
        return {
            OCCUPATION,
            OCCUPATION_STATUS,
            CUSTOM_TYPE,
            BUSINESS_TYPE,
            MODEL_TYPE,
            CAR_TYPE,
            REVIEW_PROGRESS,
            SEARCH_STATUS,
            CHECKED_STATUS_ARRAY,
            RETRIAL_STATUS,
            search: {
                orderType: '1',  // 1.个人 2.企业
                userName: '',  // 申请人或担保人信息
                cityId: '',   // 用车城市Id
                auditUser: '', // 审核人员
                minCreateTime: '',  // 申请时间-起始
                maxCreateTime: '',  // 申请时间-结束
                careerCode: '',  // 职业Id
                modelName: '',  // 查询模型
                riskResult: '', // 申请状态
                expireTimeStart: '', // 到期时间开始时间
                expireTimeEnd: '', // 到期时间结束时间
                limit: 10,
                page: 1,
            },
            auditUserList: [],
            cityList: [],
            dateRange: [],
            expireDateRange: [],
            modelList: [],
            brandArray: [],
            list: [],
            total: 0,
            showRetrialPassDialog: false,
            showRetrialRefuseDialog: false,
            showRetrialMaterialDialog: false,
            currentRow: {},
            certificationList: [],
            currentRiskResult: null,
            currentBusiness: 1,
            businessTypeList: [
                { value: 1, label: '汽车订阅' },
                { value: 2, label: '会员租车' },
            ],
            businessType: {
                1: '汽车订阅',
                2: '会员租车',
            },
        }
    },

    mounted() {
        this.getModels()
        // this.certificationConfigList()
        this.getCityList()
        this.getAuditUserList()
        this.selectRiskListByPage()
        //this.selectRentalRiskList()
    },

    methods: {
        changeTab(tab) {
            this.search.orderType = tab
            this.searchList()
        },

        changeBusiness(tab) {
            this.currentBusiness = tab
            this.searchList()
        },

        getCityList() {
            getCityList().then(res => {
                if (res.code === 0) {
                    this.cityList = res.data
                }
            })
        },

        getAuditUserList() {
            getAuditUserList().then(res => {
                if (res.code === 0) {
                    this.auditUserList = res.data
                }
            })
        },

        getModels() {
            getModels({
                limit: 100,
                page: 1,
            }).then((res) => {
                if (res.code == 0) {
                    this.modelList = res.data.records
                }
            })
        },

        // 查询品牌列表
        getBrandList() {
            getBrandList({}).then((res) => {
                if (res.code == 0) {
                    this.brandArray = res.data.filter(item => item.typeOpenNum)
                }
            })
        },

        certificationConfigList() {
            certificationConfigList().then((res) => {
                if (res.code == 0) {
                    this.certificationList = res.data
                }
            })
        },

        selectRiskListByPage() {
            selectRiskListByPage(this.search).then((res) => {
                if (res.code == 0) {
                    this.list = res.data.records
                    this.total = res.data.total
                } else {
                    this.list = []
                }
            }).catch(err => {
                this.list = []
            })
        },

        selectRentalRiskList() {
            selectRentalRiskList(this.search).then((res) => {
                if (res.code == 0) {
                    this.list = res.data.records
                    this.total = res.data.total
                } else {
                    this.list = []
                }
            }).catch(err => {
                this.list = []
            })
        },

        handlerSelectAmount(data) {
            this.search.minMoney = data.min
            this.search.maxMoney = data.max
        },

        handlerSelectDate(data) {
            this.search.minCreateTime = data[0] || ''
            this.search.maxCreateTime = data[1] || ''
            this.dateRange = data || []
        },

        handlerSelectExpireDate(data) {
            this.search.expireTimeStart = data[0] || ''
            this.search.expireTimeEnd = data[1] || ''
            this.expireDateRange = data || []
        },

        searchList() {
            this.search.page = 1
            if (this.currentBusiness === 1) {
                this.selectRiskListByPage()
            } else if (this.currentBusiness === 2) {
                this.selectRentalRiskList()
            }
        },

        reset() {
            this.search.userName = ''
            this.search.cityId = ''
            this.search.auditUser = ''
            this.search.minCreateTime = ''
            this.search.maxCreateTime = ''
            this.dateRange = []
            this.search.careerCode = ''
            this.search.modelName = ''
            this.search.riskResult = ''
            this.search.expireTimeStart = ''
            this.search.expireTimeEnd = ''
            this.expireDateRange = []
            this.searchList()
        },

        handleCurrentChange(e) {
            this.search.page = e
            this.selectRiskListByPage()
        },

        getCustomType(key) {
            let res = '-'
            if (key) {
                const item = CUSTOM_TYPE.find(item => item.value == key)
                if (item) {
                    res = item.label
                }
            }

            return res
        },
                        
        // 查看详情  3.人工审核
        // tab 1.查看详情 2.风控记录
        // manual 1.不跳人工审核 2.跳人工审核
        goDetailPage(orderId, auditRate, tab, manual = 1) {
            this.$router.push({
                path: '/risk/UserReview/order/riskOrderDetail',
                query: {
                    orderId,
                    tab,
                    manual,
                    auditRate,
                    customType: this.search.orderType,
                    businessType: this.currentBusiness,
                }
            })
        },

        revokeApproval(id, auditRate) {
            this.$confirm('确定要撤销审批吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updateAuditStatusToPersonal({
                    auditRate,
                    id,
                }).then((res) => {
                    if (res.code == 0) {
                        this.$message.success('保存成功')
                        this.selectRiskListByPage()
                    } else {
                        this.$message.error('保存失败')
                    }
                }).catch(err => {
                    this.$message.error('保存失败')
                })
            })
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return `￥${formatThousandNumber(num)}`
            }
            return '-'
        },

        getReviewPorgess(auditRate) {
            let res = '-'

            if (auditRate) {
                const item = REVIEW_PROGRESS.find(item => item.value == auditRate)
                if(item) {
                    res = item.label
                }
            }

            return res
        },

        getQueryStatus(queryStatus) {
            let res = '-'

            if (queryStatus || queryStatus == 0) {
                const item = SEARCH_STATUS.find(item => item.value == queryStatus)
                if(item) {
                    res = item.label
                }
            }

            return res
        },

        getRiskResult(riskResult) {
            let res = '-'

            if (riskResult) {
                const item = CHECKED_STATUS_ARRAY.find(item => item.value == riskResult)
                if(item) {
                    res = item.label
                }
            }

            return res
        },

        handleCommand(e, row) {
            this.currentRow = row
            if (e == 1) {
                this.showRetrialPassDialog = true
            } else if (e == 2) {
                this.showRetrialRefuseDialog = true
            } else if (e == 3) {
                this.showRetrialMaterialDialog = true
            }
        },

        // 复审通过
        passRetrial() {
            this.updateAuditStatusOfAgain(5)
        },

        // 复审拒绝
        refuseRetrial(remark) {
            this.updateAuditStatusOfAgain(6, remark)
        },

        // 复审补充材料
        materialRetrial(data) {
            if (this.currentRow.riskResult !== 7) {
                Promise.all([this.addUserCarSubscribeCertification(data), this.addOtherDeposit(data)]).then(res => {
                    this.$message.success('保存成功')
                    this.selectRiskListByPage()
                }).catch(err => {
                    this.$message.error(err)
                })
            } else {
                this.addUserCarSubscribeCertification(data).then(res => {
                    this.$message.success('保存成功')
                    this.selectRiskListByPage()
                }).catch(err => {
                    this.$message.error(err)
                })
            }
        }, 

        updateAuditStatusOfAgain(riskResult, remark='') {
            updateAuditStatusOfAgain({
                orderId: this.currentRow.id,
                auditRate: this.currentRow.auditRate,
                riskResult,
                remark,
            }).then((res) => {
                if (res.code == 0) {
                    this.$message.success('保存成功')
                    this.selectRiskListByPage()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        addUserCarSubscribeCertification(data) {
            return new Promise((resolve, reject) => {
                if (data.material && data.material.length) {
                    addUserCarSubscribeCertification({
                        userCarSubscribeId: this.currentRow.id,
                        auditRate: this.currentRow.auditRate,
                        riskResult: 7,
                        list: data.material,
                    }).then((res) => {
                        if (res.code == 0) {
                            resolve('保存成功')
                        } else {
                            reject('加收材料保存失败')
                        }
                    }).catch(err => {
                        reject('加收材料保存失败')
                    })
                } else {
                    resolve(true)
                }
            })
        },

        addOtherDeposit(data) {
            return new Promise((resolve, reject) => {
                addOtherDeposit({
                    orderId: this.currentRow.id,
                    deposit: data.deposit,
                    description: data.mask,
                }).then((res) => {
                    if (res.code == 0) {
                        resolve('保存成功')
                    } else {
                        reject('保证金保存失败')
                    }
                }).catch(err => {
                    reject('保证金保存失败')
                })
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
            text-align: right;
        }
        .label1 {
            width: 70px;
        }
    }
    .search-btn {
        margin-left: 12px;
    }
}
.search-line2 {
    margin-top: 30px;
}

.split-line {
    height: 1px;
    background: #D8D8D8;
    margin-top: 32px;
    margin-bottom: 16px;
}

.tabs {
    margin-bottom: 16px;
    display: flex;
    .tab {
        margin-right: 8px;
        width: 88px;
        height: 28px;
        border-radius: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        cursor: default;
        &.active {
            background: #F2F3F8;
            color: #3446AA;
        }
    }
}

</style>