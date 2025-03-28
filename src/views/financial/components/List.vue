<template>
    <div>
        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="方案名称"
            >
                <template slot-scope="scope">
                    <div>
                        {{scope.row.schemeName || '-'}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="商户类型"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.merchantTypeList || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="品牌"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.brandList || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="价格"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.priceSection.join('、')}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="动力类型"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.powerTypeList || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="支持订阅周期"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.supportPeriodList || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="适配地区"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.cityList || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="商户应用数"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.merchantUseNum || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="创建时间"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.createTime || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div class="table-btn" @click="edit(scope.row)">修改方案</div>
                    <div class="table-btn" @click="del(scope.row)">删除方案</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { deleteSubscribeFinancialScheme } from '@/api/financial/financial'
import { COMPANY_ROLE, PRICE_SECTION, POWER_TYPE } from '@/utils/constant'

export default {
    props: {
        list: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            COMPANY_ROLE,
            PRICE_SECTION,
            POWER_TYPE,
        }
    },

    mounted() {
        
    },

    methods: {
        // 1.添加 2.编辑
        edit(row) {
            this.$router.push({
                path: '/product/setFinancial',
                query: {
                    id: row.id,
                    operator: 2,
                },
            })
        },

        del(row) {
            this.$confirm(`确定要删除这个方案吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const data = {
                    ids: [row.id]
                }

                deleteSubscribeFinancialScheme(data).then(res => {
                    if (res.code === 0) {
                        this.$message.success('删除成功')
                        this.$emit('search')
                    } else {
                        this.$message.error('删除失败')
                    }
                }).catch(err => {
                    this.$message.error('删除失败')
                })
                
            })
        },
    },
}
</script>

<style lang="less" scoped>

</style>