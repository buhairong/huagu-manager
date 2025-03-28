<template>
    <el-dialog
        :title="`${uploadBrandName}·${uploadCarTypeName}`"
        :visible.sync="showChangeCarTypeDialog"
        width="391px"
        :before-close="handleClose"
    >
        <div class="dialog-wrap">
            <div class="select-item">
                <div class="item-title">车系类型</div>
                <div class="select-wrap">
                    <el-select v-model="curSelectType" placeholder="请选择" multiple clearable>
                        <el-option
                            v-for="item in CAR_TYPES"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="btn-group">
                <div class="btn" @click="handleClose">取消</div>
                <div class="btn save-btn" @click="save">保存</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { setCarSeriesType } from '@/api/goods/goods'
import { CAR_TYPES } from '@/utils/constant'

export default {
    props: {
        showChangeCarTypeDialog: {
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

        seriesTypeList: {
            type: Number | null,
            required: true,
        },
    },

    data() {
        return {
            CAR_TYPES,
            curSelectType: [], // 车系类型 0.新能源车，1.平行进口车，2.国产车
        }
    },

    mounted() {
        this.curSelectType = this.seriesTypeList.map(item => item + '')
    },

    methods: {
        save() {
            if (this.curSelectType.length === 0) {
                this.$message.error('请选择车系类型')
                return
            }

            this.setCarSeriesType()
        },

        setCarSeriesType() {
            let data = {
                id: this.uploadCarTypeId,
                seriesType: this.curSelectType,
            }

            setCarSeriesType(data).then((res) => {
                if (res.code == 0) {
                    this.$emit('changeCarTypeSuccess')
                    this.handleClose()
                    this.$message.success('保存成功')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(() => {
                this.$message.error('保存失败')
            })
        },

        handleClose() {
            this.$emit('update:showChangeCarTypeDialog', false)
        },
    },
}
</script>

<style lang="less" scoped>
.dialog-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    .select-item {
        .item-title {
            padding-right: 22px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #3D3D3D;
        }
        .select-wrap {
            padding-left: 8px;
            height: unset;
            .el-select {
                height: unset;
                /deep/ .el-input {
                    height: unset;
                }
            }
        }
    }
    .btn-group {
        margin-top: 60px;
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