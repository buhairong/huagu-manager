<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>风控管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户信审</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">风控模型</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="title">筛选</div>
            <div class="search-wrap">
                <div class="search-line">
                    <div class="search-item">
                        <div class="label">模型名称</div>
                        <c-input 
                            :inputValue.sync="search.name"
                            placeholder="请输入模型名称"
                            :inputStyle="{width: '208px'}"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label">免押金认证职业</div>
                        <c-select
                            :selectValue.sync="search.applyCareer"
                            :options="OCCUPATION"
                        />
                    </div>

                    <search-button class="search-btn" @search="searchList"/>
                </div>

                <div class="search-line search-line2">
                    <div class="search-item">
                        <div class="label">模型状态</div>
                        <c-select
                        :selectValue.sync="search.status"
                        :options="MODEL_TYPE"
                        />
                    </div>

                    <div class="search-item">
                        <div class="label label2">创建时间</div>
                        <date-range-select
                        :value.sync="dateRange"
                        :style="{width: '250px'}"
                        @select="handlerSelectDate"
                        />
                    </div>
                    
                    <reset-button class="search-btn" @reset="reset"/>
                </div>
            </div>

            <div class="create-btn-warp">
                <el-dropdown trigger="click" @command="handleCommand">
                    <create-button 
                        text="创建模型"
                    />
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="item in CUSTOM_TYPE"
                            :key="item.value"
                            :command="item.value"
                        >
                            {{item.label}}模型
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

            <el-table 
                :data="list"
                style="width: 100%"
                :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
            >
                <el-table-column
                    prop="name"
                    label="模型名称"
                >  
                </el-table-column>
                
                <el-table-column
                    label="查询条件"
                >
                    <template slot-scope="scope">
                        <el-tooltip v-if="scope.row.ruleNames" class="item" effect="dark" :content="scope.row.ruleNames" placement="bottom-start">
                            <div class="show-one-line" v-for="(item, index) in scope.row.ruleNames" :key="index">
                                {{item}}
                            </div>
                        </el-tooltip>
                        <div v-else>-</div>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="适用职业"
                >
                    <template slot-scope="scope">
                        <div v-if="(scope.row.applyCareer && scope.row.applyCareer[0] == '-1')">
                            全部
                        </div>
                        <div v-else-if="(scope.row.applyCareer && scope.row.applyCareer.length)">
                            <div class="show-one-line" v-for="item in scope.row.applyCareer" :key="item.id">
                                {{OCCUPATION_STATUS[item]}}
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="适用用户"
                >
                    <template slot-scope="scope">
                        {{CUSTOM_TYPE_STATUS[scope.row.typeCode]}}
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="复审资方"
                >
                    <template slot-scope="scope">
                        <div v-if="(scope.row.companys && scope.row.companys.length)">
                            <div class="show-one-line" v-for="item in scope.row.companys" :key="item.id">
                                {{item.companyName}}
                            </div>
                        </div>
                        <div v-if="(scope.row.applyCapital && scope.row.applyCapital[0] == '-1')">
                            全部
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="createdTime"
                    label="模型创建时间"
                >  
                </el-table-column>
               
                <el-table-column
                    label="状态"
                >
                    <template slot-scope="scope">
                        {{MODEL_TYPE_STATUS[scope.row.status]}}
                    </template>
                </el-table-column>

                <el-table-column
                    label="操作"
                    width="110"
                    align="center"
                >
                    <template slot-scope="scope">
                        <div><el-button class="table-btn" type="text" @click="changeStatus(scope.row)">{{(scope.row.status == 1 ? '停用' : '启用')}}</el-button></div>
                        <div><el-button class="table-btn" type="text" @click="editModel(scope.row)">编辑</el-button></div>
                        <div><el-button class="table-btn" type="text" @click="delModel(scope.row)">删除</el-button></div>
                    </template>
                </el-table-column>
            </el-table>

            <pagination 
                :total="total"
                @handleCurrentChange="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script>
import { getModels, deleteModel, openOrCloseModel } from '@/api/risk/userReview'
import { MODEL_TYPE, MODEL_TYPE_STATUS, OCCUPATION, OCCUPATION_STATUS, CUSTOM_TYPE, CUSTOM_TYPE_STATUS } from '@/utils/constant'

export default {
    name: 'Model',
    components: {

    },
    data() {
        return {
            CUSTOM_TYPE,
            CUSTOM_TYPE_STATUS,
            MODEL_TYPE,
            MODEL_TYPE_STATUS,
            OCCUPATION,
            OCCUPATION_STATUS,
            search: {
                name: '',       // 模型名称
                applyCareer: '',    // 免押金认证职业
                status: '',          // 模型状态
                minCreateTime: '', // 创建日期开始时间
                maxCreateTime: '', // 创建日期结束时间
                limit: 10,
                page: 1,
            },
            dateRange: [],
            list: [],
            total: 0,
        }
    },

    mounted() {
        this.getModels()
    },

    methods: {
        getModels() {
            getModels(this.search).then((res) => {
                if (res.code == 0) {
                    this.list = res.data.records
                    this.total = res.data.total
                }
            })
        },

        searchList() {
            this.search.page = 1
            this.getModels()
        },

        reset() {
            this.search.name = ''
            this.search.applyCareer = ''
            this.search.status = ''
            this.search.minCreateTime = ''
            this.search.maxCreateTime = ''
            this.searchList()
        },

        handlerSelectDate(data) {
            this.search.minCreateTime = data[0] || ''
            this.search.maxCreateTime = data[1] || ''
            this.dateRange = data || []
        },

        handleCommand(e) {
            this.$router.push({
                path: '/risk/UserReview/model/createOrUpdateModel',
                query: {
                    customType: e
                }
            })
        },

        handleCurrentChange(e) {
            this.search.page = e
            this.getModels()
        },

        changeStatus(row) {
            let res = row.status == 1 ? '停用' : '启用'
            
            this.$confirm(`确定要${res} ${row.type}订阅风控模型 吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                openOrCloseModel({
                    id: row.id,
                    status: row.status == 1 ? 0 : 1
                }).then(res => {
                    if (res.code == 0) {
                        this.$message.success('保存成功')
                        this.getModels()
                    } else {
                        this.$message.error('保存失败')
                    }
                }).catch(err => {
                    this.$message.error('保存失败')
                })
            })
        },

        editModel(row) {
            this.$router.push({
                path: '/risk/UserReview/model/createOrUpdateModel',
                query: {
                    modelId: row.id,
                    customType: row.typeCode
                }
            })
        },

        delModel(row) {
            this.$confirm(`确定要删除 ${row.type}订阅风控模型 吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteModel({id: row.id}).then(res => {
                    if (res.code == 0) {
                        this.$message.success('删除成功')
                        this.getModels()
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
.title {
    height: 28px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    line-height: 28px;
    color: #1D2129;
    margin-bottom: 23px;
}

.search-line {
    display: flex;
    align-items: center;
    .search-item {
        display: flex;
        align-items: center;
        margin-right: 24px;
        .label {
            height: 22px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 22px;
            color: #4E5969;
            margin-right: 16px;
        }
    }
    .search-btn {
        margin-left: 12px;
    }
}
.search-line2 {
    margin-top: 30px;
}

.create-btn-warp {
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
}

.rule-name {
    white-space: pre-wrap;
}

.show-one-line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>