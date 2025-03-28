<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
            <el-breadcrumb-item class="subscription-plan">{{type === 'add' ? '添加' : '编辑'}}记录</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content" v-loading="syncLoading" element-loading-text="保存中">
            <div class="top">
                <div class="content-title">{{type === 'add' ? '添加' : '编辑'}}记录</div>

                <div class="container">
                    <div class="item">
                        <div class="item-title">事故日期</div>
                        <div class="item-content">
                            <c-date 
                                :value.sync="detail.accidentDate"
                                placeholder="请选择事故日期"
                            />
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">事故描述</div>
                        <div class="item-content">
                            <c-text-area 
                                :inputValue.sync="detail.accidentDesc"
                                placeholder="请输入事故描述"
                                :showWordLimit="false"
                                :maxLength="1000"
                            />
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">维修项目</div>
                        <div class="item-content">
                            <div style="width:400px;">
                                <div class="config-item" v-for="item in detail.itemList" :key="item.configId">
                                    <span style="margin-right:10px;" @click="delConfig(item.configId)"><i class="el-icon-remove" style="color:rgba(29, 33, 41, 0.6);font-size: 20px;"></i></span>
                                    <c-input 
                                        style="margin-right:8px;"
                                        :inputStyle="{
                                            width:'200px'
                                        }"
                                        :inputValue.sync="item.item"
                                        placeholder="请输入维修项目"
                                    />
                                    <c-input-number 
                                        :inputValue.sync="item.money"
                                        placeholder="请输入维修金额"
                                    >
                                    </c-input-number>
                                    <div class="unit">元</div>
                                </div>

                                <div class="add-config-wrap">
                                    <div class="add-config" @click="addConfig">
                                        <i class="el-icon-circle-plus" style="color:#3446AA;font-size: 20px;margin-right:10px;"></i>
                                        更多维修项目
                                    </div>
                                    <div class="total">共计维修费用 {{ getTotal }} 元</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">事故照片</div>
                        <div class="item-content">
                            <div class="img-wrap">
                                <div class="img" v-for="(img, index) in detail.imageList" :key="index">
                                    <el-image
                                        style="width:100%;height:100%"
                                        :src="img"
                                        fit="cover"
                                    ></el-image>
                                    <div class="del-icon" @click="delImg(index)"><i class="el-icon-error" style="font-size: 20px;"></i></div>
                                </div>
                                <el-upload
                                    multiple
                                    :action="UPLOAD_URL"
                                    :show-file-list="false"
                                    :accept="IMG_ACCEPT"
                                    :before-upload="beforeImgUpload"
                                    :on-success="handleSuccess"
                                >
                                    <div class="upload">
                                        <div><i class="el-icon-plus" style="color:#fff;font-size: 20px;font-weight: 600;"></i></div>
                                        <div class="upload-tip">点击上传事故照片</div>
                                    </div>
                                </el-upload>
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-title">跟进状态</div>
                        <div class="item-content">
                            <c-select
                                :selectValue.sync="detail.status"
                                :options="MAINTENANCE_STATUS"
                                :showAllValue="false"
                                placeholder="请选择跟进状态"
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div class="buttom-btn-group">
                <div class="btn" @click="back">取消</div>
                <div class="btn save-btn" @click="save">保存</div>
            </div>
        </div>
    </div>
</template>

<script>
import { addAccidentRecord, selectAccidentRecordDetail } from '@/api/car/car'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE, MAINTENANCE_STATUS } from '@/utils/constant'

const detailInfo = {
    accidentDate: '',
    accidentDesc: '',
    itemList: [
        {
            configId: 1,
            item: '',
            money: undefined
        }
    ],
    imageList: [],
    status: '',
}

export default {
    name: 'addOrUpdateCar',

    components: {
       
    },

    data() {
        return {
            MAINTENANCE_STATUS,
            type: '',
            carId: null,
            carType: null,
            detail: null,
            syncLoading: false,
            configId: 1,
            UPLOAD_URL,
            IMG_ACCEPT,
        }
    },

    computed: {
        getTotal() {
            return this.detail.itemList.reduce((sum, cur) => sum + (cur.money || 0), 0)
        },
    },

    mounted() {
        this.type = this.$route.query.type

        const carId = this.$route.query.carTypeYearProductId
        const carType = this.$route.query.carType
        
        if (this.type === 'add') {
            this.detail = {
                ...detailInfo,
                carId,
                carType,
            }
        } else {
            this.getDetail(this.$route.query.maintenanceRecordId)
        }

        localStorage.setItem('formMaintenance', true)
    },

    methods: {
        getDetail(maintenanceRecordId) {
            const data = {
                id: maintenanceRecordId,
            }

            selectAccidentRecordDetail(data).then(res => {
                if (res.code === 0) {
                    this.detail = {
                        ...res.data
                    }
                }
            })
        },

        addConfig() {
            const configId = ++this.configId
            this.detail.itemList.push({
                configId,
                item: "",
                money: undefined,
            })
        },

        delConfig(configId) {
            this.$confirm(`确定要删除这个维修项目吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.detail.itemList.findIndex(item => item.configId === configId)
                if (index !== -1) {
                    this.detail.itemList.splice(index, 1)
                }
            })
        },

        beforeImgUpload(file) {
            const size = file.size / 1024 / 1024

            if (size > IMG_LIMIT_SIZE) {
                this.$message.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`)
                return false
            }

            return true
        },

        handleSuccess(res, file) {
            if (res.code == 0) {
                this.detail.imageList.push(res.data.src)
            }
        },

        delImg(index) {
            this.$confirm(`确定要删除这张图片吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.detail.imageList.splice(index, 1)
            })
        },

        back() {
            this.$router.back()
        },

        save() {
            if(!this.detail.accidentDate) {
                this.$message.error('请选择事故日期')
                return
            } 

            if(!this.detail.accidentDesc.trim()) {
                this.$message.error('请输入事故描述')
                return
            } 

            this.detail.itemList = this.detail.itemList.filter(item => item.item || item.money || item.money === 0)

            if(this.detail.itemList.length === 0) {
                this.$message.error('请添加维修项目')
                return
            }

            for(const item of this.detail.itemList) {
                if(!item.item.trim()) {
                    this.$message.error('请输入维修项目')
                    return
                }

                if(!item.money && item.money != 0) {
                    this.$message.error('请输入维修金额')
                    return
                }
            }

            if(this.detail.imageList.length === 0) {
                this.$message.error('请上传事故照片')
                return
            }

            if(!this.detail.status) {
                this.$message.error('请选择跟进状态')
                return
            }

            this.detail.maintainTotalMoney = this.getTotal

            addAccidentRecord(this.detail).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
        },
    },
}
</script>

<style lang="less" scoped>
.content {
    height: unset;
    min-height: calc(100vh - 142px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .top {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        padding: 0 100px;
        .item {
            margin-bottom: 16px;
            display: flex;
            .item-title {
                margin-right: 16px;
                height: 32px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                line-height: 32px;
                color: #4E5969;
                text-align: right;
            }

            .item-content {
                flex: 1;
            }

            .img-wrap {
                display: flex;
                flex-wrap: wrap;
            }

            .img {
                margin-right: 8px;
                margin-bottom: 16px;
                width: 168px;
                height: 105px;
                position: relative;
                .del-icon {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                }
            }

            ::v-deep .el-upload {
                border: none;
                width: 168px;
                height: 105px;
            }

            .upload {
                width: 100%;
                height: 100%;
                background-color: rgba(10, 15, 45, .7);
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .upload-tip {
                    margin-top: 12px;
                    font-family: PingFang SC;
                    font-size: 10px;
                    color: #FFFFFF;
                }
            }

            .config-item {
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                .unit {
                    height: 32px;
                    font-family: HarmonyOS_Sans_SC;
                    font-size: 14px;
                    line-height: 32px;
                    color: #3D3D3D;
                    background: #F2F3F5;
                    padding-right:8px;
                }
            }

            .add-config-wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .add-config {
                font-family: HarmonyOS_Sans_SC;
                font-size: 14px;
                color: #1D2129;
                display: flex;
                align-items: center;
                cursor: pointer;
            }

            .total {
                color: #7B7A7A;
                font-size: 14px;
            }
        }
    }
}
</style>