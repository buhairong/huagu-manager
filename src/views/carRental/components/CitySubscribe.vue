<template>
  <div>
    <div>
      <div class="city-tag-list" v-if="citySubscribeReq.length > 1">
        <div 
          v-for="city in citySubscribeReq"
          :key="city.cityId"
          class="city-tag"
          :class="{'active-city-tag': city.cityId == currentCity.cityId}"
          @click="handleChangeCityTag(city)"
        >
          {{ city.cityId ? city.cityName : `其余${otherCitys.length}个城市` }}
          <div class="close-tag" @click.stop="delCity(city)" v-if="city.cityId">
            <i class="el-icon-error"></i>
          </div>
        </div>
      </div>
      <div v-else>全部城市</div>
      <div class="add-city" @click="openCityDialog">添加城市专属方案</div>
    </div>

    <el-dialog
      title="选择城市"
      :visible.sync="showCityDialog"
      width="480px"
      :before-close="closeCityDialog"
    >
      <div class="city-list">
        <div 
          v-for="city in otherCitys"
          :key="city.id"
          class="city"
          :class="{'active-city': dialogActiveCity && city.id == dialogActiveCity.id}"
          @click="handleChangeDialogCity(city)"
        >
          {{ city.city }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCityDialog">取 消</el-button>
        <el-button type="primary" @click="handleChooseCity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCity } from '@/api/subscribe/subscribe'

export default {
  name: "CitySubscribe",

  components: {},

  props: {
    citySubscribeReq: {
      type: Array,
      required: true,
    },

    defaultCitySubscribe: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentCity: {},
      allCitys: [],
      otherCitys: [],
      showCityDialog: false,
      dialogActiveCity: null,
    }
  },

  watch: {
    citySubscribeReq: {
      handler(val) {
        this.$emit("change", val)
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    this.currentCity = this.citySubscribeReq[0]
    this.getAllCity()
  },

  methods: {
    getAllCity() {
      getAllCity().then(res => {
        if(res.code === 0) {
          this.allCitys = res.data
          this.otherCitys = res.data
        }
      })
    },

    openCityDialog() {
      this.showCityDialog = true
    },

    closeCityDialog() {
      this.showCityDialog = false
      this.dialogActiveCity = null
    },

    handleChangeDialogCity(city) {
      this.dialogActiveCity = city
    },

    handleChooseCity() {
      if (!this.dialogActiveCity) {
          this.$message.error('请选择一个城市')
          return
      }

      this.currentCity = {
          ...this.defaultCitySubscribe,
          cityId: this.dialogActiveCity.id,
          cityName: this.dialogActiveCity.city,
      }

      this.citySubscribeReq.push(this.currentCity)

      this.otherCitys = this.allCitys.filter(item => {
          const index = this.citySubscribeReq.findIndex(city => city.cityId === item.id)

          return index === -1
      })

      this.closeCityDialog()
      this.$emit("changeCity", this.currentCity)
    },

    handleChangeCityTag(city) {
      this.currentCity = this.citySubscribeReq.filter(item => item.cityId === city.cityId)[0]
      this.$emit("changeCity", city)
    },

    delCity(city) {
      this.$confirm(`确定要删除 ${city.cityName} 专属方案吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        if (city.id) {
          const params = {
            cityId: city.cityId
          }

          // await deleteCityCarSubscribe(params)
        }

        const index = this.citySubscribeReq.findIndex(item => item.cityId === city.cityId)
        if (index !== -1) {
          this.citySubscribeReq.splice(index, 1)
          if (this.currentCity.cityId === city.cityId) {
            this.currentCity = this.citySubscribeReq[0]
          }
          this.otherCitys.push({
            cityId: city.cityId,
            id: city.cityId,
            city: city.cityName,
          })
          this.$emit("changeCity", this.currentCity)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.city-list {
    display: flex;
    flex-wrap: wrap;
    .city {
        margin-right: 16px;
        margin-bottom: 16px;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        display: flex;
        padding: 0 6px;
        background: #F2F3F5;
        color: #848484;
        font-size: 14px;
        cursor: default;
    }
    .active-city {
        border: 1px solid #3446AA;
    }
}

.city-tag-list {
  display: flex;
  flex-wrap: wrap;
  .city-tag {
    margin-right: 16px;
    margin-bottom: 16px;
    height: 28px;
    line-height: 28px;
    border-radius: 2px;
    display: flex;
    padding: 0 6px;
    background: #F2F3F5;
    color: #848484;
    font-size: 14px;
    cursor: default;
  }
  .active-city-tag {
    border: 1px solid #3446AA;
  }
  .close-tag {
    height: 100%;
    display: flex;
    align-items: flex-start;
    margin-left: 6px;
  }
}

.add-city {
  margin-top: 7px;
  height: 22px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  line-height: 22px;
  color: #3446AA;
  cursor: pointer;
}
</style>
