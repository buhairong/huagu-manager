<template>
    <el-dialog
        :title="`${uploadBrandName}·${uploadCarTypeName}`"
        :visible.sync="showCarTypesDialog"
        width="850px"
        :modal-append-to-body="false"
        :before-close="handleClose"
    >
        <div class="dialog-wrap">
            <div class="title-wrap" v-if="carType === 1">
                <el-checkbox 
                    v-model="checked"
                    @change="changeCheckBox"
                >缺失参数车型</el-checkbox>
            </div>

            <div class="type-year-list">
                <div 
                    v-for="item in productTypeList"
                    :key="item.carTypeYearId"
                    class="type-year-wrap"
                    :class="{active: item.carTypeYearId === currentTypeYearId}"
                    @click="changeCarTypeYear(item.carTypeYearId, item)"
                >
                    <div class="type-year">
                        {{item.carTypeYear}}
                    </div>
                    <div class="active-block" v-if="item.carTypeYearId === currentTypeYearId"></div>
                </div>
            </div>

            <div class="change-status">
                <div class="text">{{currentTypeYear.allProductMasterSwitch ? '关闭车型' : '开放车型'}}</div>
                <el-switch
                    v-model="currentTypeYear.allProductMasterSwitch"
                    :disabled="disabledAllOpenBtn"
                    :active-value="1"
                    :inactive-value="0"
                    @change="(e) => changeYearOpenStatus(e, currentTypeYear.carTypeYearId)"
                >
                </el-switch>
            </div>

            <el-table
                :data="filterProductTypeList"
                max-height="420"
            >
                <el-table-column
                    prop="carTypeYearProduct"
                    label="车型"
                    width="300"
                >
                </el-table-column>
                <el-table-column
                    v-if="carType === 1"
                    label="厂商指导价"
                    width="200"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.guidancePrice">
                            <div v-if="scope.row.guidancePrice >=10000">
                                <span class="price">{{formatTenThousandNumber(scope.row.guidancePrice).slice(0, -1)}}</span>万
                            </div>
                            <div v-else><span class="price">{{scope.row.guidancePrice}}</span>元</div>
                        </div>
                        <div v-else>-</div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="carType === 1"
                    label="参数状态"
                    width="100"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.fullData == 1">完整</div>
                        <div v-else style="color: #FF8F1F">缺失</div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="carType === 1"
                    label="操作"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClickEditBtn(scope.row)" type="text">编辑参数</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="开放车型"
                >
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.open"
                            :disabled="scope.row.fullData == 0 || uploadCarOpenStatus == 0"
                            :active-value="1"
                            :inactive-value="0"
                            @change="(e) => changeOpenStatus(e, scope.row)"
                        />
                    </template>
                </el-table-column>
            </el-table>
            
            <div class="btn-group">
                <div class="btn" @click="handleClose">关闭</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { selectCarTypeYearProductList, openCarTypeYearAndProduct } from '@/api/goods/goods'
import { CAR_TYPES } from '@/utils/constant'
import { formatTenThousandNumber } from '@/utils/numberToCurrency'

export default {
    props: {
        showCarTypesDialog: {
            type: Boolean,
            default: false,
        },

        uploadCarTypeId: {
            type: Number,
            required: true,
        },

        uploadBrandName: {
            type: String,
            required: true,
        },

        uploadCarTypeName: {
            type: String,
            required: true,
        },

        uploadCarOpenStatus: {
            type: Number,
            required: true,
        },

        carType: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            CAR_TYPES,
            checked: true,
            currentTypeYearId: null,
            productTypeList: [],
            filterProductTypeList: [],
            currentTypeYear: {
                carTypeProductList: []
            },
        }
    },

    computed: {
        disabledAllOpenBtn() {
            return this.currentTypeYear.carTypeProductList.every(item => item.fullData == 0) || this.uploadCarOpenStatus == 0
        },
    },

    mounted() {
        this.selectCarTypeYearProductList()
    },

    methods: {
        selectCarTypeYearProductList() {
            let data = {
                carTypeId: this.uploadCarTypeId
            }

            selectCarTypeYearProductList(data).then((res) => {
                if (res.code == 0 && res.data.length) {
                    this.productTypeList = res.data
                    if (this.currentTypeYearId) {
                        this.currentTypeYear = res.data.filter(item => item.carTypeYearId === this.currentTypeYearId)[0]
                    } else {
                        this.currentTypeYearId = res.data[0].carTypeYearId
                        this.currentTypeYear = res.data[0]
                    }
                    
                    this.getFilterProductTypeList()
                }
            })
        },

        getFilterProductTypeList() {
            this.filterProductTypeList = this.productTypeList.filter(item => item.carTypeYearId == this.currentTypeYearId)[0].carTypeProductList
            if (this.checked) {
                this.filterProductTypeList = this.filterProductTypeList.filter(item => item.fullData == 0)
            }
        },

        changeCheckBox(e) {
            this.checked = e
            this.getFilterProductTypeList()
        },

        changeCarTypeYear(carTypeYearId, item) {
            this.currentTypeYear = item
            this.currentTypeYearId = carTypeYearId
            this.getFilterProductTypeList()
        },

        handleClickEditBtn(row) {
            this.$router.push({
                path: '/goods/editProductTypeParams',
                query: {
                    id: row.id,
                },
            })
        },

        formatTenThousandNumber(num) {
            return formatTenThousandNumber(num)
        },

        handleClose() {
            this.$emit('update:showCarTypesDialog', false)
        },

        changeOpenStatus(open, row) {
            let data = {
                open,
                productIds: [row.id],
                yearId: row.carTypeYearId,
            }

            openCarTypeYearAndProduct(data).then((res) => {
                if (res.code == 0) {
                    this.$message.success('设置成功')
                    this.selectCarTypeYearProductList()
                } else {
                    this.$message.error('设置失败')
                }
            }).catch(() => {
                this.$message.error('设置失败')
            })
        },

        changeYearOpenStatus(open, yearId) {
            const productIds = this.currentTypeYear.carTypeProductList.filter(item => item.fullData == 1).map(item => item.id)
            let data = {
                open,
                productIds,
                yearId,
            }

            openCarTypeYearAndProduct(data).then((res) => {
                if (res.code == 0) {
                    this.$message.success('设置成功')
                    this.selectCarTypeYearProductList()
                } else {
                    this.$message.error('设置失败')
                }
            }).catch(() => {
                this.$message.error('设置失败')
            })
        },
    },
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
    margin-top: 20px !important;
}

.dialog-wrap {
    .title-wrap {
        display: flex;
        justify-content: flex-end;
        .title {
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #3D3D3D;
        }
    }
    .type-year-list {
        margin: 30px 0;
        display: flex;
        flex-wrap: wrap;
        .type-year-wrap {
            margin-right: 32px;
            margin-bottom: 16px;
            height: 26px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: default;
            .type-year {
                height: 22px;
                font-family: PingFangSC-Medium;
                font-size: 14px;
                line-height: 22px;
                color: #4E5969;
            }
            .active-block {
                width: 8px;
                height: 2px;
                border-radius: 1px;
                background: #3446AA;
            }
            &.active {
                .type-year {
                    color: #3446AA;
                }
            }
        }
    }

    .change-status {
        display: flex;
        justify-content: flex-end;
        .text {
            padding-right: 10px;
        }
    }

    .price {
        color: #EA0000;
    }

    .btn-group {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        .btn {
            width: 100px;
            height: 40px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #3446AA;
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #FFFFFF;
            cursor: pointer;
        }
    }
}
</style>