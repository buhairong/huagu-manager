<template>
    <el-dialog
        title=""
        :visible.sync="show"
        width="480px"
        :before-close="handleClose"
    >
        <div class="wrap">
            <template v-if="riskResult !== 7">
                <div class="title">加收保证金</div>
                <div class="form-item deposit-item">
                    <div class="item-title title-start">增加保证金额</div>
                    <div class="deposit-input">
                        <c-input-number
                            :inputValue.sync="formData.deposit"
                            placeholder="请输入金额"
                        ></c-input-number>
                    </div>
                    <div class="item-title">元</div>
                </div>
                <div class="form-item mask-item">
                    <div class="item-title">备注<span style="color:#86909C">（非必填项）</span></div>
                    <c-text-area 
                        :inputValue.sync="formData.mask"
                        :maxLength="50"
                        :rows="3"
                        placeholder="请输入备注~最多可输入50个字"
                    />
                </div>
            </template>

            <div class="title">加收材料</div>
            <div class="tip">请勾选需要用户补交的材料，届时我们将通知用户提前准备</div>
            <el-checkbox-group v-model="selectCertificationList">
                <el-checkbox 
                    style="display:block;margin-bottom:12px;"
                    v-for="item in certificationList"
                    :key="item.id"
                    :label="JSON.stringify({certificationId: item.id, certificationName: item.certificationName})" 
                    name="type"
                >
                    {{item.certificationName}}
                </el-checkbox>
            </el-checkbox-group>
            <div class="btn-group">
                <el-button class="btn" @click="handleClose">取消</el-button>
                <el-button 
                    type="primary" 
                    class="btn save-btn"
                    @click="save"
                >确认</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },

        certificationList: {
            type: Array,
            default: () => []
        },

        riskResult: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            formData: {
                deposit: undefined,
                mask: '',
                material: [],
            },
            selectCertificationList: [],
        }
    },

    mounted() {
        
    },

    methods: {
        handleClose() {
            this.$emit('update:show', false)
        },

        save() {
            if (this.riskResult !== 7) {
                if(!this.formData.deposit && !this.selectCertificationList.length) {
                    this.$message.error('请填写加收保证金或者选择加收材料')
                    return
                }
            } else {
                if(!this.selectCertificationList.length) {
                    this.$message.error('请选择加收材料')
                    return
                }
            }
            


            this.selectCertificationList.forEach(item => {
                const obj = JSON.parse(item)
                this.formData.material.push(obj)
            })

            if (!this.formData.deposit) {
                this.formData.deposit = 0
            }

            this.$emit('comfirm', this.formData)
            this.handleClose()
        },
    }
}
</script>

<style lang="less" scoped>
.title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #3D3D3D;
}

.btn-group {
    margin-top: 50px;
    display: flex;
    justify-content: flex-end;
    .btn {
        width: 91px;
        height: 32px;
        border-radius: 2px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F2F3F5;
        color: #1D2129;
        cursor: default;
    }
    .save-btn {
        margin-left: 8px;
        background: #3446AA;
        color: #FFFFFF;
    }
    .is-disabled {
        background: rgba(52, 70, 170, .6);
    }
}

.title {
    margin-bottom: 14px;
    height: 24px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
}

.form-item {
    .item-title {
        height: 22px;
        line-height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4E5969;
    }
}

.deposit-item {
    display: flex;
    align-items: center;
    .deposit-input {
        margin-left: 30px;
        margin-right: 4px;
    }
}

.mask-item {
    margin-bottom: 25px;
    .item-title {
        margin-top: 15px;
        margin-bottom: 10px;
    }
}

.tip {
    margin-bottom: 13px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 22px;
    color: #4E5969;
}
</style>