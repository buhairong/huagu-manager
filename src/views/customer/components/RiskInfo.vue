<template>
    <div class="wrap" v-if="detail">
        <RiskQuery 
            :record="detail.personalQuery"
            :customType="1"
            operator="review"
        />

        <template v-if="detail.depositFreeApply">
            <div>
                <div>
                    <div class="title">车辆免押申请</div>
                    <div class="items-wrap">
                        <div class="items-line">
                            <div class="item">
                                <div class="item-title">所在单位名称：</div>
                                <div class="item-content">{{detail.depositFreeApply.companyName || '-'}}</div>
                            </div>
                            <div class="item">
                                <div class="item-title">职业：</div>
                                <div class="item-content">{{OCCUPATION_STATUS[detail.depositFreeApply.careerCode]}}</div>
                            </div>
                        </div>

                        <div class="items-line">
                            <div class="item">
                                <div class="item-title">户籍所在地：</div>
                                <div class="item-content">{{detail.depositFreeApply.issue}}</div>
                            </div>
                            <div class="item">
                                <div class="item-title">免押金申请时间：</div>
                                <div class="item-content">{{detail.depositFreeApply.createdTime || '-'}}</div>
                            </div>
                        </div>

                        <div class="items-line" v-if="detail.guarantorInfo && customType == 1">
                            <div class="item" v-if="detail.depositFreeApply.hasGuarantor == 1">
                                <div class="item-title">免押申请担保人：</div>
                                <div class="item-content">
                                    {{detail.guarantorInfo.name || '-'}}
                                    <span style="padding-left:8px;cursor: pointer;" @click="openGuarantorDialog">
                                        <span style="color:#FFC117;" v-if="detail.guarantorInfo.status === 0">待审核</span>
                                        <span style="color:#3446AA;text-decoration: underline;" v-else>查看信息</span>
                                    </span>
                                    
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-title">职业：</div>
                                <div class="item-content">{{OCCUPATION_STATUS[detail.depositFreeApply.careerCode]}}</div>
                            </div>
                        </div>

                        <div class="items-line">
                            <div class="item">
                                <div class="item-title">所在单位证明：</div>
                                <div class="img-content">
                                    <div class="img-wrap">
                                        <el-image 
                                            style="width: 160px"
                                            :src="detail.depositFreeApply.imageList[0]" 
                                            :preview-src-list="detail.depositFreeApply.imageList"
                                        >
                                        </el-image>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-title">社保记录：</div>
                                <div class="item-content">
                                    <div class="img-wrap">
                                        <el-image 
                                            style="width: 160px"
                                            :src="detail.depositFreeApply.socialSecurityList[0]" 
                                            :preview-src-list="detail.depositFreeApply.socialSecurityList"
                                        >
                                        </el-image>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="items-line">
                            <div class="item">
                                <div class="item-title">用车城市：</div>
                                <div class="item-content">{{detail.depositFreeApply.cityName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
       
    </div>
</template>

<script>
import { selectRiskOrderDetail } from '@/api/risk/userReview'
import { OCCUPATION_STATUS } from '@/utils/constant'
import RiskQuery from '@/views/risk/components/RiskQuery.vue'

export default {
    components: {
        RiskQuery,
    },

    props: {
        userId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            OCCUPATION_STATUS,
            detail: null,
        }
    },

    mounted() {
        this.selectRiskOrderDetail()
    },

    methods: {
        selectRiskOrderDetail() {
            selectRiskOrderDetail({
                userId: this.userId,
                auditRate: 1,
            }).then((res) => {
                if (res.code == 0) {
                    this.detail = res.data
                    this.init()
                }
            })
        },

        init() {
            if (this.detail.personalQuery && this.detail.personalQuery.length) {
                let str = '1'

                let stautsRes = this.detail.personalQuery.some(item => item.stauts == 0)
                if (stautsRes) {
                    str = '4'
                }

                stautsRes = this.detail.personalQuery.some(item => item.stauts == 2)
                if (stautsRes) {
                    str = '5'
                }

                let ruleResultRes = this.detail.personalQuery.some(item => item.ruleResult == 3 || !item.ruleResult)
                if (ruleResultRes) {
                    str = '3'
                }

                ruleResultRes = this.detail.personalQuery.some(item => item.ruleResult == 2)
                if (ruleResultRes) {
                    str = '2'
                }

                this.detail.personalQuery.push({
                    apiName: '查询结果', 
                    queryStatus: str
                })
            }
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    .title {
    margin-left: 100px;
    margin-bottom: 30px;
    height: 26px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.9);
}

.items-wrap {
    margin: 0 100px 40px;
    .items-line {
        margin-bottom: 18px;
        display: flex;
        .item {
            flex: 1;
            display: flex;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            line-height: 28px;
            margin-right: 10px;
            .item-title {
                width: 135px;
                text-align: right;
                color: #86909C;
            }
            .item-content {
                flex: 1;
                margin-left: 8px;
                color: #1D2129;
            }
        }
    }
}

}
</style>