<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>商户管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">商户详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content">
            <div style="width:100%;">
                <div class="tabs">
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
                        :companyId="companyId"
                        :type="type"
                        @update="getCompanyDetail"
                    />

                    <AccountInfo 
                        v-show="activeTab===3"
                        :detail="detail"
                        :type="type"
                    />
                    
                    <QualityInfo 
                        v-show="activeTab===4"
                        :detail="detail"
                        :type="type"
                        @update="getCompanyDetail"
                    />
                </div>
            </div>

            <back-button />
            
        </div>
    </div>
</template>

<script>
import { getCompanyDetail } from '@/api/merchant/merchant'
import { ASSET_COMPANY, COMPANY_TYPE, COMPANY_ROLE } from '@/utils/constant'
import BasicInfo from './components/BasicInfo.vue'
import StaffInfo from './components/StaffInfo.vue'
import AccountInfo from './components/AccountInfo.vue'
import QualityInfo from './components/QualityInfo.vue'

export default {
    name: 'merchantDetail',

    components: {
        BasicInfo,
        StaffInfo,
        AccountInfo,
        QualityInfo,
    },

    data() {
        return {
            ASSET_COMPANY,
            COMPANY_TYPE,
            COMPANY_ROLE,
            type: null,
            companyId: null,
            detail: null,
            activeTab: 1,
            tabs: [
                {id: 1, text: '基本信息'},
                {id: 2, text: '员工信息'},
                {id: 3, text: '收款信息'},
                {id: 4, text: '精品/装潢'},
            ],
        }
    },

    mounted() {
        this.type = this.$route.query.type
        this.companyId = this.$route.query.companyId
        this.getCompanyDetail()
    },

    methods: {
        changeTab(tab) {
            this.activeTab = tab
        },

        getCompanyDetail() {
            const params = {
                companyId: this.companyId,
            }

            getCompanyDetail(params).then(res => {
                if(res.code === 0) {
                    this.detail = {
                        ...res.data.company,
                        ...res.data,
                    }
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