<template>
    <div class="wrap">
        <div>
            <div class="title">差异化服务</div>

            <div class="container">
                <el-checkbox-group v-model="detail.checkList" class="service-item-list">
                    <el-checkbox
                        class="service-item"
                        v-for="item in detail.SERVICE_LIST"
                        :key="item.id"
                        :label="item.serviceName"
                        v-model="item.isChecked"
                        @change="(e) => handleChange(e, item)"
                    >
                        <div style="width:70px">{{ item.serviceName }}</div>
                        <template v-if="item.requireInputCount">
                            <c-input-number 
                                style="margin: 0 16px"
                                :inputValue.sync="item.size"
                                placeholder="请输入次数"
                                :disabled="!item.isChecked"
                            >
                            </c-input-number> 
                            次
                        </template>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            
        </div>

        <div>
            <div class="title">保障服务</div>
            <div class="container">
                <el-checkbox-group v-model="detail.safeguardServices" class="service-item-list">
                    <el-checkbox
                        v-for="item in SAFE_LIST"
                        :key="item.id"
                        :label="item.id"
                    >  
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>

<script>
import { SAFE_LIST } from '@/utils/constant'

export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            SAFE_LIST,
            checkList1: [],
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
        
    },

    methods: {
        handleChange(e, item) {
            item.isChecked = e
            if (!e) {
                item.size = undefined
            }
        },
    },
}
</script>

<style lang="less" scoped>

.wrap {
    .title {
        margin: 24px 0;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        line-height: 22px;
        color: #1D2129;
    }

    .container {
        padding-left: 80px;
    }
    .service-item-list {
        width: 800px;
        display: flex;
        flex-wrap: wrap;
    }
    .service-item {
        margin-right: 100px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        /deep/ .el-checkbox__label {
            display: flex;
            align-items: center;
        }
    }
    .service-item:nth-child(2n) {
        margin-right: 0
    }
}
</style>