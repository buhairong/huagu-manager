<template>
    <div>
        <el-form ref="step1form" :model="detail" :rules="rules[`rules${type}`]" label-width="140px">
            <el-form-item label="角色选择" prop="chooseRole" v-if="type == 1">
                <el-radio-group v-model="detail.chooseRole">
                    <el-radio 
                        v-for="item in COMPANY_ROLE_LIST"
                        :key="item.value"
                        :label="item.value"
                    >
                        {{ item.label }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="资产持有公司" prop="isFinancial" v-if="type == 1">
                <el-radio-group v-model="detail.isFinancial">
                    <el-radio 
                        v-for="item in ASSET_COMPANY_LIST"
                        :key="item.value"
                        :label="item.value"
                    >
                        {{ item.label }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="所在城市" prop="cityId" v-if="type == 1">
                <c-select
                    :selectValue.sync="detail.cityId"
                    :options="cityList"
                    :showAllValue="false"
                    filterable
                    labelKey="city"
                    valueKey="id"
                    placeholder="选择城市"
                    @change="changeCity"
                />
            </el-form-item>

            <el-form-item class="el-form-item_required" label="销售品牌" prop="carBrandIdList" v-if="type == 1 && detail.chooseRole == 1">
                <c-select
                    :selectValue.sync="detail.carBrandIdList"
                    :options="brandsList"
                    placeholder="选择车辆品牌"
                    filterable
                    multiple
                    :showAllValue="false"
                    labelKey="brandName"
                    valueKey="id"
                    :selectStyle="{
                        width: '300px'
                    }"
                />
                
            </el-form-item>

            <el-form-item label="企业名称" prop="companyName">
                <c-input 
                    :inputValue.sync="detail.companyName"
                    placeholder="请输入企业名称"
                    :inputStyle="{
                        width: '300px'
                    }"
                />
            </el-form-item>

            <el-form-item label="营业执照">
                <el-upload
                    :action="UPLOAD_URL"
                    :show-file-list="false"
                    :accept="IMG_ACCEPT"
                    :before-upload="beforeImgUpload"
                    :on-success="(res, file) => handleSuccess(1, res, file)"
                >
                    <img v-if="detail.businessLicense" :src="detail.businessLicense" class="img">
                    <i v-else class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="统一社会信用代码" prop="corporationTaxNumber">
                <c-input 
                    :inputValue.sync="detail.corporationTaxNumber"
                    placeholder="自动识别营业执照、可修改"
                    :inputStyle="{
                        width: '300px'
                    }"
                />
            </el-form-item>
            
            <el-form-item label="商户名称" prop="shopName">
                <el-autocomplete
                    v-model="detail.shopName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入商户名称"
                    @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="详细地址">
                <div>
                    {{ detail.address ? detail.address : '根据商户名称自动识别详细地址' }}
                </div>
            </el-form-item>

            <el-form-item label="商户联系电话" prop="contactMobile">
                <c-input 
                    :inputValue.sync="detail.contactMobile"
                    placeholder="请输入商户联系电话"
                    :inputStyle="{
                        width: '300px'
                    }"
                />
            </el-form-item>

            <el-form-item label="商户照片" prop="shopHeadPic" v-if="type == 1">
                <div class="upload-wrap">
                    <el-upload
                        :action="UPLOAD_URL"
                        :show-file-list="false"
                        :accept="IMG_ACCEPT"
                        :before-upload="beforeImgUpload"
                        :on-success="(res, file) => handleSuccess(2, res, file)"
                    >
                        <img v-if="detail.shopHeadPic" :src="detail.shopHeadPic" class="img">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload>
                    <div class="upload-tip">门头照片</div>
                </div>
            </el-form-item>


        </el-form>
    </div>
</template>

<script>
import { getAllCity, ocrBusinessLicense } from '@/api/merchant/merchant'
import { getCarBrand } from '@/api/car/car'
import { COMPANY_ROLE_LIST, ASSET_COMPANY_LIST, UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from '@/utils/constant'

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
        var checkBrand = (rule, value, callback) => {
            if (this.type == 1 && this.detail.chooseRole == 1 && !value.length) {
                return callback(new Error('请选择销售品牌'))
            }
            callback()
        }

        return {
            COMPANY_ROLE_LIST,
            ASSET_COMPANY_LIST,
            UPLOAD_URL,
            IMG_ACCEPT,
            cityList: [],
            brandsList: [],
            rules: {
                rules1: {
                    chooseRole: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    isFinancial: [
                        { required: true, message: '请选择是否资产持有公司', trigger: 'change' }
                    ],
                    cityId: [
                        { required: true, message: '请选择所在城市', trigger: 'change' }
                    ],
                    carBrandIdList: [
                        { validator: checkBrand, trigger: 'change' }
                    ],
                    companyName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    corporationTaxNumber: [
                        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                    ],
                    shopName: [
                        { required: true, message: '请输入商户名称', trigger: 'blur' }
                    ],
                    contactMobile: [
                        { required: true, message: '请输入商户联系电话', trigger: 'blur' }
                    ],
                    shopHeadPic: [
                        { required: true, message: '请上传商户照片', trigger: 'blur' }
                    ],
                },
                rules2: {
                    companyName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    corporationTaxNumber: [
                        { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                    ],
                    shopName: [
                        { required: true, message: '请输入商户名称', trigger: 'blur' }
                    ],
                    contactMobile: [
                        { required: true, message: '请输入商户联系电话', trigger: 'blur' }
                    ],
                    shopHeadPic: [
                        { required: true, message: '请上传商户照片', trigger: 'blur' }
                    ],
                },
            },
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
        this.getAllCity()
        this.getBrandList()
    },

    methods: {
        getAllCity() {
            getAllCity().then(res => {
                if(res.code === 0) {
                    this.cityList = res.data
                }
            })
        },

        // 查询品牌列表
        getBrandList() {
            getCarBrand().then((res) => {
                if (res.code == 0) {
                    this.brandsList = res.data
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

        // type: 1.营业执照 2.商户照片
        handleSuccess(type, res, file) {
            if (res.code == 0) {
                if (type === 1) {
                    this.detail.businessLicense = res.data.src
                    this.ocrBusinessLicense(res.data.src)
                } else if (type === 2) {
                    this.detail.shopHeadPic = res.data.src
                }
            }
        },

        ocrBusinessLicense(businessLicense) {
            const params = {
                businessLicense,
            }

            ocrBusinessLicense(params).then(res => {
                if(res.code === 0) {
                    this.detail.corporationTaxNumber = res.data
                }
            })
        },

        querySearchAsync(query, cb) {
            const keyword = query.trim()
            if (keyword) {
                this.$jsonp('https://apis.map.qq.com/ws/place/v1/suggestion', {
                    key: '4ZOBZ-FFK3V-HUJPK-UXDPA-FR7JS-YVFJG',
                    keyword,
                    output: 'jsonp'
                }).then(res => {
                    if (res.status === 0) {
                        const list = res.data.map(item => {
                            item.value = item.title
                            return item
                        })
                        cb(list)
                    }
                })
            }
            
        },

        handleSelect(item) {
            this.detail.address = item.address
            if (item.location) {
                this.detail.lat = item.location.lat
                this.detail.lng = item.location.lng
            }
        },

        changeCity(e) {
            const item = this.cityList.find(item => item.id === e)
            if (item) {
                this.detail.cityName = item.city
            }
        },
       
    },
}
</script>

<style lang="less" scoped>
.upload-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 178px;
    .upload-tip {
        margin-top: 5px;
        height: 18px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 18px;
        color: #4E5969;
    }
}

.el-upload {
    width: 178px;
    height: unset;
    .img {
        width: 178px;
    }
}

.el-autocomplete {
    width: 300px;
    height: 32px;
    /deep/ .el-input__inner {
        border-radius: 2px;
        background: #F2F3F5;
        padding: 0 8px;
        font-family: PingFangSC-Regular;
        box-sizing: border-box;
        border: none;
        font-size: 14px;
        color: #4E5969;
        display: flex;
        align-items: center;
        &::placeholder{
            color: #A4AEBB;
        }
    }
}


</style>