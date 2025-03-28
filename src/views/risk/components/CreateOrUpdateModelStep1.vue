<template>
    <div>
        <div
            class="service"
            v-for="item in createData.rules"
            :key="item.id"
        >
            <div class="title-wrap">
                <div class="title">{{item.apiName}}</div>
                <div class="status-wrap">
                    <div class="text">{{(item.status == 1 ? '停用条件' : '启用条件')}}</div>
                    <el-switch
                        v-model="item.status"
                        :active-value="1"
                        :inactive-value="0"
                    >
                    </el-switch>
                </div>
            </div>

            <div class="condition-wrap">
                <div class="condition-title">条件描述</div>
                <div class="condition-desc">{{item.description}}</div>
            </div>

            <div class="logic-wrap">
                <div class="logic-title">
                    判断逻辑
                    <span class="edit-logic" @click="editLogic(item)">编辑条件</span>
                </div>
                <div class="logic-desc">{{getLogicList(item)}}</div>
            </div>
        </div>

        <div class="btn-group">
            <div class="btn" @click="back">取消</div>
            <div class="btn next-btn" @click="next">下一步</div>
        </div>

        <ConditionsJudgeDialog 
            v-if="showConditionsJudgeDialog"
            :showConditionsJudgeDialog.sync="showConditionsJudgeDialog"
            :conditionsJudge="conditionsJudge"
            @comfirm="comfirm"
        />
    </div>
</template>

<script>
import ConditionsJudgeDialog from '../components/ConditionsJudgeDialog.vue'

export default {
    components: {
        ConditionsJudgeDialog,
    },

    props: {
        createData: {
            type: Object,
            default: () => ({})
        },
    },

    data() {
        return {
            services: [],
            showConditionsJudgeDialog: false,
            conditionsJudge: {},
            conditionsId: null,
        }
    },

    mounted() {
        
    },

    methods: {
        getLogicList(item) {
            let str = ''
            const rule = JSON.parse(item.rule).ruleConfig
            const arr = [
                {name: '准入', rule: []},
                {name: '禁入', rule: []},
                {name: '人工', rule: []},
            ]

            rule.forEach(r => {
                // 1.准入 2.禁入 3.人工
                if (r.value) {
                    arr[r.value-1].rule.push(r.description)
                }
            })

            arr.forEach(s => {
                str += s.name + '：'
                if(s.rule.length) {
                    str += s.rule.join('.')
                } else {
                    str += '-'
                }
                str += '\n'
            })

            return str
        },

        editLogic(item) {
            this.conditionsJudge = item.rule
            this.conditionsId = item.id
            this.showConditionsJudgeDialog = true
        },

        back() {
            this.$router.back()
        },

        next() {
            const res = this.createData.rules.some(item => item.status == 1)
            if (!res) {
                this.$message.error('请至少启用一个条件')
                return
            }

            const data = {
                rules: this.createData.rules
            }

            this.$emit('next', data)
        },

        comfirm(e) {
            this.createData.rules.find(item => item.id === this.conditionsId).rule = e
            this.showConditionsJudgeDialog = false
        },
    },
}
</script>

<style lang="less" scoped>
.service {
    border-bottom: 1px solid #D8D8D8;
    padding: 14px 0;
    .title-wrap {
        height: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #1A1A1A;
        }
        .status-wrap {
            display: flex;
            align-items: center;
            .text {
                margin-right: 10px;
                font-family: SourceHanSansCN-Regular;
                font-size: 14px;
                color: #3D3D3D;
            }
        }
    }
    .condition-wrap {
        margin-top: 16px;
        margin-bottom: 20px;
        .condition-title {
            margin-bottom: 16px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.9);
        }
        .condition-desc {
            line-height: 20px;
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            color: #767676;
        }
    }
    .logic-wrap {
        .logic-title {
            margin-bottom: 16px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.9);
        }
        .edit-logic {
            padding-left: 10px;
            color: #3446AA;
            cursor: pointer;
        }
        .logic-desc {
            white-space: pre-wrap;
            font-family: SourceHanSansCN-Regular;
            font-size: 14px;
            line-height: 30px;
            color: #767676;
        }
    }
}
.btn-group {
    margin-top: 30px;
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
    .next-btn {
        margin-left: 24px;
        background: #3446AA;
        color: #FFFFFF;
    }
}
</style>