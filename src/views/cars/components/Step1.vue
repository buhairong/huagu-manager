<template>
    <div>
        <div class="item required">
            <div class="item-title">适用车型</div>
            <div class="item-content">
                <div class="sub">
                    <c-select
                        :selectValue.sync="detail.carBrandId"
                        :options="brandList"
                        :showAllValue="false"
                        placeholder="选择品牌"
                        style="margin-right: 20px;"
                        labelKey="brandName"
                        valueKey="id"
                        @change="changeCarBrand"
                    />
                    <c-select
                        :selectValue.sync="detail.carTypeId"
                        :options="typeList"
                        :showAllValue="false"
                        placeholder="选择车系"
                        style="margin-right: 20px;"
                        :selectStyle="{
                            width: '200px'
                        }"
                        labelKey="carType"
                        valueKey="id"
                        @change="changeCarType"
                    />
                    <c-select
                        :selectValue.sync="detail.carTypeYearId"
                        :options="yearList"
                        :showAllValue="false"
                        placeholder="选择年款"
                        style="margin-right: 20px;"
                        labelKey="year"
                        valueKey="id"
                        @change="changeCarTypeYear"
                    />
                    <c-select
                        :selectValue.sync="detail.carTypeYearProductId"
                        :options="productList"
                        :showAllValue="false"
                        placeholder="选择型号"
                        style="margin-right: 20px;"
                        :selectStyle="{
                            width: '220px'
                        }"
                        labelKey="carTypeYearProduct"
                        valueKey="id"
                        @change="changeCarProduct"
                    />
                </div>
            </div>
        </div>

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
import { getCarBrand, getCarType, getCarTypeYear, listByCarTypeYearId, selectByCarTypeId } from '@/api/car/car'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            brandList: [],
            typeList: [],
            yearList: [],
            productList: [],
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
        this.getCarBrand()
        this.detail.otherConfigList[0].details.map(item => {
            ++this.configId
            item.configId = this.configId

            return item
        })
    },

    methods: {
        getCarBrand() {
            getCarBrand().then(res => {
                if(res.code === 0) {
                    this.brandList = res.data
                    this.changeCarBrand(this.detail.carBrandId)
                }
            })
        },

        changeCarBrand(e) {
            this.detail.carBrandId = e
            this.getCarType()
        },

        getCarType() {
            const data = {
                carBrandId: this.detail.carBrandId
            }

            getCarType(data).then(res => {
                if(res.code === 0) {
                    this.typeList = res.data
                    this.changeCarType(this.detail.carTypeId)
                }
            })
        },

        changeCarType(e) {
            this.detail.carTypeId = e
            this.getCarTypeYear()
        },

        getCarTypeYear() {
            const data = {
                carTypeId: this.detail.carTypeId
            }

            getCarTypeYear(data).then(res => {
                if(res.code === 0) {
                    this.yearList = res.data
                    this.changeCarTypeYear(this.detail.carTypeYearId)
                }
            })
        },

        changeCarTypeYear(e) {
            this.detail.carTypeYearId = e
            this.listByCarTypeYearId()
        },

        listByCarTypeYearId() {
            const data = {
                carTypeYearId: this.detail.carTypeYearId
            }

            listByCarTypeYearId(data).then(res => {
                if(res.code === 0) {
                    this.productList = res.data
                    this.changeCarProduct(this.detail.carTypeYearProductId)
                }
            })
        },

        changeCarProduct(e) {
            this.detail.carTypeYearProductId = e
            const product = this.productList.find(item => item.id === e)
            if (product) {
                this.detail.carBrand = product.carBrand
                this.detail.carType = product.carType
                this.detail.carTypeYear = product.carTypeYear
                this.detail.carTypeYearProduct = product.carTypeYearProduct
                this.detail.imageUrl = product.imageUrl
            }
            this.selectByCarTypeId()
        },

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