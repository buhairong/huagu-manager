<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>系统配置</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >限牌城市</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content">
      <div class="title">限牌城市牌照设置</div>
      <div class="container">
        <div class="container-title">用户自备牌照需补交材料</div>
        <div class="certification-list">
          <template v-if="isEdit">
            <div
              class="certification"
              v-for="item in certificationList"
              :key="item.certificationId"
            >
              <el-checkbox
                size="medium"
                v-model="item.isChecked"
                :label="item.certificationName"
              ></el-checkbox>
            </div>
          </template>
          <template v-else-if="certificationList.filter(item => item.isChecked).length">
            <div
              class="certification"
              v-for="item in certificationList.filter(item => item.isChecked)"
              :key="item.certificationId"
            >
              {{ item.certificationName }}
            </div>
          </template>
          <div v-else>暂无设置</div>
        </div>
        <div class="plate">
          <div class="container-title">牌照费用</div>
          <div class="plate-content">
            <div class="tip">
              *价格为空时，系统将默认为您在当前城市不提供该类牌照租用服务
            </div>
            <div class="city-list">
              <div class="city" v-for="city in cityList" :key="city.cityId">
                <el-checkbox
                  v-if="isEdit"
                  size="medium"
                  v-model="city.isChecked"
                  :label="city.cityName"
                  @change="changeCheckItem($event, city)"
                ></el-checkbox>
                <div v-else>{{ city.cityName }}</div>
                <div class="input-group">
                  <div
                    class="input-item"
                    v-for="item in city.typeAndPriceList"
                    :key="item.type"
                  >
                    <div class="label">{{ item.label }}</div>
                    <c-input-number
                      v-if="isEdit"
                      :inputValue.sync="item.price"
                      placeholder="请输入价格"
                      :disabled="!city.isChecked"
                    >
                    </c-input-number>
                    <div style="padding-left:16px" v-else>{{ formatThousandNumber(item.price || 0) }}</div>
                    <div class="unit">元/月</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-group" v-if="isEdit">
              <div class="btn cancel-btn" @click="cancel">取消</div>
              <div class="btn save-btn" @click="save">保存</div>
            </div>
            <div class="btn-group" v-else>
              <div class="btn save-btn" style="margin-left:0" @click="edit">编辑</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlateCertification, getCarPlatePrice, savePlateCertification, saveCarPlatePrice } from '@/api/system/restrictedCity'
import { formatThousandNumber } from '@/utils/util'

export default {
  name: "restrictedCity",

  components: {},

  data() {
    return {
      certificationList: [], // 材料列表
      cityList: [
        {
          cityId: 110100,
          cityName: "北京",
          isChecked: false,
          typeAndPriceList: [
            {
              price: undefined,
              type: 0, // 0小型车，1新能源车
              label: "燃油车牌照",
            },
            {
              price: undefined,
              type: 1,
              label: "新能源车牌照",
            },
          ],
        },
        {
          cityId: 310100,
          cityName: "上海",
          isChecked: false,
          typeAndPriceList: [
            {
              price: undefined,
              type: 0, // 0小型车，1新能源车
              label: "燃油车牌照",
            },
            {
              price: undefined,
              type: 1,
              label: "新能源车牌照",
            },
          ],
        },
        {
          cityId: 440100,
          cityName: "广州",
          isChecked: false,
          typeAndPriceList: [
            {
              price: undefined,
              type: 0, // 0小型车，1新能源车
              label: "燃油车牌照",
            },
            {
              price: undefined,
              type: 1,
              label: "新能源车牌照",
            },
          ],
        },
        {
          cityId: 440300,
          cityName: "深圳",
          isChecked: false,
          typeAndPriceList: [
            {
              price: undefined,
              type: 0, // 0小型车，1新能源车
              label: "燃油车牌照",
            },
            {
              price: undefined,
              type: 1,
              label: "新能源车牌照",
            },
          ],
        },
        {
          cityId: 330100,
          cityName: "杭州",
          isChecked: false,
          typeAndPriceList: [
            {
              price: undefined,
              type: 0, // 0小型车，1新能源车
              label: "燃油车牌照",
            },
            {
              price: undefined,
              type: 1,
              label: "新能源车牌照",
            },
          ],
        },
      ], // 牌照城市列表
      isEdit: false,
      companyId: 0,
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.getPlateCertification()
      this.getCarPlatePrice()
    },

    // 查询材料信息
    getPlateCertification() {
      const data = {
        companyId: this.companyId
      }
      getPlateCertification(data).then(res => {
        if (res.code === 0) {
          this.certificationList = res.data
        }
      })
    },

    // 查询车牌信息
    getCarPlatePrice() {
      const params = {
          companyId: this.companyId
      }
      getCarPlatePrice(params).then(res => {
          if (res.code === 0) {
            if (res.data && res.data.length) {
                this.cityList.map(localcity => {
                  const item = res.data.find(city => city.cityId === localcity.cityId)
                  if (item) {
                    localcity.isChecked = true
                    localcity.typeAndPriceList.map(localprice => {
                      const priceItem = item.typeAndPriceList.find(price => price.type === localprice.type)
                      if (priceItem) {
                        localprice.price = priceItem.price
                      }

                      return localprice
                    })
                  }
                  return localcity
                })
              }
          }
      })
    },

    cancel() {
      this.isEdit = false
    },

    edit() {
      this.isEdit = true
    },

    save() {
      const submitCityList = this.cityList.filter(city => {
          return city.isChecked
      })

      const checked = submitCityList.every(city => {
          return city.typeAndPriceList.some(item => item.price)
      })

      if(!checked) {
          this.$message.error('勾选的城市未设置价格！')
          return
      }

      const list = []

      submitCityList.forEach(city => {
        const typeAndPriceList = city.typeAndPriceList.filter(item => item.price)
        list.push({
          ...city,
          typeAndPriceList
        })
      })

      const submitCertificationList = {
          companyId: this.companyId,
          dataList: this.certificationList
      }

      Promise.all([savePlateCertification(submitCertificationList), saveCarPlatePrice(list)]).then(res => {
        this.$message.success('保存成功')
        this.cancel()
        this.init()
      }).catch(err => {
        this.$message.error('保存失败')
      })
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
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
  color: #1d2129;
  margin-bottom: 23px;
}

.container {
  .container-title {
    height: 36px;
    width: 200px;
    text-align: right;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 36px;
    color: rgba(0, 0, 0, 0.9);
  }
  .certification-list {
    margin-top: 19px;
    margin-left: 180px;
    display: flex;
    align-items: center;
    .certification {
      margin-right: 24px;
      /deep/ .el-checkbox__label {
        height: 22px;
        font-size: 14px;
        line-height: 22px;
        color: #1d2129;
      }
    }
  }
  .plate {
    margin-top: 27px;
    .plate-title {
      height: 36px;
      font-size: 16px;
      font-weight: 500;
      line-height: 36px;
      color: rgba(0, 0, 0, 0.9);
    }
    .plate-content {
      margin-top: 16px;
      margin-left: 180px;
      .tip {
        height: 18px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 18px;
        color: #4e5969;
      }
      .city-list {
        margin-top: 19px;
        display: flex;
        flex-wrap: wrap;
        .city {
          width: 390px;
          margin-bottom: 32px;
          display: flex;
          align-items: flex-start;
          /deep/ .el-checkbox__label {
            height: 22px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 22px;
            color: #1d2129;
          }
          .input-group {
            margin-left: 24px;
            .input-item {
              margin-bottom: 12px;
              display: flex;
              align-items: center;
              .label {
                width: 90px;
                text-align: right;
              }
              .el-input-number {
                margin-left: 16px;
                margin-right: 8px;
                width: 134px;
                height: 32px;
                line-height: 32px;
                padding: 0 8px;
                border-radius: 2px;
                /deep/ .el-input__inner {
                  width: 134px;
                  height: 32px;
                  line-height: 32px;
                }
              }
              /deep/ input::-webkit-input-placeholder {
                font-size: 14px;
                color: #a4aebb;
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  .btn {
    width: 104px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    font-size: 14px;
    color: #1d2129;
    background: #f2f3f5;
    cursor: default;
    &.save-btn {
      margin-left: 24px;
      background: #3446aa;
      color: #ffffff;
    }
  }
}
</style>
