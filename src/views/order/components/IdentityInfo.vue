<template>
    <div class="wrap">
        <div class="title">认证信息</div>
        <div class="container">
            <div class="identity" v-for="item in detail" :key="item.id">
                <div class="left">
                    <div class="item">
                        <div class="item-title">信息来源: </div>
                        <div class="item-content">{{ IDENTITY_RESOURCE[item.resource] }}</div>
                    </div>
                    <div class="item">
                        <div class="item-title">业务节点: </div>
                        <div class="item-content">{{ IDENTITY_BUSINESS_NODE[item.businessNode] }}</div>
                    </div>
                    <div class="item">
                        <div class="item-title">认证地址: </div>
                        <div class="item-content">{{ item.address || '-' }}</div>
                    </div>
                    <div class="item">
                        <div class="item-title">认证时间: </div>
                        <div class="item-content">{{ item.createTime || '-' }}</div>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <div class="item-title">认证照片: </div>
                        <div class="item-content">
                            <el-image
                                style="width:117px;"
                                :src="item.imageUrl"
                                :preview-src-list="[item.imageUrl]"
                            ></el-image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { IDENTITY_BUSINESS_NODE, IDENTITY_RESOURCE } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Array,
            required: true,
            default: () => [],
        },
    },

    data() {
        return {
            IDENTITY_BUSINESS_NODE,
            IDENTITY_RESOURCE,
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
        .identity {
            padding: 32px 0;
            width: 700px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #D8D8D8;
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
        .identity:last-child {
            border-bottom: none;
        }
    }
}
</style>