<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>车型管理</el-breadcrumb-item>
        <el-breadcrumb-item class="subscription-plan">编辑参数</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page-wrap">
        <div class="header">
            <div class="img-wrap">
                <img class="car-img" :src="detail.imageUrl">
            </div>
            <span class="car-brand">
                {{detail.carBrand}}·{{detail.carType}} {{detail.carTypeYear}} {{detail.carTypeYearProduct}}
            </span>
        </div>
        <div class="car-detail">
            <div class="left">
                <div class="item">
                    <div class="item-title">品牌: </div>
                    <div class="item-content">{{detail.carBrand}}</div>
                </div>
                <div class="item">
                    <div class="item-title">能源: </div>
                    <div class="item-content">
                        <div class="select-wrap">
                            <el-select v-model="detail.powerMode" placeholder="请选择" clearable>
                                <el-option
                                    v-for="item in carTypeCondition.powerMode"
                                    :key="item.tagValue"
                                    :label="item.tagName"
                                    :value="item.tagValue"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">结构: </div>
                    <div class="item-content">
                        <div class="select-wrap">
                            <el-select v-model="detail.structure" placeholder="请选择" clearable>
                                <el-option
                                    v-for="item in carTypeCondition.structure"
                                    :key="item.tagValue"
                                    :label="item.tagName"
                                    :value="item.tagValue"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">马力: </div>
                    <div class="item-content">
                        <el-input-number 
                            v-model="detail.horsepower" 
                            :precision="0"
                            :min="0"
                            :controls="false"
                            placeholder="请输入"
                        ></el-input-number>
                        <span class="unit">匹</span>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="item">
                    <div class="item-title">MSRP: </div>
                    <div class="item-content">
                        <el-input-number 
                            v-model="detail.guidancePrice" 
                            :precision="0"
                            :min="0"
                            :controls="false"
                            placeholder="请输入"
                        ></el-input-number>
                        <span class="unit">元</span>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">车型: </div>
                    <div class="item-content">
                        <div class="select-wrap">
                            <el-select v-model="detail.mold" placeholder="请选择" clearable>
                                <el-option
                                    v-for="item in carTypeCondition.mold"
                                    :key="item.tagValue"
                                    :label="item.tagName"
                                    :value="item.tagValue+''"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">驱动: </div>
                    <div class="item-content">
                        <div class="select-wrap">
                            <el-select v-model="detail.drive" placeholder="请选择" clearable>
                                <el-option
                                    v-for="item in carTypeCondition.drive"
                                    :key="item.tagValue"
                                    :label="item.tagName"
                                    :value="item.tagValue"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="item-title">排量: </div>
                    <div class="item-content">
                        <el-input-number 
                            v-model="detail.discharge" 
                            :precision="1"
                            :min="0"
                            :max="99"
                            :controls="false"
                            placeholder="请输入"
                            style="width:50px"
                        ></el-input-number>
                        <span class="unit">T | L | Kw</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="color-wrap">
            <div class="title">外观颜色</div>
            <div class="colors">
                <div 
                    class="color"
                    v-for="item in detail.outColorList"
                    :key="item.colorNum"
                >
                    <div class="color-num" :style="{backgroundColor: item.colorNum}"></div>
                    <el-input 
                        v-model="item.colorName" 
                        placeholder="请输入颜色名称"
                        :maxlength="10"
                    ></el-input>
                    <span @click="removeColor(item.colorNum)"><i class="el-icon-remove-outline"></i></span>
                </div>
                <div class="add-color">
                    <el-color-picker
                        v-model="newColor"
                        :predefine="predefineColors"
                        @change="addNewColor"
                    >
                    </el-color-picker>
                    <div class="add-tip">添加外观颜色</div>
                </div>
            </div>

            <div class="title">内饰颜色</div>
            <div class="colors">
                <div 
                    class="color"
                    v-for="item in detail.inColorList"
                    :key="item.colorNum"
                >
                    <div class="color-num" :style="{backgroundColor: item.colorNum}"></div>
                    <el-input 
                        v-model="item.colorName" 
                        placeholder="请输入颜色名称"
                        :maxlength="10"
                    ></el-input>
                    <span @click="removeInnerColor(item.colorNum)"><i class="el-icon-remove-outline"></i></span>
                </div>
                <div class="add-color">
                    <el-color-picker
                        v-model="newInnerColor"
                        :predefine="predefineColors"
                        @change="addNewInnerColor"
                    >
                    </el-color-picker>
                    <div class="add-tip">添加内饰颜色</div>
                </div>
            </div>
        </div>
        <div class="btn-group">
            <div class="btn" @click="handleBack">返回</div>
            <div class="btn save-btn" @click="save">保存参数</div>
        </div>
    </div>
  </div>
</template>

<script>
import { getCarTypeCondition, selectCarTypeYearProduct, updateCarTypeYearProduct } from '@/api/goods/goods'

export default {
    data() {
        return {
            id: null,
            detail: {},
            carTypeCondition: {},
            predefineColors: [
                '#FA5151',
                '#FF8F1F',
                '#FFC300',
                '#00B578',
                '#07B9B9',
                '#3662EC',
                '#8A38F5',
                '#000000',
                '#FFFFFF',
                '#D8D8D8',
            ],
            newColor: '',
            newInnerColor: '',
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        init() {
            this.id = this.$route.query.id
            this.getCarTypeCondition()
            this.selectCarTypeYearProduct()
        },

        getCarTypeCondition() {
            getCarTypeCondition().then((res) => {
                if (res.code == 0) {
                    this.carTypeCondition = res.data
                }
            })
        },

        selectCarTypeYearProduct() {
            let data = {
                carTypeYearProductId: this.id
            }

            selectCarTypeYearProduct(data).then((res) => {
                if (res.code == 0) {
                    if (!res.data.horsepower && res.data.horsepower != 0) {
                        res.data.horsepower = undefined
                    }

                    if (!res.data.discharge && res.data.discharge != 0) {
                        res.data.discharge = undefined
                    }

                    if (!res.data.guidancePrice && res.data.guidancePrice != 0) {
                        res.data.guidancePrice = undefined
                    }
                    
                    this.detail = {
                        id: this.id,
                        ...res.data,
                    }
                }
            })
        },

        removeColor(colorNum) {
            const index = this.detail.outColorList.findIndex(item => item.colorNum === colorNum)
            this.$confirm('确定要删除这个外观颜色吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detail.outColorList.splice(index, 1)
            })
        },

        removeInnerColor(colorNum) {
            const index = this.detail.inColorList.findIndex(item => item.colorNum === colorNum)
            this.$confirm('确定要删除这个内饰颜色吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detail.inColorList.splice(index, 1)
            })
        },

        addNewColor(e) {
            if (e) {
                this.detail.outColorList.push({
                    colorNum: e,
                    colorName: '',
                })
                this.newColor = ''
            }
        },

        addNewInnerColor(e) {
            if (e) {
                this.detail.inColorList.push({
                    colorNum: e,
                    colorName: '',
                })
                this.newInnerColor = ''
            }
        },

        validate() {
            if (!this.detail.powerMode) {
                this.$message.error('请选择能源')
                return false
            }

            if (!this.detail.structure) {
                this.$message.error('请选择结构')
                return false
            }

            if (!this.detail.horsepower && this.detail.horsepower != 0) {
                this.$message.error('请填写马力')
                return false
            }

            if (!this.detail.guidancePrice && this.detail.guidancePrice != 0) {
                this.$message.error('请填写价格')
                return false
            }

            if (!this.detail.mold) {
                this.$message.error('请选择车型')
                return false
            }

            if (!this.detail.drive) {
                this.$message.error('请选择驱动')
                return false
            }

            if (!this.detail.discharge && this.detail.discharge != 0) {
                this.$message.error('请填写排量')
                return false
            }

            if (this.detail.outColorList.length === 0) {
                this.$message.error('请添加外观颜色')
                return false
            }

            if (this.detail.inColorList.length === 0) {
                this.$message.error('请添加内饰颜色')
                return false
            }

            for(const item of this.detail.outColorList) {
                if(!item.colorName.trim()) {
                    this.$message.error('请填写外观颜色名称')
                    return false
                }
            }

            for(const item of this.detail.inColorList) {
                if(!item.colorName.trim()) {
                    this.$message.error('请填写外观颜色名称')
                    return false
                }
            }

            return true
        },

        save() {
            if(!this.validate()) {
                return
            }

            updateCarTypeYearProduct(this.detail).then((res) => {
                if (res.code == 0) {
                    this.$message.success('保存成功')
                    this.init()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(() => {
                this.$message.error('保存失败')
            })
        },

        handleBack() {
            this.$router.back()
        },
    },
}
</script>

<style lang="less" scoped>
.page-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 98px;
    padding-right: 98px;
    .header {
        display: flex;
        align-items: center;
        .img-wrap {
            width: 134px;
            max-height: 100px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            .car-img {
                max-width: 100%;
            }
        }
        .car-brand {
            padding-left: 24px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            line-height: 24px;
            color: #1D2129;
        }
    }
    .car-detail {
        margin-top: 19px;
        display: flex;
        .right {
            padding-left: 105px;
        }
        .item {
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            .item-title {
                margin-right: 10px;
                width: 48px;
                text-align: right;
                height: 21px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                line-height: 21px;
                color: #86909C;
            }
            .item-content {
                width: 145px;
                height: 31px;
                border-radius: 2px;
                display: flex;
                align-items: center;
                padding-left: 8px;
                background: #F2F3F5;
                box-sizing: border-box;
                .unit {
                    height: 31px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 31px;
                    color: #3D3D3D;
                    padding: 0 10px;
                }
            }
        }
    }
    .line {
        width: 100%;
        height: 0px;
        border-top: 1px solid #D8D8D8;
        margin-top: 19px;
    }
    .color-wrap {
        width: 100%;
        .title {
            margin-top: 30px;
            height: 21px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            line-height: 21px;
            color: #3D3D3D;
        }
        .colors {
            margin-top: 24px;
            padding: 0 64px;
            display: flex;
            flex-wrap: wrap;
            .color {
                margin-right: 21px;
                margin-bottom: 14px;
                display: flex;
                align-items: center;
                .color-num {
                    border: 1px solid #F2F3F5;
                    min-width: 32px;
                    height: 32px;
                }
                .el-input {
                    margin: 0 10px;
                    /deep/ .el-input__inner {
                        width: 134px;
                        height: 32px;
                        border-radius: 2px;
                        background: #F2F3F5;
                        border: none;
                    }
                    
                }
                .el-icon-remove-outline {
                    font-size: 18px;
                    color: #86909C;
                }
            }
            .add-color {
                display: flex;
                width: 225px;
                cursor: default;
                .el-color-picker {
                    width: 32px;
                    height: 32px;
                    background: #DCDCDC;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #8A8888;
                    border: none;
                    /deep/ .el-color-picker__trigger {
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        border: none;
                        .el-icon-close {
                            font-size: 14px;
                            color: #8A8888;
                        }
                        .el-icon-close:before {
                            content: '\e6d9';
                        }
                    }
                }
                .add-tip {
                    padding-left: 10px;
                    height: 32px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    line-height: 32px;
                    color: #706F6F;
                }
            }
        }
    }
    .btn-group {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        .btn {
            width: 100px;
            height: 40px;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #F2F3F5;
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #1D2129;
            cursor: pointer;
        }
        .save-btn {
            margin-left: 30px;
            background: #3446AA;
            color: #FFFFFF;
        }
    }
}
</style>