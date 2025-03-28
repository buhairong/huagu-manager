<template>
    <div class="wrap">
        <div class="title">基本信息</div>
        <div class="items-wrap">
            <div class="items-line" v-if="detail.idcard">
                <div class="item">
                    <div class="item-title">客户姓名：</div>
                    <div class="item-content">{{detail.name || '-'}}</div>
                </div>
                <div class="item">
                    <div class="item-title">身份证号：</div>
                    <div class="item-content">{{detail.idcard || '-'}}</div>
                </div>
            </div>

            <div class="items-line">
                <div class="item">
                    <div class="item-title">联系方式：</div>
                    <div class="item-content">{{detail.mobile || '-'}}</div>
                </div>

                <div class="item">
                    <div class="item-title">申请时间：</div>
                    <div class="item-content">{{detail.createdTime || '-'}}</div>
                </div>
            </div>
        </div>
        
        <div class="title">证件照片</div>
        <div class="items-wrap">
            <div class="items-line">
                <div class="certificate-item" v-if="detail.idcard">
                    <div class="item-title">身份证：</div>
                    <div class="img-content">
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.idcardUrl" 
                                    :preview-src-list="[detail.idcardUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">身份证人像面照片</div>
                        </div>
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.idcardBackUrl" 
                                    :preview-src-list="[detail.idcardBackUrl]"
                                >
                                </el-image>
                            </div>
                            <div class="img-title">身份证国徽面照片</div>
                        </div>
                    </div>
                </div>
                <div class="certificate-item">
                    <div class="item-title">所在单位证明：</div>
                    <div class="img-content">
                        <div class="img-wrap">
                            <div class="img-box">
                                <el-image 
                                    style="width: 160px"
                                    :src="detail.imageUrlList[0]" 
                                    :preview-src-list="detail.imageUrlList"
                                >
                                </el-image>
                            </div>
                        </div>
                    </div>
                </div>
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
    height: 26px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.9);
}

.items-wrap {
    margin-bottom: 40px;
    .items-line {
        margin-bottom: 18px;
        display: flex;
        width: 800px;
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



.certificate-item {
    flex: 1;
    margin-left: 60px;
    margin-right: 10px;
    .item-title {
        margin-bottom: 6px;
        height: 23px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        line-height: 23px;
        color: #86909C;
    }
    .img-content {
        display: flex;
    }
    .img-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:first-child {
            margin-right: 32px;
        }
        .img-box {
            margin-bottom: 12px;
            width: 160px;
            height: 100px;
            overflow: hidden;
            .el-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .img-title {
            height: 23px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            line-height: 23px;
            color: #3D3D3D;
        }
    }
}
</style>