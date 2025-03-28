<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item class="subscription-plan">订单管理</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <OrderList :type="2" />
      </div>
  </div>
</template>

<script>
import OrderList from './components/OrderList'
export default {
  name: 'orderList',

  components: {
    OrderList,
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