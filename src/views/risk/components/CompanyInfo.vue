<template>
    <div class="wrap">
        <div class="title">企业信息</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="item">
                    <div class="item-title">企业名称：</div>
                    <div class="item-content">{{detail.userCompanyEntity.companyName || '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">企业地址：</div>
                    <div class="item-content">{{detail.userCompanyEntity.address || '-'}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">法定代表人：</div>
                    <div class="item-content">{{detail.userCompanyEntity.contactName || '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">统一社会信用代码：</div>
                    <div class="item-content">{{detail.userCompanyEntity.corporationTaxNumber || '-'}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">成立日期：</div>
                    <div class="item-content">{{detail.userCompanyEntity.establishDate || '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">营业期限：</div>
                    <div class="item-content">{{detail.userCompanyEntity.businessDeadline || '-'}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">营业执照：</div>
                    <div class="item-content">
                        <el-image 
                            style="width: 160px"
                            :src="detail.userCompanyEntity.businessLicense" 
                            :preview-src-list="[detail.userCompanyEntity.businessLicense]">
                        </el-image>
                    </div>
                </div>
                <div class="item"></div>
            </div>
        </div>
    </div>
</template>

<script>
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
        
    },
}
</script>

<style lang="less" scoped>
.wrap {
    margin-bottom: 55px;
}
.title {
    margin-bottom: 30px;
    height: 30px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    line-height: 30px;
    color: #1D2129;
}

.items-wrap {
    margin: 0 100px;
    .items-line {
        margin-bottom: 18px;
        display: flex;
        .item {
            flex: 1;
            display: flex;
            font-family: PingFangSC-Regular;
            font-size: 15px;
            line-height: 23px;
            margin-right: 10px;
            .item-title {
                width: 135px;
                text-align: right;
                color: #86909C;
            }
            .item-content {
                margin-left: 8px;
                color: #1D2129;
            }
        }
    }
}
</style>