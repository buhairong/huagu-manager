<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看记录</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-if="detail">
            <div class="top">
                <div class="content-title">查看记录</div>

                <div class="container">
                    <div class="item">
                        <div class="item-title">事故日期: </div>
                        <div class="item-content">
                            {{ detail.accidentDate }}
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">事故描述: </div>
                        <div class="item-content">
                            {{ detail.accidentDesc }}
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">维修项目: </div>
                        <div class="item-content">
                            <div class="config-item" v-for="(item, index) in detail.itemList" :key="index">
                                {{ item.item }} {{ formatThousandNumber(item.money) }}元
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">维修费用: </div>
                        <div class="item-content">
                            {{ formatThousandNumber(detail.maintainTotalMoney) }}元
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">事故照片: </div>
                        <div class="item-content">
                            <div class="img-wrap">
                                <div class="img" v-for="(img, index) in detail.imageList" :key="index">
                                    <el-image
                                        style="width:100%;height:100%"
                                        :src="img"
                                        fit="cover"
                                    ></el-image>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">跟进状态: </div>
                        <div class="item-content">
                            {{ getStatus(detail.status) }}
                        </div>
                    </div>
                </div>

            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">返回</div>
                <div class="btn save-btn" @click="goEditPage">编辑</div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectAccidentRecordDetail } from '@/api/car/car'
import { formatThousandNumber } from '@/utils/util'
import { MAINTENANCE_STATUS } from '@/utils/constant'

export default {
    name: 'addOrUpdateCar',

    components: {
        
    },

    data() {
        return {
            type: '',
            carTypeYearProductId: null,
            maintenanceRecordId: null,
            detail: null,
        }
    },

    mounted() {
        this.type = this.$route.query.type

        this.carTypeYearProductId = this.$route.query.carTypeYearProductId
        this.maintenanceRecordId = this.$route.query.maintenanceRecordId
        
        this.getDetail(this.$route.query.maintenanceRecordId)

        localStorage.setItem('formMaintenance', true)
    },

    methods: {
        getDetail(maintenanceRecordId) {
            const data = {
                id: maintenanceRecordId,
            }

            selectAccidentRecordDetail(data).then(res => {
                if (res.code === 0) {
                    this.detail = {
                        ...res.data
                    }
                }
            })
        },

        back() {
            this.$router.back()
        },

        goEditPage() {
            this.$router.push({
                path: '/cars/addOrUpdateMaintenanceRecord',
                query: {
                    type: 'edit',
                    carTypeYearProductId: this.carTypeYearProductId,
                    maintenanceRecordId: this.maintenanceRecordId,
                },
            })
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return 0
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
.content {
    height: unset;
    min-height: calc(100vh - 142px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .top {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        padding: 0 100px;
        .item {
            margin-bottom: 16px;
            display: flex;
            .item-title {
                margin-right: 16px;
                height: 32px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                line-height: 32px;
                color: #86909C;
                text-align: right;
            }

            .item-content {
                flex: 1;
                color: #1D2129;
                line-height: 32px;
            }

            .img-wrap {
                display: flex;
                flex-wrap: wrap;
            }

            .img {
                margin-right: 8px;
                margin-bottom: 16px;
                width: 168px;
                height: 105px;
                position: relative;
            }

            .config-item {
                margin-bottom: 16px;
                display: flex;
                align-items: center;
            }

            .total {
                color: #7B7A7A;
                font-size: 14px;
            }
        }
    }
}
</style>