<template>
    <div>
        <div class="create-btn-wrap">
            <create-button 
                text="添加商户"
                @create="addMerchant(1)"
            />
        </div>

        <el-table 
            :data="list"
            style="width: 100%"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
        >
            <el-table-column
                label="企业名称"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.companyName || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="商户名称"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.shopName || '-'}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="行业类型"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.companyType}}-{{scope.row.chooseRole}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="超级管理员信息"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.managerName}}</div>
                    <div>{{scope.row.managerMobile}}</div>
                </template>
            </el-table-column>

            <el-table-column
                v-if="type === 1"
                label="所在城市"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.cityName}}</div>
                </template>
            </el-table-column>

            <el-table-column
                v-if="type === 1"
                label="展示所有车型"
            >
                <template slot-scope="scope">
                    <div>
                        <el-switch
                            v-model="scope.row.showAllBrand"
                            :disabled="scope.row.chooseRoleInt == 2 || scope.row.chooseRoleInt == 3"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#3446AA"
                            @change="(e) => updateCompanyFinancial(e, scope.row)"
                        >
                        </el-switch>
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                label="商户状态"
            >
                <template slot-scope="scope">
                    <div>{{MERCHANT_STATUS[scope.row.contractStatus]}}</div>
                </template>
            </el-table-column>

            <el-table-column
                v-if="type == 1"
                label="签约方式"
            >
                <template slot-scope="scope">
                    <div>{{SIGNTIME_STATUS[scope.row.signTime]}}-{{SIGNTYPE_STATUS[scope.row.signType]}}</div>
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                width="110"
                align="center"
            >
                <template slot-scope="scope">
                    <div class="table-btn" @click="goDetailPage(scope.row)">查看详情</div>
                    <div class="table-btn" @click="addMerchant(2, scope.row)">编辑商户</div>
                    <div class="table-btn" @click="openSignDialog(scope.row)" v-if="type == 1">签约方式</div>
                    <div class="table-btn" @click="del(scope.row)">删除商户</div>
                </template>
            </el-table-column>
        </el-table>

        <SignDialog v-if="showSignDialog" :show.sync="showSignDialog" :detail="detail" @save="saveDialog"/>
    </div>
</template>

<script>
import { COMPANY_TYPE, COMPANY_ROLE, MERCHANT_STATUS, SIGNTIME_STATUS, SIGNTYPE_STATUS } from '@/utils/constant'
import { deleteMerchant, updateCompanyFinancial, updateSignWay } from '@/api/merchant/merchant'
import SignDialog from './SignDialog.vue'

export default {
    components: {
        SignDialog,
    },

    props: {
        list: {
            type: Array,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            COMPANY_TYPE, 
            COMPANY_ROLE,
            MERCHANT_STATUS,
            SIGNTIME_STATUS,
            SIGNTYPE_STATUS,
            showSignDialog: false,
            detail: {},
        }
    },

    mounted() {
        
    },

    methods: {
        // 1.添加 2.编辑
        addMerchant(operator, row={}) {
            this.$router.push({
                path: '/businessManagement/addMerchant',
                query: {
                    type: this.type,
                    operator,
                    companyId: row.id,
                },
            })
        },

        goDetailPage(row) {
            this.$router.push({
                path: '/businessManagement/detail',
                query: {
                    companyId: row.id,
                    type: this.type,
                },
            })
        },

        del(row) {
            this.$confirm(`确定要删除这个商户吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const data = [row.id]

                deleteMerchant(data).then(res => {
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

        updateCompanyFinancial(e, row) {
            console.log('updateCompanyFinancial', e)
            const params = {
                companyId: row.id,
                showAllBrand: e,
            }

            updateCompanyFinancial(params).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('search')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },

        openSignDialog(row) {
            this.detail = row
            this.showSignDialog = true
        },

        saveDialog(data) {
            const params = {
                id: this.detail.id,
                signTime: data.signTime,
                signType: data.signType,
            }

            updateSignWay(params).then(res => {
                if (res.code === 0) {
                    this.$message.success('保存成功')
                    this.$emit('search')
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },
    },
}
</script>

<style lang="less" scoped>
.create-btn-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>