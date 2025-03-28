<template>
    <div class="wrap">
        <div class="car-info">
            <el-image
                style="width:134px;height:100px;margin-right:12px;"
                :src="detail.carInfoRespVo.imageUrl"
                fit="cover"
            ></el-image>
            <div>
                <div class="car-brand">{{ detail.carInfoRespVo.carBrand }}·{{ detail.carInfoRespVo.carType }} {{ detail.carInfoRespVo.carTypeYear }} {{ detail.carInfoRespVo.carTypeYearProduct }}</div>
                <div class="price">厂商指导价：{{formatThousandNumber(detail.carInfoRespVo.guidancePrice)}}元</div>
            </div>
        </div>

        <div class="container">
            <div class="left">
                <!-- <div class="item">
                    <div class="item-title">车况信息: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.newOrOld === 1 ? '全新车' : '二手车' }}</div>
                </div> -->

                <div class="item">
                    <div class="item-title">车架号: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.carVin || '-' }}</div>
                </div>

                <div class="item">
                    <div class="item-title">发动机号: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.carEngineNum || '-' }}</div>
                </div>

                <div class="item">
                    <div class="item-title">过户次数: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.transcationNum }}次</div>
                </div>

                <div class="item">
                    <div class="item-title">实表里程数: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.mileage || detail.carInfoRespVo.mileage === 0 ? `${detail.carInfoRespVo.mileage}公里` : '-'}}</div>
                </div>

                <!-- <div class="item">
                    <div class="item-title">车辆状态: </div>
                    <div class="item-content">{{ getCarStatus(detail.carInfoRespVo.status) }}</div>
                </div> -->
            </div>

            <div class="right">
                <!-- <div class="item">
                    <div class="item-title">实时{{detail.carInfoRespVo.carEnergyType === 1 ? '油量' : '电量'}}: </div>
                    <div class="item-content">{{ getTankSize(detail.carInfoRespVo.tankSize) }}</div>
                </div> -->

                <div class="item">
                    <div class="item-title">车牌号: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.carPlateNum || '-' }}</div>
                </div>

                <div class="item">
                    <div class="item-title">外观颜色: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.outColor || '-' }}</div>
                </div>

                <div class="item">
                    <div class="item-title">内饰颜色: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.inColor || '-' }}</div>
                </div>

                <div class="item">
                    <div class="item-title">上牌日期: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.regDate || '-' }}</div>
                </div>

                <!-- <div class="item">
                    <div class="item-title">车辆行驶证: </div>
                    <div class="item-content">
                        <el-image
                            v-if="detail.carInfoRespVo.travelLicenseUrl"
                            style="width:218px;height:135px"
                            :src="detail.carInfoRespVo.travelLicenseUrl"
                            fit="cover"
                        ></el-image>
                        <div v-else>-</div>
                    </div>
                </div> -->

                <!-- <div class="item">
                    <div class="item-title">车辆增配项: </div>
                    <div class="item-content">
                        <div v-if="detail.carInfoRespVo.otherConfigList && detail.carInfoRespVo.otherConfigList.length">
                            <div v-for="(item, index) in detail.carInfoRespVo.otherConfigList" :key="index" style="margin-bottom:8px;">
                                {{ item.detailName }} &nbsp;&nbsp; +￥{{ formatThousandNumber(item.money) }}
                            </div>
                        </div>
                        <div v-else>-</div>
                    </div>
                </div>

                <div class="item">
                    <div class="item-title">增配总额: </div>
                    <div class="item-content">{{ detail.carInfoRespVo.otherConfigList && detail.carInfoRespVo.otherConfigList.length ? `￥${getTotalConfig()}` : '-'}}</div>
                </div> -->

            </div>
        </div>

    </div>
</template>

<script>
import { formatThousandNumber } from '@/utils/util'
import { CAR_STATUS } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            
        }
    },

    mounted() {
        
    },

    methods: {
        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return '-'
        },

        getTotalConfig() {
            const total = this.detail.carInfoRespVo.otherConfigList.reduce((sum, cur) => {
                return sum + cur.money
            }, 0)

            return this.formatThousandNumber(total)
        },

        getCarStatus(status) {
            let label = '-'
            if (status || status == 0) {
                const findItem = CAR_STATUS.find(item => item.value == status)
                if (findItem) {
                    label = findItem.label
                }
            } 

            return label
        },

        getTankSize(tankSize) {
            let label = '-'

            if (tankSize || tankSize == 0) {
                return tankSize + (this.detail.carInfoRespVo.carEnergyType === 1 ? '/16' : '%')
            } 

            return label
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .car-info {
        display: flex;
        align-items: center;
        .car-brand {
            height: 24px;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            line-height: 24px;
            color: #1D2129;
        }
        .price {
            margin-top: 4px;
            height: 22px;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 22px;
            color: #86909C;
        }
    }

    .container {
        margin-top: 24px;
        display: flex;
        .left{
            margin-right: 100px;
        }
        .item {
            margin-bottom: 16px;
            display: flex;
            .item-title {
                margin-right: 8px;
                height: 21px;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #86909C;
                width: 95px;
                text-align: right;
            }
            .item-content {
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #1D2129;
            }
        }
    }
}
</style>