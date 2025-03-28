<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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
                    <PersonInfo 
                        v-if="customerInfo"
                        v-show="activeTab === 1"
                        :detail="customerInfo"
                    />

                    <RiskInfo 
                        v-if="userId"
                        v-show="activeTab === 2"
                        :userId="userId"
                    />

                    <OrderInfo 
                        v-if="userId"
                        v-show="activeTab === 3"
                        :userId="userId"
                    />

                    <UserCarIntentionList 
                        v-if="userId"
                        v-show="activeTab === 4"
                        :userId="userId"
                    />

                    <FollowList 
                        v-if="userId"
                        v-show="activeTab === 5"
                        :userId="userId"
                    />

                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">返回</div>
            </div>
        </div>
    </div>
</template>

<script>
import PersonInfo from './components/PersonInfo.vue'
import RiskInfo from './components/RiskInfo.vue'
import OrderInfo from './components/OrderInfo.vue'
import UserCarIntentionList from './components/UserCarIntentionList.vue'
import FollowList from './components/FollowList.vue'

export default {
    name: 'customerDetail',

    components: {
        PersonInfo,
        RiskInfo,
        OrderInfo,
        UserCarIntentionList,
        FollowList,
    },

    data() {
        return {
            activeTab: 1,
            tabs: [
                {id: 1, text: '基础信息'},
                {id: 2, text: '风险查询'},
                {id: 3, text: '订单信息'},
                {id: 4, text: '浏览记录'},
                {id: 5, text: '跟进记录'},
            ],
            customerInfo: null,
            detail: null,
            userId: null,
        }
    },

    mounted() {
        const customerInfo = localStorage.getItem('customerInfo')
        if (customerInfo) {
            this.customerInfo = JSON.parse(customerInfo)
            this.userId = this.customerInfo.userId
            
        }
    },

    methods: {
        back() {
            this.$router.back()
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
        width: 100%;
        white-space: nowrap;
        overflow: auto;
        .tab {
            display: inline-block;
            margin-right: 8px;
            width: 88px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border-radius: 32px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            cursor: default;
            &.active {
                background: #F2F3F8;
                color: #3446AA;
            }
        }
    }
}
</style>