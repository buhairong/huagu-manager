<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">全新车开放</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <OpenCarType :carType="1" />
      </div>
  </div>
</template>

<script>
import OpenCarType from '@/views/goods/carProductTypeManage.vue'

export default {
  name: 'openNewCar',

  components: {
    OpenCarType
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

</style>