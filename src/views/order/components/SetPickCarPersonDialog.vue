<template>
  <el-dialog
    :title="currentOrder.type === 1 ? '交车人员' : '取车人员'"
    :visible.sync="show"
    width="480px"
    :before-close="handleCloseDialog"
  >
    <CarInfoHeader :carInfo="currentOrder" />

    <div class="item">
      <div class="item-title">订单编号: </div>
      <div class="item-content">
        {{ currentOrder.orderNum }}
      </div>
    </div>

    <div class="item">
      <div class="item-title">用户信息: </div>
      <div class="item-content">
        {{ currentOrder.name }}
      </div>
    </div>

    <div class="item">
      <div class="item-title">{{ currentOrder.type === 1 ? '交车时间' : '取车时间' }}: </div>
      <div class="item-content">
        {{ currentOrder.type === 1 ? currentOrder.startDate : currentOrder.endDate }}
      </div>
    </div>

    <div class="item">
      <div class="item-title">{{ currentOrder.type === 1 ? '交车地址' : '取车地址' }}: </div>
      <div class="item-content">
        {{ currentOrder.type === 1 ? currentOrder.pickUpAddress : currentOrder.returnAddress }}
      </div>
    </div>
      
    <div class="item">
      <div class="item-title">{{ currentOrder.type === 1 ? '交车人员' : '取车人员' }}: </div>
      <div class="item-content">
        <c-select
          :selectValue.sync="formData.userId"
          :options="userList"
          :selectStyle="{
              width: '200px'
          }"
          :showAllValue="false"
          labelKey="name"
          valueKey="id"
        />
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <div class="dialog-btn-wrap">
        <div class="btn" @click="handleCloseDialog">取消</div>
        <div class="btn save-btn" @click="save">确认</div>
      </div>
    </span>
  </el-dialog>
</template>

<script>
import { getUserList } from '@/api/user/user'
import CarInfoHeader from './CarInfoHeader'

export default {
  components: {
    CarInfoHeader,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    currentOrder: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      formData: {},
      userList: [],
    }
  },

    mounted() {
      this.formData = {
        ...this.currentOrder,
        userId: this.currentOrder.type === 1 ? this.currentOrder.pickUpUserId : this.currentOrder.returnUserId
      }
      this.getUserList()
    },

  methods: {
    getUserList() {
      const params = {
        page: 1,
        limit: 1000,
        roleId: 112,
      }

      getUserList(params).then(res => {
        if (res.code === 0) {
          this.userList = res.data.records
        }
      })
    },

    handleCloseDialog() {
      this.$emit('update:show', false)    
    },

    save() {
      if (!this.formData.userId) {
        this.$message.error(`请设置${this.currentOrder.type === 1 ? '交车人员' : '取车人员'}`)
        return
      }

      const findItem = this.userList.find(item => item.id === this.formData.userId)
      const data = {
        ...this.formData,
        userName: findItem.name,
      }

      this.$emit('save', data)
      this.handleCloseDialog()
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  margin-top: 16px;
  display: flex;
  .item-title {
    margin-right: 8px;
    width: 84px;
    height: 32px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 32px;
    color: #4E5969;
    text-align: right;
  }
  .item-content {
    height: 32px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 32px;
    color: #1D2129;
  }
}
</style>