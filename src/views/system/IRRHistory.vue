<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">历史IRR</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div class="title">历史IRR</div>

          <el-table 
            :data="list"
            :header-cell-style="{background:'#F2F3F5',color:'#1D2129'}"
            style="width:500px;margin: 0 auto"
          >
            <el-table-column
                :label="`${carType == 1 ? '全新车' : '二手车'}IRR`"
                width="200px"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.periodRate}}%</div>
                </template>
            </el-table-column>

            <el-table-column
                label="设置时间"
                width="300px"
            >
                <template slot-scope="scope">
                    <div>{{scope.row.createdTime}}</div>
                </template>
            </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import { selectIRRHistory } from '@/api/system/IRR'

export default {
  name: 'IRRHistory',

  components: {
    
  },

  data() {
    return {
      list: [],
      carType: null,
    }
  },

  mounted() {
    this.carType = this.$route.query.carType
    this.selectIRRHistory()
  },

  methods: {
    selectIRRHistory() {
      const data = {
        carType: this.carType,
      }
      selectIRRHistory(data).then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
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
</style>