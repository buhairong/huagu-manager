<template>
    <div class="wrap">
        <div class="tag-wrap">
            <div class="tabs">
                <div 
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="tab"
                    :class="{active: tab.id == activeTab}"
                    @click="changeTab(tab.id)"
                >
                    {{tab.text}}（{{list['list'+tab.id].length}}）
                </div>
            </div>
        </div>

        <div>
            <div v-show="activeTab === 1">
                <el-table 
                    :data="list.list1"
                    style="width: 100%"
                    :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
                >
                    <el-table-column
                        prop="orderNum"
                        label="订单编号"
                        align="center"
                    >
                    </el-table-column>

                    <el-table-column
                        label="订单来源"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>{{ scope.row.partnerRecommend === 1 ? '合伙人引荐' : '客户自购' }}</div>
                                <div v-if="scope.row.partnerRecommend === 1">佣金:￥{{formatThousandNumber(scope.row.distributionBrokerageFree)}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="createdTime"
                        label="下单日期"
                        align="center"
                    >
                    </el-table-column>

                    <el-table-column
                        label="车辆信息"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.carPlateNum || scope.row.carVin || scope.row.carEngineNum || scope.row.carColor">
                                <el-tooltip class="item" effect="dark" :content="`车牌号：${scope.row.carPlateNum || '-'}\n车架号：${scope.row.carVin || '-'}\n发动机号：${scope.row.carEngineNum || '-'}\n外观颜色：${scope.row.carColor || '-'}`" placement="bottom-start">
                                    <div>{{scope.row.carBrand}}·{{scope.row.carType}} <br> {{scope.row.carTypeYear}} <br> {{scope.row.carTypeYearProduct}}</div>
                                </el-tooltip>
                            </div>
                            <div v-else>
                                <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                                <div>{{scope.row.carTypeYear}}</div>
                                <div>{{scope.row.carTypeYearProduct}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="客户信息"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>{{scope.row.name}}</div>
                                <div>{{scope.row.mobile}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="方案信息"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>订阅周期：{{scope.row.monthTotal}}个月</div>
                                <div>期末选择：{{scope.row.finalSelect}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="订单金额"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>车辆押金：{{formatThousandNumber(scope.row.deposit)}}元</div>
                                <div>订阅费用：{{formatThousandNumber(scope.row.totalPayment)}}元</div>
                                <div>买断价格：{{formatThousandNumber(scope.row.buyoutsFee)}}元</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="statusStr"
                        label="订单状态"
                        align="center"
                    >
                    </el-table-column>

                </el-table>
            </div>

            <div v-show="activeTab === 2">
                <el-table 
                    :data="list.list2"
                    style="width: 100%"
                    :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
                >
                    <el-table-column
                        prop="orderNum"
                        label="订单编号"
                        align="center"
                    >
                    </el-table-column>

                    <el-table-column
                        label="订单来源"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>{{ scope.row.partnerRecommend === 1 ? '合伙人引荐' : '客户自购' }}</div>
                                <div v-if="scope.row.partnerRecommend === 1">佣金:￥{{formatThousandNumber(scope.row.distributionBrokerageFree)}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="createdTime"
                        label="下单日期"
                        align="center"
                    >
                    </el-table-column>

                    <el-table-column
                        label="车辆信息"
                    >
                        <template slot-scope="scope">
                            <div v-if="scope.row.carPlateNum || scope.row.carVin || scope.row.carEngineNum || scope.row.carColor">
                                <el-tooltip class="item" effect="dark" :content="`车牌号：${scope.row.carPlateNum || '-'}\n车架号：${scope.row.carVin || '-'}\n发动机号：${scope.row.carEngineNum || '-'}\n外观颜色：${scope.row.carColor || '-'}`" placement="bottom-start">
                                    <div>{{scope.row.carBrand}}·{{scope.row.carType}} <br> {{scope.row.carTypeYear}} <br> {{scope.row.carTypeYearProduct}}</div>
                                </el-tooltip>
                            </div>
                            <div v-else>
                                <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                                <div>{{scope.row.carTypeYear}}</div>
                                <div>{{scope.row.carTypeYearProduct}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="客户信息"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>{{scope.row.name}}</div>
                                <div>{{scope.row.mobile}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="方案信息"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>订阅周期：{{scope.row.monthTotal}}个月</div>
                                <div>期末选择：{{scope.row.finalSelect}}</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="订单金额"
                    >
                        <template slot-scope="scope">
                            <div>
                                <div>车辆押金：{{formatThousandNumber(scope.row.deposit)}}元</div>
                                <div>订阅费用：{{formatThousandNumber(scope.row.totalPayment)}}元</div>
                                <div>买断价格：{{formatThousandNumber(scope.row.buyoutsFee)}}元</div>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="statusStr"
                        label="订单状态"
                        align="center"
                    >
                    </el-table-column>

                </el-table>
            </div>

            <div v-show="activeTab === 3">
                <el-table 
                    :data="list.list3"
                    style="width: 100%"
                    :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单编号"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column
                    label="客户信息"
                    >
                        <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.name}}</div>
                            <div>{{scope.row.mobile}}</div>
                        </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                    label="车辆信息"
                    >
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                            <div>{{scope.row.carTypeYear}}</div>
                            <div>{{scope.row.carTypeYearProduct}}</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="cityName"
                    label="用车城市"
                    >
                    </el-table-column>

                    <el-table-column
                    label="用车时间"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <div style="display:flex;flex-direction: column;align-items: center;">
                            <div>取：{{scope.row.startDate}}</div>
                            <div>（{{scope.row.monthTotal*30}}天）</div>
                            <div>还：{{scope.row.endDate}}</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    label="取车信息"
                    >
                    <template slot-scope="scope">
                        <div>
                            <div>交车人：{{scope.row.pickUpUserName || '-'}}</div>
                            <div>地址：{{scope.row.pickUpAddress}}</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    label="取车信息"
                    >
                    <template slot-scope="scope">
                        <div>
                            <div>取车人：{{scope.row.returnUserName || '-'}}</div>
                            <div>地址：{{scope.row.returnAddress}}</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    label="订单金额"
                    >
                    <template slot-scope="scope">
                        <div>
                            <div>租车费用：{{formatThousandNumber(scope.row.totalPayment)}}元</div>
                            <div>租车押金：{{formatThousandNumber(scope.row.deposit)}}元</div>
                            <div>取送车服务费：{{formatThousandNumber(0)}}元</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    label="订单状态"
                    >
                    <template slot-scope="scope">
                        <div :class="{'red': scope.row.status == 120 }">{{CAR_RENTAL_ORDER_STATUS[scope.row.status]}}</div>
                    </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-show="activeTab === 4">
                <el-table
                    :data="list.list4"
                    style="width: 100%"
                    :header-cell-style="{ background: '#F2F3F5', color: '#1D2129' }"
                >
                    <el-table-column
                    prop="contractNum"
                    label="合同编号"
                    align="center"
                    >
                    </el-table-column>

                    <el-table-column label="签约主体">
                    <template slot-scope="scope">
                        <div>
                        <div>{{ scope.row.userName }}</div>
                        <div>{{ scope.row.mobile }}</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column label="车辆信息">
                    <template slot-scope="scope">
                        <div>
                        <div>{{ scope.row.carBrand }}·{{ scope.row.carType }}</div>
                        <div>{{ scope.row.carTypeYear }}</div>
                        <div>{{ scope.row.carTypeYearProduct }}</div>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column label="设备价格">
                    <template slot-scope="scope">
                        <div>¥ {{ formatThousandNumber(scope.row.equipmentAmount) }}</div>
                    </template>
                    </el-table-column>

                    <el-table-column label="融资年限">
                    <template slot-scope="scope">
                        <div>{{ SUBSCRIBE_PERIOD_STATUS[scope.row.subscriptionCycle] }}</div>
                    </template>
                    </el-table-column>

                    <el-table-column label="押金">
                    <template slot-scope="scope">
                        <div>¥ {{ formatThousandNumber(scope.row.deposit) }}</div>
                    </template>
                    </el-table-column>

                    <el-table-column label="首付金额">
                    <template slot-scope="scope">
                        <div>¥ {{ formatThousandNumber(scope.row.downPayment) }}</div>
                    </template>
                    </el-table-column>

                    <el-table-column label="月供金额">
                    <template slot-scope="scope">
                        <div>¥ {{ formatThousandNumber(scope.row.firstMonthMoney) }}</div>
                    </template>
                    </el-table-column>

                    <el-table-column label="期末残值">
                    <template slot-scope="scope">
                        <div>¥ {{ formatThousandNumber(scope.row.residualValue) }}</div>
                    </template>
                    </el-table-column>

                    <el-table-column prop="createdBy" label="创建人员">
                    </el-table-column>

                    <el-table-column prop="createdTime" label="创建日期">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { selectListByPage, selectRentalOrderList } from '@/api/order/orderManagement'
import { getCustomerOrderList } from "@/api/order/customerOrder"
import { CAR_RENTAL_ORDER_STATUS, SUBSCRIBE_PERIOD, SUBSCRIBE_PERIOD_STATUS } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'

export default {
    props: {
        userId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            CAR_RENTAL_ORDER_STATUS,
            SUBSCRIBE_PERIOD,
            SUBSCRIBE_PERIOD_STATUS,
            list: {
                list1: [],
                list2: [],
                list3: [],
                list4: [],
            },
            search: {
                userId: null,
                limit: 100,
                page: 1,
            },
            tabs: [
                { id: 1, text: '新车订阅', },
                { id: 2, text: '二手车订阅',  },
                { id: 3, text: '会员租车', },
                { id: 4, text: '融资租赁', },
            ],
            activeTab: 1,
        }
    },

    mounted() {
        this.search.userId = this.userId
        this.getList1()
        this.getList2()
        this.getList3()
        this.getList4()
    },

    methods: {
        changeTab(tab) {
            this.activeTab = tab
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
        },

        getList1() {
            selectListByPage({
                ...this.search,
                newType: 1
            }).then(res => {
                    if (res.code == 0) {
                        this.list.list1 = res.data.page.records
                    }
            })
        },

        getList2() {
            selectListByPage({
                ...this.search,
                newType: 2
            }).then(res => {
                    if (res.code == 0) {
                        this.list.list2 = res.data.page.records
                    }
            })
        },

        getList3() {
            selectRentalOrderList(this.search).then(res => {
                if (res.code == 0) {
                    this.list.list3 = res.data.records.map(item => {
                        let vehicleDamage = false
                        if (item.status >= 130) {
                            if (item.returnedCheckInfo) {
                                const json = JSON.parse(item.returnedCheckInfo)
                                for(const item of json) {
                                    if (item.type === 'tyre' || item.type === 'appearance' || item.type === 'interior') {
                                        if (item.children) {
                                            const pos = item.children
                                            for(const item1 of pos) {
                                                if (item1.children) {
                                                    const part = item1.children
                                                    for(const item2 of part) {
                                                        if (item2.exceptionDesc) {
                                                            vehicleDamage = true
                                                            break
                                                        }
                                                    }
                                                    } else if (item1.exceptionDesc) {
                                                        vehicleDamage = true
                                                        break
                                                    }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        return {
                            ...item,
                            vehicleDamage,
                        }
                    })
                }
            })
        },

        getList4() {
            getCustomerOrderList(this.search).then(res => {
                if (res.code == 0) {
                    this.list.list4 = res.data.records
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.tag-wrap {
    margin-bottom: 40px;
}
.active {
    background: #F2F3F8;
    color: #3446AA;
}
</style>