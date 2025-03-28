<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>竞价管理</el-breadcrumb-item>
            <el-breadcrumb-item>竞价列表</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-if="detail">
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
                    <AuctionInfo 
                        v-show="activeTab === 1"
                        :detail="detail"
                    />

                    <CarInfo 
                        v-show="activeTab === 2"
                        :detail="detail"
                    />

                    <CarPhotos 
                        v-show="activeTab === 3"
                        :detail="detail"
                    />
                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">返回</div>
                <div class="btn-group" v-if="detail.secondAuction.status === 0">
                    <div class="btn save-btn" @click="updateStatus(1)">审核通过</div>
                    <div class="btn save-btn" @click="updateStatus(2)">审核驳回</div>
                </div>
                <div class="btn save-btn" @click="delOrder" v-if="detail.secondAuction.status === 1">撤回竞价</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuctionDetail, updateAuctionStatus, delAuction } from "@/api/auction/auction"
import AuctionInfo from './components/AuctionInfo.vue'
import CarInfo from '../cars/components/CarInfo.vue'
import CarPhotos from '../cars/components/CarPhotos.vue'

export default {
    name: 'AuctionCarDetail',

    components: {
        AuctionInfo,
        CarInfo,
        CarPhotos,
    },

    data() {
        return {
            carId: null,
            newOrOlder: null,
            activeTab: 1,
            tabs: [
                {id: 1, text: '竞价信息'},
                {id: 2, text: '车辆信息'},
                {id: 3, text: '车辆照片'},
            ],
            detail: null,
        }
    },

    mounted() {
        this.carId = this.$route.query.carId
        this.getDetail()
    },

    activated() {
        this.carId = this.$route.query.carId
        this.getDetail()
    },

    deactivated() {
        this.detail = null
    },

    methods: {
        getDetail() {
            const data = {
                id: this.carId,
            }

            getAuctionDetail(data).then(res => {
                if (res.code === 0) {
                    this.detail = {
                        ...res.data,
                        carInfoRespVo: res.data.secondHandCars
                    }
                }
            })
        },

        back() {
            this.$router.back()
        },

        updateStatus(status) {
            const data = {
                id: this.carId,
                status
            }

            updateAuctionStatus(data).then(res => {
                if (res.code === 0) {
                    this.$message.success('操作成功')
                    this.getDetail()
                } else {
                    this.$message.error('操作失败')
                }
            }).catch(err => {
                this.$message.error('操作失败')
            })
        },

        delOrder() {
            this.$confirm(`确定要删除这个竞拍吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                const data = {
                    id: this.carId,
                }

                delAuction(data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('删除成功')
                        this.$router.push({
                            path: "/auction/auctionCarList",
                        })
                    } else {
                        this.$message.error('删除失败')
                    }
                }).catch(err => {
                    this.$message.error('删除失败')
                })
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

.btn-group {
    display: flex;
}
</style>