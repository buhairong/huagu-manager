<template>
    <div class="wrap">
        <div class="template" v-for="item in list " :key="item.id" @click="changeTemplate(item)">
            <div class="template-name">{{ item.name }}</div>
            <div class="item">IRR：{{ item.periodRate }}%</div>
            <div class="item">首付比例：{{ item.firstPeriodRate }}%</div>
            <div class="item">计算规则：{{ CALCULATOR_RULE_LIST_STATUS[item.calculatorRule] }}</div>
        </div>
    </div>
</template>

<script>
import { listByPage } from "@/api/product/productTemplate"
import { CALCULATOR_RULE_LIST_STATUS, defaultApportionFeeRecordList } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },

        type: {
            type: [String, Number],
            required: true,
        },
    },

    data() {
        return {
            defaultApportionFeeRecordList: defaultApportionFeeRecordList(),
            CALCULATOR_RULE_LIST_STATUS,
            list: [],
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
        this.getTemplateList()
    },

    methods: {
        getTemplateList() {
            let data = {
                page: 1,
                limit: 100,
                newOrOld: this.type,
            }

            listByPage(data).then((res) => {
                if (res.code == 0) {
                    this.list = res.data.records
                }
            })
        },

        changeTemplate(item) {
            this.detail.templateId = item.id
            this.detail.templateName = item.name
            this.detail.name = item.name
            this.detail.periodRate = item.periodRate
            this.detail.firstPeriodRate = item.firstPeriodRate
            this.detail.calculatorRule = item.calculatorRule
            if (this.detail.calculatorRule === 2) {
                this.detail.citySubscribeReq[0].apportionFeeRecordList = this.defaultApportionFeeRecordList
            }
            this.$emit('next')
        },
    },
}
</script>

<style lang="less" scoped>
.wrap {
    margin-top: 130px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .template {
        margin-right: 16px;
        margin-bottom: 16px;
        width: 246px;
        height: 258px;
        border-radius: 8px;
        background: #F0F4FF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .template-name {
            margin-bottom: 30px;
            height: 36px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            line-height: 36px;
            color: #3446AA;
        }
        .item {
            margin-top: 4px;
            height: 28px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            line-height: 28px;
            color: #3446AA;
        }
    }
}
</style>