<template>
    <div>
        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="车辆型号"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.carBrand}}·{{scope.row.carType}}</div>
                    <div>{{scope.row.carTypeYear}}</div>
                    <div>{{scope.row.carTypeYearProduct}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="实表里程数"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.mileage || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="车架号"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.carVin || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="发动机号"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.carEngineNum || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="车辆增配项"
            >
                <template slot-scope="scope">
                    <div class="config-list">
                        <div class="config-item" v-for="(item, index) in scope.row.otherConfigList" :key="index">
                            {{ item }}
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="所属商户"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.merchantName || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div class="table-btn" @click="edit(scope.row)">
                        {{ scope.row.subscribeId ? '编辑方案' : '创建方案' }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        detail: {
            type: Object,
            required: true,
        },

        list: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            
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
        // 1.添加 2.编辑
        async edit(row) {
            this.detail.carType.carBrand = row.carBrand
            this.detail.carType.carType = row.carType
            this.detail.carType.carTypeYear = row.carTypeYear
            this.detail.carType.carTypeYearProduct = row.carTypeYearProduct
            this.detail.carType.imageUrl = row.imageUrl
            this.detail.carTypeYearProductId = row.carTypeYearProductId
            this.detail.secondHandCarId = row.secondHandCarId

            if (row.subscribeId) {
                this.detail.citySubscribeReq[0].carSubscribeId = row.subscribeId
                this.$parent.$parent.subscribeId = row.subscribeId
                await this.$parent.$parent.selectCarSubscribeDetail()
            }

            this.$emit('next')
        },

        formatThousandNumber(num) {
            if (num || num == 0) {
                return formatThousandNumber(num)
            }
            return '-'
        },
    },
}
</script>

<style lang="less" scoped>

.config-item {
    display: inline-block;
    margin-bottom: 2px;
    padding: 0 16px;
    height: 26px;
    line-height: 26px;
    border-radius: 2px;
    border: 1px solid #E5E6EB;
	color: #1D2129;
    font-size: 12px;
}
</style>