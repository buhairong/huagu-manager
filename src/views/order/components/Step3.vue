<template>
    <div>
        <div class="item">
            <div class="item-title" style="padding-left:12px;">外观颜色</div>
            <div class="item-content" style="width:0;flex: 1;">
                <el-radio-group v-model="detail.carColor">
                    <el-radio 
                        v-for="(item, index) in colorList"
                        :key="index"
                        :label="item.colorName"
                    >
                        {{ item.colorName }}
                    </el-radio>
                </el-radio-group>
            </div>
        </div>

        <div class="item">
            <div class="item-title">车辆增配项</div>
            <div class="item-content">
                <div class="config-item" v-for="item in detail.otherConfigList[0].details" :key="item.configId">
                    <span style="margin-right:10px;" @click="delConfig(item.configId)"><i class="el-icon-remove" style="color:rgba(29, 33, 41, 0.6);font-size: 20px;"></i></span>
                    <c-input 
                        style="margin-right:8px;"
                        :inputStyle="{
                            width:'200px'
                        }"
                        :inputValue.sync="item.detailName"
                        placeholder="请输入增配项"
                    />
                    <c-input-number 
                        :inputValue.sync="item.money"
                        placeholder="请输入金额"
                    >
                    </c-input-number>
                    <div class="unit">元</div>
                </div>

                <div class="add-config" @click="addConfig">
                    <i class="el-icon-circle-plus" style="color:#3446AA;font-size: 20px;margin-right:10px;"></i>
                    更多增配项
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { selectByCarTypeId } from '@/api/car/car'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            colorList: [],
            configId: 1,
        }
    },

    watch: {
        detail: {
            handler(val) {
                this.$emit('change', val)
            },
            immediate: true,
            deep: true
        }
    },

    mounted() {
        this.selectByCarTypeId()
        this.detail.otherConfigList[0].details.map(item => {
            ++this.configId
            item.configId = this.configId

            return item
        })
    },

    methods: {
        selectByCarTypeId() {
            const data = {
                id: this.detail.carTypeYearProductId
            }

            selectByCarTypeId(data).then(res => {
                if(res.code === 0) {
                    this.colorList = res.data.outColors
                    if (!this.detail.carColor) {
                        this.detail.carColor = this.colorList[0].colorName
                    }
                }
            })
        },

        addConfig() {
            const configId = ++this.configId
            this.detail.otherConfigList[0].details.push({
                configId,
                detailName: "",
                money: undefined,
                hasCheck: 1
            })
        },

        delConfig(configId) {
            this.$confirm(`确定要删除这个增配项吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.detail.otherConfigList[0].details.findIndex(item => item.configId === configId)
                if (index !== -1) {
                    this.detail.otherConfigList[0].details.splice(index, 1)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.item {
    margin-top: 16px;
    display:flex;
    .item-title {
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 32px;
        color: #4E5969;
        margin-right: 16px;
    }

    .sub {
        display: flex;
    }

    .config-item {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        .unit {
            height: 32px;
            font-family: HarmonyOS_Sans_SC;
            font-size: 14px;
            line-height: 32px;
            color: #3D3D3D;
            background: #F2F3F5;
            padding-right:8px;
        }
    }

    .add-config {
        font-family: HarmonyOS_Sans_SC;
        font-size: 14px;
        color: #1D2129;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
}

::v-deep .el-radio{
    height: 32px;
    line-height: 32px;
}
</style>