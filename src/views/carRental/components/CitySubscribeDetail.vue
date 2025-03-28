<template>
  <div class="item">
    <div class="item-title">专属城市:</div>
    <div class="item-content">
      <div class="city-tag-list">
        <div
          v-for="city in citySubscribe"
          :key="city.cityId"
          class="city-tag"
          :class="{ 'active-city-tag': city.cityId == activeCityId }"
          @click="handleChangeCity(city)"
        >
          {{ city.cityId ? city.cityName : "通用城市" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util"

export default {
  name: "CarInfo",

  components: {},

  props: {
    citySubscribe: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
     activeCityId: 0,
    }
  },

  mounted() {
    
  },

  methods: {
    handleChangeCity(city) {
      this.activeCityId = city.cityId
      this.$emit('handleChangeCity', city)
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 16px;
  display: flex;
  .item-title {
    margin-right: 8px;
    height: 28px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 28px;
    color: #86909c;
    width: 130px;
    text-align: right;
  }
  .item-content {
    display: flex;
    flex-wrap: wrap;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 21px;
    color: #1d2129;
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
    background: #f2f3f5;
    color: #848484;
    font-size: 14px;
    cursor: default;
  }
  .active-city-tag {
    border: 1px solid #3446aa;
  }
  .close-tag {
    height: 100%;
    display: flex;
    align-items: flex-start;
    margin-left: 6px;
  }
  .city-tag {
    padding: 0 8px;
  }
}
</style>
