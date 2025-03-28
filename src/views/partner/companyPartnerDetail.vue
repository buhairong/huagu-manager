<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">合伙人详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div style="width:100%;">
                <div class="tabs" v-if="type == 2">
                    <div 
                        v-for="tab in tabs"
                        :key="tab.id"
                        class="tab"
                        :class="{active: tab.id === activeTab}"
                        @click="changeTab(tab.id)"
                    >
                        {{tab.text}}
                    </div>
                </div>

                <div style="margin-top: 40px;display:flex;justify-content: center;" v-if="detail">
                    <BasicInfo 
                        v-show="activeTab===1"
                        :detail="detail"
                        :type="type"
                    />

                    <StaffInfo 
                        v-show="activeTab===2"
                        :detail="detail"
                    />
                </div>
            </div>

            <back-button />
            
        </div>
    </div>
</template>

<script>
import { partnerDetail } from '@/api/partner/partner'
import BasicInfo from './component/BasicInfo.vue'
import StaffInfo from './component/StaffInfo.vue'

export default {
    name: 'companyPartnerDetail',

    components: {
        BasicInfo,
        StaffInfo,
    },

    data() {
        return {
            detail: null,
            activeTab: 1,
            type: null,
            tabs: [
                {id: 1, text: '商户信息'},
                {id: 2, text: '员工信息'},
            ],
        }
    },

    mounted() {
        this.type = this.$route.query.type
        let detail = localStorage.getItem('partnerDetailInfo')
        if (detail) {
            detail = JSON.parse(detail)
            if (this.type == 1) {
                this.getDetail(detail.id)
            } else {
                this.detail = {
                    ...detail,
                }
            }
        }
    },

    methods: {
        changeTab(tab) {
            this.activeTab = tab
        },

        getDetail(id) {
            const params = {
                id,
            }

            partnerDetail(params).then(res => {
                if(res.code === 0) {
                    this.detail = res.data
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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