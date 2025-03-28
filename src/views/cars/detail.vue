<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div class="top">
                <div class="tabs">
                    <div 
                        v-for="tab in tabs"
                        :key="tab.id"
                        class="tab"
                        :class="{active: tab.id == activeTab}"
                        @click="changeTab(tab.id)"
                    >
                        {{tab.text}}
                    </div>
                </div>

                <div style="margin-top: 40px;">
                    <CarInfo 
                        v-if="detail"
                        v-show="activeTab===1"
                        :detail="detail"
                    />

                    <InsuranceInfo 
                        v-if="detail"
                        v-show="activeTab===2"
                        :detail="detail"
                    />

                    <VehicleInfo 
                        v-if="detail"
                        v-show="activeTab===3"
                        :detail="detail"
                    />

                    <OrderInfo 
                        v-if="detail"
                        v-show="activeTab===4"
                        :detail="detail"
                    />

                    <MaintenanceRecord 
                        v-if="detail"
                        v-show="activeTab===5"
                        :detail="detail"
                    />
                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">返回</div>
                <div class="btn save-btn" @click="goEditPage" v-if="activeTab <= 2">修改</div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectCarDetailInfo } from '@/api/car/car'
import CarInfo from './components/CarInfo.vue'
import InsuranceInfo from './components/InsuranceInfo.vue'
import VehicleInfo from './components/VehicleInfo.vue'
import OrderInfo from './components/OrderInfo.vue'
import MaintenanceRecord from './components/MaintenanceRecord.vue'

export default {
    name: 'carDetail',

    components: {
        CarInfo,
        InsuranceInfo,
        VehicleInfo,
        OrderInfo,
        MaintenanceRecord,
    },

    data() {
        return {
            carId: null,
            newOrOlder: null,
            activeTab: 1,
            tabs: [
                {id: 1, text: '车辆信息'},
                {id: 2, text: '保险信息'},
                {id: 3, text: '验车信息'},
                {id: 4, text: '订单信息'},
                {id: 5, text: '维修记录'},
            ],
            detail: null,
        }
    },

    mounted() {
        this.carId = this.$route.query.carId
        this.newOrOlder = this.$route.query.newOrOlder
        
        this.getDetail()
    },

    activated() {
        this.carId = this.$route.query.carId
        this.newOrOlder = this.$route.query.newOrOlder
        
        this.getDetail()
        const from = localStorage.getItem('formMaintenance')
        if (from) {
            localStorage.removeItem('formMaintenance')
        } else {
            this.activeTab = 1
        }
    },

    deactivated() {
        this.detail = null
    },

    methods: {
        getDetail() {
            const data = {
                id: this.carId,
                newOrOld: this.newOrOlder,
            }

            selectCarDetailInfo(data).then(res => {
                if (res.code === 0) {
                    this.detail = res.data
                }
            })
        },

        back() {
            this.$router.back()
        },

        goEditPage() {
            this.$router.push({
                path: '/cars/addOrUpdateCar',
                query: {
                    type: 'edit',
                    newOrOlder: this.newOrOlder,
                    carId: this.carId
                },
            })
        },

        changeTab(tab) {
            this.activeTab = tab
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    height: unset;
    min-height: calc(100vh - 142px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .top {
        width: 100%;
    }

    .tabs {
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

    .tab-container {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>