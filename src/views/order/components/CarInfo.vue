<template>
    <div class="wrap">
        <div class="title">基础信息</div>
        <CarInfo 
            v-if="detail.carInfoRespVo"
            class="car-info"
            :detail="detail"
        />
        
        <div class="container">
            <template v-if="detail.otherConfigList[0].details && detail.otherConfigList[0].details.length && detail.otherConfigList[0].details.every(item => item.detailName && item.money)">
                <div class="item">
                    <div class="item-title">车辆增配项: </div>
                    <div class="item-content">
                        <div>
                            <div v-for="(item, index) in detail.otherConfigList[0].details" :key="index" style="margin-bottom:8px;">
                                {{ item.detailName }} &nbsp;&nbsp; +￥{{ formatThousandNumber(item.money) }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="item-title">增配总额: </div>
                    <div class="item-content">{{ detail.otherConfigList[0].details && detail.otherConfigList[0].details.length ? `￥${getTotalConfig()}` : '-'}}</div>
                </div>
            </template>

            <div class="create-btn-wrap" v-if="orderStatus == 10 || orderStatus == 1">
                <create-button 
                    text="设置增配项"
                    @create="openSetConfigDialog"
                />
            </div>
        </div>
        
        <div class="title">证照信息</div>
        <div class="container">
            <template v-if="detail.carCertificateImage && detail.carCertificateImage.length">
                <div class="item delivery-car-pics-item" v-for="(item, index) in detail.carCertificateImage" :key="index">
                    <div class="item-title">{{ CAR_CERTIFICATE[item.type] }}: </div>
                    <div class="item-content">
                    <el-image
                            style="width:100px;"
                            :src="item.imageUrl"
                            :preview-src-list="[item.imageUrl]"
                        ></el-image>
                    </div>
                </div>
            </template>
            <div class="no-data" v-else>
                暂未绑定车辆
            </div>
        </div>

        <div class="title">保险信息</div>
        <InsuranceInfo 
            v-if="detail.insuranceList && detail.insuranceList.length"
            class="insurance-info"
            :detail="detail"
        />
        <div class="no-data" v-else>
            暂未绑定车辆
        </div>

        <el-dialog
            title="设置增配项"
            :visible.sync="showSetConfigDialog"
            width="480px"
        >
            <div class="config-item" v-for="(item, index) in detail.otherConfigList[0].details" :key="index">
                <c-input 
                    :inputValue.sync="item.detailName"
                    placeholder="请输入增配项"
                    style="width: 180px;margin-right:20px;"
                />
                <c-input-number 
                    :inputValue.sync="item.money"
                    placeholder="请输入增配项金额"
                    style="width: 140px;margin-right:8px;"
                />
                元
                <span style="margin-left: 20px" @click="del(index)"><i class="el-icon-remove-outline" style="font-size: 18px"></i></span>
            </div>

            <div class="add-wrap" >
                <div class="add" @click="addConfig">
                    <i class="el-icon-circle-plus" style="font-size: 20px;"></i>
                    <div class="tip">更多增配项</div>
                </div>
                
                <div class="add" @click="delAllConfig" v-if="detail.otherConfigList[0].details.some(item => item.detailName || (item.money || item.money === 0))">
                    <i class="el-icon-remove-outline" style="font-size: 20px;"></i>
                    <div class="tip">删除所有增配项</div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <div class="dialog-btn-wrap">
                    <div class="btn" @click="handleCloseSetConfigDialog">取消</div>
                    <div class="btn save-btn" @click="setConfig">确认</div>
                </div>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import CarInfo from '@/views/cars/components/CarInfo.vue'
import InsuranceInfo from '@/views/cars/components/InsuranceInfo.vue'
import { CAR_CERTIFICATE } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'
import { validIntegerNum } from '@/utils/validate'
import { saveOtherConfig } from '@/api/order/orderManagement'

export default {
    components: {
        CarInfo,
        InsuranceInfo,
    },

    props: {
        detail: {
            type: Object,
            required: true,
        },

        orderId: {
            type: [Number, String],
            required: true,
        },

        orderStatus: {
            type: [Number, String],
            required: true,
        },
    },

    data() {
        return {
            CAR_CERTIFICATE,
            showSetConfigDialog: false,
        }
    },

    watch: {
        detail: {
            handler(val) {
                if (!val.otherConfigList[0].details || val.otherConfigList[0].details.length === 0) {
                    this.addConfig()
                }
            },
            deep: true,
            immediate: true,
        },
    },

    mounted() {
        
    },

    methods: {
        updateDetail() {
            this.$emit('update')
        },

        openSetConfigDialog() {
            this.showSetConfigDialog = true
        },

        handleCloseSetConfigDialog() {
            this.showSetConfigDialog = false
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return '-'
        },

        getTotalConfig() {
            const total = this.detail.otherConfigList[0].details.reduce((sum, cur) => {
                return sum + cur.money
            }, 0)

            return this.formatThousandNumber(total)
        },

        addConfig() {
			this.detail.otherConfigList[0].details.push({
				detailName: '',
				hasCheck: 1,
				money: undefined
			})
        },

        del(index) {
            this.$confirm(`确定要删除这个增配项吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detail.otherConfigList[0].details.splice(index, 1)
            })
        },

        delAllConfig() {
            this.$confirm(`确定要删除所有增配项吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detail.otherConfigList[0].details = []
            })
        },

        setConfig() {
            let list = this.detail.otherConfigList[0].details.filter(item => item.detailName || item.money)
            for (const item of list) {
                if (!item.detailName.trim()) {
                    this.$message.error('请输入增配项')
                    return
                }
                if (!item.money) {
                    this.$message.error('请输入增配项金额')
                    return
                }
                if (!validIntegerNum(item.money)) {
                    this.$message.error('请正确输入增配项金额')
                    return
                }
            }

            const data = {
				userCarSubscribeId: this.orderId,
				otherConfigVo: [
					{
						details: list,
						function: ''
					}
				],
			}

            saveOtherConfig(data).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.updateDetail()
                    this.handleCloseSetConfigDialog()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
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
                width: 400px;
                display: flex;
                flex-wrap: wrap;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                line-height: 21px;
                color: #1D2129;
                .img-wrap {
                    width: 102px;
                    height: 142px;
                    margin-right: 22px;
                    margin-bottom: 16px;
                }
            }
        }
        .delivery-car-pics-item {
            width: 100%;
            justify-content: space-between;
            .item-title {
                width: 160px;
            }
        }
    }
}

.create-btn-wrap, .no-data {
    margin-bottom: 20px;
    margin-left: 100px;
}
.no-data {
    height: 30px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    line-height: 30px;
    color: #9F9F9F;
}

.car-info, .insurance-info {
    padding: 0;
}

.insurance-info {
    justify-content: space-around;
}
.config-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
}

.add-wrap {
    margin-top: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .add {
        margin-right: 30px;
        display: flex;
        align-items: center;
    }
    .tip {
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        color: #1D2129;
        padding-left: 8px;
    }
}

</style>