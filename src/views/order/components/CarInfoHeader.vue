<template>
  <div class="car-info">
    <el-image
      style="width:108px;height:80px"
      :src="carInfo.imageUrl"
      fit="cover"
    ></el-image>
    <div>
      {{ carInfo.carBrand }}·{{ carInfo.carType }} {{ carInfo.carTypeYear }} {{ carInfo.carTypeYearProduct }}
      <div class="car-plate" v-if="carInfo.carPlateNum">{{ carInfo.carPlateNum }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    carInfo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      
    }
  },

  mounted() {
    
  },

  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.car-info {
  display: flex;
  align-items: center;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
  .car-brand {
    height: 22px;
    line-height: 22px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
  }
  .car-plate {
    margin-top: 8px;
    width: 100px;
    height: 24px;
    border-radius: 2px;
    background: #3446AA;
    font-size: 14px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>