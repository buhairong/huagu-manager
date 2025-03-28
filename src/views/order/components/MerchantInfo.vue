<template>
    <div class="wrap">
        <div class="title">基本信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">企业名称: </div>
                    <div class="item-content">{{ detail.companyName || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">商户名称: </div>
                    <div class="item-content">{{ detail.shopName || '-' }}</div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">所属行业: </div>
                    <div class="item-content">{{ COMPANY_TYPE[detail.companyType] || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">商户角色: </div>
                    <div class="item-content">{{ COMPANY_ROLE[detail.chooseRole] || '-' }}</div>
                </div>
            </div>
        </div>

        <div class="title">详细信息</div>
        <div class="container">
            <div class="left">
                <div class="item">
                    <div class="item-title">联系人: </div>
                    <div class="item-content">{{ detail.contactName || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">社会统一信用代码: </div>
                    <div class="item-content">{{ detail.corporationTaxNumber || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">银行账号: </div>
                    <div class="item-content">{{ detail.bankAccountId || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">营业执照: </div>
                    <div class="item-content">
                        <el-image
                            style="width:146px;"
                            :src="detail.businessLicense"
                            :preview-src-list="[detail.businessLicense]"
                        ></el-image>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">联系方式: </div>
                    <div class="item-content">{{ detail.contactMobile || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">入驻日期: </div>
                    <div class="item-content">{{ detail.createdTime || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">详细地址: </div>
                    <div class="item-content">{{ detail.address || '-' }}</div>
                </div>
                <div class="item">
                    <div class="item-title">门店照片: </div>
                    <div class="item-content">
                        <el-image
                            style="width:146px;"
                            :src="detail.shopHeadPic"
                            :preview-src-list="[detail.shopHeadPic]"
                        ></el-image>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="introduce">{{ detail.introduce }}</div>
        </div>
    </div>
</template>

<script>
import { COMPANY_ROLE, COMPANY_TYPE } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            COMPANY_ROLE,
            COMPANY_TYPE,
        }
    },

    mounted() {
        
    },

    methods: {
        
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
        padding-left: 50px;
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
                width: 130px;
                text-align: right;
            }
            .item-content {
                width: 0;
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #1D2129;
            }
        }
    }

    .introduce {
        padding-left: 138px;
        width: 600px;
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        line-height: 21px;
        color: #3D3D3D;
    }
}
</style>