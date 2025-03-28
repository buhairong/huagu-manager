<template>
    <div class="wrap">
        <div class="title">车辆照片</div>

        <div class="tab-wrap">
            <div 
                v-for="(tab, index) in detail.specificLocationCarPicsList"
                :key="index"
                class="tab"
                :class="{'active-tab': currentCarPicsType === tab.carPicsType}"
                @click="changeCarPicsTypeListTab(tab.carPicsType)"
            >
                {{ photoType[tab.carPicsType] }}
            </div>
        </div>

        <div class="car-pics">
            <div class="car-pic" v-for="(item, index) in currentCarPics.carPicList" :key="item.id">
                <el-image
                    style="width:180px;"
                    :src="item.url"
                    :preview-src-list="currentCarPics.carPicList.map(pic => pic.url)"
                    :initial-index="index"
                ></el-image>
                <div class="remark">
                    {{ item.remark }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { photoType } from '@/utils/constant'

export default {
    components: {
        
    },

    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            photoType,
            // 0 左前45度，1 车辆正前，2 右前45度，3 车辆正侧，4 左后45度，5 车辆正后，6 右后45度，7 车辆内饰，8 其他细节
            carPicsTypeList: ['左前45度', '车辆正前', '右前45度', '车辆正侧', '左后45度' , '车辆正后', '右后45度', '车辆内饰', '其他细节'],
            currentCarPicsType: 0,
            currentCarPics: {},
        }
    },

    mounted() {
        this.getCurrentCarPics(0)
    },

    methods: {
        changeCarPicsTypeListTab(index) {
            this.currentCarPicsType = index
            this.getCurrentCarPics(index)
        },

        getCurrentCarPics(index) {
            const findItem = this.detail.specificLocationCarPicsList.find(item => item.carPicsType === index)
            if (findItem) {
                this.currentCarPics = findItem
            }
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    padding-left: 100px;
    .title {
        margin: 24px 0;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 22px;
        color: #1D2129;
    }
    .container {
        display: flex;
        .left {
            width: 400px;
            margin-right: 30px;
        }
        .right {
            width: 400px;
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
            }
            .item-content {
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #1D2129;
            }
        }
    }

    .tab-wrap {
        margin-bottom: 32px;
        display: flex;
        .tab {
            margin-right: 32px;
            height: 22px;
            line-height: 22px;
            color: #4E5969;
            font-size: 14px;
            cursor: pointer;
        }
        .active-tab {
            color: #3446AA;
            position: relative;
        }
        .active-tab:before {
            content: '';
            display: block;
            width: 8px;
            height: 2px;
            border-radius: 1px;
            background-color: #3446AA;
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .car-pics {
        width: 900px;
        display: flex;
        flex-wrap: wrap;
        .car-pic {
            margin-right: 32px;
            margin-bottom: 32px;
            width: 400px;
            display: flex;
            .remark {
                flex: 1;
                margin-top: 8px;
                padding-left: 22px;
                line-height: 22px;
                color: #4E5969;
                font-size: 12px;
            }
        }
    }

    .valid-json-wrap {
        padding-top: 20px;
    }

    .img-list {
        display: flex;
        flex-wrap: wrap;
    }

    .check-info {
        width: 900px;
        display: flex;
        flex-wrap: wrap;
        .second-wrap {
            margin-right: 100px;
            margin-bottom: 30px;
            width: 300px;
            .second-title {
                height: 22px;
                font-family: PingFangSC-Medium;
                font-size: 15px;
                line-height: 22px;
                color: #0A0F2D;
            }
            .second-container {
                padding-top: 16px;
                padding-left: 16px;
                .second-item {
                    margin-bottom: 12px;
                    display: flex;
                    justify-content: space-between;
                    .second-item-title {
                        padding-right: 12px;
                        height: 22px;
                        font-family: PingFang SC;
                        font-size: 15px;
                        line-height: 22px;
                        color: rgba(10, 15, 45, 0.8);
                    }
                    .second-item-content {
                        flex: 1;
                        font-family: PingFangSC-Regular;
                        font-size: 15px;
                        line-height: 22px;
                        letter-spacing: 0px;
                        color: rgba(10, 15, 45, 0.8);
                        display: flex;
                        justify-content: flex-end;
                    }
                    .desc {
                        flex: 1;
                        border-radius: 8px;
                        background: rgba(10, 15, 45, 0.04);
                        padding: 16px;
                        .desc-title {
                            margin-bottom: 4px;
                            height: 22px;
                            font-family: PingFang SC;
                            font-size: 15px;
                            line-height: 22px;
                            color: rgba(10, 15, 45, 0.8);
                        }
                        .desc-text {
                            font-family: PingFang SC;
                            font-size: 12px;
                            line-height: 18px;
                            color: #64696F;
                        }
                    }
                }
            }
        }
    }
}
</style>