<template>
    <el-dialog
        title="判断逻辑"
        :visible.sync="showConditionsJudgeDialog"
        width="1000px"
        :before-close="handleClose"
    >
        <div class="wrap">
            <el-table 
                :data="conditionsJudgeList.ruleConfig"
                border
                style="width: 100%"
                :span-method="arraySpanMethod"
            >
                <el-table-column
                    label="条件名称"
                    width="180"
                    >
                    <template>
                        <div>{{conditionsJudgeList.ruleName}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="条件描述"
                >
                </el-table-column>
                <el-table-column
                    label="判断逻辑"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-select 
                            v-model="scope.row.value" 
                            placeholder="请选择"
                            :disabled="(scope.row.readOnly == 1)"
                        >
                            <el-option
                                v-for="item in LOGIC_TYPE"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>

            <div class="btn-group">
                <div class="btn" @click="handleClose">取消</div>
                <div class="btn save-btn" @click="save">保存</div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { LOGIC_TYPE } from '@/utils/constant'

export default {
    props: {
        showConditionsJudgeDialog: {
            type: Boolean,
            default: false,
        },

        conditionsJudge: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            LOGIC_TYPE,
            conditionsJudgeList: {},
        }
    },

    mounted() {
        this.conditionsJudgeList = JSON.parse(this.conditionsJudge)
    },

    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === 0) {
                    return {
                        rowspan: this.conditionsJudgeList.ruleConfig.length,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },

        handleClose() {
            this.$emit('update:showConditionsJudgeDialog', false)
        },

        save() {
            this.$emit('comfirm', JSON.stringify(this.conditionsJudgeList))
        },
    },
}
</script>

<style lang="less" scoped>
.el-select {
    /deep/ .el-input__inner {
        border: none;
        background: transparent;
    }
}

.btn-group {
    margin-top: 90px;
    display: flex;
    justify-content: center;
    .btn {
        width: 104px;
        height: 40px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #1D2129;
        cursor: default;
    }
    .save-btn {
        margin-left: 24px;
        background: #3446AA;
        color: #FFFFFF;
    }
}
</style>